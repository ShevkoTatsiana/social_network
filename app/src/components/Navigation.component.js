import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useToken} from '../utils/useToken';

export const NavigationComponent = ({isAuthorised, onUserLogout}) => {
  const {token, removeToken} = useToken();
  const navigate = useNavigate();
  const isLogedInUser = isAuthorised || !!token;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    removeToken();
    onUserLogout();
    handleClose();
    navigate('/account/login');
  };

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
              <Link to="/create">Register user</Link>
            </li>
              {isLogedInUser ? (
                <>
                  <li>
                    <Link to="/account/info">Account</Link>
                  </li>
                  <li>
                  <Button onClick={()=> setShow(true)}
                          variant="link">Logout</Button>
                  </li>
                </>                
              ) : (
                <li>
                  <Link to="/account/login">Login</Link>
                </li>
              )}           
          </ul>
        </nav>
        <Modal show={show} onHide={handleClose}>    
          <Modal.Body>Are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </Modal.Footer>
      </Modal>
      </div>
    );
}