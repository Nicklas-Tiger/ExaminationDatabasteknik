import React from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))
      ) : (
        <p>Inga projekt tillgängliga</p>
      )}
    </div>
  );
};

export default ProjectList;
