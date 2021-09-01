import { Request, Response } from "express";
import messageModel from "../models/message.model";
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
    
    public getById(req: Request, res: Response): Response{
        return res.json(req.userChat);
    }

    public async list(req: Request, res: Response) {
        const currentUserId = req.user._id;

        // query mongoDB
        //ne = not equals
        // query traz todos os usuarios do sitema, menos o atual logado
        const allUsers = await userModel.find({
            _id: { 
                $ne: currentUserId
             }
        });

        // nao pode usar await pq sao varias consultas. é um array de promise's
        // digamos que sejam 50 usuarios, trará 50 promises do findChat
        // nesse caso usaremos Promise.all

        /*
        const promise1 = await ...;
        const promise2 = await ...;
        const result = await Promise.all(promise1,promise2);
        */

        const usersLastMessage = await Promise.all(
            allUsers.map(user => {
                return messageModel.findChat(currentUserId, user._id)
                    .sort('-createdAt')
                    .limit(1)
                    .map(messages => {
                        //para cada user ele fará isso
                        return {
                            _id: user._id,
                            name: user.name,
                            avatar: user.avatar,
                            lastMessage: messages[0] ? messages[0].text : null,
                            lastMessageDate: messages[0] ? messages[0].createdAt : null
                        }
                    });
            })
        );

    
        /*
            // o "menos" - é para vir em order descrescente
            // limit faz pegar apenas uma mensagem.
            */

        return res.json(allUsers);
    }
}

export default new UserController();