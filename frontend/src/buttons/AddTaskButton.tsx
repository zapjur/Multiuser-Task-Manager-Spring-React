import Button from '@mui/material/Button';

interface AddTaskButtonProps {
    type?: "button" | "submit" | "reset";
}

function AddTaskButton({type = 'button'} : AddTaskButtonProps) {

    return(
        <Button
            type={type}
            sx={{
                backgroundColor: '#0073e6',
                color: 'whitesmoke',
                fontWeight: 'bold',
                borderRadius: '56px',
                border: 'none',
                width: '100%',
                height: '100%',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: '#3385ff',
                },
            }}
        >
            Add task
        </Button>
    );
}

export default AddTaskButton;