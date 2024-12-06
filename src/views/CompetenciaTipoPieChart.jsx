import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function CompetenciaTipoPieChart() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/competencia/estadisticas');
        const result = await response.json();
        setData(result.map(item => ({
          tipo: item.tipo === 'G' ? 'General' : 'Específica', // Cambiamos 'G' por 'General' y 'E' por 'Específica'
          total: item.total,
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart
    colors={['#71384d', '#ae675b']} // Cambiamos los colores de las secciones
      series={[
        {
          data: data.map(item => ({
            name: item.tipo,
            value: item.total,
          })),
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 20, additionalRadius: -10, color: 'gray' },
          tooltip: {
            valueFormatter: (value) => `${value}`,  // Muestra el valor
            formatter: (item) => `${item.name}: ${item.value}`, // Muestra el tipo y el total
          },
        },
      ]}
      height={200}
    />
  );
}
