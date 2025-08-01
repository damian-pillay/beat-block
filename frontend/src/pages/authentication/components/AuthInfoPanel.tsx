import { BeatblockLogo } from "../../../assets/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthInfoPanel({ isSignUp }: { isSignUp: boolean }) {
  return (
    <section className="w-[50%] h-full flex items-center justify-center p-23 px-17">
      <div className="flex flex-col justify-between items-start w-full h-150">
        <section className="flex flex-col gap-8 items-start w-full">
          {" "}
          <img src={BeatblockLogo} className="object-contain h-14" />
          {isSignUp ? (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-bold text-5xl"
            >
              Create
              <br />
              New Account
            </motion.h1>
          ) : (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-bold text-5xl"
            >
              Login
            </motion.h1>
          )}
          {isSignUp ? (
            <motion.h2
              key={"login-link"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-md"
            >
              Already Registered?{" "}
              <Link to="/login">
                <span className="text-blue-400 font-light">Login</span>
              </Link>
            </motion.h2>
          ) : (
            <motion.h2
              key={"sign-up-link"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-md"
            >
              Not Registered?{" "}
              <Link to="/sign-up">
                <span className="text-blue-400 font-light">Sign Up</span>
              </Link>
            </motion.h2>
          )}
        </section>
        <motion.section
          layout
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6 items-start w-full"
        >
          <hr className="w-[30%] h-[3px] bg-white rounded-sm" />
          <p className="text-sm">
            Have direct access to every one of your music production projects -
            all from one convenient place.
          </p>
        </motion.section>
        <section className="flex flex-col gap-5 items-start w-full">
          <button className="h-10 w-50 rounded-full bg-red-600">
            LEARN MORE
          </button>
        </section>
      </div>
    </section>
  );
}
