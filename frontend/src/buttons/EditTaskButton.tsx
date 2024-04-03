import Button from '@mui/material/Button';

interface EditTaskButtonProps {
    type?: "button" | "submit" | "reset";
}

function EditTaskButton({type = 'button'} : EditTaskButtonProps) {

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
            Edit task
        </Button>
    );
}

export default EditTaskButton;