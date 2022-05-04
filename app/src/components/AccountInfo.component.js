import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

export const AccountInfoComponent = ({user, error, onDeleteUser}) => {
    const navigate = useNavigate();
    const onEditUser = () => {
        navigate('edit', {state: user});
    };
    const imageURL = user?.profile_photo ? 
        `${process.env.REACT_APP_PUBLIC_URL}/images/${user?.profile_photo}` :
        `${process.env.REACT_APP_PUBLIC_URL}/images//profile_placeholder.png`;
    const onNavigateToGroupCreation = () => {
        navigate('create_group');
    }
                  
    return (
        <div className="account-info-component"> 
            <Alert show={error}
                   variant="danger">   
                {error}
            </Alert>      
            <div>{user?.name}</div>
            <div>{user?.email}</div>  
            <Image src={imageURL}
                   roundedCircle={true}
                   className="profile-image"/>
            <Button variant="primary" onClick={() => onEditUser()}>Edit</Button> 
            <Button variant="primary" onClick={onDeleteUser}>Delete Account</Button>  
            <div className="account-group-block">
                <h2>Your families:</h2>
                <div>Your family list has not been created yet</div>
                <Button variant="secondary" onClick={onNavigateToGroupCreation}>Create a family group</Button> 
            </div>                      
        </div>
    );
}