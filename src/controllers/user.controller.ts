import { Request, Response } from "express";
import userModel from "../models/user.model";

class UserController {

    public async register(req: Request, resp: Response): Promise<Response>{
        // create ja vem do mongoouse, cria registro, metodo pronto
        // crate é uma promisse, ou seja, precisamos esperar o mongoose criar e me retornar o usuario.
        // para isso, vamos usar o async e usar await para esperar o retorno
        const user = await userModel.create(req.body);
        const messageResponse = {
            text: 'Usuário criado com sucesso!',
            _id: user._id,
            name: user.name,
            avatar: user.avatar
        }
        return resp.json(messageResponse);
        //return resp.json(user);
    }
}

export default new UserController();