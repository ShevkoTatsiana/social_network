import React from 'react';
import {UserFormContainer} from '../components';

type Props = {
    onUserLogin: () => void
};

export const CreateUserPage = ({onUserLogin}: Props) => {
    return (
        <div className="create-user-page">
            <h1>Create User</h1>
            <UserFormContainer onUserLogin={onUserLogin}/>
        </div>
    );
}