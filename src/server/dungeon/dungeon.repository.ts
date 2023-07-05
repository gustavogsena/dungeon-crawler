import { Service } from "typedi";
import { Dungeon } from "./dungeon.model";
import { CreateDungeonDto } from "./dtos/createDungeon.dto";
import { v4 as uuid } from "uuid";

@Service()
export class DungeonRepository {
    constructor() { }

    async findAll(level: number) {
        const dungeons = await Dungeon.find({ difficulty: { $lte: level } }).lean()
        return dungeons
    }

    async findOne(dungeonId: string) {
        const dungeon = await Dungeon.findOne({
            id: dungeonId
        }).lean()
        return dungeon
    }

    async create(createDungeonDto: CreateDungeonDto) {
        const newDungeon = { ...createDungeonDto, id: uuid() }
        const dungeon = (await Dungeon.create(newDungeon)).toJSON()
        return dungeon
    }

}