import { Authorized, Body, CurrentUser, Get, JsonController, Post } from "routing-controllers";
import { SignInDto } from "./dtos/signIn.dto";
import { SignUpDto } from "./dtos/signUp.dto";
import { AuthService } from "./auth.service";
import { Service } from "typedi";
import type { IUser } from "../user/user.schema";


@Service()
@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/sign-in')
    async signIn(@Body() signInDto: SignInDto) {
        const response = await this.authService.signIn(signInDto)
        
        return response
    }
    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
        const user = await this.authService.signUp(signUpDto)
        return user
    }

    @Authorized()
    @Get("/myself")
    async getMyself(@CurrentUser() user: IUser) {
      return user;
    }
}