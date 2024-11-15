import { createSlice } from '@reduxjs/toolkit';

const planSlice = createSlice({
  name: 'plan',
  initialState: {
    planes: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    iniciaCargaPlanes: (state) => {
      state.isLoading = true;
    },
    cargaPlanes: (state, action) => {
      state.planes = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { iniciaCargaPlanes, cargaPlanes, setError } = planSlice.actions;
export default planSlice.reducer;