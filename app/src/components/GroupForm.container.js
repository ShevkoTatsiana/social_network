import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { GroupFormComponent } from './GroupForm.component';

export const GroupFormContainer = ({ onBack }) => {
  const { state: groupData } = useLocation();
  const navigate = useNavigate();
  const { token } = useToken();
  const [validationError, setValidationError] = useState();

  const onSubmitCreate = async (formData) => {
    try {
      const result = await axios.post(`${process.env.PUBLIC_URL}/api/group/create`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        });
      const groupId = result?.data?._id;
      await axios.post(`${process.env.PUBLIC_URL}/api/user_group/${token}/create`, { groupId },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      navigate('/account/info', { replace: true });
    } catch (e) {
      if (e.response?.data?.error) {
        setValidationError({ message: e.response?.data?.error });
      } else setValidationError(e.response?.data?.details[0]);
    }
  };

  const onSubmitUpdate = async (formData) => {
    try {
      const result = await axios.put(`${process.env.PUBLIC_URL}/api/group/${groupData._id}`, formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });
      onBack();
    } catch (e) {
      if (e.response?.data?.error) {
        setValidationError({ message: e.response?.data?.error });
      } else setValidationError(e.response?.data?.details[0]);
    }
  };

  const handleOnFormSubmit = (data) => {
    if (groupData) return onSubmitUpdate(data);
    return onSubmitCreate(data);
  };

  return (
    <GroupFormComponent error={validationError}
      group={groupData}
      onSubmit={handleOnFormSubmit} />
  );
}

