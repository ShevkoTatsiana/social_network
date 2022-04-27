import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {useToken} from '../utils/useToken';
import { AccountInfoComponent } from './AccountInfo.component';

export const AccountInfoContainer = () => {
  const {token} = useToken();
  const [user, setUser] = useState();


  const onLoadUser = async () => {
    const resp = await axios.get(`http://localhost:8000/api/users/${token}`, { headers: {"Authorization" : `Bearer ${token}`}});
    setUser(resp?.data);
  };

  useEffect(() => {
    if(!!user || !token) return;
    onLoadUser();
  }, [user]);

  return (
    <AccountInfoComponent user={user}/>
  );
}

