import React from "react";

const ProjectListItem = ({ project }) => {
  return (
    <div className="project-list-item">
      <h3>{project.name}</h3>
      <p>Kund: {project.customer?.customerName}</p>
      <p>Status: {project.statusName}</p>
      <p>Beskrivning: {project.description}</p>
      <button className="btn">Visa detaljer</button>
      <button className="btn">Radera projekt</button>
    </div>
  );
};

export default ProjectListItem;
