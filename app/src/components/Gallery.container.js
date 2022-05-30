import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { GalleryComponent } from './Gallery.component';

export const GalleryContainer = ({ author, groupId, isCurrentUserInGroup }) => {
    const [validationError, setValidationError] = useState();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const {token} = useToken();

    const onSubmitImage = async (formData) => {
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

    const onDeleteImage = async (id) => {
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
                       isCurrentUserInGroup={isCurrentUserInGroup}
                       currentUserName={author.name}
                       loading={loading}
                       error={validationError}/>
    );
}

