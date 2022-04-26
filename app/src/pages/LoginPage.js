import React from 'react';
import {LoginFormContainer} from '../components';

export const LoginPage = ({onUserLogin}) => {
    return (
        <div className="login-user-page">
            <h1>Login</h1>
            <LoginFormContainer onUserLogin={onUserLogin}/>
        </div>
    );
}