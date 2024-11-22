import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Box } from "@mui/material";
import Buttons from "../views/Buttons";
import { fetchPlanes } from "../actions/planActions";
import { fetchInstituciones } from "../actions/institucionActions";
import { fetchDepartamentos } from "../actions/departamentoActions";
import { fetchCompetenciaById, editCompetencia } from "../actions/competenciaActions";
import { useDispatch, useSelector } from 'react-redux';
import { setCodigo, setNombre, setDescripcion, setPlanid, setInstitucionid, setDepartamentoid, setPlanes, setInstituciones, setDepartamentos, resetForm } from '../slices/formReducer';

const EditCompetenciaG = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.form);

    const loadData = () => {
        fetchPlanes().then(data => dispatch(setPlanes(data))).catch(console.error);
        fetchInstituciones().then(data => dispatch(setInstituciones(data))).catch(console.error);
        fetchDepartamentos().then(data => dispatch(setDepartamentos(data))).catch(console.error);
    };

    useEffect(() => {
        fetchCompetenciaById(id)
          .then(data => {
            dispatch(setCodigo(data.codigo || ''));
            dispatch(setNombre(data.nombre || ''));
            dispatch(setDescripcion(data.descripcion || ''));
            dispatch(setPlanid(data.planid || ''));
            dispatch(setInstitucionid(data.institucionid || ''));
            dispatch(setDepartamentoid(data.departamentoid || ''));
            dispatch(setPlanes(data.planes || []));
            dispatch(setInstituciones(data.instituciones || []));
            dispatch(setDepartamentos(data.departamentos || []));
          })
          .catch(console.error);
        loadData();
      }, [dispatch, id]);

    const handleSubmit = () => {
        const { codigo, nombre, descripcion, planid, institucionid, departamentoid } = state;
        const competencia = { codigo, nombre, descripcion, planid, institucionid, departamentoid };
        editCompetencia(id, competencia)
            .then(data => {
                console.log('Éxito:', data);
                dispatch(resetForm());
                loadData();
            })
            .catch(console.error);
    };

    const handleCancel = () => {
        dispatch(resetForm());
        loadData();
    };

    return (
        <Container className="container">
            <h2 variant="h2" className="title-form-e">
                Editar Competencia General
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
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel} />
                </Box>
            </form>

        </Container>
    );
};

export default EditCompetenciaG;