import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useToken} from '../utils/useToken';
import { AccountInfoComponent } from './AccountInfo.component';
import { useAppDispatch } from '../utils/reduxHooks';
import {setCurrentUser} from '../features/familySlice';
import {UserType} from '../types';

export const AccountInfoContainer = () => {
  const {token, removeToken} = useToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserType>();
  const [groupsId, setGroupsId] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onLoadUser = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${process.env.PUBLIC_URL}/api/users/${token}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      setUser(resp?.data);
      dispatch(setCurrentUser(resp?.data));
      if(!groupsId.length) {
        onLoadUserGroups();
      } 
    } catch(e) {
      setError('Sorry, can\'t load an user data');
    }   
    setLoading(false);
  };
  const onLoadUserGroups = async () => {
    try {
      const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/user_group/${token}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      setGroupsId(resp?.data);
      if(resp?.data?.length) {
        onLoadGroup(resp?.data);
      }    
    } catch(e) {}
  };
  const onLoadGroup = async (groupIds: string[]) => {
    try {
      const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/group/${groupIds}`);
      setGroups(resp?.data);
    } catch(e) {}
  }

  const onDeleteUser = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.PUBLIC_URL}/api/users/${token}`,
      { headers: {"Authorization" : `Bearer ${token}`}});
      removeToken();
      dispatch(setCurrentUser(null));
      navigate('/');
    } catch(e) {
      setError('Sorry, can\'t delete the user');
    }
    setLoading(false);
};

  useEffect(() => {
    if(!!user || !token) return;
    onLoadUser();   
  }, [user]);

  return (
    <AccountInfoComponent user={user}
                          groups={groups}
                          error={error}
                          loading={loading}
                          onDeleteUser={onDeleteUser}/>
  );
}

