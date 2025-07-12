import ProjectBlock from "../../../../common/components/projectBlock/ProjectBlock";
import { useProjectStore } from "../../../services/useProjectStore";
import PublishProject from "./PublishProject";

export default function Preview() {
  const { project } = useProjectStore();

  return (
    <div className="flex flex-col justify-between gap-5 h-full w-full">
      <section className="flex flex-col gap-2 w-full">
        <h4 className="font-bold">BEATBLOCK PREVIEW</h4>
        <p>This is how your project will be previewed on the homepage</p>
      </section>
      <section
        style={{
          backgroundColor: "#272626",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.15) 100%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          background: "#171515",
        }}
        className="flex p-2 rounded-4xl bg-[#171515] h-full w-[90%] mx-auto items-center "
      >
        <ProjectBlock project={project} />
      </section>
      <section className="flex justify-center py-2">
        <p>Publish your project if you are happy with your results !</p>
      </section>
      <PublishProject />
    </div>
  );
}
