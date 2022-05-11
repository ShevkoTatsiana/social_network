import React from 'react';
import { useNavigate  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {PostContainer} from './Post.container';

export const GroupComponent = ({
    group, 
    users, 
    currentUser, 
    error, 
    loading,
    onJoinGroup,
    onLeaveGroup
}) => {
    const navigate = useNavigate();
    const isCurrentUserInGroup = users?.some((user) => user._id === currentUser._id);
    const imageURL = (image) => (image ? 
        `${process.env.REACT_APP_PUBLIC_URL}/images/${image}` :
        `${process.env.REACT_APP_PUBLIC_URL}/images/profile_placeholder.png`);  
    const onEditGroup = () => {
        navigate('edit', {state: group});
    };

    return (
        <div className="group-component"> 
            {loading && (
                <Spinner animation="border"
                         className="group-component__loader"
                         variant="info"/>
            )}
            <Alert show={error}
                   className="group-component__alert"
                   variant="danger">   
                {error}
            </Alert>      
            <div className="group-info">
                <div className="group-info__name">{group?.name}</div>
                <div className="group-info__description">{group?.description}</div>  
                <Image src={imageURL(group?.profile_photo)}
                    roundedCircle={true}
                    className="group-info__image profile-image"/>  
                {isCurrentUserInGroup && (
                    <Button variant="primary" onClick={onEditGroup}>Edit</Button> 
                )}
                {isCurrentUserInGroup && (
                    <PostContainer author={currentUser}
                                groupId={group?._id}/>
                )}
            </div>
            <div className="user-list">
                <h2>Our family:</h2>
                {users?.map(user => (
                    <div key={user.name}>
                        {user.name}
                        <Image src={imageURL(user?.profile_photo)}
                                roundedCircle={true}
                                className="user-list__image profile-image_sm"/>  
                    </div>
                ))}
                {!isCurrentUserInGroup ? (
                   <Button variant="primary" onClick={onJoinGroup}>Join Family</Button> 
                ) : (
                    <Button variant="primary" onClick={onLeaveGroup}>Leave Family</Button>
                )}
            </div>                
        </div>
    );
}