import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { CreateHeroDto } from "./dtos/createHero.dto";
import type { IUser } from "../user/user.schema";
import { HeroService } from "./hero.service";
import { BuyItemBodyDto } from "../items/dtos/BuyItemBody.dto";

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
    @Post()
    async createHero(@CurrentUser() user: IUser, @Body() createHeroDto: CreateHeroDto) {
        const username = user.username
        const newHero = await this.heroService.create(username, createHeroDto)
        return newHero
    }

    @Authorized()
    @Post("/buy")
    async buyItem(@CurrentUser() user: IUser, @Body() body: BuyItemBodyDto) {
        const updatedUser = await this.heroService.buyItem(user, body.itemName, body.heroId)
        return updatedUser;
    }

}