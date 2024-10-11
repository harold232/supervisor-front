import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TablaCompetenciaEspecificas = () => {
    const [competenciasEspecificas, setCompetenciasEspecificas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/competencia/competencias-especificas')
            .then(response => response.json())
            .then(data => setCompetenciasEspecificas(data))
            .catch(error => console.error('Error al obtener competencias especificas:', error));
    }, []);


    return (
        <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
            <h2>Competencias Especificas</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Nivel</TableCell>
                            <TableCell>Competencia general</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {competenciasEspecificas.map((competencia) => (
                            <TableRow key={competencia.id}>
                                <TableCell>{competencia.codigo}</TableCell>
                                <TableCell>{competencia.nombre}</TableCell>
                                <TableCell>{competencia.descripcion}</TableCell>
                                <TableCell>{competencia.tipo}</TableCell>
                                <TableCell>{competencia.nivel}</TableCell>
                                <TableCell>{competencia.competenciaGeneralId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
export default TablaCompetenciaEspecificas;