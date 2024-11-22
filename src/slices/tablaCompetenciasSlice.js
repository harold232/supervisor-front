import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  competencias: [],
  order: 'asc',
  orderBy: 'codigo',
};

const tablaCompetenciasSlice = createSlice({
  name: 'tablaCompetencias',
  initialState,
  reducers: {
    loadData: (state, action) => {
      state.competencias = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload.order;
      state.orderBy = action.payload.orderBy;
    },
  },
});

export const { loadData, setOrder } = tablaCompetenciasSlice.actions;
export default tablaCompetenciasSlice.reducer;