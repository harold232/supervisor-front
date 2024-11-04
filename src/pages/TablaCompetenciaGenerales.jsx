import { useState, useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, ThemeProvider } from "@mui/material";
import theme from '../theme/theme';
import { fetchCompetenciasGenerales, deleteCompetencia, editCompetencia } from '../actions/competenciaActions';

const TablaCompetenciaGenerales = () => {
    const [competenciasGenerales, setCompetenciasGenerales] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('nombre');

    useEffect(() => {
        fetchCompetenciasGenerales()
            .then(setCompetenciasGenerales)
            .catch(console.error);
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDelete = (id) => {
        deleteCompetencia(id)
            .then(() => {
                setCompetenciasGenerales(competenciasGenerales.filter(competencia => competencia.id !== id));
            })
            .catch(console.error);
    };

    const handleEdit = (id) => {
        const updatedCompetencia = prompt("Ingrese el nuevo nombre de la competencia:");
        if (updatedCompetencia) {
            editCompetencia(id, updatedCompetencia)
                .then(() => {
                    setCompetenciasGenerales(competenciasGenerales.map(competencia => 
                        competencia.id === id ? { ...competencia, nombre: updatedCompetencia } : competencia
                    ));
                })
                .catch(console.error);
        }
    };

    const sortedCompetencias = competenciasGenerales.sort((a, b) => {
        if (orderBy === 'nombre') {
            return order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
        }
        // Agrega más condiciones para otras columnas si es necesario
        return 0;
    });

    return (
        <ThemeProvider theme={theme}>
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
                                <TableCell>Acción</TableCell>
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
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(competencia.id)}>
                                            Eliminar
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(competencia.id)} style={{ marginLeft: '10px' }}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};
export default TablaCompetenciaGenerales;