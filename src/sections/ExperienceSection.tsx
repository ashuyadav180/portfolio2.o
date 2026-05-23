"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";

interface ExperienceItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: string;
  icon: string;
  color: string;
}

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Explicit outcomes mapping to present high professionalism
  const outcomes: Record<string, string> = {
    "10th Metric Graduation": "Core Logic Foundations Mastered // 92.80% Metric Score",
    "12th Senior Secondary": "Advanced Science & Mathematics Matriculation",
    "B.Tech. Information Technology": "Full-Stack Web Architectures & Computational Engineering // CGPA: 7.73/10",
    "Cybersecurity Virtual Internship": "Industrial certification in Network Security, Threat Auditing & Auditing Protocols",
    "Emerging Technologies (AI & Cloud)": "Built modular Generative AI pipelines & cloud integration nodes",
    "Medical Store Management": "Developed secure, real-time shipment dispatch notification streams",
    "AUTOREEL.AI Development": "Architected an 8-stage asynchronous microservice video compiler pipeline",
  };

  return (
    <section id="experience" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-[#050816]/30 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
            SYS.JOURNEY // TELEMETRY.04
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-display tracking-tight">
            Education & <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div ref={ref} className="relative">
          {/* Animated gradient laser track */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-px bg-gradient-to-b from-[#38bdf8] via-[#8b5cf6] via-[#d946ef] to-[#06b6d4] opacity-30" />

          <div className="space-y-10 md:space-y-16">
            {experience.map((item: ExperienceItem, i) => {
              const isLeft = i % 2 === 0;
              const outcome = outcomes[item.title] || "Academic & Technological milestones verified";
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -25 : 25 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex gap-6 items-start pl-14 md:pl-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className="md:w-[calc(50%-2rem)] w-full">
                    <motion.div
                      className="glass-strong rounded-2xl p-5 md:p-6 border border-white/8 group relative overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                      whileHover={{ borderColor: `${item.color}35`, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Technical HUD Corners */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-[#38bdf8]/40 transition-colors" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10 group-hover:border-[#38bdf8]/40 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10 group-hover:border-[#38bdf8]/40 transition-colors" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#38bdf8]/40 transition-colors" />

                      {/* Header metrics */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 select-none">
                        <div
                          className="inline-flex items-center gap-1.5 font-mono-custom text-[0.62rem] font-bold px-3 py-1 rounded-lg border"
                          style={{
                            color: item.color,
                            borderColor: `${item.color}30`,
                            background: `${item.color}08`,
                          }}
                        >
                          {item.year}
                        </div>
                        <span className="font-mono-custom text-[0.58rem] text-[#94a3b8] tracking-widest uppercase">
                          PROCESS_ID: 0{i + 1}_LOG
                        </span>
                      </div>

                      {/* Main info row */}
                      <div className="flex gap-4 items-start">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-white/5"
                          style={{
                            background: `${item.color}08`,
                            boxShadow: `inset 0 0 10px ${item.color}15`,
                          }}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-extrabold text-white text-[0.98rem] tracking-wide mb-1 leading-snug">
                            {item.title}
                          </h3>
                          <p className="font-mono-custom text-xs mb-3 font-semibold" style={{ color: item.color }}>
                            {item.subtitle}
                          </p>
                          <p className="text-[#a1b0cb] text-xs leading-relaxed font-mono-custom">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Key Outcome Highlight */}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-col gap-1 font-mono-custom">
                        <span className="text-[0.58rem] text-[#94a3b8] uppercase tracking-[0.15em] select-none">
                          ✓ KEY_OUTCOME // TELEMETRY:
                        </span>
                        <p className="text-[0.65rem] text-[#10b981] font-semibold leading-normal">
                          {outcome}
                        </p>
                      </div>

                      {/* Type Badge */}
                      <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-3 select-none">
                        <span className="text-[0.55rem] font-mono-custom text-[#64748b]">
                          SYS_TAG: [ {item.type.toUpperCase()} ]
                        </span>
                        <span className="px-2 py-0.5 text-[0.58rem] font-mono-custom font-bold uppercase rounded bg-white/4 border border-white/5 text-[#94a3b8]">
                          {item.type}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Laser timeline node */}
                  <div className="absolute left-3.5 md:left-1/2 md:-translate-x-1/2 top-6 z-10 select-none">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: i * 0.08 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                      className="relative"
                    >
                      {/* Rotating square tech ring */}
                      <motion.div
                        className="w-4 h-4 border-2 border-[#050816] flex items-center justify-center"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: `0 0 14px ${item.color}`,
                          borderRadius: "4px",
                        }}
                        animate={{ rotate: 45 }}
                        transition={{ duration: 0 }}
                      />
                      {/* Pulse shell */}
                      <div
                        className="absolute inset-0 rounded bg-transparent border border-dashed animate-ping opacity-35"
                        style={{ borderColor: item.color }}
                      />
                    </motion.div>
                  </div>

                  {/* Horizontal visual divider for larger viewports */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
