import { AnimatePresence } from "framer-motion";
import Home from "./pages/home/layout/Home";
import ProjectEditor from "./pages/projectEditor/layout/ProjectEditor";
import { Route, Routes, useLocation } from "react-router-dom";
import MessageToast from "./pages/common/components/toast/MessageToast";

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ProjectEditor />} />
        </Routes>
      </AnimatePresence>
      <MessageToast />
    </>
  );
}

export default App;
