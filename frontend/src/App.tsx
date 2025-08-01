import { AnimatePresence } from "framer-motion";
import Home from "./pages/home/layout/Home";
import ProjectEditor from "./pages/projectEditor/layout/ProjectEditor";
import { Route, Routes, useLocation } from "react-router-dom";
import MessageToast from "./pages/common/components/toast/MessageToast";
import { useAudioPlayerStore } from "./pages/common/services/useAudioPlayerStore";
import AudioPlayer from "./pages/common/components/audioPlayer/AudioPlayer";
import Onboarding from "./pages/authentication/layout/Onboarding.js";

function App() {
  const location = useLocation();
  const { isOpen } = useAudioPlayerStore();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ProjectEditor />} />
          <Route
            path="/sign-up"
            element={<Onboarding key="sign-up" isSignUp={true} />}
          />
          <Route
            path="/login"
            element={<Onboarding key="login" isSignUp={false} />}
          />
        </Routes>
      </AnimatePresence>
      <MessageToast />
      <AnimatePresence>{isOpen && <AudioPlayer />}</AnimatePresence>
    </>
  );
}

export default App;
