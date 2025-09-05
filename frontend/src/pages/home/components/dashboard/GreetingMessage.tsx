import useUserInfo from "../../api/useUserInfo";
import { AnimatePresence, motion } from "framer-motion";
import DisplayNameLoading from "../../../common/components/loading/DisplayNameLoading";
import React from "react";

export default function GreetingMessage() {
  const { data: userInfo, isLoading, isError } = useUserInfo();

  console.log(userInfo.firstName);

  const hour = new Date().getHours();
  let greeting;
  switch (true) {
    case hour < 12:
      greeting = "Good Morning";
      break;
    case hour < 18:
      greeting = "Good Afternoon";
      break;
    default:
      greeting = "Good Evening";
  }

  let displayName: React.ReactNode;

  if (isLoading) {
    displayName = <DisplayNameLoading />;
  } else if (isError) {
    displayName = "User";
  } else if (userInfo) {
    displayName = userInfo.alias?.trim() || userInfo.firstName;
  } else {
    displayName = "User";
  }

  console.log(displayName);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={`${greeting}-${displayName}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-montserrat font-extrabold text-white text-center sm:w-full w-2/3 mx-auto select-none"
      >
        <span>{greeting}, </span>
        <span>{isLoading ? <DisplayNameLoading /> : displayName}.</span>
      </motion.h1>
    </AnimatePresence>
  );
}
