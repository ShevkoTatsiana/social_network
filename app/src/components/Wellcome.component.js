import React from 'react';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

export const WellcomeComponent = ({data, error}) => {
  console.log(data);

  return (
    <div className="wellcome-component">
      {!!error && (
        <Alert show={!!error?.message}
             variant="danger">   
        {error.message}
      </Alert> 
      )}       
      <h3>
        <strong>Account confirmed!</strong>
      </h3>
      <Link to={"/login"}>
        Please Login
      </Link>
      
      
     
     
    </div>
  );
}

