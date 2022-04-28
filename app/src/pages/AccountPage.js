import React from 'react';
import { AccountInfoContainer } from '../components';

export const AccountPage = ({onUserLogout}) => {    
    return (
        <div className="account-page">
            <h1>Wellcome</h1>
            <AccountInfoContainer onUserLogout={onUserLogout}/>
        </div>
    );
}