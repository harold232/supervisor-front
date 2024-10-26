import { useState, useEffect } from "react";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import Buttons from "../views/Buttons";

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
    // Fetch planes data
    fetch('http://localhost:8080/api/plan-estudios/all')
      .then(response => response.json())
      .then(data => setPlanes(data))
      .catch(error => console.error('Error fetching planes:', error));

    // Fetch instituciones data
    fetch('http://localhost:8080/api/institucion/instituciones-educativas')
      .then(response => response.json())
      .then(data => setInstituciones(data))
      .catch(error => console.error('Error fetching instituciones:', error));

    // Fetch departamentos data
    fetch('http://localhost:8080/api/departamento/all')
      .then(response => response.json())
      .then(data => setDepartamentos(data))
      .catch(error => console.error('Error fetching departamentos:', error));
  }, []);


  const handleSubmit = () => {
    console.log({ codigo, nombre, descripcion, tipo, nivel, competenciaGeneralId });

    fetch('http://localhost:8080/api/competencia/especifica', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigo, nombre, descripcion, tipo, nivel, competenciaGeneralId }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Éxito:', data);
        setCodigo("");
        setNombre("");
        setDescripcion("");
        setPlanid("");
        setInstitucionid("");
        setDepartamentoid("");
      })
      .catch(error => {
        console.error('Error:', error);
      });
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