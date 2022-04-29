import React from 'react';
import {UserFormContainer} from '../components';

export const CreateUserPage = ({onUserLogin}) => {
    return (
        <div className="create-user-page">
            <h1>Create User</h1>
            <UserFormContainer onUserLogin={onUserLogin}/>
        </div>
    );
}