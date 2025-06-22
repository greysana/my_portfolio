import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import project1 from "../assets/obnecom.png";
import project2 from "../assets/gis.jpg";
import project3 from "../assets/call_card.png";
import project4 from "../assets/ecom.png";
import project5 from "../assets/rag.png";
import project6 from "../assets/qms.png";


export default function ProjectsPage() {
  const projects = [
    {
      image: project1,
      title: "Obananapay",
      description:
        "Obananapay is a modern, end‑to‑end payment platform built with a React.js frontend and a Node.js/Express backend (MongoDB/Mongoose). It lets users send and receive money instantly, scan or generate QR codes for payments, download detailed receipts, browse a searchable transaction history, and save frequent contacts for one‑tap transfers—all within a sleek, intuitive interface.",
      tags: ["Expo React Native", "Node JS", "Mongodb"],
    },
    {
      image: project2,
      title: "Property GIS",
      description:
        "A GIS web application presents geolocated properties as interactive map pins—clicking a pin opens a popup with detailed information about that location. Users can apply filters to narrow visible properties by criteria such as area, status, or custom tags, enabling focused exploration of the map. The app supports drawing, editing, and deleting polygons directly on the map to outline exact property boundaries, with vector layers dynamically reflecting those shapes. All spatial data, user-defined areas, and property metadata are securely stored and managed through an Odoo backend, providing robust data synchronization and access control. An intuitive interface guides users through viewing, filtering, and defining spatial data without requiring specialized GIS expertise",
      tags: ["React", "Leaflet", "Tailwind", "Odoo"],
    },
    {
      image: project3,
      title: "Dynamic Digital Calling Card & Creator",
      description:
        "This Next.js, Tailwind CSS, and MongoDB personal project delivers a modern digital calling card platform with a clever two-pronged approach. Upon scanning a QR code, the web application instantly displays the user's contact details directly on the web, offering a seamless way to share information. Going beyond simple viewing, it also empowers users to unleash their creativity and design unique calling cards. They can choose from a selection of pre-designed templates and then personalize them to reflect their individual style by tweaking colors, fonts, and the arrangement of elements. This dual functionality provides both a highly practical method for exchanging contact information and an engaging tool for crafting a memorable personal brand.",
      tags: ["NextJS", "Tailwind", "MongoDB"],
    },
    {
      image: project4,
      title: "Ecommerce App",
      description:
        "This Expo React Native project is a user-focused e-commerce app enabling users to browse product lists, search for items, manage a shopping cart, and complete the checkout process seamlessly on their mobile devices.",
      tags: ["Expo React Native"],
    },
    {
      image: project5,
      title: "Retrieval‑Augmented Generation service",
      description:
        "An RAG (Retrieval‑Augmented Generation) service built in Python that leverages LangChain for vector storage and Ollama as its LLM backend. It exposes two REST endpoints: one (/query) accepts a user prompt, performs a similarity search over the stored embeddings to retrieve relevant context, and then feeds both prompt and context to Ollama to generate a precise answer; the other (/upload-pdf) ingests PDF files, converts them into embeddings, and indexes them into the vector store for future retrieval and enrichment of responses.",
      tags: ["Python", "Ollama"],
    },
    {
      image: project6,
      title: "Quality Management System",
      description:
        "This Odoo Quality Management System (QMS) module gives you a secure, centralized document repository with built‑in request‑to‑approval workflows, automatic document numbering and version control, and role‑based access permissions. ",
      tags: ["Odoo"],
    },
  ];

  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    () => {
      // Initialize all cards as collapsed by default
      const initialState: Record<number, boolean> = {};
      projects.forEach((_, index) => {
        initialState[index] = false;
      });
      return initialState;
    }
  );

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="projects" className="p-10">
      <div className="w-full flex flex-row justify-center items-center mb-8">
        <h2 className="text-3xl font-bold text-left">Projects</h2>
        <span className="h-[2px] w-full mx-5 bg-primarycol"></span>
      </div>

      <div className="p-2 mb-4 w-full flex flex-wrap justify-center items-start gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="perspectiveCard glass w-[18rem] min-h-[400px] flex flex-col relative outline-[2px] m-3 opacity-90 hover:opacity-100 outline-goldSlate bg-gray-900 text-slate-300 shadow-md hover:shadow-lg hover:bg-slate-800 rounded-[.3rem] cursor-pointer hover:outline hover:outline-[2px] hover:outline-primarycol transition-all duration-500 ease-out hover:scale-[1.02]"
            style={{
              transform: expandedCards[index] ? "scale(1.02)" : "scale(1)",
              // transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full outline outline-[2px] outline-primarycol bg-slate-900 shadow-xl"></span>

            {/* Image Section */}
            <div className="flex-shrink-0 p-4 pb-2">
              <Image
                src={project.image}
                alt={project.title}
                width={0}
                height={0}
                className="w-full h-[120px] rounded object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 px-4 pb-4 flex flex-col">
              {/* Header - Always visible */}
              <div
                className="flex items-center justify-between cursor-pointer mb-3 hover:bg-gray-800 hover:bg-opacity-50 rounded-lg p-2 -m-2 transition-all duration-200"
                onClick={() => toggleCard(index)}
              >
                <h3 className="text-lg font-semibold text-primarycol flex-1 mr-2">
                  {project.title}
                </h3>
                <div className="flex-shrink-0">
                  <div
                    className="transform transition-all duration-500 ease-out"
                    style={{
                      transform: expandedCards[index]
                        ? "rotate(180deg) scale(1.1)"
                        : "rotate(0deg) scale(1)",
                      transition:
                        "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <ChevronDown className="h-5 w-5 text-primarycol" />
                  </div>
                </div>
              </div>

              {/* Description - Collapsible */}
              <div className="flex-1 mb-4">
                <div
                  className="overflow-hidden"
                  style={{
                    // maxHeight: expandedCards[index] ? '500px' : '300px',
                    opacity: expandedCards[index] ? 1 : 0.8,
                    transition:
                      "max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out",
                  }}
                >
                  <p
                    className={`text-sm text-slate-400 leading-relaxed transition-all duration-300 ${
                      !expandedCards[index] ? "line-clamp-6" : ""
                    }`}
                    style={{
                      transform: expandedCards[index]
                        ? "translateY(0px)"
                        : "translateY(-2px)",
                      transition:
                        "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tags - Always visible */}
              <div className="mt-auto">
                <div
                  className="flex flex-wrap gap-2"
                  style={{
                    transform: expandedCards[index]
                      ? "translateY(0px) scale(1)"
                      : "translateY(-5px) scale(0.98)",
                    opacity: expandedCards[index] ? 1 : 0.9,
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 text-xs text-slate-100 bg-primarycol rounded-full shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
