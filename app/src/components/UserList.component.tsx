import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import ImagePlaceholder from '../resources/profile_placeholder.png';
import {UserType} from '../types';

export const UserListComponent = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const getImageURL = (profile_photo: string) => (profile_photo ? profile_photo : ImagePlaceholder);
    const onLoadUsers = async () => {
        const resp = await axios.get(`${process.env.PUBLIC_URL}/api/users`);
        setUsers(resp?.data);
    };

    useEffect(() => {
        onLoadUsers();
    }, []);

    return (
        <div className="user-list-component">
            <Table>
                <tbody>
                    {users?.map(user => (
                        <tr key={user.name}>
                            <td>
                                <Image src={getImageURL(user.profile_photo)}
                                    roundedCircle={true}
                                    thumbnail={true}
                                    className="profile-image"/>
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}