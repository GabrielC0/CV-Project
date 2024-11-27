import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreateCv = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [description, setDescription] = useState("");
  const [experiencePedagogique, setExperiencePedagogique] = useState("");
  const [experiencePro, setExperiencePro] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post(
        "/cv/createCv",
        {
          nom,
          prenom,
          description,
          experiencePedagogique,
          experiencePro,
          is_visible: isVisible ? 1 : 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      setError(
        "Erreur lors de la création du CV : " +
          (err.response?.data?.message || err.message)
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <h1>Créer un CV</h1>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="nom" style={styles.label}>
            Nom :
          </label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
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
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength="10"
            style={styles.textarea}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="experiencePedagogique" style={styles.label}>
            Expérience Pédagogique :
          </label>
          <textarea
            id="experiencePedagogique"
            value={experiencePedagogique}
            onChange={(e) => setExperiencePedagogique(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="experiencePro" style={styles.label}>
            Expérience Professionnelle :
          </label>
          <textarea
            id="experiencePro"
            value={experiencePro}
            onChange={(e) => setExperiencePro(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
            />
            Rendre mon CV visible
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.button,
            ...(isSubmitting && styles.buttonDisabled),
          }}
        >
          {isSubmitting ? "Création en cours..." : "Créer le CV"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default CreateCv;