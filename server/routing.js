import {Router} from 'express';
import {usersRouter} from './routes/user.route.js';
import {authRouter} from './routes/auth.route.js';
import {groupRouter} from './routes/group.route.js';

export const rootRouter = new Router();

const apiRouter = new Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/group', groupRouter);

rootRouter.use('/api', apiRouter);