import React, {useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useToken} from '../utils/useToken';
import { AccountInfoContainer } from '../components';

export const AccountPage = () => {
    const navigate = useNavigate();
    const {state: user} = useLocation();
    const {token} = useToken();

    useEffect(() => {
        if(!token) {
            navigate('/account/login');
        }
        console.log(token);
    }, [token]);

    return (
        <div className="account-page">
            <h1>Wellcome</h1>
            <AccountInfoContainer/>
        </div>
    );
}