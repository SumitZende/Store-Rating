import express from 'express';
import { modifyPassword, signin, signup } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.post('/register',signup);
authRouter.post('/login',signin);
authRouter.put('/change-password',protect,modifyPassword);

export default authRouter;
