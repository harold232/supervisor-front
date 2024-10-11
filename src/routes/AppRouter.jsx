import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "../views/MainButtons";
import FormCompetenciaE from "../pages/FormCompetenciaE";
import FormCompetenciaG from "../pages/FormCompetenciaG";
import TablaCompetenciaGenerales from "../pages/TablaCompetenciaGenerales";
import TablaCompetenciaEspecificas from "../pages/TablaCompetenciaEspecificas";
import Sidebar from "../views/Sidebar";

const AppRouter = () => {

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1, padding: '16px' }}>
                    <Routes>
                        <Route path="/" element={<MainScreen />} />
                        <Route path="/formCompetenciaE" element={<FormCompetenciaE />} />
                        <Route path="/formCompetenciaG" element={<FormCompetenciaG />} />
                        <Route path="/competencias-generales" element={<TablaCompetenciaGenerales/>}/>
                        <Route path="/competencias-especificas" element={<TablaCompetenciaEspecificas/>}/>
                        {/* Agrega más rutas según sea necesario */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default AppRouter;