import React from 'react';
import {PostType} from '../types';

type Props = {
    post: PostType,
    active: boolean
};

export const GroupPostComponent = ({post, active}: Props) => {
    const date = new Date(post.createdAt);
    const dateString = date?.toString().split('GMT')[0];
    const isActiveClass = active ? 'active' : '';
    const postClassName = `group-post-component ${isActiveClass}`;

  return (
    <div className={postClassName}>       
        {!active && (
            <div className="group-post-component__author">
                {post.author_name}
            </div>
        )}
            <div className="group-post-component__text">
            {post.text}  
        </div> 
        <div className="group-post-component__date">
            {dateString}
        </div>              
    </div>
  );
}

