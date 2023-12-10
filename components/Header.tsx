import { Box } from "@mui/material";



const Header = () => {
    return (
    <Box
        component="nav"
        sx={{
            position: 'fixed',
            top: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 64,
            width: '100vw',
            fontSize: '2rem',
            padding: '0 24px',
            color: "black",
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
        }}
    >
        酒癖診断🍻
    </Box>
    )
    }

    export default Header;