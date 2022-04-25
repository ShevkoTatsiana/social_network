import React from 'react';
import { Link } from 'react-router-dom';
import {useToken} from '../utils/useToken';

export const NavigationComponent = () => {
  const {token} = useToken();
  console.log(token);
    return (
        <div className="navigation-component">
            <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">List of users</Link>
            </li>
            <li>
              <Link to="/create">Create user</Link>
            </li>
            <li>
              {!!token ? (
                <Link to="/account/info">Account</Link>
              ) : (
                <Link to="/account/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
        </div>
    );
}