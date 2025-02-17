import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/" element={<StartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
