import { Service } from "typedi"
import { DungeonRepository } from "./dungeon.repository"
import { CreateDungeonDto } from "./dtos/createDungeon.dto"
import { MonsterService } from "../monster/monster.service"
import { IDungeon } from "./dungeon.schema"
import { IMonster } from "../monster/monster.schema"
import { BadRequestError } from "routing-controllers"

@Service()
export class DungeonService {
    constructor(
        private readonly dungeonRepository: DungeonRepository,
        private readonly monsterService: MonsterService
    ) { }

    async findAll(level: number) {
        const dungeons = await this.dungeonRepository.findAll(level)
        return dungeons
    }

    async findOne(dungeonId: string) {
        const dungeon = await this.dungeonRepository.findOne(dungeonId)
        if (!dungeon) throw new BadRequestError('Dungeon nao encontrada')
        return dungeon
    }

    async create(createDungeonDto: CreateDungeonDto) {
        const dungeon = await this.dungeonRepository.create(createDungeonDto)
        return dungeon
    }

    async findDungeonInformation(dungeonId: string) {
        const dungeon = await this.findOne(dungeonId)
        const id = dungeon.id
        const difficulty = dungeon.difficulty
        const monstersArray = await this.monsterService.findMonstersArray(dungeon.monsters) as unknown as IMonster[]
        const monsters = monstersArray.map(monster => monster ? monster.difficulty : 0)
        const elements = monstersArray.reduce((acc: string[], current: IMonster) => {
            acc = [...acc, ...current?.elements]
            acc = acc.filter((item, index) => acc.indexOf(item) === index)

            return acc
        }, [])

        const name = dungeon.name
        const background = dungeon.background
        const reward = dungeon.reward

        return {
            id,
            difficulty,
            monsters,
            elements,
            name,
            background,
            reward
        }
    }

}