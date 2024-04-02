import React from "react";
import './Home.css';

/**
 * LandingPage component that serves as the entry point of the application.
 * Presents a welcoming message and introduces the user to MIDAS.
 * 
 * @returns {React.ReactElement} The LandingPage component.
 */
const HomePage = () => {
    return (
        <div className="home-page">
            <h1 className="title">MIDAS</h1>
            <p className="message">
                Welcome to MIDAS
            </p>
        </div>
    );
};

export default HomePage;
