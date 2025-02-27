import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import Navbar from "./components/Navbar";
import ListProject from "./pages/ListProject";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject";

function App() {
  return (
    <div className="app-grid">
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListProject />} />
            <Route path="/projects" element={<ListProject />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/:id/edit" element={<EditProject />} />
            <Route path="*" element={<h2>404 - Sidan finns inte</h2>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
