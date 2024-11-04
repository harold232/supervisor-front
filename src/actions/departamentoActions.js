export const fetchDepartamentos = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/departamento/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching departamentos:', error);
        throw error;
    }
};