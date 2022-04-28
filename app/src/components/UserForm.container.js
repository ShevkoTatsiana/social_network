import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { UserFormComponent } from './UserForm.component';

export const UserFormContainer = () => {
  const { state: userData } = useLocation();
  console.log(userData);
  const { token } = useToken();
  console.log(token);
  const [user, setUser] = useState(userData);
  const [validationError, setValidationError] = useState();

  const onLoadUser = async () => {
    console.log('adadad');
    const resp = await axios.get(`http://localhost:8000/api/users/${token}`, { headers: { "Authorization": `Bearer ${token}` } });
    setUser(resp?.data);
  };

  const onSubmitUpdate = async ({ name, email, password, profile_photo }) => {
    console.log(profile_photo, user);
    const newFileObject  = {
      'lastModified'     : profile_photo.lastModified,
      'lastModifiedDate' : profile_photo.lastModifiedDate,
      'name'             : profile_photo.name,
      'size'             : profile_photo.size,
      'type'             : profile_photo.type
    };  
    const profilePhoto = JSON.stringify(newFileObject);
    try {
      await axios.put(`http://localhost:8000/api/users/${token}`, {
        name: name || user?.name,
        email: email || user?.email,
        password: password || user?.password,
        profile_photo: profilePhoto || user?.profile_photo
      }, { headers: { "Authorization": `Bearer ${token}` } });
    } catch (e) {
      setValidationError(e.response?.data?.details[0]);
    }   
  };

  const onSubmitCreate = async ({ name, email, password, profile_photo }) => {
    const newFileObject  = {
      'lastModified'     : profile_photo.lastModified,
      'lastModifiedDate' : profile_photo.lastModifiedDate,
      'name'             : profile_photo.name,
      'size'             : profile_photo.size,
      'type'             : profile_photo.type
    };  
    const profilePhoto = JSON.stringify(newFileObject);
    try {
      const result = await axios.post('http://localhost:8000/api/users/create', {
        name,
        email,
        password,
        profile_photo: profilePhoto
      });
    } catch (e) {
      setValidationError(e.response?.data?.details[0]);
    }
  };

  const handleOnFormSubmit = (data) => {
    if (token) return onSubmitUpdate(data);
    return onSubmitCreate(data);
  };

  useEffect(() => {
    console.log(!!token);
    if (!!token) {
      onLoadUser();
    }
  }, []);

  return (
    <UserFormComponent name={user?.name}
      email={user?.email}
      error={validationError}
      password={user?.password}
      onFormSubmit={handleOnFormSubmit} />
  );
}

