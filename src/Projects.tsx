import { motion, useInView } from "framer-motion";
import GlassCard from "./components/ui/glasscard";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { ProjectMetaData } from "./data/projectMetaData";

const MemoizedGlassCard = memo(GlassCard);

const Projects = () => {
  const containerRef = useRef(null);

  // 1. Viewport Detection: only true when the carousel is visible
  const isInView = useInView(containerRef, { amount: 0.1 });

  // 2. Window/Tab Visibility Detection
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const isMoving = isInView && isTabActive;

  // Split projects into two halves for two different rows
  const row1 = useMemo(() => [...ProjectMetaData, ...ProjectMetaData], []);
  const row2 = useMemo(
    () => [...ProjectMetaData.reverse(), ...ProjectMetaData],
    [],
  );

  const sparkles = useMemo(
    () =>
      [...Array(25)].map((_, i) => ({
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
    <section className="relative min-h-screen w-full pt-32 pb-20 overflow-hidden flex flex-col justify-center">
      {/* 1. BACKGROUND AMBIENCE */}
      <div className="absolute top-10 left-[25%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[130px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[120px] -z-10" />

      {/* 1. HEADER SECTION - Elegant & Technical */}
      <div className="relative z-20 mb-24 flex flex-col items-center perspective-[1200px]">
        <motion.div className="flex flex-col items-center text-center">
          {/* Subtle "Status" Badge above heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-300">
              Portfolio v2.0
            </span>
          </motion.div>

          <div className="relative">
            {/* The "Selected" - Now an elegant, thin outline for depth */}
            <h1
              className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white/20 select-none italic"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
              Selected
            </h1>

            {/* The "Works" - Bold, glowing, and slightly overlapping */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-7xl md:text-9xl font-black tracking-tighter uppercase -mt-6 md:-mt-10 relative z-10"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                Works
              </span>
            </motion.h1>

            {/* Decorative technical crosshair or lines */}
            <div className="absolute -top-4 -left-8 w-12 h-[1px] bg-purple-500/30" />
            <div className="absolute -top-8 -left-4 w-[1px] h-12 bg-purple-500/30" />
          </div>

          {/* Sub-body / Tagline - Modern Glass Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 relative"
          >
            <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto font-medium tracking-wide leading-relaxed">
              Synthesizing{" "}
              <span className="text-white italic">Technical Precision</span>{" "}
              with
              <br className="hidden md:block" />
              <span className="text-purple-400">Creative 3D Architectures</span>
              .
            </p>

            {/* Subtle light bar underneath */}
            <div className="mt-6 w-32 h-[2px] mx-auto bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* 3. INFINITE CAROUSEL CONTAINER */}
      <div ref={containerRef} className="relative flex flex-col gap-8 w-full">
        {/* ROW 1: Moving Right to Left */}
        <div className="flex overflow-visible mask-horizontal">
          <motion.div
            className="flex gap-8 px-4 will-change-transform"
            // If not isMovingRow1, we stop the animation
            animate={isMoving ? { x: ["0%", "-50%"] } : {}}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {row1.map((project, index) => (
              <motion.div
                
                key={`row1-${index}`}
                className="w-[300px] md:w-[450px] shrink-0"
              >
                <MemoizedGlassCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Moving Left to Right */}
        <div className="flex overflow-visible mask-horizontal">
          <motion.div
            className="flex gap-8 px-4 will-change-transform"
            animate={isMoving ? { x: ["-50%", "0%"] } : {}}
            transition={{
              duration: 50, // Slightly slower for depth
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {row2.map((project, index) => (
              <motion.div
                
                key={`row2-${index}`}
                className="w-[300px] md:w-[450px] shrink-0"
              >
                <MemoizedGlassCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Overlay gradient to fade edges of carousel */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

      {/* 4. OPTIMIZED SPARKLES (Lower count, hardware accelerated) */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [s.scale, s.scale * 1.1, s.scale],
              translateZ: 0, // Force 3D context
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "linear", // Linear is easier on CPU than easeInOut
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
    </section>
  );
};

export default Projects;
