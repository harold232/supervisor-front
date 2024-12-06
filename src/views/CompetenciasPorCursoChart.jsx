import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const CompetenciasPorCursoChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/competencia/estadisticas/competencias-por-curso'
        );
        const result = await response.json();

        const transformedData = transformData(result);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const transformData = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const { nombreCurso, tipoCompetencia, totalCompetencias } = item;

      if (!groupedData[nombreCurso]) {
        groupedData[nombreCurso] = { nombreCurso, E: 0, G: 0 };
      }
      groupedData[nombreCurso][tipoCompetencia] = totalCompetencias;
    });

    return Object.values(groupedData);
  };

  return (
    <BarChart
      xAxis={[{ dataKey: 'nombreCurso', label: 'Curso', scaleType: 'band' }]}
      series={[
        { dataKey: 'E', label: 'Específicas', color: '#71384d' },
        { dataKey: 'G', label: 'Generales', color: '#ae675b' }
      ]}
      dataset={data}
      width={300}
      height={200}
    />
  );
};

export default CompetenciasPorCursoChart;
