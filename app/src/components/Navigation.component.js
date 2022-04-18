import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationComponent = () => {

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
          </ul>
        </nav>
        </div>
    );
}