// ---------------------- Types of user --------------------------

import { IHero, IStatus } from "./server/hero/hero.schema";
import { IEquipment } from "./server/items/items.schema";
import { IMonster } from "./server/monster/monster.schema";

export type User = {
    email?: string;
    username?: string;
    name?: string;
    surname?: string;
    heroes?: Hero[];
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
export type EnchantmentType = {
    resistances: Duration & Resistances,
    healing: Duration & OverTurnType,
    combatEnchantment: Duration & CombatType
    statusEnchantment: Duration & Partial<IStatus>
}

export type Item = {}


// ---------------------- Types of Heroes --------------------------
export type HeroClassType = 'wizard' | 'knight' | 'archer' | 'cleric' | ''

export type CreateHeroForm = {
    class: HeroClassType,
    name: string
}

export type Hero = IHero & {
    combatStatus: CombatStatus
}

export type HeroInGame = Hero & {
    effects: Partial<CombatEffects>[]
}

export type MonsterInGame = IMonster & {
    effects: Partial<CombatEffects>[]
}

export type CombatStatus = {
    attack: number,
    defense: number,
    health: number,
    mana: number,
    block: number,
    effects: CombatEffects
}

export type CombatEffectsDuration = {
    duration?: Duration,
    resistances: Resistances,
    overTurn: OverTurnType,
    combatEnchantment: CombatType
    statusEnchantment: IStatus
}
export type CombatEffects = {
    duration?: Duration,
    resistances: Resistances,
    overTurn: OverTurnType,
    combatEnchantment: CombatType
    statusEnchantment: IStatus
}

export type CombatType = { attack: number, defense: number }
export type OverTurnType = { heal: number, poison: number, burn: number }

export type Duration = {
    duration: number,
    startTurn?: number
}
export type Resistances = {
    fire: number,
    ice: number,
    earth: number,
    lightning: number
}

/* ------------ Dungeon ------------- */

export type DungeonInfo = {
    id: string,
    difficulty: number;
    monsters: number[];
    elements: string[];
    name: string;
    background: string;
    reward: number[];
}