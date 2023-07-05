import { CombatEffects } from "../../types"
import { IStatus } from "../hero/hero.schema"

export const basicCombatEffects: CombatEffects = {
    combatEnchantment: {
        attack: 0,
        defense: 0
    },
    overTurn: {
        heal: 0,
        poison: 0,
        burn: 0
    },
    resistances: {
        fire: 0,
        earth: 0,
        ice: 0,
        lightning: 0
    },
    statusEnchantment: {
        strength: 0,
        agility: 0,
        faith: 0,
        magic: 0
    }
}
export const returnActionElement = (actionTypes: string[]) => {
    if (actionTypes.includes('fire')) {
        return 'fire'
    }
    if (actionTypes.includes('ice')) {
        return 'ice'
    }
    if (actionTypes.includes('earth')) {
        return 'earth'
    }
    if (actionTypes.includes('lightning')) {
        return 'lightning'
    }
}

export const returnActionDefinition = (actionTypes: string[]) => {
    const actions = []
    if (actionTypes.includes('attack')) {
        actions.push('attack')
    }
    if (actionTypes.includes('buff')) {
        actions.push('buff')
    }
    if (actionTypes.includes('heal')) {
        actions.push('heal')
    }
    return actions
}
export const returnActionAttribute = (actionTypes: string[]) => {
    if (actionTypes.includes('strength')) {
        return 'strength'
    }
    if (actionTypes.includes('agility')) {
        return 'agility'
    }
    if (actionTypes.includes('magic')) {
        return 'magic'
    }
    if (actionTypes.includes('faith')) {
        return 'faith'
    }
    return 'strength'
}

export const captalizeName = (name: string) => {
    const nameArray = name.split('-')
    const captalizeName = nameArray.reduce((acc, namePart) => {
        return acc + ' ' + namePart.charAt(0).toUpperCase() + namePart.slice(1)
    }, '')
    return captalizeName
}

export const reduceEffects = (effects: Partial<CombatEffects>[], startedEffect: CombatEffects, gameTurn: number) => {
    if (effects) {
        const reduceEffects = effects.filter(effect => {
            if (effect.duration) {
                const finalTurn = effect.duration.startTurn !== undefined && effect.duration.startTurn >= 0 ? effect.duration.duration + effect.duration.startTurn : 0
                return gameTurn < finalTurn
            }
            return false

        }).reduce((acc: CombatEffects, current) => {
            const reduced: CombatEffects = {
                combatEnchantment: {
                    attack: current.combatEnchantment && current.combatEnchantment.attack ? acc.combatEnchantment.attack + current.combatEnchantment.attack : acc.combatEnchantment.attack,
                    defense: current.combatEnchantment && current.combatEnchantment.defense ? acc.combatEnchantment.defense + current.combatEnchantment.defense : acc.combatEnchantment.defense
                },
                overTurn: {
                    heal: current.overTurn && current.overTurn.heal ? acc.overTurn.heal + current.overTurn.heal : acc.overTurn.heal,
                    poison: current.overTurn && current.overTurn.poison ? acc.overTurn.poison + current.overTurn.poison : acc.overTurn.poison,
                    burn: current.overTurn && current.overTurn.burn ? acc.overTurn.burn + current.overTurn.burn : acc.overTurn.burn,
                },
                resistances: {
                    earth: current.resistances && current.resistances.earth ? acc.resistances.earth + current.resistances.earth : acc.resistances.earth,
                    fire: current.resistances && current.resistances.fire ? acc.resistances.fire + current.resistances.fire : acc.resistances.fire,
                    ice: current.resistances && current.resistances.ice ? acc.resistances.ice + current.resistances.ice : acc.resistances.ice,
                    lightning: current.resistances && current.resistances.lightning ? acc.resistances.lightning + current.resistances.lightning : acc.resistances.lightning,
                },
                statusEnchantment: {
                    strength: current.statusEnchantment && current.statusEnchantment.strength ? acc.statusEnchantment.strength + current.statusEnchantment.strength : acc.statusEnchantment.strength,
                    agility: current.statusEnchantment && current.statusEnchantment.agility ? acc.statusEnchantment.agility + current.statusEnchantment.agility : acc.statusEnchantment.agility,
                    magic: current.statusEnchantment && current.statusEnchantment.magic ? acc.statusEnchantment.magic + current.statusEnchantment.magic : acc.statusEnchantment.magic,
                    faith: current.statusEnchantment && current.statusEnchantment.faith ? acc.statusEnchantment.faith + current.statusEnchantment.faith : acc.statusEnchantment.faith,
                }
            }
            return reduced
        },
            startedEffect
        )
        return reduceEffects
    }

    return startedEffect

}

export const calculateTotalAttack = (basicAttack: number, attackEffect: number, currentAttributes: IStatus, mainAttribute: keyof IStatus) => {

    let totalAttack = basicAttack
    if (mainAttribute === "strength") {
        const minAttack = basicAttack - 2 <= 0 ? 1 : (basicAttack - 2) + attackEffect

        const attributeModifier = currentAttributes.strength
        totalAttack = (minAttack + (Math.random() * (basicAttack + attackEffect - minAttack))) * attributeModifier

    }
    if (mainAttribute === "agility") {
        const minAttack = 1
        const attributeModifier = currentAttributes.agility
        totalAttack = (minAttack + (Math.random() * (basicAttack - minAttack))) * attributeModifier
    }
    if (mainAttribute === "magic") {
        const attributeModifier = currentAttributes.magic
        totalAttack = basicAttack + attributeModifier
    }
    if (mainAttribute === "faith") {
        const attributeModifier = currentAttributes.faith
        totalAttack = basicAttack + attributeModifier
    }

    return Math.ceil(totalAttack)
}

export const calculateTotalBuffEffects = (effect: Partial<CombatEffects>, attributes: IStatus, mainAttribute: keyof IStatus | undefined) => {
    const modifiedEffect = { ...effect }
    if (mainAttribute) {
        if (modifiedEffect.combatEnchantment) {

            if (modifiedEffect.combatEnchantment.attack > 0) modifiedEffect.combatEnchantment.attack += attributes[mainAttribute]/2
            if (modifiedEffect.combatEnchantment.defense > 0) modifiedEffect.combatEnchantment.defense += attributes[mainAttribute]/2
        }
        if (modifiedEffect.overTurn) {
            console.log(JSON.stringify("overturn " + modifiedEffect.overTurn))
            if (modifiedEffect.overTurn.heal > 0) modifiedEffect.overTurn.heal += attributes[mainAttribute]/2
        }
        if (modifiedEffect.resistances) {
            if (modifiedEffect.resistances.fire > 0) modifiedEffect.resistances.fire += attributes[mainAttribute]
            if (modifiedEffect.resistances.ice > 0) modifiedEffect.resistances.ice += attributes[mainAttribute]
            if (modifiedEffect.resistances.earth > 0) modifiedEffect.resistances.earth += attributes[mainAttribute]
            if (modifiedEffect.resistances.lightning > 0) modifiedEffect.resistances.lightning += attributes[mainAttribute]
        }
        if (modifiedEffect.statusEnchantment) {
            if (modifiedEffect.statusEnchantment.agility > 0)modifiedEffect.statusEnchantment.agility += attributes[mainAttribute]/2
            if (modifiedEffect.statusEnchantment.strength > 0) modifiedEffect.statusEnchantment.strength += attributes[mainAttribute]/2

        }
    }
    console.log("after " + JSON.stringify(modifiedEffect))
    return modifiedEffect
}