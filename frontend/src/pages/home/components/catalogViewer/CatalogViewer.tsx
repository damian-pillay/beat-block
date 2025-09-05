import { AnimatePresence } from "framer-motion";
import ProjectBlock from "../../../common/components/projectBlock/ProjectBlock";
import type { ProjectResponse } from "../../../common/types/projectResponse";
import { showErrorToast } from "../../../common/utils/toastConfig";
import useFetchCatalog from "../../hooks/useFetchCatalog";
import { motion } from "framer-motion";
import { useDeletionStore } from "../../services/useDeletionStore";
import { useSearchBarStore } from "../../services/useSearchBarStore";

export default function Catalog() {
  const { isPending, error, data: fullcatalog } = useFetchCatalog();
  const { searchBarText } = useSearchBarStore();
  const { deletingIds } = useDeletionStore();

  const catalog =
    !searchBarText || searchBarText === ""
      ? fullcatalog.projects
      : fullcatalog.projects.filter((project: ProjectResponse) =>
          project.name.toLowerCase().includes(searchBarText.toLowerCase())
        );

  return (
    <>
      <div className=" overflow-auto relative w-full h-full z-11">
        <div
          className="absolute top-0 w-full h-5 pointer-events-none z-10 mx-auto"
          style={{
            background: "linear-gradient(to bottom, #171515, transparent)",
          }}
        ></div>
        <AnimatePresence mode="wait">
          <motion.div className="relative grid grid-cols-2 [@media(max-width:1280px)]:grid-cols-1 items-start md:auto-rows-[12rem] auto-rows-[9.5rem] gap-3 max-w-[89rem] mx-auto overflow-auto scrollbar-hide md:px-10 px-8 py-7 z-9 h-full pb-24">
            {catalog &&
              catalog.map((project: ProjectResponse, index: number) => (
                <ProjectBlock
                  key={project.id || index}
                  project={project}
                  isDeleting={deletingIds.has(project.id)}
                />
              ))}
            {isPending && <p>loading...</p>}
            {error && showErrorToast(`Error fetching catalog: ${error}`)}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
