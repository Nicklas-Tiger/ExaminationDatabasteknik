import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectListItem = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/projects/${project.id}/edit`);
  };

  return (
    <div className="project-list-item">
      <p>
        <strong>Projektnamn:</strong> {project.projectName}
      </p>
      <p>
        <strong>Beskrivning:</strong> {project.description}
      </p>
      <p>
        <strong>Kund:</strong> {project.customer?.customerName}
      </p>
      <p>
        <strong>Status:</strong> {project.status?.statusName}
      </p>
      <p>
        <strong>Startdatum:</strong>{" "}
        {new Date(project.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Slutdatum:</strong>{" "}
        {new Date(project.endDate).toLocaleDateString()}
      </p>

      <button className="btn" onClick={handleViewDetails}>
        Visa detaljer
      </button>
    </div>
  );
};

export default ProjectListItem;
