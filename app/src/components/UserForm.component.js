import React, {useState} from 'react';
import { useForm } from 'react-hook-form'; 

export const UserFormComponent = (props) => {
  const {
    name = '',
    email = '',
    password = '',
    error,
    onFormSubmit
  } = props;

  const { register, handleSubmit } = useForm();
  const [profilePhoto, setProfilePhoto] = useState('');
  const onSubmit = (data) => {
    const formData = new FormData();
    data.profile_photo = profilePhoto;
    for (let key in data) {
      formData.append(key, data[key])
    };
  
    console.log(data);
    onFormSubmit(formData)
  };
  const onFileUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  }

  return (
    <div className="user-form-component">
      {!!error && error.message && (
        <div>{error.message}</div>
      )}
      <form  onSubmit={handleSubmit(onSubmit)}
             encType="multipart/form-data">
        <label htmlFor="name">Name</label>
        <input defaultValue={name}
              {...register("name")} id="name"/>
        <label htmlFor="email">Email</label>
        <input defaultValue={email}
              {...register("email")} id="email"/>
        <label htmlFor="password">Password</label>
        <input defaultValue={password}
              {...register("password")} id="password"/>
        <label htmlFor="profile_photo">Upload your Profile Photo here</label>
        <input type="file" 
               className="user-form-component-photo" 
               name="profile_photo"
               {...register("profile_photo")} 
               id="profile_photo"
               onChange={onFileUpload}/>
        <input type="submit" />
      </form>
    </div>
  );
}

