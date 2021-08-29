import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

export class App {
    private express: express.Application;
    private porta = 9000;

    constructor() {
        this.express = express();
        this.listen();
        this.database();
    }

    //inicia tudo
    public getApp(): express.Application {
        return this.express;
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log("Servidor iniciado na porta " + this.porta);
        });
    }

    private database(): void{
        mongoose.connect('mongodb+srv://jpt:<password>@training-nodejs.zldnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    }
}