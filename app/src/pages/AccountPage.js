import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountPage = ({user}) => {
    // const navigate = useNavigate();
    // const {token} = useToken();

    // useEffect(() => {
    //     if(!!token) {
    //         navigate('/account');
    //     }
    //     console.log(token);
    // }, [token]);

    return (
        <div className="account-page">
            <h1>Wellcome {user?.name}</h1>
        </div>
    );
}