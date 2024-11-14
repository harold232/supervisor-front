import { createSlice } from '@reduxjs/toolkit';

const tablaCompetenciaGeneralesSlice = createSlice({
  name: 'tablaCompetenciaGenerales',
  initialState: {
    competenciasGenerales: [],
    order: 'asc',
    orderBy: 'nombre'
  },
  reducers: {
    loadData: (state, action) => {
      state.competenciasGenerales = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload.order;
      state.orderBy = action.payload.orderBy;
    },
    deleteCompetencia: (state, action) => {
      state.competenciasGenerales = state.competenciasGenerales.filter(c => c.id !== action.payload);
    },
    editCompetencia: (state, action) => {
      state.competenciasGenerales = state.competenciasGenerales.map(c =>
        c.id === action.payload.id ? { ...c, nombre: action.payload.updatedNombre } : c
      );
    }
  }
});

export const { loadData, setOrder, deleteCompetencia, editCompetencia } = tablaCompetenciaGeneralesSlice.actions;
export default tablaCompetenciaGeneralesSlice.reducer;