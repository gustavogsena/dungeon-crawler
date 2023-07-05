import { model } from "mongoose";
import { IMonster, monsterSchema } from "./monster.schema";

export const Monster = model<IMonster>('Monster', monsterSchema)