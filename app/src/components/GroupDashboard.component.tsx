import React from 'react';
import {
    Routes, 
    Route
} from 'react-router-dom';
import { 
    GroupComponent, 
    EditGroupComponent,
    GroupNavigationComponent,
    RecepiesContainer,
    GalleryContainer,
    FamilyTreeContainer
 } from '../components';
import {GroupType, UserType} from '../types';

 type Props = {
    group: GroupType | undefined,
    users: UserType[],
    currentUser: UserType | undefined,
    onJoinGroup: () => void,
    onLeaveGroup: () => void,
    error: string,
    loading: boolean
 };

export const GroupDashboardComponent = ({
    group,
    users,
    currentUser,
    ...other
}: Props) => {
    const isCurrentUserInGroup = users?.some((user) => user._id === currentUser?._id);

    return (
        <div className="group-dashboard-component">
            <h1 className="group-dashboard-component__title">Wellcome to <strong className="group-dashboard-component__title--color">
                {group?.name}
            </strong> Family!</h1>            
          <div>
                <GroupNavigationComponent name={group?.name}/> 
          </div>
          <Routes>
                <Route path="/edit" element={<EditGroupComponent/>}/>
                <Route path="/recepies" element={<RecepiesContainer author={currentUser}
                                                                isCurrentUserInGroup={isCurrentUserInGroup}
                                                                groupId={group?._id}/>}/>
                <Route path="/gallery" element={<GalleryContainer author={currentUser}
                                                                  isCurrentUserInGroup={isCurrentUserInGroup}
                                                                  groupId={group?._id}/>}/>
                <Route path="/tree" element={<FamilyTreeContainer isCurrentUserInGroup={isCurrentUserInGroup}
                                                                  groupId={group?._id}/>}/>
                <Route path="/" element={<GroupComponent {...other}
                                                          users={users}
                                                          currentUser={currentUser}
                                                          group={group}/>}/>
            </Routes>          
        </div>
    );
}