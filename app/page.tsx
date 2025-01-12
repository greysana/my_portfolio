import AboutPage from "@/components/About";
import ExperiencePage from "@/components/Experience";
import ProjectsPage from "@/components/Projects";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden lg:h-[100vh] h-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
        {/* Left Sidebar */}
        <aside className=" w-full h-full p-10 lg:p-20 bg-gray-900 sticky max-h-[100vh] text-white lg:col-span-2 flex flex-col justify-between">
          <div className=" ">
            <h1 className="text-5xl font-bold">Your Name</h1>
            <p className="mt-3 text-xl text-gray-400">A brief bio here.</p>
            <nav className="mt-20 text-xl hidden  lg:flex flex-col justify-center">
              <ul className="space-y-4 ">
                <li>
                  <a href="#about" className="hover:text-gray-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-gray-400">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-gray-400">
                    Projects
                  </a>
                </li>
              
              </ul>
            </nav>
          </div>
          <div className="flex space-x-4 mt-10">
            <a href="https://github.com" className="hover:text-gray-200">
              GitHub
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-200">
              LinkedIn
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="bg-gray-900 p-1 lg:col-span-3 text-slate-100 lg:overflow-y-scroll lg:max-h-[100vh] max-h-none overflow-auto ">
          <AboutPage />
          <ExperiencePage />
          <ProjectsPage />
        </main>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
