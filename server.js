import express from 'express';
import { createServer } from 'http';
import { Server as socketio } from 'socket.io';
import cors from "cors";

import { socketEvents } from './controllers/socket.controller.js';
import * as db from "./db/config.js";
import * as routes from "./routes/index.js";


export class AppServer {

    static io;

    constructor(){
        this.app = express();
        this.server = createServer(this.app);
        AppServer.io = new socketio(this.server, {cors: { origin: '*' }});

        this.connectToDb();
        this.listen();
        this.setMiddlewares();
        this.setRoutes();
        this.initSocketListen();
    }


    async connectToDb(){
        await db.connectToDb();
    }


    listen() {
        const PORT = process.env.PORT;
        this.server.listen(PORT, () => {
            console.log(`listen on port ${PORT}`);
        });
    }


    setMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors())
    }


    setRoutes() {
        this.app.use('/api/auth', routes.auth);
        this.app.use('/api/user', routes.user);
        this.app.use('/api/messages', routes.messages);
    }


    initSocketListen() {
        AppServer.io.on('connection', (socket) => socketEvents(socket, AppServer.io))
    }

}