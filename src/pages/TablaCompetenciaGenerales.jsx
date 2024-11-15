import { useEffect } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, ThemeProvider } from "@mui/material";
import theme from '../theme/theme';
import { fetchCompetenciasGenerales, deleteCompetencia, editCompetencia } from '../actions/competenciaActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, setOrder, deleteCompetencia as deleteCompetenciaAction, editCompetencia as editCompetenciaAction } from '../slices/tablaCompetenciaGeneralesSlice';
import { useNavigate } from "react-router-dom";

const TablaCompetenciaGenerales = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tablaCompetenciaGenerales);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompetenciasGenerales()
      .then(data => dispatch(loadData(data)))
      .catch(console.error);
  }, [dispatch]);

  const handleRequestSort = (property) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    dispatch(setOrder({ order: isAsc ? 'desc' : 'asc', orderBy: property }));
  };

  const handleDelete = (id) => {
    deleteCompetencia(id)
      .then(() => dispatch(deleteCompetenciaAction(id)))
      .catch(console.error);
  };

  const handleEdit = (id) => {
    navigate(`/editar-competencia-general/${id}`);
  };

  const sortedCompetencias = [...state.competenciasGenerales].sort((a, b) => {
    if (state.orderBy === 'nombre') {
      return state.order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    }
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
                    active={state.orderBy === 'nombre'}
                    direction={state.orderBy === 'nombre' ? state.order : 'asc'}
                    onClick={() => handleRequestSort('nombre')}
                  >
                    Nombre
                  </TableSortLabel>
                </TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Institución</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCompetencias.map((competencia) => (
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