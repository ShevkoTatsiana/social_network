import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { LoginFormComponent } from './LoginForm.component';

export const LoginFormContainer = () => {
  const [error, setError] = useState();

  const handleOnFormSubmit = async ({email, password}) => {
    try {
      const result = await axios.post('http://localhost:8000/users/create', {
        email,
        password
      });
      console.log(result);
    } catch (e) {
      console.log(e.message);
      setError(e);
    }
    
  };


  return (
    <LoginFormComponent error={error}
                        onFormSubmit={handleOnFormSubmit}/>
  );
}

