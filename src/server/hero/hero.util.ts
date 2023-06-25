import { BadRequestError } from "routing-controllers"
import { HerroClassType } from "../../types"
import { IStatus } from "./hero.schema"
import { ItemsService } from "../items/items.service"
import { ItemsRepository } from "../items/items.repository"
import { UserService } from "../user/user.service"
import { UserRepository } from "../user/user.repository"
import { IEquipment, IItem } from "../items/items.schema"
import { EquipmentNameDto } from "../items/dtos/equipmentName.dto"
import { UpdateEquipmentDto } from "../items/dtos/updateEquipment.dto"

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
                magic: 1,
                faith: 2
            }
        }
        case 'wizard': {
            return {
                strength: 1,
                agility: 2,
                magic: 5,
                faith: 3
            }
        }
        case 'archer': {
            return {
                strength: 2,
                agility: 5,
                magic: 2,
                faith: 2
            }
        }
        case 'cleric': {
            return {
                strength: 2,
                agility: 1,
                magic: 3,
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
            sword.quantity = 1
            const shield = await itemsService.findItemByName('basic-shield')
            shield.quantity = 1
            const leatherArmor = await itemsService.findItemByName('leather-armor')
            leatherArmor.quantity = 1
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
            staff.quantity = 1
            const robe = await itemsService.findItemByName('basic-robe')
            robe.quantity = 1
            const mageHat = await itemsService.findItemByName('mage-hat')
            mageHat.quantity = 1
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
            bow.quantity = 1
            const robe = await itemsService.findItemByName('basic-robe')
            robe.quantity = 1
            const boots = await itemsService.findItemByName('basic-boots')
            boots.quantity = 1
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
            mace.quantity = 1
            const focus = await itemsService.findItemByName('basic-focus')
            focus.quantity = 1
            const chainArmor = await itemsService.findItemByName('chain-armor')
            chainArmor.quantity = 1
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

export async function findStartInventoryItemsByClass(heroClass: HerroClassType) {
    const inventory = []
    const healthPotion = await itemsService.findItemByName('health-potion')
    healthPotion.quantity = 1
    inventory.push(healthPotion)
    switch (heroClass) {
        case 'knight': {
            inventory.push()
            return inventory
        }
        case 'wizard': {
            const magicShieldScroll = await itemsService.findItemByName('magic-shield-scroll')
            magicShieldScroll.quantity = 1
            const fireballScroll = await itemsService.findItemByName('fire-ball-scroll')
            fireballScroll.quantity = 1
            inventory.push(magicShieldScroll)
            inventory.push(fireballScroll)
            return inventory
        }
        case 'archer': {
            inventory.push()
            return inventory
        }
        case 'cleric': {
            const regenerationScroll = await itemsService.findItemByName('regeneration-scroll')
            regenerationScroll.quantity = 1
            const divineMightScroll = await itemsService.findItemByName('divine-might-scroll')
            divineMightScroll.quantity = 1
            inventory.push(regenerationScroll)
            inventory.push(divineMightScroll)
            return inventory
        }
        default: {
            throw new BadRequestError('Classe não existe')
        }
    }
}

export async function findInventoryItems(items: string[]) {
    const inventory: IItem[] = []
    items.forEach(async (item) => {
        const selectedItem = await itemsService.findItemByName(item)
        inventory.push(selectedItem)
    })
    return inventory
}
export async function findItemsByEquipmentPart(equipmentNameDto: EquipmentNameDto) {
    const equipments = new UpdateEquipmentDto

    if (equipmentNameDto.rightHand) {
        equipments.rightHand = await itemsService.findItemByName(equipmentNameDto.rightHand)
    }
    if (equipmentNameDto.leftHand) {
        equipments.leftHand = await itemsService.findItemByName(equipmentNameDto.leftHand)
    }
    if (equipmentNameDto.armor) {
        equipments.armor = await itemsService.findItemByName(equipmentNameDto.armor)
    }
    if (equipmentNameDto.helmet) {
        equipments.helmet = await itemsService.findItemByName(equipmentNameDto.helmet)
    }
    if (equipmentNameDto.boots) {
        equipments.boots = await itemsService.findItemByName(equipmentNameDto.boots)
    }

    return equipments
}
