import { useState, useEffect } from "react";
import { Container, FormGroup, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import Buttons from "../views/Buttons";

const FormCompetenciaE = () => {

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [nivel, setNivel] = useState("");
  const [competenciaGeneralId, setCompetenciaGeneral] = useState("");
  const [competenciasGenerales, setCompetenciasGenerales] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/competencia/competencias-generales')
      .then(response => response.json())
      .then(data => setCompetenciasGenerales(data))
      .catch(error => console.error('Error al obtener competencias generales:', error));
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
        setTipo("");
        setNivel("");
        setCompetenciaGeneral("");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCancel = () => {
    setCodigo("");
    setNombre("");
    setDescripcion("");
    setTipo("");
    setNivel("");
    setCompetenciaGeneral("");
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
            <TextField
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              margin="normal"
              sx={{ background: "#EFF1F6" }}
              required
            />
            <TextField
              label="Nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              margin="normal"
              sx={{ background: "#EFF1F6" }}
              required
            />
            <FormControl margin="normal" sx={{ background: "#EFF1F6" }} required>
                <InputLabel>Competencia General</InputLabel>
                <Select
                  value={competenciaGeneralId}
                  onChange={(e) => setCompetenciaGeneral(e.target.value)}
                >
                  {competenciasGenerales.map((competencia) => (
                    <MenuItem key={competencia.id} value={competencia.id}>
                      {competencia.codigo} - {competencia.nombre}
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