import React from 'react';
import {UserListComponent} from '../components/UserList.component';

const UsersListPage = () => {
    return (
        <div className="user-list-page">
            <h1>Our Members</h1>
            <UserListComponent/>
        </div>
    );
}

export default UsersListPage;