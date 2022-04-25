import {Router} from 'express';
import {authController} from '../controllers/auth.controller.js';

export const authRouter = new Router();

authRouter.post('/login', authController.authenticate);