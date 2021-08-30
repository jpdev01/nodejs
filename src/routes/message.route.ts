import { Router } from 'express';
import messageController from '../controllers/message.controller';

const messageRoute = Router();

messageRoute.post('/:id', messageController.send)
export default messageRoute;