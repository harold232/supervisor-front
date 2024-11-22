import { Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./MainButtons.css";
import EspecificasCompetenciasCard from "./EspecificasCompetenciasCard";
import GeneralCompetenciasCard from "./GeneralCompetenciasCard";
import TablaCompetencias from "./TablaCompetencias";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const MainScreen = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState(null);

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

    const handleFilterGeneral = () => {
        setFilter("general");
    };

    const handleFilterEspecifica = () => {
        setFilter('especifica');
    };

    return (
        <Container className="container-main">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} onClick={handleFilterGeneral}>
                            <GeneralCompetenciasCard  />
                        </Grid>
                        <Grid item xs={12} sm={6} onClick={handleFilterEspecifica}>
                            <EspecificasCompetenciasCard />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TablaCompetencias filter={filter} />
                </Grid>
                <Grid item xs={12} sm={4} container direction="column" spacing={10} className="container-button">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleNavigateToG}
                            className="button"
                            startIcon={<AddIcon />}
                        >
                            Agregar Competencia General
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleNavigateToE}
                            className="button"
                            startIcon={<AddIcon />}
                        >
                            Agregar Competencia Especifica
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleNavigateToTablaG}
                            className="button"
                            startIcon={<VisibilityIcon />}
                        >
                            Ver Competencias Generales
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleNavigateToTablaE}
                            className="button"
                            startIcon={<VisibilityIcon />}
                        >
                            Ver Competencias Especificas
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainScreen;