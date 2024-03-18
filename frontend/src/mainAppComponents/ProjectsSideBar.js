import * as React from "react";
import SearchBar from "./SearchBar.js";
import './mainAppStyles.css';
import NewProjectButton from "./NewProjectButton.js";

function ProjectsSideBar() {

    return (
        <div className="projectsPanel borderRightSide">
            <div className="containerSearchBar">
                <SearchBar/>
            </div>
            <div className="projectsSection">
                <h6 className="sectionTitle">Favorites</h6>
                <div className="horizontalLine"></div>
                <h6 className="sectionTitle">All projects</h6>
                <div className="horizontalLine"></div>

            </div>
            <div className="newProjectContainer">
                <NewProjectButton/>
            </div>
        </div>
    );

}

export default ProjectsSideBar;