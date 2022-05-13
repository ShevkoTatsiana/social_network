import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export const GroupNavigationComponent = ({name}) => {
  const {pathname} = useLocation();
  const rootPath = `/family/${name}`;
  const recepiesPath = `${rootPath}/recepies`;
  const galleryPath = `${rootPath}/gallery`;
  const treePath = `${rootPath}/tree`;

  return (
    <div className="navigation-component">
      <Nav activeKey={pathname}>         
          <Nav.Item>
            <Nav.Link href={rootPath}
                      eventKey="1"
                      className={rootPath === pathname ? 'link--active':'link'}>
              Family Info
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={recepiesPath} 
                      eventKey="2"
                      className={recepiesPath === pathname ? 'link--active':'link'}>
              Mom's Recipies
            </Nav.Link>
          </Nav.Item>                      
          <Nav.Item>
            <Nav.Link href={galleryPath}
                      eventKey="3"
                      className={galleryPath === pathname ? 'link--active':'link'}>
              Photo Gallery
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={treePath}
                      eventKey="4"
                      className={treePath === pathname ? 'link--active':'link'}>
              Family Tree
            </Nav.Link>
          </Nav.Item>                     
      </Nav>
    </div>
  );
}