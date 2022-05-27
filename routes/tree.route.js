import {Router} from 'express';
import {treeController} from '../controllers/tree.controller.js';
import { upload } from '../middlewares/uploadFile.js';

export const treeRouter = new Router();

treeRouter
  .get('/:groupId', treeController.getTree)
  .delete('/:id', treeController.deleteTree)
  .post('/create', upload.single('photo'), treeController.createTree)
  .put('/:id', upload.single('photo'), treeController.editTree);
