import Button from '@mui/material/Button';

interface AddMemberButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

function AddMemberButton({ onClick, type = 'button' } : AddMemberButtonProps) {
    return (
        <Button
            type={type}
            onClick={onClick}
            sx={{
                backgroundColor: '#0073e6',
                color: 'whitesmoke',
                fontWeight: 'bold',
                borderRadius: '40px',
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
            Add member
        </Button>
    );
}

export default AddMemberButton;