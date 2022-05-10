import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav'

export const GroupNavigationComponent = ({name}) => {
  const [selectKey, setSelectKey] = useState('1');

  const rootPath = `/family/${name}`;

  return (
    <div className="navigation-component">
      <Nav activeKey={selectKey} onSelect={(eventKey) => setSelectKey(eventKey)}>         
          <Nav.Item>
            <Nav.Link href={rootPath}
                      eventKey="1">
              Family Info
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`${rootPath}/recepies`} 
                      eventKey="2">
              Mom's Recipies
            </Nav.Link>
          </Nav.Item>                      
          <Nav.Item>
            <Nav.Link href={`${rootPath}/gallery`}
                      eventKey="3">
              Photo Gallery
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`${rootPath}/tree`}
                      eventKey="4">
              Family Tree
            </Nav.Link>
          </Nav.Item>                     
      </Nav>
    </div>
  );
}