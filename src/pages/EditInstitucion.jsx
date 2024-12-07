import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Box } from "@mui/material";
import Buttons from "../views/Buttons";
import { fetchPlanes } from "../actions/planActions";
import { fetchInstituciones } from "../actions/institucionActions";
import { fetchInstitucionById, editInstitucion } from "../actions/institucionActions";
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationDialog from '../views/ConfirmationDialog';

const EditInstitucion = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.form);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogType, setDialogType] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);

    useEffect(() => {
        fetchInstitucionById(id)
            .then(data => {
                dispatch(setCodigo(data.codigo || ''));
                dispatch(setNombreCorto(data.nombreCorto || ''));
                dispatch(setNombreLargo(data.nombreLargo || ''));
                dispatch(setNombreComercial(data.nombreComercial || ''));
                dispatch(setEstado(data.estado || ''));
            })
            .catch(console.error);
        loadData();

    }, [dispatch, id]);

    const handleSubmit = () => {
        if (!state.codigo || !state.nombreCorto || !state.nombreLargo || !state.nombreComercial || !state.estado) {
            setDialogTitle('Error');
            setDialogMessage('Por favor, complete todos los campos e intente nuevamente.');
            setDialogType('error');
            setOpenDialog(true);
            return;
        }
        const updatedInstitucion = {
            codigo: state.codigo,
            nombreCorto: state.nombreCorto,
            nombreLargo: state.nombreLargo,
            nombreComercial: state.nombreComercial,
            estado: state.estado,
        };
        console.log(updatedInstitucion);
        editInstitucion(id, updatedInstitucion)
            .then(data => {
                setDialogTitle('Éxito');
                setDialogMessage('Institución guardada con éxito.');
                setDialogType('success');
                setOpenDialog(true);
                dispatch(resetForm());
            })
            .catch(error => {
                setDialogTitle('Error');
                setDialogMessage('Hubo un error al editar la institución. Por favor, intente nuevamente.');
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
            navigate('/instituciones');
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
            <h2 variant="h2" className="title-form-e">
                Editar Institución
            </h2>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Codigo"
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
        </Container>
    );
};

export default EditInstitucion;