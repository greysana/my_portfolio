export default function ExperiencePage() {
  const experiences = [
    {
      date: "2023",
      name: "Project One",
      description: "A great project.",
      tags: ["React", "Tailwind"],
    },
    {
      date: "2022",
      name: "Project Two",
      description: "Another awesome project.",
      tags: ["Next.js", "CSS"],
    },
  ];

  return (
    <section id="experience" className="p-10">
      <h2 className="text-3xl font-bold text-left mb-8">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-1 p-4 bg-gray-900 text-slate-300 shadow-md hover:shadow-lg hover:bg-slate-800 rounded-[.3rem] cursor-pointer hover:outline hover:outline-[1px] hover:outline-slate-700"
          >
            <div className="col-span-4 lg:col-span-3 text-left text-gray-500">
              {exp.date}
            </div>
            <div className="col-span-8 lg:col-span-9">
              <h3 className="text-xl font-semibold">{exp.name}</h3>
              <p className="mt-1">{exp.description}</p>
              <div className="mt-2 space-x-2">
                {exp.tags.map((tag, idx) => (
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
      <a href="api/uploads/resume.pdf" className="hover:text-gray-400 m-3 pt-10">
        My Resume
      </a>
    </section>
  );
}
