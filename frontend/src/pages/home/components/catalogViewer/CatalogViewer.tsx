import ProjectBlock from "../../../common/components/projectBlock/ProjectBlock";
import type { project } from "../../../common/types/project";
import { showErrorToast } from "../../../common/utils/toastConfig";
import useFetchCatalog from "../../hooks/useFetchCatalog";

export default function Catalog() {
  const { isPending, error, data: catalog } = useFetchCatalog();

  return (
    <>
      <div className=" overflow-auto relative w-full h-full z-11">
        <div
          className="absolute top-0 w-full h-5 pointer-events-none z-10 mx-auto"
          style={{
            background: "linear-gradient(to bottom, #171515, transparent)",
          }}
        ></div>
        <div className="relative grid grid-cols-2 [@media(max-width:1280px)]:grid-cols-1 items-start md:auto-rows-[12rem] auto-rows-[9.5rem] gap-3 max-w-[89rem] mx-auto overflow-auto scrollbar-hide md:px-10 px-8 py-7 z-9 h-full">
          {catalog &&
            catalog.projects.map((project: project, index: number) => (
              <ProjectBlock key={project.id || index} project={project} />
            ))}
          {isPending && <p>loading...</p>}
          {error && showErrorToast(`Error fetching catalog: ${error}`)}
        </div>
      </div>
    </>
  );
}
