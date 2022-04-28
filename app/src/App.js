import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { 
  CreateUserPage, 
  UsersListPage,
  HomePage, 
  EditUserPage,
  LoginPage,
  AccountPage
 } from './pages';
 import {NavigationComponent, AccountSwitchComponent} from './components';
 import {useToken} from './utils/useToken';
import './App.scss';

function App() {
  const [isAuthorised, setIsAuthorised] = useState(false);

  const onUserLogin = () => {
    setIsAuthorised(true)
  };

  const onUserLogout = () => {
    setIsAuthorised(false);
  }

  return (
    <div className="App">
        <Router>
          <div>
              <NavigationComponent isAuthorised={isAuthorised}
                                   onUserLogout={onUserLogout}/>
              <div className="app-content">
                  <Routes>
                      <Route path="/create" element={<CreateUserPage/>}/>                          
                      <Route path="/users" element={<UsersListPage/>}/>
                      <Route path="/account/info/edit" element={<EditUserPage/>}/>
                      <Route path="/account/login" element={<LoginPage onUserLogin={onUserLogin}/>}/>
                      <Route path="/account/info" element={<AccountPage isAuthorised={isAuthorised}/>}/>
                      <Route path="/" element={<HomePage/>}/>                   
                  </Routes>
              </div>
          </div>
      </Router>
    </div>
  );
}

export default App;
