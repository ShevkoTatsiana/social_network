import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector} from '../utils/reduxHooks';
import { useToken } from '../utils/useToken';
import { RecepiesComponent } from './Recepies.component';
import {ValidationError} from '../types';

export const RecepiesContainer = () => {
    const [validationError, setValidationError] = useState<ValidationError>();
    const [loading, setLoading] = useState(false);
    const [recepies, setResepies] = useState([]);
    const {token} = useToken();
    const groupId = useAppSelector((state) => state.groupId);

    const onSubmitRecipe = async (formData: FormData) => {
        setLoading(true);
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/recepies/create`, formData,
       { headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'multipart/form-data'
        } });
        onLoadRecepies();
            
        } catch (e) {
            if (e.response?.data?.error) {
                setValidationError({ message: e.response?.data?.error });
            } else setValidationError(e.response?.data?.details[0]);
        }
        setLoading(false);
    };

    const onLoadRecepies = async () => {
        setLoading(true);
        try {
          const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/recepies/${groupId}`);
          setResepies(resp?.data);
        } catch(e) {}
        setLoading(false);
    };

    const onDeleteRecipe = async (id: string) => {
        setLoading(true);
        try {
          const resp =  await axios.delete(`${process.env.PUBLIC_URL}/api/recepies/${id}`);
          setResepies(resp?.data);
          onLoadRecepies();
        } catch(e) {}
        setLoading(false);
    };

    useEffect(() => {
        if(!groupId) return;
        onLoadRecepies();
    }, [groupId]);

    return (
        <RecepiesComponent onSubmitRecipe={onSubmitRecipe}
                           onDeleteRecipe={onDeleteRecipe}
                           recepies={recepies}
                           groupId={groupId}
                           loading={loading}
                           error={validationError}/>
    );
}

