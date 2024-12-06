import { useState } from "react";
import { Container, FormGroup, TextField, Typography, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Buttons from "../views/Buttons";

const FormEliminarPlan = () => {
  const [codigo, setCodigo] = useState(""); // Estado para almacenar el código del plan a eliminar
  const [openDialog, setOpenDialog] = useState(false); // Controla la apertura del diálogo de confirmación
  const [error, setError] = useState(""); // Estado para manejar errores

  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para manejar el submit del formulario
  const handleSubmit = () => {
    const id = parseInt(codigo); // Convertimos el código a número (Long en backend)

    if (isNaN(id)) {
      setError("El ID ingresado no es válido.");
      return;
    }

    // Verificar si el plan existe
    fetch(`http://localhost:8080/api/plan/${id}`)
      .then((response) => {
        if (response.ok) {
          // Si el plan existe, mostrar el diálogo de confirmación
          setError(""); // Limpiar errores previos
          setOpenDialog(true);
        } else if (response.status === 404) {
          setError("El plan no existe en la base de datos.");
        } else {
          setError("Error al verificar el plan.");
        }
      })
      .catch((error) => {
        setError("Error al conectarse al servidor.");
        console.error("Error:", error);
      });
  };

  // Función para manejar la confirmación de eliminación
  const handleConfirmDelete = () => {
    const id = parseInt(codigo);
  
    fetch(`http://localhost:8080/api/plan/${id}`, {
      method: "DELETE", // Método DELETE para eliminar
    })
      .then((response) => {
        if (response.ok || response.status === 204) {
          // Si la eliminación fue exitosa (código 200 o 204)
          setCodigo(""); // Limpiar el campo después de la eliminación
          setError(""); // Limpiar errores previos
          setOpenDialog(false); // Cerrar el diálogo de confirmación
          console.log("Plan eliminado correctamente."); // Mensaje en consola para verificar
        } else if (response.status === 404) {
          setError(" ");
          setOpenDialog(false); // Cerrar el diálogo en caso de error
        } else {
          setError("Error al eliminar el plan.");
          setOpenDialog(false); // Cerrar el diálogo en caso de error
        }
      })
      .catch((error) => {
        setError("Error al conectarse al servidor.");
        console.error("Error:", error);
        setOpenDialog(false);
      });
  };
  

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setOpenDialog(false); // Cerrar el diálogo de confirmación sin eliminar
  };

  // Función para cancelar el formulario
  const handleCancel = () => {
    navigate("/"); // Navegar a la página de MainButtons
  };

  return (
    <>
      <Container
        sx={{
          borderRadius: 5,
          pb: 2,
          textAlign: "center",
          background: "#E1E2E7",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Eliminar Plan de Estudios
        </Typography>
        <div>
          <FormGroup>
            <TextField
              label="ID del Plan"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              sx={{ m: "normal", background: "#EFF1F6" }}
              required
            />
          </FormGroup>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </div>
      </Container>

      <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel} />

      {/* Dialog de Confirmación */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">
          ¿Estás seguro de que deseas eliminar este plan?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormEliminarPlan;





