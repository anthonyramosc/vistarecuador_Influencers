import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavLayout from "./components/Principal/Layout.tsx";
import Dashboard from "./pages/dashboard.tsx";
/*import Presentacion from "./pages/influencer/Presentacion";
import Objetos from "./pages/influencer/Objetos";
import Vision from "./pages/influencer/Vision";
import Mision from "./pages/influencer/Mision";
import SerEmbajador from "./pages/influencer/SerEmbajador";
import Videos from "./pages/influencer/Videos";
import News from "./pages/influencer/News";
import Beneficios from "./pages/adherentes/Beneficios";
import Adhesion from "./pages/adherentes/Adhesion";
import Medios from "./pages/adherentes/Medios";
import Contacto from "./pages/Contacto";
import Registro from "./pages/Registro";*/

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                    path="/dashboard"
                    element={
                        <NavLayout>
                            <Dashboard />
                        </NavLayout>
                    }
                />


            </Routes>
        </BrowserRouter>
    );
};

export default App;
