import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import {useToken} from '../utils/useToken';
import { GroupDashboardComponent } from './GroupDashboard.component';

export const GroupContainer = () => {
  const {token} = useToken();
  const {name} = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState([]);
  const [group, setGroup] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onLoadUser = async () => {
    try {
      const resp = await axios.get(`${process.env.PUBLIC_URL}/api/users/${token}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      setCurrentUser(resp?.data);
    } catch(e) {
      setError('Sorry, can\'t load an user data');
    }   
  };
  const onLoadGroupUsers = async (id) => {
    try {
      const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/user_group/group/${id}`, 
      { headers: {"Authorization" : `Bearer ${token}`}});
      onLoadUsers(resp?.data);
    } catch(e) {console.log(e)}
  };
  const onLoadGroup = async () => {
    setLoading(true);
    try {
      const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/group/family/${name}`);
      setGroup(resp?.data[0]);
      onLoadGroupUsers(resp?.data[0]?._id);
    } catch(e) {
      setError('Sorry, can\'t load a group info');
    }
    setLoading(false);
  };
  const onLoadUsers = async (userIds) => {
    setLoading(true);
    try {
      const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/users/group/${userIds}`);
      setUsers(resp?.data);
      if(!!token) {
        onLoadUser();
      }
    } catch(e) {}
    setLoading(false);
  };
  const onJoinGroup = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.PUBLIC_URL}/api/user_group/${token}/create`, {groupId: group._id},
      { headers: {
        "Authorization": `Bearer ${token}`
      }});
      navigate('/account/info', {replace: true});
    } catch(e) {
      setError('Sorry, can\'t join family');
    }
    setLoading(false);
  };
  const onLeaveGroup = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.PUBLIC_URL}/api/user_group/${token}/delete/${group._id}`,
      { headers: {
        "Authorization": `Bearer ${token}`
      }});
      navigate('/account/info', {replace: true});
    } catch(e) {
      setError('Sorry, can\'t leave family');
    }
    setLoading(false);
  }

  useEffect(() => {
    if(!!group) return;
    onLoadGroup();   
  }, [group]);

  return (
    <GroupDashboardComponent group={group}
                    users={users}
                    onJoinGroup={onJoinGroup}
                    onLeaveGroup={onLeaveGroup}
                    currentUser={currentUser}
                    error={error}
                    loading={loading}/>
  );
}

