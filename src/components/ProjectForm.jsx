import React, { useState, useEffect } from "react";

const ProjectForm = ({
  initialData = {},
  onSubmit,
  submitButtonText = "Skapa projekt",
}) => {
  const [project, setProject] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    customer: { id: "" },
    status: { id: "" },
    projectManager: { id: "" },
    service: { id: "" },
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

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setProject((prevProject) => ({
        ...prevProject,
        id: initialData.id || prevProject.id,
        projectName: initialData.projectName || "",
        description: initialData.description || "",
        startDate: initialData.startDate
          ? initialData.startDate.split("T")[0]
          : "",
        endDate: initialData.endDate ? initialData.endDate.split("T")[0] : "",
        customer: initialData.customer || "",
        status: initialData.status || "",
        projectManager: initialData.projectManager || "",
        service: initialData.service || "",
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customer") {
      setProject({ ...project, customer: { id: parseInt(value) } });
    } else if (name === "status") {
      setProject({ ...project, status: { id: parseInt(value) } });
    } else if (name === "projectManager") {
      setProject({ ...project, projectManager: { id: parseInt(value) } });
    } else if (name === "service") {
      setProject({ ...project, service: { id: parseInt(value) } });
    } else {
      setProject({ ...project, [name]: value });
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Projektnamn:</label>
      <input
        type="text"
        name="projectName"
        value={project.projectName}
        onChange={handleChange}
        required
      />
      <label>Beskrivning:</label>
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        required
      />
      <label>Startdatum:</label>
      <input
        type="date"
        name="startDate"
        value={project.startDate}
        onChange={handleChange}
        required
      />
      <label>Slutdatum:</label>
      <input
        type="date"
        name="endDate"
        value={project.endDate}
        onChange={handleChange}
        required
      />
      <label>Kund:</label>
      <select
        name="customer"
        value={project.customer.id}
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
        name="status"
        value={project.status.id}
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
        value={project.projectManager.id || ""}
        onChange={handleChange}
        required
      >
        <option value="">Välj projektledare</option>
        {projectManagers.map((pm) => (
          <option key={pm.id} value={pm.id}>
            {pm.firstName} {pm.lastName}
          </option>
        ))}
      </select>
      <label>Tjänst:</label>
      <select
        name="service"
        value={project.service.id || ""}
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
      <button type="submit" className="btn">
        {submitButtonText}
      </button>
    </form>
  );
};

export default ProjectForm;
