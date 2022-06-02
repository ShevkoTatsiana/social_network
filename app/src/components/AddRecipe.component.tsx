import React, {useEffect, useState, ChangeEvent} from 'react';
import { useForm } from 'react-hook-form'; 
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/esm/Button';

type Props = {
  currentUserName: string,
  groupId: string,
  onSubmitRecipe: (data: FormData) => void
};
type FormValues = {
  title: string,
  recipe_photo: Blob | string,
  ingredients: string,
  directions: string,
};
export type RecipeFormType = FormValues & {
  author_name: string,
  group_id: string
};

export const AddRecipeComponent = ({onSubmitRecipe, currentUserName, groupId}: Props) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful  } } = useForm<FormValues>();
  const [recipePhoto, setRecipePhoto] = useState<File | string>('');

  const onSubmit = (dataValues: FormValues) => {
    const data: RecipeFormType = {
      ...dataValues,
      recipe_photo: recipePhoto,
      author_name: currentUserName,
      group_id: groupId,
    };
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key as keyof RecipeFormType])
    };
    onSubmitRecipe(formData)
  };
  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setRecipePhoto(e.target.files[0]);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="recipe-form-component"> 
      <h4 className="recipe-form-component__note">Add new recipe</h4>
      <form noValidate onSubmit={handleSubmit(onSubmit)}
                       encType="multipart/form-data">
            <FloatingLabel label="Title">
                <Form.Control placeholder="Title"
                              isInvalid={!!errors?.title} 
                              {...register("title", {
                                required: {value: true, message: "This is a required field"}
                               })} />
            <Form.Control.Feedback type="invalid">
              {errors?.title?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Label htmlFor="recipe_photo">Upload a Recipe Photo here</Form.Label>
        <Form.Control type="file" 
                      className="recipe-form-component__photo" 
                      {...register("recipe_photo")}              
                      onChange={onFileUpload}/>
        <Form.Text id="filesHelpBlock" muted
                   className="recipe-form-component__photo-note">
          You can upload '.jpg', '.jpeg' or '.png' files here.
        </Form.Text>
        <FloatingLabel label="Ingredients">
          <Form.Control placeholder="Ingredients"
                        as="textarea" 
                        rows={4}
                        className="recipe-form-component__textarea"
                        isInvalid={!!errors?.ingredients} 
                        {...register("ingredients", {
                          required: {value: true, message: "This is a required field"}
                        })} />
            <Form.Control.Feedback type="invalid">
              {errors?.ingredients?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel label="Directions">
          <Form.Control placeholder="Directions"
                        isInvalid={!!errors?.directions} 
                        as="textarea" 
                        rows={4}
                        className="recipe-form-component__textarea"
                        {...register("directions", {
                          required: {value: true, message: "This is a required field"}
                        })} />
            <Form.Control.Feedback type="invalid">
              {errors?.directions?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="primary" 
                type="submit"
                className="form-submit">
          Publish
        </Button>
      </form>
    </div>
  );
}

