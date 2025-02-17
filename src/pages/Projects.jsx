import React from "react";
import { Link } from "react-router-dom";

const testProjects = [
  { id: 1, name: "Webbdesign för TigerAB", status: "Pågående" },
  {
    id: 2,
    name: "E-handelsplattform för NicklasTigerAB",
    status: "Ej påbörjad",
  },
  { id: 3, name: "Mobilapp för TicklasNiger AB", status: "Avslutad" },
];

const Projects = () => {
  return (
    <div className="page-container">
      <h1>Projects</h1>
      <Link to="/projects/create" className="primary-btn">
        Create New Project
      </Link>

      <ul className="project-list">
        {testProjects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> - <span>{project.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
