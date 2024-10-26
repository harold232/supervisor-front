import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TablaCompetenciaGenerales = () => {
    const [competenciasGenerales, setCompetenciasGenerales] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/competencia/competencias-generales')
            .then(response => response.json())
            .then(data => setCompetenciasGenerales(data))
            .catch(error => console.error('Error al obtener competencias generales:', error));
    }, []);

    
    return (
        <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
            <h2>Competencias Generales</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Institucion</TableCell>
                            <TableCell>Departamento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {competenciasGenerales.map((competencia) => (
                            <TableRow key={competencia.id}>
                                <TableCell>{competencia.codigo}</TableCell>
                                <TableCell>{competencia.nombre}</TableCell>
                                <TableCell>{competencia.descripcion}</TableCell>
                                <TableCell>{competencia.planId}</TableCell>
                                <TableCell>{competencia.institucionId}</TableCell>
                                <TableCell>{competencia.departamentoId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
export default TablaCompetenciaGenerales;