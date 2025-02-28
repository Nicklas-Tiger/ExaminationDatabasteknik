import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const CreateProject = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getCustomers = async () => {
    try {
      const res = await fetch("https://localhost:7097/api/Customers");
      if (!res.ok) {
        throw new Error("Något gick fel vid hämtningen av kunder.");
      }
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleCreate = async (newProject) => {
    const selectedCustomer = customers.find(
      (c) => c.id === newProject.customer.id
    );

    const payload = {
      projectName: newProject.projectName || "",
      description: newProject.description || "",
      startDate: newProject.startDate || "",
      endDate: newProject.endDate || "",
      customerId: newProject.customerId || 0, // Sätt till 0 om det är null eller tomt
      statusId: newProject.statusId || 0, // Samma för alla Id:n
      projectManagerId: newProject.projectManagerId || 0,
      serviceId: newProject.serviceId || 0,
    };

    console.log("Payload som skickas:", JSON.stringify(payload, null, 2));

    setIsLoading(true);
    setErrorMessage(""); // Nollställ felmeddelande innan förfrågan

    try {
      const res = await fetch("https://localhost:7097/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log("Projektet har skapats!");
        navigate("/projects", { state: { refresh: true } });
      } else {
        const errorText = await res.text();
        console.error("Fullständigt felmeddelande från backend:", errorText);
        setErrorMessage("Något gick fel. Se konsolen för mer information.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      setErrorMessage("Ett fel inträffade. Se konsolen för mer information.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Skapa nytt projekt</h1>
      <ProjectForm onSubmit={handleCreate} submitButtonText="Skapa projekt" />
      {isLoading && <p>Laddar...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default CreateProject;
