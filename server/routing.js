import {Router} from 'express';
import {usersRouter} from './routes/user.route.js';
import {authRouter} from './routes/auth.route.js';
import {groupRouter} from './routes/group.route.js';
import {userGroupRouter} from './routes/userGroup.route.js';

export const rootRouter = new Router();

const apiRouter = new Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/group', groupRouter);
apiRouter.use('/user_group', userGroupRouter);

rootRouter.use('/api', apiRouter);