import { createSlice } from '@reduxjs/toolkit';

const institucionSlice = createSlice({
  name: 'institucion',
  initialState: {
    instituciones: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    iniciaCargaInstituciones: (state) => {
      state.isLoading = true;
    },
    cargaInstituciones: (state, action) => {
      state.instituciones = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { iniciaCargaInstituciones, cargaInstituciones, setError } = institucionSlice.actions;
export default institucionSlice.reducer;