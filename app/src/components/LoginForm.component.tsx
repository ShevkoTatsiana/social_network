import React from 'react';
import { useForm } from 'react-hook-form'; 
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/esm/Button';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import {ValidationError} from '../types';

type LoginFormType = {
  email: string,
  password: string | null,
  social: boolean
};
type ResponseType = {
  email: string
};
type Props = {
  error: ValidationError | undefined,
  onFormSubmit: ({email, password, social}:LoginFormType) => void
};

export const LoginFormComponent = ({error, onFormSubmit}: Props) => {
 
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>();
  const onSubmit = (data: LoginFormType) => {
    onFormSubmit(data)
  };
  const responseGoogle = async (response: CredentialResponse) => {
    if(!response.credential) return;
    const responsePayload: ResponseType = jwt_decode(response.credential);
    onFormSubmit({email: responsePayload.email, password: null, social: true});
  };

  return (
    <div className="login-form-component">
      <Alert show={!!error && !!error?.message}
                   variant="danger">   
                {error?.message}
            </Alert> 
      <Form noValidate onSubmit={handleSubmit(onSubmit)}
                       className="form-component">
      <FloatingLabel label="User Email">
          <Form.Control placeholder="User Email"
                        isInvalid={!!errors?.email}
                        {...register("email", {
                          required:{value: true, message: "This is a required field"}
                        })}/>
          <Form.Control.Feedback type="invalid">
            {errors?.email?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control placeholder="Password"
                        isInvalid={!!errors?.password}
                        {...register("password", {
                          required: {value: true, message: "This is a required field"},
                          pattern: {value: /^[a-zA-Z0-9]{3,30}$/, message: "Invalid password"}
                        })} />
          <Form.Control.Feedback type="invalid">
            {errors?.password?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="primary" 
                type="submit"
                className="form-submit">
          Login
        </Button>
      </Form>
      <div>or</div>
      <GoogleLogin onSuccess={responseGoogle}
                   onError={() => {
                     console.log('Login Failed');
                   }}/>
    </div>
  );
}

