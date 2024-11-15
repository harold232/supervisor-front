import { iniciaCargaInstituciones, cargaInstituciones, setError } from '../slices/institucionSlice';

const urlBack = import.meta.env.VITE_APP_BACKEND_URL;
const institucion = import.meta.env.VITE_APP_API_INSTITUCIONES;

export const fetchInstituciones = () => {
  return async (dispatch) => {
    dispatch(iniciaCargaInstituciones());
    try {
      const response = await fetch(`${urlBack + institucion}/all`);
      const data = await response.json();
      dispatch(cargaInstituciones(data));
    } catch (error) {
      console.error('Error fetching instituciones:', error);
      dispatch(setError(error.toString()));
    }
  };
};