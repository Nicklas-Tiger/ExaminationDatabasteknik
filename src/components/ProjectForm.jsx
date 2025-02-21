import React, { useState, useEffect } from "react";

const ProjectForm = ({
  initialData = {},
  onSubmit,
  submitButtonText = "Skapa projekt",
}) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    customer: "",
    statusId: "",
    projectManager: "",
    service: "",
    ...initialData,
  });

  const [statuses, setStatuses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [services, setServices] = useState([]);

  const getCustomers = async () => {
    try {
      const res = await fetch("https://localhost:7097/api/Customers");
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const getStatuses = async () => {
    try {
      const res = await fetch("https://localhost:7097/api/statuses");
      const data = await res.json();
      setStatuses(data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const getProjectManagers = async () => {
    try {
      const res = await fetch("https://localhost:7097/api/projectmanagers");
      const data = await res.json();
      setProjectManagers(data);
    } catch (error) {
      console.error("Error fetching project managers:", error);
    }
  };

  const getServices = async () => {
    try {
      const res = await fetch("https://localhost:7097/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getCustomers();
    getStatuses();
    getProjectManagers();
    getServices();
  }, []);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Projektnamn:</label>
      <input
        type="text"
        name="name"
        value={project.name}
        onChange={handleChange}
        required
      />

      <label>Kund:</label>
      <select
        name="customer"
        value={project.customer}
        onChange={handleChange}
        required
      >
        <option value="">Välj kund</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.customerName}
          </option>
        ))}
      </select>

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

      <label>Projektansvarig:</label>
      <select
        name="projectManager"
        value={project.projectManager}
        onChange={handleChange}
        required
      >
        <option value="">Välj projektansvarig</option>
        {projectManagers.map((pm) => (
          <option key={pm.id} value={pm.id}>
            {pm.displayName}
          </option>
        ))}
      </select>

      <label>Tjänst:</label>
      <select
        name="service"
        value={project.service}
        onChange={handleChange}
        required
      >
        <option value="">Välj tjänst</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.serviceName}
          </option>
        ))}
      </select>

      <label>Beskrivning:</label>
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn">
        {submitButtonText}
      </button>
    </form>
  );
};

export default ProjectForm;
