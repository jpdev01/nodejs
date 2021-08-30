import { Request, Response } from "express";
import messageModel from "../models/message.model";

class MessageController {

    public async send(req: Request, resp: Response): Promise<Response>{

        const message = await messageModel.create({
            text: req.body.text,
            sender: '',
            receiver: ''
        });

        return resp.json(message);
    }
}

export default new MessageController();
