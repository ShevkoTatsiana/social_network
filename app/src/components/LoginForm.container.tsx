import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginFormComponent } from './LoginForm.component';
import {useToken} from '../utils/useToken';
import {ValidationError, UserType} from '../types';

type Props = {
  onUserLogin: () => void
};

type LoginFormType = {
  email: string,
  password: string | null,
  social: boolean
};

type DataType = {
  user?: UserType | undefined
}

export const LoginFormContainer = ({onUserLogin}: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<ValidationError>();
  const [data, setData] = useState<DataType>({});
  const {token, setToken} = useToken();

  const navigateToAccount = (token: string, user: UserType | undefined) => {
    setToken(token);
    navigate('/account/info', {state: user});
  };

  const handleOnFormSubmit = async ({email, password, social}: LoginFormType) => {
    try {
      const result = await axios.post(`${process.env.PUBLIC_URL}/api/auth/login`, {
        email,
        password, 
        social
      });
      setData(result?.data);
      onUserLogin();
      navigateToAccount(result?.data?.token, result?.data?.user);
    } catch (e) {
      if (e.response?.data?.error) {
        setError({ message: e.response?.data?.error });
      } else setError(e);
    }
  };

  useEffect(() => {
    if(!token) return;
    navigateToAccount(token, data?.user);
  }, [token]);

  return (
    <LoginFormComponent error={error}
                        onFormSubmit={handleOnFormSubmit}/>
  );
}

