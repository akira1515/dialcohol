import { Box } from "@mui/material";

type Props = {
    onClick?: ()=>void,
    selected: boolean,
    text: string,
}

const CircleBox:React.FC<Props> = ({ onClick, selected, text }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: '100%',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                border: '2px solid gray',
                backgroundColor: selected ? '#FFE023' : 'transparent',
                cursor:"pointer",
                '@media (max-width: 500px)': {
                    fontSize: "1.1rem"
                }
            }}
        >
            {text}
        </Box>
    )
            }

export default CircleBox