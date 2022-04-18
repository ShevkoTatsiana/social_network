import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { 
  CreateUserPage, 
  UsersListPage,
  HomePage, 
  EditUserPage
 } from './pages';
 import {NavigationComponent} from './components';
import './App.css';

function App() {
  
  return (
    <div className="App">
        <Router>
          <div>
              <NavigationComponent/>
              <div className="app-content">
                  <Routes>
                      <Route path="/create" element={<CreateUserPage/>}/>
                          
                      <Route path="/users" element={<UsersListPage/>}/>

                      <Route path="/edit" element={<EditUserPage/>}/>
                      
                      <Route path="/" element={<HomePage/>}/>
                    
                  </Routes>
              </div>
          </div>
      </Router>
    </div>
  );
}

export default App;
