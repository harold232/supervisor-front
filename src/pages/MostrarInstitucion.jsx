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

const TablaInstitucion = () => {
    const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null);
    const [codigo, setCodigo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBuscar = () => {
        if (!codigo.trim()) {
            setError("Por favor ingresa un código para buscar.");
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/institucion/codigo/${codigo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener la institucion. Intenta nuevamente.");
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setInstitucionSeleccionada(data);
                } else {
                    setInstitucionSeleccionada(null);
                    setError("No se encontró una institucion con ese código.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(
                    error.message || "Hubo un problema al conectarse con el servidor."
                );
            })
            .finally(() => {
                setLoading(false);
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
                Búsqueda de Institución
            </Typography>

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Código de la Institución"
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

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {institucionSeleccionada ? (
                <Paper sx={{ p: 3, mt: 2 }}>
                    <Typography variant="h6">Detalles de la Institución</Typography>
                    <Typography>ID: {institucionSeleccionada.id}</Typography>
                    <Typography>Código: {institucionSeleccionada.codigo}</Typography>
                    <Typography>Nombre Corto: {institucionSeleccionada.nombreCorto}</Typography>
                    <Typography>Nombre Largo: {institucionSeleccionada.nombreLargo}</Typography>
                    <Typography>Nombre Comercial: {institucionSeleccionada.nombreComercial}</Typography>
                    <Typography>Estado: {institucionSeleccionada.estado}</Typography>
                </Paper>
            ) : !loading && !error ? (
                <Typography variant="body1">
                    Introduce un código para buscar una institución.
                </Typography>
            ) : null}
        </Container>
    );
};

export default MostrarInstitucion;
