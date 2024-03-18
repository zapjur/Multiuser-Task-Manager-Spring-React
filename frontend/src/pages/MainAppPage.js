import * as React from "react";

import { request } from '../axios_helper.js';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SideBar from "../mainAppComponents/SideBar.js";
import ProjectsSideBar from "../mainAppComponents/ProjectsSideBar.js";

function MainAppPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        request("GET", "/messages", {})
            .then((response) => {
                setData(response.data);
            });
    }, []);

    return (
        <div className="col-md-3 sidePanel">
            <div className="col-md-2">
                <SideBar/>
            </div>
            <div className="col-md-6">
                <ProjectsSideBar/>
            </div>
        </div>
    );
}

export default MainAppPage;