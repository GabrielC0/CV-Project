import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const MesCv = () => {
  const [cvs, setCvs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserCvs = async () => {
      try {
        const response = await api.get("/cv/liste-user-cv", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCvs(response.data.cvs);
      } catch (err) {
        setError("Erreur lors de la récupération de vos CV.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUserCvs();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleEditCv = (id) => {
    navigate(`/cv/updateCv/${id}`);
  };

  if (isLoading) {
    return <p style={styles.loading}>Chargement de vos CV...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mes CV</h1>
      {cvs.length === 0 ? (
        <p style={styles.loading}>
          Vous n'avez aucun CV pour le moment. Créez-en un pour commencer !
        </p>
      ) : (
        <div style={styles.cvList}>
          {cvs.map((cv) => (
            <div key={cv._id} style={styles.cvCard}>
              <h2 style={styles.cvCardTitle}>
                {cv.nom} {cv.prenom}
              </h2>
              <p style={styles.cvCardDetail}>
                <strong>Description :</strong> {cv.description}
              </p>
              <p style={styles.cvCardDetail}>
                <strong>Expérience Pédagogique :</strong>{" "}
                {cv.experiencePedagogique}
              </p>
              <p style={styles.cvCardDetail}>
                <strong>Expérience Professionnelle :</strong> {cv.experiencePro}
              </p>
              <p style={styles.cvCardDetail}>
                <strong>Visible :</strong> {cv.is_visible ? "Oui" : "Non"}
              </p>
              <button
                onClick={() => handleEditCv(cv._id)}
                style={styles.editButton}
              >
                Modifier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: "18px",
    marginBottom: "20px",
  },
  cvList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cvCard: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "left",
  },
  cvCardTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#2c3e50",
  },
  cvCardDetail: {
    marginBottom: "8px",
    fontSize: "14px",
    color: "#555",
  },
  editButton: {
    padding: "10px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
    alignSelf: "flex-start",
  },
};

export default MesCv;
