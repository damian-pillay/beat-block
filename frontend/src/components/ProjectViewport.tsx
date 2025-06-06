type ProjectViewportProps = {
  content: any;
};

export default function ProjectViewport({ content }: ProjectViewportProps) {
  return (
    <div className="flex flex-col w-6xl border mx-auto h-[65vh] overflow-auto scrollbar-hide">
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}
