import { Service } from "typedi";
import { IUser } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { CreateHeroDto } from "./dtos/createHero.dto";
import { v4 as uuidv4 } from 'uuid';
import { IHero } from "./hero.schema";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { IEquipment, IItem } from "../items/items.schema";
import { ItemsService } from "../items/items.service";
import { findBasicEquipmentByClass, findInventoryItems, findItemsByEquipmentPart, findStartInventoryItemsByClass, findStatusByClass } from "./hero.util";
import { HeroRepository } from "./hero.repository";
import { CreateHeroClassDto } from "./dtos/createHeroClass.dto";
import { HerroClassType } from "../../types";
import { Hero } from "./hero.model";

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

            return selectedHero
        }

        throw new NotFoundError('Usuario não encontrado')
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

    async findBasicClass(heroClass: HerroClassType) {
        const status = await findStatusByClass(heroClass)
        const equipment = await findBasicEquipmentByClass(heroClass)
        const inventory = await findStartInventoryItemsByClass(heroClass)
        const hero = { equipment, inventory, status }
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

        const newHero = this.removeInventoryItem( itemInInventory, hero)

        const updatedUser = await this.updateUserHero(user, newHero)
        return updatedUser
    }

    async unequipItem(user: IUser, heroId: string, itemSlot: keyof IEquipment, newEquippedItem?: IItem) {
        const hero = await this.findById(user, heroId)
        if (!hero.equipment[itemSlot]) throw new BadRequestError('Item não encontrado no slot de equipamento')
        const item = hero.equipment[itemSlot] as unknown as IItem
        await this.addItemInventory(user, hero, item)
        hero.equipment[itemSlot] = newEquippedItem ? newEquippedItem : undefined
        const updatedUser = await this.updateUserHero(user, hero)
        return updatedUser
    }

    async updateUserHero(user: IUser, hero: IHero) {
        const heroIdx = user.heroes.findIndex(lookupHero => lookupHero.id === hero.id)
        if (heroIdx === -1) throw new BadRequestError('Herói não encontrado')
        user.heroes[heroIdx] = hero
        const heroes = user.heroes
        const updatedUser = await this.userService.update(user.username, { heroes })
        return updatedUser
    }

    removeInventoryItem(item: IItem, hero: IHero) {
        const itemInInventoryIdx = hero.inventory.findIndex(inventoryItem => inventoryItem.name === item.name)
        if (!itemInInventoryIdx) throw new BadRequestError('Item não encontrado no inventário')

        if (item.quantity === 1) {
            hero.inventory.splice(itemInInventoryIdx)
        } else {
            hero.inventory[itemInInventoryIdx].quantity -= 1
        }
        return hero
    }
}