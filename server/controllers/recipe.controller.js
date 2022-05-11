import {recipeService} from '../services/recipe.service.js';   

class RecipeController {

  async getAllByGroup(req, res) {
    const groupId = req.params.groupId;
    res.send(await recipeService.getAllByGroup(groupId));
  }
 
  async createRecipe(req, res) {
    const recipeData = {
      title: req.body.title,
      recipe_photo: req.file?.filename,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      author_name: req.body.author_name,
      group_id: req.body.group_id
    };
    try {
      const result = await recipeService.createRecipe(recipeData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t publish a recipe' });
    }       
  }
  
  async deleteRecipe(req, res) {
    res.send(await recipeService.deleteRecipe(req.params.id));
  }
}

export const recipeController = new RecipeController();