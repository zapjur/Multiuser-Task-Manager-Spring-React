import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

interface Props {
    toggle: () => void;
}

function CloseButton({toggle}: Props) {
    return (
        <Button
            sx={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                borderRadius: '50%',
                minWidth: '48px',
                width: '48px',
                height: '48px',
                backgroundColor: '#f94144',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: '#ef233c',
                },
            }}
            onClick={toggle}
        >
            <CloseIcon fontSize="medium"/>
        </Button>
    );
}

export default CloseButton;