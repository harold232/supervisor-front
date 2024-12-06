import React from 'react';
import Slider from 'react-slick';
import CompetenciasPorCursoChart from "./CompetenciasPorCursoChart";
import PromedioCreditosHorasChart from "./PromedioCreditosHorasChar";
import CompetenciaTipoPieChart from "./CompetenciaTipoPieChart";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const GraficosCarrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <CompetenciaTipoPieChart />
      </div>
      <div>
        <CompetenciasPorCursoChart />
      </div>
      <div>
        <PromedioCreditosHorasChart />
      </div>
    </Slider>
  );
};

export default GraficosCarrusel;