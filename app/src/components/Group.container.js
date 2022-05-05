import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import {useToken} from '../utils/useToken';
import { GroupComponent } from './Group.component';

export const GroupContainer = () => {
  const {token, removeToken} = useToken();
  const {name} = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [usersId, setUsersId] = useState([]);
  const [group, setGroup] = useState();
  const [error, setError] = useState('');

  // const onLoadUser = async () => {
  //   try {
  //     const resp = await axios.get(`http://localhost:8000/api/users/${token}`, 
  //     { headers: {"Authorization" : `Bearer ${token}`}});
  //     setUser(resp?.data);
  //     if(!groupsId.length) {
  //       onLoadUserGroups();
  //     } 
  //   } catch(e) {
  //     setError('Sorry, can\'t load an user data');
  //   }   
  // };
  const onLoadGroupUsers = async (id) => {
    try {
      const resp =  await axios.get(`http://localhost:8000/api/user_group/group/${id}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      setUsersId(resp?.data);
      onLoadUsers(resp?.data);
    } catch(e) {console.log(e)}
  };
  const onLoadGroup = async () => {
    try {
      const resp =  await axios.get(`http://localhost:8000/api/group/family/${name}`);
      setGroup(resp?.data[0]);
      onLoadGroupUsers(resp?.data[0]?._id);
    } catch(e) {}
  };
  const onLoadUsers = async (userIds) => {
    console.log(userIds);
    try {
      const resp =  await axios.get(`http://localhost:8000/api/users/group/${userIds}`);
      setUsers(resp?.data);
    } catch(e) {}
  }

  // const onDeleteUser = async () => {
  //   try {
  //     await axios.delete(`http://localhost:8000/api/users/${token}`,
  //     { headers: {"Authorization" : `Bearer ${token}`}});
  //     removeToken();
  //     onUserLogout();
  //     navigate('/');
  //   } catch(e) {
  //     setError('Sorry, can\'t delete the user');
  //   }
//};

  useEffect(() => {
    if(!!group) return;
    onLoadGroup();   
  }, [group]);

  // useEffect(() => {
    
  // }, [groups])

  return (
    <GroupComponent group={group}
                    users={users}
                    error={error}/>
  );
}

