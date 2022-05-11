import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { AddRecipeComponent } from './AddRecipe.component';
import {RecipeComponent} from './Recipe.component';

export const RecepiesComponent = ({
  error, 
  loading, 
  recepies, 
  currentUserName, 
  isCurrentUserInGroup,
  groupId, 
  onSubmitRecipe, 
  onDeleteRecipe
}) => {
 
  return (
    <div className="recepies-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}  
      {loading && (
                <Spinner animation="border"
                         className="group-component__loader"
                         variant="info"/>
            )}   
      <h3 className="recepies-component__title">Family's recepies:</h3>  
      {!!recepies?.length ? (
        <>
          {recepies.map((recipe) => (
            <RecipeComponent recipe={recipe}
                             isAuthor={currentUserName === recipe.author_name}
                             key={recipe._id}
                             onDeleteRecipe={onDeleteRecipe}/>
          ))}
        </>
      ) : (
        <div className="recepies-component__empty">There are no family recepies yet...</div>
      )}
      {isCurrentUserInGroup && (
        <AddRecipeComponent onSubmitRecipe={onSubmitRecipe}
                          groupId={groupId}
                          currentUserName={currentUserName}/>
      )}
    </div>
  );
}

