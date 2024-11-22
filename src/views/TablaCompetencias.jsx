import { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination } from "@mui/material";
import { fetchCompetencias } from '../actions/competenciaActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, setOrder } from '../slices/tablaCompetenciasSlice';
import { useNavigate } from "react-router-dom";
import './TablaCompetencias.css';

const TablaCompetencias = ({ filter }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tablaCompetencias);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchCompetencias()
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

  const sortedCompetencias = [...state.competencias].sort((a, b) => {
    if (state.orderBy === 'codigo') {
      return state.order === 'asc' ? a.codigo.localeCompare(b.codigo) : b.codigo.localeCompare(a.codigo);
    } else if (state.orderBy === 'nombre') {
      return state.order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
    } else if (state.orderBy === 'tipo') {
      return state.order === 'asc' ? a.tipo.localeCompare(b.tipo) : b.tipo.localeCompare(a.tipo);
    }
    return 0;
  });

  const filteredCompetencias = sortedCompetencias.filter(competencia => {
    if (filter === 'general') {
      return competencia.tipo === 'General';
    } else if (filter === 'especifica') {
      return competencia.tipo === 'Específica';
    }
    return true;
  });

  const paginatedCompetencias = filteredCompetencias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container className="container-table">
      <TableContainer component={Paper}>
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
                  active={state.orderBy === 'tipo'}
                  direction={state.orderBy === 'tipo' ? state.order : 'asc'}
                  onClick={() => handleRequestSort('tipo')}
                >
                  Tipo
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCompetencias.map((competencia) => (
              <TableRow key={competencia.id} className="custom-table-tr">
                <TableCell>{competencia.codigo}</TableCell>
                <TableCell>{competencia.nombre}</TableCell>
                <TableCell>{competencia.tipo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination className="custom-table-pagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCompetencias.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default TablaCompetencias;