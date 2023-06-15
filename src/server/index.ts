import 'reflect-metadata'
import * as dotenv from 'dotenv';
dotenv.config();
import { createExpressServer } from 'routing-controllers';
import { UserController } from './user/user.controller';

const port = process.env.PORT
const host = process.env.HOST

createExpressServer({
    controllers: [UserController],
    cors: true
}).listen(port, host, () => {
    console.log(`Servidor iniciado em ${host}:${port}`)
})
