import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { 
  CreateUserPage, 
  UsersListPage,
  HomePage, 
  EditUserPage,
  LoginPage,
  AccountPage,
  CreateGroupPage,
  GroupPage
 } from './pages';
 import {
   NavigationComponent, 
   GroupFormContainer, 
   WellcomeContainer
} from './components';
 import {useToken} from './utils/useToken';
import './App.scss';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [isAuthorised, setIsAuthorised] = useState(false);

  const onUserLogin = () => {
    setIsAuthorised(true)
  };

  const onUserLogout = () => {
    setIsAuthorised(false);
  }

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <div className="App">
        <Router>
          <div>
              <NavigationComponent isAuthorised={isAuthorised}
                                   onUserLogout={onUserLogout}/>
              <div className="app-content">
                  <Routes>
                      <Route path="/create" element={<CreateUserPage onUserLogin={onUserLogin}/>}/>                          
                      <Route path="/users" element={<UsersListPage/>}/>
                      <Route path="/account/info/edit" element={<EditUserPage/>}/>
                      <Route path="/account/info/create_group" element={<CreateGroupPage/>}/>
                      <Route path="/account/login" element={<LoginPage onUserLogin={onUserLogin}/>}/>
                      <Route path="/account/info" element={<AccountPage isAuthorised={isAuthorised}
                                                                        onUserLogout={onUserLogout}/>}/>
                      <Route exac path="/family/:name/*" element={<GroupPage/>}/>    
                      <Route path="/confirm/:confirmationCode" element={<WellcomeContainer/>} />                                   
                      <Route path="/" element={<HomePage/>}/>                   
                  </Routes>
              </div>
          </div>
      </Router>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
