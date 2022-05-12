import {Router} from 'express';
import {usersRouter} from './routes/user.route.js';
import {authRouter} from './routes/auth.route.js';
import {groupRouter} from './routes/group.route.js';
import {postRouter} from './routes/post.route.js';
import {recepiesRouter} from './routes/recipe.route.js';
import {galleryRouter} from './routes/gallery.route.js';
import {userGroupRouter} from './routes/userGroup.route.js';

export const rootRouter = new Router();

const apiRouter = new Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/group', groupRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/recepies', recepiesRouter);
apiRouter.use('/gallery', galleryRouter);
apiRouter.use('/user_group', userGroupRouter);

rootRouter.use('/api', apiRouter);