interface ProjectTimeDateProps {
  timeCreated?: string;
  timeUpdated?: string;
}

export default function ProjectTimeData({
  timeCreated,
  timeUpdated,
}: ProjectTimeDateProps) {
  return (
    <section className="w-full flex justify-around font-montserrat font-normal text-[#848484] md:text-sm text-[0.55em]">
      <p id="date-created" className="italic">
        Created: {timeCreated}
      </p>
      <p id="date-updated" className="italic">
        Updated: {timeUpdated}
      </p>
    </section>
  );
}
