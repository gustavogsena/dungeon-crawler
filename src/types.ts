// ---------------------- Types of user --------------------------

import { IHero, IStatus } from "./server/hero/hero.schema";
import { IEquipment } from "./server/items/items.schema";

export type User = {
    email?: string;
    username?: string;
    name?: string;
    surname?: string;
    heroes?: IHero[];
    isAuthenticated?: boolean;
}

export type UserSignInInput = {
    username: string,
    password: string
}

export type UserSignUpInput = UserSignInInput & {
    name: string,
    surname: string,
    username: string
}


export type UserSignInResponse = {
    user: User,
    token: string
}

// ---------------------- Types of items --------------------------

export type RarityTypes = 'common' | 'uncommon' | 'rare' | 'legendary'
export type SlotTypes = keyof IEquipment
export type EnchantmentType = {}
export type Item = {

}


// ---------------------- Types of Heroes --------------------------
export type HerroClassType = 'wizard' | 'knight' | 'archer' | 'cleric'

export type CreateHeroForm = {
    class: HerroClassType,
    name: string
}
export type Hero = {

}