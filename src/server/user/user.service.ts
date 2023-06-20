import { Service } from "typedi";
import { UserRepository } from "./user.repository";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { CreateUserDto } from "./dtos/createUser.dto";
import { IHero } from "../hero/hero.schema";

@Service()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async findAll() {
        const users = await this.userRepository.findAll()
        return users
    }

    async findOne(username: string) {
        const user = await this.userRepository.findOne(username)
        return user
    }

    async create(createUserDto: CreateUserDto) {
        const user = await this.userRepository.create(createUserDto)
        return user
    }

    async update(username: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.update(username, updateUserDto)
        return user
    }

    async delete(username: string) {
        const user = await this.userRepository.delete(username)
        return user
    }

    async createHero(username: string, hero: IHero) {
        const newHero = await this.userRepository.createHero(username, hero)
        return newHero
    }
}
