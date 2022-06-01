import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { UserFormComponent } from './UserForm.component';

export const UserFormContainer = ({onUserLogin}) => {
  const { state: userData } = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [user, setUser] = useState(userData);
  const [validationError, setValidationError] = useState();
  const [userCreateData, setUserCreateData] = useState({});
  // Should be used with Email Confirmation feature
  const [successRegister, setSuccessRegister] = useState(false);

  const onLoadUser = async () => {
    try {
      const resp = await axios.get(`${process.env.PUBLIC_URL}/api/users/${token}`, { headers: { "Authorization": `Bearer ${token}` } });
      setUser(resp?.data);
    } catch(e) {
      setValidationError({message: 'Sorry, can\'t load an user data'});
    }
  };

  const onSubmitUpdate = async (formData) => {    
    try {
      const result = await axios.put(`${process.env.PUBLIC_URL}/api/users/${token}`, formData,
       { headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        } });
        navigate('/account/info', {state: result?.data});
    } catch (e) {
      if(e.response?.data?.error) {
        setValidationError({message: e.response?.data?.error});
      } else setValidationError(e.response?.data?.details[0]);
    }   
  };

  const onSubmitCreate = async (formData) => {
    try {
      const result = await axios.post(`${process.env.PUBLIC_URL}/api/users/create`, formData,
      { headers: {"Content-Type": "multipart/form-data"}});
      setUserCreateData({email: formData.get('email'), password: formData.get('password')});
    } catch (e) {
      if(e.response?.data?.error) {
        setValidationError({message: e.response?.data?.error});
      } else setValidationError(e.response?.data?.details[0]);
    }
  };

  const handleOnFormSubmit = (data) => {
    if (token) return onSubmitUpdate(data);
    return onSubmitCreate(data);
  };

  const handleOnCreateUser = async (email, password) => {
    const result = await axios.post(`${process.env.PUBLIC_URL}/api/auth/login`, {
      email,
      password
    });
    setToken(result?.data?.token);
    onUserLogin();
    navigate('/account/info', {state: result?.data?.user});
  };

  useEffect(() => {
    if (!!token) {
      onLoadUser();
    }
  }, []);

  useEffect(() => {
    if (!userCreateData.email) return;
    handleOnCreateUser(userCreateData.email, userCreateData.password);   
    // Don't delete! Should be used for Email confirmation feature
    //setSuccessRegister(true);
  }, [userCreateData]);

  return (
    <UserFormComponent name={user?.name}
      email={user?.email}
      error={validationError}
      successRegister={successRegister}
      password={user?.password}
      onFormSubmit={handleOnFormSubmit} />
  );
}

