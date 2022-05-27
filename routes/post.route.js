import {Router} from 'express';
import {postController} from '../controllers/post.controller.js';
import {auth} from '../middlewares/auth.middleware.js';

export const postRouter = new Router();

postRouter
  .get('/:groupId', postController.getAllByGroup)
  .post('/:id/create', auth, postController.createPost);