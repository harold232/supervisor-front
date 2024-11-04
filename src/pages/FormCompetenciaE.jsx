import { useState, useEffect } from "react";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import Buttons from "../views/Buttons";
import { fetchPlanes } from "../actions/planActions";
import { fetchInstituciones } from "../actions/institucionActions";
import { fetchDepartamentos } from "../actions/departamentoActions";
import { createCompetenciaEspecifica } from "../actions/competenciaActions";

const FormCompetenciaE = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [planid, setPlanid] = useState("");
  const [institucionid, setInstitucionid] = useState("");
  const [departamentoid, setDepartamentoid] = useState("");
  const [planes, setPlanes] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    fetchPlanes().then(setPlanes).catch(console.error);
    fetchInstituciones().then(setInstituciones).catch(console.error);
    fetchDepartamentos().then(setDepartamentos).catch(console.error);
  }, []);


  const handleSubmit = () => {
    console.log({ codigo, nombre, descripcion, planid, institucionid, departamentoid });
    const competencia = { codigo, nombre, descripcion, planid, institucionid, departamentoid };
    createCompetenciaEspecifica(competencia)
      .then(data => {
        console.log('Éxito:', data);
        setCodigo("");
        setNombre("");
        setDescripcion("");
        setPlanid("");
        setInstitucionid("");
        setDepartamentoid("");
      })
      .catch(console.error);
  };

  const handleCancel = () => {
    setCodigo("");
    setNombre("");
    setDescripcion("");
    setPlanid("");
    setInstitucionid("");
    setDepartamentoid("");
  }

  return (
    <>
      <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
        <h2>Competencia especifica</h2>
        <div>
          <FormGroup>
            <TextField
              label="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              sx={{ m: 'normal', background: "#EFF1F6" }}
              required
            />
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              margin="normal"
              sx={{ background: "#EFF1F6" }}
              required
            />
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              margin="normal"
              sx={{ background: "#EFF1F6" }}
              required
            />
            <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
              <InputLabel>Plan</InputLabel>
              <Select
                value={planid}
                onChange={(e) => setPlanid(e.target.value)}
              >
                {planes.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.codigo} - {plan.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
              <InputLabel>Institucion</InputLabel>
              <Select
                value={institucionid}
                onChange={(e) => setInstitucionid(e.target.value)}
              >
                {instituciones.map((institucion) => (
                  <MenuItem key={institucion.id} value={institucion.id}>
                    {institucion.codigo} - {institucion.nombreCorto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
              <InputLabel>Departamento</InputLabel>
              <Select
                value={departamentoid}
                onChange={(e) => setDepartamentoid(e.target.value)}
              >
                {departamentos.map((departamento) => (
                  <MenuItem key={departamento.id} value={departamento.id}>
                    {departamento.codigo} - {departamento.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
        </div>
      </Container>

      <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel}></Buttons>
    </>
  );
}

export default FormCompetenciaE;