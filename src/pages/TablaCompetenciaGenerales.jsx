import { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, ThemeProvider, TablePagination } from "@mui/material";
import theme from '../theme/theme';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCompetenciasGenerales, deleteCompetencia, editCompetencia } from '../actions/competenciaActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, setOrder, deleteCompetencia as deleteCompetenciaAction, editCompetencia as editCompetenciaAction } from '../slices/tablaCompetenciaGeneralesSlice';
import { useNavigate } from "react-router-dom";

const TablaCompetenciaGenerales = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tablaCompetenciaGenerales);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    fetchCompetenciasGenerales()
      .then(data => dispatch(loadData(data)))
      .catch(console.error);
  }, [dispatch]);

  const handleRequestSort = (property) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    dispatch(setOrder({ order: isAsc ? 'desc' : 'asc', orderBy: property }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    if (state.orderBy === 'codigo') {
      return state.order === 'asc' ? a.codigo.localeCompare(b.codigo) : b.codigo.localeCompare(a.codigo);
    } else if (state.orderBy === 'nombre') {
      return state.order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    } else if (state.orderBy === 'descripcion') {
      return state.order === 'asc' ? a.descripcion.localeCompare(b.descripcion) : b.descripcion.localeCompare(a.descripcion);
    }
    return 0;
  });

  const paginatedCompetencias = sortedCompetencias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <h2 class="h2-table">Competencias Generales</h2>
      <Container className="container-table-page">
        <TableContainer component={Paper} className="container-table-child">
          <Table className="custom-table">
            <TableHead>
              <TableRow>
                <TableCell className="custom-table-th">
                  <TableSortLabel
                    active={state.orderBy === 'codigo'}
                    direction={state.orderBy === 'codigo' ? state.order : 'asc'}
                    onClick={() => handleRequestSort('codigo')}
                  >
                    Código
                  </TableSortLabel>
                </TableCell>
                <TableCell className="custom-table-th">
                  <TableSortLabel
                    active={state.orderBy === 'nombre'}
                    direction={state.orderBy === 'nombre' ? state.order : 'asc'}
                    onClick={() => handleRequestSort('nombre')}
                  >
                    Nombre
                  </TableSortLabel>
                </TableCell>
                <TableCell className="custom-table-th">
                  <TableSortLabel
                    active={state.orderBy === 'descripcion'}
                    direction={state.orderBy === 'descripcion' ? state.order : 'asc'}
                    onClick={() => handleRequestSort('descripcion')}
                  >
                    Descripción
                  </TableSortLabel>
                </TableCell>
                <TableCell className="custom-table-th">Plan</TableCell>
                <TableCell className="custom-table-th">Institución</TableCell>
                <TableCell className="custom-table-th">Departamento</TableCell>
                <TableCell className="custom-table-th">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCompetencias.map((competencia) => (
                <TableRow key={competencia.id} className="custom-table-tr-page">
                  <TableCell>{competencia.codigo}</TableCell>
                  <TableCell>{competencia.nombre}</TableCell>
                  <TableCell>{competencia.descripcion}</TableCell>
                  <TableCell>{competencia.planNombre}</TableCell>
                  <TableCell>{competencia.institucionNombre}</TableCell>
                  <TableCell>{competencia.departamentoNombre}</TableCell>
                  <TableCell className="actions-buttons">
                    <Button variant="contained" color="primary" onClick={() => handleEdit(competencia.id)} startIcon={<EditIcon />}>
                      Editar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(competencia.id)} startIcon={<DeleteIcon />}>
                      Eliminar
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination className="custom-table-pagination"
            rowsPerPageOptions={[7, 15, 25]}
            component="div"
            count={sortedCompetencias.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default TablaCompetenciaGenerales;