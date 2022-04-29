import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav'
import {useToken} from '../utils/useToken';

export const NavigationComponent = ({isAuthorised, onUserLogout}) => {
  const {token, removeToken} = useToken();
  const navigate = useNavigate();
  const isLogedInUser = isAuthorised || !!token;
  const [show, setShow] = useState(false);
  const [selectKey, setSelectKey] = useState('1');
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    removeToken();
    onUserLogout();
    handleClose();
    navigate('/account/login');
  };

  return (
    <div className="navigation-component">
      <Nav activeKey={selectKey} onSelect={(eventKey) => setSelectKey(eventKey)}>         
          <Nav.Item>
            <Nav.Link href="/"
                      eventKey="1">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/users" 
                      eventKey="2">
              List of users
            </Nav.Link>
          </Nav.Item>           
            {isLogedInUser ? (
              <>
                <Nav.Item>
                  <Nav.Link href="/account/info"
                            eventKey="3">
                    Account
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button onClick={()=> setShow(true)}
                          variant="link">
                    Logout
                  </Button>
                </Nav.Item>
              </>                
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/account/login"
                            eventKey="4">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/create" 
                            eventKey="5">
                    Register user
                  </Nav.Link>
                </Nav.Item>
            </>
            )}                    
      </Nav>
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