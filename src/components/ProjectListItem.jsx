import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectListItem = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/projects/${project.id}/edit`);
  };

  return (
    <div className="project-list-item">
      <p>Projektnamn: {project.projectName}</p>
      <p>Kund: {project.customer?.customerName}</p>
      <p>Status: {project.statusName}</p>
      <p>Beskrivning: {project.description}</p>
      <button className="btn" onClick={handleViewDetails}>
        Visa detaljer
      </button>
      <button className="btn">Radera projekt</button>
    </div>
  );
};

export default ProjectListItem;
