import { Service } from "typedi";
import { CreateItemDto } from "./dtos/createItem.dto";
import { ItemsRepository } from "./items.repository";
import { IItem } from "./items.schema";

@Service()
export class ItemsService {
    constructor(
        private readonly itemsRepository: ItemsRepository
    ) { }

    async finaAll() {
        const items = await this.itemsRepository.findAll()
        return items
    }

    async findItemByName(itemName: string) {
        const item = await this.itemsRepository.findItemByName(itemName) as unknown as IItem
        return item
    }

    async create(createItemDto : CreateItemDto) {
        const item = await this.itemsRepository.create(createItemDto) 
        return item
    }

}