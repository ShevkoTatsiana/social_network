import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { useAppSelector} from '../utils/reduxHooks';
import { GalleryComponent } from './Gallery.component';
import {ValidationError} from '../types';

export const GalleryContainer = () => {
    const [validationError, setValidationError] = useState<ValidationError>();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const {token} = useToken();
    const groupId = useAppSelector((state) => state.groupId);

    const onSubmitImage = async (formData: FormData) => {
        setLoading(true);
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/gallery/create`, formData,
       { headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'multipart/form-data'
        } });
        onLoadImages();
            
        } catch (e) {
            if (e.response?.data?.error) {
                setValidationError({ message: e.response?.data?.error });
            } else setValidationError(e.response?.data?.details[0]);
        }
        setLoading(false);
    };

    const onLoadImages = async () => {
        setLoading(true);
        try {
          const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/gallery/${groupId}`);
          setImages(resp?.data);
        } catch(e) {}
        setLoading(false);
    };

    const onDeleteImage = async (id: string) => {
        setLoading(true);
        try {
          const resp =  await axios.delete(`${process.env.PUBLIC_URL}/api/gallery/${id}`);
          setImages(resp?.data);
          onLoadImages();
        } catch(e) {}
        setLoading(false);
    };

    useEffect(() => {
        if(!groupId) return;
        onLoadImages();
    }, [groupId]);

    return (
        <GalleryComponent onSubmitImage={onSubmitImage}
                       onDeleteImage={onDeleteImage}
                       images={images}
                       groupId={groupId}
                       loading={loading}
                       error={validationError}/>
    );
}

