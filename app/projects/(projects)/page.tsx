export default function AllProjectsPage() {
    const allProjects = [
      { year: '2023', project: 'Project One', madeAt: 'Company A', builtWith: 'React', link: '#' },
      { year: '2022', project: 'Project Two', madeAt: 'Company B', builtWith: 'Next.js', link: '#' },
    ];
  
    return (
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-8">All Projects</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Project</th>
              <th className="border px-4 py-2">Made At</th>
              <th className="border px-4 py-2">Built With</th>
              <th className="border px-4 py-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {allProjects.map((proj, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-center">{proj.year}</td>
                <td className="border px-4 py-2">{proj.project}</td>
                <td className="border px-4 py-2">{proj.madeAt}</td>
                <td className="border px-4 py-2">{proj.builtWith}</td>
                <td className="border px-4 py-2 text-blue-500 underline">
                  <a href={proj.link}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
  ``
  