import {Router} from 'express';
import {recipeController} from '../controllers/recipe.controller.js';
import {auth} from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/uploadFile.js';

export const recepiesRouter = new Router();

recepiesRouter
  .get('/:groupId', recipeController.getAllByGroup)
  .delete('/:id', recipeController.deleteRecipe)
  .post('/create', upload.single('recipe_photo'), auth, recipeController.createRecipe);
