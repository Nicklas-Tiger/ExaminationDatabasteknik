import React, { useState, useEffect } from "react";

const CreateProject = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    statusId: "",
  });

  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/statuses") // Byt ut URL till din backend
      .then((res) => res.json())
      .then((data) => {
        setStatuses(data);
      })
      .catch((error) => console.error("Error fetching statuses:", error));
  }, []);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New project:", project);
    alert("Project created! (API integration coming soon)");
  };

  return (
    <div className="page-container">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <label>Project Name:</label>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <select
          name="statusId"
          value={project.statusId}
          onChange={handleChange}
          required
        >
          <option value="">Välj status</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.statusName}
            </option>
          ))}
        </select>

        <button type="submit" className="primary-btn">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
