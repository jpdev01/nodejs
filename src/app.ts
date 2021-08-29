import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/user.route';

export class App {
    private express: express.Application;
    private porta = 9000;

    constructor() {
        this.express = express();
        this.listen();
        this.middlewares();
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
        const user = 'jpt';
        const password = 'admadm';
        mongoose.connect('mongodb+srv://' + user + ':'+ password + '@training-nodejs.zldnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }

    private middlewares(): void{
        // retorna um middleware que parseia nossas requsicoes em json, ou seja, só aceita json
        this.express.use(express.json());
        //prepara os cors, para que o angular consiga acessar
        this.express.use(cors());
    }

    private routes(): void{
        // primeiro param = rota inicial
        // segundo = meu arquivo de rota
        this.express.use('/users', userRoute);
    }
}