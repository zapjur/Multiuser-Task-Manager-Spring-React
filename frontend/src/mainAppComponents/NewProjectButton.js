import * as React from "react";
import './mainAppStyles.css'

function NewProjectButton() {

    return (
        <div>
            <button className="newProjectButton">
                New Project <span className="newProjectPlusSign">+</span>
            </button>
        </div>
    );

}

export default NewProjectButton;