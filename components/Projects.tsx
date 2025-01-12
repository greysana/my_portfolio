export default function ProjectsPage() {
  const projects = [
    {
      image: "/project1.png",
      title: "Project One",
      description: "Details about project.",
      tags: ["React", "Tailwind"],
    },
    {
      image: "/project2.png",
      title: "Project Two",
      description: "More details.",
      tags: ["Next.js", "Framer"],
    },
  ];

  return (
    <section id="projects" className="p-10">
      <h2 className="text-3xl font-bold text-left mb-8">Projects</h2>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 items-center bg-gray-900 text-slate-300 shadow-md hover:shadow-lg p-4 hover:bg-slate-800 rounded-[.3rem] cursor-pointer hover:outline hover:outline-[1px] hover:outline-slate-700"
          >
            <img
              src={project.image}
              alt={project.title}
              className="col-span-4 lg:col-span-3 rounded"
            />
            <div className="col-span-8 lg:col-span-9">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
              <div className="mt-2 space-x-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 text-sm bg-gray-500 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
        <a href="/projects" className="hover:text-gray-400 m-3 pt-10">
          All Projects
        </a>
    </section>
  );
}
