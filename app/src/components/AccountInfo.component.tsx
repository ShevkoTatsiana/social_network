import React from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import GroupImage from '../resources/tree.svg';
import ImagePlaceholder from '../resources/profile_placeholder.png';
import {UserType, GroupType} from '../types';

type Props = {
    user?: UserType,
    error: string,
    loading: boolean,
    groups: GroupType[],
    onDeleteUser: () => void
};

export const AccountInfoComponent = ({user, error, loading, groups, onDeleteUser}: Props) => {
    const navigate = useNavigate();
    const onEditUser = () => {
        navigate('edit', {state: user});
    };
    const imageURL = user?.profile_photo ? user?.profile_photo : ImagePlaceholder;
    const onNavigateToGroupCreation = () => {
        navigate('create_group');
    };
            
    return (
        <div className="account-info-component"> 
            <h1 className="account-info-component__title">Wellcome <strong className="account-info-component__title--color">{user?.name}</strong></h1>
             {loading && (
                <div className="account-info-component__loader">
                    <Spinner animation="border"
                            variant="info"/>
                </div>
            )}
            <Alert show={!!error}
                   variant="danger">   
                {error}
            </Alert> 
            <div className="account-info">   
                <Image src={imageURL}
                        roundedCircle={true}
                        className="profile-image"/> 
                <div className="account-info__block">
                    <h3 className="account-info__block-title">Profile info:</h3>
                    <div>name: {user?.name}</div>
                    <div>email: {user?.email}</div> 
                    <div className="account-info__actions">
                        <Button variant="primary" 
                                onClick={onEditUser}>
                            Edit Profile Info
                        </Button> 
                        <Button variant="outline-primary" 
                                onClick={onDeleteUser}>
                            Delete Account
                        </Button> 
                    </div>
                </div>                
            </div>  
            <div className="account-group">
                <h3>Your families:</h3>
                <div className="account-group__list">
                    {!!groups?.length ? (
                        <>
                            {groups?.map((group) => (
                                <NavLink  key={group.name} 
                                          to={`/family/${group.name}`}
                                          className="account-group__link">
                                    {group.name}
                                </NavLink >
                            ))}
                        </>
                    ) : (
                        <div>Your family list has not been created yet</div>
                    )}    
                    <Image src={GroupImage}
                            className="account-group__image"/>
                </div>
                <div className="account-group__note">
                    You can create as much family groups as you need. 
                    Just create a group and share its link with your relatives to join the group.
                </div>       
                <Button variant="outline-secondary" 
                        onClick={onNavigateToGroupCreation}
                        className="account-group__actions">
                    Create a family group
                </Button> 
            </div>                      
        </div>
    );
}