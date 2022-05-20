import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../utils/useToken';
import { FamilyTreeComponent } from './FamilyTree.component';
import { convertFormData } from '../utils/convertFormData';

export const FamilyTreeContainer = ({ author, groupId, isCurrentUserInGroup }) => {
    const [validationError, setValidationError] = useState();
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const {token} = useToken();

    const onSubmitMember = async (data, currentItem, operation) => { 
        setLoading(true);
        try {
            const result = await axios.post(`http://localhost:8000/api/tree/create`, data,
            { headers: {
                "Content-Type": 'multipart/form-data'
            }});
            if(!!currentItem && !!operation) {
                onUpdateCurrentMember(currentItem, operation, result?.data?._id);
            } 
            onLoadTree();
            
        } catch (e) {
            if (e.response?.data?.error) {
                setValidationError({ message: e.response?.data?.error });
            } else setValidationError(e.response?.data?.details[0]);
        }
        setLoading(false);
    }

    const onUpdateCurrentMember = (currentItemId, operation, newItemId) => {
        const updatedMembers = [...members];
        const updatedMembersArr = updatedMembers.map((item) => {
            if(item._id !== currentItemId) return item;
            switch (operation) {
                // add child operation
                case 1:
                    item['children'].push(newItemId);
                    onUpdateMember(item, item._id);
                    if (!!item.partner) {
                        // add child to partner
                        const partner = updatedMembers.find(member => member._id === item.partner);
                        partner['children'].push(newItemId);
                        onUpdateMember(partner, partner._id);
                    }
                    break; 
                // add parent operation    
                case 2:
                    item['parents'].push(newItemId);
                    onUpdateMember(item, item._id);
                    if(item.siblings?.length) {
                        item.siblings.forEach((id) => {
                            // add parent id to siblings
                            const sibling = updatedMembers.find(member => member._id === id);
                            sibling['parents'].push(newItemId);
                            onUpdateMember(sibling, sibling._id);
                        })
                    }
                    break; 
                // add partner operation
                case 3:
                    item.partner = newItemId;
                    onUpdateMember(item, item._id);
                    break; 
                // add siblings operation
                case 4:
                    item['siblings'].push(newItemId); 
                    onUpdateMember(item, item._id);
                    // add a child id to sibling's parent
                    if(item.parents.length) {
                        item.parents.forEach(parentId => {
                            const parentItem = updatedMembers.find(member => member._id === parentId);
                            parentItem['children'].push(newItemId); 
                            onUpdateMember(parentItem, parentItem._id);
                        })
                    }                                   
                    break; 
                default:
                    break;           
            }
            onLoadTree(); 
            return item;          
        });
        return updatedMembersArr;   
           
    };

    const onUpdateMember = async (data, id) => {           
        const formData = convertFormData(data);
        try {
          const result = await axios.put(`http://localhost:8000/api/tree/${id}`, formData,
           { headers: {
              "Content-Type": "multipart/form-data"
            } });
            onLoadTree();
        } catch (e) {
          if(e.response?.data?.error) {
            setValidationError({message: e.response?.data?.error});
          } else setValidationError(e.response?.data?.details[0]);
        }   
      };

    const onLoadTree = async () => {
        setLoading(true);
        try {
            const resp =  await axios.get(`http://localhost:8000/api/tree/${groupId}`);
            const uploadedTree = resp?.data;
            const uploadedMembers = uploadedTree.map(item => {
                const children = item['children'][0].split(',').filter(item => item !== '');
                item.children = children;
                const parents = item['parents'][0].split(',').filter(item => item !== '');
                item.parents = parents;
                const siblings = item['siblings'][0].split(',').filter(item => item !== '');
                item.siblings = siblings;
                return item;
            });
          setMembers(resp?.data);
        } catch(e) {}
        setLoading(false);
    };

    const onDeleteMember = async (id) => {
        setLoading(true);
        
        const updatedMembers = members.filter((member)=> member._id !== id).map(member => {
            if(member.partner === id) {
                member.partner = '';
                onUpdateMember(member, member._id);
                return member;
            } else if(member.parents.includes(id)) {
                member.parents.splice(member.parents.indexOf(id), 1);
                onUpdateMember(member, member._id);
                return member;
            } else if(member.children.includes(id)) {
                member.children.splice(member.children.indexOf(id), 1);
                onUpdateMember(member, member._id);
                return member;
            } else if(member.siblings.includes(id)) {
                member.siblings.splice(member.siblings.indexOf(id), 1);
                onUpdateMember(member, member._id);
                return member;
            } else return member;
        });
        try {
            const resp =  await axios.delete(`http://localhost:8000/api/tree/${id}`);
        } catch(e) {}
        setLoading(false);
        setMembers(updatedMembers);
        onLoadTree();
    };

    useEffect(() => {
        if(!groupId) return;
        onLoadTree();
    }, [groupId]);

    return (
        <FamilyTreeComponent onSubmitMember={onSubmitMember}
                       onDeleteMember={onDeleteMember}
                       onUpdateMember={onUpdateMember}
                       members={members}
                       groupId={groupId}
                       isCurrentUserInGroup={isCurrentUserInGroup}
                       currentUserName={author.name}
                       loading={loading}
                       error={validationError}
                       onUpdateCurrentMember={onUpdateCurrentMember}/>
    );
}

