import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
    const navigate = useNavigate();

    const handleNavigateToE = () => {
        navigate("/formularioInstitucion");
    };

    const handleNavigateToG = () => {
        navigate("/formCrearInstitucion");
    };

    const handleNavigateToFormE = () => {
        navigate("/formEliminarInstitucion");
    };

    const handleNavigateToTablaE = () => {
        navigate("/tablaInstituciones");
    };

    return (
        <Container sx={{ textAlign: "center", mt: 4 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToG}
                sx={{
                    mr: 2,
                    background: '#A1C6EA',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '12px 24px',
                    color: 'black',
                    '&:hover': {
                        background: '#205274',
                    }
                }}
            >
                Crear Institución Educativa
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToTablaE}
                sx={{
                    mr: 2,
                    background: '#A1C6EA',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '12px 24px',
                    color: 'black',
                    '&:hover': {
                        background: '#205274',
                    }
                }}
            >
                Ver Instituciones
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToE}
                sx={{
                    mr: 2,
                    background: '#A1C6EA',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '12px 24px',
                    color: 'black',
                    '&:hover': {
                        background: '#205274',
                    }
                }}
            >
                Modificar Institución
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToFormE}
                sx={{
                    mr: 2,
                    background: '#A1C6EA',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '12px 24px',
                    color: 'black',
                    '&:hover': {
                        background: '#205274',
                    }
                }}
            >
                Eliminar Institución Educativa
            </Button>
        </Container>
    );
};

export default MainScreen;

