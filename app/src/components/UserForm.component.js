import React from 'react';
import { useForm } from 'react-hook-form'; 

type UserFormComponentProps = {
  name?: String;
  email?: String;
  password?: String;
  error?: Object;
  onFormSubmit?: (data: Object) => void
}

export const UserFormComponent = (props: UserFormComponentProps) => {
  const {
    name = '',
    email = '',
    password = '',
    error,
    onFormSubmit
  } = props;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    onFormSubmit(data)
  };

  return (
    <div className="user-form-component">
      {!!error && error.message && (
        <div>{error.message}</div>
      )}
      <form  onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input defaultValue={name}
              {...register("name")} id="name"/>
        <label htmlFor="email">Email</label>
        <input defaultValue={email}
              {...register("email")} id="email"/>
        <label htmlFor="password">Password</label>
        <input defaultValue={password}
              {...register("password")} id="password"/>
        <input type="submit" />
      </form>
    </div>
  );
}

