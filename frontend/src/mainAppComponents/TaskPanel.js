import * as React from "react";
import './mainAppStyles.css'

function TaskPanel({status}) {

    return (
        <div className="taskPanel">
            <h5>{status}</h5>
        </div>
    );
}

export default TaskPanel;