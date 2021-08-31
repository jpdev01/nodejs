import { UserInterface } from './../interfaces/user.interface';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model";

class AuthMiddleware {

    public async authUserByToken(req: Request, resp: Response, next: NextFunction): Promise<Response | void> {
        const token = req.query.token || req.headers['x-access-token'];

        if (!token) {
            return resp.status(401).send({
                messsage: 'Acesso restrito!'
            });
        }

        try {
            const userToken = jwt.verify(String(token), 'SECRET') as UserInterface;
            const user = await userModel.findById(userToken._id);

            if (!user) {
                return resp.status(400).send({
                    message: 'Usuário não existe no sistema!'
                });
            }

            req.user = user;

            //next é a proxima funcao do mapeamento
            return next();

        } catch (error) {
            return resp.status(401).send({
                message: 'Token inválido!'
            });
        }
    }

    public async authUserByParams(req: Request, resp: Response, next: NextFunction): Promise<Response | void> {

        try {
            const user = await userModel.findById(req.params.receiverId);

            if (!user) {
                return resp.status(400).send({
                    message: 'Usuário não existe no sistema!'
                });
            }

            req.user = user;
            req.userChat = user;

            //next é a proxima funcao do mapeamento
            return next();

        } catch (error) {
            return resp.status(401).send({
                message: 'Usuário inválido!'
            });
        }
    }
}

export default new AuthMiddleware();