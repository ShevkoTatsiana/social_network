import React, {useState, useEffect, lazy, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Alert from 'react-bootstrap/Alert';

 import {
   NavigationComponent, 
   WellcomeContainer,
   FooterComponent,
   RefreshComponent
} from './components';
import {useIsOffline} from './utils/useIsOfflineHook';
import {initializeFirebase} from './push-notification';
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
  const [updateWaiting, setUpdateWaiting] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const isOffline = useIsOffline();
  initializeFirebase();

  const handleUpdateWating = (event: CustomEvent) => {
    console.log("new update waiting");
    setUpdateWaiting(true);
    setRegistration(event.detail);
  };

  const handleSuccessUpdate = (event: Event) => {
    console.log('Page has been saved for offline use')
  };

  const updateServiceWorker = () => {
    const registrationWaiting = registration?.waiting;
    if (registrationWaiting) {
       registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
       registrationWaiting.addEventListener('statechange', e => {
         const target = e.target as ServiceWorker;
        if (target?.state === 'activated') {
            window.location.reload();
        }
       });
    }
  };

  useEffect(() => {
    document.addEventListener('updateContentReady',((e: CustomEvent)=> handleUpdateWating(e))as EventListener);
    document.addEventListener('updateContentSuccess', handleSuccessUpdate);

    return () => {
      document.addEventListener('updateContentReady', ((e: CustomEvent)=> handleUpdateWating(e))as EventListener);
      document.addEventListener('updateContentSuccess', handleSuccessUpdate);
    }
  })

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID || ''}>
        <div className="App">
          <RefreshComponent updateWaiting={updateWaiting}
                            handleUpdate={updateServiceWorker}/>
          <Alert show={isOffline}
                variant="danger">   
            No internet connection
          </Alert>                
            <Router>         
              <NavigationComponent />
              <div className="app-content">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                      <Route path="/create" element={<CreateUserPage/>}/>                          
                      <Route path="/users" element={<UsersListPage/>}/>
                      <Route path="/account/info/edit" element={<EditUserPage/>}/>
                      <Route path="/account/info/create_group" element={<CreateGroupPage/>}/>
                      <Route path="/account/login" element={<LoginPage/>}/>
                      <Route path="/account/info" element={<AccountPage/>}/>
                      <Route path="/family/:name/*" element={<GroupPage/>}/>    
                      <Route path="/confirm/:confirmationCode" element={<WellcomeContainer/>} />                                   
                      <Route path="/" element={<HomePage/>}/>                   
                  </Routes>
                  </Suspense>
              </div>
              <FooterComponent/>         
          </Router>
        </div>
    </GoogleOAuthProvider>
  );
}

export default App;
