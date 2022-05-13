import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { FamilyTreeComponent } from './FamilyTree.component';

export const FamilyTreeContainer = ({ author, groupId, isCurrentUserInGroup }) => {
    const [validationError, setValidationError] = useState();
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const {token} = useToken();

    const onSubmitMember = async (formData, currentItem, operation) => {
        const updatedArray = (!!currentItem && !!operation) ?onUpdateCurrentMember(currentItem, operation, formData.id) : [...members];
        const newMembers = [...updatedArray, formData];
        setMembers(newMembers);
    //     setLoading(true);
    //     try {
    //         await axios.post(`http://localhost:8000/api/family/create`, formData,
    //    { headers: {
    //       "Authorization": `Bearer ${token}`,
    //       "Content-Type": 'multipart/form-data'
    //     } });
    //     onLoadMembers();
            
    //     } catch (e) {
    //         console.log(e, e?.response);
    //         if (e.response?.data?.error) {
    //             setValidationError({ message: e.response?.data?.error });
    //         } else setValidationError(e.response?.data?.details[0]);
    //     }
    //     setLoading(false);
    };

    const onUpdateCurrentMember = (currentItemId, operation, newItemId) => {
        const updatedMembers = members.map((item) => {
            if(!item.id === currentItemId) return item;
            switch (operation) {
                case 1:
                    item['children'].push(newItemId);
                    break; 
                case 2:
                    item['parents'].push(newItemId);
                    break; 
                case 3:
                    item.partner = newItemId;
                    break; 
                case 4:
                    item['siblings'].push(newItemId);
                    break; 
                default:
                    break;           
            }
            return item;          
        });
        return updatedMembers;       
    };

    const onLoadMembers = async () => {
        setLoading(true);
        try {
          const resp =  await axios.get(`http://localhost:8000/api/family/${groupId}`);
          setMembers(resp?.data);
        } catch(e) {}
        setLoading(false);
    };

    const onDeleteMember = async (id) => {
        setLoading(true);
        try {
          const resp =  await axios.delete(`http://localhost:8000/api/family/${id}`);
          setMembers(resp?.data);
          onLoadMembers();
        } catch(e) {}
        setLoading(false);
    };

    // useEffect(() => {
    //     if(!groupId) return;
    //     onLoadMembers();
    // }, [groupId]);

    return (
        <FamilyTreeComponent onSubmitMember={onSubmitMember}
                       onDeleteMember={onDeleteMember}
                       members={members}
                       groupId={groupId}
                       isCurrentUserInGroup={isCurrentUserInGroup}
                       currentUserName={author.name}
                       loading={loading}
                       error={validationError}
                       onUpdateCurrentMember={onUpdateCurrentMember}/>
    );
}

