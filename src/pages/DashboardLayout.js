import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => navigate("/cv-visible")}>Liste des CVs</li>
          <li onClick={() => navigate("/mes-cv")}>Mes CV</li>
          <li onClick={() => navigate("/create-cv")}>Créer un CV</li>
          <li onClick={() => navigate("/reco")}>Mes Recommandations</li>
          <li onClick={handleLogout}>Déconnexion</li>
        </ul>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
