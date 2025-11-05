interface ProjectTimeDateProps {
  timeCreated: string;
  timeUpdated: string;
}

export default function ProjectTimeData({
  timeCreated,
  timeUpdated,
}: ProjectTimeDateProps) {
  const createDate = new Date(timeCreated).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updateDate = new Date(timeUpdated).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="w-full flex justify-around font-montserrat font-normal text-[#848484] md:text-sm text-[0.55em]">
      <p id="date-created" className="italic">
        Created: {createDate}
      </p>
      <p id="date-updated" className="italic">
        Updated: {updateDate}
      </p>
    </section>
  );
}
