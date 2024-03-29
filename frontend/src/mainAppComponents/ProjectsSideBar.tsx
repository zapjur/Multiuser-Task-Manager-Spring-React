import SearchBar from "./SearchBar";
import './mainAppStyles.css';
import NewProjectButton from "../buttons/NewProjectButton";
import axios from 'axios';
import {useState, useEffect} from "react";
import { getAuthToken } from '../axios_helper';
import ProjectList from "./ProjectList";

interface Project {
    id: number;
    name: string;
    description: string;
}

function ProjectsSideBar() {

    return (
        <div className="projectsPanel borderRightSide">
            <div className="containerSearchBar">
                <SearchBar/>
            </div>
            <div className="projectsSection">
                <div className="sectionFavorite">
                    <h6 className="sectionTitle">Favorites</h6>
                    <div className="horizontalLine"></div>
                </div>
                <div className="sectionAllProjects">
                    <h6 className="sectionTitle">All projects</h6>
                    <div className="horizontalLine"></div>
                    <ProjectList/>
                </div>

            </div>
            <div className="newProjectContainer">
                <NewProjectButton/>
            </div>
        </div>
    );

}

export default ProjectsSideBar;