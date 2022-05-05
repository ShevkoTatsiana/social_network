import {Router} from 'express';
import {userGroupController} from '../controllers/userGroup.controller.js';
//import {validator} from '../middlewares/validation.middleware.js';
import {auth} from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/uploadFile.js';
//import {createUser} from '../validationSchemas/createUser.schema.js';

export const userGroupRouter = new Router();

userGroupRouter
  .get('/group/:id', userGroupController.getAllUsersInGroups)
  .get('/:id', auth, userGroupController.getAllUserGroup)
  // .delete('/:id', auth, groupController.deleteGroup)
  .post('/:id/create', auth, userGroupController.createUserGroup)
 // .put('/:id', upload.single('profile_photo'), auth, groupController.editGroup);