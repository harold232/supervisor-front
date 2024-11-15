import { useEffect } from "react";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Buttons from "../views/Buttons";
import { fetchPlanes } from "../actions/planActions";
import { fetchInstituciones } from "../actions/institucionActions";
import { fetchDepartamentos } from "../actions/departamentoActions";
import { createCompetenciaEspecifica } from "../actions/competenciaActions";
import { useDispatch, useSelector } from 'react-redux';
import { setCodigo, setNombre, setDescripcion, setPlanid, setInstitucionid, setDepartamentoid, resetForm } from '../slices/formReducer';

const FormCompetenciaE = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const planesState = useSelector((state) => state.plan);
  const institucionesState = useSelector((state) => state.institucion);
  const departamentosState = useSelector((state) => state.departamento);

  const loadData = () => {
    dispatch(fetchPlanes());
    dispatch(fetchInstituciones());
    dispatch(fetchDepartamentos());
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const handleSubmit = async () => {
    const { codigo, nombre, descripcion, planid, institucionid, departamentoid } = formState;
    const competencia = { codigo, nombre, descripcion, planid, institucionid, departamentoid };
    try {
      const result = await dispatch(createCompetenciaEspecifica(competencia));
      console.log('Éxito:', result);
      dispatch(resetForm());
      loadData();
    } catch (error) {
      console.error('Error al crear competencia específica:', error);
    }
  };

  const handleCancel = () => {
    dispatch(resetForm());
    loadData();
  };

  return (
    <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
      <h2>Competencia Específica</h2>
      <div>
        <FormGroup>
          <TextField
            label="Código"
            value={formState.codigo}
            onChange={(e) => dispatch(setCodigo(e.target.value))}
            sx={{ m: 'normal', background: "#EFF1F6" }}
            required
          />
          <TextField
            label="Nombre"
            value={formState.nombre}
            onChange={(e) => dispatch(setNombre(e.target.value))}
            margin="normal"
            sx={{ background: "#EFF1F6" }}
            required
          />
          <TextField
            label="Descripción"
            value={formState.descripcion}
            onChange={(e) => dispatch(setDescripcion(e.target.value))}
            margin="normal"
            sx={{ background: "#EFF1F6" }}
            required
          />
          <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
            <InputLabel>Plan</InputLabel>
            <Select
              value={formState.planid}
              onChange={(e) => dispatch(setPlanid(e.target.value))}
            >
              {planesState.planes.map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>
                  {plan.codigo} - {plan.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
            <InputLabel>Institución</InputLabel>
            <Select
              value={formState.institucionid}
              onChange={(e) => dispatch(setInstitucionid(e.target.value))}
            >
              {institucionesState.instituciones.map((institucion) => (
                <MenuItem key={institucion.id} value={institucion.id}>
                  {institucion.codigo} - {institucion.nombreCorto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
            <InputLabel>Departamento</InputLabel>
            <Select
              value={formState.departamentoid}
              onChange={(e) => dispatch(setDepartamentoid(e.target.value))}
            >
              {departamentosState.departamentos.map((departamento) => (
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

export default FormCompetenciaE;