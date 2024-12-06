import React, { useState } from 'react';
import { TextField, Container, FormGroup, Button, Typography } from '@mui/material';

function Formulario() {
  // Definición de los estados para cada campo
  const [id, setId] = useState("");  
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [vigencia, setVigencia] = useState("");
  const [institucionId, setInstitucionId] = useState("");
  const [departamentoId, setDepartamentoId] = useState("");
  const [carreraId, setCarreraId] = useState("");
  const [estado, setEstado] = useState("");
  
  // Estado para manejar el mensaje de advertencia
  const [warning, setWarning] = useState("");
  // Estado para controlar la visibilidad de los campos adicionales
  const [showFields, setShowFields] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: Verificar que todos los campos están llenos
    if (!id || !codigo || !descripcion || !vigencia || !institucionId || !departamentoId || !carreraId || !estado) {
      setWarning("Todos los campos son obligatorios.");
      return;
    }

  
    
    // Si todos los campos son válidos, limpiamos el mensaje de advertencia
    setWarning("");

    // Realizamos la llamada al servidor
    fetch(`http://localhost:8080/api/plan/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigo, descripcion, vigencia, institucionId, departamentoId, carreraId, estado }), // Enviamos todos los campos
    })
      .then(response => response.json())
      .then(data => {
        console.log('Plan actualizado:', data);
        // Aquí puedes realizar alguna acción adicional tras la actualización exitosa
      })
      .catch(error => {
        console.error('Error al actualizar el plan:', error);
      });
  };

  // Función para limpiar el formulario
  const handleReset = () => {
    setId("");
    setCodigo("");
    setDescripcion("");
    setVigencia("");
    setInstitucionId("");
    setDepartamentoId("");
    setCarreraId("");
    setEstado("");
    setWarning("");  // Limpiar también el mensaje de advertencia
    setShowFields(false); // Ocultar los campos adicionales
  };

  // Función para manejar la búsqueda del plan
  const handleSearch = () => {
    if (!id) {
      setWarning("Por favor, ingrese un ID.");
      return;
    }

    // Llamada al servidor para obtener los datos del plan por ID
    fetch(`http://localhost:8080/api/plan/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setCodigo(data.codigo || "");
          setDescripcion(data.descripcion || "");
          setVigencia(data.vigencia || "");
          setInstitucionId(data.institucionId || "");
          setDepartamentoId(data.departamentoId || "");
          setCarreraId(data.carreraId || "");
          setEstado(data.estado || "");
          setWarning(""); // Limpiar cualquier advertencia previa
          setShowFields(true); // Mostrar los campos adicionales
        } else {
          setWarning("No se encontraron datos para este ID.");
        }
      })
      .catch(error => {
        console.error('Error al buscar el plan:', error);
        setWarning("Hubo un error al buscar el plan.");
      });
  };

  return (
    <Container sx={{ maxWidth: 600, backgroundColor: '#E1E2E7', borderRadius: 5, padding: 2 }}>
      <h2 style={{ textAlign: 'center' }}>Modificar Plan de Estudios</h2>
      
      {/* Formulario inicial con solo el campo ID */}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          {/* Campo para 'id' */}
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
          
          {/* Mostrar mensaje de advertencia si hay un error */}
          {warning && (
            <Typography color="error" align="center" sx={{ marginTop: 2 }}>
              {warning}
            </Typography>
          )}
        </FormGroup>
      </form>

      {/* Mostrar los campos adicionales solo si se realizó la búsqueda correctamente */}
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
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Vigencia"
              value={vigencia}
              onChange={(e) => setVigencia(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Institución ID"
              type="number"
              value={institucionId}
              onChange={(e) => setInstitucionId(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Departamento ID"
              type="number"
              value={departamentoId}
              onChange={(e) => setDepartamentoId(e.target.value)}
              fullWidth
              sx={{ mb: 2, backgroundColor: "#EFF1F6" }}
              required
            />
            <TextField
              label="Carrera ID"
              type="number"
              value={carreraId}
              onChange={(e) => setCarreraId(e.target.value)}
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

export default Formulario;
