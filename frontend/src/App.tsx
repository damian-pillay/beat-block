import { AnimatePresence } from "framer-motion";
import Home from "./pages/home/layout/Home";
import ProjectEditor from "./pages/projectEditor/layout/ProjectEditor";
import { Route, Routes, useLocation } from "react-router-dom";
import MessageToast from "./pages/common/components/toast/MessageToast";
import { useAudioPlayerStore } from "./pages/common/services/useAudioPlayerStore";
import AudioPlayer from "./pages/common/components/audioPlayer/AudioPlayer";
import Onboarding from "./pages/authentication/layout/Onboarding.js";
import useUserInfo from "./pages/home/api/useUserInfo.js";
import ProtectedRoute from "./pages/common/components/routes/ProtectedRoute.js";

function App() {
  const location = useLocation();
  const { isOpen } = useAudioPlayerStore();
  useUserInfo();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<ProjectEditor />} />
          </Route>

          <Route
            element={<ProtectedRoute redirectTo="/" redirectIfAuthenticated />}
          >
            <Route
              path="/sign-up"
              element={<Onboarding key="sign-up" isSignUp />}
            />
            <Route path="/login" element={<Onboarding key="login" />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <MessageToast />
      <AnimatePresence>{isOpen && <AudioPlayer />}</AnimatePresence>
    </>
  );
}

export default App;
