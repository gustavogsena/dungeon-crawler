import { BadRequestError } from "routing-controllers"
import { HerroClassType } from "../../types"
import { IStatus } from "./hero.schema"
import { ItemsService } from "../items/items.service"
import { ItemsRepository } from "../items/items.repository"
import { UserService } from "../user/user.service"
import { UserRepository } from "../user/user.repository"
import { IEquipment } from "../items/items.schema"

const itemsRepository = new ItemsRepository()
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const itemsService = new ItemsService(itemsRepository, userService)

export async function findStatusByClass(heroClass: HerroClassType): Promise<IStatus> {
    switch (heroClass) {
        case 'knight': {
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

export async function findBasicEquipmentByClass(heroClass: HerroClassType): Promise<IEquipment> {
    switch (heroClass) {
        case 'knight': {
            const sword = await itemsService.findItemByName('basic-sword')
            const shield = await itemsService.findItemByName('basic-shield')
            const leatherArmor = await itemsService.findItemByName('leather-armor')
            return {
                rightHand: sword,
                leftHand: shield,
                helmet: undefined,
                armor: leatherArmor,
                boots: undefined
            }
        }
        case 'wizard': {
            const staff = await itemsService.findItemByName('basic-staff')
            const robe = await itemsService.findItemByName('basic-robe')
            const mageHat = await itemsService.findItemByName('mage-hat')
            return {
                rightHand: staff,
                leftHand: staff,
                helmet: mageHat,
                armor: robe,
                boots: undefined
            }
        }
        case 'archer': {
            const bow = await itemsService.findItemByName('basic-bow')
            const robe = await itemsService.findItemByName('basic-robe')
            const boots = await itemsService.findItemByName('basic-boots')
            return {
                rightHand: bow,
                leftHand: bow,
                helmet: undefined,
                armor: robe,
                boots: boots
            }
        }
        case 'cleric': {
            const mace = await itemsService.findItemByName('basic-mace')
            const focus = await itemsService.findItemByName('basic-focus')
            const chainArmor = await itemsService.findItemByName('chain-armor')
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