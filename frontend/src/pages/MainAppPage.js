import * as React from "react";

import { request } from '../axios_helper.js';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SideBar from "../mainAppComponents/SideBar.js";
import ProjectsSideBar from "../mainAppComponents/ProjectsSideBar.js";
import TopPanel from "../mainAppComponents/TopPanel.js";
import TaskBord from "../mainAppComponents/TaskBord.js";

function MainAppPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [newProcjetWindow, setNewProjectWindow] = useState(false);

    useEffect(() => {
        request("GET", "/messages", {})
            .then((response) => {
                setData(response.data);
            });
    }, []);

    return (
        <div className="mainAppContainer">
            <div className="col-md-2 sidePanel">
                <div className="col-md-3">
                    <SideBar/>
                </div>
                <div className="col-md-9">
                    <ProjectsSideBar/>
                </div>
            </div>
            <div className="col-md-10 mainPanel">
                <TopPanel/>
                <TaskBord/>
            </div>
        </div>
    );
}

export default MainAppPage;