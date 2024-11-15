import { iniciaCargaPlanes, cargaPlanes, setError } from '../slices/planSlice';

const urlBack = import.meta.env.VITE_APP_BACKEND_URL;
const plan = import.meta.env.VITE_APP_API_PLANES;

export const fetchPlanes = () => {
  return async (dispatch) => {
    dispatch(iniciaCargaPlanes());
    try {
      const response = await fetch(`${urlBack + plan}/all`);
      const data = await response.json();
      dispatch(cargaPlanes(data));
    } catch (error) {
      console.error('Error fetching planes:', error);
      dispatch(setError(error.toString()));
    }
  };
};