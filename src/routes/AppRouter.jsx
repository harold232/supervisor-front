import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "../views/MainButtons";
import FormCompetenciaE from "../pages/FormCompetenciaE";
import FormCompetenciaG from "../pages/FormCompetenciaG";
import TablaCompetenciaGenerales from "../pages/TablaCompetenciaGenerales";
import TablaCompetenciaEspecificas from "../pages/TablaCompetenciaEspecificas";
import Sidebar from "../views/Sidebar";
import EditCompetenciaE from "../pages/EditCompetenciaE.jsx";
import EditCompetenciaG from "../pages/EditCompetenciaG.jsx";

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
                        <Route path="/editar-competencia-especifica/:id" element={<EditCompetenciaE/>}/>
                        <Route path="/editar-competencia-general/:id" element={<EditCompetenciaG/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default AppRouter;