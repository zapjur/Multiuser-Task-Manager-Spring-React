import * as React from "react";

import { request } from '../axios_helper.js';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SideBar from "../mainAppComponents/SideBar.js";

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
        <SideBar/>
    );
}

export default MainAppPage;