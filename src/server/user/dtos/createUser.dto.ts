import { MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @MinLength(4)
    @MaxLength(12)
    username: string;

    @MinLength(2)
    @MaxLength(16)
    name: string;

    @MinLength(2)
    @MaxLength(24)
    surname: string;

    @MinLength(4)
    @MaxLength(48)
    password: string;
}

