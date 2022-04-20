import React from 'react';
import { useForm } from 'react-hook-form'; 

export const LoginFormComponent = ({error}) => {
 
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    //onFormSubmit(data)
    console.log(data);
  };

  return (
    <div className="login-form-component">
      {!!error && error.message && (
        <div>{error.message}</div>
      )}
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

