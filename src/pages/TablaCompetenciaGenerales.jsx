import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from "@mui/material";

const TablaCompetenciaGenerales = () => {
    const [competenciasGenerales, setCompetenciasGenerales] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('nombre');

    useEffect(() => {
        fetch('http://localhost:8080/api/competencia/competencias-generales')
            .then(response => response.json())
            .then(data => setCompetenciasGenerales(data))
            .catch(error => console.error('Error al obtener competencias generales:', error));
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedCompetencias = competenciasGenerales.sort((a, b) => {
        if (orderBy === 'nombre') {
            return order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
        }
        // Agrega más condiciones para otras columnas si es necesario
        return 0;
    });

    return (
        <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
            <h2>Competencias Generales</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'nombre'}
                                    direction={orderBy === 'nombre' ? order : 'asc'}
                                    onClick={() => handleRequestSort('nombre')}
                                >
                                    Nombre
                                </TableSortLabel>
                            </TableCell>
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
                                <TableCell>{competencia.planNombre}</TableCell>
                                <TableCell>{competencia.institucionNombre}</TableCell>
                                <TableCell>{competencia.departamentoNombre}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
export default TablaCompetenciaGenerales;