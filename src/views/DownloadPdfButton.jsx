import React from 'react';
import { Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const DownloadPdfButton = () => {
  const handleDownloadPdf = () => {
    fetch('http://localhost:8080/api/reporte/pdf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(console.error);
  };

  return (
    <Button
      variant="contained"
      onClick={handleDownloadPdf}
      className="button-pdf"
      startIcon={<PictureAsPdfIcon />}
    >
      Descargar Reporte de Competencias
    </Button>
  );
};

export default DownloadPdfButton;