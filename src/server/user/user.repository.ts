import { Service } from "typedi";
import { CreateUserDto } from "./dtos/createUser.dto";
import { User } from "./user.model";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { IUser } from "./user.schema";
import { IHero } from "../hero/hero.schema";

@Service()
export class UserRepository {
    constructor() { }

    async findAll() {
        const users = await User.find().lean()
        return users
    }

    async findOne(username: string) {
        const user = await User.findOne({
            username
        }).lean()
        return user
    }

    async create(createUserDto: CreateUserDto) {
        const newUser: IUser = { ...createUserDto, crystal: 0, heroes: [] }
        const user = (await User.create(newUser)).toJSON()
        return user
    }

    async update(username: string, updateUserDto: UpdateUserDto) {
        const user = await User.findOneAndUpdate({ username }, updateUserDto, {new: true}).lean()
        return user
    }

    async delete(username: string) {
        const user = await User.findOneAndDelete({ username }).lean()
        return user
    }


    async createHero(username: string, hero: IHero) {
        const newHero = await User.findOneAndUpdate({ username }, {
            $push: {
                heroes: hero
            }
        }, {new: true}).lean()
        return newHero
    }
}