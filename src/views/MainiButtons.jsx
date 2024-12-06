import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
    const navigate = useNavigate();

    const handleNavigateToE = () => {
        navigate("/formulario");
    };

    const handleNavigateToG = () => {
        navigate("/formCrearPlan");
    };

    const handleNavigateToFormE = () => {
        navigate("/formEliminar");
    };

    const handleNavigateToTablaE = () => {
        navigate("/tablaPlan");
    };

    return (
        <Container sx={{ textAlign: "center", mt: 4 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToG}
                sx={{
                    mr: 2,
                    background: '#A1C6EA', // Fondo más claro
                    fontWeight: 'bold', // Letras más gruesas
                    fontSize: '16px', // Tamaño de letra más grande
                    padding: '12px 24px', // Botón más grande
                    color: 'black', // Letra en negro
                    '&:hover': {
                        background: '#205274', // Cambia el color en hover
                    }
                }}
            >
                Crear Plan de Estudios
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToTablaE}
                sx={{
                    mr: 2,
                    background: '#A1C6EA', // Fondo más claro
                    fontWeight: 'bold', // Letras más gruesas
                    fontSize: '16px', // Tamaño de letra más grande
                    padding: '12px 24px', // Botón más grande
                    color: 'black', // Letra en negro
                    '&:hover': {
                        background: '#205274', // Cambia el color en hover
                    }
                }}
            >
                Ver Planes de Estudios
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToE}
                sx={{
                    mr: 2,
                    background: '#A1C6EA', // Fondo más claro
                    fontWeight: 'bold', // Letras más gruesas
                    fontSize: '16px', // Tamaño de letra más grande
                    padding: '12px 24px', // Botón más grande
                    color: 'black', // Letra en negro
                    '&:hover': {
                        background: '#205274', // Cambia el color en hover
                    }
                }}
            >
                Modificar Plan de Estudios
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToFormE}
                sx={{
                    mr: 2,
                    background: '#A1C6EA', // Fondo más claro
                    fontWeight: 'bold', // Letras más gruesas
                    fontSize: '16px', // Tamaño de letra más grande
                    padding: '12px 24px', // Botón más grande
                    color: 'black', // Letra en negro
                    '&:hover': {
                        background: '#205274', // Cambia el color en hover
                    }
                }}
            >
                Eliminar Plan de Estudios
            </Button>

            {/* Descripciones separadas por líneas */}
            <Typography variant="body1" sx={{ mt: 2 }}>
                Crear un Plan de Estudios: Permite crear un plan de estudios asignando un código y su descripción.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                Ver Planes de Estudios: Permite visualizar los datos de un plan de estudios, aquí se podrá encontrar el id (para modificar y eliminar un plan).
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                Modificar Planes de Estudios: Al ingresar el id, se pueden modificar los datos.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                Eliminar Plan de Estudios: Se pueden eliminar los planes mediante el id.
            </Typography>
        </Container>
    );
};

export default MainScreen;

