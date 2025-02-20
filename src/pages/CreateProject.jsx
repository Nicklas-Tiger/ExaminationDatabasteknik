import React from "react";
import ProjectForm from "../components/ProjectForm";

const CreateProject = () => {
  const handleCreate = (newProject) => {
    console.log("New project:", newProject);
    alert("Project created! (API integration coming soon!");
  };

  return (
    <div className="page-container">
      <h1>Skapa nytt projekt!</h1>
      <ProjectForm onSubmit={handleCreate} submitButtonText="Skapa projekt" />
    </div>
  );
};

export default CreateProject;
