import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import StartPage from "./pages/StartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
            <Route path="/" element={<StartPage />} />
            <Route path="/projects" element={<ListProject />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/:id/edit" element={<EditProject />} />
            <Route path="*" element={<h2>404 - Sidan finns inte</h2>} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
