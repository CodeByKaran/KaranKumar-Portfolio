import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useMemo, memo, useEffect, useState } from "react";
import {
  Code2,
  Rocket,
  Zap,
  ArrowRight,
  Terminal,
  Layers,
  Server,
  Database,
  Globe,
} from "lucide-react";

// The data structure for our infinite scrolling tech stack
const techCategories = [
  {
    title: "Frontend",
    direction: -1,
    speed: 35,
    skills: [
      { name: "React.js", icon: <Code2 size={20} /> },
      { name: "HTML5", icon: <Globe size={20} /> },
      { name: "CSS3", icon: <Zap size={20} /> },
      { name: "Tailwind CSS", icon: <Zap size={20} /> },
      { name: "Material UI", icon: <Layers size={20} /> },
      { name: "Shadcn UI", icon: <Layers size={20} /> },
    ],
  },
  {
    title: "Backend & Database",
    direction: 1,
    speed: 40,
    skills: [
      { name: "Node.js", icon: <Server size={20} /> },
      { name: "Express.js", icon: <Server size={20} /> },
      { name: "Supabase", icon: <Database size={20} /> },
      { name: "Firebase", icon: <Zap size={20} /> },
      { name: "Appwrite", icon: <Rocket size={20} /> },
      { name: "PostgreSQL", icon: <Database size={20} /> },
      { name: "MongoDB", icon: <Database size={20} /> },
    ],
  },
  {
    title: "Version Control & Operations",
    direction: -1,
    speed: 30,
    skills: [
      { name: "Git", icon: <Terminal size={20} /> },
      { name: "GitHub", icon: <Code2 size={20} /> },
      { name: "GitHub Actions", icon: <Rocket size={20} /> },
    ],
  },
];

// Optimized Infinite Carousel Component
const InfiniteCarousel = memo(
  ({
    category,
    isTabActive,
  }: {
    category: (typeof techCategories)[0];
    isTabActive: boolean;
  }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.1 });
    const isMoving = isInView && isTabActive;

    // Triplicate the array to ensure smooth infinite scrolling even on ultra-wide screens
    const duplicatedSkills = [
      ...category.skills,
      ...category.skills,
      ...category.skills,
    ];

    return (
      <div className="mb-12 last:mb-0">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-8 px-6">
          <h3 className="text-xl md:text-2xl font-black italic text-white/70 uppercase tracking-widest">
            {category.title}
          </h3>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
        </div>

        {/* Carousel Container with Edge Fading */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden flex py-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-4 px-3 will-change-transform"
            animate={
              isMoving
                ? {
                    x:
                      category.direction < 0
                        ? ["0%", "-33.33%"]
                        : ["-33.33%", "0%"],
                  }
                : {}
            }
            transition={{
              duration: category.speed,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedSkills.map((skill, idx) => (
              <div
                key={idx}
                className="shrink-0 px-8 py-5 rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl flex items-center gap-4 group hover:bg-white/10 hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-default"
              >
                <div className="text-purple-400/70 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300">
                  {skill.icon}
                </div>
                <span className="text-lg font-bold text-gray-300 group-hover:text-white whitespace-nowrap tracking-wide transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  },
);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Parallax elements for the background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const sparkles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    [],
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent overflow-hidden"
    >
      {/* 1. BACKGROUND AMBIENCE */}
      <div className="absolute top-10 left-[25%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* 2. ENHANCED HERO (Parallax) */}
      <div className="relative h-screen flex flex-col items-center justify-center px-6 perspective-[1200px]">
        <motion.div
          style={{ scale: headerScale, y: bgY }}
          className="z-10 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-300">
              The Architect
            </span>
          </motion.div>

          <div className="relative">
            <h1
              className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white/20 select-none italic"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
              KARAN
            </h1>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-7xl md:text-9xl font-black tracking-tighter uppercase -mt-6 md:-mt-10 relative z-10"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                KUMAR
              </span>
            </motion.h1>

            <div className="absolute -top-4 -left-8 w-12 h-[1px] bg-purple-500/30" />
            <div className="absolute -top-8 -left-4 w-[1px] h-12 bg-purple-500/30" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 relative flex flex-col items-center"
          >
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-medium tracking-wide leading-relaxed px-4">
              I'm a{" "}
              <span className="text-white font-bold">
                BCA Student at Patna University
              </span>{" "}
              with a passion for building full-stack web applications. I
              currently have good exprience in React and Next js Dev
              Environment.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="mailto:karankumarascode@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all"
              >
                Hire Me / Collab
                <ArrowRight size={18} />
              </motion.a>

              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-[52px] h-[52px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="mt-10 w-32 h-[2px] mx-auto bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Optimized Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            animate={
              isTabActive
                ? {
                    opacity: [0, 0.4, 0],
                    scale: [s.scale, s.scale * 1.1, s.scale],
                    translateZ: 0,
                  }
                : {}
            }
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-purple-500/50 rounded-full"
            style={{
              left: s.left,
              top: s.top,
              willChange: "opacity, transform",
            }}
          />
        ))}
      </div>

      {/* 3. TECHNICAL FORGE (Infinite Carousel) */}
      <div className="relative z-10 w-full pb-32 pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex items-center gap-6">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h2
            className="text-[min(12vw,6rem)] font-black tracking-tighter text-white/20 border-text outline-white"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            Tech Arsenal
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <div className="w-full flex flex-col gap-4">
          {techCategories.map((category, index) => (
            <InfiniteCarousel
              key={index}
              category={category}
              isTabActive={isTabActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const socialLinks = [
  {
    icon: (
      <img
        src="https://img.icons8.com/material-rounded/24/linkedin--v1.png"
        className="invert w-6 h-6"
        alt="LinkedIn"
      />
    ),
    href: "https://www.linkedin.com/in/karan-kumar-ba84112b3",
  },
  {
    icon: (
      <img
        src="https://img.icons8.com/glyph-neue/64/github.png"
        className="invert w-6 h-6"
        alt="GitHub"
      />
    ),
    href: "https://github.com/CodeByKaran?tab=repositories",
  },
  {
    icon: (
      <img
        src="https://img.icons8.com/ios-filled/50/filled-message.png"
        className="invert w-6 h-6"
        alt="Email"
      />
    ),
    href: "mailto:karankumarascode@gmail.com",
  },
];

export default About;
