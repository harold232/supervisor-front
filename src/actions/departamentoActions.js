import { iniciaCargaDepartamentos, cargaDepartamentos, setError } from '../slices/deparamentoSlice';

const urlBack = import.meta.env.VITE_APP_BACKEND_URL;
const departamento = import.meta.env.VITE_APP_API_DEPARTAMENTOS;

export const fetchDepartamentos = () => {
  return async (dispatch) => {
    dispatch(iniciaCargaDepartamentos());

    try {
      const response = await fetch(`${urlBack + departamento}/all`);
      const data = await response.json();
      dispatch(cargaDepartamentos(data));
    } catch (error) {
      console.error('Error fetching departamentos:', error);
      dispatch(setError(error.toString()));
    }
  };
};