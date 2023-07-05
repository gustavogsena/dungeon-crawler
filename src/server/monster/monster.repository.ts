import { Service } from "typedi";
import { Monster } from "./monster.model";
import { CreateMonsterDto } from "./dtos/createMonster.dto";

@Service()
export class MonsterRepository {
    constructor() { }

    async findOneByName(monsterName: string) {
        const monster = await Monster.findOne({ name: monsterName }).lean()
        return monster
    }

    async findAll() {
        const monsters = await Monster.find()
        return monsters
    }

    async create(monster: CreateMonsterDto) {
        const monsters = await Monster.create(monster)
        return monsters
    }
}