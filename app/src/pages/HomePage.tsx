import React from 'react';
import Image from 'react-bootstrap/Image';
import FamilyImg from '../resources/family-image.jpg';

export const HomePage = () => {
    return (
        <div className="home-page">
            <h1 className="home-page__title">
                Wellcome to <strong className="home-page__title-color">Family Network</strong> !
            </h1>
            <p className="home-page__text">
                This network was designed specifically to give families 
                a common space to share news, photo reports, 
                family recipes and other important family things! 
                So create an account or login, create or join your own 
                family group and stay in touch with your loved ones!
            </p>
            <Image src={FamilyImg}
                   alt="home-page"
                   className="home-page__image"/>
        </div>
    );
}