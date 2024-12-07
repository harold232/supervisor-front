export const fetchInstituciones = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/institucion/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener instituciones:', error);
        throw error;
    }
};

export const deleteInstitucion = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/institucion/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la institucion');
        }
    } catch (error) {
        console.error('Error al eliminar la institucion:', error);
        throw error;
    }
};

export const editInstitucion = async (id, updatedInstitucion) => {
    try {
        const response = await fetch(`http://localhost:8080/api/institucion/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInstitucion),
        });
        if (!response.ok) {
            console.log(updatedInstitucion);
            throw new Error('Error al editar la institucion');
        }
    } catch (error) {
        console.error('Error al editar la institucion:', error);
        throw error;
    }
};

export const createInstitucion = async (institucion) => {
    try {
        const response = await fetch('http://localhost:8080/api/institucion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(institucion),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchInstitucionById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/institucion1/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la institucion:', error);
        throw error;
    }
};