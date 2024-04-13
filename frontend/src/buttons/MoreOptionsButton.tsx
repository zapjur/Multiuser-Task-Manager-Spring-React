import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Box} from "@mui/material";
import {useFormContext} from "../context/FormContext";

function MoreOptionsButton() {

    const { toggleEditProjectFormVisibility, toggleDeleteMemberFormVisibility } = useFormContext();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
                <MenuItem onClick={handleDeleteMemberClick}>
                    <DeleteIcon/>
                    <Box ml={1}>
                        Delete member
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ExitToAppIcon/>
                    <Box ml={1}>
                        Leave project
                    </Box>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default MoreOptionsButton;