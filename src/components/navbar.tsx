"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, User, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(true);

  const navItems = [
    { icon: Home, label: "Home", href: "/", id: "home" },
    { icon: Briefcase, label: "Projects", href: "/projects", id: "projects" },
    { icon: User, label: "About", href: "/about", id: "about" },
  ];

  const isActive = (href: string) => {
    return (
      location.pathname === href ||
      (href !== "/" && location.pathname.startsWith(href))
    );
  };

  const handleNavOpenClose = () => {
    setIsNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const syncNavWithScreen = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setIsNavOpen(true);
      }
    };

    syncNavWithScreen(mediaQuery);
    mediaQuery.addEventListener("change", syncNavWithScreen);

    return () => {
      mediaQuery.removeEventListener("change", syncNavWithScreen);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed left-0 bottom-52 z-[60] p-3 rounded-r-md hover:translate-x-1.5 duration-300 ease-linear transition-transform sm:hidden"
        onClick={handleNavOpenClose}
        aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
      >
        {isNavOpen ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
      </button>

      <motion.nav
        className={`fixed left-0 bottom-10 sm:bottom-20 z-50 duration-300 ease-out transition-transform ${!isNavOpen ? "-translate-x-24 sm:translate-x-0" : "translate-x-0"}`}
      >
        <motion.div
          className="flex flex-col p-1.5 gap-1.5 bg-black/40 backdrop-blur-2xl border-y border-r border-white/10 shadow-2xl rounded-r-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link key={item.id} to={item.href} className="relative">
                <motion.div
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className={cn(
                    "relative p-3.5 rounded-xl transition-all duration-300 flex items-center justify-center",
                    active ? "text-white" : "text-zinc-500 hover:text-zinc-200",
                  )}
                >
                  {/* Professional Active Indicator */}
                  {active && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border-l-[3px] border-white rounded-xl shadow-[10px_0_20px_rgba(255,255,255,0.05)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {/* Subtle Inner Highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-xl" />
                    </motion.div>
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={{ scale: active ? 1.1 : 1 }}
                    className="relative z-10"
                  >
                    <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                  </motion.div>

                  {/* Refined Tooltip */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 12 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-[11px] uppercase tracking-widest font-medium whitespace-nowrap shadow-2xl pointer-events-none"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </motion.nav>
    </>
  );
}
