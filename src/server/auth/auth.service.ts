import { Service } from "typedi";
import { SignInDto } from "./dtos/signIn.dto";
import { SignUpDto } from "./dtos/signUp.dto";
import { UserService } from "../user/user.service";
import { JWTService } from "./jwt.service";
import { BadRequestError, UnauthorizedError } from "routing-controllers";

@Service()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JWTService
    ) { }

    async signIn({ username, password }: SignInDto) {
        const user = await this.userService.findOne(username)

        if (user && user.password === password) {
            const payload = {
                username: user.username,
                name: user.name,
                surname: user.surname,
            }

            const token = this.jwtService.sign(payload)
            return {
                token,
                user
            }
        }

        throw new UnauthorizedError();
    }

    async signUp(signUpDto: SignUpDto) {
        const maybeUser = await this.userService.findOne(signUpDto.username)

        if (maybeUser) {
            throw new BadRequestError('Nome de usuário já utilizado')
        }

        const newUser = await this.userService.create(signUpDto)
        const payload = {
            username: newUser.username,
            name: newUser.name,
            surname: newUser.surname,
        }

        const token = this.jwtService.sign(payload)

        return {
            token,
            user: newUser
        }

    }
}