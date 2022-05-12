import React, {useState} from 'react';
import {
    Routes, 
    Route
} from 'react-router-dom';
import { 
    GroupComponent, 
    EditGroupComponent,
    GroupNavigationComponent,
    RecepiesContainer,
    GalleryContainer
 } from '../components';

export const GroupDashboardComponent = ({
    group,
    ...other
}) => {

    const isCurrentUserInGroup = other?.users?.some((user) => user._id === other?.currentUser._id);

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
                <Route exact path="/recepies" element={<RecepiesContainer author={other.currentUser}
                                                                isCurrentUserInGroup={isCurrentUserInGroup}
                                                                groupId={group?._id}/>}/>
                <Route exact path="/gallery" element={<GalleryContainer author={other.currentUser}
                                                                isCurrentUserInGroup={isCurrentUserInGroup}
                                                                groupId={group?._id}/>}/>
                <Route exact path="/tree" element={<div>tree</div>}/>
                <Route exact path="/" element={<GroupComponent {...other}
                                                                group={group}/>}/>
            </Routes>          
        </div>
    );
}