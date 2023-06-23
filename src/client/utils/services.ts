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
        case 'intelligence':
            return 'Inteligência'
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