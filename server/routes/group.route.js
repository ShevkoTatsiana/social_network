import {Router} from 'express';
import {groupController} from '../controllers/group.controller.js';
//import {validator} from '../middlewares/validation.middleware.js';
import {auth} from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/uploadFile.js';
//import {createUser} from '../validationSchemas/createUser.schema.js';

export const groupRouter = new Router();

groupRouter
  .get('/', groupController.getAllGroups)
  .get('/:id', auth, groupController.getGroup)
  .delete('/:id', auth, groupController.deleteGroup)
  .post('/create', upload.single('profile_photo'), auth, groupController.createGroup)
  .put('/:id', upload.single('profile_photo'), auth, groupController.editGroup);