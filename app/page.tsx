"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUser,
  FaBriefcase,
  FaProjectDiagram,
  FaCode,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import project1 from "../assets/obnecom.png";
import project2 from "../assets/gis.jpg";
import project3 from "../assets/call_card.png";
import project4 from "../assets/ecom.png";
import project5 from "../assets/rag.png";
import project6 from "../assets/qms.png";
// Type definitions
interface NavigationItem {
  href: string;
  label: string;
  icon: React.ElementType;
  id: string;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

type SectionId = "about" | "experience" | "projects";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [expandedExp, setExpandedExp] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });
  const [expandedProj, setExpandedProj] = useState<Record<number, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLElement | null>(null);

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

  const skills = [
    {
      name: "React JS/TS",
      category: "Frontend",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Next.js",
      category: "Frontend",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "React Native",
      category: "Mobile",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Node.js",
      category: "Backend",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Odoo ERP",
      category: "ERP",
      color: "from-purple-600 to-indigo-600",
    },
    {
      name: "MongoDB",
      category: "Database",
      color: "from-green-600 to-lime-600",
    },
    {
      name: "Python",
      category: "Backend",
      color: "from-yellow-500 to-blue-500",
    },
    { name: "Docker", category: "DevOps", color: "from-blue-400 to-blue-600" },
    {
      name: "TypeScript",
      category: "Language",
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "Tailwind CSS",
      category: "Styling",
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "PostgreSQL",
      category: "Database",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "REST APIs",
      category: "Integration",
      color: "from-orange-500 to-red-500",
    },
  ];

  const experiences = [
    {
      date: "2022 - Present",
      company: "Obanana Corp.",
      position: "Full Stack Developer",
      description:
        "Led development of web, mobile, and ERP solutions, collaborating with clients and mentoring interns. Implemented RAG pipelines, migrated Odoo modules (v16→v18), and built custom QMS systems. Streamlined team workflows and delivered scalable, production-ready applications.",
      tags: ["React", "Node.js", "Odoo", "Python", "Docker", "MongoDB"],
      highlights: [
        "Designed and developed user interfaces for websites and mobile apps using HTML, CSS, PHP, JavaScript, TypeScript, TailwindCSS, and frameworks such as React, Laravel, Next.js, React Native (Expo)",
        "Designed and implemented back-end architecture, including schemas, models, resolvers, caching, and middleware, using PHP, Node.js, and Express",
        "Designed RAG service with Ollama & LangChain for AI-powered knowledge retrieval",
        "Migrated & upgraded custom Odoo modules from v16 to v18",
        "Mentored interns and improved team development efficiency",
        "Built custom QMS module with workflow automation",
      ],
    },
    {
      date: "2022",
      company: "Obanana Corp.",
      position: "OJT Intern",
      description:
        "Assisted in web development projects, contributing to frontend and backend implementation using Laravel and React.",
      tags: ["Laravel", "PHP", "React JS"],
      highlights: [
        "Contributed to multiple web development projects",
        "Learned professional development workflows",
      ],
    },
  ];

  const projects = [
    {
      title: "ObananaPay - Mobile Payment Platform",
      description:
        "End-to-end mobile payment app with QR code scanning, instant transfers, transaction history, and saved contacts.",
      fullDescription:
        "Built with React Native (Expo) and Node.js/Express backend with MongoDB. Implemented secure payment flows, real-time transaction updates, and QR code generation/scanning functionality. Features include contact management, receipt generation, and transaction search with filtering.",
      tags: ["React Native", "Node.js", "MongoDB", "QR Codes"],
      icon: "💳",
      gradient: "from-purple-500 to-pink-500",
      link: "",
      image: project1
    },
    {
      title: "RAG Knowledge Assistant",
      description:
        "Retrieval-Augmented Generation service integrated with Odoo Discuss for context-aware company knowledge queries.",
      fullDescription:
        "Processes PDFs into vector embeddings using LangChain and Ollama LLM. Built REST endpoints for querying and document ingestion. Integrated seamlessly with Odoo Discuss for chat-based knowledge retrieval. Reduces manual document lookup and provides instant answers from company manuals, policies, and procedures.",
      tags: ["Python", "FastAPI", "LangChain", "Ollama"],
      icon: "🤖",
      gradient: "from-blue-500 to-cyan-500",
      link: "",
      image: project5

    },
    {
      title: "GIS Property Mapping Platform",
      description:
        "Interactive web GIS application for visualizing geolocated properties with polygon drawing and filtering.",
      fullDescription:
        "Features dynamic property markers and popups with detailed information. Implemented filtering by property attributes (status, area, custom tags). Enabled drawing, editing, and deletion of polygon boundaries directly on the map. Integrated with Odoo backend for secure data storage, synchronization, and user access control.",
      tags: ["React", "Leaflet", "Odoo", "Tailwind"],
      icon: "🗺️",
      gradient: "from-green-500 to-emerald-500",
      link: "",
      image: project2

    },
    {
      title: "Digital Calling Card Platform",
      description:
        "QR-based digital business card system with customizable templates for personal branding.",
      fullDescription:
        "Users can share contacts via QR scan and create personalized cards with custom layouts and branding. Built with Next.js for fast, seamless web experience. Implemented MongoDB for storing user profiles, card designs, and template configurations. Added design customization tools for editing card templates including colors, fonts, and layouts.",
      tags: ["Next.js", "MongoDB", "Tailwind"],
      icon: "📇",
      gradient: "from-yellow-500 to-orange-500",
      link: "",
      image: project3

    },
    {
      title: "Quality Management System",
      description:
        "Custom Odoo module for document management with approval workflows and compliance reporting.",
      fullDescription:
        "Features version control, automatic numbering, and role-based access control. Supports inspections with dynamic checklists, approval routes, and detailed reporting aligned with internal audit and compliance requirements. ",
      tags: ["Odoo", "Python", "PostgreSQL"],
      icon: "✅",
      gradient: "from-indigo-500 to-purple-500",
      link: "",
      image: project6

    },
    {
      title: "E-commerce Mobile App",
      description:
        "Full-featured shopping app with product browsing, search, cart management, and checkout flow.",
      fullDescription:
        "Built for seamless mobile commerce experience with React Native and Expo. Features include product catalog with categories, advanced search and filters, shopping cart with quantity management, secure checkout process, order tracking, and user profile management. Optimized for performance with image caching and lazy loading.",
      tags: ["React Native", "Expo"],
      icon: "🛍️",
      gradient: "from-red-500 to-pink-500",
      link: "",
      image: project4

    },
  ];

  // Initial animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      // Handle desktop scroll container
      if (mainContentRef.current && window.innerWidth >= 1024) {
        const { scrollTop, scrollHeight, clientHeight } =
          mainContentRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(Math.min(progress, 100));
      } else {
        // Handle mobile window scroll
        const scrollTop = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    const scrollContainer = mainContentRef.current;

    // Add listeners for both container and window
    scrollContainer?.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        root: window.innerWidth >= 1024 ? mainContentRef.current : null,
        threshold: [0.5],
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navigationItems]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const target = document.getElementById(targetId);

      setActiveSection(targetId as SectionId);
      setMobileMenuOpen(false);

      if (target) {
        if (window.innerWidth < 1024) {
          // On mobile, scroll the window
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: targetPosition - 80, behavior: "smooth" });
        } else if (mainContentRef.current) {
          // On desktop, scroll the container
          const container = mainContentRef.current;
          const targetOffset = target.offsetTop - container.offsetTop;
          container.scrollTo({ top: targetOffset - 80, behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -left-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-5 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">MH</span>
              </div>
              <span className="text-white font-semibold">
                Mark Anthony Hipe
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-yellow-400 transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-yellow-400 transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-yellow-400 transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:col-span-2 lg:sticky lg:top-0 lg:h-screen p-8 xl:p-12 flex-col justify-between">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Profile Section */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                <span className="text-3xl font-bold text-white">MH</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
                Mark Anthony Hipe
              </h1>
              <h2 className="text-xl xl:text-2xl text-gray-300 mb-4">
                Full Stack Developer
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Building modern web, mobile, and ERP solutions with cutting-edge
                technologies. Specialized in React, Node.js, Next js, Odoo, and
                AI integration.
              </p>
            </div>

            {/* Navigation */}
            <nav className="space-y-3 mb-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center gap-4 group transition-all duration-300 ${
                      isActive ? "translate-x-2" : ""
                    }`}
                  >
                    <div
                      className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50 scale-110"
                          : "bg-gray-800 group-hover:bg-gray-700 group-hover:scale-105"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 transition-colors duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-yellow-400"
                        }`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-base font-medium transition-all duration-200 ${
                          isActive
                            ? "text-yellow-400"
                            : "text-gray-400 group-hover:text-gray-200"
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mt-1 animate-expand"></div>
                      )}
                    </div>
                  </a>
                );
              })}
            </nav>

            {/* Scroll Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Reading Progress
                </span>
                <span className="text-xs text-yellow-400 font-medium">
                  {Math.round(scrollProgress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-yellow-500/50"
                  style={{ width: `${scrollProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Tech Stack Preview */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "Odoo", "Python", "TypeScript"].map(
                  (tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-yellow-500/50 hover:bg-gray-700 transition-all duration-200 hover:scale-105 cursor-default"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isVisible
                          ? "fade-in-up 0.5s ease-out forwards"
                          : "none",
                        opacity: 0,
                      }}
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className={`space-y-4 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="/Mark_Anthony_Hipe_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-yellow-500/50 text-white font-medium group"
            >
              <svg
                className="w-5 h-5 group-hover:animate-bounce"
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
              Download Resume
            </a>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-xl hover:bg-gradient-to-br hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg group"
                    aria-label={link.label}
                  >
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <span>Available for opportunities</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          ref={mainContentRef}
          className="lg:col-span-3 lg:h-screen lg:overflow-y-auto scroll-smooth pt-20 lg:pt-0"
        >
          {/* About Section */}
          <section id="about" className="min-h-screen p-6 sm:p-8 lg:p-12">
            <div className="max-w-4xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <FaUser className="text-yellow-400" />
                About Me
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 hover:scale-[1.01]">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Full-stack developer with expertise in building modern web,
                    mobile, and ERP applications. I specialize in React
                    ecosystems, Next js, Node.js backends, and Odoo ERP
                    customization, with recent focus on AI integration using RAG
                    pipelines and LLMs.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    I work closely with clients to deliver production-ready
                    solutions, mentor interns, and continuously improve
                    development workflows. My experience spans from payment
                    platforms to GIS applications and custom ERP modules.
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <FaCode className="text-yellow-400" />
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group relative overflow-hidden p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-transparent transition-all duration-300 hover:scale-105 cursor-default"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: "fade-in-up 0.5s ease-out forwards",
                        }}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        ></div>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300`}
                        ></div>
                        <div className="relative">
                          <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors mb-1">
                            {skill.name}
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            {skill.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { text: "Client-focused development", icon: "🎯" },
                    { text: "Team mentorship & training", icon: "👥" },
                    { text: "AI/ML integration", icon: "🧠" },
                    { text: "Agile project delivery", icon: "⚡" },
                  ].map((strength, index) => (
                    <div
                      key={strength.text}
                      className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-xl border border-gray-700/30 hover:border-yellow-500/30 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 cursor-default group"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fade-in-up 0.5s ease-out forwards",
                      }}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {strength.icon}
                      </span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {strength.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="min-h-screen p-6 sm:p-8 lg:p-12">
            <div className="max-w-4xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <FaBriefcase className="text-yellow-400" />
                Experience
              </h2>

              <div className="relative space-y-8">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent hidden md:block"></div>

                {experiences.map((exp, index) => {
                  const ChevronIcon = expandedExp[index]
                    ? FaChevronUp
                    : FaChevronDown;
                  return (
                    <div key={index} className="relative md:pl-12 group">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-6 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-gray-900 hidden md:flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>

                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-yellow-500/10">
                        <div
                          className="p-6 cursor-pointer hover:bg-gray-800/30 transition-colors duration-200"
                          onClick={() =>
                            setExpandedExp((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }))
                          }
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                                {exp.position}
                              </h3>
                              <p className="text-yellow-400 font-medium mb-2">
                                {exp.company}
                              </p>
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <p className="text-sm text-gray-500">
                                  {exp.date}
                                </p>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="w-10 h-10 flex items-center justify-center bg-gray-900/50 rounded-lg group-hover:bg-yellow-500/10 transition-colors">
                                <ChevronIcon className="text-yellow-400 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            expandedExp[index]
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-6 pb-6 border-t border-gray-700/50">
                            <p className="text-gray-300 mt-4 mb-4 leading-relaxed">
                              {exp.description}
                            </p>

                            {exp.highlights && (
                              <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-400 mb-3">
                                  Key Achievements:
                                </p>
                                <ul className="space-y-2">
                                  {exp.highlights.map((highlight, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-3 text-sm text-gray-400 hover:text-gray-300 transition-colors group"
                                    >
                                      <span className="text-yellow-400 mt-1 group-hover:scale-125 transition-transform">
                                        ▸
                                      </span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2">
                              {exp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 text-xs bg-gray-900/50 text-gray-300 rounded-full border border-gray-700 hover:border-yellow-500/50 hover:scale-105 transition-all duration-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            className="min-h-screen p-6 sm:p-8 lg:p-12 pb-20"
          >
            <div className="max-w-4xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <FaProjectDiagram className="text-yellow-400" />
                Featured Projects
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {projects.map((project, index) => {
                  const ChevronIcon = expandedProj[index]
                    ? FaChevronUp
                    : FaChevronDown;
                  return (
                    <div
                      key={index}
                      className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-yellow-500/10"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fade-in-up 0.5s ease-out forwards",
                      }}
                    >
                      <div
                        className="p-6 cursor-pointer hover:bg-gray-800/30 transition-colors duration-200"
                        onClick={() =>
                          setExpandedProj((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            {project.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center bg-gray-900/50 rounded-lg hover:bg-yellow-500/10 transition-all duration-300 group/link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaExternalLinkAlt className="text-gray-400 group-hover/link:text-yellow-400 transition-colors" />
                              </a>
                            )}
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-900/50 rounded-lg group-hover:bg-yellow-500/10 transition-colors">
                              <ChevronIcon className="text-yellow-400 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          expandedProj[index]
                            ? "max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={0}
                          height={0}
                          className="w-full h-auto rounded object-cover"
                        />
                        <div className="px-6 pb-6 border-t border-gray-700/50">
                          <p className="text-gray-300 text-sm mt-4 mb-4 leading-relaxed">
                            {project.fullDescription}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs bg-gray-900/50 text-gray-300 rounded-full border border-gray-700 hover:border-yellow-500/30 transition-all duration-200 hover:scale-105"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Gradient overlay on hover */}
                      <div
                        className={`h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="p-6 sm:p-8 lg:p-12 text-center border-t border-gray-800">
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-gray-500 text-sm">
                © 2025 Mark Anthony Hipe. Built with Next.js & Tailwind CSS
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <span>Designed & Developed with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes expand {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-expand {
          animation: expand 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
