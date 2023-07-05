import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { CreateDungeonDto } from "./dtos/createDungeon.dto";
import { DungeonService } from "./dungeon.service";
import { IMonster } from "../monster/monster.schema";
import { MonsterService } from "../monster/monster.service";

@Service()
@JsonController('/dungeon')
export class DungeonController {
    constructor(
        private readonly dungeonService: DungeonService
    ) { }

    @Authorized()
    @Get()
    async findAll(@QueryParam("level") level: number) {
        const dungeons = await this.dungeonService.findAll(level)
        return dungeons
    }

    @Authorized()
    @Get('/:dungeonId')
    async findOne(@Param('dungeonId') dungeonId: string) {
        const dungeon = await this.dungeonService.findOne(dungeonId)
        return dungeon
    }

    @Authorized()
    @Get('/info/:dungeonId')
    async findMonstersArray(@Param('dungeonId') dungeonId: string) {
        const dungeon = await this.dungeonService.findDungeonInformation(dungeonId)
        return dungeon
    }

    @Authorized()
    @Post()
    async create(@Body() createDungeonDto: CreateDungeonDto) {
        const newDungeon = this.dungeonService.create(createDungeonDto)
        return newDungeon
    }

}