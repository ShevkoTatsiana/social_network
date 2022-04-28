import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const AccountInfoComponent = ({user}) => {
    const navigate = useNavigate();
    const onEditUser = () => {
        navigate('edit', {state: user});
    };

    return (
        <div className="account-info-component">          
            <div>{user?.name}</div>
            <div>{user?.email}</div>   
            <Button variant="primary" onClick={() => onEditUser()}>Edit</Button>                         
        </div>
    );
}