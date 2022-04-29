import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table'

export const UserListComponent = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const getImageURL = (profile_photo) => {
        if (profile_photo) {
            return `${process.env.REACT_APP_PUBLIC_URL}/images/${profile_photo}`
        }
        return `${process.env.REACT_APP_PUBLIC_URL}/images/profile_placeholder.png`;
    };
    const onLoadUsers = async () => {
        const resp = await axios.get('http://localhost:8000/api/users');
        setUsers(resp?.data);
    };

    useEffect(() => {
        onLoadUsers();
    }, []);

    return (
        <div className="user-list-component">
            <Table>
                <tbody>
                    {users.map(user => (
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