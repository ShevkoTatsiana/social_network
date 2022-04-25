import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useToken} from '../utils/useToken';
import {LoginFormContainer} from '../components';

export const LoginPage = () => {
    // const navigate = useNavigate();
    // const {token} = useToken();

    // useEffect(() => {
    //     if(!!token) {
    //         navigate('/account');
    //     }
    //     console.log(token);
    // }, [token]);

    return (
        <div className="login-user-page">
            <h1>Login</h1>
            <LoginFormContainer/>
        </div>
    );
}