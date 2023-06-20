import { Service } from "typedi";
import { CreateItemDto } from "./dtos/createItem.dto";
import { Item } from "./items.model";

@Service()
export class ItemsRepository {
    constructor() {}

    async findAll() {
        const items = await Item.find()
        return items
    }

    async findItemByName(itemName: string) {
        const [item] = await Item.find({name: itemName}).lean()
        return item
    }

    async create(createItemDto: CreateItemDto) {
        const newItem = (await Item.create(createItemDto)).toJSON()
        return newItem
    }
}