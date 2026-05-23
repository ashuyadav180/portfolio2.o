"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechIcon from "@/components/TechIcon";

// Orbital node type definition
interface OrbitNode {
  name: string;
  color: string;
  angle: number;
  radius: number;
  mastery: number;
  module: string;
  status: string;
  diagnostic: string;
}

// 1. Static high-fidelity coordinate-mapped data of nodes
const orbitalNodes: OrbitNode[] = [
  // Inner orbit (R = 200px)
  { name: "React", color: "#61DAFB", angle: (0 * 2 * Math.PI) / 6, radius: 200, mastery: 90, module: "Frontend Rendering Engine", status: "60 FPS", diagnostic: "Component virtual DOM rendering stable. Virtual tree synchronizer: ONLINE." },
  { name: "Node.js", color: "#339933", angle: (1 * 2 * Math.PI) / 6, radius: 200, mastery: 88, module: "High-Throughput V8 Engine", status: "ACTIVE", diagnostic: "Event loop concurrency: OPTIMAL. Asynchronous thread pool mapping successful." },
  { name: "Python", color: "#3776ab", angle: (2 * 2 * Math.PI) / 6, radius: 200, mastery: 80, module: "Data Pipelines & ML", status: "ONLINE", diagnostic: "Script interpreter active. Matrix mathematical operations compiling correctly." },
  { name: "FastAPI", color: "#009688", angle: (3 * 2 * Math.PI) / 6, radius: 200, mastery: 84, module: "High-Performance Async Web", status: "1.2ms PING", diagnostic: "Uvicorn worker threads active. OpenAPI swagger definitions loaded." },
  { name: "MongoDB", color: "#47A248", angle: (4 * 2 * Math.PI) / 6, radius: 200, mastery: 84, module: "NoSQL Data Matrix", status: "100% SYNC", diagnostic: "Indexed query optimizer compiled. Dynamic data clusters active." },
  { name: "Gemini", color: "#38bdf8", angle: (5 * 2 * Math.PI) / 6, radius: 200, mastery: 95, module: "Multimodal Cognitive Core", status: "STABLE", diagnostic: "Agentic tool-calling pipelines mounted. Cognitive tokens: OPERATIONAL." },

  // Outer orbit (R = 360px)
  { name: "Firebase", color: "#FFCA28", angle: (0 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 80, module: "Realtime Serverless Cloud", status: "SECURE", diagnostic: "Secure socket listeners connected. FireStore client synchronizer active." },
  { name: "SQLite", color: "#003b57", angle: (1 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 75, module: "Embedded Relational DB", status: "READY", diagnostic: "Zero-configuration database engine loaded. Local disk transaction locks: OK." },
  { name: "Stability", color: "#ff0055", angle: (2 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 85, module: "Generative Diffusion Node", status: "STANDBY", diagnostic: "Text-to-image latent space mapping active. GPU denoiser pipeline initialized." },
  { name: "FFmpeg", color: "#00e676", angle: (3 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 80, module: "AV Demuxer & Transcoder", status: "READY", diagnostic: "Hardware acceleration decoders enabled. Dynamic filter graph running." },
  { name: "Postman", color: "#ff6c37", angle: (4 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 85, module: "API Testing & Validation", status: "PASS", diagnostic: "Mock servers and automated integration test collections validated." },
  { name: "C++", color: "#00599c", angle: (5 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 82, module: "High-Speed Systems Engine", status: "OPTIMAL", diagnostic: "Memory allocation pointers optimized. Low-level compiled assets ready." },
  { name: "Java", color: "#f89820", angle: (6 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 78, module: "JVM Enterprise Runtime", status: "ONLINE", diagnostic: "Garbage collection sweeps stabilized. Thread-safe concurrency map active." },
  { name: "GitHub", color: "#ffffff", angle: (7 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 90, module: "Version Control Systems", status: "SYNCED", diagnostic: "Remote git pipelines connected. CI/CD actions build status: SUCCESS." },
  { name: "Vite", color: "#ffc107", angle: (8 * 2 * Math.PI) / 9 + 0.25, radius: 360, mastery: 86, module: "Next-Gen Frontend Tooling", status: "0.3s HOT", diagnostic: "HMR micro-bundle dev server active. Dynamic modules pre-bundled." },
];

/* ─── Typing Boot-up Subtitle Component ──────────────────────── */
function BootSubtitle() {
  const fullText = "003 // ECOSYSTEM INTEGRITY";
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-label justify-center mb-4 text-glow-purple font-mono-custom tracking-[0.35em] text-xs uppercase select-none">
      {text}
      <span className="w-1.5 h-3 bg-purple-400 inline-block animate-pulse ml-1" />
    </div>
  );
}

/* ─── High Performance Central Canvas Engine ──────────────────── */
function CenterpieceCanvas({ hoveredNodeName }: { hoveredNodeName: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Concentric expanding scan pulses
    const pulses = [
      { radius: 60, alpha: 0.6, speed: 1.2 },
      { radius: 140, alpha: 0.4, speed: 1.0 },
      { radius: 220, alpha: 0.2, speed: 0.8 },
    ];

    const resizeCanvas = () => {
      canvas.width = 900;
      canvas.height = 900;
    };
    resizeCanvas();

    const draw = () => {
      time = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const Cx = canvas.width / 2;
      const Cy = canvas.height / 2;

      // Draw Ambient internal neon lighting glow
      const ambientGlow = ctx.createRadialGradient(Cx, Cy, 10, Cx, Cy, 250);
      ambientGlow.addColorStop(0, "rgba(56, 189, 248, 0.045)");
      ambientGlow.addColorStop(0.6, "rgba(139, 92, 246, 0.02)");
      ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(Cx, Cy, 350, 0, Math.PI * 2);
      ctx.fill();

      // Radar Concentric grid guidelines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.065)";
      ctx.lineWidth = 1;
      
      const guides = [100, 200, 360];
      guides.forEach(radius => {
        ctx.beginPath();
        ctx.arc(Cx, Cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Technical degree coordinates grid marks
      ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
        ctx.beginPath();
        ctx.moveTo(Cx + Math.cos(angle) * 90, Cy + Math.sin(angle) * 90);
        ctx.lineTo(Cx + Math.cos(angle) * 105, Cy + Math.sin(angle) * 105);
        ctx.stroke();
      }

      // Rotating dashed compass outer telemetry ring
      ctx.save();
      ctx.translate(Cx, Cy);
      ctx.rotate(time * 0.0001);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.16)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, 205, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Expand system data sweeps
      pulses.forEach(pulse => {
        pulse.radius += pulse.speed;
        pulse.alpha -= 0.003;
        if (pulse.alpha <= 0 || pulse.radius >= 360) {
          pulse.radius = 60;
          pulse.alpha = 0.6;
        }
        ctx.strokeStyle = `rgba(56, 189, 248, ${pulse.alpha * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(Cx, Cy, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Centerpiece rotating dual hexagons
      const drawHexagon = (radius: number, rotation: number, color: string) => {
        ctx.save();
        ctx.translate(Cx, Cy);
        ctx.rotate(rotation);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          const x = Math.cos(a) * radius;
          const y = Math.sin(a) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      };
      drawHexagon(52, time * 0.0006, "rgba(56, 189, 248, 0.28)");
      drawHexagon(39, -time * 0.0009, "rgba(139, 92, 246, 0.28)");

      // Draw active telemetry particle tracers revolving along orbits
      ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
      const tracerAngle = time * 0.0007;
      ctx.beginPath();
      ctx.arc(Cx + Math.cos(tracerAngle) * 200, Cy + Math.sin(tracerAngle) * 200, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(139, 92, 246, 0.85)";
      const tracerAngle2 = -time * 0.0004;
      ctx.beginPath();
      ctx.arc(Cx + Math.cos(tracerAngle2) * 360, Cy + Math.sin(tracerAngle2) * 360, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Render neural network pathways linking Centerpiece Core to Satellite Chips
      orbitalNodes.forEach(node => {
        const isHovered = hoveredNodeName === node.name;
        
        // Exact angle mathematical projection
        const nodeX = Cx + Math.cos(node.angle) * node.radius;
        const nodeY = Cy + Math.sin(node.angle) * node.radius;

        // Visual neural link channel
        ctx.strokeStyle = isHovered ? `${node.color}bf` : "rgba(56, 189, 248, 0.09)";
        ctx.lineWidth = isHovered ? 2.5 : 1;
        ctx.beginPath();
        ctx.moveTo(Cx, Cy);
        ctx.lineTo(nodeX, nodeY);
        ctx.stroke();

        // Glowing energetic data packets cycling on active channels
        if (isHovered) {
          const progress = (time % 800) / 800; // 0 to 1 loop sweep
          const pulseX = Cx + (nodeX - Cx) * progress;
          const pulseY = Cy + (nodeY - Cy) * progress;

          // Inner packet core
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
          ctx.fill();

          // Outer glowing expansion sweeps
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNodeName]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none z-10 opacity-75"
    />
  );
}

/* ─── Retro System Telemetry Cockpit Panel ────────────────────── */
function TelemetryPanel() {
  const [logs, setLogs] = useState<string[]>([
    "[SYS_INIT] Loading multimodal cognitive neural pathways...",
    "[CORE] Core node listening on telemetry interface...",
    "[NETWORK] Active node clusters mapped: 15/15 ONLINE.",
  ]);

  const [cpu, setCpu] = useState(18.4);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    // Fluctuating real-time CPU & Ping values
    const interval = setInterval(() => {
      setCpu(prev => {
        const next = prev + (Math.random() - 0.5) * 1.8;
        return parseFloat(Math.min(Math.max(next, 13), 23).toFixed(1));
      });
      setLatency(prev => {
        const next = prev + Math.floor((Math.random() - 0.5) * 3);
        return Math.min(Math.max(next, 8), 16);
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulation telemetry log entries buffer
    const logDatabase = [
      "[SYS] Memory sweep complete. Garbage collection: OPTIMAL.",
      "[NET] Synchronized remote git hooks with branch main.",
      "[API] Uvicorn workers cycling async threads dynamically.",
      "[AI] Latent space diffusion layers mapped in VRAM caches.",
      "[DB] SQLite embedded write-transaction safety: PASSED.",
      "[SYS] Hot Module Replacement server watching directories...",
      "[CORE] Connected cursor dynamic gravitational tilt vectors.",
      "[AI] Gemini LLM agentic function pipelines validated.",
      "[SYS] Webpack micro-bundler hot asset build: STABLE.",
    ];

    const interval = setInterval(() => {
      const randomLog = logDatabase[Math.floor(Math.random() * logDatabase.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-3), `[${timestamp}] ${randomLog}`]);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full glass-strong rounded-2xl border border-white/6 p-6 mt-16 shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[#050816]/40 pointer-events-none" />
      <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />

      {/* Cockpit Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Telemetry HUD Counters */}
        <div className="col-span-1 md:col-span-5 flex flex-wrap gap-x-8 gap-y-4 border-r border-white/5 pr-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono-custom text-[#8ea0b5]/40 uppercase tracking-widest">
              ACTIVE COGNITIVE SCHEMAS
            </span>
            <span className="text-sm font-display font-extrabold text-white tracking-wider flex items-center mt-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2" />
              15 / 15 NODE_SYS
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] font-mono-custom text-[#8ea0b5]/40 uppercase tracking-widest">
              CPU CONCURRENCY LOAD
            </span>
            <span className="text-sm font-display font-extrabold text-cyan-400 tracking-wider mt-1">
              {cpu}%
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] font-mono-custom text-[#8ea0b5]/40 uppercase tracking-widest">
              INTEGRITY CHECK
            </span>
            <span className="text-sm font-display font-extrabold text-[#8b5cf6] tracking-wider mt-1">
              PASS [99.8%]
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] font-mono-custom text-[#8ea0b5]/40 uppercase tracking-widest">
              LATENCY INDEX
            </span>
            <span className="text-sm font-display font-extrabold text-green-400 tracking-wider mt-1">
              {latency}ms
            </span>
          </div>
        </div>

        {/* Streaming Operation Logs Console */}
        <div className="col-span-1 md:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono-custom text-[#8ea0b5]/50 uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-ping mr-2" />
              Live Operational Telemetry Streams
            </span>
            <span className="text-[8px] font-mono-custom text-[#8ea0b5]/30">
              SYS_CHANNEL_01
            </span>
          </div>
          <div className="bg-[#02040d] border border-white/5 rounded-lg p-3 h-24 overflow-y-hidden font-mono-custom text-[10px] leading-relaxed text-[#8ea0b5]/70 flex flex-col justify-end shadow-inner">
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="truncate whitespace-nowrap text-glow-light"
                >
                  <span className="text-cyan-400/80 mr-1.5">&gt;</span>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main TechStack Redesigned Section Component ────────────── */
export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number; duration: number }>>([]);
  const [hoveredNodeName, setHoveredNodeName] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isBooted, setIsBooted] = useState(false);

  // Background drifting grains initialization
  useEffect(() => {
    const temp = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 12,
    }));
    requestAnimationFrame(() => {
      setParticles(temp);
    });
  }, []);

  // Section boot-up scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBooted(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Mouse tilt tracking physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const nx = x / (rect.width / 2);
      const ny = y / (rect.height / 2);
      
      setTilt({
        x: nx * 9, // Slight rotation X
        y: -ny * 9, // Slight rotation Y
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const hoveredNode = orbitalNodes.find(n => n.name === hoveredNodeName);

  return (
    <section ref={sectionRef} className="relative section-pad overflow-hidden border-t border-white/4 bg-[#050816] select-none">
      {/* Layer 1: Scrolling Cyber Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25] bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)]"
        style={{ backgroundSize: "45px 45px" }}
      />

      {/* Layer 4: Ambient Fog Gradients */}
      <motion.div 
        animate={isBooted ? { opacity: 0.65 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.045)_0%,transparent_75%)] blur-3xl pointer-events-none z-0" 
      />
      <motion.div 
        animate={isBooted ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" 
      />

      {/* Layer 5: CRT Scanline Texture Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_4px] opacity-20" />

      {/* Layer 3: Cosmic Floating Dust Grains */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.1, y: "110%" }}
            animate={isBooted ? {
              opacity: [0.1, 0.45, 0.1],
              y: "-10%",
              x: ["0%", "5%", "-5%", "0%"],
            } : {}}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 container-xl">
        {/* Massive Futuristic Header Title */}
        <div className="text-center mb-8 px-5">
          {isBooted && <BootSubtitle />}
          
          <h2 className="text-4xl sm:text-5xl md:text-6.5xl font-extrabold font-display uppercase tracking-widest text-center relative flex justify-center items-center flex-wrap select-none">
            {"FULL TECH STACK".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.04,
                  type: "spring",
                  stiffness: 90,
                }}
                className="inline-block relative text-glow-light"
                style={{
                  background: "linear-gradient(135deg, #ffffff 40%, #c7d2fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginRight: char === " " ? "0.35em" : "0.02em",
                }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          
          <p className="text-[10px] font-mono-custom text-[#8ea0b5]/50 tracking-[0.25em] uppercase mt-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
            Interactive AI Infrastructure Network Maps
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
          </p>
        </div>

        {/* ─── DESKTOP ORBITAL NETWORK VISUALIZATION ─── */}
        {isBooted && (
          <div className="hidden lg:block relative w-full h-[850px] mx-auto overflow-visible mt-2">
            {/* Interactive Spotlight Tilt Matrix wrapper */}
            <motion.div
              style={{
                rotateY: tilt.x,
                rotateX: tilt.y,
                transformStyle: "preserve-3d",
              }}
              transition={{ type: "spring", stiffness: 85, damping: 24 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Concentric Canvas Core Drawing Engine */}
              <CenterpieceCanvas hoveredNodeName={hoveredNodeName} />

              {/* Central holographic display readout terminal */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-cyan-500/20 bg-[#020512]/92 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30 shadow-[inset_0_0_30px_rgba(34,211,238,0.05),0_0_40px_rgba(34,211,238,0.16)] select-none pointer-events-none">
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/10 animate-[spin_45s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-purple-500/5 animate-[spin_24s_linear_infinite_reverse]" />
                
                <AnimatePresence mode="wait">
                  {!hoveredNode ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <span className="text-[9px] font-mono-custom text-cyan-400 tracking-[0.2em] uppercase mb-1">
                        SYS_ACTIVE
                      </span>
                      <h3 className="text-xs font-display tracking-widest font-black text-white uppercase mb-2">
                        AI INFRA CORE
                      </h3>
                      <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/35 flex items-center justify-center animate-pulse mb-2">
                        <TechIcon name="gemini" size={20} color="#22d3ee" />
                      </div>
                      <div className="text-[7.5px] font-mono-custom text-[#8ea0b5]/50 tracking-wider">
                        GRID INTERFACE ACTIVE
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={hoveredNode.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center border mb-2 bg-white/[0.02]"
                        style={{ borderColor: `${hoveredNode.color}33`, boxShadow: `0 0 15px ${hoveredNode.color}15` }}
                      >
                        <TechIcon name={hoveredNode.name} size={22} color={hoveredNode.color} />
                      </div>
                      <h3 
                        className="text-xs font-display tracking-widest font-extrabold uppercase mb-1 truncate max-w-[200px]"
                        style={{ color: hoveredNode.color }}
                      >
                        {hoveredNode.name}
                      </h3>
                      <span className="text-[8px] font-mono-custom text-white/70 tracking-widest uppercase mb-1 text-center font-bold">
                        {hoveredNode.module}
                      </span>
                      <p className="text-[8.5px] font-mono-custom text-[#8ea0b5]/70 line-clamp-3 text-center leading-normal max-w-[190px]">
                        {hoveredNode.diagnostic}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Absolutely positioned satellite nodes */}
              {orbitalNodes.map((node, index) => {
                const isHovered = hoveredNodeName === node.name;
                const x = Math.cos(node.angle) * node.radius;
                const y = Math.sin(node.angle) * node.radius;

                return (
                  <div
                    key={node.name}
                    className="absolute z-20 pointer-events-auto"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        x: [0, 3, 0]
                      }}
                      transition={{
                        y: { duration: 3.5 + (index % 4) * 0.4, repeat: Infinity, ease: "easeInOut" },
                        x: { duration: 4.5 + (index % 3) * 0.5, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className={`glass-strong rounded-xl border p-3.5 w-[200px] transition-all duration-300 relative`}
                      style={{
                        backgroundColor: isHovered ? "rgba(5, 8, 22, 0.95)" : "rgba(5, 8, 22, 0.25)",
                        borderColor: isHovered ? `${node.color}cc` : "rgba(255, 255, 255, 0.05)",
                        boxShadow: isHovered 
                          ? `0 0 22px ${node.color}28, inset 0 0 10px ${node.color}15`
                          : "0 4px 12px rgba(0, 0, 0, 0.3)",
                      }}
                      onMouseEnter={() => setHoveredNodeName(node.name)}
                      onMouseLeave={() => setHoveredNodeName(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.01] border border-white/5 transition-transform duration-300"
                          style={{
                            boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                            transform: isHovered ? "scale(1.15) rotate(5deg)" : "none",
                          }}
                        >
                          <TechIcon name={node.name} size={18} color={node.color} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-display tracking-widest font-extrabold uppercase truncate" style={{ color: node.color }}>
                            {node.name}
                          </h4>
                          <div className="flex items-center mt-0.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full mr-1 animate-pulse"
                              style={{ backgroundColor: isHovered ? node.color : "#22c55e" }}
                            />
                            <span className="text-[8px] font-mono-custom text-[#8ea0b5]/50 uppercase tracking-wider font-bold">
                              {node.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Mastery micro-progress metrics */}
                      <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden mt-2.5 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${node.mastery}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: node.color }}
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* ─── MOBILE RESPONSIVE GRID LAYOUT & HUD READOUT ─── */}
        {isBooted && (
          <div className="block lg:hidden mt-4">
            {/* Centered mobile core hud display */}
            <div className="relative w-full h-[280px] flex items-center justify-center pointer-events-none mb-6 select-none">
              <div className="absolute w-[280px] h-[280px] scale-[0.6] opacity-60">
                <CenterpieceCanvas hoveredNodeName={hoveredNodeName} />
              </div>

              <div className="relative w-44 h-44 rounded-full border border-cyan-500/20 bg-[#020512]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 z-30 shadow-[inset_0_0_20px_rgba(34,211,238,0.05),0_0_30px_rgba(34,211,238,0.1)]">
                <AnimatePresence mode="wait">
                  {!hoveredNode ? (
                    <motion.div
                      key="mobile-idle"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <span className="text-[8px] font-mono-custom text-cyan-400 tracking-[0.2em] uppercase mb-1">
                        CORE_OPERATIVE
                      </span>
                      <h3 className="text-[10px] font-display tracking-widest font-black text-white uppercase mb-1">
                        AI INFRA MATRIX
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/35 flex items-center justify-center animate-pulse mb-1">
                        <TechIcon name="gemini" size={16} color="#22d3ee" />
                      </div>
                      <div className="text-[6.5px] font-mono-custom text-[#8ea0b5]/50 tracking-wider">
                        TAP ANY NODE BELOW
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`mobile-${hoveredNode.name}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border mb-1 bg-white/[0.01]" style={{ borderColor: `${hoveredNode.color}33` }}>
                        <TechIcon name={hoveredNode.name} size={18} color={hoveredNode.color} />
                      </div>
                      <h3 className="text-[10px] font-display tracking-widest font-extrabold uppercase mb-0.5" style={{ color: hoveredNode.color }}>
                        {hoveredNode.name}
                      </h3>
                      <span className="text-[7px] font-mono-custom text-white/70 tracking-widest uppercase mb-0.5 font-bold">
                        {hoveredNode.module}
                      </span>
                      <p className="text-[7.5px] font-mono-custom text-[#8ea0b5]/70 line-clamp-2 px-2 leading-tight">
                        {hoveredNode.diagnostic}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Tap interactive responsive satellite grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2">
              {orbitalNodes.map((node) => {
                const isHovered = hoveredNodeName === node.name;
                return (
                  <motion.div
                    key={node.name}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setHoveredNodeName(hoveredNodeName === node.name ? null : node.name);
                    }}
                    className="glass-strong rounded-xl border p-3 flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: isHovered ? "rgba(5, 8, 22, 0.95)" : "rgba(255, 255, 255, 0.01)",
                      borderColor: isHovered ? `${node.color}cc` : "rgba(255, 255, 255, 0.06)",
                      boxShadow: isHovered 
                        ? `0 0 15px ${node.color}15, inset 0 0 8px ${node.color}10`
                        : "0 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.01] border border-white/5"
                        style={{ color: node.color }}
                      >
                        <TechIcon name={node.name} size={16} color={node.color} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[10px] font-display tracking-widest font-extrabold uppercase truncate" style={{ color: node.color }}>
                          {node.name}
                        </h4>
                        <span className="text-[7.5px] font-mono-custom text-[#8ea0b5]/40 uppercase tracking-wider font-bold">
                          {node.status}
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden mt-1.5 relative">
                      <div className="h-full rounded-full" style={{ width: `${node.mastery}%`, backgroundColor: node.color }} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── SYSTEM LIVE HUD TELEMETRY PANEL ─── */}
        {isBooted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TelemetryPanel />
          </motion.div>
        )}
      </div>
    </section>
  );
}
