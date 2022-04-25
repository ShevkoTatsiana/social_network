import {Router} from 'express';
import {usersRouter} from './routes/user.route.js';
import {authRouter} from './routes/auth.route.js';

export const rootRouter = new Router();

const apiRouter = new Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);

rootRouter.use('/api', apiRouter);