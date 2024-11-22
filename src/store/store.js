import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formReducer';
import tablaCompetenciaEspecificasReducer from '../slices/tablaCompetenciaEspecificasSlice';
import tablaCompetenciaGeneralesReducer from '../slices/tablaCompetenciaGeneralesSlice';
import tablaCompetenciasReducer from '../slices/tablaCompetenciasSlice';

const store = configureStore({
    reducer: {
      form: formReducer,
      tablaCompetenciaEspecificas: tablaCompetenciaEspecificasReducer,
      tablaCompetenciaGenerales: tablaCompetenciaGeneralesReducer,
      tablaCompetencias: tablaCompetenciasReducer,
    },
  });

export default store;