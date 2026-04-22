import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  // 1. Mouse Tracking Logic for 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  // Transform values for the text "floating" effect
  const textX = useTransform(dx, [-300, 300], [20, -20]);
  const textY = useTransform(dy, [-300, 300], [10, -10]);
  const rotateX = useTransform(dy, [-300, 300], [5, -5]);
  const rotateY = useTransform(dx, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = clientX - window.innerWidth / 2;
    const y = clientY - window.innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] w-full flex items-center px-6 sm:px-10 lg:pl-32 overflow-hidden bg-transparent"
    >
      {/* 2. BACKGROUND AMBIENCE - Matches the Robot Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

      {/* 3. MAIN CONTENT WITH 3D PERSPECTIVE */}
      <motion.div
        style={{
          x: textX,
          y: textY,
          rotateX,
          rotateY,
          perspective: 1000,
        }}
        className="relative z-10 max-w-4xl select-none"
      >
        {/* Small Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-4 text-purple-400 font-medium tracking-widest text-xs uppercase"
        >
          <Sparkles size={14} />
          <span>Available for Projects</span>
        </motion.div>

        {/* Massive Layered Heading */}
        <div className="flex flex-col leading-[0.85]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[min(12vw,6rem)] font-black tracking-tighter text-white"
          >
            CRAFTING
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[min(12vw,6rem)] font-black tracking-tighter italic"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
              DIGITAL
            </span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[min(12vw,6rem)] font-black tracking-tighter text-white/20 border-text outline-white"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            LOGIC.
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-lg text-gray-400 max-w-md font-light leading-relaxed border-l-2 border-purple-500/30 pl-6"
        >
          Specializing in <span className="text-white font-medium">React</span>{" "}
          &<span className="text-white font-medium"> Next.js</span>. Bridging
          the gap between robust backend logic and stunning 3D interfaces.
        </motion.p>

        {/* 4. THE STUNNING BUTTON */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/projects">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold transition-all"
            >
              <span className="relative z-10">View Projects</span>
              <div className="bg-black text-white p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          </Link>

          {/* Secondary "Ghost" Button */}
          <Link to="/about">
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="px-8 py-4 rounded-full border border-white/10 font-medium text-gray-300 transition-all"
            >
              My Story
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* 5. DECORATIVE MESH PARTICLES (Floating Dots) */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 60}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
