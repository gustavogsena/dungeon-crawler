import { Get, JsonController } from "routing-controllers";
import { connect, model, Schema } from 'mongoose'

interface IUser {
    name: string,
    surname: string,
    email: string
}

const userSchema = new Schema<IUser>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    surname: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    }
})

const User = model<IUser>('User', userSchema)

@JsonController('/users')
export class UserController {

    @Get()
    async getAll() {
        await connect(process.env.DATABASE_URL ?? '');
        await User.insertMany([
           { name: "Gustavo", surname: "Sena", email: "gustavo@mail.com"},
           { name: "Julia", surname: "Gruppi", email: "julia@mail.com"}

        ])

        const users = await User.find()
        return users
    }

    async getOne() {

    }

}