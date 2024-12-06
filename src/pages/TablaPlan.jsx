import { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    CircularProgress,
} from "@mui/material";

const TablaPlan = () => {
    const [planSeleccionado, setPlanSeleccionado] = useState(null);
    const [codigo, setCodigo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Para manejar errores generales

    const handleBuscar = () => {
        // Validar que el código no esté vacío
        if (!codigo.trim()) {
            setError("Por favor ingresa un código para buscar.");
            return;
        }

        setLoading(true); // Activar el estado de carga
        setError(null); // Resetear errores

        // Realizar la solicitud al backend
        fetch(`http://localhost:8080/api/plan/codigo/${codigo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener el plan. Intenta nuevamente.");
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setPlanSeleccionado(data); // Guardar el plan seleccionado en el estado
                } else {
                    setPlanSeleccionado(null);
                    setError("No se encontró un plan con ese código.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(
                    error.message || "Hubo un problema al conectarse con el servidor."
                );
            })
            .finally(() => {
                setLoading(false); // Desactivar el estado de carga
            });
    };

    return (
        <Container
            sx={{
                borderRadius: 5,
                pb: 2,
                textAlign: "center",
                background: "#E1E2E7",
                mt: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Búsqueda de Plan de Estudio
            </Typography>

            {/* Campo para ingresar el código y botón de búsqueda */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Código del Plan"
                    variant="outlined"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={handleBuscar}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Buscar"}
                </Button>
            </Box>

            {/* Mostrar errores */}
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Mostrar el plan seleccionado si existe */}
            {planSeleccionado ? (
                <Paper sx={{ p: 3, mt: 2 }}>
                    <Typography variant="h6">Detalles del Plan</Typography>
                    <Typography>ID: {planSeleccionado.id}</Typography>
                    <Typography>Código: {planSeleccionado.codigo}</Typography>
                    <Typography>Descripción: {planSeleccionado.descripcion}</Typography>
                    <Typography>Vigencia: {planSeleccionado.vigencia}</Typography>
                    <Typography>
                        Institución ID: {planSeleccionado.institucionId}
                    </Typography>
                    <Typography>
                        Departamento ID: {planSeleccionado.departamentoId}
                    </Typography>
                    <Typography>Carrera ID: {planSeleccionado.carreraId}</Typography>
                    <Typography>Estado: {planSeleccionado.estado}</Typography>
                </Paper>
            ) : !loading && !error ? (
                <Typography variant="body1">
                    Introduce un código para buscar un plan.
                </Typography>
            ) : null}
        </Container>
    );
};

export default TablaPlan;
