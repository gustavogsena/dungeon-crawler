import { Schema } from "mongoose"
import { IStatus } from "../hero/hero.schema"
import { CombatEffects, EnchantmentType, RarityTypes, } from "../../types"


export interface IItem {
    name: string,
    imageUrl: string,
    level: number,
    rarity: RarityTypes,
    enchantment?: Partial<CombatEffects>,
    slot: keyof IEquipment,
    type: string
    price: number,
    quantity: number,
    attack?: number,
    defense?: number,
    block?: number,
    twoHanded?: boolean,
    modifier?: keyof IStatus,

}

export const itemsSchema = new Schema<IItem>({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true
    },
    level: {
        type: Schema.Types.Number,
        required: true,
        min: 1,
        max: 99
    },
    rarity: {
        type: Schema.Types.String,
        required: true,
    },
    enchantment: {
        duration: {
            type: Schema.Types.Number
        },
        resistances: {
            fire: {
                type: Schema.Types.Number
            },
            ice: {
                type: Schema.Types.Number
            },
            earth: {
                type: Schema.Types.Number
            },
            lightning: {
                type: Schema.Types.Number
            }
        },
        combatEnchantment: {
            attack: {
                type: Schema.Types.Number
            },
            defense: {
                type: Schema.Types.Number
            }
        },
        statusEnchantment: {
            strength: {
                type: Schema.Types.Number
            },
            agility: {
                type: Schema.Types.Number
            },
            magic: {
                type: Schema.Types.Number
            },
            faith: {
                type: Schema.Types.Number
            }
        },
        overTurn: {
            heal: {
                type: Schema.Types.Number
            }
        }
    },
    price: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    attack: {
        type: Schema.Types.Number,
        min: 0
    },
    defense: {
        type: Schema.Types.Number,
        min: 0
    },
    block: {
        type: Schema.Types.Number,
        min: 0
    },
    modifier: {
        type: Schema.Types.String
    },
    slot: {
        type: Schema.Types.String
    },
    type: {
        type: Schema.Types.String
    },
    twoHanded: {
        type: Schema.Types.Boolean
    },
    quantity: {
        type: Schema.Types.Number
    }
})

export interface IEquipment {
    rightHand: IItem | undefined,
    leftHand: IItem | undefined
    helmet: IItem | undefined,
    armor: IItem | undefined,
    boots: IItem | undefined
}


export const equipmentSchema = new Schema<IEquipment>({
    leftHand: itemsSchema,
    rightHand: itemsSchema,
    helmet: itemsSchema,
    armor: itemsSchema,
    boots: itemsSchema
})


