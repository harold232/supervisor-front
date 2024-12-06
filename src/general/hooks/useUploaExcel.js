import { useState } from 'react';

function useUploadExcel() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/v1/planestudios/cargar', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Archivo cargado exitosamente");
        } else {
          alert("Error al cargar el archivo");
        }
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al cargar el archivo:", error);
        alert("Error al cargar el archivo");
      });
  };

  return {
    file,
    handleFileChange,
    handleSubmit,
  };
}

export default useUploadExcel;