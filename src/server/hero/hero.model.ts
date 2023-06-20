import { model } from "mongoose";
import { IHero, heroSchema } from "./hero.schema";

export const Hero = model<IHero>('Hero', heroSchema)