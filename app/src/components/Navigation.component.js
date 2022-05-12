import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
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
                      eventKey="0">
              <Image src={`${process.env.REACT_APP_PUBLIC_URL}/images/logo.jpg`}
                        alt="logo"
                        className="navigation-component__image"/>
            </Nav.Link>
          </Nav.Item>      
          <Nav.Item className="navigation-component__item">
            <Nav.Link href="/"
                      eventKey="1"
                      className="navigation-component__link">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="navigation-component__item">
            <Nav.Link href="/users" 
                      eventKey="2"
                      className="navigation-component__link">
              Our members
            </Nav.Link>
          </Nav.Item >           
            {isLogedInUser ? (
              <>
                <Nav.Item className="navigation-component__item">
                  <Nav.Link href="/account/info"
                            eventKey="3"
                            className="navigation-component__link">
                    Account
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navigation-component__item">
                  <Button onClick={()=> setShow(true)}
                          variant="link"
                          className="navigation-component__link">
                    Logout
                  </Button>
                </Nav.Item>
              </>                
            ) : (
              <>
                <Nav.Item className="navigation-component__item">
                  <Nav.Link href="/account/login"
                            eventKey="4"
                            className="navigation-component__link">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navigation-component__item">
                  <Nav.Link href="/create" 
                            eventKey="5"
                            className="navigation-component__link">
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