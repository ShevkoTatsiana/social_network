import React from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {GroupFormContainer} from './GroupForm.container';

export const EditGroupComponent = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const familyUrl = pathname.split('/edit')[0];

    const onBack = () => {       
        navigate(familyUrl);
    };
    const onEdit = () => {
        navigate(familyUrl);
        window.location.reload();
    };
                  
    return (
        <div className="edit-group-component"> 
            <p>You can edit a group profile information here</p>
            <Button variant="secondary" onClick={onBack}>Back</Button> 
             <GroupFormContainer onBack={onEdit}/>                   
        </div>
    );
}