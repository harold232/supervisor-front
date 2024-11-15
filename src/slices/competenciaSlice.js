import { createSlice } from '@reduxjs/toolkit';

const competenciaSlice = createSlice({
  name: 'competencia',
  initialState: {
    competenciasEspecificas: [],
    competenciasGenerales: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    iniciaCargaCompetencias: (state) => {
      state.isLoading = true;
    },
    cargaCompetenciasEspecificas: (state, action) => {
      state.competenciasEspecificas = action.payload;
      state.isLoading = false;
    },
    cargaCompetenciasGenerales: (state, action) => {
      state.competenciasGenerales = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteCompetenciaEspecifica: (state, action) => {
      state.competenciasEspecificas = state.competenciasEspecificas.filter(c => c.id !== action.payload);
    },
    deleteCompetenciaGeneral: (state, action) => {
      state.competenciasGenerales = state.competenciasGenerales.filter(c => c.id !== action.payload);
    },
    editCompetenciaEspecifica: (state, action) => {
      state.competenciasEspecificas = state.competenciasEspecificas.map(c =>
        c.id === action.payload.id ? { ...c, nombre: action.payload.updatedNombre } : c
      );
    },
    editCompetenciaGeneral: (state, action) => {
      state.competenciasGenerales = state.competenciasGenerales.map(c =>
        c.id === action.payload.id ? { ...c, nombre: action.payload.updatedNombre } : c
      );
    },
    addCompetenciaEspecifica: (state, action) => {
      state.competenciasEspecificas.push(action.payload);
    },
    addCompetenciaGeneral: (state, action) => {
      state.competenciasGenerales.push(action.payload);
    },
  },
});

export const {
  iniciaCargaCompetencias,
  cargaCompetenciasEspecificas,
  cargaCompetenciasGenerales,
  setError,
  deleteCompetenciaEspecifica,
  deleteCompetenciaGeneral,
  editCompetenciaEspecifica,
  editCompetenciaGeneral,
  addCompetenciaEspecifica,
  addCompetenciaGeneral,
} = competenciaSlice.actions;
export default competenciaSlice.reducer;