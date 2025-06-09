type ProjectViewportProps = {
  content: any;
};

export default function ProjectViewport({ content }: ProjectViewportProps) {
  return (
    <div className="flex flex-col max-w-[80%] w-6xl mx-auto h-full max-h-[90%] overflow-auto scrollbar-hide">
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}
