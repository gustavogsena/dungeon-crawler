import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";
import { Service } from "typedi";
import { UpdateUserDto } from "./dtos/updateUser.dto";

@Service()
@JsonController('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll() {
        const users = await this.userService.findAll()
        return users
    }

    @Get('/:username')
    async findOne(@Param('username') username: string) {
        const user = await this.userService.findOne(username)
        return user
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto)
        return user
    }

    @Put('/:username')
    async update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.userService.update(username, updateUserDto)
        return user
    }
    
    @Delete('/:username')
    async delete(@Param('username') username: string) {
        const user = await this.userService.delete(username)
        return user
    }

}