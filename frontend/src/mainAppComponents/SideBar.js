import * as React from "react";
import './mainAppStyles.css';
import logo from '../graphics/logo.png';
import calendarIcon from '../graphics/calendar.png';
import logoutIcon from '../graphics/logout.png'
import mainpageIcon from '../graphics/mainpage.png'
import settingsIcon from '../graphics/settings.png'
import {useNavigate} from "react-router-dom";
import axios from "axios";

function SideBar() {

    const navigate = useNavigate();

    const logout = () => {
        navigate("/")
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];

    };

    return (
        <div className="borderRightSide containerSideBar">
            <div className="containerLogoBackground">
                <img src={logo} alt="Logo"/>
            </div>

            <div className="containerOptions">
                <div className="containerHoverBackground">
                    <img src={mainpageIcon} alt="Logout"/>
                </div>
                <div className="containerHoverBackground">
                    <img src={calendarIcon} alt="Calendar"/>
                </div>
                <div className="containerHoverBackground">
                    <img src={settingsIcon} alt="Calendar"/>
                </div>
                <div className="containerHoverBackground logoutButton">
                    <img src={logoutIcon} alt="Logout" onClick={logout}/>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
