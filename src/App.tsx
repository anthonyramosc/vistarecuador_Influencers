import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavLayout from "./components/Principal/Layout.tsx";
import Dashboard from "./pages/dashboard.tsx";

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
