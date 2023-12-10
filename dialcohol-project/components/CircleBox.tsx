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
                fontSize: '2rem',
                border: '2px solid gray',
                backgroundColor: selected ? 'lightgray' : 'transparent',
                cursor:"pointer",
                '@media (max-width: 500px)': {
                    fontSize: "1.5rem" // 375px以下の場合に小さいサイズに設定
                }
            }}
        >
            {text}
        </Box>
    )
            }

export default CircleBox