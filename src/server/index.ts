import 'reflect-metadata'
import * as dotenv from 'dotenv';
dotenv.config();
import { createExpressServer, useContainer } from 'routing-controllers';
import { UserController } from './user/user.controller';
import Container from 'typedi';
import { connect } from 'mongoose';
import { AuthController } from './auth/auth.controller';
import { authorizationChecker } from './auth/checkers/authorization.checker';
import { currentUserChecker } from './auth/checkers/currentUser.checker';
import { ItemsController } from './items/items.controller';
import { HeroController } from './hero/hero.controller';
import { DungeonController } from './dungeon/dungeon.controller';
import { MonsterController } from './monster/monster.controller';
import { GameController } from './game/game.controller';



const port = process.env.PORT
const host = process.env.HOST

useContainer(Container)

createExpressServer({
    controllers: [UserController, AuthController, ItemsController, HeroController, DungeonController, MonsterController, GameController],
    cors: true,
    authorizationChecker,
    currentUserChecker
}).listen(port, host, async () => {
    await connect(process.env.DATABASE_URL ?? '');
    console.log(`Servidor iniciado em ${host}:${port}`)
})
