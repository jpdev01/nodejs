import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

export class App {
    private express: express.Application;
    private porta = 9000;

    constructor() {
        this.express = express();
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log("Servidor iniciado na porta " + this.porta);
        })
    }
}