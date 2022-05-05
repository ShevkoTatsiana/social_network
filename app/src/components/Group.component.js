import React, {useState, useEffect} from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

export const GroupComponent = ({group, users, error}) => {
    //const navigate = useNavigate();
    const imageURL = (image) => (image ? 
        `${process.env.REACT_APP_PUBLIC_URL}/images/${image}` :
        `${process.env.REACT_APP_PUBLIC_URL}/images/profile_placeholder.png`);      
    return (
        <div className="group-component"> 
            <Alert show={error}
                   variant="danger">   
                {error}
            </Alert>      
            <div>{group?.name}</div>
            <div>{group?.description}</div>  
            <Image src={imageURL(group?.profile_photo)}
                   roundedCircle={true}
                   className="profile-image"/>  
            <div>
                <h2>Our family:</h2>
                {users?.map(user => (
                    <div key={user.name}>
                        {user.name}
                        <Image src={imageURL(user?.profile_photo)}
                                roundedCircle={true}
                                className="profile-image"/>  
                    </div>
                ))}
            </div>                
        </div>
    );
}