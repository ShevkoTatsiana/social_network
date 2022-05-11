import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { 
    type: String, 
    requred: true
   },
  author_name: { 
  type: String, 
  requred: true
  },
  group_id: {
    type: String, 
    requred: true
  },
  ingredients: {
    type: String,
    requred: true
  },
  directions: {
    type: String,
    requred: true
  },
  recipe_photo: {
    type: String,
    default: ""
  },
}, {
  timestamps: true,
});

export const RecipeModel = mongoose.model('Recipe', recipeSchema);
