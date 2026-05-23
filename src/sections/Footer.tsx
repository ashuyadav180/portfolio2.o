"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  GitBranch, 
  ExternalLink, 
  Mail, 
  ArrowUp, 
  Terminal, 
  Globe, 
  Server, 
  CheckCircle 
} from "lucide-react";
import { personalInfo } from "@/lib/data";

/* ─── Layered Cybernetic Backdrop (FooterCyberBackground) ──── */
function FooterCyberBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Layer 1: Animated Cyber Grid Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.018)_1px,transparent_1px)] bg-[size:40px_40px] opacity-75 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)] animate-[gridMove_25s_linear_infinite]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.015) 1px, transparent 1px)
          `
        }}
      />
      
      {/* Layer 2: Concentric Spinners and Radar Crosshairs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-[#38bdf8]/5 animate-[spin_180s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-[#8b5cf6]/5 animate-[spin_100s_linear_infinite_reverse] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#06b6d4]/5 pointer-events-none" />

      {/* Layer 3: Vertical Sweeping Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(56,189,248,0)_0%,rgba(56,189,248,0.025)_50%,rgba(56,189,248,0)_100%)] bg-[size:100%_400px] animate-[scanlineSweep_8s_linear_infinite] pointer-events-none opacity-40" />

      {/* Layer 4: Multi-Layered Floating Ambient Light Fogs */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.035)_0%,transparent_75%)] blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />
      <div className="absolute -bottom-24 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.035)_0%,transparent_75%)] blur-3xl animate-pulse" style={{ animationDuration: "12s" }} />
      
      {/* CSS Animation Keyframes Injector */}
      <style jsx global>{`
        @keyframes gridMove {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        @keyframes scanlineSweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes shimmerGlow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes borderSweep {
          0% { border-color: rgba(56, 189, 248, 0.2); }
          50% { border-color: rgba(139, 92, 246, 0.5); }
          100% { border-color: rgba(56, 189, 248, 0.2); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.25; filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.2)); }
          50% { opacity: 0.8; filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.7)); }
        }
      `}</style>
    </div>
  );
}

/* ─── Animated Scramble Title Component ─────────────────────── */
function FooterScrambleTitle({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const triggerRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(triggerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!+=?";
    const duration = 20;
    const intervalId = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < (frame / duration) * text.length) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      frame++;
      if (frame > duration) {
        clearInterval(intervalId);
        setDisplay(text);
      }
    }, 45);
    return () => clearInterval(intervalId);
  }, [inView, text]);

  const splitIdx = display.indexOf("TRANSCENDENCE");
  const part1 = splitIdx !== -1 ? display.slice(0, splitIdx) : "INITIATE DIGITAL ";
  const part2 = splitIdx !== -1 ? display.slice(splitIdx) : "TRANSCENDENCE";

  return (
    <h2 
      ref={triggerRef} 
      className={`${className} select-none relative group`}
    >
      {/* Edge spotlight glow hover effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
      <span className="text-slate-100 bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text drop-shadow-[0_0_12px_rgba(255,255,255,0.05)] select-none">
        {part1}
      </span>
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] font-black">
        {part2}
      </span>
    </h2>
  );
}

/* ─── Animated Telemetry Counter with Micro-Fluctuations ────── */
function FooterTelemetryCounter({ value, decimals = 0, suffix = "", fluctuate = false }: { value: number; decimals?: number; suffix?: string; fluctuate?: boolean }) {
  const [count, setCount] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - elapsed, 4); // Quart ease out
      setCount(ease * value);
      if (elapsed < 1) raf = requestAnimationFrame(tick);
      else setCount(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  // Handle active operational fluctuations to look like live running telemetry
  useEffect(() => {
    if (!fluctuate || !inView) return;
    const interval = setInterval(() => {
      setCount((prev) => {
        const offset = (Math.random() - 0.5) * (value * 0.003);
        const minVal = value * 0.98;
        const maxVal = value * 1.02;
        return Math.max(minVal, Math.min(maxVal, prev + offset));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [fluctuate, value, inView]);

  return (
    <span ref={ref} className="font-mono-custom font-bold text-white text-xs tracking-wider tabular-nums">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ─── Interactive Footer AI Core Centerpiece Canvas ─────────── */
function FooterCoreCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 280;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current.targetX = e.clientX - rect.left;
      mousePosRef.current.targetY = e.clientY - rect.top;
      mousePosRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Drifting neural particles linked by thin wireframe grid lines (Layer 2 neural net)
    interface NeuralParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulseRate: number;
      angle: number;
    }

    const particles: NeuralParticle[] = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.45 + 0.15,
        pulseRate: Math.random() * 0.05 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }

    // Bezier interactive cabling connecting core to flanking panels
    interface CableLink {
      startX: number;
      startY: number;
      color: string;
      speed: number;
      progress: number;
      size: number;
    }

    const links: CableLink[] = [
      { startX: 0, startY: 0.35, color: "#38bdf8", speed: 0.0025, progress: 0.1, size: 2 },
      { startX: 0, startY: 0.68, color: "#8b5cf6", speed: 0.0035, progress: 0.6, size: 1.5 },
      { startX: 1, startY: 0.3, color: "#22d3ee", speed: 0.002, progress: 0.35, size: 1.8 },
      { startX: 1, startY: 0.72, color: "#06b6d4", speed: 0.004, progress: 0.8, size: 2.2 },
    ];

    let angle1 = 0;
    let angle2 = 0;
    let radarPulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x += (width / 2 - mouse.x) * 0.05;
        mouse.y += (height / 2 - mouse.y) * 0.05;
      }

      const cX = width / 2;
      const cY = height / 2;

      // 1. Draw target crosshair guidelines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cX, 0);
      ctx.lineTo(cX, height);
      ctx.moveTo(0, cY);
      ctx.lineTo(width, cY);
      ctx.stroke();

      // 2. Dual Concentric Rotating Radar HUD Rings (Reverse Geared)
      angle1 += 0.004;
      angle2 -= 0.006;

      // Outer Compass Ring with degrees ticks
      ctx.save();
      ctx.translate(cX, cY);
      ctx.rotate(angle1);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 72, 0, Math.PI * 2);
      ctx.stroke();

      // Draw compass ticks
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
        ctx.strokeStyle = a % (Math.PI / 3) === 0 ? "rgba(56, 189, 248, 0.3)" : "rgba(56, 189, 248, 0.1)";
        const len = a % (Math.PI / 3) === 0 ? 8 : 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 72, Math.sin(a) * 72);
        ctx.lineTo(Math.cos(a) * (72 - len), Math.sin(a) * (72 - len));
        ctx.stroke();
      }
      ctx.restore();

      // Inner compass ring with dashed layout
      ctx.save();
      ctx.translate(cX, cY);
      ctx.rotate(angle2);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.16)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Expanding energy wave rings
      radarPulse += 0.45;
      if (radarPulse > 88) radarPulse = 0;
      ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0, 1 - radarPulse / 88) * 0.15})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cX, cY, radarPulse, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Central engine anchor glowing core
      const coreGradient = ctx.createRadialGradient(cX, cY, 0, cX, cY, 26);
      coreGradient.addColorStop(0, "rgba(56, 189, 248, 0.8)");
      coreGradient.addColorStop(0.35, "rgba(139, 92, 246, 0.5)");
      coreGradient.addColorStop(0.7, "rgba(6, 182, 212, 0.15)");
      coreGradient.addColorStop(1, "rgba(2, 4, 10, 0)");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cX, cY, 26, 0, Math.PI * 2);
      ctx.fill();

      // Micro central dot
      ctx.fillStyle = "#22d3ee";
      ctx.beginPath();
      ctx.arc(cX, cY, 2, 0, Math.PI * 2);
      ctx.fill();

      // 5. Connecting Bezier Neural Cables sending animated packets to surrounding panels
      links.forEach((l) => {
        const sx = l.startX === 0 ? 0 : width;
        const sy = height * l.startY;

        const cp1x = l.startX === 0 ? width * 0.28 : width * 0.72;
        const cp1y = sy;
        const cp2x = l.startX === 0 ? width * 0.36 : width * 0.64;
        const cp2y = cY;

        // Draw static faint cable pathways
        ctx.strokeStyle = "rgba(56, 189, 248, 0.055)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cX, cY);
        ctx.stroke();

        // Increment data packets
        l.progress += l.speed;
        if (l.progress > 1) l.progress = 0;

        const getBezierPoint = (t: number) => {
          const mt = 1 - t;
          const mt2 = mt * mt;
          const mt3 = mt2 * mt;
          const t2 = t * t;
          const t3 = t2 * t;

          const px = mt3 * sx + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * cX;
          const py = mt3 * sy + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * cY;
          return { x: px, y: py };
        };

        const pt = getBezierPoint(l.progress);

        // Draw packet glow halo
        const pGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 6);
        pGrad.addColorStop(0, l.color);
        pGrad.addColorStop(1, "rgba(5, 8, 22, 0)");
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Solid packet center core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, l.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Interactive neural network drifting particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.pulseRate;

        // Boundaries checks
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction gravity
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const pull = (100 - dist) / 100 * 0.85;
            p.x += (dx / dist) * pull;
            p.y += (dy / dist) * pull;

            // Draw link to cursor coordinates
            ctx.strokeStyle = `rgba(56, 189, 248, ${pull * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Draw links to neighboring particles (constraining neural wireframes)
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 55) * 0.05})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle dot
        const pulseAlpha = p.alpha + Math.sin(p.angle) * 0.15;
        ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(0.1, Math.min(1, pulseAlpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative min-h-[240px] flex items-center justify-center select-none z-10">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />
      
      {/* Layered Decorative Holographic Radar overlay panels */}
      <div className="absolute pointer-events-none z-10 flex flex-col items-center justify-center select-none">
        <div className="w-[104px] h-[104px] rounded-full border border-dashed border-cyan-500/20 flex items-center justify-center animate-[spin_50s_linear_infinite]">
          <div className="w-[84px] h-[84px] rounded-full border border-double border-purple-500/20 flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
            <div className="w-[58px] h-[58px] rounded-full bg-[#030712]/95 border border-cyan-500/30 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.25)] relative overflow-hidden group">
              <span className="text-[8px] font-bold text-cyan-400 font-mono tracking-widest animate-pulse">SYS_CORE</span>
              <span className="text-[5px] text-[#64748b] font-mono tracking-wider">ACTIVE</span>
              
              {/* Radial loading scanning lasers sweep overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 animate-[spin_4s_linear_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CONSTANT_TERMINAL_LOGS = [
  "initializing neural communication layer...",
  "ai systems online",
  "secure channels active",
  "awaiting transmission request...",
  "deployment_ready = TRUE",
  "sync status: ALL STATIONS VERIFIED (100% payload)",
  "connection established with SECURE_ROUTE_US_EAST",
  "ping latency index: 28ms stable",
  "security daemon: 0 open vulnerabilities reported",
  "crypto layer active: AES-256 handshake synced",
  "memory footprint optimized: cache blocks verified",
  "global heartbeat monitor operational",
  "telemetry status: streaming live diagnostics HUD",
  "socket count handshake: client synced (12 active)",
  "dossier secure download: access allowed for recruiters",
  "router validation loop: OK"
];

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

const socials = [
  { icon: GitBranch,    href: personalInfo.github,            label: "GitHub", sub: "REPOSITORY_NETWORK_ACTIVE", color: "#38bdf8" },
  { icon: ExternalLink, href: personalInfo.linkedin,          label: "LinkedIn", sub: "PROFESSIONAL_NETWORK_SYNCED", color: "#8b5cf6" },
  { icon: Mail,         href: `mailto:${personalInfo.email}`, label: "Email", sub: "SECURE_COMMUNICATION_READY", color: "#22d3ee" },
];

export default function Footer() {
  const [logs, setLogs] = useState<string[]>([
    "initializing neural communication layer...",
    "ai systems online",
    "secure channels active",
    "awaiting transmission request...",
  ]);
  // Parallax Identity Module Mouse Move state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map to coordinate angles (max 8 degrees tilt for premium subtlety)
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8,
    });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const logsContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll operations logger console (local scroll only, turns off page autoscrolling)
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Periodic scrolling operations logs simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = CONSTANT_TERMINAL_LOGS[Math.floor(Math.random() * CONSTANT_TERMINAL_LOGS.length)];
      setLogs((prev) => {
        const next = [...prev, `[TERM] ${randomMsg}`];
        return next.slice(-12); // Keep log history buffer optimized
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-white/5 overflow-hidden bg-[#02040a] py-12 md:py-16">
      <FooterCyberBackground />

      <div className="relative z-10 container-xl px-4 md:px-8 mx-auto">
        
        {/* TOP: Massive Cinematic CTA Heading */}
        <div className="text-center mb-16 select-none relative">
          {/* Background decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[80px] bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="section-label justify-center mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-ping" />
            <span className="font-mono-custom tracking-[0.35em] text-[0.62rem] text-[#8b5cf6] uppercase font-bold">
              SYS.TERM // OPERATIONS COMPLETED
            </span>
          </div>
          <FooterScrambleTitle 
            text="INITIATE DIGITAL TRANSCENDENCE" 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase font-display tracking-tighter"
          />
        </div>

        {/* CENTER: Asymmetrical Widescreen Footer Ecosystem (5 grid columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* COLUMN 1: AI Identity Module (lg:col-span-3) */}
          <div 
            className="lg:col-span-3 glass-strong rounded-2xl p-6 border border-white/6 shadow-md relative overflow-hidden group transition-all duration-300 select-none bg-[#040816]/75"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.1s ease-out, border-color 0.3s ease",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.7)"
            }}
          >
            {/* Holographic Border Neon Sweep */}
            <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
            
            {/* Holographic scanning diagonal shimmer line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />

            {/* Cyber corner braces */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

            {/* Glowing spot background */}
            <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-300" />

            {/* Name with custom metallic/holographic reflection effect */}
            <div className="font-display text-2xl font-black text-white tracking-[0.22em] mb-1.5 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] group-hover:text-cyan-400 transition-colors duration-300 relative">
              ASHU YADAV
            </div>
            
            <div className="font-mono-custom text-[0.58rem] text-[#38bdf8] uppercase tracking-wider font-bold mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
              FULL STACK DEVELOPER · AI ENGINEER
            </div>
            
            <p className="text-[#64748b] text-xs leading-relaxed font-mono-custom mb-6">
              Building highly optimized architectures, real-time data visualizers, and neural AI core engines.
            </p>

            {/* Identity Parameters HUD checklist */}
            <div className="space-y-2 border-t border-white/5 pt-5 select-none">
              <span className="text-[0.5rem] font-mono-custom text-[#64748b] uppercase tracking-widest block font-bold">
                [ HUD_IDENTITY_PARAMETERS ]
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded bg-[#10b981]/5 border border-[#10b981]/15 text-[#a7f3d0] flex items-center justify-between text-[0.52rem] font-mono-custom">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                    SYSTEM ACTIVE
                  </span>
                  <span className="text-[#64748b]">1.0</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#38bdf8]/5 border border-[#38bdf8]/15 text-[#c2f0fc] flex items-center justify-between text-[0.52rem] font-mono-custom">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                    OPEN_FOR_INTERNSHIPS
                  </span>
                  <span className="text-[#64748b]">TRUE</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#8b5cf6]/5 border border-[#8b5cf6]/15 text-[#e9d5ff] flex items-center justify-between text-[0.52rem] font-mono-custom">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" />
                    AI SYSTEMS ONLINE
                  </span>
                  <span className="text-[#64748b]">SECURE</span>
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Neural Navigation Nodes (lg:col-span-2) */}
          <div className="lg:col-span-2 select-none p-2 bg-[#040816]/20 border border-white/5 rounded-2xl p-5 hover:border-cyan-500/10 transition-colors duration-300">
            <h4 className="text-white font-black text-[0.62rem] mb-5 tracking-widest uppercase font-mono-custom border-b border-white/5 pb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-sm" />
              [ NAVIGATION ]
            </h4>
            <ul className="space-y-4">
              {navLinks.map((l, idx) => (
                <li key={l.label} className="relative group/link">
                  <a
                    href={l.href}
                    className="text-[#64748b] hover:text-cyan-400 text-xs transition-colors duration-300 font-mono-custom flex items-center gap-2"
                  >
                    {/* Glowing active numerical indices */}
                    <span className="text-[0.52rem] text-cyan-500/40 group-hover/link:text-cyan-400 font-bold transition-colors">0{idx+1}.</span>
                    <span className="relative tracking-wider font-bold">
                      {l.label.toUpperCase()}
                      {/* Underline trace animation draw */}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Animated Footer AI Core (lg:col-span-2) */}
          <div className="lg:col-span-2 self-stretch flex items-center justify-center bg-[#040816]/10 border border-white/5 rounded-2xl">
            <FooterCoreCanvas />
          </div>

          {/* COLUMN 4: Live Telemetry Diagnostics HUD (lg:col-span-2) */}
          <div className="lg:col-span-2 select-none p-5 bg-[#040816]/20 border border-white/5 rounded-2xl hover:border-emerald-500/10 transition-colors duration-300">
            <h4 className="text-white font-black text-[0.62rem] mb-5 tracking-widest uppercase font-mono-custom border-b border-white/5 pb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#10b981] rounded-sm" />
              [ LIVE TELEMETRY ]
            </h4>
            <div className="space-y-4 font-mono-custom">
              
              {/* Telemetry Row 1 */}
              <div>
                <p className="text-[0.5rem] text-[#64748b] tracking-wider uppercase mb-0.5 font-bold">SYS_UPTIME</p>
                <div className="flex items-baseline gap-1">
                  <FooterTelemetryCounter value={99.98} decimals={2} fluctuate={true} />
                  <span className="text-[0.6rem] text-emerald-400 font-bold">%</span>
                </div>
              </div>

              {/* Telemetry Row 2 */}
              <div>
                <p className="text-[0.5rem] text-[#64748b] tracking-wider uppercase mb-0.5 font-bold">ACTIVE_SOCKETS</p>
                <div className="flex items-baseline gap-1">
                  <FooterTelemetryCounter value={12} fluctuate={false} />
                  <span className="text-[0.6rem] text-cyan-400 font-bold">/ SYNCED</span>
                </div>
              </div>

              {/* Telemetry Row 3 */}
              <div>
                <p className="text-[0.5rem] text-[#64748b] tracking-wider uppercase mb-0.5 font-bold">AVAILABILITY</p>
                <p className="text-emerald-400 text-xs font-black tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  OPEN_TO_HIRE
                </p>
              </div>

              {/* Telemetry Row 4 */}
              <div>
                <p className="text-[0.5rem] text-[#64748b] tracking-wider uppercase mb-0.5 font-bold">TUNNEL_LATENCY</p>
                <div className="flex items-baseline gap-1">
                  <FooterTelemetryCounter value={24.8} decimals={1} fluctuate={true} />
                  <span className="text-[0.6rem] text-purple-400 font-bold">ms</span>
                </div>
              </div>

            </div>
          </div>

          {/* COLUMN 5: Social Communication Node & Premium Button (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-5 p-5 select-none bg-[#040816]/20 border border-white/5 rounded-2xl hover:border-cyan-500/10 transition-colors duration-300">
            <h4 className="text-white font-black text-[0.62rem] mb-1 tracking-widest uppercase font-mono-custom border-b border-white/5 pb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-sm animate-pulse" />
              [ RECRUITER_COMMS ]
            </h4>

            {/* Social Transmission Nodes showing status strings on hover */}
            <div className="flex flex-col gap-2.5">
              {socials.map(({ icon: Icon, href, label, sub, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-3 p-2 rounded-xl border border-white/5 hover:border-white/10 hover:bg-[#070b20]/50 transition-all group/soc cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0a0f2e] border border-white/6 flex items-center justify-center text-[#64748b] group-hover/soc:text-white transition-all shadow">
                    <Icon size={15} style={{ color }} className="group-hover/soc:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0 font-mono-custom">
                    <div className="text-[0.68rem] text-slate-300 font-bold group-hover/soc:text-cyan-400 transition-colors">
                      {label.toUpperCase()}
                    </div>
                    <div className="text-[0.45rem] text-[#64748b] tracking-wider truncate group-hover/soc:text-cyan-400/70 transition-colors uppercase font-bold">
                      {sub}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Holographic Open Comms transmission button with border-tracing sweep */}
            <div className="relative group/btn mt-1">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-md opacity-20 group-hover/btn:opacity-45 transition-opacity duration-300 pointer-events-none" />
              
              <a 
                href="#contact" 
                className="w-full py-3.5 rounded-xl bg-[#05081c] border border-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] text-white font-mono-custom text-xs font-black tracking-widest flex items-center justify-center gap-2 relative overflow-hidden transition-all duration-300 cursor-pointer"
              >
                {/* Diagonal light sweep animation */}
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(56,189,248,0.08)_50%,transparent_100%)] -translate-x-full group-hover/btn:animate-[shimmer_2.5s_infinite] pointer-events-none" />
                <Server size={12} className="text-cyan-400 group-hover/btn:rotate-12 transition-transform" />
                OPEN_COMMS →
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM: Live Scrolling Terminal Strip & Copyright System */}
        <div className="w-full border-t border-white/5 pt-6 flex flex-col gap-4">
          
          {/* Real-Time Live Operations Console Strip */}
          <div className="w-full glass-strong rounded-xl border border-white/5 p-3 flex items-center gap-3 overflow-hidden select-none bg-[#030612]/95 h-[52px]">
            <div className="flex items-center gap-1.5 flex-shrink-0 text-cyan-400 font-mono-custom text-[0.62rem] font-bold uppercase tracking-wider border-r border-white/10 pr-3 h-full">
              <Terminal size={11} className="animate-pulse" />
              CONSOLE_STREAMS
            </div>
            
            <div ref={logsContainerRef} className="flex-1 overflow-y-auto pr-1 select-none h-full scrollbar-none font-mono-custom text-[0.58rem] leading-relaxed text-[#64748b]">
              {logs.slice(-3).map((log, index) => {
                let colorClass = "text-[#64748b]";
                if (log.includes("online")) colorClass = "text-emerald-400/90 font-bold";
                else if (log.includes("active")) colorClass = "text-cyan-400/90 font-bold";
                else if (log.includes("established") || log.includes("synced")) colorClass = "text-purple-400/90 font-bold";
                
                return (
                  <div key={index} className={`flex items-center gap-1.5 ${colorClass}`}>
                    <span className="opacity-40">&gt;&gt;</span>
                    <span>{log}</span>
                  </div>
                );
              })}
              {/* Blinking operational terminal cursor */}
              <div className="flex items-center gap-1 opacity-70 text-[#64748b]">
                <span>&gt;&gt;</span>
                <span className="w-1.5 h-3 bg-[#64748b] animate-pulse ml-0.5" />
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono-custom text-[0.5rem] text-emerald-400 font-black">SYS_READY</span>
            </div>
          </div>

          {/* Core copyright & bottom metrics strip */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 select-none mt-2">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p className="text-[#64748b] text-xs font-mono-custom font-bold">
                © {new Date().getFullYear()} ASHU YADAV · ALL RIGHTS RESERVED
              </p>
              <span className="text-[0.55rem] font-mono-custom text-[#334155] tracking-wider uppercase block font-bold">
                SECURE TELEMETRY CONSOLE // DESIGNED & COMPILED IN INDIA
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
              <span className="font-mono-custom text-[0.58rem] text-[#334155] uppercase tracking-widest hidden sm:inline-flex items-center gap-1.5 font-bold">
                <Globe size={11} className="text-[#334155]" />
                SECURE PORT: SSL_ACTIVE (256-BIT)
              </span>
              
              <div className="flex items-center gap-2">
                <span className="font-mono-custom text-[0.58rem] text-cyan-400 bg-cyan-500/5 border border-cyan-500/15 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                  <CheckCircle size={9} />
                  v1.1.0-STABLE
                </span>
                
                {/* Scroll to Top button */}
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-[#64748b] hover:text-cyan-400 border border-white/6 hover:border-cyan-500/30 transition-all cursor-pointer bg-[#090f2b] shadow"
                  whileHover={{ scale: 1.08, y: -2 }}
                  aria-label="Back to top"
                >
                  <ArrowUp size={13} />
                </motion.button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
