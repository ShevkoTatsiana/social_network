import React, {useState, useEffect} from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

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
                         variant="info"/>
            )}
            <Alert show={error}
                   variant="danger">   
                {error}
            </Alert>      
            <div>{group?.name}</div>
            <div>{group?.description}</div>  
            <Image src={imageURL(group?.profile_photo)}
                   roundedCircle={true}
                   className="profile-image"/>  
            {isCurrentUserInGroup && (
                <Button variant="primary" onClick={onEditGroup}>Edit</Button> 
            )}
            <div>
                <h2>Our family:</h2>
                {users?.map(user => (
                    <div key={user.name}>
                        {user.name}
                        <Image src={imageURL(user?.profile_photo)}
                                roundedCircle={true}
                                className="profile-image"/>  
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