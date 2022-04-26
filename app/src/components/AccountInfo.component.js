import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

export const AccountInfoComponent = ({user}) => {
    return (
        <div className="account-info-component">          
            <div>{user?.name}</div>
            <div>{user?.email}</div>                            
        </div>
    );
}