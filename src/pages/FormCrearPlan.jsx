import { useReducer } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { Container, FormGroup, TextField } from "@mui/material";
import Buttons from "../views/Buttons";

const initialState = {
  codigo: "",
  descripcion: "",
  error: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.message,
      };
    case "CLEAR_FIELDS":
      return {
        ...initialState, 
      };
    default:
      return state;
  }
};

const FormCrearPlan = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Hook de navegación
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!state.codigo || !state.descripcion) {
      dispatch({ type: "SET_ERROR", message: "Código y Descripción son obligatorios." });
      return;
    }

    dispatch({ type: "SET_ERROR", message: "" });

    const payload = {
      codigo: state.codigo,
      descripcion: state.descripcion,
      vigencia: "",
      institucionId: null,
      departamentoId: null,
      carreraId: null,
      estado: "Activo",
    };

    console.log(payload);

    fetch("http://localhost:8080/api/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Éxito:", data);
        dispatch({ type: "CLEAR_FIELDS" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Función para cancelar y navegar
  const handleCancel = () => {
    dispatch({ type: "CLEAR_FIELDS" }); // Limpiar el formulario
    navigate("/"); // Navegar a la página de MainButtons
  };

  return (
    <>
      <Container sx={{ borderRadius: 5, pb: 2, textAlign: "center", background: "#E1E2E7" }}>
        <h2>Crear Plan de Estudios</h2>
        <div>
          <FormGroup>
            <TextField
              label="Código"
              value={state.codigo}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "codigo", value: e.target.value })}
              onClick={() => console.log("Se hizo clic en el campo 'Código'")} // Log para el TextField de Código
              sx={{ m: "normal", background: "#EFF1F6" }}
              required
              error={!state.codigo && !!state.error}
            />
            <TextField
              label="Descripción"
              value={state.descripcion}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "descripcion", value: e.target.value })}
              onClick={() => console.log("Se hizo clic en el campo 'Descripción'")} // Log para el TextField de Descripción
              margin="normal"
              sx={{ background: "#EFF1F6" }}
              required
              error={!state.descripcion && !!state.error}
            />
            {state.error && <div style={{ color: "red", marginTop: 10 }}>{state.error}</div>}
          </FormGroup>
        </div>
      </Container>

      <Buttons
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        // Log para el botón de aceptar cuando pasa el cursor
        onMouseEnterAcceptButton={() => console.log("El cursor está sobre el botón de aceptar")}
      ></Buttons>
    </>
  );
};

export default FormCrearPlan;
