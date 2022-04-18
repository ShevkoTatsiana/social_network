import React from 'react';
import { useForm } from 'react-hook-form'; 
import axios from 'axios';

export const CreateUserFormComponent = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async ({name, email, password}) => {
    await axios.post('http://localhost:8000/users/create', {
      name,
      email,
      password
    });
  };

  return (
    <div className="create-user-form-component">
      <form  onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input {...register("name")} id="name"/>
        <label htmlFor="email">Email</label>
        <input {...register("email")} id="email"/>
        <label htmlFor="password">Password</label>
        <input {...register("password")} id="password"/>
        <input type="submit" />
      </form>
    </div>
  );
}

