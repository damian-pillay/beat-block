import { type ProjectResponse } from "../../types/projectResponse";

type ProjectDescriptionProps = Pick<ProjectResponse, "name" | "description">;

export default function ProjectDescription({
  name,
  description,
}: ProjectDescriptionProps) {
  return (
    <section className="flex flex-col font-montserrat justify-between w-full">
      <h3 className="text-left font-montserrat font-extrabold text-white md:text-xl text-[1em] ">
        {name}
      </h3>
      <p className="font-montserrat font-normal text-[#848484] md:text-sm text-[0.55em] text-justify">
        {description}
      </p>
    </section>
  );
}
