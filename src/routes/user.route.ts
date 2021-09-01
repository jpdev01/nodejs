import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const userRoute = Router();

userRoute.post('/insert', userController.register);
userRoute.post('/login', userController.authenticate);

userRoute.get(
    '/:id', 
    authMiddleware.authUserByParams, 
    authMiddleware.authUserByToken, 
    userController.getById);

    userRoute.get(
        '/', 
        authMiddleware.authUserByToken, 
        userController.list);
    

export default userRoute;