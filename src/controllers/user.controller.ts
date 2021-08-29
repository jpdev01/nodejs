import { Request, Response } from "express";
import userModel from "../models/user.model";

class UserController {

    public register(req: Request, resp: Response){
        // create ja vem do mongoouse, cria registro, metodo pronto
        const user = userModel.create(req.body);
        return resp.json(user);
    }
}

export default new UserController();