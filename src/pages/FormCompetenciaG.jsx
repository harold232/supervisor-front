import { useState } from "react";
import { Container, FormGroup, TextField } from "@mui/material"
import Buttons from "../views/Buttons";

const FormCompetenciaG = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [nivel, setNivel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ codigo, nombre, descripcion, tipo, nivel });
    fetch('http://localhost:8080/api/competencia/general', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigo, nombre, descripcion, tipo, nivel }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Éxito:', data);
        setCodigo("");
        setNombre("");
        setDescripcion("");
        setTipo("");
        setNivel("");
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
  };

  return (
    <>

      <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
        <h2>Competencia general</h2>
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
          </FormGroup>
        </div>
      </Container>
      <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel}></Buttons>
    </>
  );
};

export default FormCompetenciaG;