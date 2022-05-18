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

    const onSubmitMember = async (data, currentItem, operation) => {      
            const updatedArray = (!!currentItem && !!operation) ?onUpdateCurrentMember(currentItem, operation, formData.id) : [...members];       
            const newMembers = [...updatedArray, data];
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

    const onSaveTree = () => {};

    const onUpdateCurrentMember = (currentItemId, operation, newItemId) => {
        const updatedMembers = [...members];
        const updatedMembersArr = updatedMembers.map((item) => {
            if(item.id !== currentItemId) return item;
            switch (operation) {
                // add child operation
                case 1:
                    item['children'].push(newItemId);
                    if (!!item.partner) {
                        // add child to partner
                        const partner = updatedMembers.find(member => member.id === item.partner);
                        partner['children'].push(newItemId);
                    }
                    break; 
                // add parent operation    
                case 2:
                    item['parents'].push(newItemId);
                    if(item.siblings?.length) {
                        item.siblings.forEach((id) => {
                            // add parent id to siblings
                            const sibling = updatedMembers.find(member => member.id === id);
                            console.log(sibling, 'sibling');
                            sibling['parents'].push(newItemId);
                        })
                    }
                    break; 
                // add partner operation
                case 3:
                    item.partner = newItemId;
                    break; 
                // add siblings operation
                case 4:
                    item['siblings'].push(newItemId); 
                    // add a child id to sibling's parent
                    if(item.parents.length) {
                        item.parents.forEach(parentId => {
                            console.log(parentId);
                            const parentItem = updatedMembers.find(member => member.id === parentId);
                            console.log(parentItem['children']);
                            parentItem['children'].push(newItemId); 
                        })
                    }                                   
                    break; 
                default:
                    break;           
            }
            return item;          
        });
        return updatedMembersArr;       
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
        // setLoading(true);
        // try {
        //   const resp =  await axios.delete(`http://localhost:8000/api/family/${id}`);
        //   setMembers(resp?.data);
        //   onLoadMembers();
        // } catch(e) {}
        // setLoading(false);
        const updatedMembers = members.filter((member)=> member.id !== id).map(member => {
            if(member.partner.id === id) {
                member.partner = {};
                return member;
            } else if(member.parents.includes(id)) {
                member.parents.splice(member.parents.indexOf(id), 1);
                return member;
            } else if(member.children.includes(id)) {
                member.children.splice(member.parents.indexOf(id), 1);
                return member;
            } else return member;
        });
        console.log(updatedMembers);
        setMembers(updatedMembers);
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

