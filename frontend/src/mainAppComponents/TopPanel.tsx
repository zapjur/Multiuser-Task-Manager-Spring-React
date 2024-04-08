import React, {useEffect, useState} from "react";
import './mainAppStyles.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import AddMemberButton from "../buttons/AddMemberButton";
import DeleteProjectButton from "../buttons/DeleteProjectButton";
import { useProjectContext } from "../context/ProjectContext";
import {useFormContext} from "../context/FormContext";
import MoreOptionsButton from "../buttons/MoreOptionsButton";

interface Project {
    id: number;
    title: string;
    description: string;
    users: string[];
}

function TopPanel() {

    const { toggleMemberFormVisibility } = useFormContext();
    const {
        selectedProjectId,
        projects,
        deleteProject,
        addFavoriteProject,
        removeFavoriteProject,
        favoriteProjects
    } = useProjectContext();

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isStarred, setIsStarred] = useState(false);

    useEffect(() => {
        const isFav = favoriteProjects.some(project => project.id === selectedProjectId);
        setIsStarred(isFav);
    }, [selectedProjectId, favoriteProjects]);

    useEffect(() => {
        const project = projects.find(p => p.id === selectedProjectId) || null;
        setSelectedProject(project);
    }, [selectedProjectId, projects]);

    const toggleStar = () => {
        setIsStarred(!isStarred);
    }

    const handleDelete = () => {
        if (selectedProjectId && window.confirm("Czy na pewno chcesz usunąć ten projekt?")) {
            deleteProject(selectedProjectId);
        }
    };

    const handleAddToFavClick = () => {
        if (selectedProject) {
            addFavoriteProject(selectedProject);
        }

    };

    const handleRemoveFromFavClick = () => {
        if (selectedProjectId) {
            removeFavoriteProject(selectedProjectId);
        }
    };


    return(
      <div className="topPanel">
          <div className="projectName col-md-6">
              <h2>{selectedProject ? selectedProject.title : "Wybierz projekt"}</h2>
              <p>{selectedProject ? selectedProject.description : "Opis projektu"}</p>
          </div>
          <div className="topPanelOptions col-md-6">
              <div onClick={toggleStar}>
                  {isStarred ? <StarIcon onClick={handleRemoveFromFavClick} fontSize="large"/> : <StarBorderIcon onClick={handleAddToFavClick} fontSize="large"/>}
              </div>
              <div onClick={handleDelete}>
                <DeleteProjectButton/>
              </div>
              <div className="verticalLine">
                  <MoreOptionsButton/>
              </div>
              <div>
                  {
                      selectedProject?.users
                          ? selectedProject.users.length === 1
                              ? '1 user'
                              : `${selectedProject.users.length} users`
                          : '0 users'
                  }
              </div>
              <div onClick={toggleMemberFormVisibility} className="addMemberButtonContainer">
                <AddMemberButton/>
              </div>
          </div>
      </div>
    );
}

export default TopPanel;