import React from "react";
import './welcomepage.css';
import  Navbar from './Navbar.js';
import Typical from 'react-typical';
// import {  Link } from "react-router-dom";

function Welcomepage() {
    
    return (
    
    <div className="app">
            <Navbar />
            <header className="app-header">
            <h1>
                <Typical
                loop={Infinity}
                wrapper="b"
                steps={[
                    'Welcome to the Fitness Tracker...',
                    1000
                ]}
                />
                </h1>
            <p>Now you can keep track of your daily activities like{' '}
                <Typical 
                    loop={Infinity}
                    wrapper="b"
                    steps={[
                        'Walking🚶‍♂️🚶‍♂️',
                        1000,
                        'Sleeping🛌🛌',
                        1000,
                        'Working out💪💪',
                        1000,
                        'Drinking water🚰🚰',
                    ]}
                />
            </p>
            </header>
        </div> 
    
    );
  }
  export default Welcomepage;
