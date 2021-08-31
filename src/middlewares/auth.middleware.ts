import { UserInterface } from './../interfaces/user.interface';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model";

class AuthMiddleware {

    public async authUserByToken(req: Request, resp: Response, next: NextFunction) {
        const token = req.query.token || req.headers['x-acess-token'];

        if(!token){
            return resp.status(401).send({
                messsage: 'Acesso restrito!'
            });
        }

        const userToken = jwt.verify(String(token), 'SECRET') as UserInterface;
        const user = await userModel.findById(userToken._id);

        //next é a proxima funcao do mapeamento
        return next();
    }
}

export default new AuthMiddleware();