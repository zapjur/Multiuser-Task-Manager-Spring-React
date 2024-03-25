import { request } from '../axios_helper';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SideBar from "../mainAppComponents/SideBar";
import ProjectsSideBar from "../mainAppComponents/ProjectsSideBar";
import TopPanel from "../mainAppComponents/TopPanel";
import TaskBord from "../mainAppComponents/TaskBord";

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