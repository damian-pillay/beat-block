import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import ProjectEditor from "./pages/ProjectEditor/ProjectEditor";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<ProjectEditor />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
