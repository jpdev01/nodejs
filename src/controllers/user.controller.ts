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
            avatar: user.avatar,
            password: user.password
        }
        return resp.json(messageResponse);
        //return resp.json(user);
    }

    public async authenticate(req: Request, resp: Response): Promise<Response>{
        // Destructuring assignment (es6) 
        // extrai as propriedades name e password para duas variaveis.
        // const name = req.body.name;
        const { name, password } = req.body;

        const user = await userModel.findOne({
            name: name
        });
        if(!user){
            return resp.status(400).send({
                message: "Ops! Usuário não encontrado."
            });
        }
        const correctPassword = await user.comparePassword(password);
        if(!correctPassword){
            return resp.status(400).send({
                message: "Ops! Senha incorreta."
            });
        }

        return resp.json({
            user: user,
            token: user.generateToken()
        });
    }
}

export default new UserController();