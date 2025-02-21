import React, { useState, useEffect } from "react";
import ProjectList from "../components/ProjectList";
import { useNavigate } from "react-router-dom";

const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://localhost:7097/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects:", res.status);
        setError("Kunde inte hämta projektdata. Försök igen senare.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Något gick fel. Kontrollera konsolen för mer information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleCreate = () => {
    navigate("/projects/create");
  };

  return (
    <div className="page-container">
      <h1>Alla projekt</h1>

      {loading && <p>Laddar projekt...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <button className="create-project-btn btn" onClick={handleCreate}>
            Skapa nytt projekt
          </button>
          <ProjectList projects={projects} />
        </>
      )}
    </div>
  );
};

export default ListProject;
