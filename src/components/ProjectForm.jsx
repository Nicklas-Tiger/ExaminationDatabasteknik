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
    ...initialData, // Förifyll formuläret om initialData finns
  });

  const [statuses, setStatuses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [services, setServices] = useState([]);

  // Hämta customers
  const getCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/Customers");
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Hämta statuses
  const getStatuses = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/statuses");
      const data = await res.json();
      setStatuses(data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  // Hämta projectManagers
  const getProjectManagers = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/projectmanagers");
      const data = await res.json();
      setProjectManagers(data);
    } catch (error) {
      console.error("Error fetching project managers:", error);
    }
  };

  // Hämta services
  const getServices = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Hämta all data när komponenten laddas
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
    onSubmit(project); // Använd prop-funktionen för att hantera submit
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
            {customer.name}
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
            {pm.name}
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
            {service.name}
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

      <button type="submit" className="primary-btn">
        {submitButtonText}
      </button>
    </form>
  );
};

export default ProjectForm;
