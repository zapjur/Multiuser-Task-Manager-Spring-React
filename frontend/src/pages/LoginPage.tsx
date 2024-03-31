import axios from "axios";
import Logo from "../loginPageComponents/Logo";
import LoginForm from "../loginPageComponents/LoginForm";
import { request, setAuthToken } from "../axios_helper";
import '../loginPageComponents/loginPageStyles.css';
import { useNavigate } from "react-router-dom";
import React from "react";

function LoginPage() {
    const navigate = useNavigate();

    const onLogin = async (e: React.FormEvent, username: string, password: string) => {
        e.preventDefault();
        try {
            window.localStorage.removeItem("auth_token");
            const response = await request("post", "/login", { login: username, password: password });
            navigate("/app");
            setAuthToken(response.data.token);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    };

    const onRegister = async (e: React.FormEvent, firstName: string, lastName: string, username: string, password: string) => {
        e.preventDefault();
        try {
            window.localStorage.removeItem("auth_token");
            delete axios.defaults.headers.common['Authorization'];
            const response = await request("post", "/register", {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            });
            navigate("/app");
            setAuthToken(response.data.token);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    };

    return (
        <div className="containerFullScreen gradientBg">
            <div className="containerLoginForm container-md">
                <Logo />
                <LoginForm onLogin={onLogin} onRegister={onRegister} />
            </div>
        </div>
    );
}

export default LoginPage;
