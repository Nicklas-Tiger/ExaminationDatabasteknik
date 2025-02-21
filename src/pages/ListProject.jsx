import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectListItem from "../components/ProjectListItem";

const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // 🟢 Lägg till navigate för att navigera till skapandet

  const fetchProjects = async () => {
    try {
      const res = await fetch("https://localhost:7097/api/projects");
      const data = await res.json();
      setProjects(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.refresh) {
      fetchProjects();
    }
  }, [location.state]);

  useEffect(() => {
    fetchProjects();
  }, []);

  if (isLoading) {
    return <p>Laddar projekt...</p>;
  }

  if (projects.length === 0) {
    return (
      <div>
        <h1>Projektlista</h1>
        <p>Inga projekt hittades.</p>
        <button className="btn" onClick={() => navigate("/projects/create")}>
          Skapa nytt projekt
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Projektlista</h1>
      <button
        className="btn"
        onClick={() => navigate("/projects/create")}
        style={{ marginBottom: "20px" }}
      >
        Skapa nytt projekt
      </button>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ListProject;
