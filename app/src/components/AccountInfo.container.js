import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useToken} from '../utils/useToken';
import { AccountInfoComponent } from './AccountInfo.component';

export const AccountInfoContainer = ({onUserLogout}) => {
  const {token, removeToken} = useToken();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const onLoadUser = async () => {
    const resp = await axios.get(`http://localhost:8000/api/users/${token}`, 
    { headers: {"Authorization" : `Bearer ${token}`}});
    setUser(resp?.data);
  };

  const onDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${token}`,
      { headers: {"Authorization" : `Bearer ${token}`}});
      removeToken();
      onUserLogout();
      navigate('/');
    } catch(e) {
      alert('Something went wrong')
    }
    
    // if (resp.status === 'error') {
    //     alert('Something went wrong')
    // } else {
    //     const updatedUsers = users.filter(user => user._id !== id);
    //     setUsers([...updatedUsers]);
    // }
};

  useEffect(() => {
    if(!!user || !token) return;
    onLoadUser();
  }, [user]);

  return (
    <AccountInfoComponent user={user}
                          onDeleteUser={onDeleteUser}/>
  );
}

