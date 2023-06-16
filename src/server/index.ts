import 'reflect-metadata'
import * as dotenv from 'dotenv';
dotenv.config();
import { createExpressServer, useContainer } from 'routing-controllers';
import { UserController } from './user/user.controller';
import Container from 'typedi';
import { connect } from 'mongoose';



const port = process.env.PORT
const host = process.env.HOST

useContainer(Container)

createExpressServer({
    controllers: [UserController],
    cors: true
}).listen(port, host, async () => {
    await connect(process.env.DATABASE_URL ?? '');
    console.log(`Servidor iniciado em ${host}:${port}`)
})
