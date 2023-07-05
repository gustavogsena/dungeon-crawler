import React from 'react'
import { CombatEffects } from '../../types'
import GameEffectItem from './GameEffectItem'


type GameEffectsType = {
    effects: Partial<CombatEffects>[],
    gameTurn: number
}
function GameEffects({ effects, gameTurn }: GameEffectsType) {
    return (
        <div>
            {effects.map((effect) =>
                <>
                    {
                        effect.duration &&
                        effect.duration.startTurn &&
                        <>
                            <span className='flex bg-amarelo-200 max-w-[150px] text-center font-bold justify-center '>
                                Duração: {effect.duration?.startTurn + effect.duration?.duration - gameTurn} / {effect.duration.duration}
                            </span>
                        </>
                    }
                    {
                        effect.combatEnchantment &&
                        effect.combatEnchantment.attack &&
                        <GameEffectItem effect={effect.combatEnchantment.attack} effectName='Ataque' />

                    }
                    {
                        effect.combatEnchantment &&
                        effect.combatEnchantment.defense &&
                        <GameEffectItem effect={effect.combatEnchantment.defense} effectName='Defesa' />
                    }

                    {
                        effect.overTurn &&
                        effect.overTurn.heal &&
                        <GameEffectItem effect={effect.overTurn.heal} effectName='Cura' />
                    }
                    {
                        effect.overTurn &&
                        effect.overTurn.poison &&
                        <GameEffectItem effect={effect.overTurn.poison} effectName='Veneno' />
                    }
                    {
                        effect.overTurn &&
                        effect.overTurn.burn &&
                        <GameEffectItem effect={effect.overTurn.burn} effectName='Queimadura' />
                    }
                    {
                        effect.resistances &&
                        effect.resistances.earth &&
                        <GameEffectItem effect={effect.resistances.earth} effectName='Resistência a terra' />
                    }
                    {
                        effect.resistances &&
                        effect.resistances.fire &&
                        <GameEffectItem effect={effect.resistances.fire} effectName='Resistência a fogo' />
                    }
                    {
                        effect.resistances &&
                        effect.resistances.ice &&
                        <GameEffectItem effect={effect.resistances.ice} effectName='Resistência a gelo' />
                    }
                    {
                        effect.resistances &&
                        effect.resistances.lightning &&
                        <GameEffectItem effect={effect.resistances.lightning} effectName='Resistência a raio' />
                    }
                    {
                        effect.statusEnchantment &&
                        effect.statusEnchantment.strength &&
                        <GameEffectItem effect={effect.statusEnchantment.strength} effectName='Força' />
                    }
                    {
                        effect.statusEnchantment &&
                        effect.statusEnchantment.agility &&
                        <GameEffectItem effect={effect.statusEnchantment.agility} effectName='Agilidade' />
                    }
                    {
                        effect.statusEnchantment &&
                        effect.statusEnchantment.magic &&
                        <GameEffectItem effect={effect.statusEnchantment.magic} effectName='Magia' />
                    }
                    {
                        effect.statusEnchantment &&
                        effect.statusEnchantment.faith &&
                        <GameEffectItem effect={effect.statusEnchantment.faith} effectName='Fé' />
                    }



                </>


            )}
        </div>
    )
}

export default GameEffects