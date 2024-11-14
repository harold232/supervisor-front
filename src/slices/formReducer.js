import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    codigo: '',
    nombre: '',
    descripcion: '',
    planid: '',
    institucionid: '',
    departamentoid: '',
    planes: [],
    instituciones: [],
    departamentos: []
  },
  reducers: {
    setCodigo: (state, action) => {
      state.codigo = action.payload;
    },
    setNombre: (state, action) => {
      state.nombre = action.payload;
    },
    setDescripcion: (state, action) => {
      state.descripcion = action.payload;
    },
    setPlanid: (state, action) => {
      state.planid = action.payload;
    },
    setInstitucionid: (state, action) => {
      state.institucionid = action.payload;
    },
    setDepartamentoid: (state, action) => {
      state.departamentoid = action.payload;
    },
    setPlanes: (state, action) => {
      state.planes = action.payload;
    },
    setInstituciones: (state, action) => {
      state.instituciones = action.payload;
    },
    setDepartamentos: (state, action) => {
      state.departamentos = action.payload;
    },
    resetForm: (state) => {
      return formSlice.getInitialState();
    }
  }
});

export const { setCodigo, setNombre, setDescripcion, setPlanid, setInstitucionid, setDepartamentoid, setPlanes, setInstituciones, setDepartamentos, resetForm } = formSlice.actions;
export default formSlice.reducer;