import { useState } from 'react';

export function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem('token');
    console.log(userToken);
    //const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
      console.log(userToken);
    localStorage.setItem('token', userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}