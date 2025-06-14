import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Navbar from "../../components/common/NavBar/Navbar";
import ProjectViewport from "./ProjectViewport";
import ScreenTexture from "../../components/layout/ScreenTexture";

function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/api/project");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden flex flex-col">
        <ScreenTexture />
        <Navbar />
        <Header />
        <ProjectViewport content={content} />
      </div>
    </>
  );
}

export default Home;
