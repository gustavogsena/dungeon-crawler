import { IStatus } from "../../server/hero/hero.schema";
import { HerroClassType } from "../../types";

export const translateHeroClass = (heroClass: HerroClassType) => {
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
}