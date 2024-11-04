export const fetchPlanes = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/plan-estudios/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching planes:', error);
        throw error;
    }
};