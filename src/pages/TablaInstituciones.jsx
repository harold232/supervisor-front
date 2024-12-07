import { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, ThemeProvider, TablePagination,  FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import theme from '../theme/theme';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchInstituciones, deleteInstitucion, editInstitucion } from '../actions/institucionActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, setOrder, deleteInstitucion as deleteInstitucionAction, editInstitucion as editInstitucionAction } from '../slices/tablaInstitucionesSlice';
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from '../views/ConfirmationDialog';

const TablaInstituciones = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tablaInstituciones);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [filters, setFilters] = useState({ codigo: '', nombreCorto: '', nombreComercial: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchInstituciones()
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
    setDialogTitle('Eliminar Institución');
    setDialogMessage('¿Está seguro de que desea eliminar esta institución?');
    setConfirmAction(() => () => {
      deleteInstitucion(id)
        .then(() => dispatch(deleteInstitucionActionAction(id)))
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
    navigate(`/editar-institucion/${id}`);
  };

  const sortedInstituciones = [...state.instituciones].sort((a, b) => {
    if (state.orderBy === 'codigo') {
      return state.order === 'asc' ? a.codigo.localeCompare(b.codigo) : b.codigo.localeCompare(a.codigo);
    } else if (state.orderBy === 'nombreCorto') {
      return state.order === 'asc' ? a.nombreCorto.localeCompare(b.nombreCorto) : b.nombreCorto.localeCompare(a.nombreCorto);
    } else if (state.orderBy === 'nombreComercial') {
      return state.order === 'asc' ? a.nombreComercial.localeCompare(b.nombreComercial) : b.nombreComercial.localeCompare(a.nombreComercial);
    }
    return 0;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const query = new URLSearchParams(filters);
    fetch(`http://localhost:8080/api/institucion/buscar?${query}`)
      .then(response => response.json())
      .then(data => dispatch(loadData(data)))
      .catch(console.error);
  };

  const clearFilters = () => {
    setFilters({ codigo: '', nombreCorto: '', nombreComercial: '' });
    fetchInstituciones()
      .then(data => dispatch(loadData(data)))
      .catch(console.error);
  };



  const paginatedInstituciones = sortedInstitucioness.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <h2 class="h2-table">Instituciones Educativas</h2>
      <Container className="container-table-page">
      <div className="filters">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                          <TextField
                            label="Código"
                            name="codigo"
                            value={filters.codigo}
                            onChange={handleFilterChange}
                            margin="normal"
                            fullWidth
                          />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                                          label="Nombre Corto"
                                          name="nombreCorto"
                                          value={filters.nombreCorto}
                                          onChange={handleFilterChange}
                                          margin="normal"
                                          fullWidth
                                        />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                                          label="Nombre Comercial"
                                          name="nombreComercial"
                                          value={filters.nombreComercial}
                                          onChange={handleFilterChange}
                                          margin="normal"
                                          fullWidth
                                        />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
                Aplicar Filtros
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                    active={state.orderBy === 'nombreCorto'}
                    direction={state.orderBy === 'nombreCorto' ? state.order : 'asc'}
                    onClick={() => handleRequestSort('nombreCorto')}
                  >
                    Nombre
                  </TableSortLabel>
                </TableCell>
                <TableCell className="custom-table-th">
                  <TableSortLabel
                    active={state.orderBy === 'nombreComercial'}
                    direction={state.orderBy === 'nombreComercial' ? state.order : 'asc'}
                    onClick={() => handleRequestSort('nombreComercial')}
                  >
                    Descripción
                  </TableSortLabel>
                </TableCell>
                <TableCell className="custom-table-th">ID</TableCell>
                <TableCell className="custom-table-th">Código</TableCell>
                <TableCell className="custom-table-th">Nombre Corto</TableCell>
                <TableCell className="custom-table-th">Nombre Largo</TableCell>
                <TableCell className="custom-table-th">Nombre Comercial</TableCell>
                <TableCell className="custom-table-th">Estado</TableCell>
                <TableCell className="custom-table-th">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInstituciones.map((institucion) => (
                <TableRow key={institucion.id} className="custom-table-tr-page">
                  <TableCell>{institucion.id}</TableCell>
                  <TableCell>{institucion.codigo}</TableCell>
                  <TableCell>{institucion.nombreCorto}</TableCell>
                  <TableCell>{institucion.nombreLargo}</TableCell>
                  <TableCell>{institucion.nombreComercial}</TableCell>
                  <TableCell>{institucion.estado}</TableCell>
                  <TableCell className="actions-buttons">
                    <Button variant="contained" color="primary" onClick={() => handleEdit(institucion.id)} startIcon={<EditIcon />}>
                      Editar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(institucion.id)} startIcon={<DeleteIcon />}>
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
            count={sortedInstituciones.length}
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

export default TablaInstituciones;