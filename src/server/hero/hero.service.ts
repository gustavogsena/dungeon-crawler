import { Service } from "typedi";
import { IUser } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { CreateHeroDto } from "./dtos/createHero.dto";
import { v4 as uuidv4 } from 'uuid';
import { HerroClassType } from "../../types";
import { IStatus } from "./hero.schema";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { IEquipment, IItem } from "../items/items.schema";
import { ItemsService } from "../items/items.service";

@Service()
export class HeroService {
    constructor(
        private readonly userService: UserService,
        private readonly itemsService: ItemsService
    ) { }

    async finaAll() {

    }

    async selectById(user: IUser, heroId: string) {
        const findUser = await this.userService.findOne(user.username)
        if (findUser) {
            const heroes = findUser.heroes
            const selectedHero = heroes.find((hero) => hero.id === heroId)
            return selectedHero
        }

        throw new NotFoundError('Usuario não encontrado')
    }

    async create(username: string, createHeroDto: CreateHeroDto) {
        const newHero = Object.assign(createHeroDto)
        newHero.id = uuidv4()
        newHero.level = 1
        newHero.experience = 0
        newHero.status = await this.findStatusByClass(createHeroDto.class)
        newHero.equipment = await this.findBasicEquipmentByClass(createHeroDto.class)
        const hero = await this.userService.createHero(username, newHero)
        return hero
    }

    async findStatusByClass(heroClass: HerroClassType): Promise<IStatus> {
        switch (heroClass) {
            case 'warrior': {
                return {
                    strength: 5,
                    agility: 3,
                    intelligence: 1,
                    faith: 2
                }
            }
            case 'wizard': {
                return {
                    strength: 1,
                    agility: 2,
                    intelligence: 5,
                    faith: 3
                }
            }
            case 'archer': {
                return {
                    strength: 2,
                    agility: 5,
                    intelligence: 2,
                    faith: 1
                }
            }
            case 'cleric': {
                return {
                    strength: 3,
                    agility: 1,
                    intelligence: 2,
                    faith: 5
                }
            }
            default: {
                throw new BadRequestError('Classe não existe')
            }
        }
    }
    async findBasicEquipmentByClass(heroClass: HerroClassType): Promise<IEquipment> {
        switch (heroClass) {
            case 'warrior': {
                const sword = await this.itemsService.findItemByName('basic-sword')
                const shield = await this.itemsService.findItemByName('basic-shield')
                const leatherArmor = await this.itemsService.findItemByName('leather-armor')
                return {
                    rightHand: sword,
                    leftHand: shield,
                    helmet: undefined,
                    armor: leatherArmor,
                    boots: undefined
                }
            }
            case 'wizard': {
                const staff = await this.itemsService.findItemByName('basic-staff')
                const robe = await this.itemsService.findItemByName('basic-robe')
                const mageHat = await this.itemsService.findItemByName('mage-hat')
                return {
                    rightHand: staff,
                    leftHand: staff,
                    helmet: mageHat,
                    armor: robe,
                    boots: undefined
                }
            }
            case 'archer': {
                const bow = await this.itemsService.findItemByName('basic-bow')
                const robe = await this.itemsService.findItemByName('basic-robe')
                const boots = await this.itemsService.findItemByName('basic-boots')
                return {
                    rightHand: bow,
                    leftHand: bow,
                    helmet: undefined,
                    armor: robe,
                    boots: boots
                }
            }
            case 'cleric': {
                const mace = await this.itemsService.findItemByName('basic-mace')
                const focus = await this.itemsService.findItemByName('basic-focus')
                const chainArmor = await this.itemsService.findItemByName('chain-armor')
                return {
                    rightHand: mace,
                    leftHand: focus,
                    helmet: undefined,
                    armor: chainArmor,
                    boots: undefined
                }
            }
            default: {
                throw new BadRequestError('Classe não existe')
            }
        }
    }
    async updateStatus() {

    }
}