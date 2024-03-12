import * as React from "react";
import axios from "axios";
import WelcomeContent from "./WelcomeContent.js";
import AuthContent from "./AuthContent.js";
import LoginForm from "./LoginForm.js";
import {request, setAuthToken} from "../axios_helper.js";
import './styles.css';
export default class AppContent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "login"
        };
    };

    login = () => {
        this.setState({componentToShow: "login"});
    };

    logout = () => {
        this.setState({componentToShow: "welcome"});
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];

    };

    onLogin = (e, username, password) => {
        e.preventDefault();
        request("POST",
            "/login",
            {login: username, password: password}
            ).then((response) => {
                this.setState({componentToShow: "messages"})
                setAuthToken(response.data.token);
        }).catch((error) => {
            this.setState({componentToShow: "welcome"})
        });
    };

    onRegister = (e, firstName, lastName, username, password) => {
        e.preventDefault();
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];
        request("POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            }
        ).then((response) => {
            this.setState({componentToShow: "messages"})
            setAuthToken(response.data.token);
        }).catch((error) => {
            this.setState({componentToShow: "welcome"})
        });
    };

    render() {
        return(
            <div className="container">
                <div className="halfWidthContainer">

                    <WelcomeContent/>
                    {this.state.componentToShow === "messages" && <AuthContent/>}
                    <LoginForm onLogin={this.onLogin} onRegister={this.onRegister}/>


                </div>
                <div className="halfWidthContainer bg-danger-subtle">
                </div>
            </div>
        );
    };
}