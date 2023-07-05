import { BadRequestError } from "routing-controllers"
import { CombatType, CombatEffects, EnchantmentType, HeroClassType } from "../../types"
import { IHero, IStatus } from "./hero.schema"
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

export async function findStatusByClass(heroClass: HeroClassType): Promise<IStatus> {
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

export function calculateHPandManaByClass(hero: IHero) {
    const basicLife = 25
    const basicMana = 0
    switch (hero.class) {
        case 'knight': {
            const health = basicLife + (hero.level * 10)
            const mana = basicMana + (hero.level * 2 * hero.status.magic)
            return { health, mana }
        }
        case 'wizard': {
            const health = basicLife + (hero.level * 5)
            const mana = basicMana + (hero.level * 4 * hero.status.magic)
            return { health, mana }
        }
        case 'archer': {
            const health = basicLife + (hero.level * 5)
            const mana = basicMana + (hero.level * 2 * hero.status.magic)
            return { health, mana }
        }
        case 'cleric': {
            const health = basicLife + (hero.level * 7)
            const mana = basicMana + (hero.level * 3 * hero.status.magic)
            return { health, mana }
        }
        default: {
            throw new BadRequestError('Classe não existe')
        }
    }
}

export function calculateCombatByEquipment(hero: IHero) {
    let attack = 0
    let defense = 0
    let block = 0

    const armorEnchants = calculateCombatEnchantment(hero.equipment.armor)
    const rightHandEnchants = calculateCombatEnchantment(hero.equipment.rightHand)
    const leftHandEnchants = calculateCombatEnchantment(hero.equipment.leftHand)
    const helmetEnchants = calculateCombatEnchantment(hero.equipment.helmet)
    const bootsEnchants = calculateCombatEnchantment(hero.equipment.boots)

    const equipmentEnchantsArray = [armorEnchants, rightHandEnchants, leftHandEnchants, helmetEnchants, bootsEnchants]

    const sumEquipmentEnchants = equipmentEnchantsArray.reduce((acc, current) => {
        return {
            attack: acc.attack + current.attack,
            defense: acc.defense + current.defense
        }
    }, { attack: 0, defense: 0 })


    if (hero.equipment.rightHand && hero.equipment.rightHand.attack) {
        attack = hero.equipment.rightHand?.twoHanded ? hero.equipment.rightHand.attack * 3 / 2 + sumEquipmentEnchants.attack : hero.equipment.rightHand.attack + sumEquipmentEnchants.attack
        if (hero.equipment.rightHand?.twoHanded && hero.equipment.rightHand.defense || !hero.equipment.leftHand && hero.equipment.rightHand.defense) {
            defense = hero.equipment.rightHand.defense + sumEquipmentEnchants.defense
        }
    }
    if (hero.equipment.leftHand && hero.equipment.leftHand.defense && !hero.equipment.leftHand.twoHanded) {
        defense = hero.equipment.leftHand.defense
        if (hero.equipment.leftHand.block) block = hero.equipment.leftHand?.block
    }
    if (hero.equipment.armor && hero.equipment.armor.defense) {
        defense += hero.equipment.armor.defense 
    }
    if (hero.equipment.helmet && hero.equipment.helmet.defense) {
        defense += hero.equipment.helmet.defense 
    }
    if (hero.equipment.boots && hero.equipment.boots.defense) {
        defense += hero.equipment.boots.defense 
    }

    return { attack, defense, block }
}

export function calculateCombatEnchantment(equipmentPart: IItem | undefined): CombatType {
    const basicReturn = { attack: 0, defense: 0 }
    if (equipmentPart && equipmentPart.enchantment) {
        const attack = equipmentPart.enchantment.combatEnchantment?.attack ? equipmentPart.enchantment.combatEnchantment.attack : 0
        const defense = equipmentPart.enchantment.combatEnchantment?.defense ? equipmentPart.enchantment.combatEnchantment.defense : 0
        return { attack, defense }
    }
    return basicReturn

}

export function calculateEquipmentEffects(hero: IHero): CombatEffects {

    let resistances = {
        fire: 0,
        ice: 0,
        earth: 0,
        lightning: 0
    }
    let combatEnchantment = { attack: 0, defense: 0 }
    let overTurn = { heal: 0, poison: 0, burn: 0 }
    let statusEnchantment = { strength: 0, agility: 0, faith: 0, magic: 0 }
    const basicReturn = { resistances, combatEnchantment, overTurn, statusEnchantment }
    const armorEnchants = calculateEquipmentEnchantment(hero.equipment.armor, basicReturn)
    const rightHandEnchants = calculateEquipmentEnchantment(hero.equipment.rightHand, basicReturn)
    const leftHandEnchants = calculateEquipmentEnchantment(hero.equipment.leftHand, basicReturn)
    const helmetEnchants = calculateEquipmentEnchantment(hero.equipment.helmet, basicReturn)
    const bootsEnchants = calculateEquipmentEnchantment(hero.equipment.boots, basicReturn)
    const equipmentEnchantsArray = [armorEnchants, rightHandEnchants, leftHandEnchants, helmetEnchants, bootsEnchants]

    const sumEquipmentEnchants = equipmentEnchantsArray.reduce((acc, current) => {
        const reduceResistance = {
            fire: current.resistances.fire ? acc.resistances.fire + current.resistances.fire : acc.resistances.fire,
            ice: current.resistances.ice ? acc.resistances.ice + current.resistances.ice : acc.resistances.ice,
            earth: current.resistances.earth ? acc.resistances.earth + current.resistances.earth : acc.resistances.earth,
            lightning: current.resistances.lightning ? acc.resistances.lightning + current.resistances.lightning : acc.resistances.lightning,
        }

        const reduceCombatEnchantment = {
            attack: current.combatEnchantment.attack ? acc.combatEnchantment.attack + current.combatEnchantment.attack : acc.combatEnchantment.attack,
            defense: current.combatEnchantment.defense ? acc.combatEnchantment.defense + current.combatEnchantment.defense : acc.combatEnchantment.defense
        }


        const reduceOverTurn = {
            heal: current.overTurn.heal ? acc.overTurn.heal + current.overTurn.heal : 0,
            poison:  current.overTurn.poison ? acc.overTurn.poison + current.overTurn.poison : 0,
            burn:  current.overTurn.burn ? acc.overTurn.burn + current.overTurn.burn : 0,

        }
        const reduceStatusEnchantment = {
            strength: current.statusEnchantment.strength ? acc.statusEnchantment.strength + current.statusEnchantment.strength : acc.statusEnchantment.strength,
            agility: current.statusEnchantment.agility ? acc.statusEnchantment.agility + current.statusEnchantment.agility : acc.statusEnchantment.agility,
            magic: current.statusEnchantment.magic ? acc.statusEnchantment.magic + current.statusEnchantment.magic : acc.statusEnchantment.magic,
            faith: current.statusEnchantment.faith ? acc.statusEnchantment.faith + current.statusEnchantment.faith : acc.statusEnchantment.faith
        }

        const calculatedEnchants = {
            resistances: reduceResistance,
            overTurn: reduceOverTurn,
            combatEnchantment: reduceCombatEnchantment,
            statusEnchantment: reduceStatusEnchantment
        }

        return calculatedEnchants

    }, basicReturn)


    return sumEquipmentEnchants
}

export function calculateEquipmentEnchantment(equipmentPart: IItem | undefined, basicReturn: CombatEffects): CombatEffects {
    if (equipmentPart && equipmentPart.enchantment) {
        return {
            resistances: Object.assign({}, equipmentPart.enchantment.resistances),
            combatEnchantment: Object.assign({}, equipmentPart.enchantment.combatEnchantment),
            overTurn: Object.assign({}, equipmentPart.enchantment.overTurn),
            statusEnchantment: Object.assign({}, equipmentPart.enchantment.statusEnchantment),
        } as unknown as CombatEffects
    }
    return basicReturn
}


export async function findBasicEquipmentByClass(heroClass: HeroClassType): Promise<IEquipment> {
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
            const robe = await itemsService.findItemByName('mages-robe')
            robe.quantity = 1
            const mageHat = await itemsService.findItemByName('mages-hat')
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
            const hood = await itemsService.findItemByName('basic-hood')
            hood.quantity = 1
            const boots = await itemsService.findItemByName('basic-boots')
            boots.quantity = 1
            return {
                rightHand: bow,
                leftHand: bow,
                helmet: hood,
                armor: undefined,
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

export async function findStartInventoryItemsByClass(heroClass: HeroClassType) {
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
            magicShieldScroll.quantity = 10
            const fireballScroll = await itemsService.findItemByName('fire-ball-scroll')
            fireballScroll.quantity = 10
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
            regenerationScroll.quantity = 10
            const divineMightScroll = await itemsService.findItemByName('divine-might-scroll')
            divineMightScroll.quantity = 10
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
