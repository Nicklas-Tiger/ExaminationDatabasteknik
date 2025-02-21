import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const EditProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch("https://localhost:7097/api/projects");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, []);

  const handleUpdate = (updatedProject) => {
    console.log("Updated project:", updatedProject);
    alert("Project updated! (API integration coming soon)");
    // Här kan du lägga till API-anrop för att uppdatera projektet
  };

  return (
    <div className="page-container">
      <h1>Redigera projekt</h1>
      {project ? (
        <ProjectForm
          initialData={project}
          onSubmit={handleUpdate}
          submitButtonText="Uppdatera projekt"
        />
      ) : (
        <p>Laddar projektdata...</p>
      )}
    </div>
  );
};

export default EditProject;
