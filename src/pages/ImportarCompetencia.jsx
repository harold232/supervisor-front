import React, { useState, navigate } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
// import './ImportarCompetencia.css';

const ImportarCompetencia = () => {
    const [importType, setImportType] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
  
    const onDrop = (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    };
  
    const handleAccept = () => {
      if (!selectedFile) {
        alert('Por favor, seleccione un archivo.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const endpoint = importType === 'csv' ? '/api/competencia/importar-csv' : '/api/competencia/importar-excel';
  
      fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        body: formData,
      })
        .then(data => {
          console.log('Éxito:', data);
          navigate('/');
        })
        .catch(console.error);
    };
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
    return (
      <Container className="container">
        <Typography variant="h4" className="title">
          Importar Competencia
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Importación</InputLabel>
          <Select
            value={importType}
            onChange={(e) => setImportType(e.target.value)}
          >
            <MenuItem value="csv">Importar CSV</MenuItem>
            <MenuItem value="excel">Importar Excel</MenuItem>
          </Select>
        </FormControl>
        <Box {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <Typography variant="body1">
            Arrastra y suelta un archivo aquí, o haz clic para seleccionar un archivo
          </Typography>
        </Box>
        {selectedFile && (
          <Typography className="file-selected" sx={{ mt: 2 }}>
            Archivo seleccionado: {selectedFile.name}
          </Typography>
        )}
        <Box className="box">
          <Button variant="contained" className="button-aceptar" onClick={handleAccept}>
            Aceptar
          </Button>
          <Button variant="contained" className="button-cancelar" onClick={() => navigate('/formCompetenciaE')}>
            Cancelar
          </Button>
        </Box>
      </Container>
    );
  };

export default ImportarCompetencia;