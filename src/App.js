import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Style.css";

import ListeCvVisible from "./pages/ListeCvVisible";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./pages/DashboardLayout";
import DetailsCv from "./pages/DetailsCv";
import CreateCv from "./pages/CreateCv";
import UpdateCv from "./pages/UpdateCv";
import MesCv from "./pages/MesCv";
import Accueil from "./pages/Accueil";
import MesReco from "./pages/MesReco";

function App() {
  return (
    <Router>
      <Routes>
        {/* Liste CV accessible sans authentification */}
        <Route path="/cv/details/:id" element={<DetailsCv />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard protégé par ProtectedRoute */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Enfant du DashboardLayout */}
          <Route index element={<Accueil />} />
          <Route path="mes-cv" element={<MesCv />} />
          <Route path="create-cv" element={<CreateCv />} />
          <Route path="cv/updateCv/:id" element={<UpdateCv />} />
          <Route path="reco" element={<MesReco />} />
        </Route>

        {/* Liste CV accessible publiquement */}
        <Route path="/cv-visible" element={<ListeCvVisible />} />
      </Routes>
    </Router>
  );
}

export default App;
