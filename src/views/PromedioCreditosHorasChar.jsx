import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function PromedioHorasBarChart() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/competencia/estadisticas/promedio-creditos-horas');
                const result = await response.json();
                setData(result.map(item => ({
                    codigoCompetencia: item.codigoCompetencia,
                    promedioHoras: item.promedioHoras,
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <BarChart
            colors={['#ae675b', '#ae675b']}
            dataset={data}
            xAxis={[{ dataKey: 'promedioHoras', label: 'Promedio Horas por Competencia' }]} 
            yAxis={[{ scaleType: 'band', dataKey: 'codigoCompetencia' }]}
            series={[{ dataKey: 'promedioHoras', label: 'Promedio Horas' }]}
            layout="horizontal"
            width={300}
            height={200}
        />
    );
}
