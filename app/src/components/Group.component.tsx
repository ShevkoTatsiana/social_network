import React from 'react';
import { useNavigate  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {PostContainer} from './Post.container';
import { useAppSelector} from '../utils/reduxHooks';
import ImagePlaceholder from '../resources/profile_placeholder.png';
import {GroupType, UserType} from '../types';

type Props = {
    group: GroupType | undefined,
    users: UserType[],
    onJoinGroup: () => void,
    onLeaveGroup: () => void,
    error: string,
    loading: boolean
 };

export const GroupComponent = ({
    group, 
    users, 
    error, 
    loading,
    onJoinGroup,
    onLeaveGroup
}: Props) => {
    const navigate = useNavigate();
    const isCurrentUserInGroup = useAppSelector((state) => state.isCurrentUserInGroup);
    const imageURL = (image: string | undefined | File) => (image ? 
        image : ImagePlaceholder);  
    const onEditGroup = () => {
        navigate('edit', {state: group});
    };

    return (
        <div className="group-component"> 
            {loading && (
                <div className="group-component__loader">
                    <Spinner animation="border"
                            variant="info"/>
                </div>
            )}
            <Alert show={!!error}
                   className="group-component__alert"
                   variant="danger">   
                {error}
            </Alert> 
            {!!group && (
                <div className="group-info">
                <Image src={imageURL(group?.profile_photo)}
                        roundedCircle={true}
                        className="group-info__image"/> 
                <h3 className="group-info__name">{group?.name}</h3>
                <div className="group-info__description"><em>{group?.description}</em></div>  
                 
                {isCurrentUserInGroup && (
                    <Button variant="primary" onClick={onEditGroup}>Edit</Button> 
                )}
                {isCurrentUserInGroup && (
                    <PostContainer />
                )}
            </div>
            )}                
            <div className="user-list">
                <h2>Our family:</h2>
                {users?.map(user => (
                    <div key={user.name}
                         className="user-list__item">
                        {user.name}
                        <Image src={imageURL(user?.profile_photo)}
                                roundedCircle={true}
                                className="user-list__image profile-image_sm"/>  
                    </div>
                ))}
                {!isCurrentUserInGroup ? (
                   <Button variant="outline-primary" onClick={onJoinGroup}>Join Family</Button> 
                ) : (
                    <Button variant="outline-primary" onClick={onLeaveGroup}>Leave Family</Button>
                )}
            </div>                
        </div>
    );
}