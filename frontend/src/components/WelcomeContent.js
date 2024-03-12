import * as React from "react";
import logo from '../graphics/logo.png';
import './styles.css';

export default class WelcomeContent extends React.Component{
    render() {
        return(
                <div className="containerColumn">
                    <div className="logoContainer">
                        <img src={logo} alt="Logo" width={100} height={100}/>
                        <p className="display-4">Multiuser Task Manager</p>
                    </div>
                    <div className="containerLoginForm">
                        <h1>Welcome Back</h1>
                        <p>Please enter your details</p>
                    </div>
                </div>
        );
    };
}