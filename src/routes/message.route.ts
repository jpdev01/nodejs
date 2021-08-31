import { Router } from 'express';
import messageController from '../controllers/message.controller';
import authMiddleware from '../middlewares/auth.middleware';

const messageRoute = Router();

// o segundo param para frente sao as funcoes executadas
messageRoute.post('/:receiverId',
    authMiddleware.authUserByParams,
    authMiddleware.authUserByToken,
    messageController.send);
//messageRoute.post('/:receiverId/:message', messageController.send)

messageRoute.get(
    '/:receiverId',
    authMiddleware.authUserByParams,
    authMiddleware.authUserByToken,
    messageController.list);
    
export default messageRoute;