import { useState } from "react";
import { Container, FormGroup, TextField, Typography, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Buttons from "../views/Buttons";

const FormEliminarInstitucion = () => {
  const [codigo, setCodigo] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const id = parseInt(codigo);

    if (isNaN(id)) {
      setError("El codigo ingresado no es válido.");
      return;
    }

    fetch(`http://localhost:8080/api/institucion/${id}`)
      .then((response) => {
        if (response.ok) {

          setError("");
          setOpenDialog(true);
        } else if (response.status === 404) {
          setError("La institucion no existe en la base de datos.");
        } else {
          setError("Error al verificar la institucion.");
        }
      })
      .catch((error) => {
        setError("Error al conectarse al servidor.");
        console.error("Error:", error);
      });
  };

  const handleConfirmDelete = () => {
    const id = parseInt(codigo);
  
    fetch(`http://localhost:8080/api/institucion/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok || response.status === 204) {
          setCodigo("");
          setError("");
          setOpenDialog(false);
          console.log("Institucion eliminada correctamente.");
        } else if (response.status === 404) {
          setError(" ");
          setOpenDialog(false);
        } else {
          setError("Error al eliminar la institucion.");
          setOpenDialog(false);
        }
      })
      .catch((error) => {
        setError("Error al conectarse al servidor.");
        console.error("Error:", error);
        setOpenDialog(false);
      });
  };
  

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleCancel = () => {
    navigate("/");
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
          Eliminar Institucion
        </Typography>
        <div>
          <FormGroup>
            <TextField
              label="Código de la institucion"
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

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">
          ¿Estás seguro de que deseas eliminar esta institucion?
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

export default FormEliminarInstitucion;





