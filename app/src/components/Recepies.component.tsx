import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { AddRecipeComponent } from './AddRecipe.component';
import {RecipeComponent, RecipeType} from './Recipe.component';
import { useAppSelector} from '../utils/reduxHooks';
import {UserType} from '../types';

type Props = {
  error: {
    message: string
  } | undefined,
  loading: boolean,
  recepies: RecipeType[],
  groupId: string | undefined,
  onSubmitRecipe: (recipe: FormData) => void,
  onDeleteRecipe: (id: string) => void
}

export const RecepiesComponent = ({
  error, 
  loading, 
  recepies, 
  groupId, 
  onSubmitRecipe, 
  onDeleteRecipe
}: Props) => {
  const currentUser = useAppSelector<UserType | null>((state) => state.currentUser);
  const currentUserName = currentUser?.name;
  const isCurrentUserInGroup = useAppSelector((state) => state.isCurrentUserInGroup);
 
  return (
    <div className="recepies-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}  
      {loading && (
        <div className="group-component__loader">
          <Spinner animation="border"
                    variant="info"/>
        </div>
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
      {isCurrentUserInGroup && !!currentUserName && !!groupId && (
        <AddRecipeComponent onSubmitRecipe={onSubmitRecipe}
                            groupId={groupId}
                            currentUserName={currentUserName}/>
      )}
    </div>
  );
}

