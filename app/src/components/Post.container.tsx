import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { PostComponent } from './Post.component';
import { useAppSelector} from '../utils/reduxHooks';
import {ValidationError, UserType} from '../types';

type FormValues = {
    text: string
  }

export const PostContainer = () => {
    const [validationError, setValidationError] = useState<ValidationError>();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const {token} = useToken();
    const groupId = useAppSelector((state) => state.groupId);
    const currentUser = useAppSelector<UserType | null>((state) => state.currentUser);
    const currentUserName = currentUser?.name;

    const onSubmitPost = async (post:FormValues) => {
        const data = {
            author_name: currentUserName,
            group_id: groupId,
            text: post.text
        };
        setLoading(true);
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/posts/${token}/create`, data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                onLoadPosts();
            
        } catch (e) {
            if (e.response?.data?.error) {
                setValidationError({ message: e.response?.data?.error });
            } else setValidationError(e.response?.data?.details[0]);
        }
        setLoading(false);
    };

    const onLoadPosts = async () => {
        setLoading(true);
        try {
          const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/posts/${groupId}`);
          setPosts(resp?.data);
        } catch(e) {}
        setLoading(false);
    };

    useEffect(() => {
        if(!groupId) return;
        onLoadPosts();
    }, [groupId]);

    return (
        <PostComponent onSubmitPost={onSubmitPost}
                       posts={posts}
                       currentUserName={currentUserName}
                       loading={loading}
                       error={validationError} />
    );
}

