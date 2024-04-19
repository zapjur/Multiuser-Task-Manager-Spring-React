import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useFormContext} from "../context/FormContext";
import {useState} from "react";
import {useProjectContext} from "../context/ProjectContext";
import {request} from "../axios_helper";

function MoreOptionsButton() {

    const { toggleEditProjectFormVisibility, toggleDeleteMemberFormVisibility } = useFormContext();
    const { projects, selectedProjectId } = useProjectContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [onlyMemberDialogOpen, setOnlyMemberDialogOpen] = useState(false);
    const [projectCode, setProjectCode] = useState<string | null>(null);
    const [projectCodeDialogOpen, setProjectCodeDialogOpen] = useState(false);


    const project = projects.find(p => p.id === selectedProjectId) || null;

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setAnchorEl(null);
        toggleEditProjectFormVisibility();
    }

    const handleDeleteMemberClick = () => {
        setAnchorEl(null);
        toggleDeleteMemberFormVisibility();
    }

    const handleLeaveProjectClick = () => {
        setAnchorEl(null);

        if(project && project?.users.length > 1) {
            setDialogOpen(true);
        }
        else {
            setOnlyMemberDialogOpen(true);
        }

    }

    const handleOnlymemberDialogClose = () => {
        setOnlyMemberDialogOpen(false);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleConfirmLeave = () => {
        setDialogOpen(false);
        leaveProject();
    };

    const leaveProject = async () => {
        try {
            const response = await request('delete', `/projects/leave/${selectedProjectId}`);

            if (response.status !== 200) {
                throw new Error('Problem with leaving project');
            }

            window.location.reload();

        } catch (error) {
            console.error('Failed to leave project', error);
        }
    }

    const handleProjectCodeClick = async () => {
        setAnchorEl(null);
        try {
            const response = await request('get', `/projects/invitationCode/${selectedProjectId}`);
            if (response.status === 200) {
                setProjectCode(response.data);
                setProjectCodeDialogOpen(true);
            } else {
                console.error('Failed to fetch project code');
            }
        } catch (error) {
            console.error('Error fetching project code: ', error);
        }
    };

    const handleProjectCodeDialogClose = () => {
        setProjectCodeDialogOpen(false);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    minWidth: 0,
                    padding: '6px',
                    color: 'black',
                }}
            >
                <MoreHorizIcon fontSize="large"/>
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleEditClick}>
                    <EditIcon/>
                    <Box ml={1}>
                        Edit project
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleProjectCodeClick}>
                    <VpnKeyRoundedIcon/>
                    <Box ml={1}>
                        Project code
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleDeleteMemberClick}>
                    <DeleteIcon/>
                    <Box ml={1}>
                        Delete member
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleLeaveProjectClick}>
                    <ExitToAppIcon/>
                    <Box ml={1}>
                        Leave project
                    </Box>
                </MenuItem>
            </Menu>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Leave Project"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to leave this project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLeave}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={onlyMemberDialogOpen}
                onClose={handleOnlymemberDialogClose}
                aria-labelledby="only-member-dialog-title"
            >
                <DialogTitle id="only-member-dialog-title">{"Cannot Leave Project"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are the only member of this project. You cannot leave the project, you must delete it instead.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnlymemberDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={projectCodeDialogOpen}
                onClose={handleProjectCodeDialogClose}
                aria-labelledby="project-code-dialog-title"
            >
                <DialogTitle id="project-code-dialog-title">{"Project Code"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {projectCode}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleProjectCodeDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MoreOptionsButton;