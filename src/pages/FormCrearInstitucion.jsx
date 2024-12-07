import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl, Typography, Grid, Box, Button } from "@mui/material";
import Buttons from "../views/Buttons";
import { fetchInstitucion } from "../actions/institucionActions";
import { useDispatch, useSelector } from 'react-redux';
import './FormCompetencia.css';
import ConfirmationDialog from '../views/ConfirmationDialog';

const FormInstitucion = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.form);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogType, setDialogType] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = () => {
    const { codigo, nombreCorto, nombreLargo, nombreComercial, estado} = state;
    if (!codigo || !nombreCorto || !nombreLargo || !nombreComercial || !estado) {
      setDialogTitle('Error');
      setDialogMessage('Por favor, complete todos los campos e intente nuevamente.');
      setDialogType('error');
      setOpenDialog(true);
      return;
    }
    const institucion = { codigo, nombreCorto, nombreLargo, nombreComercial, estado };
    createCompetenciaGeneral(institucion)
      .then(data => {
        setDialogTitle('Éxito');
        setDialogMessage('Institucion creada con éxito.');
        setDialogType('success');
        setOpenDialog(true);
        dispatch(resetForm());
        loadData();
      })
      .catch(error => {
        setDialogTitle('Error');
        setDialogMessage('Hubo un error al crear la institucion. Por favor, intente nuevamente.');
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (dialogType === 'success') {
      navigate('/instituciones');
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
        Institución Educativa
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
                label="Nombre Corto"
                value={state.nombreCorto}
                onChange={(e) => dispatch(setNombreCorto(e.target.value))}
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
                label="Nombre Largo"
                value={state.nombreLargo}
                onChange={(e) => dispatch(setNombreLargo(e.target.value))}
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
                                         label="Nombre Comercial"
                                         value={state.nombreComercial}
                                         onChange={(e) => dispatch(setNombreComercial(e.target.value))}
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
                                  </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth>
                                      <InputLabel>Estado</InputLabel>
                                      <Select
                                          value={state.estado}
                                          onChange={(e) => dispatch(setEstado(e.target.value))}
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
                                          {state.estados.map((estado) => (
                                              <MenuItem key={institucion.estado} value={institucion.estado}>
                                                  {institucion.estado}
                                              </MenuItem>
                                          ))}
                                      </Select>
                                  </FormControl>
                              </Grid>
        <Box sx={{ mt: 2 }}>
          <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel} />
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

export default FormCrearInstitucion;