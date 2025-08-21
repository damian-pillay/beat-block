import { AuthenticationBackground } from "../../../assets/textures";
import AuthInfoPanel from "../components/AuthInfoPanel";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function Onboarding({
  isSignUp = false,
}: {
  isSignUp?: boolean;
}) {
  return (
    <div
      className="border h-screen w-full flex justify-center"
      style={{
        backgroundImage: AuthenticationBackground,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={AuthenticationBackground}
        alt="Authentication Background"
        className="w-full h-full object-cover absolute top-0 left-0 opacity-6 grayscale drag-none"
      />
      <div className="relative z-10 w-6xl flex items-center justify-center h-full">
        <AuthInfoPanel isSignUp={isSignUp} />
        <div className="w-[50%] h-full">
          {isSignUp ? <SignUp /> : <Login />}
        </div>
      </div>
    </div>
  );
}
