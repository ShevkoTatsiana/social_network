import React, {useEffect} from 'react';
import { 
    useNavigate, 
    useLocation,
    Routes,
    Route,
    Router,
    Navigate 
 } from 'react-router-dom';
 import { LoginPage, AccountPage } from '../pages';
import {useToken} from '../utils/useToken';

export const AccountSwitchComponent = () => {
    const navigate = useNavigate();
    const {state: user} = useLocation();
    const {token} = useToken();
    console.log(user);

    // useEffect(() => {
    //     if(!token) {
    //         navigate('/login');
    //     }
    //     console.log(token);
    // }, [])

    return (
        <div className="account-switch">
           {!token ? <Navigate to="/account/login" /> : <Navigate to={{pathname: "/account/info", state:{user}}} />}
        </div>
    );
}