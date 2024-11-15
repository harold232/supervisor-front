import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formReducer';
import tablaCompetenciaEspecificasReducer from '../slices/tablaCompetenciaEspecificasSlice';
import tablaCompetenciaGeneralesReducer from '../slices/tablaCompetenciaGeneralesSlice';
import departamentoReducer from '../slices/deparamentoSlice';
import planReducer from '../slices/planSlice';
import institucionReducer from '../slices/institucionSlice';
import competenciaReducer from '../slices/competenciaSlice';

const store = configureStore({
    reducer: {
      form: formReducer,
      tablaCompetenciaEspecificas: tablaCompetenciaEspecificasReducer,
      tablaCompetenciaGenerales: tablaCompetenciaGeneralesReducer,
      departamento: departamentoReducer,
      plan: planReducer,
      institucion: institucionReducer,
      competencia: competenciaReducer,
    },
  });

export default store;