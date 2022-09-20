import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FamilyTreeComponent } from './FamilyTree.component';
import { convertFormData } from '../utils/convertFormData';
import { useAppSelector} from '../utils/reduxHooks';
import {ValidationError, MemberType} from '../types';

type MemberWithIdType = Omit<MemberType, "_id"> & {
    _id: string
};

export const FamilyTreeContainer = () => {
    const [validationError, setValidationError] = useState<ValidationError>();
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState<MemberWithIdType[]>([]);
    const groupId = useAppSelector((state) => state.groupId);

    const onSubmitMember = async (data: FormData, currentItem: string, operation: number) => { 
        setLoading(true);
        try {
            const result = await axios.post(`${process.env.PUBLIC_URL}/api/tree/create`, data,
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

    const onUpdateCurrentMember = (currentItemId: string, operation: number, newItemId: string) => {
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
                        if(!!partner) {
                            partner['children'].push(newItemId);
                            onUpdateMember(partner, partner._id);
                        }                      
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
                            if(!!sibling) {
                                sibling['parents'].push(newItemId);
                                onUpdateMember(sibling, sibling._id);
                            }                           
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
                            if(!!parentItem) {
                                parentItem['children'].push(newItemId); 
                                onUpdateMember(parentItem, parentItem._id);
                            }                           
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

    const onUpdateMember = async (data: MemberType, id: string) => {           
        const formData = convertFormData(data);
        try {
          const result = await axios.put(`${process.env.PUBLIC_URL}/api/tree/${id}`, formData,
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
            const resp =  await axios.get(`${process.env.PUBLIC_URL}/api/tree/${groupId}`);
            const uploadedTree: MemberType[] = resp?.data;
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

    const onDeleteMember = async (id: string) => {
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
            const resp =  await axios.delete(`${process.env.PUBLIC_URL}/api/tree/${id}`);
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
                       loading={loading}
                       error={validationError}/>
    );
}

