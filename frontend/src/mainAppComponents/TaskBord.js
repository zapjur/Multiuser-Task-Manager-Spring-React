import * as React from "react";
import './mainAppStyles.css'
import TaskPanel from "./TaskPanel.js";

function TaskBord() {

    const statuses = ["To Do", "Doing", "In Review", "Done"];

    return (
      <div className="taskSectionContainer">
          <div className="taskBoardContainer">
              {statuses.map(status => (
                  <TaskPanel status={status}/>
              ))}
          </div>
      </div>
    );
}

export default TaskBord;