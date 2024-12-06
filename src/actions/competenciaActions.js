export const fetchCompetenciasEspecificas = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/competencia/competencias-especificas');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener competencias especificas:', error);
        throw error;
    }
};

export const fetchCompetenciasGenerales = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/competencia/competencias-generales');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener competencias generales:', error);
        throw error;
    }
};

export const fetchCompetencias = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/competencia/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener competencias :', error);
        throw error;
    }
};


export const deleteCompetencia = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/competencia/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la competencia');
        }
    } catch (error) {
        console.error('Error al eliminar la competencia:', error);
        throw error;
    }
};

export const editCompetencia = async (id, updatedCompetencia) => {
    try {
        const response = await fetch(`http://localhost:8080/api/competencia/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCompetencia),
        });
        if (!response.ok) {
            console.log(updatedCompetencia);
            throw new Error('Error al editar la competenciaa');
        }
    } catch (error) {
        console.error('Error al editar la competencia:', error);
        throw error;
    }
};

export const createCompetenciaEspecifica = async (competencia) => {
    try {
        const response = await fetch('http://localhost:8080/api/competencia/especifica', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(competencia),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const createCompetenciaGeneral = async (competencia) => {
    try {
        const response = await fetch('http://localhost:8080/api/competencia/general', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(competencia),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchCompetenciaById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/competencia/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la competencia:', error);
        throw error;
    }
};