import React from 'react';
import { AccountInfoContainer } from '../components';

type Props = {
    onUserLogout: () => void
};

export const AccountPage = ({onUserLogout}: Props) => {    
    return (
        <div className="account-page">
            <AccountInfoContainer onUserLogout={onUserLogout}/>
        </div>
    );
}