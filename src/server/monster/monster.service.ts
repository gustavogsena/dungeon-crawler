import { Service } from "typedi";
import { CreateMonsterDto } from "./dtos/createMonster.dto";
import { MonsterRepository } from "./monster.repository";

@Service()
export class MonsterService {
    constructor(private readonly monsterRepository: MonsterRepository) { }

    async findOneByName(monsterName: string) {
        const monster = await this.monsterRepository.findOneByName(monsterName)
        return monster
    }

    async findAll() {
        const monsters = await this.monsterRepository.findAll()
        return monsters
    }
    
    async findMonstersArray(monstersName: string[]) {
        const monsters = await Promise.all(monstersName.map(async (name) => {
            return await this.findOneByName(name)
        }))
        return monsters
    }

    async create(createMonsterDto: CreateMonsterDto) {
        const monster = await this.monsterRepository.create(createMonsterDto)
        return monster
    }
}