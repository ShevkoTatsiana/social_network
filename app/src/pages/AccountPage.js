import React from 'react';
import { AccountInfoContainer } from '../components';

export const AccountPage = ({onUserLogout}) => {    
    return (
        <div className="account-page">
            <AccountInfoContainer onUserLogout={onUserLogout}/>
        </div>
    );
}