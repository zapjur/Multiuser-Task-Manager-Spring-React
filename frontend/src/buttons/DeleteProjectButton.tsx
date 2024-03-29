import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

function DeleteProjectButton() {

    return(
        <IconButton
            aria-label="delete"
            size="large"
            sx = {{
                color: 'black',
                '&:hover': {
                    backgroundColor: '#ef233c',
                },
            }}
        >
            <DeleteIcon fontSize="large"/>
        </IconButton>
    );
}

export default DeleteProjectButton;