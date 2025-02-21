import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const CreateProject = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (newProject) => {
    const payload = {
      projectName: newProject.projectName,
      description: newProject.description?.trim() || null,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      statusId: newProject.statusId,
      customerId: newProject.customerId,
    };

    console.log("Payload som skickas:", JSON.stringify(payload, null, 2));

    setIsLoading(true);

    try {
      const res = await fetch("https://localhost:7097/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Projektet har skapats!");
        navigate("/projects", { state: { refresh: true } });
      } else {
        const errorText = await res.text();
        console.error("Fullständigt felmeddelande från backend:", errorText);
        alert("Något gick fel. Se konsolen för fullständigt felmeddelande.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Ett fel inträffade. Se konsolen för mer information.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Skapa nytt projekt</h1>
      <ProjectForm onSubmit={handleCreate} submitButtonText="Skapa projekt" />
      {isLoading && <p>Laddar...</p>}
    </div>
  );
};

export default CreateProject;
