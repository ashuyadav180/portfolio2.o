"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GitBranch, 
  ExternalLink, 
  ArrowUpRight, 
  Cpu, 
  Activity, 
  Terminal, 
  Server, 
  Wifi, 
  CheckCircle2, 
  ChevronRight 
} from "lucide-react";
import { projects } from "@/lib/data";

interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  tech: string[];
  github: string;
  live: string;
  color: string;
  gradient: string;
  category: string;
  status: string;
  year: string;
  image: string;
}

const techRoles: Record<string, string> = {
  "React.js": "Virtual DOM Rendering Engine",
  "Node.js": "Asynchronous API Loop Infrastructure",
  "Python": "Fast AI Scripting & Neural Pipeline",
  "FastAPI": "High-Throughput ASGI Microservice",
  "Gemini AI": "Multimodal LLM Reasoning Core",
  "Stability SDXL": "Diffusion Neural Visual Generator",
  "RunwayML": "AI Frame Vector Interpolator",
  "ElevenLabs": "Cognitive Audio Voice Synthesizer",
  "FFmpeg": "Multiplexed AV Assembler Pipeline",
  "Express.js": "Middleware Routing Gateway Online",
  "MongoDB": "NoSQL Database Cluster Online",
  "Socket.IO": "Real-Time WebSocket Sync Pipe",
  "Firebase": "Serverless Database Identity Core"
};

/* ─── Centerpiece: Interactive Nexus Core Canvas ──────────── */
function NexusCoreCanvas({ hoveredCard }: { hoveredCard: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovered(true));
      container.addEventListener("mouseleave", () => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      });
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovered(true));
        container.removeEventListener("mouseleave", () => {});
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = 280;
    let height = canvas.height = 540;
    let rotation = 0;
    let pulseScale = 1;
    let pulseDir = 1;

    // Fixed particle parameters to maintain React 19 render purity
    const particlesCount = 28;
    const particles = Array.from({ length: particlesCount }, (_, i) => ({
      y: (height / particlesCount) * i,
      speed: 0.35 + (i % 4) * 0.1,
      angle: (i * Math.PI * 2) / 7,
      radius: 1.5 + (i % 3) * 0.5,
      orbit: 35 + (i % 5) * 8
    }));

    const resizeCanvas = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 280;
      height = canvas.height = canvas.parentElement?.clientHeight || 540;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotation += 0.007;

      // Pulse logic
      pulseScale += 0.003 * pulseDir;
      if (pulseScale > 1.08) pulseDir = -1;
      if (pulseScale < 0.96) pulseDir = 1;

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Grid / Radar circles
      ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
      ctx.lineWidth = 1;
      [50, 90, 130].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * pulseScale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Rotating dashed outer dial
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-rotation * 0.6);
      ctx.strokeStyle = hoveredCard ? "rgba(139, 92, 246, 0.25)" : "rgba(56, 189, 248, 0.15)";
      ctx.setLineDash([5, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Dynamic mouse interactive center sweep
      const targetX = centerX + (isHovered ? mousePos.x * 0.15 : 0);
      const targetY = centerY + (isHovered ? mousePos.y * 0.15 : 0);

      // Core glow gradient
      const coreGrad = ctx.createRadialGradient(
        targetX,
        targetY,
        2,
        targetX,
        targetY,
        65 * pulseScale
      );
      if (hoveredCard === 1) {
        coreGrad.addColorStop(0, "rgba(56, 189, 248, 0.35)");
        coreGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.08)");
        coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      } else if (hoveredCard === 2) {
        coreGrad.addColorStop(0, "rgba(139, 92, 246, 0.35)");
        coreGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.08)");
        coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        coreGrad.addColorStop(0, "rgba(56, 189, 248, 0.22)");
        coreGrad.addColorStop(0.4, "rgba(139, 92, 246, 0.08)");
        coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 65 * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      // Draw connection lines to active side card anchors
      ctx.setLineDash([]);
      if (hoveredCard === 1) {
        // Line to Left Card
        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.bezierCurveTo(centerX - 80, centerY - 20, centerX - 120, centerY - 10, 0, centerY);
        ctx.stroke();

        // High speed energy packet
        const progress = (Date.now() % 1600) / 1600;
        const packetX = targetX + (0 - targetX) * progress;
        const packetY = targetY + (centerY - targetY) * progress;
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      } else if (hoveredCard === 2) {
        // Line to Right Card
        ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.bezierCurveTo(centerX + 80, centerY + 20, centerX + 120, centerY + 10, width, centerY);
        ctx.stroke();

        // High speed energy packet
        const progress = (Date.now() % 1600) / 1600;
        const packetX = targetX + (width - targetX) * progress;
        const packetY = targetY + (centerY - targetY) * progress;
        ctx.fillStyle = "#a78bfa";
        ctx.shadowColor = "#8b5cf6";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }

      // Draw Central Rotating Double Hexagon
      ctx.strokeStyle = hoveredCard ? "rgba(255,255,255,0.4)" : "rgba(56, 189, 248, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.save();
      ctx.translate(targetX, targetY);
      ctx.rotate(rotation);
      
      const drawHex = (side: number) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = Math.cos(angle) * side;
          const y = Math.sin(angle) * side;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      };
      
      drawHex(22 * pulseScale);
      ctx.rotate(-rotation * 2);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
      drawHex(36 * pulseScale);
      ctx.restore();

      // Core neural nodes cylinder
      particles.forEach((p) => {
        p.angle += p.speed * 0.02;
        const ptX = targetX + Math.cos(p.angle) * p.orbit * pulseScale;
        const ptY = p.y;
        
        ctx.fillStyle = hoveredCard === 1 
          ? "rgba(56, 189, 248, 0.45)" 
          : hoveredCard === 2 
          ? "rgba(139, 92, 246, 0.45)" 
          : "rgba(255, 255, 255, 0.3)";
          
        ctx.beginPath();
        ctx.arc(ptX, ptY, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect near nodes to make it look like a lattice mesh
        if (Math.abs(ptY - centerY) < 130) {
          ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
          ctx.beginPath();
          ctx.moveTo(ptX, ptY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hoveredCard, mousePos, isHovered]);

  return (
    <div ref={containerRef} className="relative w-full h-[540px] flex items-center justify-center bg-slate-950/20 rounded-3xl border border-white/5 overflow-hidden select-none select-none">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Futuristic Floating Diagnostic HUD Texts overlay */}
      <div className="absolute inset-y-8 inset-x-4 flex flex-col justify-between font-mono-custom pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.52rem] text-[#38bdf8] font-bold tracking-widest">[ COGNITIVE_NEXUS ]</span>
            <span className="text-[0.45rem] text-slate-500">SYS_V: 4.8.1_BETA</span>
          </div>
          <div className="flex items-center gap-1.5 text-[0.52rem] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            ONLINE
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 my-auto">
          <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" 
              animate={{ width: ["20%", "85%", "40%", "95%", "20%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="text-[0.55rem] text-slate-400 font-bold tracking-widest">NEXUS COUPLING</span>
          <span className="text-[0.45rem] text-slate-600">STATIC CORE IDLE</span>
        </div>

        <div className="flex justify-between items-end text-[0.48rem] text-slate-500">
          <span>LATENCY: 12ms</span>
          <span>INTEGRITY: 99.8%</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Live Preview: AUTOREEL.AI ──────────────────────────── */
function AutoReelPreview() {
  const [typedPrompt, setTypedPrompt] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [pipelineState, setPipelineState] = useState(0);
  
  const prompts = useMemo(() => [
    "A cinematic view of a futuristic Tokyo street, digital neon reflections, raining, 60fps...",
    "An educational documentary explaining the mechanical physics of a quantum supercomputer...",
    "A documentary style footage of deep marine species bioluminescence in a dark trench..."
  ], []);

  const pipelineStages = useMemo(() => [
    { code: "PRSR", desc: "PARSING STORYBOARD" },
    { code: "LMM", desc: "GEMINI SCENARIO WRITING" },
    { code: "VOX", desc: "ELEVENLABS VOICE SYNTH" },
    { code: "DIFF", desc: "STABILITY SDXL GEN" },
    { code: "FFMP", desc: "FFMPEG AV ASSEMBLER" },
    { code: "WHSP", desc: "WHISPER SUBTITLE SYNC" },
    { code: "AUTH", desc: "OAUTH2 PUBLISHING EXEC" },
    { code: "IDLE", desc: "PIPELINE IDLE / STABLE" }
  ], []);

  // Text typewriter loop
  useEffect(() => {
    const currentText = prompts[promptIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!isDeleting) {
        setTypedPrompt(currentText.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2200); // Wait before delete
        } else {
          timer = setTimeout(tick, 45);
        }
      } else {
        setTypedPrompt(currentText.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setPromptIndex((prev) => (prev + 1) % prompts.length);
        }
        timer = setTimeout(tick, 25);
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, [promptIndex, prompts]);

  // Pipeline phase cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineState((prev) => (prev + 1) % pipelineStages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [pipelineStages.length]);

  return (
    <div className="relative h-44 w-full overflow-hidden bg-[#030611] border-b border-white/5 flex flex-col justify-between p-4 font-mono-custom select-none">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Meta row */}
      <div className="flex justify-between items-center text-[0.55rem] text-slate-500 z-10">
        <span className="flex items-center gap-1 text-[#38bdf8] font-bold">
          <Activity size={10} className="animate-pulse" />
          AI_WORKER_POOL_ACTIVE
        </span>
        <span className="text-[0.5rem] tracking-widest text-[#38bdf8]/75">SYS_1: PIPELINE_STAGE // 60 FPS</span>
      </div>

      {/* Prompt Typist Monitor */}
      <div className="my-auto border border-white/5 bg-slate-950/60 rounded-xl p-3 z-10 flex flex-col gap-1.5 min-h-[70px]">
        <div className="flex items-center gap-1.5 text-[0.48rem] text-slate-500 font-bold border-b border-white/5 pb-1">
          <Terminal size={9} className="text-cyan-400" />
          <span>PROMPT_COMPILER // RUNNING</span>
        </div>
        <div className="text-[0.62rem] text-cyan-400 font-semibold leading-relaxed break-words font-mono-custom">
          {typedPrompt}
          <motion.span 
            className="inline-block w-1.5 h-3 ml-0.5 bg-cyan-400 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Bottom Spectrograph & Ticker */}
      <div className="flex items-end justify-between gap-4 z-10">
        {/* Spectrogram audio animation */}
        <div className="flex items-end gap-[2px] h-6">
          {[0.2, 0.85, 0.4, 0.95, 0.6, 0.75, 0.3, 0.8, 0.45, 0.6, 0.35, 0.5, 0.2].map((h, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#38bdf8] rounded-t-sm shadow-[0_0_8px_#0ea5e9]"
              style={{ height: h * 24 }}
              animate={pipelineState === 7 ? { height: 3 } : {
                height: [h * 24, (h * 0.4) * 24, h * 24],
              }}
              transition={{
                duration: 0.8 + i * 0.08,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Current status tag */}
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[0.45rem] text-slate-500 tracking-wider">PIPELINE NODE STATE</span>
          <div className="flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded text-[0.55rem] text-[#38bdf8] font-bold">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            [{pipelineStages[pipelineState].code}] {pipelineStages[pipelineState].desc}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Live Preview: MEDICAL STORE MANAGEMENT ───────────────── */
function MedicalStorePreview() {
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = useMemo(() => [
    { title: "PRESCRIPTION UPLOADED", desc: "File verified in Cloudinary server clusters" },
    { title: "DOUBLE JWT AUTHENTICATED", desc: "Payload verified securely at secure node middleware" },
    { title: "ORDER ROUTED TO COURIER", desc: "Real-time routing dispatched to dispatch network" },
    { title: "WHATSAPP ALERT PUSHED", desc: "Notification triggers delivered to client terminal" }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [workflowSteps.length]);

  return (
    <div className="relative h-44 w-full overflow-hidden bg-[#030611] border-b border-white/5 flex flex-col justify-between p-4 font-mono-custom select-none">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Meta Row */}
      <div className="flex justify-between items-center text-[0.55rem] text-slate-500 z-10">
        <span className="flex items-center gap-1 text-purple-400 font-bold">
          <Server size={10} className="animate-pulse" />
          SOCKET.IO_DISPATCH_PORTAL
        </span>
        <span className="text-[0.5rem] tracking-widest text-purple-400/80">FB_SYNC // JWT_ACTIVE</span>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative border border-white/5 bg-slate-950/60 rounded-xl p-3 z-10 my-auto flex gap-3 h-20 items-center justify-between overflow-hidden">
        {/* Animated flow dots background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <svg className="w-full h-full text-purple-500/30" viewBox="0 0 100 40">
            <path d="M 10 20 Q 30 10 50 20 T 90 20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <motion.circle cx="10" cy="20" r="2" fill="#a78bfa" animate={{ cx: [10, 90], cy: [20, 10, 20] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
          </svg>
        </div>

        {/* Dispatch Nodes */}
        <div className="flex flex-col gap-1 z-10 w-2/3">
          <span className="text-[0.45rem] text-slate-500 font-bold uppercase tracking-wider">[ PIPELINE TRANSACTION ALERT ]</span>
          <h4 className="text-[0.62rem] text-purple-300 font-extrabold truncate">{workflowSteps[activeStep].title}</h4>
          <p className="text-[0.48rem] text-slate-400 leading-tight line-clamp-2">{workflowSteps[activeStep].desc}</p>
        </div>

        {/* Flow Visualizer Box */}
        <div className="flex flex-col gap-1 items-end z-10 w-1/3">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
            <span className="text-[0.5rem] text-purple-400 font-bold uppercase">TX_SYNC</span>
          </div>
          <span className="text-[0.48rem] text-slate-500 font-bold">STATUS: OK_200</span>
        </div>
      </div>

      {/* Notification popup stream mock-up */}
      <div className="flex items-center justify-between text-[0.52rem] text-slate-500 z-10">
        <span className="flex items-center gap-1 text-slate-400">
          <Wifi size={10} className="text-purple-400" />
          SYNC: DATABASE_ONLINE
        </span>
        <div className="flex gap-1">
          {workflowSteps.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i === activeStep ? "bg-purple-400 shadow-[0_0_8px_#a78bfa]" : "bg-slate-800"}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card (Interactive Software Module) ──────────── */
function ProjectCard({ 
  p, 
  index, 
  onHover 
}: { 
  p: ProjectItem; 
  index: number; 
  onHover: (id: number | null) => void 
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "pipeline" | "telemetry">("overview");
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Static metric fluctuations for pure renders
  const [fluctVal, setFluctVal] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFluctVal((prev) => (prev + 1) % 100);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    if (p.id === 1) {
      const load = 40 + (fluctVal % 12);
      const latency = 120 + (fluctVal % 30);
      return [
        { label: "PIPELINE LOAD", val: `${load}%` },
        { label: "WORKER NODES", val: "8 ACTIVE" },
        { label: "API LATENCY", val: `${latency}ms` }
      ];
    } else {
      const speed = 12 + (fluctVal % 4);
      const capacity = 94 + (fluctVal % 5);
      return [
        { label: "TUNNEL PING", val: `${speed}ms` },
        { label: "AUTH LAYER", val: "ACTIVE" },
        { label: "SOCKET THREADS", val: `${capacity}%` }
      ];
    }
  }, [p.id, fluctVal]);

  const pipelineStages = useMemo(() => {
    if (p.id === 1) {
      return [
        "Prompt Parsing Scenario Generation",
        "ElevenLabs Text-to-Voice synthesis",
        "Stability SDXL Cinematic frame render",
        "FFmpeg frame audio compositing",
        "Secure YouTube Data API Publishing"
      ];
    } else {
      return [
        "Customer Prescription Image Upload",
        "Role-based secure verification gate",
        "Mongoose transactional database ledger",
        "WhatsApp Notification pipeline dispatch",
        "Real-Time Delivery tracking channel"
      ];
    }
  }, [p.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => {
        onHover(p.id);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        onHover(null);
        setIsHovered(false);
      }}
      className="relative flex flex-col h-full bg-[#050816]/75 border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 select-none"
    >
      {/* Spot Follow Spotlight */}
      {isHovered && (
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            background: p.color
          }}
        />
      )}

      {/* Cybernetic HUD Corner Lines */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/15" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/15" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/15" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/15" />

      {/* Color Top Border Strip */}
      <div className="h-[2px] w-full bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${p.color}aa, transparent)` }} />

      {/* Preview Section */}
      {p.id === 1 ? <AutoReelPreview /> : <MedicalStorePreview />}

      {/* Card Body Container */}
      <div 
        ref={cardRef} 
        onMouseMove={handleMouseMove} 
        className="p-6 flex flex-col flex-1 gap-5"
      >
        
        {/* Core Description Meta */}
        <div>
          <div className="flex justify-between items-center mb-1 font-mono-custom select-none">
            <span className="text-[0.6rem] font-black tracking-widest text-[#38bdf8] uppercase">
              {p.category}
            </span>
            <span className="text-[0.52rem] text-slate-500">SYS_ID: 0{p.id}_CORE</span>
          </div>

          <div className="flex items-baseline justify-between select-none">
            <h3 className="font-display text-xl font-extrabold text-white tracking-wide uppercase">
              {p.title}
            </h3>
            <span className="font-mono-custom text-[0.62rem] text-slate-400 font-bold select-none tracking-widest">{p.year}</span>
          </div>
          <p className="text-[0.62rem] font-mono-custom text-slate-400 uppercase tracking-widest font-bold mt-0.5">
            {p.subtitle}
          </p>
        </div>

        {/* Dashboard Dynamic Navigation Tabs */}
        <div className="flex border-b border-white/5 font-mono-custom select-none gap-2 text-[0.55rem] font-extrabold">
          {[
            { id: "overview", label: "OVERVIEW" },
            { id: "pipeline", label: "SYS_PIPELINE" },
            { id: "telemetry", label: "TELEMETRY" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as "overview" | "pipeline" | "telemetry")}
              className={`pb-1.5 px-1 relative transition-colors cursor-pointer ${activeTab === t.id ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              {t.label}
              {activeTab === t.id && (
                <motion.div 
                  layoutId={`active_tab_${p.id}`}
                  className="absolute bottom-0 inset-x-0 h-[1.5px]"
                  style={{ background: p.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tabs Display Content */}
        <div className="flex-1 min-h-[140px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="text-xs"
            >
              {activeTab === "overview" && (
                <div className="space-y-3">
                  <p className="text-[#a1b0cb] leading-relaxed text-[0.72rem] md:text-[0.78rem]">
                    {p.description}
                  </p>
                  
                  {/* Highlight Specs */}
                  <div className="space-y-1.5 font-mono-custom text-[0.65rem] select-none text-slate-400">
                    <span className="text-[0.55rem] font-bold text-slate-500 tracking-[0.12em] block">[ CAPABILITY ARCHIVE ]</span>
                    <div className="grid grid-cols-1 gap-1">
                      {p.features.slice(0, 2).map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-1.5 leading-tight">
                          <CheckCircle2 size={11} className="text-[#38bdf8] mt-0.5 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pipeline" && (
                <div className="space-y-2 font-mono-custom">
                  <span className="text-[0.55rem] font-bold text-slate-500 tracking-[0.12em] block">[ PIPELINE INTEGRATION NODES ]</span>
                  <div className="space-y-1.5">
                    {pipelineStages.map((stage, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[0.62rem] text-slate-300">
                        <span className="text-[0.5rem] font-bold text-slate-500 w-4 font-mono-custom">0{idx + 1}</span>
                        <ChevronRight size={10} style={{ color: p.color }} />
                        <span className="truncate">{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "telemetry" && (
                <div className="space-y-3 font-mono-custom select-none">
                  <span className="text-[0.55rem] font-bold text-slate-500 tracking-[0.12em] block">[ STICK_CLUSTER DIAGNOSTICS ]</span>
                  <div className="grid grid-cols-3 gap-2">
                    {stats.map((s, sidx) => (
                      <div key={sidx} className="flex flex-col bg-slate-950/70 border border-white/5 rounded-lg p-2.5">
                        <span className="text-[0.45rem] text-slate-500 font-bold uppercase truncate">{s.label}</span>
                        <span className="text-[0.68rem] text-white font-black mt-0.5 tracking-wide uppercase" style={{ color: p.color }}>
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950/70 border border-white/5 rounded-lg p-2 text-[0.5rem] text-slate-400">
                    <Cpu size={10} className="text-emerald-400 animate-spin" />
                    <span>THREADING CONCURRENCY SAFE // SYNC STATUS STABLE</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Interactive Technology Chips Area */}
          <div className="relative pt-3 mt-4 border-t border-white/5 select-none z-20">
            <div className="flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <div
                  key={t}
                  onMouseEnter={() => setHoveredChip(t)}
                  onMouseLeave={() => setHoveredChip(null)}
                  className="px-2 py-0.5 rounded bg-white/4 border border-white/5 hover:border-[#38bdf8]/30 text-[0.62rem] font-mono-custom text-slate-300 transition-colors cursor-pointer select-none"
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Micro Details Tooltip Overlay */}
            <AnimatePresence>
              {hoveredChip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 mb-2 bg-[#050816] border border-cyan-500/20 text-[0.55rem] font-mono-custom text-cyan-400 rounded-lg p-1.5 px-2.5 shadow-[0_4px_15px_rgba(56,189,248,0.15)] pointer-events-none z-30"
                >
                  <span className="font-extrabold uppercase font-sans text-[0.58rem] block text-white select-none">
                    {hoveredChip}
                  </span>
                  <span>
                    {techRoles[hoveredChip] || "Active Infrastructure Node Modules"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Premium Holographic Action Buttons */}
        <div className="flex gap-3 pt-3 border-t border-white/5 select-none">
          <motion.a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-950/70 border border-white/5 hover:border-white/15 px-3 py-2 rounded-xl text-[0.58rem] font-mono-custom font-bold text-slate-400 hover:text-white transition-all select-none cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GitBranch size={10} />
            REPOSITORY
          </motion.a>
          
          <motion.a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[0.58rem] font-mono-custom font-bold text-white transition-all select-none cursor-pointer relative group/btn"
            style={{
              background: `linear-gradient(135deg, ${p.color}18, ${p.color}05)`,
              border: `1px solid ${p.color}35`,
            }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: `0 4px 15px ${p.color}15`, 
              borderColor: p.color 
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Slide glowing sweep overlay */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <ExternalLink size={10} />
            LAUNCH PIPELINE ✦
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Bottom Telemetry: Live Logs Stream Panel ───────────── */
function LiveTelemetryPanel() {
  const [logs, setLogs] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Fluctuating metric stats
  const [stats, setStats] = useState({
    latency: 12,
    cpu: 18,
    memory: 2.1,
    bandwidth: 4.8
  });

  useEffect(() => {
    // Defer initial logs loading to prevent synchronous cascading render warnings in React 19
    const initTimer = setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs([
        `[${timestamp}] Systems operations console booting...`,
        `[${timestamp}] Establishing Socket.IO websocket conduits.`,
        `[${timestamp}] Cloud clusters online. All AI microservice workers active.`
      ]);
    }, 0);

    const logPool = [
      "AutoReel pipeline job initialized by client prompt index.",
      "Parsing cognitive narrative storyboard blueprint with Gemini.",
      "ElevenLabs REST endpoint triggered: Synthesizing voice mp3 streams.",
      "Stability AI SDXL neural diffusion sampling images. Delay: 1.82s.",
      "Asynchronous FFmpeg child workers compiling 60 FPS video layers.",
      "Whisper voice audio transcribing: Subtitles synchronized.",
      "Medical Store order #4829 successfully validated. Auth status: OK.",
      "Cloudinary prescription receipt image buffer secure verification complete.",
      "Firebase user session authorized via encrypted JWT header tokens.",
      "WhatsApp automated dispatch notification API returned status code 200.",
      "AutoReel publisher thread completes rendering. API returned target URL.",
      "Socket.IO connection channel heartbeat verified: latency stable."
    ];

    // Interval to cycle logs
    const logInterval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setLogs((prev) => {
        const timestamp = new Date().toLocaleTimeString();
        const next = [...prev, `[${timestamp}] ${randomLog}`];
        if (next.length > 15) next.shift(); // Keep logs memory bound
        return next;
      });
    }, 3800);

    // Stats fluctuation interval
    const statsInterval = setInterval(() => {
      setStats({
        latency: 10 + Math.floor(Math.random() * 6),
        cpu: 15 + Math.floor(Math.random() * 10),
        memory: +(2.0 + Math.random() * 0.3).toFixed(2),
        bandwidth: +(4.0 + Math.random() * 1.5).toFixed(1)
      });
    }, 2500);

    return () => {
      clearTimeout(initTimer);
      clearInterval(logInterval);
      clearInterval(statsInterval);
    };
  }, []);

  // Scroll to bottom of terminal log window
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="relative border border-white/5 bg-[#03050c]/90 rounded-3xl p-5 md:p-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden select-none select-none">
      <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Stats column */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-4 border-b lg:border-b-0 lg:border-r border-white/5 pb-4 lg:pb-0 lg:pr-5 select-none">
        <div>
          <div className="flex items-center gap-1.5 text-[0.55rem] text-[#38bdf8] font-bold tracking-widest uppercase mb-1">
            <Terminal size={10} className="animate-pulse" />
            TELEMETRY_INDEX_METRICS
          </div>
          <span className="text-[0.45rem] text-slate-500 font-mono-custom uppercase tracking-wider block">REALTIME FLUX CONTEXT</span>
        </div>

        <div className="grid grid-cols-2 gap-3 select-none font-mono-custom">
          <div className="bg-[#050816] border border-white/5 rounded-xl p-2.5 flex flex-col gap-0.5">
            <span className="text-[0.45rem] text-slate-500 font-bold uppercase">NET LATENCY</span>
            <span className="text-xs font-black text-[#38bdf8]">{stats.latency}ms</span>
          </div>
          <div className="bg-[#050816] border border-white/5 rounded-xl p-2.5 flex flex-col gap-0.5">
            <span className="text-[0.45rem] text-slate-500 font-bold uppercase">CLUSTER CPU</span>
            <span className="text-xs font-black text-purple-400">{stats.cpu}%</span>
          </div>
          <div className="bg-[#050816] border border-white/5 rounded-xl p-2.5 flex flex-col gap-0.5">
            <span className="text-[0.45rem] text-slate-500 font-bold uppercase">MEMORY ALLOC</span>
            <span className="text-xs font-black text-cyan-400">{stats.memory}GB</span>
          </div>
          <div className="bg-[#050816] border border-white/5 rounded-xl p-2.5 flex flex-col gap-0.5">
            <span className="text-[0.45rem] text-slate-500 font-bold uppercase">THROUGHPUT</span>
            <span className="text-xs font-black text-white">{stats.bandwidth}GB/s</span>
          </div>
        </div>
      </div>

      {/* Terminal logs column */}
      <div className="lg:col-span-8 flex flex-col justify-between min-h-[110px] select-none">
        <div className="flex justify-between items-center text-[0.55rem] text-slate-500 pb-2 border-b border-white/5 mb-2 font-mono-custom">
          <span>ACTIVE PIPELINE ACTIVITY OPERATIONS SYSTEM LOGS</span>
          <span className="text-[#38bdf8]/75">MAX_LIMIT: 15 LOG BOUNDS</span>
        </div>

        <div 
          ref={consoleRef}
          className="flex-1 overflow-y-auto max-h-[85px] pr-2 space-y-1 text-[0.55rem] font-mono-custom text-slate-400 scrollbar-thin select-none"
        >
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2 items-start hover:text-white leading-normal transition-colors">
              <span className="text-[#38bdf8]/70 flex-shrink-0">✦</span>
              <span className="break-all">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section Component ────────────────────────────── */
export default function ProjectsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="projects" className="relative section-pad overflow-hidden min-h-screen flex flex-col justify-between">
      {/* Dynamic Environmental Background Lighting */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.035)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.035)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
      
      {/* Circuit track lines visual */}
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.03] pointer-events-none z-0" />

      <div className="relative z-10 container-xl flex flex-col justify-between flex-1 gap-12 select-none">
        
        {/* Cinematic Stagger title system loading header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="section-label justify-center mb-3 font-mono-custom select-none text-[0.62rem] tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            SYS.WORKS // SEC_ARCHIVE.03
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-display tracking-wide relative select-none">
            Selected <span className="gradient-text">Creations</span>
          </h2>
          
          <p className="text-[#94a3b8] max-w-md mx-auto text-xs font-mono-custom mt-2 leading-relaxed">
            Fully functional architectures, built with extreme mechanical precision.
          </p>

          {/* System status booting line */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* 3-Column Asymmetric layout (Left Card | Central Core | Right Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-center">
          
          {/* AUTOREEL.AI */}
          <div className="lg:col-span-5 h-full">
            <ProjectCard 
              p={projects[0] as unknown as ProjectItem} 
              index={0} 
              onHover={setHoveredCard} 
            />
          </div>

          {/* Center Nexus Core Canvas */}
          <div className="lg:col-span-2 hidden lg:block h-full">
            <NexusCoreCanvas hoveredCard={hoveredCard} />
          </div>

          {/* Medical Store Management */}
          <div className="lg:col-span-5 h-full">
            <ProjectCard 
              p={projects[1] as unknown as ProjectItem} 
              index={1} 
              onHover={setHoveredCard} 
            />
          </div>

        </div>

        {/* Telemetry log cockpit panel & bottom repository index */}
        <div className="flex flex-col gap-6 w-full select-none">
          <LiveTelemetryPanel />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <a
              href="https://github.com/ashuyadav180"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex font-mono-custom font-bold text-xs py-3 px-6 rounded-2xl select-none cursor-pointer tracking-widest"
            >
              <GitBranch size={13} />
              REST_DIRECTORY_INDEX // github.com/ashuyadav180
              <ArrowUpRight size={13} />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
