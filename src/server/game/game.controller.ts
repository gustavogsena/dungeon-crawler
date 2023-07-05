import { Authorized, Body, CurrentUser, Get, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import type { IUser } from "../user/user.schema";
import { GameService } from "./game.service";

export class CreateGameDto {
    heroId: string
    dungeonId: string
}

@Service()
@JsonController('/game')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Authorized()
    @Post('/start')
    async createNewGame(@CurrentUser() user: IUser, @Body() createGameDto: CreateGameDto) {
        console.log(createGameDto)
        const game = await this.gameService.createNewGame(user, createGameDto.heroId, createGameDto.dungeonId)
        return game
    }

    @Authorized()
    @Post('/action')
    async monsterAction(@CurrentUser() user: IUser, @Body() body: any) {
        const game = await this.gameService.action(user, body.gameId, body.heroId, body.itemName)
        return game
    }
}