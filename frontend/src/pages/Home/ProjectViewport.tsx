import ProjectBlock from "../../components/common/ProjectBlock/ProjectBlock";
import type { Project } from "../../types/project";

type ProjectViewportProps = {
  content: {
    projects: Project;
  };
};

export default function ProjectViewport({ content }: ProjectViewportProps) {
  return (
    <>
      <div className=" overflow-auto relative w-full h-full z-11">
        <div
          className="absolute top-0 w-full h-5 pointer-events-none z-10 mx-auto"
          style={{
            background: "linear-gradient(to bottom, #171515, transparent)",
          }}
        ></div>
        <div className="relative grid grid-cols-2 [@media(max-width:1280px)]:grid-cols-1 items-start md:auto-rows-[12rem] auto-rows-[9.5rem] gap-3 max-w-[89rem] mx-auto h-full overflow-auto scrollbar-hide md:px-10 px-8 py-7 z-9">
          {Array.isArray(content?.projects) && content.projects.length > 0 ? (
            content.projects.map((project: Project, index: number) => (
              <ProjectBlock key={project.id || index} project={project} />
            ))
          ) : (
            <p>No Projects Found</p>
          )}
        </div>
      </div>
    </>
  );
}
