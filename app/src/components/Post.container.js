import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { PostComponent } from './Post.component';

export const PostContainer = ({ author, groupId }) => {
    const [validationError, setValidationError] = useState();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const {token} = useToken();
console.log(groupId);
    const onSubmitPost = async (post) => {
        const data = {
            author_name: author.name,
            group_id: groupId,
            text: post.post
        };
        console.log(data);
        setLoading(true);
        try {
            const result = await axios.post(`http://localhost:8000/api/posts/${token}/create`, data,
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
        console.log(groupId);
        setLoading(true);
        try {
          const resp =  await axios.get(`http://localhost:8000/api/posts/${groupId}`);
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
                       currentUserName={author?.name}
                       loading={loading}
                       error={validationError} />
    );
}

