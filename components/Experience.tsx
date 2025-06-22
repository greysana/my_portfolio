import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ExperiencePage() {
  const experiences = [
    {
      date: "2022 - present",
      name: "Company Corp.",
      position: "Web Developer",
      description:
        "Designed and developed user interfaces for websites and mobile apps using HTML, CSS, PHP, JavaScript, TypeScript, TailwindCSS, and frameworks such as React, Laravel, Next.js, React Native (Expo), and Odoo. Tested and debugged code to ensure functionality and performance across various platforms.",
      tags: [
        "React TS/JS",
        "Expo React Native",
        "Tailwindcss",
        "Mongodb",
        "Node JS",
        "Odoo",
      ],
    },
    {
      date: "2022",
      name: "Company Corp. ",
      position: "OJT",
      description:
        "Assisted in developing websites, contributing to various aspects of the development process.",
      tags: ["Laravel", "PHP", "React JS"],
    },
  ];

  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(() => {
    // Initialize all cards as expanded by default
    const initialState: Record<number, boolean> = {};
    experiences.forEach((_, index) => {
      initialState[index] = true;
    });
    return initialState;
  });

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="experience" className="p-10">
      <div className="w-full flex flex-row justify-center items-center mb-8">
        <h2 className="text-3xl font-bold text-left">Experience</h2>
        <span className="h-[2px] w-full mx-5 bg-primarycol"></span>
      </div>

      <div className="space-y-6 mb-4 mx-3 px-[3rem] border-l-2 border-goldSlate">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="perspectiveCard glass1 relative bg-gray-900 opacity-90 hover:opacity-100 text-slate-300 shadow-md hover:shadow-lg rounded-[.3rem] cursor-pointer outline-goldSlate outline-[1px] hover:outline hover:outline-[2px] hover:outline-primarycol transition-all duration-300"
          >
            <span className="absolute -left-[3.55rem] top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full outline outline-[2px] outline-primarycol bg-[#9e7817] shadow-xl"></span>
            
            {/* Header - Always visible */}
            <div 
              className="grid grid-cols-12 gap-4 p-4 cursor-pointer"
              onClick={() => toggleCard(index)}
            >
              <div className="col-span-3 flex items-center text-left font-semibold text-goldSlate">
                <span className="text-sm lg:text-base">{exp.date}</span>
              </div>
              
              <div className="col-span-8 flex flex-col justify-center">
                <h3 className="text-lg lg:text-xl font-medium truncate">{exp.position}</h3>
                <h5 className="text-sm font-medium text-slate-400 truncate">{exp.name}</h5>
              </div>
              
              <div className="col-span-1 flex items-center justify-center">
                {expandedCards[index] ? (
                  <ChevronUp className="h-5 w-5 text-primarycol transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primarycol transition-transform duration-200" />
                )}
              </div>
            </div>

            {/* Collapsible Content */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCards[index] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-4 border-t border-gray-700">
                <div className="grid grid-cols-12 gap-4 pt-4">
                  <div className="col-span-3"></div> {/* Spacer for alignment */}
                  <div className="col-span-9">
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 text-xs lg:text-sm bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-200 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="api/uploads/Mark_Anthony_Hipe_Resume.pdf"
          className="inline-flex items-center px-6 py-3 text-primarycol hover:text-gray-300 font-medium transition-colors duration-200 border border-primarycol hover:border-gray-300 rounded-lg hover:bg-primarycol hover:bg-opacity-10"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download My Resume
        </a>
      </div>
    </section>
  );
}