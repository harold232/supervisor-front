import React from 'react';
import './UploadExcelView.css'; 

function UploadExcelView({ handleFileChange, handleSubmit }) {
  return (
    <div className="upload-excel-header" style={{ textAlign: 'center' }}>
      <h1>Plan de Estudios</h1>
      <h2>Cargar Plan de Estudios</h2>
      <form onSubmit={handleSubmit} className="upload-excel-form" style={{ display: 'inline-block' }}>
        <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
}

export default UploadExcelView;