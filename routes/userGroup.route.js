import {Router} from 'express';
import {userGroupController} from '../controllers/userGroup.controller.js';
import {auth} from '../middlewares/auth.middleware.js';

export const userGroupRouter = new Router();

userGroupRouter
  .get('/group/:id', userGroupController.getAllUsersInGroups)
  .get('/:id', auth, userGroupController.getAllUserGroup)
  .delete('/:id/delete/:groupId', auth, userGroupController.deleteUserGroup)
  .post('/:id/create', auth, userGroupController.createUserGroup)