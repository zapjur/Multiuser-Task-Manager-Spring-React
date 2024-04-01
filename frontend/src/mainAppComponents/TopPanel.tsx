import React from "react";
import './mainAppStyles.css'
import starEmptyIcon from '../graphics/starEmpty.png'
import starFullIcon from'../graphics/starFull.png'
import AddMemberButton from "../buttons/AddMemberButton";
import DeleteProjectButton from "../buttons/DeleteProjectButton";
import { useProjectContext } from "../context/ProjectContext";

function TopPanel() {

    const { selectedProjectId, projects, deleteProject} = useProjectContext();
    const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

    const [isStarFull, setIsStarFull] = React.useState(false);

    const toggleStar = () => {
        setIsStarFull(!isStarFull);
    }

    const handleDelete = () => {
        if (selectedProjectId && window.confirm("Czy na pewno chcesz usunąć ten projekt?")) {
            deleteProject(selectedProjectId);
        }
    };


    return(
      <div className="topPanel">
          <div className="projectName col-md-6">
              <h2>{selectedProject ? selectedProject.title : "Wybierz projekt"}</h2>
              <p>{selectedProject ? selectedProject.description : "Opis projektu"}</p>
          </div>
          <div className="topPanelOptions col-md-6">
              <img
                  src={isStarFull ? starFullIcon : starEmptyIcon}
                  alt="StarIcon"
                  width={40}
                  height={40}
                  onClick={toggleStar}
              />
              <div onClick={handleDelete}>
                <DeleteProjectButton/>
              </div>
              <div className="addMemberButtonContainer">
                <AddMemberButton/>
              </div>
          </div>
      </div>
    );
}

export default TopPanel;