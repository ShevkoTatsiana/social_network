import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

export const AccountInfoComponent = ({user, onDeleteUser}) => {
    const navigate = useNavigate();
    const onEditUser = () => {
        navigate('edit', {state: user});
    };

    return (
        <div className="account-info-component">          
            <div>{user?.name}</div>
            <div>{user?.email}</div>  
            <Image src={`${process.env.REACT_APP_PUBLIC_URL}/images/${user?.profile_photo}`}
                   roundedCircle={true}
                   className="profile-image"/>
            <Button variant="primary" onClick={() => onEditUser()}>Edit</Button> 
            <Button variant="primary" onClick={onDeleteUser}>Delete Account</Button>                        
        </div>
    );
}