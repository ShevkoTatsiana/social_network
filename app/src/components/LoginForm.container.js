import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginFormComponent } from './LoginForm.component';
import {useToken} from '../utils/useToken';

export const LoginFormContainer = ({onUserLogin}) => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [data, setData] = useState({});
  const {token, setToken} = useToken();

  const navigateToAccount = (token, user) => {
    setToken(token);
    navigate('/account/info', {state: user});
  };

  const handleOnFormSubmit = async ({email, password}) => {
    try {
      const result = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      });
      console.log(result);
      setData(result?.data);
      onUserLogin();
      navigateToAccount(result?.data?.token, result?.data?.user);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  useEffect(() => {
    console.log(data);
    if(!token) return;
    navigateToAccount(data?.user);
  }, [token]);

  // const handleOnFormSubmit = ({email, password}) => {
  //     const result = (axios.post('http://localhost:8000/api/auth/login', {
  //       email,
  //       password
  //     })).then(res => {
  //       if (!!res?.token) {
  //         setToken(result?.token);
  //         navigate('/account', {state: result.user});
  //       }
  //     }).catch(err => {
  //       setError(err);
  //     });
  //     console.log(result);
  // };

  return (
    <LoginFormComponent error={error}
                        onFormSubmit={handleOnFormSubmit}/>
  );
}

