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
    onJoinGroup: () => void,
    onLeaveGroup: () => void,
    error: string,
    loading: boolean
 };

export const GroupDashboardComponent = ({
    group,
    users,
    ...other
}: Props) => {

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
                <Route path="/recepies" element={<RecepiesContainer/>}/>
                <Route path="/gallery" element={<GalleryContainer />}/>
                <Route path="/tree" element={<FamilyTreeContainer />}/>
                <Route path="/" element={<GroupComponent {...other}
                                                          users={users}
                                                          group={group}/>}/>
            </Routes>          
        </div>
    );
}