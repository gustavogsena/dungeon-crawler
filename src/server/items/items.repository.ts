import { Service } from "typedi";
import { CreateItemDto } from "./dtos/createItem.dto";
import { Item } from "./items.model";
import { IUser } from "../user/user.schema";

@Service()
export class ItemsRepository {
    constructor() { }

    async findAll() {
        const items = await Item.find().lean()
        return items
    }

    async findItemByName(itemName: string) {
        const [item] = await Item.find({ name: itemName }).lean()
        return item
    }

    async findItemByLevel(level: number) {
        const [items] = await Item.find({ level: { $lt: level } }).lean()
        return items
    }

    async create(createItemDto: CreateItemDto) {
        const newItem = (await Item.create(createItemDto)).toJSON()
        return newItem
    }
}