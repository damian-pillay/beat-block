import { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../../common/components/navBar/Navbar";
import Catalog from "../components/projectViewport/CatalogViewer";
import ScreenTexture from "../../common/layout/ScreenTexture";
import { useCatalogStore } from "../services/useCatalogStore";
import { motion } from "framer-motion";
import { useProjectStore } from "../../projectEditor/services/useProjectStore";

function Home() {
  const { catalog, fetchCatalog } = useCatalogStore();
  const { resetProject } = useProjectStore();

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    resetProject();
  }, [resetProject]);

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden flex flex-col">
        <ScreenTexture />
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className=" overflow-hidden flex flex-col"
        >
          <Dashboard />
          <Catalog content={catalog} />
        </motion.div>
      </div>
    </>
  );
}

export default Home;
