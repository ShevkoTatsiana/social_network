import {recipeService} from '../services/recipe.service.js';   
import {uploadImageToStorage, deleteImageFromStorage} from '../middlewares/uploadFile.js';

class RecipeController {

  async getAllByGroup(req, res) {
    const groupId = req.params.groupId;
    res.send(await recipeService.getAllByGroup(groupId));
  }
 
  async createRecipe(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };
    const recipeData = {
      title: req.body.title,
      recipe_photo: fileUrl,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      author_name: req.body.author_name,
      group_id: req.body.group_id
    };
    try {
      const result = await recipeService.createRecipe(recipeData);
      res.status(201).send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t publish a recipe' });
    }       
  }
  
  async deleteRecipe(req, res) {
    try {
      const result = await recipeService.deleteRecipe(req.params.id);
      deleteImageFromStorage(result.recipe_photo);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t delete a recipe' });
    }
  }
}

export const recipeController = new RecipeController();