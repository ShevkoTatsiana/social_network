import {Router} from 'express';
import {galleryController} from '../controllers/gallery.controller.js';
import {auth} from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/uploadFile.js';

export const galleryRouter = new Router();

galleryRouter
  .get('/:groupId', galleryController.getAllByGroup)
  .delete('/:id', galleryController.deleteImage)
  .post('/create', upload.single('gallery_image'), auth, galleryController.createImage);
