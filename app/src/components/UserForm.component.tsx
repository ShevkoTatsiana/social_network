import React, {useState, ChangeEvent} from 'react';
import { useForm } from 'react-hook-form'; 
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/esm/Button';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import {ValidationError} from '../types';

type Props = {
  name: string,
  email: string,
  password: string | null,
  error: ValidationError | undefined,
  successRegister: boolean,
  onFormSubmit: (data: FormData) => void
};

type FormValues = {
  name: string,
  email: string,
  password: string,
  profile_photo: string | File
};
type ResponseType = {
  email: string,
  given_name: string,
  picture: string
};

export const UserFormComponent = (props: Props) => {
  const {
    name = '',
    email = '',
    password = '',
    error,
    successRegister,
    onFormSubmit
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [profilePhoto, setProfilePhoto] = useState<File | string>('');
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    data.profile_photo = profilePhoto;
    for (let key in data) {
      formData.append(key, data[key as keyof FormValues])
    };
    onFormSubmit(formData)
  };
  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setProfilePhoto(e.target.files[0]);
  };
  const responseGoogle = async (response: CredentialResponse) => {
    if(!response.credential) return;
    const responsePayload: ResponseType = jwt_decode(response.credential);
    const formData = new FormData();
    formData.append('email', responsePayload.email);
    formData.append('password', 'null');
    formData.append('name', responsePayload.given_name);
    formData.append('profile_photo', responsePayload.picture);
    formData.append('social', 'true');
    onFormSubmit(formData);
  };

  return (
    <div className="user-form-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}  
      {!!successRegister && (
        <Alert show={successRegister}
               variant="success">   
          User was registered successfully! Please, check your email.
        </Alert> 
      )}      
      <form noValidate onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="form-component">
        <FloatingLabel label="User Name">
          <Form.Control defaultValue={name}
                        placeholder="User Name"
                        isInvalid={!!errors?.name} 
                        {...register("name", {
                          required: {value: true, message: "This is a required field"},
                          minLength: {value: 3, message: "Min length is 3"}
                        })} />
            <Form.Control.Feedback type="invalid">
              {errors?.name?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        
        <FloatingLabel label="User Email">
          <Form.Control defaultValue={email}
                        placeholder="User Email"
                        isInvalid={!!errors?.email}
                        {...register("email", {
                          required:{value: true, message: "This is a required field"}
                        })}/>
          <Form.Control.Feedback type="invalid">
            {errors?.email?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
       
        <FloatingLabel label="Password">
          <Form.Control defaultValue={!!password ? password : undefined}
                        placeholder="Password"
                        isInvalid={!!errors?.password}
                        {...register("password", {
                          required: {value: true, message: "This is a required field"},
                          pattern: {value: /^[a-zA-Z0-9]{3,30}$/, message: "Invalid password"}
                        })} />
          <Form.Control.Feedback type="invalid">
            {errors?.password?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Label htmlFor="profile_photo">Upload your Profile Photo here</Form.Label>
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
          Submit
        </Button>
      </form>
      <div>or</div>
      <GoogleLogin onSuccess={responseGoogle}
               onError={() => {
                 console.log('Login Failed');
               }}/>
    </div>
  );
}

