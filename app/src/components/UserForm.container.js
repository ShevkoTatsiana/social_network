import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { UserFormComponent } from './UserForm.component';

export const UserFormContainer = () => {
  const {state: id} = useLocation();
  const [user, setUser] = useState();
  const [validationError, setValidationError] = useState();

  const onLoadUser = async () => {
    const resp = await axios.get(`http://localhost:8000/api/users/${id}`);
    setUser(resp?.data);
  };

  const onSubmitUpdate = async ({name, email, password}) => {
    await axios.put(`http://localhost:8000/api/users/${id}`, {
      name: name || user?.name,
      email: email || user?.email,
      password: password || user?.password
    });
  };

  const onSubmitCreate = async ({name, email, password}) => {
    try {
      const result = await axios.post('http://localhost:8000/api/users/create', {
        name,
        email,
        password
      });
      console.log(result);
    } catch (e) {
      console.log(e);
      setValidationError(e);
    }
    
  };

  const handleOnFormSubmit = (data) => {
    if(!!id) return onSubmitUpdate(data);
    return onSubmitCreate(data);
  };

  useEffect(() => {
    if(!!user || !id) return;
    onLoadUser();
  }, [user]);

  return (
    <UserFormComponent name={user?.name}
                       email={user?.email}
                       error={validationError}
                       password={user?.password}
                       onFormSubmit={handleOnFormSubmit}/>
  );
}

