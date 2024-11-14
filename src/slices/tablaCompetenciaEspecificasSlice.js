
import { createSlice } from '@reduxjs/toolkit';

const tablaCompetenciaEspecificasSlice = createSlice({
  name: 'tablaCompetenciaEspecificas',
  initialState: {
    competenciasEspecificas: [],
    order: 'asc',
    orderBy: 'nombre'
  },
  reducers: {
    loadData: (state, action) => {
      state.competenciasEspecificas = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload.order;
      state.orderBy = action.payload.orderBy;
    },
    deleteCompetencia: (state, action) => {
      state.competenciasEspecificas = state.competenciasEspecificas.filter(c => c.id !== action.payload);
    },
    editCompetencia: (state, action) => {
      state.competenciasEspecificas = state.competenciasEspecificas.map(c =>
        c.id === action.payload.id ? { ...c, nombre: action.payload.updatedNombre } : c
      );
    }
  }
});

export const { loadData, setOrder, deleteCompetencia, editCompetencia } = tablaCompetenciaEspecificasSlice.actions;
export default tablaCompetenciaEspecificasSlice.reducer;