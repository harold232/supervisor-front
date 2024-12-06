import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl, Typography, Grid, Box, Button } from "@mui/material";
import Buttons from "../views/Buttons";
import { fetchPlanes } from "../actions/planActions";
import { fetchInstituciones } from "../actions/institucionActions";
import { fetchDepartamentos } from "../actions/departamentoActions";
import { createCompetenciaGeneral } from "../actions/competenciaActions";
import { useDispatch, useSelector } from 'react-redux';
import { setCodigo, setNombre, setDescripcion, setPlanid, setInstitucionid, setDepartamentoid, setPlanes, setInstituciones, setDepartamentos, resetForm } from '../slices/formReducer';
import './FormCompetencia.css';
import ConfirmationDialog from '../views/ConfirmationDialog';

const FormCompetenciaG = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.form);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogType, setDialogType] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  const loadData = () => {
    fetchPlanes().then(data => dispatch(setPlanes(data))).catch(console.error);
    fetchInstituciones().then(data => dispatch(setInstituciones(data))).catch(console.error);
    fetchDepartamentos().then(data => dispatch(setDepartamentos(data))).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = () => {
    const { codigo, nombre, descripcion, planid, institucionid, departamentoid } = state;
    if (!codigo || !nombre || !descripcion || !planid || !institucionid || !departamentoid) {
      setDialogTitle('Error');
      setDialogMessage('Por favor, complete todos los campos e intente nuevamente.');
      setDialogType('error');
      setOpenDialog(true);
      return;
    }
    const competencia = { codigo, nombre, descripcion, planid, institucionid, departamentoid };
    createCompetenciaGeneral(competencia)
      .then(data => {
        setDialogTitle('Éxito');
        setDialogMessage('Competencia creada con éxito.');
        setDialogType('success');
        setOpenDialog(true);
        dispatch(resetForm());
        loadData();
      })
      .catch(error => {
        setDialogTitle('Error');
        setDialogMessage('Hubo un error al crear la competencia. Por favor, intente nuevamente.');
        setDialogType('error');
        setOpenDialog(true);
        console.error(error);
      });
  };

  const handleCancel = () => {
    setDialogTitle('Cancelar');
    setDialogMessage('¿Está seguro de que desea cancelar?');
    setDialogType('confirm');
    setConfirmAction(() => () => {
      dispatch(resetForm());
      loadData();
    });
    setOpenDialog(true);
  };

  const handleImportar = () => {
    navigate('/importar-competencia');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (dialogType === 'success') {
      navigate('/competencias-especificas');
    }
  };

  const handleConfirmDialog = () => {
    if (confirmAction) {
      confirmAction();
    }
    setOpenDialog(false);
  };

  return (
    <Container className="container">
      <h2 variant="h2" gutterBottom className="title-form">
        Competencia General
      </h2>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Código"
                value={state.codigo}
                onChange={(e) => dispatch(setCodigo(e.target.value))}
                className="textField"
                InputProps={{
                  sx: {
                    borderRadius: '10px',
                    background: '#F5F5F5',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                }}
                required
              />
              {}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Nombre"
                value={state.nombre}
                onChange={(e) => dispatch(setNombre(e.target.value))}
                className="textField"
                InputProps={{
                  sx: {
                    borderRadius: '10px',
                    background: '#F5F5F5',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                }}
                required
              />
              {}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Descripción"
                value={state.descripcion}
                onChange={(e) => dispatch(setDescripcion(e.target.value))}
                className="textField"
                InputProps={{
                  sx: {
                    borderRadius: '10px',
                    background: '#F5F5F5',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                }}
                required
              />
              {}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Plan</InputLabel>
              <Select
                value={state.planid}
                onChange={(e) => dispatch(setPlanid(e.target.value))}
                className="textField"
                sx={{
                  borderRadius: '10px',
                  background: '#F5F5F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    boxShadow: '0px 4px 6px rgba(13, 15, 22, 0.2);',
                  },
                }}
                required
              >
                {state.planes.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.codigo} - {plan.descripcion}
                  </MenuItem>
                ))}
              </Select>
              {}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Institución</InputLabel>
              <Select
                value={state.institucionid}
                onChange={(e) => dispatch(setInstitucionid(e.target.value))}
                className="textField"
                sx={{
                  borderRadius: '10px',
                  background: '#F5F5F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    boxShadow: '0px 4px 6px rgba(13, 15, 22, 0.2);',
                  },
                }}
                required
              >
                {state.instituciones.map((institucion) => (
                  <MenuItem key={institucion.id} value={institucion.id}>
                    {institucion.codigo} - {institucion.nombreCorto}
                  </MenuItem>
                ))}
              </Select>
              {}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Departamento</InputLabel>
              <Select
                value={state.departamentoid}
                onChange={(e) => dispatch(setDepartamentoid(e.target.value))}
                className="textField"
                sx={{
                  borderRadius: '10px',
                  background: '#F5F5F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    boxShadow: ' 0px 4px 6px rgba(13, 15, 22, 0.2);',
                  },
                }}
                required
              >
                {state.departamentos.map((departamento) => (
                  <MenuItem key={departamento.id} value={departamento.id}>
                    {departamento.codigo} - {departamento.nombre}
                  </MenuItem>
                ))}
              </Select>
              {}
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </Box>
        <Box className="box" sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" className="button-importar" onClick={handleImportar}>
            Importar
          </Button>
        </Box>  
      </form>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title={dialogTitle}
        message={dialogMessage}
      />
    </Container >
  );
};

export default FormCompetenciaG;