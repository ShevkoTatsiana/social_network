import {Router} from 'express';
import {userController} from '../controllers/user.controller.js';
import {validator} from '../middlewares/validation.middleware.js';
import {auth} from '../middlewares/auth.middleware.js';
import {createUser} from '../validationSchemas/createUser.schema.js';

export const usersRouter = new Router();

usersRouter
  .get('/', userController.getAll)
  .get('/:id', auth, userController.getUser)
  .delete('/:id', userController.deleteUser)
  .post('/create', validator(createUser), userController.createUser)
  .put('/:id', auth, userController.editUser);
