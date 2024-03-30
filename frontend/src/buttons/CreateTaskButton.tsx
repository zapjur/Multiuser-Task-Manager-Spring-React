import Button from '@mui/material/Button';
import {useFormContext} from "../context/FormContext";

interface CreateTaskButtonProps {
    status: string;
}

function CreateTaskButton({status} : CreateTaskButtonProps) {

    const { toggleTaskFormVisibility } = useFormContext();

    const handleClick = () => toggleTaskFormVisibility(status);

    return (
        <Button
            sx={{
                backgroundColor: 'whitesmoke',
                color: '#0073e6',
                fontWeight: 'bold',
                borderRadius: '40px',
                border: 'none',
                width: '100%',
                height: '100%',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: '#cfe7fe',
                },
            }}
            onClick={handleClick}
        >
            +
        </Button>
    );
}

export default CreateTaskButton;