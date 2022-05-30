import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WellcomeComponent } from './Wellcome.component';
import {useToken} from '../utils/useToken';

export const WellcomeContainer = () => {
  const {confirmationCode} = useParams();
  const [error, setError] = useState();
  const [data, setData] = useState({});

  const handleOnVerifyUser = async (confirmationCode) => {
    try {
      const result = await axios.get(`${process.env.PUBLIC_URL}/api/users/confirm/${confirmationCode}`);
      setData(result?.data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    if(!confirmationCode) return;
    handleOnVerifyUser(confirmationCode);
  }, [confirmationCode]);

  return (
    <WellcomeComponent error={error}
                       data={data}/>
  );
}

