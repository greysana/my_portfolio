"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { IconType } from "react-icons";
import AboutPage from "@/components/About";
import ExperiencePage from "@/components/Experience";
import ProjectsPage from "@/components/Projects";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUser,
  FaBriefcase,
  FaProjectDiagram,
} from "react-icons/fa";

// Type definitions
interface NavigationItem {
  href: string;
  label: string;
  icon: IconType;
  id: string;
}

interface SocialLink {
  href: string;
  label: string;
  icon: IconType;
}

type SectionId = "about" | "experience" | "projects";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const mainContentRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      { href: "#about", label: "About", icon: FaUser, id: "about" },
      {
        href: "#experience",
        label: "Experience",
        icon: FaBriefcase,
        id: "experience",
      },
      {
        href: "#projects",
        label: "Projects",
        icon: FaProjectDiagram,
        id: "projects",
      },
    ],
    []
  );

  const socialLinks: SocialLink[] = useMemo(
    () => [
      { href: "https://github.com/greysana", label: "GitHub", icon: FaGithub },
      {
        href: "https://www.linkedin.com/in/mark-anthony-hipe-28a34911a",
        label: "LinkedIn",
        icon: FaLinkedin,
      },
      {
        href: "mailto:hipemarkanthony@gmail.com",
        label: "Email",
        icon: FaEnvelope,
      },
    ],
    []
  );

  // Throttled intersection observer callback
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Clear any pending updates
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const targetId = entry.target.id as SectionId;
            setActiveSection(targetId);
          }
        });
      }, 50); // Throttle to 50ms
    },
    []
  );

  // Optimized Intersection Observer setup
  useEffect(() => {
    if (!mainContentRef.current) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: mainContentRef.current,
      threshold: [0.3], // Reduced thresholds for better performance
      rootMargin: "-80px 0px -80px 0px", // Reduced margin calculations
    });

    observerRef.current = observer;

    // Use requestAnimationFrame for better timing
    const setupObserver = () => {
      navigationItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Reduced delay and use RAF
    requestAnimationFrame(() => {
      setTimeout(setupObserver, 100);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleIntersection, navigationItems]);

  // Optimized smooth scroll function
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target && mainContentRef.current) {
        const container = mainContentRef.current;
        const targetOffset = target.offsetTop - container.offsetTop;

        // Temporarily disable observer during programmatic scroll
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        container.scrollTo({
          top: targetOffset - 50,
          behavior: "smooth",
        });

        // Set active section immediately for responsiveness
        setActiveSection(targetId as SectionId);

        // Re-enable observer after scroll completes
        setTimeout(() => {
          if (observerRef.current && mainContentRef.current) {
            navigationItems.forEach((item) => {
              const element = document.getElementById(item.id);
              if (element) {
                observerRef.current!.observe(element);
              }
            });
          }
        }, 1000);
      }
    },
    [navigationItems]
  );

  // Memoized progress calculation
  const progressHeight = useCallback((): number => {
    const currentIndex = navigationItems.findIndex(
      (item) => item.id === activeSection
    );
    return Math.max(20, ((currentIndex + 1) / navigationItems.length) * 100);
  }, [activeSection, navigationItems]);

  const progressTop = useCallback((): number => {
    const currentIndex = navigationItems.findIndex(
      (item) => item.id === activeSection
    );
    return ((currentIndex + 1) / navigationItems.length) * 100 - 2;
  }, [activeSection, navigationItems]);

  return (
    <div className="overflow-hidden lg:h-[100vh] h-auto relative bg-gray-900">
      <span className="absolute -bottom-[200px] circle"></span>
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
        {/* Enhanced Left Sidebar - Optimized */}
        <aside className="w-full h-full p-7 lg:p-10 lg:pl-20 sticky max-h-[100vh] text-white lg:col-span-2 flex flex-col justify-between">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-orange-900/10 pointer-events-none"></div>

          <div className="mt-5 relative z-10">
            {/* Profile Section */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl font-bold text-gray-900">MH</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Mark Anthony Hipe
              </h1>
              <h2 className="text-2xl font-[500] mt-1 text-gray-300">
                Web Developer
              </h2>
            </div>

            <p className="mt-3 text-lg text-gray-400 leading-relaxed">
              Passionate web developer creating modern, responsive applications
              with cutting-edge technologies.
            </p>

            {/* Enhanced Navigation with Active States - Optimized */}
            <nav className="mt-16 hidden lg:block">
              <ul className="space-y-6">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon as React.ComponentType<{
                    className?: string;
                  }>;
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id} className="group">
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`flex items-center gap-4 text-lg transition-all duration-200 group-hover:translate-x-2 ${
                          isActive
                            ? "text-yellow-400 translate-x-2"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-yellow-500/30 border border-yellow-400/50"
                              : "bg-gray-800 group-hover:bg-yellow-500/20"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="relative">
                          {item.label}
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-200 ${
                              isActive ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </span>
                        {isActive && (
                          <div className="w-2 h-2 bg-yellow-400 rounded-full ml-auto animate-pulse"></div>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Optimized Progress Indicator */}
              <div className="mt-8 hidden lg:block">
                <div className="w-px h-20 bg-gray-700 relative mx-4">
                  <div
                    className="w-px bg-gradient-to-b from-yellow-400 to-orange-400 transition-all duration-300 ease-out absolute top-0"
                    style={{
                      height: `${progressHeight()}%`,
                      transform: "translateZ(0)", // Force GPU acceleration
                    }}
                  ></div>
                  <div
                    className="absolute -left-1 bg-yellow-400 w-1 h-1 rounded-full transition-all duration-300"
                    style={{
                      top: `${progressTop()}%`,
                      transform: "translateZ(0)", // Force GPU acceleration
                    }}
                  ></div>
                </div>
              </div>
            </nav>

            {/* Skills/Tech Stack Preview */}
            <div className="mt-7 hidden lg:block">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "Odoo"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-gray-800 rounded-full text-gray-300 border border-gray-700 hover:border-yellow-400/50 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Footer Section */}
          <div className="relative z-10">
            {/* Resume Download Button */}
            <div className="mb-3 mt-2">
              <a
                href="/api/uploads/Mark_Anthony_Hipe_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-gray-900 font-medium"
              >
                {/* {React.createElement(FaDownload, { className: "w-4 h-4" })} */}
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon as React.ComponentType<{
                  className?: string;
                }>;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl hover:bg-yellow-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
                    aria-label={link.label}
                  >
                    <IconComponent className="w-5 h-5 group-hover:text-gray-900 transition-colors duration-200" />
                  </a>
                );
              })}
            </div>

            {/* Status Indicator */}
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for opportunities</span>
            </div>
          </div>
        </aside>

        {/* Main Content with Ref - Optimized */}
        <main
          ref={mainContentRef}
          className="p-1 lg:col-span-3 text-slate-100 lg:overflow-y-scroll lg:max-h-[100vh] max-h-none overflow-auto relative scroll-smooth will-change-scroll"
          style={{ scrollBehavior: "smooth" }}
        >
          <span className="absolute right-0 -top-[200px] circle1"></span>
          <section id="about" className="">
            <AboutPage />
          </section>
          <section id="experience" className="">
            <ExperiencePage />
          </section>
          <section id="projects" className="">
            <ProjectsPage />
          </section>
        </main>
      </div>
    </div>
  );
}
