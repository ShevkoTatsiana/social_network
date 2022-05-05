import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { GroupFormComponent } from './GroupForm.component';

export const GroupFormContainer = ({onUserLogin}) => {
  const { state: userData } = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [user, setUser] = useState(userData);
  const [validationError, setValidationError] = useState();
  const [userCreateData, setUserCreateData] = useState({});

  const onSubmitCreate = async (formData) => {
    console.log(token);
    try {
      const result = await axios.post('http://localhost:8000/api/group/create', formData,
      { headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }});
      const groupId = result?.data?._id;
            console.log(groupId);
      await axios.post(`http://localhost:8000/api/user_group/${token}/create`, {groupId},
      { headers: {
        "Authorization": `Bearer ${token}`
      }});
      //setUserCreateData({email: formData.get('email'), password: formData.get('password')});
      navigate('/account/info', {replace: true});
    } catch (e) {
      if(e.response?.data?.error) {
        setValidationError({message: e.response?.data?.error});
      } else setValidationError(e.response?.data?.details[0]);
    }
  };

  return (
    <GroupFormComponent error={validationError}
    onCreate={onSubmitCreate}/>
  );
}

