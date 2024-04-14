import React, {useEffect, useState} from "react";
import './mainAppStyles.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import AddMemberButton from "../buttons/AddMemberButton";
import DeleteProjectButton from "../buttons/DeleteProjectButton";
import { useProjectContext } from "../context/ProjectContext";
import {useFormContext} from "../context/FormContext";
import MoreOptionsButton from "../buttons/MoreOptionsButton";
import {Box, Dialog, DialogTitle, List, ListItem, ListItemText, Typography} from "@mui/material";
import CloseButton from "../buttons/CloseButton";

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
    const [usersModalOpen, setUsersModalOpen] = useState(false);

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

    const handleUsersClick = () => {
        setUsersModalOpen(true);
    };

    const handleClose = () => {
        setUsersModalOpen(false);
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
              <div onClick={handleUsersClick}>
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
          <Dialog
              onClose={handleClose}
              open={usersModalOpen}
              PaperProps={{
                  style: {
                      width: '20vw',
                      maxWidth: '600px',
                      borderRadius: 8,
                      backgroundColor: '#f0f0f0',
                      boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
                  }
              }}
          >
              <DialogTitle>
                  <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingX={2}
                      paddingTop={2}
                  >
                      <Typography variant="h6" style={{ marginRight: 'auto' }}>Project Users</Typography>
                      <CloseButton toggle={handleClose} />
                  </Box>
              </DialogTitle>
              <List>
                  {selectedProject?.users.map((user, index) => (
                      <ListItem key={index}>
                          <ListItemText primary={user} />
                      </ListItem>
                  ))}
              </List>
          </Dialog>

      </div>
    );
}

export default TopPanel;