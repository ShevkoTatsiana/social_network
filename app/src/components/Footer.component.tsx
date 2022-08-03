import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {useAddToHomescreenPrompt} from '../utils/useAddToHomescreenPrompt';

export const FooterComponent = () => {
    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const [isVisible, setVisibleState] = useState(false);

    useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );
  
  return (
    <div className="footer-component">          
      <div className="footer-component__text">
        We’re always better together
      </div>    
      {isVisible && (
      <Button variant="outline-secondary" 
              onClick={promptToInstall}            
              className="footer-component__button">
            Add to home screen
      </Button> 
      )}
    </div>
  );
}