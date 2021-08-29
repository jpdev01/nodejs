import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRoute = Router();

userRoute.post('/insert', userController.register);

export default userRoute;