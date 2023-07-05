import { Service } from "typedi";
import { CombatEffects, Hero, HeroInGame, MonsterInGame, Resistances } from "../../types";
import { IDungeon } from "../dungeon/dungeon.schema";
import { MonsterService } from "../monster/monster.service";
import { IMonster } from "../monster/monster.schema";
import { IGame } from "./game.schema";
import { v4 as uuid } from "uuid";
import { GameRepository } from "./game.repository";
import { BadRequestError } from "routing-controllers";
import { DungeonService } from "../dungeon/dungeon.service";
import { basicCombatEffects, calculateTotalAttack, calculateTotalBuffEffects, captalizeName, reduceEffects, returnActionAttribute, returnActionDefinition, returnActionElement } from "./game.util";
import { IStatus } from "../hero/hero.schema";
import { HeroService } from "../hero/hero.service";
import { IUser } from "../user/user.schema";

@Service()
export class GameService {
    constructor(
        private readonly monsterService: MonsterService,
        private readonly gameRepository: GameRepository,
        private readonly heroService: HeroService,
        private readonly dungeonService: DungeonService
    ) { }

    async findCurrentGame(gameId: string, heroId: string) {
        const game = await this.gameRepository.findCurrentGame(gameId, heroId)
        if (!game) throw new BadRequestError('Partida não encontrada')
        return game
    }

    async createNewGame(user: IUser, heroId: string, dungeonId: string) {
        const hero = await this.heroService.findById(user, heroId)
        const heroInGame: HeroInGame = { ...hero, effects: [] }
        const dungeon = await this.dungeonService.findOne(dungeonId) as unknown as IDungeon
        const monsters = await this.monsterService.findMonstersArray(dungeon.monsters)
        const monstersInGame = monsters.map((monster) => {
            return {
                ...monster,
                effects: []
            }
        })

        const newGame: IGame = {
            id: uuid(),
            background: dungeon.background,
            hero: heroInGame,
            monsters: monstersInGame as unknown as MonsterInGame[],
            dungeon: dungeon.name,
            reward: dungeon.reward,
            status: 'started',
            turn: 0
        }


        const game = await this.gameRepository.createNewGame(newGame)
        return game
    }

    async action(user: IUser, gameId: string, heroId: string, itemName?: string | undefined) {
        const game = await this.findCurrentGame(gameId, heroId)
        const messages = []
        messages.push('Turno ' + game.turn)
        game.turn += 1
        const currentTurn = game.turn
        const hero = game.hero
        const currentMonster = game.monsters[0]
        let isMonsterAlive = true
        const baseHero = await this.heroService.findById(user, heroId)
        const maxHealth = baseHero.combatStatus.health




        /* Monster action */
        const monsterRandomNumber = Math.round(Math.random() * 100)

        /* Check monsters effects */
        currentMonster.effects = currentMonster.effects.filter((effect) => {
            console.log(effect)
            if (!effect.duration) return false
            if (!effect.duration.startTurn) return false
            const endTurn = effect.duration?.startTurn + effect.duration?.duration
            return endTurn >= currentTurn

        })
        hero.effects = hero.effects.filter((effect) => {
            if (!effect.duration) return false
            if (!effect.duration.startTurn) return false
            const endTurn = effect.duration.startTurn + effect.duration.duration
            return endTurn >= currentTurn

        })

        const heroCombatEffects = hero.combatStatus.effects
        const heroCurrentEffects = reduceEffects(hero.effects, heroCombatEffects, currentTurn)
        const heroCurrentAttributes: IStatus = {
            strength: hero.status.strength + heroCurrentEffects.statusEnchantment.strength,
            agility: hero.status.agility + heroCurrentEffects.statusEnchantment.agility,
            magic: hero.status.magic + heroCurrentEffects.statusEnchantment.magic,
            faith: hero.status.faith + heroCurrentEffects.statusEnchantment.faith
        }


        const monsterChances = currentMonster.actions.map((action, idx, actionArray) => {
            if (idx !== 0) {
                const minimumChance = actionArray.reduce((acc, current, reduceIdx) => {
                    if (reduceIdx < idx) acc = acc + current.chance
                    return acc
                }, 0)
                return [minimumChance, minimumChance + action.chance]
            }
            return [0, action.chance]

        })

        const monsterActionIdx = monsterChances.findIndex((chanceRange) => chanceRange[0] <= monsterRandomNumber && monsterRandomNumber < chanceRange[1])
        const monsterAction = game.monsters[0].actions[monsterActionIdx]
        const monsterActionTypes = monsterAction.type.split(' ')

        const monsterActionElement = returnActionElement(monsterActionTypes)
        const monsterActionDefinition = returnActionDefinition(monsterActionTypes)
        const monsterActionAttribute = returnActionAttribute(monsterActionTypes)
        const monsterCombatEffects = basicCombatEffects
        /*  const monsterCombatEffects = currentMonster.combatStatus.effects */
        const monsterCurrentEffects = reduceEffects(currentMonster.effects, monsterCombatEffects, currentTurn)


        const monsterCurrentAttributes: IStatus = {
            strength: currentMonster.status.strength + monsterCurrentEffects.statusEnchantment.strength,
            agility: currentMonster.status.agility + monsterCurrentEffects.statusEnchantment.agility,
            magic: currentMonster.status.magic + monsterCurrentEffects.statusEnchantment.magic,
            faith: currentMonster.status.faith + monsterCurrentEffects.statusEnchantment.faith
        }

        if (heroCurrentEffects.overTurn) {
            console.log(heroCurrentEffects.overTurn)
            const totalHeal = Math.ceil(heroCurrentEffects.overTurn.heal)
            const totalPoison = Math.ceil(heroCurrentEffects.overTurn.poison * (1 - (heroCurrentEffects.resistances.earth / 100)))
            const totalBurn = Math.ceil(heroCurrentEffects.overTurn.burn * (1 - (heroCurrentEffects.resistances.fire / 100)))
            const totalEffectiveHeal = hero.combatStatus.health + totalHeal <= maxHealth ? totalHeal : maxHealth - hero.combatStatus.health
            const totalEffects = totalHeal - totalPoison - totalBurn
            hero.combatStatus.health = hero.combatStatus.health + totalEffects <= maxHealth ? hero.combatStatus.health + totalEffects : maxHealth
            console.log('totalHeal ' + totalHeal)
            console.log('totalPoison ' + totalPoison)
            console.log('totalBurn ' + totalBurn)
            if (totalHeal > 0) messages.push(`${hero.name} recuperou ${totalEffectiveHeal} de vida`)
            if (totalPoison > 0) messages.push(`${hero.name} tomou ${totalPoison} de dano venenoso`)
            if (totalBurn > 0) messages.push(`${hero.name} tomou ${totalBurn} de dano de queimadura`)
        }

        if (itemName && hero.combatStatus.health > 0) {
            const itemInInventory = hero.inventory.find(item => item.name === itemName)

            if (!itemInInventory) {
                messages.push(`Item não encontrado no inventário`)
                throw new BadRequestError('Item não encontrado no inventário')
            }
    
            if (!itemInInventory.enchantment) {
                messages.push(`Item inválido`)
                throw new BadRequestError('Item inválido')
            }
            const itemTypeArray = itemInInventory.type.split(' ')
            const itemType = returnActionDefinition(itemTypeArray)
            const itemAttribute = returnActionAttribute(itemTypeArray)
            messages.push(`${hero.name} utilizou ${captalizeName(itemName)}!`)
            if (itemInInventory.enchantment.duration) {
                if (itemType.includes("buff")) {
                    const buffEffects = {
                        ...itemInInventory.enchantment,
                        duration: {
                            duration: itemInInventory.enchantment.duration,
                            startTurn: currentTurn
                        }
                    } as unknown as Partial<CombatEffects>
                    console.log(buffEffects)
                    const buffEffectsWithAttributes = calculateTotalBuffEffects(buffEffects, heroCurrentAttributes, itemAttribute)

                    if (buffEffectsWithAttributes.duration) {
                        buffEffectsWithAttributes.duration.duration = buffEffectsWithAttributes.duration.duration * heroCurrentAttributes.magic
                    }
                    messages.push(`${hero.name} recebe buff: ${JSON.stringify(buffEffectsWithAttributes)}!`)

                    hero.effects.push(buffEffectsWithAttributes)
                }

            }
            if (itemType.includes("attack")) {
                if (itemInInventory.enchantment.combatEnchantment) {
                    const itemAttack = itemInInventory.enchantment.combatEnchantment.attack

                    const attackElement = returnActionElement(itemTypeArray)
                    const heroTotalAttack = calculateTotalAttack(itemAttack, heroCurrentEffects.combatEnchantment.attack, heroCurrentAttributes, itemAttribute)
                    const monsterDefense = currentMonster.combatStatus.defense + monsterCurrentEffects.combatEnchantment.defense + Math.floor(monsterCurrentAttributes.agility / 2)

                    let totalDamage = heroTotalAttack - monsterDefense > 0 ? Math.ceil(heroTotalAttack - monsterDefense) : 0

                    if (attackElement) {
                        const monsterResistance = monsterCurrentEffects.resistances[attackElement]
                        totalDamage = Math.ceil(heroTotalAttack * ((100 - monsterResistance) / 100) - (monsterDefense / 2))
                        messages.push(`${(hero.name)} causou ${totalDamage} de dano de ${attackElement}!`)
                    } else {
                        messages.push(`${(hero.name)} causou ${totalDamage} de dano!`)
                    }

                    currentMonster.combatStatus.health = currentMonster.combatStatus.health - totalDamage
                }
            }
            if (itemType.includes("heal")) {
                if (itemInInventory.enchantment.overTurn) {
                    const heal = itemInInventory.enchantment.overTurn.heal
                    const totalEffectiveHeal = hero.combatStatus.health + heal <= maxHealth ? heal : maxHealth - hero.combatStatus.health
                    hero.combatStatus.health = hero.combatStatus.health + totalEffectiveHeal <= maxHealth ? hero.combatStatus.health + totalEffectiveHeal : maxHealth
                    messages.push(`${hero.name} recuperou ${totalEffectiveHeal} de vida`)

                    const isHeroPoisoned = hero.effects.some((effect) => {
                        if (effect.overTurn) return effect.overTurn.poison > 0
                    })
                    if (isHeroPoisoned) {
                        hero.effects.filter(effect => {
                            return !effect.overTurn?.poison
                        })
                        messages.push(`${hero.name} foi curado do envenenamento`)
                    }

                }
            }
            const newHero = this.heroService.removeInventoryItem(itemInInventory, baseHero)
            hero.inventory = newHero.inventory

            await this.heroService.updateUserHero(user, baseHero)
        }

        if (!itemName && hero.combatStatus.health > 0) {
            const monsterDefense = currentMonster.combatStatus.defense + monsterCurrentEffects.combatEnchantment.defense + Math.floor(monsterCurrentAttributes.agility / 2)
            let totalDamage = 0
            if (hero.equipment.rightHand) {
                const heroAttack = hero.combatStatus.attack
                const heroWeaponAttribute = hero.equipment.rightHand.modifier as keyof IStatus
                /* Implementar verificação de elemento */
                const attackElement = returnActionElement(hero.equipment.rightHand.type.split(' '))
                const heroTotalAttack = calculateTotalAttack(heroAttack, heroCurrentEffects.combatEnchantment.attack, heroCurrentAttributes, heroWeaponAttribute)


                totalDamage = heroTotalAttack - monsterDefense > 0 ? Math.ceil(heroTotalAttack - monsterDefense) : 0

                if (attackElement) {
                    const monsterResistance = monsterCurrentEffects.resistances[attackElement]
                    totalDamage = Math.ceil(heroTotalAttack * ((100 - monsterResistance) / 100) - (monsterDefense / 2))
                }

                messages.push(`${(hero.name)} causou ${totalDamage} de dano!`)
            } else {
                const heroTotalBareHandAttack = calculateTotalAttack(1, heroCurrentEffects.combatEnchantment.attack, heroCurrentAttributes, "strength")
                totalDamage = heroTotalBareHandAttack - monsterDefense > 0 ? Math.ceil(heroTotalBareHandAttack - monsterDefense) : 0
            }
            currentMonster.combatStatus.health = currentMonster.combatStatus.health - totalDamage
        }

        if (currentMonster.combatStatus.health <= 0) {
            isMonsterAlive = false
            messages.push(`${captalizeName(game.monsters[0].name)} foi morto!`)
            const monsterGold = currentMonster.reward[0]
            const monsterXp = currentMonster.reward[1]
            messages.push(`Você recebeu ${monsterGold} moedas de ouro e ${monsterXp} xp!`)
            const currentHero = await this.heroService.findById(user, heroId)
            currentHero.gold += monsterGold
            currentHero.experience += monsterXp

            const currentMonsters = game.monsters.filter(monster => monster.combatStatus.health > 0)
            game.monsters = currentMonsters
            if (currentMonsters.length >= 1) {
                messages.push(`${captalizeName(game.monsters[0].name)} apareceu`)
            } else {
                messages.push(`Você ganhou!`)
                game.status = "win"
                const goldreward = game.reward[0]
                const xpReward = game.reward[0]
                currentHero.gold += goldreward
                currentHero.experience += xpReward
            }

            this.heroService.updateUserHero(user, currentHero)
        }


        if (isMonsterAlive) {
            messages.push(`${captalizeName(currentMonster.name)} utilizou ${monsterAction.name}!`)
            if (monsterActionDefinition.includes("attack")) {
                let monsterAttack = currentMonster.combatStatus.attack
                if (monsterAction.combat?.attack) monsterAttack = monsterAction.combat.attack

                if (!monsterActionDefinition.includes("buff")) {
                    const attackEffects = monsterAction.effect as unknown as Partial<CombatEffects>

                    if (attackEffects) {
                        const effect = {
                            ...attackEffects,
                            duration: {
                                duration: attackEffects.duration?.duration as unknown as number * monsterCurrentAttributes.magic,
                                startTurn: currentTurn
                            }
                        }

                        messages.push(`${captalizeName(currentMonster.name)} causou ${JSON.stringify(effect)}!`)
                        hero.effects.push(effect)
                    }

                }

                const monsterTotalAttack = calculateTotalAttack(monsterAttack, monsterCurrentEffects.combatEnchantment.attack, monsterCurrentAttributes, monsterActionAttribute)

                const heroDefense = hero.combatStatus.defense + heroCurrentEffects.combatEnchantment.defense + Math.floor(heroCurrentAttributes.agility / 2)

                let totalDamage = monsterTotalAttack - heroDefense > 0 ? Math.ceil(monsterTotalAttack - heroDefense) : 0

                if (monsterActionElement) {
                    const heroResistance = hero.combatStatus.effects.resistances[monsterActionElement] + heroCurrentEffects.resistances[monsterActionElement]
                    totalDamage = Math.ceil(monsterTotalAttack * ((100 - heroResistance) / 100) - (heroDefense / 2))
                }

                messages.push(`${captalizeName(currentMonster.name)} causou ${totalDamage} de dano!`)
                hero.combatStatus.health = hero.combatStatus.health - totalDamage
            }

            if (monsterActionDefinition.includes("buff")) {
                const buffEffects = {
                    ...monsterAction.effect,
                    duration: {
                        duration: monsterAction.effect?.duration,
                        startTurn: currentTurn
                    }
                } as unknown as Partial<CombatEffects>

                if (buffEffects) {
                    if (buffEffects.duration) {
                        buffEffects.duration.duration = buffEffects.duration.duration * monsterCurrentAttributes.magic
                    }
                    messages.push(`${captalizeName(currentMonster.name)} buffs: ${JSON.stringify(buffEffects)}!`)
                }

                currentMonster.effects.push(buffEffects)
            }

            if (monsterActionDefinition.includes("heal")) {
                const heal = monsterAction.effect?.overTurn?.heal as number
                const monster = await this.monsterService.findOneByName(currentMonster.name)
                const maxHealth = monster?.combatStatus.health as number
                currentMonster.combatStatus.health = currentMonster.combatStatus.health + heal < maxHealth ? currentMonster.combatStatus.health + heal : maxHealth
            }

            game.monsters[0] = currentMonster
        }




        game.hero = hero

        if (hero.combatStatus.health <= 0) {
            messages.push(`${hero.name} foi morto!`)
            messages.push(`Você perdeu!`)
            game.status = 'lost'
        }

        const updatedGame = await this.gameRepository.updateGame(game)


        return { game: updatedGame, messages }
    }


}