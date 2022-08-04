import React from 'react';
import {LoginFormContainer} from '../components';

type Props = {
    onUserLogin: () => void
};

const LoginPage = ({onUserLogin}: Props) => {
    return (
        <div className="login-user-page">
            <h1>Login</h1>
            <LoginFormContainer onUserLogin={onUserLogin}/>
        </div>
    );
}

export default LoginPage;