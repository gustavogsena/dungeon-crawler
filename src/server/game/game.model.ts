import { model } from "mongoose";
import { IGame, gameSchema } from "./game.schema";

export const Game = model<IGame>('Game', gameSchema)