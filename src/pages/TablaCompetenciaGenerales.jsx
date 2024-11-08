import { useEffect, useReducer } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, ThemeProvider } from "@mui/material";
import theme from '../theme/theme';
import { fetchCompetenciasGenerales, deleteCompetencia, editCompetencia } from '../actions/competenciaActions';

const initialState = {
  competenciasGenerales: [],
  order: 'asc',
  orderBy: 'nombre'
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return { ...state, competenciasGenerales: action.payload };
    case "SET_ORDER":
      return {
        ...state,
        order: action.payload.order,
        orderBy: action.payload.orderBy
      };
    case "DELETE_COMPETENCIA":
      return {
        ...state,
        competenciasGenerales: state.competenciasGenerales.filter(c => c.id !== action.payload)
      };
    case "EDIT_COMPETENCIA":
      return {
        ...state,
        competenciasGenerales: state.competenciasGenerales.map(c =>
          c.id === action.payload.id ? { ...c, nombre: action.payload.updatedNombre } : c
        )
      };
    default:
      return state;
  }
};

const TablaCompetenciaGenerales = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCompetenciasGenerales()
      .then(data => dispatch({ type: "LOAD_DATA", payload: data }))
      .catch(console.error);
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    dispatch({ type: "SET_ORDER", payload: { order: isAsc ? 'desc' : 'asc', orderBy: property } });
  };

  const handleDelete = (id) => {
    deleteCompetencia(id)
      .then(() => dispatch({ type: "DELETE_COMPETENCIA", payload: id }))
      .catch(console.error);
  };

  const handleEdit = (id) => {
    const updatedCompetencia = prompt("Ingrese el nuevo nombre de la competencia:");
    if (updatedCompetencia) {
      editCompetencia(id, updatedCompetencia)
        .then(() => dispatch({ type: "EDIT_COMPETENCIA", payload: { id, updatedNombre: updatedCompetencia } }))
        .catch(console.error);
    }
  };

  const sortedCompetencias = state.competenciasGenerales.sort((a, b) => {
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
