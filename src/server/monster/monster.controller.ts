import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { MonsterService } from "./monster.service";
import { CreateMonsterDto } from "./dtos/createMonster.dto";

@Service()
@JsonController('/monster')
export class MonsterController {
    constructor(private readonly monsterService: MonsterService) { }

    @Get()
    async findAll() {
        const monsters = await this.monsterService.findAll()
        return monsters
    }
    @Get('/:monsterName')
    async findOneByName(@Param('monsterName') monsterName: string) {
        const monster = await this.monsterService.findOneByName(monsterName)
        return monster
    }


    @Post()
    async create(@Body() createMonsterDto: CreateMonsterDto) {
        const monster = await this.monsterService.create(createMonsterDto)
        return monster
    }
}