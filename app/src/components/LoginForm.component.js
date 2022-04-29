import React from 'react';
import { useForm } from 'react-hook-form'; 
import Alert from 'react-bootstrap/Alert';

export const LoginFormComponent = ({error, onFormSubmit}) => {
 
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    onFormSubmit(data)
  };

  return (
    <div className="login-form-component">
      <Alert show={!!error && error?.message}
                   variant="danger">   
                {error?.message}
            </Alert> 
      <form  onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} id="email"/>
        <label htmlFor="password">Password</label>
        <input {...register("password")} id="password"/>
        <input type="submit" />
      </form>
    </div>
  );
}

