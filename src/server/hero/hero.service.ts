import { Service } from "typedi";
import { IUser } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { CreateHeroDto } from "./dtos/createHero.dto";
import { v4 as uuidv4 } from 'uuid';
import { HerroClassType } from "../../types";
import { IHero, IStatus } from "./hero.schema";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { IEquipment, IItem } from "../items/items.schema";
import { ItemsService } from "../items/items.service";
import { findBasicEquipmentByClass, findStatusByClass } from "./hero.util";

@Service()
export class HeroService {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly userService: UserService,
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
        newHero.level = 1
        newHero.experience = 0
        newHero.gold = 30
        newHero.status = await findStatusByClass(createHeroDto.class)
        newHero.equipment = await findBasicEquipmentByClass(createHeroDto.class)
        const hero = await this.userService.createHero(username, newHero)
        return hero
    }

    async buyItem(user: IUser, itemName: string, heroId: string) {
        const hero = await this.findById(user, heroId)
        const item = await this.itemsService.findItemByName(itemName)

        if (item.price > hero.gold) throw new BadRequestError("Você não possui dinheiro suficiente para compra do item");

        const nextHeroGold = hero.gold - item.price

        hero.gold = nextHeroGold

        const updatedHero = await this.addItem(user, hero, item)
        return updatedHero
    }

    async addItem(user: IUser, hero: IHero, item: IItem) {
        hero.inventory.push(item)
        const heroIdx = user.heroes.findIndex(lookupHero => lookupHero.id === hero.id)
        user.heroes[heroIdx] = hero
        const heroes = user.heroes
        const updatedUser = await this.userService.update(user.username, { heroes })
        return updatedUser
    }



    async updateStatus() {

    }
}