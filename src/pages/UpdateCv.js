import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const UpdateCv = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cv, setCv] = useState({
    nom: "",
    prenom: "",
    description: "",
    experiencePedagogique: "",
    experiencePro: "",
    is_visible: false,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCvDetails = async () => {
      try {
        const response = await api.get(`/cv/details-cv/${id}`);
        setCv(response.data.cv);
      } catch (err) {
        setError("Erreur lors du chargement du CV.");
      }
    };

    fetchCvDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCv((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheck = (e) => {
    setCv((prevState) => ({
      ...prevState,
      is_visible: e.target.checked ? 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/cv/updateCv/${id}`, cv);
      navigate(`/dashboard/mes-cv`);
    } catch (err) {
      setError("Erreur lors de la mise à jour du CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mettre à jour le CV</h1>

      {error && <div style={styles.error}>{error}</div>}

      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="nom" style={styles.label}>
              Nom :
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={cv.nom}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="prenom" style={styles.label}>
              Prénom :
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={cv.prenom}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="description" style={styles.label}>
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              value={cv.description}
              onChange={handleChange}
              required
              minLength="10"
              style={styles.textarea}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="experiencePedagogique" style={styles.label}>
              Expérience Pédagogique :
            </label>
            <input
              type="text"
              id="experiencePedagogique"
              name="experiencePedagogique"
              value={cv.experiencePedagogique}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="experiencePro" style={styles.label}>
              Expérience Professionnelle :
            </label>
            <input
              type="text"
              id="experiencePro"
              name="experiencePro"
              value={cv.experiencePro}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="is_visible"
              checked={cv.is_visible === 1}
              onChange={handleCheck}
            />
            <label htmlFor="is_visible" style={styles.checkboxLabel}>
              CV visible
            </label>
          </div>

          <button type="submit" style={styles.button}>
            Mettre à jour
          </button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  textarea: {
    minHeight: "100px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#555",
  },
  button: {
    padding: "10px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
};

export default UpdateCv;