import { Service } from "typedi";
import { Hero, HeroInGame, MonsterInGame } from "../../types";
import { IDungeon } from "../dungeon/dungeon.schema";
import { MonsterService } from "../monster/monster.service";
import { IMonster } from "../monster/monster.schema";
import { IGame } from "./game.schema";
import { v4 as uuid } from "uuid";
import { Game } from "./game.model";
import { BadRequestError } from "routing-controllers";

@Service()
export class GameRepository {
    constructor() { }

    async findCurrentGame(gameId: string, heroId: string) {
        const game = await Game.findOne({
            id: gameId, status: "started", "hero.id": heroId
        }).lean()
        return game
    }

    async createNewGame(game: IGame) {
        const newGame = (await Game.create(game)).toJSON()
        return newGame
    }

    async updateGame(updateGame: IGame) {
        const newGame = await Game.findOneAndUpdate({ id: updateGame.id }, updateGame, { new: true }).lean()
        return newGame
    }
}