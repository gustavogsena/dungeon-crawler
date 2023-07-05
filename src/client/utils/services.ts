import { IStatus } from "../../server/hero/hero.schema";
import { CombatEffects, EnchantmentType, HeroClassType } from "../../types";

export const translateHeroClass = (heroClass: HeroClassType) => {
    switch (heroClass) {
        case 'knight':
            return 'Guerreiro'
        case 'wizard':
            return 'Mago'
        case 'archer':
            return 'Arqueiro'
        case 'cleric':
            return 'Clerigo'
        default:
            return 'Guerreiro'
    }
}
export const translateAttributeName = (attribute: keyof IStatus) => {
    switch (attribute) {
        case 'strength':
            return 'Força'
        case 'agility':
            return 'Agilidade'
        case 'magic':
            return 'Magia'
        case 'faith':
            return 'Fé'
        default:
            return ''
    }
}

export const captalizeItemName = (itemName: string) => {
    const nameArray = itemName.split('-')
    const captalizeName = nameArray.reduce((acc, namePart) => {
        return acc + ' ' + namePart.charAt(0).toUpperCase() + namePart.slice(1)
    }, '')
    return captalizeName
}

export const iconUrlName = (type: string[]) => {
    if (type.includes('weapon')) return 'weapon'
    if (type.includes('armor')) return 'armor'
    if (type.includes('boots')) return 'boots'
    if (type.includes('helmet')) return 'helmet'
    if (type.includes('potion')) return 'potion'
    if (type.includes('scroll')) return 'scroll'
    if (type.includes('shield')) return 'shield'
    if (type.includes('focus')) return 'focus'
}

export const translateEnchantments = (enchantmentList: Partial<CombatEffects>, attributeModifier: keyof IStatus | undefined) => {
    const listOfEnchants: string[] = []
    const duration = enchantmentList.duration ? enchantmentList.duration as unknown as number : 0
    const durationString = duration > 0 ? `${duration} turnos * magia` : undefined 
    if (enchantmentList.overTurn) {
        const heal = enchantmentList.overTurn.heal
        const string = `Cura: ${heal}HP ${attributeModifier && `+ ${translateAttributeName(attributeModifier)}`}`
        if (heal > 0) listOfEnchants.push(string)
    }
    if (enchantmentList.resistances) {
        const earth = enchantmentList.resistances.earth
        const fire = enchantmentList.resistances.fire
        const ice = enchantmentList.resistances.ice
        const lightning = enchantmentList.resistances.lightning

        const string = `${fire > 0 ? `Fogo: ${fire}%` : ''} ${ice > 0 ? `Gelo: ${ice}%` : ''} ${earth > 0 ? `Terra: ${earth}%` : ''}  ${lightning > 0 ? `Raio: ${lightning}%` : ''} ${attributeModifier && `+ ${translateAttributeName(attributeModifier)}`}`
        if (earth || fire || ice || lightning) listOfEnchants.push(string)
    }
    if (enchantmentList.combatEnchantment) {
        const attack = enchantmentList.combatEnchantment.attack ? enchantmentList.combatEnchantment.attack : 0
        const defense = enchantmentList.combatEnchantment.defense ? enchantmentList.combatEnchantment.defense : 0
        const string = `${attack > 0 ? `Ataque: ${attack}%` : ''} ${defense > 0 ? `Defesa: ${defense}%` : ''} ${attributeModifier && `+ ${translateAttributeName(attributeModifier)}`}`
        if (attack || defense || duration) listOfEnchants.push(string)
    }
    if (enchantmentList.statusEnchantment) {
        const agility = enchantmentList.statusEnchantment.agility ? enchantmentList.statusEnchantment.agility : 0
        const strength = enchantmentList.statusEnchantment.strength ? enchantmentList.statusEnchantment.strength : 0
        const faith = enchantmentList.statusEnchantment.faith ? enchantmentList.statusEnchantment.faith : 0
        const magic = enchantmentList.statusEnchantment.magic ? enchantmentList.statusEnchantment.magic : 0
        const string = `${strength > 0 ? `Força: ${strength}` : ''} ${agility > 0 ? `Agilidade: ${agility}` : ''} ${magic > 0 ? `Magia: ${magic}` : ''} ${faith > 0 ? `Fé: ${faith}` : ''} ${attributeModifier && `+ ${translateAttributeName(attributeModifier)}`}`
        if (agility || strength || faith || magic) listOfEnchants.push(string)
    }
    if (durationString) {
        listOfEnchants.push(durationString)
    }
    return listOfEnchants
}