export default function ProjectDescription({
  name,
  description,
}: {
  name?: string;
  description?: string;
}) {
  return (
    <section className="flex flex-col font-montserrat justify-between w-full flex-grow">
      <h3 className="text-left font-montserrat font-extrabold text-white md:text-xl text-[1em]">
        {name}
      </h3>
      <p className="font-montserrat font-normal h-[90%] text-[#848484] md:text-sm text-[0.55em] text-justify">
        {description}
      </p>
    </section>
  );
}
