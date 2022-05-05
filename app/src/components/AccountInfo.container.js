import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useToken} from '../utils/useToken';
import { AccountInfoComponent } from './AccountInfo.component';

export const AccountInfoContainer = ({onUserLogout}) => {
  const {token, removeToken} = useToken();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [groupsId, setGroupsId] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  const onLoadUser = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/api/users/${token}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      setUser(resp?.data);
      if(!groupsId.length) {
        onLoadUserGroups();
      } 
    } catch(e) {
      setError('Sorry, can\'t load an user data');
    }   
  };
  const onLoadUserGroups = async () => {
    try {
      const resp =  await axios.get(`http://localhost:8000/api/user_group/${token}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      console.log(resp);
      setGroupsId(resp?.data);
      onLoadGroup(resp?.data);
    } catch(e) {}
  };
  const onLoadGroup = async (groupIds) => {
    console.log(groupIds);
    try {
      const resp =  await axios.get(`http://localhost:8000/api/group/${groupIds}`);
      console.log(resp);
      setGroups(resp?.data);
    } catch(e) {}
  }

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

  // useEffect(() => {
    
  // }, [groups])

  return (
    <AccountInfoComponent user={user}
                          groups={groups}
                          error={error}
                          onDeleteUser={onDeleteUser}/>
  );
}

