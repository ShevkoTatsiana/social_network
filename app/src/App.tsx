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
import { ServiceWorkerUpdateListener } from './serviceWorkerUpdateListener';
import {useIsOffline} from './utils/useIsOfflineHook';
//import {initializeFirebase} from './push-notification';
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
  const [updateWaiting, setUpdateWaiting] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  //@ts-ignore
  const [swListener, setSwListener] = useState<ServiceWorkerUpdateListener>({});
  const isOffline = useIsOffline();
  //initializeFirebase();

  const onUserLogin = () => {
    setIsAuthorised(true)
  };

  const onUserLogout = () => {
    setIsAuthorised(false);
  };

  const handleUpdate = () => {   
    //@ts-ignore
    swListener.skipWaiting(registration?.waiting);
  };

  const handleUpdateWating = (waitingEvent: Event) => {
    console.log("new update waiting", waitingEvent);
    setUpdateWaiting(true);
  };
  const handleUpdateReady = (event: Event) => {
    console.log("updateready event");
    window.location.reload();
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      let listener = new ServiceWorkerUpdateListener();
      setSwListener(listener);

      listener.addEventListener("updatewaiting", handleUpdateWating);

      listener.addEventListener("updateready", handleUpdateReady);

      navigator.serviceWorker.getRegistration().then((reg) => {
        listener.addRegistration(reg);
        setRegistration(reg);
      });

      return () => {
        listener.removeEventListener("updatewaiting", handleUpdateWating);
        listener.removeEventListener("updateready", handleUpdateReady);
      }
    } else {
      //do nothing because no sw in development
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID || ''}>
        <div className="App">
          <RefreshComponent updateWaiting={updateWaiting}
                            handleUpdate={handleUpdate}/>
          <Alert show={isOffline}
                variant="danger">   
            No internet connection
          </Alert>                
            <Router>         
              <NavigationComponent isAuthorised={isAuthorised}
                                    onUserLogout={onUserLogout}/>
              <div className="app-content">
                <Suspense fallback={<div>Loading...</div>}>
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
                  </Suspense>
              </div>
              <FooterComponent/>         
          </Router>
        </div>
    </GoogleOAuthProvider>
  );
}

export default App;
