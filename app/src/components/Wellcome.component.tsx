import React from 'react';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import {ValidationError} from '../types';

type Props = {
  error: ValidationError | undefined
};

export const WellcomeComponent = ({error}: Props) => {
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
      <Link to={"/account/login"}>
        Please Login
      </Link>
    </div>
  );
}

