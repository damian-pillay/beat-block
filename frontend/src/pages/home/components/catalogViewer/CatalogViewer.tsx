import { AnimatePresence } from "framer-motion";
import ProjectBlock from "../../../common/components/projectBlock/ProjectBlock";
import type { ProjectResponse } from "../../../common/types/projectResponse";
import { showErrorToast } from "../../../common/utils/toastConfig";
import useFetchCatalog from "../../hooks/useFetchCatalog";
import { motion } from "framer-motion";
import { useDeletionStore } from "../../services/useDeletionStore";
import { useSearchBarStore } from "../../services/useSearchBarStore";
import { FolderOpenIcon } from "lucide-react";

export default function Catalog() {
  const { isPending, error, data: fullcatalog } = useFetchCatalog();
  const { searchBarText } = useSearchBarStore();
  const { deletingIds } = useDeletionStore();

  const catalog =
    !searchBarText || searchBarText === ""
      ? fullcatalog
        ? fullcatalog.projects
        : undefined
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
            {catalog && catalog.length === 0 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center col-span-full py-16 text-center gap-5"
                >
                  <FolderOpenIcon size={50} className="text-zinc-700" />
                  <h3 className="text-lg font-semibold">No projects found</h3>
                  <p className="text-sm text-zinc-500 mt-1 max-w-xs">
                    It looks like your catalog is empty. Try adding a new
                    project or adjusting your search.
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
            {isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center h-full col-span-full py-16"
              >
                <div className="w-10 h-10 border-4 border-zinc-700 border-t-transparent rounded-full animate-spin" />
              </motion.div>
            )}
            {error && showErrorToast(`Error fetching catalog: ${error}`)}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
