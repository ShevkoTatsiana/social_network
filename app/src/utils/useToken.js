import { useState } from 'react';

export function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem('token');
    //const userToken = JSON.parse(tokenString);
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
  };

  return {
    setToken: saveToken,
    removeToken: clearToken,
    token
  }
}