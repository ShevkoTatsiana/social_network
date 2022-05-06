import React, {useState} from 'react';
import { useForm, useFormState } from 'react-hook-form'; 
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/esm/Button';

export const GroupFormComponent = (props) => {
  const {
    error,
    onCreate
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [profilePhoto, setProfilePhoto] = useState('');
  const onSubmit = (data) => {
    const formData = new FormData();
    data.profile_photo = profilePhoto;
    for (let key in data) {
      formData.append(key, data[key])
    };
    onCreate(formData)
  };
  const onFileUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  }

  return (
    <div className="group-form-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}       
      <form noValidate onSubmit={handleSubmit(onSubmit)}
             encType="multipart/form-data"
             className="form-component">
        <FloatingLabel label="Family Name">
          <Form.Control placeholder="Family Name"
                        isInvalid={errors?.name} 
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
                        isInvalid={errors?.description}
                        {...register("description", {
                          required:{value: false}
                        })}/>
        </FloatingLabel>
        <Form.Label htmlFor="profile_photo">Upload your Family Profile Photo here</Form.Label>
        <Form.Control type="file" 
               className="user-form-component-photo" 
               name="profile_photo"
               {...register("profile_photo")} 
             
               onChange={onFileUpload}/>
        <Form.Text id="filesHelpBlock" muted
                   className="form-note">
          You can upload '.jpg', '.jpeg' or '.png' files here.
        </Form.Text>
        <Button variant="primary" 
                type="submit"
                className="form-submit">
          Create
        </Button>
      </form>
    </div>
  );
}
