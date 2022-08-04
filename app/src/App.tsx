import React, {useState, lazy, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

 import {
   NavigationComponent, 
   WellcomeContainer,
   FooterComponent
} from './components';
import './App.scss';

const HomePage = lazy(() => import('./pages/HomePage'));
const CreateUserPage = lazy(() => import('./pages/CreateUserPage'));
const UsersListPage = lazy(() => import('./pages/UsersListPage'));
const EditUserPage = lazy(() => import('./pages/EditUserPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const CreateGroupPage = lazy(() => import('./pages/CreateGroupPage'));
const GroupPage = lazy(() => import('./pages/GroupPage'));

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
    <GoogleOAuthProvider clientId={CLIENT_ID || ''}>
    <div className="App">
        <Router>         
          <NavigationComponent isAuthorised={isAuthorised}
                                onUserLogout={onUserLogout}/>
          <div className="app-content">
              <Routes>
                  <Route path="/create" element={<CreateUserPage onUserLogin={onUserLogin}/>}/>                          
                  <Route path="/users" element={<UsersListPage/>}/>
                  <Route path="/account/info/edit" element={<EditUserPage/>}/>
                  <Route path="/account/info/create_group" element={<CreateGroupPage/>}/>
                  <Route path="/account/login" element={<LoginPage onUserLogin={onUserLogin}/>}/>
                  <Route path="/account/info" element={<AccountPage onUserLogout={onUserLogout}/>}/>
                  <Route path="/family/:name/*" element={<GroupPage/>}/>    
                  <Route path="/confirm/:confirmationCode" element={<WellcomeContainer/>} />                                   
                  <Route path="/" element={<HomePage/>}/>                   
              </Routes>
          </div>
          <FooterComponent/>         
      </Router>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
