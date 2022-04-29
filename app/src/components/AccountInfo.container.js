import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useToken} from '../utils/useToken';
import { AccountInfoComponent } from './AccountInfo.component';

export const AccountInfoContainer = ({onUserLogout}) => {
  const {token, removeToken} = useToken();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [error, setError] = useState('');

  const onLoadUser = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/api/users/${token}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      setUser(resp?.data);
    } catch(e) {
      setError('Sorry, can\'t load an user data');
    }   
  };

  const onDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${token}`,
      { headers: {"Authorization" : `Bearer ${token}`}});
      removeToken();
      onUserLogout();
      navigate('/');
    } catch(e) {
      setError('Sorry, can\'t delete the user');
    }
};

  useEffect(() => {
    if(!!user || !token) return;
    onLoadUser();
  }, [user]);

  return (
    <AccountInfoComponent user={user}
                          error={error}
                          onDeleteUser={onDeleteUser}/>
  );
}

