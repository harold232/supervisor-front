import {
  iniciaCargaCompetencias,
  cargaCompetenciasEspecificas,
  cargaCompetenciasGenerales,
  setError,
  deleteCompetenciaEspecifica,
  deleteCompetenciaGeneral,
  editCompetenciaEspecifica,
  editCompetenciaGeneral,
  addCompetenciaEspecifica,
  addCompetenciaGeneral,
  } from '../slices/competenciaSlice';
  
  const urlBack = import.meta.env.VITE_APP_BACKEND_URL;
  const competencias = import.meta.env.VITE_APP_API_COMPETENCIAS;
  
  export const fetchCompetenciasEspecificas = () => {
    return async (dispatch) => {
      dispatch(iniciaCargaCompetencias());
      try {
        const response = await fetch(`${urlBack + competencias}/competencias-especificas`);
        const data = await response.json();
        dispatch(cargaCompetenciasEspecificas(data));
      } catch (error) {
        console.error('Error al obtener competencias especificas:', error);
        dispatch(setError(error.toString()));
      }
    };
  };
  
  export const fetchCompetenciasGenerales = () => {
    return async (dispatch) => {
      dispatch(iniciaCargaCompetencias());
      try {
        const response = await fetch(`${urlBack + competencias}/competencias-generales`);
        const data = await response.json();
        dispatch(cargaCompetenciasGenerales(data));
      } catch (error) {
        console.error('Error al obtener competencias generales:', error);
        dispatch(setError(error.toString()));
      }
    };
  };
  
  export const deleteCompetencia = (id) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${urlBack + competencias}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar la competencia');
        }
        dispatch(deleteCompetenciaEspecifica(id)); // or deleteCompetenciaGeneral(id) based on context
      } catch (error) {
        console.error('Error al eliminar la competencia:', error);
        dispatch(setError(error.toString()));
      }
    };
  };
  
  export const editCompetencia = (id, updatedCompetencia) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${urlBack + competencias}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre: updatedCompetencia }),
        });
        if (!response.ok) {
          throw new Error('Error al editar la competencia');
        }
        dispatch(editCompetenciaEspecifica({ id, updatedNombre: updatedCompetencia })); // or editCompetenciaGeneral based on context
      } catch (error) {
        console.error('Error al editar la competencia:', error);
        dispatch(setError(error.toString()));
      }
    };
  };
  
  export const createCompetenciaEspecifica = (competencia) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${urlBack + competencias}/especifica`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(competencia),
        });
        const data = await response.json();
        dispatch(addCompetenciaEspecifica(data));
        return data;
      } catch (error) {
        console.error('Error:', error);
        dispatch(setError(error.toString()));
        throw error;
      }
    };
  };
  
  export const createCompetenciaGeneral = (competencia) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${urlBack + competencias}/general`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(competencia),
        });
        const data = await response.json();
        dispatch(addCompetenciaGeneral(data));
        return data;
      } catch (error) {
        console.error('Error:', error);
        dispatch(setError(error.toString()));
        throw error;
      }
    };
  };