import React, { useState } from 'react';
import classNames from 'classnames';
import './loginPageStyles.css';

interface LoginFormState {
    active: string;
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    welcomeText: string;
}

interface LoginFormProps {
    onLogin: (e: React.FormEvent<HTMLFormElement>, login: string, password: string) => void;
    onRegister: (e: React.FormEvent<HTMLFormElement>, firstName: string, lastName: string, login: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
    const [formState, setFormState] = useState<LoginFormState>({
        active: "login",
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        welcomeText: "Welcome Back",
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin(e, formState.login, formState.password);
    };

    const onSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onRegister(
            e,
            formState.firstName,
            formState.lastName,
            formState.login,
            formState.password
        );
    };

    return (
        <div className="containerColumn">
            <div className="containerWelcome">
                <h1>{formState.welcomeText}</h1>
                <p>Please enter your details</p>
            </div>
            <div className="col-md-6">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={classNames("nav-link", { active: formState.active === "login", inactive: formState.active !== "login" })}
                            id="tab-login"
                            onClick={() => setFormState(prevState => ({ ...prevState, active: "login", welcomeText: "Welcome Back" }))}
                        >
                            Sign in
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={classNames("nav-link", { active: formState.active === "register", inactive: formState.active !== "register" })}
                            id="tab-register"
                            onClick={() => setFormState(prevState => ({ ...prevState, active: "register", welcomeText: "Welcome" }))}
                        >
                            Sign up
                        </button>
                    </li>
                </ul>
            </div>
            <div className="col-md-6">
                <div className="tab-content">
                    <div className={classNames("tab-pane", "fade", formState.active === "login" ? "show active" : "")} id="pills-login">
                        <form onSubmit={onSubmitLogin}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="loginName">Username</label>
                                <input type="login" id="loginName" name="login" className="form-control" onChange={onChangeHandler}/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="loginPassword">Password</label>
                                <input type="password" id="loginPassword" name="password" className="form-control" onChange={onChangeHandler}/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Continue</button>
                        </form>
                    </div>
                    <div className={classNames("tab-pane", "fade", formState.active === "register" ? "show active" : "")} id="pills-register">
                        <form onSubmit={onSubmitRegister}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="firstName">First name</label>
                                <input type="text" id="firstName" name="firstName" className="form-control" onChange={onChangeHandler}/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="lastName">Last name</label>
                                <input type="text" id="lastName" name="lastName" className="form-control" onChange={onChangeHandler}/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="login">Username</label>
                                <input type="text" id="login" name="login" className="form-control" onChange={onChangeHandler}/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerPassword">Password</label>
                                <input type="password" id="registerPassword" name="password" className="form-control" onChange={onChangeHandler}/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-3 w-100">Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
