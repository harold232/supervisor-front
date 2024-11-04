export const fetchInstituciones = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/institucion/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching instituciones:', error);
        throw error;
    }
};