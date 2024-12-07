import React, { useState } from 'react';
import { TextField, Container, FormGroup, Button, Typography } from '@mui/material';

function FormularioInstitucion() {
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nombreCorto, setNombreCorto] = useState("");
  const [nombreLargo, setNombreLargo] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [estado, setEstado] = useState("");

  const [warning, setWarning] = useState("");
  const [showFields, setShowFields] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !codigo || !nombreCorto || !nombreLargo || !nombreComercial || !estado ) {
      setWarning("Todos los campos son obligatorios.");
      return;
    }

    setWarning("");

    fetch(`http://localhost:8080/api/institucion/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigo, nombreCorto, nombreLargo, nombreComercial, estado }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Institución actualizada:', data);
      })
      .catch(error => {
        console.error('Error al actualizar:', error);
      });
  };

  const handleReset = () => {
    setId("");
    setCodigo("");
    setNombreCorto("");
    setNombreLargo("");
    setNombreComercial("");
    setEstado("");
    setWarning("");
    setShowFields(false);
  };

  const handleSearch = () => {
    if (!id) {
      setWarning("Por favor, ingrese un ID.");
      return;
    }

    fetch(`http://localhost:8080/api/institucion/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setCodigo(data.codigo || "");
          setNombreCorto(data.nombreCorto || "");
          setNombreLargo(data.nombreLargo || "");
          setNombreComercial(data.nombreComercial || "");
          setEstado(data.estado || "");
          setWarning("");
          setShowFields(true);
        } else {
          setWarning("No se encontraron datos para este ID.");
        }
      })
      .catch(error => {
        console.error('Error al buscar la institucion:', error);
        setWarning("Hubo un error al buscar la institucion.");
      });
  };

  return (
    <Container sx={{ maxWidth: 600, backgroundColor: '#E1E2E7', borderRadius: 5, padding: 2 }}>
      <h2 style={{ textAlign: 'center' }}>Modificar Institución Educativa</h2>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            label="ID"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
            sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Buscar
            </Button>
          </div>
          
          {warning && (
            <Typography color="error" align="center" sx={{ marginTop: 2 }}>
              {warning}
            </Typography>
          )}
        </FormGroup>
      </form>

      {showFields && (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              label="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Nombre Corto"
              type="string"
              value={nombreCorto}
              onChange={(e) => setNombreCorto(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Nombre Largo"
              type="string"
              value={nombreLargo}
              onChange={(e) => setNombreLargo(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Nombre Comercial"
              type="string"
              value={nombreComercial}
              onChange={(e) => setNombreComercial(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
          </FormGroup>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Limpiar
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
}

export default FormularioInstitucion;
