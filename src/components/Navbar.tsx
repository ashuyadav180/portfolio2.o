"use client";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MotionLink = motion.create(Link);



const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
  { label: "Code Graph", href: "/graphify" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  // For non-home pages, derive active directly from pathname (no side-effect needed)
  const nonHomeActive = !isHome
    ? pathname.startsWith("/graphify") ? "graphify" : ""
    : null;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = navLinks.filter(l => l.href.startsWith("#")).map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(ids[i]); return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once at mount
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const currentActive = nonHomeActive !== null ? nonHomeActive : active;

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="scroll-bar"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[9000] transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#050816]/80 backdrop-blur-xl border-white/5 border-t border-[#38bdf8]/15 shadow-[0_4px_30px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.05)] py-3.5 md:py-4"
            : "bg-transparent border-transparent py-6 md:py-7"
        }`}
      >
        <div className="container-xl flex items-center justify-between">

          {/* Logo with magnetic pull */}
          <Magnetic range={50} actionStrength={0.4}>
            <MotionLink
              href="/"
              className="flex flex-col select-none cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-display text-sm md:text-base font-black tracking-[0.2em] text-white group-hover:text-[#38bdf8] transition-colors duration-200">
                ASHU YADAV
              </span>
              <span className="font-mono-custom text-[0.52rem] text-[#38bdf8]/80 group-hover:text-[#38bdf8] tracking-[0.1em] font-semibold mt-0.5 transition-colors duration-200">
                SYS_OPERATOR // ONLINE
              </span>
            </MotionLink>
          </Magnetic>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-4.5 xl:gap-6 px-3 lg:px-4 py-2 rounded-full border border-white/5 bg-white/2 backdrop-blur-md">
            {navLinks.map(link => {
              const id = link.href.startsWith("#") ? link.href.slice(1) : "graphify";
              const isActive = link.href === "/graphify"
                ? (pathname === "/graphify" || pathname.startsWith("/graphify"))
                : currentActive === id;

              const finalHref = link.href.startsWith("#") 
                ? (isHome ? link.href : `/${link.href}`) 
                : link.href;

              return (
                <MotionLink
                  key={link.label}
                  href={finalHref}
                  className={`relative px-4 lg:px-5 py-2 text-xs lg:text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "text-white text-shadow-sm font-semibold" 
                      : "text-[#94a3b8] hover:text-white"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_12px_rgba(56,189,248,0.12)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </MotionLink>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Magnetic range={60} actionStrength={0.3}>
              <MotionLink
                href={isHome ? "#contact" : "/#contact"}
                className="btn-primary text-xs px-5 py-2.5 shadow-[0_0_20px_rgba(14,165,233,0.15)] border-glow cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Open to Work →
              </MotionLink>
            </Magnetic>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass border-white/10 text-[#94a3b8] hover:text-white transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <motion.div
          initial={false}
          animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden md:hidden border-t border-white/5 bg-[#050816]/95 backdrop-blur-2xl"
        >
          <div className="px-5 pt-4 pb-6 flex flex-col gap-2">
            {navLinks.map(link => {
              const finalHref = link.href.startsWith("#") 
                ? (isHome ? link.href : `/${link.href}`) 
                : link.href;

              return (
                <Link
                  key={link.label}
                  href={finalHref}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#94a3b8] hover:text-white text-base font-medium py-3 border-b border-white/5 transition-colors block cursor-pointer"
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={isHome ? "#contact" : "/#contact"}
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-4 py-3 justify-center text-center text-sm shadow-[0_0_20px_rgba(14,165,233,0.2)] cursor-pointer"
            >
              Open to Work →
            </Link>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}

