import { model } from "mongoose";
import { IDungeon, dungeonSchema } from "./dungeon.schema";

export const Dungeon = model<IDungeon>('Dungeon', dungeonSchema)