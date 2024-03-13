import * as React from "react";

import { request } from '../axios_helper.js';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function MainAppPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const logout = () => {
        navigate("/")
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];

    };

    useEffect(() => {
        request("GET", "/messages", {})
            .then((response) => {
                setData(response.data);
            });
    }, []);

    return (
        <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Backend response</h5>
                        <p className="card-text">Content:</p>
                        <ul>
                            {data.map((line) => <li key={line}>{line}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default MainAppPage;