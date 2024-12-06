import React from 'react';
import UploadExcelView from './UploadExcelView';
import useUploadExcel from '../general/hooks/useUploaExcel';

function UploadExcel() {
  const { handleFileChange, handleSubmit } = useUploadExcel();

  return (
    <UploadExcelView 
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default UploadExcel;