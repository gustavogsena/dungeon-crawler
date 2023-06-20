import { Authorized, Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { ItemsService } from "./items.service";
import { CreateItemDto } from "./dtos/createItem.dto";

@Service()
@JsonController('/items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Authorized()
    @Get()
    async findAll() {
        const items = await this.itemsService.finaAll()
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
        console.log(createItemDto)
        const item = await this.itemsService.create(createItemDto)
        
        return item
    }
}