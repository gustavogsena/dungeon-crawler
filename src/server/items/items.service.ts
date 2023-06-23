import { Service } from "typedi";
import { CreateItemDto } from "./dtos/createItem.dto";
import { ItemsRepository } from "./items.repository";
import { IItem } from "./items.schema";
import { IUser } from "../user/user.schema";
import { BadRequestError } from "routing-controllers";
import { UserService } from "../user/user.service";
import { HeroService } from "../hero/hero.service";

@Service()
export class ItemsService {
    constructor(
        private readonly itemsRepository: ItemsRepository,
        private readonly userService: UserService
    ) { }

    async findAll() {
        const items = await this.itemsRepository.findAll()
        return items
    }

    async findItemByName(itemName: string) {
        const item = await this.itemsRepository.findItemByName(itemName) as unknown as IItem
        if (!item) throw new BadRequestError('Item não encontrado')
        return item
    }

    async findItemByNames(itemName: string) {
        const item = await this.itemsRepository.findItemByName(itemName) as unknown as IItem

        if (!item) throw new BadRequestError('Item não encontrado')
        return item
    }

    async findItemByLevel(level: number) {
        const items = await this.itemsRepository.findItemByLevel(level)
        return items
    }

    async create(createItemDto: CreateItemDto) {
        const item = await this.itemsRepository.create(createItemDto)
        return item
    }



}