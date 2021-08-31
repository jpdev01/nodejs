import { Request, Response } from "express";
import messageModel from "../models/message.model";

class MessageController {

    public async send(req: Request, resp: Response): Promise<Response> {

        const message = await messageModel.create({
            text: req.body.text,
            sender: req.user._id,
            receiver: req.userChat._id
        });

        return resp.json(message);
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const currentUserId = req.user._id;
        const receiverUserId = req.userChat._id;

        const messages = await messageModel.find({
            $or: [
                { $and: [{ sender: currentUserId }, { receiver: receiverUserId }] },
                { $and: [{ sender: receiverUserId }, { receiver: currentUserId }] }
            ]
        })
            .sort('createdAt');
        //sort ordena pela propriedade

        const messagesChat = messages.map(message => {
            return {
                text: message.text,
                createdAt: message.createdAt,
                isFromSender: message.sender == String(currentUserId)
            }
        });

        return res.json(messagesChat);
    }
}

export default new MessageController();
