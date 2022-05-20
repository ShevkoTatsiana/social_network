import {RecipeModel} from '../models/recipe.model.js';

class RecipeService {
    getAllByGroup(groupId) {
      return RecipeModel.find({group_id: groupId});
    }

    async createRecipe(recipeData) {    
      const newRecipe = new RecipeModel(recipeData);
      return newRecipe.save();
    }

    deleteRecipe(recipeId) {
      return RecipeModel.findByIdAndDelete(recipeId);
    }
  }
  
  export const recipeService = new RecipeService();
