import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const EditProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`https://localhost:7097/api/projects/${id}`);
        if (!res.ok) {
          throw new Error("Något gick fel vid hämtningen av projektet.");
        }
        const data = await res.json();
        setProject(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);
  const handleUpdate = async (updatedProject) => {
    const payload = {
      id: updatedProject.id,
      projectName: updatedProject.projectName,
      description: updatedProject.description,
      startDate: updatedProject.startDate,
      endDate: updatedProject.endDate,
      statusId: parseInt(updatedProject.statusId),
      customerId: parseInt(updatedProject.customer),
    };

    console.log("Payload som skickas:", JSON.stringify(payload, null, 2));

    try {
      const res = await fetch(`https://localhost:7097/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Projektet har uppdaterats!");
      } else {
        alert("Något gick fel vid uppdateringen.");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Ett fel inträffade. Se konsolen för mer information.");
    }
  };
  if (isLoading) {
    return <p>Laddar projektdata...</p>;
  }

  if (!project) {
    return <p>Kunde inte hitta projektet.</p>;
  }

  return (
    <div className="page-container">
      <h1>Redigera projekt</h1>

      {/* Visa all information om projektet */}
      <div className="project-details">
        <h2>Projektinformation</h2>
        <p>
          <strong>Projektnamn:</strong> {project.projectName}
        </p>
        <p>
          <strong>Kund:</strong> {project.customer?.customerName}
        </p>
        <p>
          <strong>Status:</strong> {project.statusName}
        </p>
        <p>
          <strong>Beskrivning:</strong> {project.description}
        </p>
        <p>
          <strong>Startdatum:</strong>{" "}
          {new Date(project.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Slutdatum:</strong>{" "}
          {new Date(project.endDate).toLocaleDateString()}
        </p>
      </div>

      <hr />

      <h2>Redigera projekt</h2>
      <ProjectForm
        initialData={project}
        onSubmit={handleUpdate}
        submitButtonText="Uppdatera projekt"
      />
    </div>
  );
};

export default EditProject;
