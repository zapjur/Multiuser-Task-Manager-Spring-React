import React from "react";
import SideBar from "./SideBar";
import './mainCalendarStyles.css';
import TestCalendar from './testCalendar';



const MainCalendar = () => {
    return (
        <div className="mainAppContainer">
            <div className="col-md-2">
                <div className="col-md-3">
                    <SideBar/>
                </div>
            </div>
            <div className="col-md-9">
                <TestCalendar/>
            </div>
        </div>

    );
}
export default MainCalendar;