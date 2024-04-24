import './mainAppStyles.css';
import logo from '../graphics/logo.png';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import {useFormContext} from "../context/FormContext";

function SideBar() {

    const navigate = useNavigate();

    const { toggleJoinProjectFormVisibility } = useFormContext();

    const logout = () => {
        navigate("/")
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];

    };
    const goToApp = () => {
        navigate("/app")
    }
    const goToCalendar = () => {
        navigate("/calendar")
    }

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
                    onClick={goToApp}
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
                    onClick={goToCalendar}
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
                    onClick={toggleJoinProjectFormVisibility}
                >
                    <AddCircleOutlineRoundedIcon
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
                <div className="logoutButton">
                    <IconButton
                        size="large"
                        sx = {{
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#0073e6',
                            },
                        }}
                        onClick={logout}
                    >
                        <LogoutOutlinedIcon
                            fontSize="large"
                            sx = {{
                                color: '#343a40',
                            }}
                        />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
