import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Patch, Post } from "routing-controllers";
import { Service } from "typedi";
import { CreateHeroDto } from "./dtos/createHero.dto";
import type { IUser } from "../user/user.schema";
import { HeroService } from "./hero.service";
import { BuyItemBodyDto } from "../items/dtos/BuyItemBody.dto";
import type { HeroClassType } from "../../types";
import { CreateHeroClassDto } from "./dtos/createHeroClass.dto";
import { EquipItemDto } from "./dtos/equipItem.dto";
import { UnequipItemDto } from "./dtos/unequipItem.dto";

@Service()
@JsonController('/hero')
export class HeroController {

    constructor(private readonly heroService: HeroService) { }

    @Authorized()
    @Get('/:id')
    async selectHeroById(@CurrentUser() user: IUser, @Param('id') id: string) {
        const newHero = await this.heroService.findById(user, id)
        return newHero
    }

    @Authorized()
    @Get('/class/:heroClass')
    async findBasicHeroClass(@CurrentUser() user: IUser, @Param('heroClass') heroClass: HeroClassType) {
        const newHero = await this.heroService.findBasicClass(heroClass)
        return newHero
    }

    @Authorized()
    @Post()
    async createHero(@CurrentUser() user: IUser, @Body() createHeroDto: CreateHeroDto) {
        const username = user.username
        const newHero = await this.heroService.create(username, createHeroDto)
        return newHero
    }

    @Authorized()
    @Patch("/buy")
    async buyItem(@CurrentUser() user: IUser, @Body() body: BuyItemBodyDto) {
        const updatedUser = await this.heroService.buyItem(user, body.itemName, body.heroId)
        return updatedUser;
    }

    @Authorized()
    @Patch("/equip")
    async equipItem(@CurrentUser() user: IUser, @Body() body: EquipItemDto) {
        const updatedUser = await this.heroService.equipItem(user, body.itemName, body.heroId)
        return updatedUser;
    }

    @Authorized()
    @Patch("/unequip")
    async unequipItem(@CurrentUser() user: IUser, @Body() body: UnequipItemDto) {
        const updatedUser = await this.heroService.unequipItem(user, body.heroId, body.itemSlot)
        return updatedUser;
    }

    @Authorized()
    @Delete('/:id')
    async deleteHero(@CurrentUser() user: IUser, @Param('id') heroId: string) {
        const username = user.username
        const newHero = await this.heroService.deleteHero(username, heroId)
        return newHero
    }
}