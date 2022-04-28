import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { UserFormComponent } from './UserForm.component';

export const UserFormContainer = () => {
  const { state: userData } = useLocation();
  const navigate = useNavigate();
  const { token } = useToken();
  const [user, setUser] = useState(userData);
  const [validationError, setValidationError] = useState();

  const onLoadUser = async () => {
    const resp = await axios.get(`http://localhost:8000/api/users/${token}`, { headers: { "Authorization": `Bearer ${token}` } });
    setUser(resp?.data);
  };

  const onSubmitUpdate = async (formData) => {    
    try {
      const result = await axios.put(`http://localhost:8000/api/users/${token}`, formData,
       { headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        } });
        navigate('/account/info', {state: result?.data});
    } catch (e) {
      setValidationError(e.response?.data?.details[0]);
    }   
  };

  const onSubmitCreate = async (formData) => {
    try {
      const result = await axios.post('http://localhost:8000/api/users/create', formData,
      { headers: {"Content-Type": "multipart/form-data"}});
    } catch (e) {
      setValidationError(e.response?.data?.details[0]);
    }
  };

  const handleOnFormSubmit = (data) => {
    if (token) return onSubmitUpdate(data);
    return onSubmitCreate(data);
  };

  useEffect(() => {
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

