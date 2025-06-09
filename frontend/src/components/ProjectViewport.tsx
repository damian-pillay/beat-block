import ProjectBlock from "./ProjectBlock";

type ProjectViewportProps = {
  content: any;
};

export default function ProjectViewport({ content }: ProjectViewportProps) {
  return (
    <div className="grid grid-cols-2 [@media(max-width:1280px)]:grid-cols-1 items-start md:auto-rows-[12rem] auto-rows-[9.5rem] gap-3 max-w-[90%] w-6xl mx-auto h-full overflow-auto scrollbar-hide">
      {Array.isArray(content?.projects) && content.projects.length > 0 ? (
        content.projects.map((project: any, index: number) => (
          <ProjectBlock key={project.id || index} project={project} />
        ))
      ) : (
        <p>No Projects Found</p>
      )}
    </div>
  );
}
