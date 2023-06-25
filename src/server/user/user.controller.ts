import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";
import { Service } from "typedi";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import type { IUser } from "./user.schema";

@Service()
@JsonController('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Authorized()
    @Get()
    async findAll(@CurrentUser() user: IUser) {
        const users = await this.userService.findAll()
        return users
    }

    @Authorized()
    @Get('/:username')
    async findOne(@Param('username') username: string) {
        const user = await this.userService.findOne(username)
        return user
    }

    @Authorized()
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto)
        return user
    }

    @Authorized()
    @Put('/:username')
    async update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.userService.update(username, updateUserDto)
        return user
    }
    
    @Authorized()
    @Delete('/:username')
    async delete(@Param('username') username: string) {
        const user = await this.userService.delete(username)
        return user
    }
    
}