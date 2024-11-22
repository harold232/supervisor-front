import { Button, Box } from "@mui/material";
import "./Buttons.css";

export default function Buttons({ handleSubmit, handleCancel }) {
    return (
        <Box className="box">
            <Button onClick={handleSubmit} variant="contained" className="button-aceptar">
                Aceptar
            </Button>
            <Button onClick={handleCancel} variant="contained" className="button-cancelar">
                Cancelar
            </Button>
        </Box>
    );
}