import { Service } from "typedi";

import { Hero } from "./hero.model";
import { IHero } from "./hero.schema";
import { HerroClassType } from "../../types";

@Service()
export class HeroRepository {
    constructor() { }

    async createNewHeroClassPrototype(heroPrototype: IHero) {
        const newHeroClass = await Hero.create(heroPrototype)
        return newHeroClass
    }

    async findHeroClassPrototype(heroClass: HerroClassType) {
        const heroClassPrototype = await Hero.find({ class: heroClass })
        return heroClassPrototype
    }
}