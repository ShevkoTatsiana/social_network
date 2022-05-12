import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

export const RecipeComponent = ({recipe, isAuthor, onDeleteRecipe}) => {
    const date = new Date(recipe.createdAt);
    const dateString = date?.toString().split('GMT')[0];
    const imageURL = recipe?.recipe_photo && 
    `${process.env.REACT_APP_PUBLIC_URL}/images/${recipe?.recipe_photo}`;

  return (
    <div className="recipe-component">       
       <h5 className="recipe-component__title">
            {recipe.title}
        </h5>
        {recipe?.recipe_photo && (
            <Image src={imageURL}
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

