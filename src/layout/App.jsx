import { useState } from "react";
import FormCompetenciaG from "../pages/FormCompetenciaG";
import Buttons from "../views/Buttons";

export default function App() {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [nivel, setNivel] = useState('');

    const handleSubmit = () => {
        console.log({ codigo, nombre, descripcion, tipo, nivel });

        fetch('http://localhost:8080/api/competencia/general', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codigo, nombre, descripcion, tipo, nivel }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Éxito:', data);
                setCodigo("");
                setNombre("");
                setDescripcion("");
                setTipo("");
                setNivel("");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleCancel = () => {
        setCodigo("");
        setNombre("");
        setDescripcion("");
        setTipo("");
        setNivel("");
    }

    return (
        <>
            <main>
                <FormCompetencia
                    codigo={codigo}
                    setCodigo={setCodigo}
                    nombre={nombre}
                    setNombre={setNombre}
                    descripcion={descripcion}
                    setDescripcion={setDescripcion}
                    tipo={tipo}
                    setTipo={setTipo}
                    nivel={nivel}
                    setNivel={setNivel}
                />
                <Buttons handleSubmit={handleSubmit} handleCancel={handleCancel}></Buttons>
            </main>
        </>
    )
}