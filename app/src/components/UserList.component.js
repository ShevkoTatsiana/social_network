import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

export const UserListComponent = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const onLoadUsers = async () => {
        const resp = await axios.get('http://localhost:8000/users');
        setUsers(resp?.data);
    };
    const onDeleteUser = async (id) => {
        const resp = await axios.delete(`http://localhost:8000/users/${id}`);
        //setUsers(resp?.data);
        console.log(`delete ${id}`, resp);
        if (resp.status === 'error') {
            alert('Something went wrong')
        } else {
            const updatedUsers = users.filter(user => user._id !== id);
            setUsers([...updatedUsers]);
        }
    };
    const onEditUser = (id) => {
        history.push(`/edit/:${id}`);
        // const resp = await axios.post(`http://localhost:8000/users/edit/${id}`);
        // //setUsers(resp?.data);
        // console.log(`edit ${id}`, resp);
    };

    useEffect(() => {
        onLoadUsers();
    }, []);
console.log(users);

    return (
        <div className="user-list-component">
            <Table>
                <tbody>
                    {users.map(user => (
                        <tr key={user.name}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Button variant="primary">Edit</Button></td>
                            <td><Button variant="primary" onClick={() => onDeleteUser(user._id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}