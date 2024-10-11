import { Button, Box } from "@mui/material"

export default function Buttons({ handleSubmit, handleCancel }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2, borderRadius: '10px', backgroundColor: '#205274' }}>
                Aceptar
            </Button>
            <Button onClick={handleCancel} variant="contained" sx={{ mt: 2, borderRadius: '10px', backgroundColor: '#71384D' }}>
                Cancelar
            </Button>
        </Box>
    )
}