import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

export type RecipeType = {
    title: string,
    recipe_photo: string,
    ingredients: string,
    directions: string,
    author_name: string,
    createdAt: string,
    _id: string
};
type Props = {
    recipe:  RecipeType,
    isAuthor: boolean,
    onDeleteRecipe: (id: string) => void
};

export const RecipeComponent = ({recipe, isAuthor, onDeleteRecipe}: Props) => {
    const date = new Date(recipe.createdAt);
    const dateString = date?.toString().split('GMT')[0];

  return (
    <div className="recipe-component">       
       <h5 className="recipe-component__title">
            {recipe.title}
        </h5>
        {recipe?.recipe_photo && (
            <Image src={recipe?.recipe_photo}
                className="recipe-component__image"/>
        )}           
        <div className="recipe-component__text">
            <h6><em>Ingredients:</em></h6>
            {recipe.ingredients}  
        </div> 
        <div className="recipe-component__text">
            <h6><em>Directions:</em></h6>
            {recipe.directions}  
        </div> 
        <div className="recipe-component__footer">
        {recipe.author_name}, {dateString}
        </div> 
        {isAuthor && (
            <Button variant="primary" onClick={() => onDeleteRecipe(recipe._id)}>Delete</Button>
        )}             
    </div>
  );
}

