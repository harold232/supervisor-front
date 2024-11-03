import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
    const navigate = useNavigate();

    const handleNavigateToE = () => {
        navigate("/formCompetenciaE");
    };

    const handleNavigateToG = () => {
        navigate("/formCompetenciaG");
    };

    const handleNavigateToTablaG = () => {
        navigate("/competencias-generales");
    };

    const handleNavigateToTablaE = () => {
        navigate("/competencias-especificas");
    };

    return (
        <Container sx={{ textAlign: "center", mt: 4 }}>
            <Button
                variant="contained"
                color="#EFF1F6"
                onClick={handleNavigateToG}
                sx={{ mr: 2, background: '#205274', color: '#fff' }}
            >
                Crear Competencia General
            </Button>
            <Button
                variant="contained"
                color="#EFF1F6"
                onClick={handleNavigateToE}
                sx={{ mr: 2, background: '#205274', color: '#fff'}}
            >
                Crear Competencia Especifica
            </Button>

            <Button
                variant="contained"
                color="#EFF1F6"
                onClick={handleNavigateToTablaG}
                sx={{ mr: 2, background: '#205274', color: '#fff' }}
            >
                Ver Competencias Generales
            </Button>

            <Button
                variant="contained"
                color="#EFF1F6"
                onClick={handleNavigateToTablaE}
                sx={{ mr: 2, background: '#205274', color: '#fff' }}
            >
                Ver Competencias Especificas
            </Button>
        </Container>
    );
};

export default MainScreen;