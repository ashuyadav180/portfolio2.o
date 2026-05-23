"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Eye, Network, Cpu, Zap, FileText } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { roles, personalInfo, stats } from "@/lib/data";
import Magnetic from "@/components/Magnetic";

const MotionLink = motion.create(Link);

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8]/30 border-t-[#38bdf8] animate-spin" />
        <span className="font-mono-custom text-[0.62rem] text-[#38bdf8] tracking-[0.25em] uppercase">
          Initializing AI Engine...
        </span>
      </div>
    </div>
  ),
});

/* ─── Character-by-Character Stagger Text ────────────── */
function StaggerText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -80 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "50% 100%", perspective: "600px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Role Carousel ──────────────────────────────────── */
function RoleCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-9 overflow-hidden relative flex items-center select-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.12 }}
          className="absolute font-mono-custom text-sm sm:text-base font-bold tracking-[0.15em] text-[#38bdf8]"
        >
          <span className="text-[#38bdf8]/40 mr-2">▸</span>
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ─── Holographic Status Badge ───────────────────────── */
function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full w-fit"
      style={{
        background: "rgba(34,211,238,0.04)",
        border: "1px solid rgba(34,211,238,0.22)",
        boxShadow: "0 0 20px rgba(34,211,238,0.06), inset 0 1px 0 rgba(34,211,238,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d3ee] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22d3ee]" />
      </span>
      <span className="font-mono-custom text-[0.6rem] text-[#22d3ee] tracking-[0.22em] uppercase font-bold">
        Open to Internships &amp; Full-time
      </span>
    </motion.div>
  );
}

/* ─── HUD System Metric ──────────────────────────────── */
function HudMetric({ label, value, color = "#38bdf8" }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono-custom text-[0.55rem] tracking-[0.18em] uppercase" style={{ color: `${color}80` }}>
        {label}
      </span>
      <span className="font-mono-custom text-[0.75rem] font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Localised hero depth gradient — AI blue pulse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 65% 40%, rgba(56,189,248,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 60%, rgba(139,92,246,0.05) 0%, transparent 65%)",
        }}
      />

      {/* HUD corner accents */}
      <div className="absolute top-24 left-5 md:left-10 pointer-events-none select-none hidden md:block">
        <div className="flex items-center gap-2 font-mono-custom text-[0.55rem] text-[#38bdf8]/40 tracking-[0.2em]">
          <Cpu size={10} className="text-[#38bdf8]/40" />
          AI_CORE_v2.1.0 — ONLINE
        </div>
      </div>
      <div className="absolute top-24 right-5 md:right-10 pointer-events-none select-none hidden md:block">
        <div className="flex items-center gap-2 font-mono-custom text-[0.55rem] text-[#8b5cf6]/40 tracking-[0.2em]">
          NEURAL_LINK — ACTIVE
          <Zap size={10} className="text-[#8b5cf6]/40" />
        </div>
      </div>

      <div className="relative z-10 container-xl pt-28 pb-14 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-9rem)]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6 lg:gap-7 order-2 lg:order-1 pt-6 lg:pt-0 pointer-events-auto">
            <StatusBadge />

            {/* Character-stagger headline */}
            <div className="flex flex-col select-none cursor-default overflow-hidden" style={{ perspective: "800px" }}>
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] font-black text-white leading-none tracking-tighter">
                <StaggerText text="ASHU" delay={0.2} />
              </div>
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-none tracking-tighter gradient-text">
                <StaggerText text="YADAV" delay={0.38} />
              </div>
            </div>

            {/* Role carousel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.72, duration: 0.6 }}
            >
              <RoleCarousel />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.7 }}
              className="text-[#8ea0b5] text-sm sm:text-[0.95rem] leading-relaxed max-w-[490px]"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.92, duration: 0.6 }}
              className="flex flex-wrap gap-3 pt-1 items-center"
            >
              <Magnetic range={50} actionStrength={0.25}>
                <motion.a
                  href="#projects"
                  className="btn-primary shadow-[0_0_24px_rgba(14,165,233,0.2),0_0_0_1px_rgba(56,189,248,0.1)] border-glow"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Eye size={14} />
                  View Projects
                </motion.a>
              </Magnetic>

              <Magnetic range={50} actionStrength={0.25}>
                <MotionLink
                  href="/graphify"
                  className="btn-primary cursor-pointer shadow-[0_0_24px_rgba(139,92,246,0.2)]"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Network size={14} />
                  Code Graph ✦
                </MotionLink>
              </Magnetic>

              <Magnetic range={50} actionStrength={0.25}>
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                  }}
                  className="btn-ghost cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FileText size={14} />
                  Resume
                </motion.button>
              </Magnetic>

              <Magnetic range={50} actionStrength={0.25}>
                <motion.a
                  href="#contact"
                  className="btn-dark"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Me
                </motion.a>
              </Magnetic>
            </motion.div>

            {/* Social icons + metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="flex items-center gap-3 pt-2"
            >
              {[
                { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
                { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} range={40} actionStrength={0.35}>
                  <motion.a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8ea0b5] hover:text-[#38bdf8] border border-white/6 hover:border-[#38bdf8]/30 transition-all duration-300 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 14px rgba(56,189,248,0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                </Magnetic>
              ))}
              <div className="h-px w-8 bg-white/8 ml-1" />
              <span className="font-mono-custom text-[0.62rem] text-[#8ea0b5]/60 tracking-widest uppercase">
                BTech IT • 2nd Year
              </span>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.18, duration: 0.7 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-white/5 text-xs transition-all duration-300 hover:border-[#38bdf8]/20"
                  style={{ background: "rgba(56,189,248,0.03)", backdropFilter: "blur(8px)" }}
                >
                  <span className="font-display font-bold text-[#38bdf8] text-glow">
                    {s.value}{s.suffix}
                  </span>
                  <span className="text-[#8ea0b5] font-medium">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Inline HUD metrics bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex items-center gap-6 pt-1 px-4 py-3 rounded-2xl border border-white/4"
              style={{ background: "rgba(4,8,16,0.6)", backdropFilter: "blur(16px)" }}
            >
              <HudMetric label="System" value="ONLINE" color="#22d3ee" />
              <div className="w-px h-6 bg-white/8" />
              <HudMetric label="Neural Net" value="ACTIVE" color="#8b5cf6" />
              <div className="w-px h-6 bg-white/8" />
              <HudMetric label="CGPA" value="7.73 / 10" color="#38bdf8" />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Spacer to allow full page 3D to shine through ── */}
          <div className="hidden lg:block order-1 lg:order-2 relative lg:h-[640px] w-full pointer-events-none" />
        </div>
      </div>

      {/* ── Immersive Full Page 3D Background Layer ── */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-auto">
        {/* Ambient glow backdrops */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-[140px] opacity-75" style={{ background: "rgba(56,189,248,0.06)" }} />
          <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full blur-[100px] opacity-60" style={{ background: "rgba(139,92,246,0.05)" }} />
        </div>
        
        {/* HUD labels and overlay borders for immersive visual depth */}
        <div className="absolute top-28 right-8 lg:right-16 font-mono-custom text-[0.52rem] text-[#38bdf8]/30 tracking-[0.3em] uppercase pointer-events-none select-none hidden md:block">
          AI_CORE_INITIALIZED // ACTIVE_TELEMETRY
        </div>

        <div className="absolute top-24 left-6 w-6 h-6 border-t border-l border-[#38bdf8]/15 pointer-events-none" />
        <div className="absolute top-24 right-6 w-6 h-6 border-t border-r border-[#38bdf8]/15 pointer-events-none" />
        <div className="absolute bottom-16 left-6 w-6 h-6 border-b border-l border-[#38bdf8]/15 pointer-events-none" />
        <div className="absolute bottom-16 right-6 w-6 h-6 border-b border-r border-[#38bdf8]/15 pointer-events-none" />

        <HeroScene />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="font-mono-custom text-[0.55rem] text-[#38bdf8]/50 tracking-[0.35em] uppercase">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="text-[#38bdf8]/60" size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
