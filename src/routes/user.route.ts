import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/insert', userController.register);

export default router;