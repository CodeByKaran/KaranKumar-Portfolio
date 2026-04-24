import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Cpu } from "lucide-react";
interface GlassCardProps {
  projectName: string;
  projectDescription: string;
  projectRepoUrl: string;
  projectLiveUrl?: string; // Optional
  projectTechStack: string[];
}
const GlassCard = ({
  projectName,
  projectDescription,
  projectTechStack,
  projectRepoUrl,
  projectLiveUrl,
}: GlassCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Mouse tracking for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="relative group h-[300px] w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.1),transparent_50%)]" />

      <div style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Cpu className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex gap-3">
            {projectRepoUrl && (
              <a
                href={projectRepoUrl}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                target="_blank"
              >
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/glyph-neue/64/github.png"
                  alt="github"
                  className="invert-100"
                />
              </a>
            )}
            {projectLiveUrl && (
              <a
                href={projectLiveUrl}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                target="_blank"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3 tracking-tight">
          {projectName}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {projectDescription}
        </p>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className=" mt-2">
        <div className="flex flex-wrap gap-2">
          {projectTechStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-purple-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard;
