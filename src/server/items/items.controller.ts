import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { ItemsService } from "./items.service";
import { CreateItemDto } from "./dtos/createItem.dto";
import type { IUser } from "../user/user.schema";
import { BuyItemBodyDto } from "./dtos/BuyItemBody.dto";

@Service()
@JsonController('/items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Authorized()
    @Get()
    async findAll() {
        console.log(this.itemsService)
        const items = await this.itemsService.findAll()
        return items
    }

    @Authorized()
    @Get('/:itemName')
    async findOne(@Param('itemName') itemName: string) {
        const item = await this.itemsService.findItemByName(itemName)
        return item
    }

    @Authorized()
    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        const item = await this.itemsService.create(createItemDto)
        return item
    }

  

}