import { Schema, model } from "mongoose"
import { IUser, userSchema } from "./user.schema"


export const User = model<IUser>('User', userSchema)