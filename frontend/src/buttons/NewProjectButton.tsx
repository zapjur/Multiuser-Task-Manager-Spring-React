import { useFormContext } from '../context/FormContext';
import Button from '@mui/material/Button';

function NewProjectButton() {

    const { toggleFormVisibility } = useFormContext();

    return (
        <Button
            sx={{
                backgroundColor: '#bde0fe',
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
            onClick={toggleFormVisibility}
        >
            New Project
        </Button>
    );

}

export default NewProjectButton;