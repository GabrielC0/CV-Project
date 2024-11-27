import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/ListeCvVisible.css";

const ListeCvVisible = () => {
  const [cvs, setCvs] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchVisibleCvs = async () => {
    try {
      const response = await api.get("/cv/show-visible-cv");
      setCvs(response.data.cvs);
      setFilteredCvs(response.data.cvs); // Initially set the filtered list to all CVs
    } catch (err) {
      setError(
        "Erreur lors du chargement des CVs : " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
    fetchVisibleCvs();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter the CVs based on the search term
    if (term === "") {
      setFilteredCvs(cvs); 
    } else {
      const filtered = cvs.filter((cv) =>
        `${cv.nom} ${cv.prenom}`.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCvs(filtered);
    }
  };

  const handleViewDetails = (cvId) => {
    if (isLoggedIn) {
      navigate(`/cv/details/${cvId}`);
    } else {
      alert("Veuillez vous connecter pour voir les détails");
    }
  };

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleBack = () => navigate("/"); 

  return (
    <div className="listeCvVisible-container">
      <h1 className="listeCvVisible-title">Liste des CVs</h1>

      <button className="listeCvVisible-back-button" onClick={handleBack}>
        Retour à l'accueil
      </button>

      <div className="listeCvVisible-search">
        <input
          type="text"
          className="listeCvVisible-search-input"
          placeholder="Rechercher par nom ou prénom"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {!isLoggedIn && (
        <div className="listeCvVisible-auth-buttons">
          <button className="listeCvVisible-button" onClick={handleLogin}>
            Login
          </button>
          <button className="listeCvVisible-button" onClick={handleRegister}>
            Register
          </button>
        </div>
      )}

      {error && <div className="listeCvVisible-error">{error}</div>}

      <ul className="listeCvVisible-list">
        {filteredCvs.length > 0 ? (
          filteredCvs.map((cv) => (
            <li key={cv._id} className="listeCvVisible-item">
              <h3 className="listeCvVisible-item-title">
                {cv.nom} {cv.prenom}
              </h3>
              <p className="listeCvVisible-item-description">
                {cv.description}
              </p>
              <p className="listeCvVisible-item-description">
                Expérience Pédagogique: {cv.experiencePedagogique}
              </p>
              <p className="listeCvVisible-item-description">
                Expérience Professionnelle: {cv.experiencePro}
              </p>

              {isLoggedIn && (
                <button
                  className="listeCvVisible-button"
                  onClick={() => handleViewDetails(cv._id)}
                >
                  Voir les détails
                </button>
              )}
            </li>
          ))
        ) : (
          <p className="listeCvVisible-emptyMessage">
            Aucun CV visible trouvé.
          </p>
        )}
      </ul>
    </div>
  );
};

export default ListeCvVisible;
