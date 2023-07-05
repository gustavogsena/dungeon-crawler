import { Service } from "typedi";
import { IUser } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { CreateHeroDto } from "./dtos/createHero.dto";
import { v4 as uuidv4 } from 'uuid';
import { IHero } from "./hero.schema";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { IEquipment, IItem } from "../items/items.schema";
import { ItemsService } from "../items/items.service";
import { calculateCombatByEquipment, calculateEquipmentEffects, calculateHPandManaByClass, findBasicEquipmentByClass, findStartInventoryItemsByClass, findStatusByClass } from "./hero.util";
import { HeroRepository } from "./hero.repository";
import { CombatStatus, HeroClassType, Hero } from "../../types";

@Service()
export class HeroService {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly userService: UserService,
        private readonly heroRepository: HeroRepository
    ) { }

    async findAll() {

    }

    async findById(user: IUser, heroId: string) {
        const findUser = await this.userService.findOne(user.username)
        if (findUser) {
            const heroes = findUser.heroes
            const selectedHero = heroes.find((hero) => hero.id === heroId)
            if (!selectedHero) throw new BadRequestError('Heroi não encontrado')

            const combatStatus = this.calculateCombatStatus(selectedHero)
            const heroWithCombatStatus: Hero = {
                ...selectedHero,
                combatStatus
            }

            return heroWithCombatStatus
        }

        throw new NotFoundError('Usuario não encontrado')
    }

    calculateCombatStatus(hero: IHero): CombatStatus {
        const { health, mana } = calculateHPandManaByClass(hero)
        const { attack, defense, block } = calculateCombatByEquipment(hero)
        const effects = calculateEquipmentEffects(hero)

        const combatStatus = {
            health, mana, attack, defense, block, effects
        }

        return combatStatus
    }


    async findBasicClass(heroClass: HeroClassType) {
        const status = await findStatusByClass(heroClass)
        const equipment = await findBasicEquipmentByClass(heroClass)
        const inventory = await findStartInventoryItemsByClass(heroClass)
        const hero = { equipment, inventory, status }
        return hero
    }

    async create(username: string, createHeroDto: CreateHeroDto) {
        const newHero = Object.assign(createHeroDto)
        newHero.id = uuidv4()
        newHero.name = createHeroDto.name
        newHero.level = 1
        newHero.experience = 0
        newHero.gold = 30
        newHero.status = await findStatusByClass(createHeroDto.class)
        newHero.equipment = await findBasicEquipmentByClass(createHeroDto.class)
        newHero.inventory = await findStartInventoryItemsByClass(createHeroDto.class)
       
        const userWithNewHero = await this.userService.createHero(username, newHero)
        const hero = userWithNewHero?.heroes.find((hero) => hero.id === newHero.id)
        return hero
    }

    async deleteHero(username: string, heroId: string) {
        const deletedHero = await this.userService.deleteHero(username, heroId)
        return deletedHero
    }

    async buyItem(user: IUser, itemName: string, heroId: string) {
        const hero = await this.findById(user, heroId)
        const item = await this.itemsService.findItemByName(itemName)

        if (item.price > hero.gold) throw new BadRequestError("Você não possui dinheiro suficiente para compra do item");
        const nextHeroGold = hero.gold - item.price

        hero.gold = nextHeroGold
        item.quantity = 1
        const updatedHero = await this.addItemInventory(user, hero, item)
        return updatedHero
    }

    async equipItem(user: IUser, itemName: string, heroId: string) {
        const hero = await this.findById(user, heroId)
        const itemInInventory = hero.inventory.find(item => item.name === itemName)
        if (!itemInInventory) throw new BadRequestError('Item não encontrado no inventário')

        const slot = itemInInventory.slot

        if (hero.equipment[slot] !== undefined) {
            /* Remove item from equipments and puts in inventory */
            const item = hero.equipment[slot] as unknown as IItem
            await this.addItemInventory(user, hero, item)
            /* Add new item to equipment */
        }

        hero.equipment[slot] = itemInInventory
        if (itemInInventory.twoHanded) hero.equipment.leftHand = itemInInventory

        const newHero = this.removeInventoryItem(itemInInventory, hero)

        await this.updateUserHero(user, newHero)
        const updatedHero = await this.findById(user, heroId)
        return updatedHero
    }

    async unequipItem(user: IUser, heroId: string, itemSlot: keyof IEquipment) {
        const hero = await this.findById(user, heroId)
        if (!hero.equipment[itemSlot]) throw new BadRequestError('Item não encontrado no slot de equipamento')
        const item = hero.equipment[itemSlot] as unknown as IItem
        await this.addItemInventory(user, hero, item)
        if (hero.equipment[itemSlot]?.twoHanded) {
            hero.equipment.rightHand = undefined
            hero.equipment.leftHand = undefined
        } else {
            hero.equipment[itemSlot] = undefined
        }
        await this.updateUserHero(user, hero)
        const updatedHero = await this.findById(user, heroId)
        return updatedHero
    }

    async updateUserHero(user: IUser, hero: IHero) {
        const heroIdx = user.heroes.findIndex(lookupHero => lookupHero.id === hero.id)
        if (heroIdx === -1) throw new BadRequestError('Herói não encontrado')
        user.heroes[heroIdx] = hero
        const heroes = user.heroes
        const updatedUser = await this.userService.update(user.username, { heroes })
        return updatedUser
    }

    async addItemInventory(user: IUser, hero: IHero, item: IItem) {
        const hasItem = hero.inventory.some(inventoryItem => inventoryItem.name === item.name)
        let newInventory = []

        if (hasItem) {
            newInventory = hero.inventory.map((inventoryItem) => {
                if (inventoryItem.name === item.name) {
                    inventoryItem.quantity ? inventoryItem.quantity += 1 : inventoryItem.quantity = item.quantity
                    return inventoryItem
                }
                return inventoryItem
            })

            hero.inventory = newInventory
        } else {
            hero.inventory.push(item)
        }

        const updatedUser = await this.updateUserHero(user, hero)
        return updatedUser
    }

    removeInventoryItem(item: IItem, hero: IHero) {
        const itemInInventoryIdx = hero.inventory.findIndex(inventoryItem => inventoryItem.name === item.name)
        if (!itemInInventoryIdx) throw new BadRequestError('Item não encontrado no inventário')

        if (item.quantity === 1) {
            hero.inventory.splice(itemInInventoryIdx, 1)
        } else {
            hero.inventory[itemInInventoryIdx].quantity -= 1
        }
        return hero
    }
}