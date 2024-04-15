import './mainAppStyles.css';
import logo from '../graphics/logo.png';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import logoutIcon from '../graphics/logout.png'
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";

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
                <IconButton
                    size="large"
                    sx = {{
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#0073e6',
                        },
                    }}
                >
                    <WindowOutlinedIcon
                        fontSize="large"
                        sx = {{
                            color: '#343a40',
                        }}
                    />
                </IconButton>
                <IconButton
                    size="large"
                    sx = {{
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#0073e6',
                        },
                    }}
                >
                    <CalendarTodayRoundedIcon
                        fontSize="large"
                        sx = {{
                            color: '#343a40',
                        }}
                    />
                </IconButton>
                <IconButton
                    size="large"
                    sx = {{
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#0073e6',
                        },
                    }}
                >
                    <SettingsOutlinedIcon
                        fontSize="large"
                        sx = {{
                            color: '#343a40',
                        }}
                    />
                </IconButton>
                <IconButton
                    size="large"
                    sx = {{
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#0073e6',
                        },
                    }}
                >
                    <AddCircleOutlineRoundedIcon
                        fontSize="large"
                        sx = {{
                            color: '#343a40',
                        }}
                    />
                </IconButton>
                <div className="containerHoverBackground logoutButton">
                    <img src={logoutIcon} alt="Logout" onClick={logout}/>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
