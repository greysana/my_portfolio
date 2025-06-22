import React from 'react';
import { User, Code } from 'lucide-react';

export default function AboutPage() {
  const skills = [
    { name: 'React JS/TS', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Odoo (Module Dev)', category: 'ERP' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'REST APIs', category: 'Integration' },
    { name: 'Git', category: 'Tools' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'VS Code', category: 'Tools' },
    { name: 'Expo', category: 'Mobile' },
    { name: 'Figma', category: 'Design' }
  ];

  return (
    <section id="about" className="p-10 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="w-full flex flex-row justify-center items-center mb-8">
        <h2 className="text-3xl font-bold text-left text-slate-300">About</h2>
        <span className="h-[2px] w-full mx-5 bg-yellow-600"></span>
      </div>

      <div className="space-y-6 mb-4 mx-3">
        
        {/* About Me Card */}
        <div className="perspectiveCard glass1 relative bg-gray-900 opacity-90 hover:opacity-100 text-slate-300 shadow-md hover:shadow-lg rounded-[.3rem] outline-yellow-700 outline-[1px] hover:outline hover:outline-[2px] hover:outline-yellow-600 transition-all duration-300">
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 mr-3 text-yellow-600" />
              <h3 className="text-2xl font-medium text-slate-300">About Me</h3>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-4">
              I&#39;m a versatile developer with experience building web, ERP, and mobile applications using React JS/TS, Next.js, and Odoo. I work closely with clients and teams, providing regular updates and delivering solutions that align with project goals.
            </p>
            
            <p className="text-slate-400 leading-relaxed mb-4">
              I&#39;ve contributed to improving team efficiency and was entrusted with mentoring interns, guiding their technical and development growth.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 text-xs lg:text-sm bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-200 shadow-sm">
                Team Collaboration
              </span>
              <span className="inline-block px-3 py-1 text-xs lg:text-sm bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-200 shadow-sm">
                Mentoring
              </span>
              <span className="inline-block px-3 py-1 text-xs lg:text-sm bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-200 shadow-sm">
                Client Communication
              </span>
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="perspectiveCard glass1 relative bg-gray-900 opacity-90 hover:opacity-100 text-slate-300 shadow-md hover:shadow-lg rounded-[.3rem] outline-yellow-700 outline-[1px] hover:outline hover:outline-[2px] hover:outline-yellow-600 transition-all duration-300">
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Code className="w-6 h-6 mr-3 text-yellow-600" />
              <h3 className="text-2xl font-medium text-slate-300">Skills</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-2 text-sm bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-200 shadow-sm text-center"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            
            {/* Skill Categories */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
              <span className="inline-block px-3 py-1 text-xs bg-yellow-700 text-yellow-100 rounded-full">
                Frontend Development
              </span>
              <span className="inline-block px-3 py-1 text-xs bg-yellow-700 text-yellow-100 rounded-full">
                Backend Development
              </span>
              <span className="inline-block px-3 py-1 text-xs bg-yellow-700 text-yellow-100 rounded-full">
                ERP Systems
              </span>
              <span className="inline-block px-3 py-1 text-xs bg-yellow-700 text-yellow-100 rounded-full">
                Mobile Development
              </span>
            </div>
          </div>
        </div>

        {/* Key Strengths Card */}
        <div className="perspectiveCard glass1 relative bg-gray-900 opacity-90 hover:opacity-100 text-slate-300 shadow-md hover:shadow-lg rounded-[.3rem] outline-yellow-700 outline-[1px] hover:outline hover:outline-[2px] hover:outline-yellow-600 transition-all duration-300">
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <div className="h-3 w-3 bg-yellow-600 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-medium text-slate-300">Key Strengths</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-slate-400">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span>Client-focused approach</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span>Regular project updates</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span>Team efficiency improvement</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span>Intern mentorship experience</span>
              </div>
            </div>
          </div>
        </div>

      </div>

     
    </section>
  );
}