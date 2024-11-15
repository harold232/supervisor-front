import { createSlice } from '@reduxjs/toolkit';

const departamentoSlice = createSlice({
  name: 'departamento',
  initialState: {
    departamentos: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    iniciaCargaDepartamentos: (state) => {
      state.isLoading = true;
    },
    cargaDepartamentos: (state, action) => {
      state.departamentos = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { iniciaCargaDepartamentos, cargaDepartamentos, setError } = departamentoSlice.actions;
export default departamentoSlice.reducer;