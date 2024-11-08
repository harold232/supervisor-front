import { useEffect, useReducer } from "react";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import Buttons from "../views/Buttons";
import { fetchPlanes } from "../actions/planActions";
import { fetchInstituciones } from "../actions/institucionActions";
import { fetchDepartamentos } from "../actions/departamentoActions";
import { createCompetenciaEspecifica } from "../actions/competenciaActions";

const initialState = {
  codigo: "",
  nombre: "",
  descripcion: "",
  planid: "",
  institucionid: "",
  departamentoid: "",
  planes: [],
  instituciones: [],
  departamentos: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CODIGO":
      return { ...state, codigo: action.payload };
    case "SET_NOMBRE":
      return { ...state, nombre: action.payload };
    case "SET_DESCRIPCION":
      return { ...state, descripcion: action.payload };
    case "SET_PLANID":
      return { ...state, planid: action.payload };
    case "SET_INSTITUCIONID":
      return { ...state, institucionid: action.payload };
    case "SET_DEPARTAMENTOID":
      return { ...state, departamentoid: action.payload };
    case "SET_PLANES":
      return { ...state, planes: action.payload };
    case "SET_INSTITUCIONES":
      return { ...state, instituciones: action.payload };
    case "SET_DEPARTAMENTOS":
      return { ...state, departamentos: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const FormCompetenciaE = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadData = () => {
    fetchPlanes().then(data => dispatch({ type: "SET_PLANES", payload: data })).catch(console.error);
    fetchInstituciones().then(data => dispatch({ type: "SET_INSTITUCIONES", payload: data })).catch(console.error);
    fetchDepartamentos().then(data => dispatch({ type: "SET_DEPARTAMENTOS", payload: data })).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = () => {
    const { codigo, nombre, descripcion, planid, institucionid, departamentoid } = state;
    console.log({ codigo, nombre, descripcion, planid, institucionid, departamentoid });
    const competencia = { codigo, nombre, descripcion, planid, institucionid, departamentoid };
    createCompetenciaEspecifica(competencia)
      .then(data => {
        console.log('Éxito:', data);
        dispatch({ type: "RESET_FORM" });
        loadData();
      })
      .catch(console.error);
  };

  const handleCancel = () => {
    dispatch({ type: "RESET_FORM" });
    loadData();
  }

  return (
    <>
      <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
        <h2>Competencia específica</h2>
        <div>
          <FormGroup>
            <TextField
              label="Código"
              value={state.codigo}
              onChange={(e) => dispatch({ type: "SET_CODIGO", payload: e.target.value })}
              sx={{ m: 'normal', background: "#EFF1F6" }}
              required
            />
            <TextField
              label="Nombre"
              value={state.nombre}
              onChange={(e) => dispatch({ type: "SET_NOMBRE", payload: e.target.value })}
              margin="normal"
              sx={{ background: "#EFF1F6" }}
              required
            />
            <TextField
              label="Descripción"
              value={state.descripcion}
              onChange={(e) => dispatch({ type: "SET_DESCRIPCION", payload: e.target.value })}
              margin="normal"
              sx={{ background: "#EFF1F6" }}
              required
            />
            <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
              <InputLabel>Plan</InputLabel>
              <Select
                value={state.planid}
                onChange={(e) => dispatch({ type: "SET_PLANID", payload: e.target.value })}
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
                onChange={(e) => dispatch({ type: "SET_INSTITUCIONID", payload: e.target.value })}
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
                onChange={(e) => dispatch({ type: "SET_DEPARTAMENTOID", payload: e.target.value })}
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
      </Container>

      <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </>
  );
}

export default FormCompetenciaE;