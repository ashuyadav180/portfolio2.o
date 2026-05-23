"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Mail, 
  Send, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Loader, 
  Shield, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Globe, 
  Cpu, 
  Wifi 
} from "lucide-react";
import { personalInfo } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

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

/* ─── Layered Cybernetic Backdrop (CyberBackground) ──────── */
function CyberBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-80" />
      
      {/* Concentric Tech Target Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-[#38bdf8]/5 animate-[spin_120s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-[#8b5cf6]/5 animate-[spin_80s_linear_infinite_reverse]" />

      {/* Cybernetic Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.012)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />

      {/* Glowing Energy Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.03)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.03)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}

/* ─── Metallic Stagger Decrypt Scramble Title ───────────────── */
function ScrambleTitle({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const triggerRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(triggerRef, { once: true });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const duration = 25;
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

  // "START A CONVERSATION" split: "START A " and "CONVERSATION"
  const splitIdx = display.indexOf("CONVERSATION");
  const part1 = splitIdx !== -1 ? display.slice(0, splitIdx) : "START A ";
  const part2 = splitIdx !== -1 ? display.slice(splitIdx) : "CONVERSATION";

  return (
    <h2 ref={triggerRef} className={className}>
      {part1}
      <span className="gradient-text drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">{part2}</span>
    </h2>
  );
}

/* ─── Animated Telemetry Counter ──────────────────────────── */
function TelemetryCounter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
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

  return (
    <span ref={ref} className="font-mono-custom font-black">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ─── Central Communication AI Core Canvas centerpiece ───────── */
function CommCoreCanvas() {
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
      height = container.clientHeight || 450;
      
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

    // Neural particles setup
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const numParticles = 24;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // Bezier cables linking canvas edges to centerpiece core
    interface Cable {
      side: "left" | "right";
      startY: number;
      endY: number;
      packets: number[]; // packet travel values (t from 0 to 1)
    }

    const cables: Cable[] = [
      { side: "left", startY: 0.25, endY: 0.5, packets: [0.1, 0.45, 0.8] },
      { side: "left", startY: 0.5, endY: 0.5, packets: [0.3, 0.65] },
      { side: "left", startY: 0.75, endY: 0.5, packets: [0.2, 0.75] },
      { side: "right", startY: 0.25, endY: 0.5, packets: [0.15, 0.5, 0.85] },
      { side: "right", startY: 0.5, endY: 0.5, packets: [0.4, 0.7] },
      { side: "right", startY: 0.75, endY: 0.5, packets: [0.25, 0.8] },
    ];

    let angle = 0;
    let waveRadius = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      const mouse = mousePosRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x += (width / 2 - mouse.x) * 0.04;
        mouse.y += (height / 2 - mouse.y) * 0.04;
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw faint structural layout lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, 15);
      ctx.lineTo(centerX, height - 15);
      ctx.moveTo(15, centerY);
      ctx.lineTo(width - 15, centerY);
      ctx.stroke();

      // Concentric background dials
      ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating dashed outer HUD dial (clockwise)
      angle += 0.004;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
      ctx.setLineDash([6, 18]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Rotating inner HUD dial (counterclockwise)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-angle * 1.4);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.25)";
      ctx.setLineDash([12, 10]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Circular expanding broadcast wave signal pulses
      waveRadius += 0.6;
      if (waveRadius > 120) {
        waveRadius = 0;
      }
      ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0, 1 - waveRadius / 120) * 0.12})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw secure bezier cable systems sending active packet signals
      cables.forEach((cable) => {
        const startX = cable.side === "left" ? 0 : width;
        const startY = height * cable.startY;
        
        // Control coordinates to create elegant curved pathways
        const cp1X = cable.side === "left" ? width * 0.28 : width * 0.72;
        const cp1Y = startY;
        const cp2X = cable.side === "left" ? width * 0.36 : width * 0.64;
        const cp2Y = centerY;

        ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, centerX, centerY);
        ctx.stroke();

        // Trace and animate tiny glowing data packets along paths
        cable.packets.forEach((t, idx) => {
          let newT = t + 0.0025;
          if (newT > 1) {
            newT = 0;
          }
          cable.packets[idx] = newT;

          // Resolve bezier coordinate at point t
          const getBezierPoint = (tVal: number) => {
            const mt = 1 - tVal;
            const mt2 = mt * mt;
            const mt3 = mt2 * mt;
            const t2 = tVal * tVal;
            const t3 = t2 * tVal;

            const rx = mt3 * startX + 3 * mt2 * tVal * cp1X + 3 * mt * t2 * cp2X + t3 * centerX;
            const ry = mt3 * startY + 3 * mt2 * tVal * cp1Y + 3 * mt * t2 * cp2Y + t3 * centerY;
            return { x: rx, y: ry };
          };

          const pLoc = getBezierPoint(newT);
          const pGrad = ctx.createRadialGradient(pLoc.x, pLoc.y, 0, pLoc.x, pLoc.y, 4.5);
          pGrad.addColorStop(0, "#38bdf8");
          pGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.5)");
          pGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.arc(pLoc.x, pLoc.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Render drifting neural mesh synapses with magnetism to cursor
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bound constraints
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Drift towards cursor when close
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            const f = (110 - d) / 110;
            p.x += (dx / d) * f * 1.2;
            p.y += (dy / d) * f * 1.2;

            // Curving micro connection paths linking synapses
            ctx.strokeStyle = `rgba(56, 189, 248, ${f * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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
    <div ref={containerRef} className="w-full h-full relative min-h-[300px] lg:min-h-[420px] flex items-center justify-center select-none z-10">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />
      
      {/* Dynamic Floating HUD overlays */}
      <div className="absolute pointer-events-none z-10 flex flex-col items-center justify-center">
        <div className="w-[110px] h-[110px] rounded-full border border-dashed border-cyan-500/20 flex items-center justify-center animate-[spin_40s_linear_infinite]">
          <div className="w-[84px] h-[84px] rounded-full border border-double border-purple-500/30 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
            <div className="w-[58px] h-[58px] rounded-full bg-[#050816]/95 border border-cyan-500/30 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="text-[8px] font-bold text-cyan-400 font-mono tracking-widest animate-pulse">COMM_CORE</span>
              <span className="text-[6px] text-purple-400 font-mono tracking-wider">SYS_SYNC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Futuristic Input spotlights and borders Wrapper ─────── */
function FuturisticInputWrapper({
  children,
  label,
  focused,
  charCount,
  maxChar,
}: {
  children: React.ReactNode;
  label: string;
  focused: boolean;
  charCount?: number;
  maxChar?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${
        focused
          ? "border-cyan-500/50 bg-[#070c24]/90 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
          : hovered
          ? "border-white/15 bg-[#05091c]/80"
          : "border-white/5 bg-[#040615]/60"
      }`}
    >
      {/* Laser trace / Spotlight radial gradient overlay */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500"
        style={{
          width: "250px",
          height: "250px",
          top: `${coords.y - 125}px`,
          left: `${coords.x - 125}px`,
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, transparent 60%)",
          opacity: hovered || focused ? 1 : 0,
        }}
      />
      
      {/* HUD Edge Brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500/30" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-500/30" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyan-500/30" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-500/30" />

      <div className="p-4 relative z-10">
        <div className="flex justify-between items-center mb-1.5 select-none">
          <span className="font-mono-custom text-[0.55rem] tracking-[0.2em] text-[#64748b] uppercase block">
            {label}
          </span>
          {charCount !== undefined && maxChar !== undefined && (
            <span className="font-mono-custom text-[0.5rem] text-[#64748b]">
              {charCount} / {maxChar}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

const CONSTANT_LOGS = [
  "SECURE_GATEWAY: Heartbeat stable at 24ms.",
  "CRYPTO_CORE: RSA 4096-bit key rotation completed.",
  "TUNNEL_MGR: Checking node integrity (12 active endpoints)...",
  "NODE_04: Port 443 listening, TLS 1.3 handshake active.",
  "SYS_MONITOR: Recruiter sync pool refreshed. Ready.",
  "SECURITY_DAEMON: Port scanning blocked from IP 198.51.100.42",
  "ROUTING_ENGINE: Optimized route for EUR-WEST tunnel.",
  "INTELLIGENCE_ROUTER: Scanning pending packet queues...",
  "AI_SYSTEM: Analysis parameters initialized (100% load readiness).",
  "NETWORK_CONTROLLER: Global sync check passed. Latitude verified.",
  "TUNNEL_MGR: Heartbeat payload verified across US-EAST.",
  "SYSTEM_SECURITY: Scanning open endpoints... 0 vulnerable found.",
  "ROUTING_ENGINE: Path calculation returned latency = 38ms.",
  "CRYPTO_CORE: Entropy pool gathered 512 bits."
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  
  // Decryption / Transmission Progress States
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("");
  
  // Interactive Focus States for Form Inputs
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusSubject, setFocusSubject] = useState(false);
  const [focusMessage, setFocusMessage] = useState(false);

  // Live Terminal Logs Buffer State
  const [logs, setLogs] = useState<string[]>([
    "SECURE_GATEWAY: Initializing encrypted transmission pipeline...",
    "CRYPTO_CORE: Core listening mode loaded.",
    "SYS_MONITOR: Waiting for initiator connection parameters...",
  ]);
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
      const randomMsg = CONSTANT_LOGS[Math.floor(Math.random() * CONSTANT_LOGS.length)];
      setLogs((prev) => {
        const next = [...prev, `[SYS] ${randomMsg}`];
        return next.slice(-25); // Cap buffer
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Encrypted Multi-Stage Countdown Loop submission
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("sending");
    setProgress(0);
    
    // Initializing logs
    setLogs((prev) => [
      ...prev,
      `[INIT] User secure packet transmission requested...`,
      `[INIT] Host verified: ${form.name} <${form.email}>`
    ]);

    // Interval countdown
    const stages = [
      { target: 20, txt: "VERIFYING INTEL INTEGRITY" },
      { target: 50, txt: "GENERATING RSA KEYPAIR (4096-BIT)" },
      { target: 80, txt: "ESTABLISHING AES SECURE ROUTE TUNNEL" },
      { target: 100, txt: "TRANSMITTING ENCRYPTED INTEL PAYLOAD" }
    ];

    let currentProg = 0;
    const progressInterval = setInterval(() => {
      currentProg += 2;
      setProgress(Math.min(currentProg, 100));

      // Resolve stage texts & append logs periodically
      const matchingStage = stages.find((s) => currentProg <= s.target);
      if (matchingStage) {
        setStageText(matchingStage.txt);
        
        // Push distinct system logs on milestone thresholds
        if (currentProg === 10) {
          setLogs((p) => [...p, `[CIPHER] Digest signature SHA-256 matches packet content integrity.`]);
        } else if (currentProg === 30) {
          setLogs((p) => [...p, `[CIPHER] Session handshake: RSA 4096 key rotation calculated.`]);
        } else if (currentProg === 60) {
          setLogs((p) => [...p, `[TUNNEL] Endpoint verified. Established 256-bit AES cryptographic pipe.`]);
        } else if (currentProg === 90) {
          setLogs((p) => [...p, `[DISPATCH] Secure packet dispatch through communication node network.`]);
        }
      }

      if (currentProg >= 100) {
        clearInterval(progressInterval);
        setStatus("sent");
        setStageText("TRANSMISSION COMPLETED SUCCESSFULLY");
        setLogs((p) => [
          ...p,
          `[COMPLETED] Transmission synchronized successfully with Ashu's gateway.`
        ]);
        
        // Reset form variables
        setForm({ name: "", email: "", subject: "", message: "" });
        
        // Return back to idle status
        setTimeout(() => {
          setStatus("idle");
          setProgress(0);
          setStageText("");
        }, 5000);
      }
    }, 55);
  };

  const socials = [
    { icon: GithubIcon, label: "GitHub Network", sub: "Repository Network Active", href: personalInfo.github, color: "#38bdf8" },
    { icon: LinkedinIcon, label: "LinkedIn Port", sub: "Professional Network Synced", href: personalInfo.linkedin, color: "#8b5cf6" },
    { icon: Mail, label: "Secure Mail Node", sub: "Secure Communication Ready", href: `mailto:${personalInfo.email}`, color: "#22d3ee" },
  ];

  return (
    <section id="contact" className="relative section-pad overflow-hidden bg-[#02040c]">
      <CyberBackground />

      <div className="relative z-10 container-xl">
        {/* Cinematic Header */}
        <div className="text-center mb-16 select-none">
          <div className="section-label justify-center mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            <span className="font-mono-custom tracking-[0.3em] text-[0.62rem] text-[#38bdf8] uppercase">
              SYS.COMM // CONTACT.06
            </span>
          </div>
          <ScrambleTitle 
            text="START A CONVERSATION" 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase font-display tracking-tighter"
          />
          <p className="text-[#64748b] max-w-lg mx-auto text-xs md:text-sm font-mono-custom mt-3 tracking-wide">
            Open to internship programs, software collaborations, and immediate engineering roles.
          </p>
        </div>

        {/* 3-Column Asymmetrical Cinematic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT PANEL: Live Communication Telemetry Panel (col-span-4) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* System Variable Parameters HUD Card */}
            <div className="glass-strong rounded-3xl p-6 border border-white/8 shadow-[0_15px_40px_rgba(0,0,0,0.55)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/40" />

              <h3 className="text-white font-black text-xs font-display tracking-widest mb-6 uppercase flex items-center gap-2 select-none">
                <Cpu size={12} className="text-cyan-400" />
                SYSTEM VARIABLE PARAMETERS
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "COMMUNICATIONS_ROUTE", val: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "#38bdf8" },
                  { icon: MapPin, label: "GEOLOCATION_COORDS", val: "Pune, India (IST)", color: "#8b5cf6" },
                ].map(({ icon: Icon, label, val, href, color }) => (
                  <div key={label} className="flex items-center gap-3.5 group/item">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/5 bg-[#090f2b] transition-all group-hover/item:border-cyan-500/30 group-hover/item:shadow-[0_0_10px_rgba(56,189,248,0.15)]"
                    >
                      <Icon size={14} style={{ color }} className="animate-pulse" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono-custom text-[0.58rem] text-[#64748b] mb-0.5 uppercase tracking-widest">{label}</p>
                      {href ? (
                        <a 
                          href={href}
                          className="text-white hover:text-cyan-400 text-xs md:text-sm font-mono-custom font-semibold truncate tracking-wider hover:underline transition-colors block cursor-pointer"
                        >
                          {val}
                        </a>
                      ) : (
                        <p className="text-white text-xs md:text-sm font-mono-custom font-semibold truncate tracking-wider">{val}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Secure Active Pulse */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-[#10b981]/5 border border-[#10b981]/20 flex-shrink-0">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                    </span>
                  </div>
                  <div>
                    <p className="font-mono-custom text-[0.58rem] text-[#64748b] mb-0.5 uppercase tracking-widest">SECURE_STATE</p>
                    <p className="text-[#10b981] text-xs font-mono-custom font-black tracking-widest animate-pulse">ACTIVE // OPEN_TO_HIRE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Trust & Timezone Parameter Metrics */}
            <div className="glass-strong rounded-3xl p-5 border border-white/8 font-mono-custom text-[0.62rem] text-[#94a3b8] space-y-2.5 select-none relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10" />
              
              <div className="flex items-center gap-2.5 text-emerald-400">
                <ShieldCheck size={13} className="animate-pulse" />
                <span className="font-bold tracking-wider">✓ RESPONDED TO 100% OF INQUIRIES</span>
              </div>
              <div className="flex items-center gap-2.5 text-cyan-400">
                <ShieldCheck size={13} />
                <span className="font-bold tracking-wider">✓ AVAILABLE FOR REMOTE OPPORTUNITIES</span>
              </div>
              <div className="flex items-center gap-2.5 text-purple-400">
                <ShieldCheck size={13} />
                <span className="font-bold tracking-wider">✓ TIMEZONE: IST (UTC +5:30) · MON–SAT</span>
              </div>
            </div>

            {/* Interactive Social Communication Node Chips */}
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, sub, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 glass-strong rounded-2xl p-4 border border-white/6 hover:border-cyan-500/30 group transition-all select-none cursor-pointer relative overflow-hidden shadow-lg"
                  whileHover={{ x: 6, backgroundColor: "rgba(7, 12, 36, 0.6)" }}
                >
                  <div
                    className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full opacity-[0.03] transition-all group-hover:scale-150"
                    style={{ backgroundColor: color }}
                  />

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/5 bg-[#090f2b]"
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0 font-mono-custom">
                    <p className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {label}
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </p>
                    <p className="text-[0.62rem] text-[#64748b] group-hover:text-cyan-400/90 transition-colors truncate mt-0.5 tracking-wide">{sub}</p>
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.2)] transition-all">
                    <Send size={10} className="text-[#64748b] group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── CENTER PANEL: Animated Live Communication AI Core (col-span-4) ── */}
          <div className="lg:col-span-4 self-stretch flex items-center justify-center">
            <CommCoreCanvas />
          </div>

          {/* ── RIGHT PANEL: Encrypted Holo Transmission Form (col-span-4) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 w-full"
          >
            <form
              onSubmit={submit}
              className="glass-strong rounded-3xl p-6 border border-white/8 flex flex-col gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              {/* Sci-Fi HUD Corner Brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/40" />

              <h3 className="text-white font-black text-xs font-display tracking-widest mb-2 uppercase flex items-center gap-2 select-none">
                <Shield size={12} className="text-purple-400 animate-pulse" />
                ENCRYPTED INTEL TRANSMITTER
              </h3>

              {/* Name input */}
              <FuturisticInputWrapper label="[ INITIATOR_NAME ]" focused={focusName}>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agent Carter"
                  value={form.name}
                  onChange={update("name")}
                  onFocus={() => setFocusName(true)}
                  onBlur={() => setFocusName(false)}
                  className="w-full bg-transparent border-0 p-0 text-white font-mono-custom text-xs placeholder:text-[#334155] focus:ring-0 focus:outline-none tracking-wider"
                />
              </FuturisticInputWrapper>

              {/* Email input */}
              <FuturisticInputWrapper label="[ INITIATOR_EMAIL ]" focused={focusEmail}>
                <input
                  type="email"
                  required
                  placeholder="e.g. name@agency.net"
                  value={form.email}
                  onChange={update("email")}
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                  className="w-full bg-transparent border-0 p-0 text-white font-mono-custom text-xs placeholder:text-[#334155] focus:ring-0 focus:outline-none tracking-wider"
                />
              </FuturisticInputWrapper>

              {/* Subject input */}
              <FuturisticInputWrapper label="[ INTEL_SUBJECT ]" focused={focusSubject}>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Collaboration Launch"
                  value={form.subject}
                  onChange={update("subject")}
                  onFocus={() => setFocusSubject(true)}
                  onBlur={() => setFocusSubject(false)}
                  className="w-full bg-transparent border-0 p-0 text-white font-mono-custom text-xs placeholder:text-[#334155] focus:ring-0 focus:outline-none tracking-wider"
                />
              </FuturisticInputWrapper>

              {/* Message Payload Textarea */}
              <FuturisticInputWrapper 
                label="[ INTEL_PAYLOAD_MESSAGE ]" 
                focused={focusMessage}
                charCount={form.message.length}
                maxChar={1000}
              >
                <textarea
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Transmit secure message payload..."
                  value={form.message}
                  onChange={update("message")}
                  onFocus={() => setFocusMessage(true)}
                  onBlur={() => setFocusMessage(false)}
                  className="w-full bg-transparent border-0 p-0 text-white font-mono-custom text-xs placeholder:text-[#334155] focus:ring-0 focus:outline-none resize-none tracking-wider leading-relaxed"
                />
              </FuturisticInputWrapper>

              {/* Holographic secure transmission button */}
              <div className="relative group/btn mt-1">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-md opacity-35 group-hover/btn:opacity-60 transition-opacity duration-300 pointer-events-none" />
                
                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  className={`w-full py-4 rounded-2xl font-mono-custom font-black text-xs tracking-widest flex flex-col items-center justify-center gap-1.5 transition-all select-none relative overflow-hidden cursor-pointer border ${
                    status === "sent"
                      ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                      : status === "error"
                      ? "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30"
                      : "bg-[#070c24] text-white border-cyan-500/40 hover:border-cyan-400"
                  }`}
                  whileHover={status === "idle" ? { scale: 1.01, y: -1 } : {}}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Glowing line sweep effect */}
                  <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(56,189,248,0.06)_50%,transparent_100%)] -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />

                  {status === "idle" && (
                    <span className="flex items-center gap-2">
                      <Send size={12} className="animate-pulse" />
                      INITIATE_SECURE_TRANSMISSION ✦
                    </span>
                  )}

                  {status === "sending" && (
                    <div className="w-full px-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[10px] tracking-widest text-cyan-400 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Loader size={11} className="animate-spin" />
                          {stageText}...
                        </span>
                        <span>{progress}%</span>
                      </div>
                      {/* Interactive Progress bar */}
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {status === "sent" && (
                    <span className="flex items-center gap-2">
                      <CheckCircle size={12} className="animate-bounce" />
                      TRANSMISSION SUCCESSFUL ✦
                    </span>
                  )}

                  {status === "error" && (
                    <span className="flex items-center gap-2">
                      <AlertCircle size={12} />
                      PIPELINE CONNECTION FAILURE
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Bottom security tunnel telemetry */}
              <div className="flex items-center justify-center gap-1.5 font-mono-custom text-[0.52rem] text-[#64748b] mt-1 select-none">
                <Shield size={10} className="text-[#38bdf8]" />
                <span>SECURED TUNNEL ENDPOINT // LATENCY &lt; 12 Hours</span>
              </div>
            </form>
          </motion.div>

        </div>

        {/* ── BOTTOM NETWORK COCKPIT Operations Panel (col-span-12) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 lg:mt-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* 3 Telemetry Counter columns (col-span-4) */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-4">
            
            {/* Telemetry Counter 1 */}
            <div className="glass-strong rounded-2xl p-4 border border-white/6 relative select-none flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/20" />
              <div className="flex items-center gap-2 text-[#64748b] text-[0.58rem] font-mono-custom uppercase tracking-widest mb-1.5">
                <Globe size={11} className="text-cyan-400 animate-pulse" />
                SECURE_CHANNELS
              </div>
              <div className="text-white text-xl md:text-2xl font-mono-custom flex items-baseline gap-1">
                <TelemetryCounter value={18} />
                <span className="text-xs text-cyan-400 font-bold">/32</span>
              </div>
            </div>

            {/* Telemetry Counter 2 */}
            <div className="glass-strong rounded-2xl p-4 border border-white/6 relative select-none flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/20" />
              <div className="flex items-center gap-2 text-[#64748b] text-[0.58rem] font-mono-custom uppercase tracking-widest mb-1.5">
                <Activity size={11} className="text-purple-400" />
                ROUTE_LATENCY
              </div>
              <div className="text-white text-xl md:text-2xl font-mono-custom flex items-baseline gap-1">
                <TelemetryCounter value={32.4} decimals={1} />
                <span className="text-xs text-purple-400 font-bold">ms</span>
              </div>
            </div>

            {/* Telemetry Counter 3 */}
            <div className="glass-strong rounded-2xl p-4 border border-white/6 relative select-none flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/20" />
              <div className="flex items-center gap-2 text-[#64748b] text-[0.58rem] font-mono-custom uppercase tracking-widest mb-1.5">
                <Wifi size={11} className="text-emerald-400 animate-pulse" />
                READINESS_IDX
              </div>
              <div className="text-white text-xl md:text-2xl font-mono-custom flex items-baseline gap-1">
                <TelemetryCounter value={98.7} decimals={1} />
                <span className="text-xs text-emerald-400 font-bold">%</span>
              </div>
            </div>

          </div>

          {/* Large Operations Console log screen (col-span-8) */}
          <div className="lg:col-span-8 glass-strong rounded-2xl border border-white/6 p-4 shadow-inner relative flex flex-col gap-2.5 overflow-hidden h-[168px]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/30" />
            
            <div className="flex justify-between items-center text-[0.58rem] font-mono-custom text-[#64748b] uppercase tracking-widest border-b border-white/5 pb-2 select-none">
              <div className="flex items-center gap-1.5">
                <Terminal size={12} className="text-cyan-400" />
                LIVE COCKPIT OPERATIONS CONSOLE
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-emerald-400 font-black">STREAM ACTIVE</span>
              </div>
            </div>

            {/* scrolling operations log wrapper */}
            <div ref={logsContainerRef} className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-1 space-y-1 font-mono-custom text-[0.6rem] leading-relaxed text-cyan-400/80">
              {logs.map((log, index) => {
                let colorClass = "text-cyan-400/80";
                if (log.includes("[CIPHER]")) colorClass = "text-purple-400/90";
                else if (log.includes("[TUNNEL]")) colorClass = "text-blue-400/90";
                else if (log.includes("[DISPATCH]")) colorClass = "text-cyan-300 font-bold";
                else if (log.includes("[COMPLETED]")) colorClass = "text-emerald-400 font-bold";
                else if (log.includes("[INIT]")) colorClass = "text-yellow-400/80";
                else if (log.includes("[SYS]")) colorClass = "text-[#64748b]";

                return (
                  <div key={index} className={`flex items-start gap-1 ${colorClass}`}>
                    <span className="text-white/30 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
