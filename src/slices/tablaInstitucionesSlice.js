import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  instituciones: [],
  order: 'asc',
  orderBy: 'codigo',
};

const tablaInstitucionesSlice = createSlice({
  name: 'tablaInstituciones',
  initialState,
  reducers: {
    loadData: (state, action) => {
      state.instituciones = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload.order;
      state.orderBy = action.payload.orderBy;
    },
  },
});

export const { loadData, setOrder } = tablaInstitucionesSlice.actions;
export default tablaInstitucionesSlice.reducer;