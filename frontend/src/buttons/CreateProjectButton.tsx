import Button from '@mui/material/Button';
import { useFormContext } from '../context/FormContext';

function CreateProjectButton() {

    const { toggleFormVisibility } = useFormContext();

    return(
        <Button
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
            Create project
        </Button>
    );
}

export default CreateProjectButton;