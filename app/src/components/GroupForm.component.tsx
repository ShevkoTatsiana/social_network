import React, {useState, ChangeEvent} from 'react';
import { useForm } from 'react-hook-form'; 
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/esm/Button';
import {GroupType, ValidationError} from '../types';

type Props = {
  group: GroupType,
  error: ValidationError | undefined,
  onSubmit: (data: FormData) => Promise<void>
};
type FieldValues = GroupType;

export const GroupFormComponent = (props: Props) => {
  const {
    error,
    group,
    onSubmit
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const [profilePhoto, setProfilePhoto] = useState<File | string>(group?.profile_photo || '');
  const onFormSubmit = (data: GroupType) => {
    const formData = new FormData();
    data.profile_photo = profilePhoto;
    for (let key in data) {
      formData.append(key, data[key as keyof GroupType])
    };
    onSubmit(formData)
  };
  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setProfilePhoto(e.target.files[0]);
  };
  const buttonTitle = group?.name ? 'Update' : 'Create';

  return (
    <div className="group-form-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}       
      <form noValidate onSubmit={handleSubmit(onFormSubmit)}
             encType="multipart/form-data"
             className="form-component">
        <FloatingLabel label="Family Name">
          <Form.Control placeholder="Family Name"
                        defaultValue={group?.name}
                        isInvalid={!!errors?.name} 
                        {...register("name", {
                          required: {value: true, message: "This is a required field"},
                          minLength: {value: 3, message: "Min length is 3"}
                        })} />
            <Form.Control.Feedback type="invalid">
              {errors?.name?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        
        <FloatingLabel label="Family intro">
          <Form.Control placeholder="Family intro"
                        defaultValue={group?.description}
                        isInvalid={!!errors?.description}
                        {...register("description")}/>
        </FloatingLabel>
        <Form.Label htmlFor="profile_photo">Upload your Family Profile Photo here</Form.Label>
        <Form.Control type="file" 
               className="user-form-component-photo" 
               {...register("profile_photo")} 
             
               onChange={onFileUpload}/>
        <Form.Text id="filesHelpBlock" muted
                   className="form-note">
          You can upload '.jpg', '.jpeg' or '.png' files here.
        </Form.Text>
        <Button variant="primary" 
                type="submit"
                className="form-submit">
          {buttonTitle}
        </Button>
      </form>
    </div>
  );
}

