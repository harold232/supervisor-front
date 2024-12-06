import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './Card.css'

const EspecificasCompetenciasCard = () => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/competencia/count-especificas');
          const data = await response.json();
          setCount(data);
        } catch (error) {
          console.error('Error fetching count:', error);
        }
      };
  
      fetchCount();
    }, []);
  
    return (
      <Card sx={{ borderRadius: "10px", marginBottom: "30px" }}>
        <CardContent className='card'>
          <Typography variant="h5" component="div" className='text-card'>
            Competencias Específicas
          </Typography>
          <Typography variant="h4" component="p" className='text-card-count'>
            {count}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default EspecificasCompetenciasCard;