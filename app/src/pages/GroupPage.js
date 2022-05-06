import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { GroupContainer, EditGroupComponent } from '../components';

export const GroupPage = () => {  
    return (
        <div className="group-page">
            <h1>Wellcome to our Family!</h1>            
          <div>
              {/* <NavigationComponent isAuthorised={isAuthorised}
                                   onUserLogout={onUserLogout}/> */}
          </div>
          <Routes>
                <Route path="/edit" element={<EditGroupComponent/>}/>
                <Route exact path="/" element={<GroupContainer/>}/>
            </Routes>          
        </div>
    );
}