import Button from '@mui/material/Button';

interface AddMemberButtonProps {
    type?: "button" | "submit" | "reset";
}

function JoinProjectButton({type = 'button' } : AddMemberButtonProps) {

    return (
        <Button
            type={type}
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
            Join project
        </Button>
    );
}

export default JoinProjectButton;