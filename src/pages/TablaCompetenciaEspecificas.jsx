import { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, ThemeProvider, TablePagination, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import theme from '../theme/theme';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCompetenciasEspecificas, deleteCompetencia, editCompetencia } from '../actions/competenciaActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, setOrder, deleteCompetencia as deleteCompetenciaAction, editCompetencia as editCompetenciaAction } from '../slices/tablaCompetenciaEspecificasSlice';
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from '../views/ConfirmationDialog';

const TablaCompetenciaEspecificas = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tablaCompetenciaEspecificas);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({ tipo: 'E', departamentoId: '', institucionId: '', planId: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchCompetenciasEspecificas()
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
    setDialogTitle('Eliminar Competencia');
    setDialogMessage('¿Está seguro de que desea eliminar esta competencia?');
    setConfirmAction(() => () => {
      deleteCompetencia(id)
        .then(() => dispatch(deleteCompetenciaAction(id)))
        .catch(console.error);
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    if (confirmAction) {
      confirmAction();
    }
    setOpenDialog(false);
  };

  const handleEdit = (id) => {
    navigate(`/editar-competencia-especifica/${id}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const query = new URLSearchParams(filters);
    fetch(`http://localhost:8080/api/competencia/buscar?${query}`)
      .then(response => response.json())
      .then(data => dispatch(loadData(data)))
      .catch(console.error);
  };

  const clearFilters = () => {
    setFilters({ tipo: 'E', departamentoId: '', institucionId: '', planId: '' });
    fetchCompetenciasEspecificas()
      .then(data => dispatch(loadData(data)))
      .catch(console.error);
  };


  const sortedCompetencias = [...state.competenciasEspecificas].sort((a, b) => {
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
      <h2 className="h2-table">Competencias Especificas</h2>
      <Container className="container-table-page">
        <div className="filters">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl margin="normal" fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select
                  name="departamentoId"
                  value={filters.departamentoId}
                  onChange={handleFilterChange}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="1">Facultad de Ingeniería de Sistemas e Informática</MenuItem>
                  <MenuItem value="2">E.P. Ingeniería de Software</MenuItem>
                  <MenuItem value="3">E.P. Ingeniería de Sistemas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl margin="normal" fullWidth>
                <InputLabel>Institución</InputLabel>
                <Select
                  name="institucionId"
                  value={filters.institucionId}
                  onChange={handleFilterChange}
                >
                  <MenuItem value=""><em>Ninguna</em></MenuItem>
                  <MenuItem value="1">Univ. San Marcos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl margin="normal" fullWidth>
                <InputLabel>Plan</InputLabel>
                <Select
                  name="planId"
                  value={filters.planId}
                  onChange={handleFilterChange}
                >
                  <MenuItem value=""><em>Ninguna</em></MenuItem>
                  <MenuItem value="1">Plan 2018</MenuItem>
                  <MenuItem value="2">Plan 2015</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 0 }}>
              <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
                Aplicar Filtros
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 0 }}>
              <Button variant="contained" color="secondary" onClick={clearFilters} fullWidth>
                Limpiar Filtros
              </Button>
            </Grid>
          </Grid>
        </div>
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
            rowsPerPageOptions={[5, 15, 25]}
            component="div"
            count={sortedCompetencias.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title={dialogTitle}
        message={dialogMessage}
      />
    </ThemeProvider>
  );
};

export default TablaCompetenciaEspecificas;