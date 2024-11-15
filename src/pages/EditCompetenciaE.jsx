import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Buttons from "../views/Buttons";
import { fetchPlanes } from "../actions/planActions";
import { fetchInstituciones } from "../actions/institucionActions";
import { fetchDepartamentos } from "../actions/departamentoActions";
import { fetchCompetenciaById, editCompetencia } from "../actions/competenciaActions";
import { useDispatch, useSelector } from 'react-redux';
import { setCodigo, setNombre, setDescripcion, setPlanid, setInstitucionid, setDepartamentoid, setPlanes, setInstituciones, setDepartamentos, resetForm } from '../slices/formReducer';

const EditCompetenciaE = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.form);

    const loadData = () => {
        fetchPlanes().then(data => dispatch(setPlanes(data))).catch(console.error);
        fetchInstituciones().then(data => dispatch(setInstituciones(data))).catch(console.error);
        fetchDepartamentos().then(data => dispatch(setDepartamentos(data))).catch(console.error);
    };

    useEffect(() => {
        loadData();
        fetchCompetenciaById(id).then(data => {
            dispatch(setCodigo(data.codigo));
            dispatch(setNombre(data.nombre));
            dispatch(setDescripcion(data.descripcion));
            dispatch(setPlanid(data.planid));
            dispatch(setInstitucionid(data.institucionid));
            dispatch(setDepartamentoid(data.departamentoid));
        }).catch(console.error);
    }, [id]);

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
        <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
            <h2>Editar Competencia Específica</h2>
            <div>
                <FormGroup>
                    <TextField
                        label="Código"
                        value={state.codigo}
                        onChange={(e) => dispatch(setCodigo(e.target.value))}
                        sx={{ m: 'normal', background: "#EFF1F6" }}
                        required
                    />
                    <TextField
                        label="Nombre"
                        value={state.nombre}
                        onChange={(e) => dispatch(setNombre(e.target.value))}
                        margin="normal"
                        sx={{ background: "#EFF1F6" }}
                        required
                    />
                    <TextField
                        label="Descripción"
                        value={state.descripcion}
                        onChange={(e) => dispatch(setDescripcion(e.target.value))}
                        margin="normal"
                        sx={{ background: "#EFF1F6" }}
                        required
                    />
                    <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
                        <InputLabel>Plan</InputLabel>
                        <Select
                            value={state.planid}
                            onChange={(e) => dispatch(setPlanid(e.target.value))}
                        >
                            {state.planes.map((plan) => (
                                <MenuItem key={plan.id} value={plan.id}>
                                    {plan.codigo} - {plan.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
                        <InputLabel>Institución</InputLabel>
                        <Select
                            value={state.institucionid}
                            onChange={(e) => dispatch(setInstitucionid(e.target.value))}
                        >
                            {state.instituciones.map((institucion) => (
                                <MenuItem key={institucion.id} value={institucion.id}>
                                    {institucion.codigo} - {institucion.nombreCorto}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
                        <InputLabel>Departamento</InputLabel>
                        <Select
                            value={state.departamentoid}
                            onChange={(e) => dispatch(setDepartamentoid(e.target.value))}
                        >
                            {state.departamentos.map((departamento) => (
                                <MenuItem key={departamento.id} value={departamento.id}>
                                    {departamento.codigo} - {departamento.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
            </div>
            <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </Container>
    );
};

export default EditCompetenciaE;