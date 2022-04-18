import React from 'react';
import {UserListComponent} from '../components/UserList.component';

export const UsersListPage = () => {
    return (
        <div className="user-list-page">
            <h1>Our Users</h1>
            <UserListComponent/>
        </div>
    );
}