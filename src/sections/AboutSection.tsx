"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";
import { 
  Code2, 
  Layers, 
  Cpu, 
  Terminal, 
  Activity, 
  RefreshCw
} from "lucide-react";

/* ─── Animated Counter ──────────────────────────────────── */
function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - elapsed, 4); // Quart ease out
      setCount(ease * value);
      if (elapsed < 1) raf = requestAnimationFrame(tick);
      else setCount(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ─── Layered Cybernetic Backdrop (CyberBackground) ──────── */
function CyberBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-80" />
      
      {/* Concentric Tech Target Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-[#38bdf8]/5 animate-[spin_100s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-[#8b5cf6]/5 animate-[spin_60s_linear_infinite_reverse]" />

      {/* Cybernetic Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.012)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

      {/* Glowing Energy Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.04)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] blur-2xl" />
    </div>
  );
}

/* ─── Upgraded Holographic AI Avatar Badge (HologramAvatar) ─── */
function HologramAvatar() {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center select-none group">
      {/* Multi-layered Rotating AI Seal HUD */}
      
      {/* Outer ticks & telemetry labels */}
      <motion.div
        className="absolute w-36 h-36 rounded-full border border-dashed border-[#38bdf8]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Mid rotating command sector rings */}
      <motion.div
        className="absolute w-[128px] h-[128px] rounded-full border border-r-transparent border-l-transparent border-[#8b5cf6]/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Micro Degree Ticks Outer Overlay */}
      <svg className="absolute w-[152px] h-[152px] opacity-40 animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="1 3.8" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#38bdf8" strokeWidth="0.3" strokeDasharray="5 15" />
      </svg>
      
      {/* Scanning laser sweep bar */}
      <div className="absolute w-[110px] h-[2px] bg-cyan-400/80 shadow-[0_0_12px_#22d3ee] rounded-full z-10 animate-[bounce_4s_ease-in-out_infinite]" />

      {/* Cyber Core Sphere */}
      <div className="absolute w-[100px] h-[100px] rounded-full bg-[#070b1e]/90 border-2 border-[#22d3ee]/60 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.25),inset_0_0_20px_rgba(56,189,248,0.15)] overflow-hidden">
        {/* Animated grid matrix inside the avatar circle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-60 pointer-events-none" />
        
        {/* Core initials */}
        <span className="font-display font-black text-3xl text-white tracking-widest bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">
          AY
        </span>
        <span className="font-mono text-[0.5rem] text-[#22d3ee] tracking-[0.2em] font-bold mt-1 uppercase">
          INIT_v4.0
        </span>
      </div>

      {/* Dynamic blink coordinates pointer */}
      <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5">
        <span className="absolute w-full h-full rounded-full bg-[#10b981]/30 animate-ping" />
        <span className="relative w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-[#050816] shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
      </div>
      
      {/* Micro-telemetry labels */}
      <div className="absolute -bottom-2 -left-2 font-mono text-[0.45rem] text-white/50 bg-[#070b1e]/90 px-1 border border-white/10 rounded">
        LAT:18.52N
      </div>
      <div className="absolute -top-2 -right-3 font-mono text-[0.45rem] text-white/50 bg-[#070b1e]/90 px-1 border border-white/10 rounded">
        LON:73.85E
      </div>
    </div>
  );
}

/* ─── Floating Technical Hardware Widget ───────────────────── */
function FloatHardwareWidget({
  icon: I,
  label,
  color,
  style,
  delay = 0,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  label: string;
  color: string;
  style: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute hidden xl:flex items-center gap-2 bg-[#090f2b]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/8 shadow-[0_8px_20px_rgba(0,0,0,0.5)] select-none font-mono text-[0.58rem] text-white/80"
      style={style}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05, borderColor: `${color}40` }}
    >
      <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
      <I size={11} color={color} className="animate-pulse" />
      <span className="tracking-widest font-bold uppercase">{label}</span>
    </motion.div>
  );
}

/* ─── Neural Core Canvas centerpiece (NeuralCoreCanvas) ──────── */
function NeuralCoreCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 420;
      
      // Handle high-dpi screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // 3D wireframe geometry setup (Concentric shells + icosahedron-like core)
    interface Point3D {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
    }

    const points: Point3D[] = [];
    const numPoints = 28;
    const radius3D = 100;

    // Create 3D spherical vertices
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: radius3D * Math.sin(phi) * Math.cos(theta),
        y: radius3D * Math.sin(phi) * Math.sin(theta),
        z: radius3D * Math.cos(phi),
        px: 0,
        py: 0
      });
    }

    // Drifting synapse particles
    interface Synapse {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      speed: number;
    }
    const synapses: Synapse[] = [];
    for (let i = 0; i < 35; i++) {
      synapses.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI,
        speed: 0.02 + Math.random() * 0.03
      });
    }

    const angleX = 0.003;
    const angleY = 0.004;
    let rotationAngle = 0;

    // Main animation loops
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for mouse movements
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const centerX = width / 2;
      const centerY = height / 2;

      // ── Layer 1: Outer Holographic Telemetry Rings ──
      rotationAngle += 0.0035;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer dashed scale rings
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 175, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.setLineDash([15, 45]);
      ctx.beginPath();
      ctx.arc(0, 0, 160, -rotationAngle, Math.PI * 2 - rotationAngle);
      ctx.stroke();

      // Degree marker loops & Ticks
      ctx.strokeStyle = "rgba(34, 211, 238, 0.25)";
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const ang = (i * Math.PI) / 2 + rotationAngle * 0.5;
        const tx1 = Math.cos(ang) * 160;
        const ty1 = Math.sin(ang) * 160;
        const tx2 = Math.cos(ang) * 170;
        const ty2 = Math.sin(ang) * 170;
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(tx2, ty2);
        ctx.stroke();
      }

      // Compass text overlays inside canvas
      ctx.font = "bold 6px monospace";
      ctx.fillStyle = "rgba(34, 211, 238, 0.5)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SYS_CORE.EXE // INITIALIZED", 0, -188);
      ctx.fillText("DATA_SYNAPSE_v2.0", 0, 188);
      ctx.fillText("DEC: 90°", -188, 0);
      ctx.fillText("ALT: 360", 188, 0);

      ctx.restore();

      // ── Layer 2: 3D Procedural Wireframe Shell ──
      // Dynamic mouse rotation offsets
      let rotX = angleX;
      let rotY = angleY;
      if (mouseRef.current.active) {
        rotX += (mouseRef.current.y - centerY) * 0.00001;
        rotY += (mouseRef.current.x - centerX) * 0.00001;
      }

      // Calculate 3D points transformation
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      points.forEach((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective projections
        const fov = 350;
        const scale = fov / (fov + z2);
        p.px = centerX + x1 * scale;
        p.py = centerY + y2 * scale;
      });

      // Draw wireframe connections
      ctx.strokeStyle = "rgba(56, 189, 248, 0.18)";
      ctx.lineWidth = 0.8;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dz = points[i].z - points[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Draw connection lines if distance is within range
          if (dist < 75) {
            const alpha = (1 - dist / 75) * 0.25;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(points[i].px, points[i].py);
            ctx.lineTo(points[j].px, points[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw node points
      points.forEach((p) => {
        const radiusVal = Math.max(0.5, 2.5 * (350 / (350 + p.z)));
        const alpha = Math.max(0.1, 1 - (p.z + 100) / 200) * 0.8;
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radiusVal, 0, Math.PI * 2);
        ctx.fill();
        
        // Add minimal highlight ring to closest nodes
        if (p.z < -40) {
          ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
          ctx.beginPath();
          ctx.arc(p.px, p.py, radiusVal * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // ── Layer 3: Mouse-reactive Synapse Particle Web ──
      synapses.forEach((s) => {
        // Drifting animation tick
        s.x += s.vx;
        s.y += s.vy;
        s.pulse += s.speed;

        // Bounce boundaries
        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;

        // Gravitational drag toward mouse pointer
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - s.x;
          const dy = mouseRef.current.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            s.x += (dx / dist) * force * 1.6;
            s.y += (dy / dist) * force * 1.6;
          }
        }

        // Render synapses particles
        const sizePulse = s.size + Math.sin(s.pulse) * 0.8;
        ctx.fillStyle = "rgba(139, 92, 246, 0.45)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, sizePulse, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections between synapses
        synapses.forEach((ns) => {
          if (s === ns) return;
          const dx = s.x - ns.x;
          const dy = s.y - ns.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 65) {
            const alpha = (1 - dist / 65) * 0.12;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(ns.x, ns.y);
            ctx.stroke();
          }
        });
      });

      // ── Layer 4: Energy beam overlays to mouse ──
      if (mouseRef.current.active) {
        ctx.strokeStyle = "rgba(34, 211, 238, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
        ctx.stroke();

        ctx.fillStyle = "rgba(34, 211, 238, 0.6)";
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[380px] lg:h-[460px] flex items-center justify-center select-none group border border-white/5 rounded-3xl bg-[#030612]/30 overflow-hidden backdrop-blur-sm shadow-[inset_0_0_30px_rgba(56,189,248,0.01)]">
      {/* Micro-telemetry HUD grids */}
      <div className="absolute top-4 left-4 font-mono text-[0.55rem] text-cyan-400/70 tracking-widest flex items-center gap-1.5 bg-[#070b1e]/60 px-2 py-0.5 rounded border border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
        SYS.CORE: RUNNING
      </div>
      <div className="absolute top-4 right-4 font-mono text-[0.55rem] text-[#8b5cf6] tracking-widest bg-[#070b1e]/60 px-2 py-0.5 rounded border border-white/5 flex items-center gap-1">
        <Activity size={10} className="animate-pulse" />
        60 FPS // SYNAPSE_NET
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[0.5rem] text-white/45 max-w-[120px] leading-tight hidden sm:block">
        [ROTATION: GPU_COMPUTED]<br />
        [PROJECTION: PERSPECTIVE]<br />
        [GRAVITY_MATRIX: ACTIVE]
      </div>

      {/* Target Reticles Decors */}
      <div className="absolute w-6 h-6 border-t border-l border-white/20 top-6 left-6" />
      <div className="absolute w-6 h-6 border-t border-r border-white/20 top-6 right-6" />
      <div className="absolute w-6 h-6 border-b border-l border-white/20 bottom-6 left-6" />
      <div className="absolute w-6 h-6 border-b border-r border-white/20 bottom-6 right-6" />

      {/* Actual HTML5 Canvas */}
      <canvas ref={canvasRef} className="z-10 cursor-crosshair w-full h-full block" />
    </div>
  );
}

/* ─── Realtime Custom Waveform Canvas Sparkline Component ───────── */
function CanvasWaveform({ color, active }: { color: string; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    let phase2 = 0;
    let animationFrameId: number;
    const width = 120;
    const height = 40;
    
    canvas.width = width;
    canvas.height = height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.lineWidth = active ? 1.8 : 1.2;
      ctx.strokeStyle = color;
      
      const speed = active ? 0.08 : 0.035;
      const amplitude = active ? 12 : 5.5;
      const freq = active ? 0.08 : 0.045;
      
      phase += speed;
      phase2 -= speed * 0.7;

      for (let x = 0; x < width; x++) {
        // Complex digital telemetry waveform (Primary sine + Secondary harmonic)
        const y = 
          height / 2 + 
          Math.sin(x * freq + phase) * amplitude + 
          Math.cos(x * (freq * 1.5) + phase2) * (amplitude * 0.45);
          
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [color, active]);

  return <canvas ref={canvasRef} className="w-[120px] h-10 block object-contain" />;
}

/* ─── Bottom HUD Metric Gauge Component (HUDMetricGauge) ───────── */
function HUDMetricGauge({
  label,
  value,
  suffix,
  idx,
  targetValue,
  decimals = 0
}: {
  label: string;
  value: number;
  suffix: string;
  idx: number;
  targetValue: number;
  decimals?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [valOffset, setValOffset] = useState(0);

  // Micro fluctuation calculations to feel raw, dynamic, and live
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        // Periodic telemetry fluctuation +/- 0.01/0.02
        setValOffset((Math.random() - 0.5) * 0.03);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const percentage = Math.min(100, (value / targetValue) * 100);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="glass-strong rounded-2xl p-4.5 border border-white/6 group relative overflow-hidden flex items-center justify-between select-none shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
      whileHover={{ borderColor: "rgba(56,189,248,0.22)", y: -3, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/1 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none" />

      {/* HUD corner lines */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/10 group-hover:border-[#38bdf8]/40 transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/10 group-hover:border-[#8b5cf6]/40 transition-colors" />

      <div className="flex-1 pr-3">
        <span className="text-[0.55rem] font-mono text-cyan-400/70 block mb-1 font-bold tracking-widest">
          CORE_TELEMETRY // 0{idx + 1}
        </span>
        <div className="font-display text-2xl md:text-3xl font-black text-white tracking-tight flex items-baseline gap-0.5">
          <Counter value={value + (decimals > 0 ? valOffset : 0)} suffix={suffix} decimals={decimals} />
        </div>
        <div className="font-mono text-[0.6rem] text-white/50 tracking-wider uppercase mt-2.5">
          {label}
        </div>
      </div>

      {/* Upgraded SVG Radial Progress HUD */}
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg className="w-14 h-14 -rotate-90">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
          <motion.circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="url(#metricGlow)"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
          />
          {/* Gradient inside the SVG circles */}
          <defs>
            <linearGradient id="metricGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating status ticks inside the circle core */}
        <div className="absolute text-[0.5rem] font-mono font-bold text-white/80">
          {hovered ? "CRIT" : "OK"}
        </div>
        
        {/* Animated small indicator dot */}
        <div className="absolute w-[6px] h-[6px] rounded-full bg-[#10b981] animate-ping opacity-70" />
      </div>
    </motion.div>
  );
}

/* ─── Simulated Operational Typing Console (AIConsoleTerminal) ─── */
const MOCK_TERMINAL_LOGS = [
  "SYSTEM: Accessing neural kernel stack components...",
  "KERNEL: Mounting security buffer layer (0x8F9C01)...",
  "MODULE: React.js core component loop binding success [GOOD]",
  "PIPELINE: Initializing AI routing worker pipelines (8 tasks)...",
  "NETWORK: Connection ping to stability-ai: 138ms",
  "NETWORK: Connection ping to api.gemini-pro: 48ms",
  "DATABASE: MongoDB operational. Flushed 24 cached indexes.",
  "STATUS: Hardware core diagnostic complete. Temp: 42C.",
  "PROCESS: Muxing overlay sequences using FFmpeg workers...",
  "ROUTING: Mount Node.js express APIs securely [DONE]",
  "COGNITIVE: Gemini LLM pipeline active on cognitive thread #3",
  "AI_AGENT: Task vector initialized: Portfolio 2.0 boot OK",
  "SYS_STATE: Open for project proposals & microservice roles.",
  "MEMORY: Heap usage bounds secure (42MB / 512MB limit)"
];

const BOOT_LOGS = [
  "bash-5.2$ ./SYS_BOOT.SH --verbose",
  "[0.01s] STACK: Spawning active engineering processes...",
  "[0.18s] PARSING: Mapping credentials (B.Tech IT, MIT Pune)...",
  "[0.45s] SECURE_HASH: Checking token checksum parameters [PASS]",
  "[0.88s] ENGINE: Initializing GPU core hardware renders...",
  "[1.15s] SOCKET: Web connections listening on pipeline: PORT 3000",
  "[1.42s] COGNITIVE: Loading deep agentic model schemas...",
  "[1.70s] SYSTEM: CORE IDENTITY TERMINAL ONLINE // ACCESS GRANTED."
];

function AIConsoleTerminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const [_logIndex, setLogIndex] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Run initial boot sequence
  useEffect(() => {
    let bootTimer: number;
    let i = 0;
    
    const playBoot = () => {
      if (i < BOOT_LOGS.length) {
        const nextLog = BOOT_LOGS[i];
        if (nextLog) {
          setLogs((prev) => [...prev, nextLog]);
        }
        i++;
        bootTimer = window.setTimeout(playBoot, 200 + Math.random() * 250);
      } else {
        setIsBooting(false);
      }
    };

    playBoot();
    return () => clearTimeout(bootTimer);
  }, []);

  // Standard runtime continuous logs after boot
  useEffect(() => {
    if (isBooting) return;
    
    const interval = setInterval(() => {
      setLogIndex((prevIndex) => {
        const safeIndex = prevIndex % MOCK_TERMINAL_LOGS.length;
        const rawLog = MOCK_TERMINAL_LOGS[safeIndex];
        if (rawLog) {
          const newLog = `[${new Date().toLocaleTimeString()}] ${rawLog}`;
          setLogs((prev) => {
            const nextLogs = [...prev, newLog];
            // Keep last 15 logs to prevent excessive DOM nesting
            if (nextLogs.length > 15) {
              nextLogs.shift();
            }
            return nextLogs;
          });
        }
        return (safeIndex + 1) % MOCK_TERMINAL_LOGS.length;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isBooting]);

  // Handle auto scrolling
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Interactive reboot button action
  const handleReboot = () => {
    if (isBooting) return;
    setIsBooting(true);
    setLogs([]);
    setLogIndex(0);
    
    let i = 0;
    const playBoot = () => {
      if (i < BOOT_LOGS.length) {
        const nextLog = BOOT_LOGS[i];
        if (nextLog) {
          setLogs((prev) => [...prev, nextLog]);
        }
        i++;
        setTimeout(playBoot, 180 + Math.random() * 150);
      } else {
        setIsBooting(false);
      }
    };
    playBoot();
  };

  return (
    <div className="glass rounded-2xl border border-white/6 relative overflow-hidden font-mono text-[0.7rem] shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col h-[280px]">
      <span className="hidden" aria-hidden="true">{_logIndex}</span>
      {/* Terminal header */}
      <div className="bg-[#0b0f24] border-b border-white/6 px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60" />
        </div>
        <span className="text-[0.58rem] text-white/50 tracking-widest uppercase font-bold flex items-center gap-1">
          <Terminal size={10} className="text-cyan-400" />
          CORE_DIRECTIVE.SH // SHELL
        </span>
        <button 
          onClick={handleReboot}
          disabled={isBooting}
          className="text-[0.55rem] text-cyan-400 hover:text-white bg-[#0e1738] border border-cyan-400/20 px-2 py-0.5 rounded flex items-center gap-1 transition-all disabled:opacity-40 select-none cursor-pointer"
        >
          <RefreshCw size={8} className={`${isBooting ? "animate-spin" : ""}`} />
          REBOOT
        </button>
      </div>

      {/* Terminal output content */}
      <div 
        ref={terminalRef} 
        className="p-4 leading-relaxed flex-1 overflow-y-auto font-mono text-[#a7f3d0] bg-[#030612]/75 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10"
      >
        <div className="text-white/40 mb-1 select-none">
          bash-5.2$ <span className="text-white">cat /sys/directive.conf</span>
        </div>
        <div className="text-white/30 italic select-none"># Micro-declaration command terminal active</div>
        
        <AnimatePresence>
          {logs.map((log, index) => {
            if (!log || typeof log !== "string") return null;
            let color = "text-[#a7f3d0]";
            if (log.includes("[BOOT]")) color = "text-[#38bdf8]";
            if (log.includes("KERNEL")) color = "text-[#8b5cf6]";
            if (log.includes("SYSTEM") || log.includes("STATUS")) color = "text-yellow-200/90";
            if (log.includes("ACCESS GRANTED")) color = "text-[#10b981] font-bold";
            if (log.startsWith("bash-5.2$")) color = "text-white";

            return (
              <motion.div 
                key={index} 
                className={`${color} leading-normal`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                {log}
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Blinking green prompt cursor */}
        <div className="flex items-center text-white select-none">
          <span className="text-cyan-400 mr-1.5">&gt;</span>
          <span className="w-1.5 h-3.5 bg-[#10b981] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ─── About Section ─────────────────────────────────────── */
export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Stagger configurations
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    },
  };

  return (
    <section id="about" className="relative section-pad overflow-hidden bg-[#050816] min-h-screen flex flex-col justify-center">
      {/* Integrated Cinematic Background Overlay Layer */}
      <CyberBackground />

      <div className="relative z-10 container-xl">
        
        {/* ── Heading Dashboard Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16 select-none"
        >
          <div className="section-label justify-center mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[0.62rem] text-cyan-400 tracking-[0.25em] font-bold">
              SYS.INTELLIGENCE // CENTRAL_OPERATIONS
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase font-display tracking-wider relative inline-block">
            Identity & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#22d3ee] to-[#8b5cf6]">Core Capabilities</span>
            {/* Ambient HUD target lines on heading */}
            <span className="absolute -top-3 -left-6 w-3 h-3 border-t-2 border-l-2 border-cyan-400/40" />
            <span className="absolute -bottom-3 -right-6 w-3 h-3 border-b-2 border-r-2 border-purple-400/40" />
          </h2>
          
          <p className="font-mono text-[0.65rem] md:text-[0.7rem] text-white/50 tracking-widest mt-4 uppercase">
            NEURAL_STACK_CONNECTED // 24_THREADS_STANDBY // VER_0.2.6
          </p>
        </motion.div>

        {/* ── Main Asymmetrical Core Grid ── */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* ──────────────── COLUMN 1: Left AI Profile Identity Module (Span 4) ──────────────── */}
          <motion.div variants={item} className="lg:col-span-4 flex relative">
            <div className="w-full relative glass-strong rounded-3xl p-6 md:p-8 border border-white/8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between group">
              {/* Sci-Fi Corners Deco */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40" />

              {/* Looping scanner lines layer inside card */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none" />

              <div>
                {/* Holographic Avatar Core */}
                <div className="flex flex-col items-center mb-6">
                  <HologramAvatar />
                  
                  <div className="text-center mt-5">
                    <h3 className="text-2xl font-black text-white tracking-wider uppercase font-display bg-clip-text bg-gradient-to-b from-white to-slate-200">
                      {personalInfo.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38bdf8]/8 border border-[#38bdf8]/20 font-mono text-[0.62rem] text-[#22d3ee] font-bold tracking-widest mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-ping" />
                      CORE_SYS // SYSTEM_INITIATOR
                    </div>
                    <p className="font-mono text-[0.68rem] text-white/50 mt-3.5 max-w-xs leading-normal">
                      {personalInfo.university}
                    </p>
                  </div>
                </div>

                {/* Cyber Decoded Bio Statement */}
                <p className="text-[#cbd5e1] text-xs md:text-sm leading-relaxed mb-6 font-mono border-l-2 border-cyan-400/50 pl-4 bg-white/2 py-3.5 rounded-r-2xl select-text">
                  {personalInfo.bio}
                </p>

                {/* Interactive Dynamic Active Modules Badges */}
                <div className="mb-6 select-none">
                  <div className="text-[0.58rem] font-mono text-cyan-400/70 tracking-[0.2em] mb-2.5 font-bold uppercase">
                    [ ACTIVE_INTELLIGENCE_MODULES ]
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["MERN.v4", "AI.NEURAL", "OPEN_SRC", "UI.UX", "SYS.ARCH"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-[#0e1432]/60 border border-white/8 text-[0.62rem] font-mono text-[#38bdf8] hover:border-[#38bdf8]/60 hover:bg-[#38bdf8]/5 hover:text-white transition-all select-none duration-250 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monospace System Telemetry Rows */}
              <div className="space-y-2.5 border-t border-white/6 pt-5 select-none">
                {[
                  { key: "SYS_INIT_VEC", val: "Pune, India (IST)" },
                  { key: "SYS_ACAD_CRED", val: "B.Tech IT (2024 - 2028)" },
                  { key: "SYS_OPER_STAT", val: "ACTIVE // OPEN_TO_OFFERS", accent: true },
                ].map((row) => (
                  <div key={row.key} className="flex justify-between items-center text-[0.68rem] font-mono">
                    <span className="text-[#94a3b8] tracking-wider font-bold">{row.key}</span>
                    <span className={row.accent ? "text-[#10b981] font-black tracking-wider animate-pulse bg-[#10b981]/5 px-2 py-0.5 rounded border border-[#10b981]/15" : "text-white"}>
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware glowing floats */}
            <FloatHardwareWidget icon={Code2} label="compiler.bin" color="#38bdf8" style={{ top: "-0.5rem", right: "2rem" }} delay={0} />
            <FloatHardwareWidget icon={Layers} label="stack_flow.xml" color="#8b5cf6" style={{ bottom: "5rem", right: "-1.5rem" }} delay={2.5} />
            <FloatHardwareWidget icon={Cpu} label="neural_core.sys" color="#ef4444" style={{ bottom: "-0.5rem", left: "2rem" }} delay={5} />
          </motion.div>

          {/* ──────────────── COLUMN 2: Center Massive Canvas Neural AI Core Centerpiece (Span 4) ──────────────── */}
          <motion.div variants={item} className="lg:col-span-4 flex flex-col justify-between">
            <NeuralCoreCanvas />
          </motion.div>

          {/* ──────────────── COLUMN 3: Right Capability Systems Nodes (Span 4) ──────────────── */}
          <motion.div variants={item} className="lg:col-span-4 flex flex-col justify-between gap-5 lg:gap-6">
            {[
              {
                id: 0,
                nodeTag: "NODE_01",
                title: "Frontend Rendering Engine",
                desc: "Designing state-of-the-art interactive interfaces utilizing React, Next.js, Framer Motion, and Three.js with seed-stable, high-fps procedural renders.",
                color: "#38bdf8",
                tech: "Next.js · TS · R3F",
                status: "ONLINE",
                mem: "12MB",
                thread: "THREAD_01"
              },
              {
                id: 1,
                nodeTag: "NODE_02",
                title: "High-Throughput API Systems",
                desc: "Architecting secure, modular backend pipelines with Node.js, Express, and cloud databases. Engineered for performance, strict typing, and high reliability.",
                color: "#8b5cf6",
                tech: "Node · Express · MongoDB",
                status: "SECURED",
                mem: "28MB",
                thread: "THREAD_02"
              },
              {
                id: 2,
                nodeTag: "NODE_03",
                title: "Cognitive AI Integrations",
                desc: "Deploying automated cognitive layers, deep-agentic pipelines, and natural language interfaces to construct self-driving content streams and tool-use engines.",
                color: "#22d3ee",
                tech: "LangChain · API · Agents",
                status: "OPERATIONAL",
                mem: "42MB",
                thread: "THREAD_03"
              },
            ].map((node) => {
              const isActive = activeNode === node.id;
              
              return (
                <motion.div
                  key={node.title}
                  className="glass rounded-2xl p-4.5 border border-white/6 group cursor-default relative overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[135px]"
                  style={{
                    borderColor: isActive ? `${node.color}50` : "rgba(255,255,255,0.06)",
                    boxShadow: isActive ? `0 0 25px ${node.color}15` : "none"
                  }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  whileHover={{ scale: 1.015 }}
                >
                  {/* Subtle sweep active glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-white/1 to-transparent pointer-events-none" />

                  {/* Laser line tracer around bordered card */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 border border-t-0 border-r-0 rounded-2xl pointer-events-none animate-[pulse_2s_infinite]"
                      style={{ borderColor: node.color }}
                    />
                  )}

                  <div className="flex gap-4">
                    {/* Circle Node Code Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border transition-colors duration-300"
                      style={{ 
                        background: isActive ? `${node.color}15` : "rgba(255,255,255,0.02)", 
                        color: node.color,
                        borderColor: isActive ? `${node.color}35` : "rgba(255,255,255,0.08)"
                      }}
                    >
                      <span className="text-[0.58rem] font-mono font-black">{node.nodeTag}</span>
                    </div>

                    <div className="flex-1">
                      {/* Node Header Row */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 
                          className="font-bold text-sm transition-colors duration-300 font-display"
                          style={{ color: isActive ? node.color : "#ffffff" }}
                        >
                          {node.title}
                        </h4>
                        <span className="text-[0.55rem] font-mono px-2 py-0.5 rounded bg-white/4 border border-white/5 text-[#94a3b8]">
                          {node.tech}
                        </span>
                      </div>

                      {/* Bio Statement description */}
                      <p className="text-[#94a3b8] text-[0.72rem] leading-relaxed mb-2.5 font-mono select-text">
                        {node.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Inline SVG Waveforms & Diagnostic Stats */}
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/4 select-none">
                    {/* Live Canvas Spark Waveform */}
                    <div className="flex items-center gap-2">
                      <span className="text-[0.5rem] font-mono text-white/30 uppercase">SIG_WAVE</span>
                      <CanvasWaveform color={node.color} active={isActive} />
                    </div>

                    {/* Operational system status */}
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex flex-col text-right font-mono text-[0.5rem] text-white/40 leading-none">
                        <span>HEAP: {node.mem}</span>
                        <span className="mt-0.5">{node.thread}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#10b981" }} />
                        <span className="text-[0.55rem] font-mono tracking-widest text-white/70 uppercase font-black">
                          {node.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Bottom Section: HUD Telemetry + Command Terminal console ── */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          {/* BOTTOM LEFT: HUD Metrics Dashboard (Span 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              // Custom maximum target values to feed clean radial percentage segments
              const targetMax = idx === 0 ? 5 : idx === 1 ? 40 : idx === 2 ? 15 : 10;
              const isCGPA = idx === 3;
              
              return (
                <HUDMetricGauge
                  key={stat.label}
                  idx={idx}
                  label={stat.label}
                  value={isCGPA ? 7.73 : stat.value}
                  suffix={isCGPA ? " / 10" : stat.suffix}
                  targetValue={targetMax}
                  decimals={isCGPA ? 2 : 0}
                />
              );
            })}
          </div>

          {/* BOTTOM RIGHT: scrolling operational core directive terminal (Span 4) */}
          <div className="lg:col-span-4">
            <AIConsoleTerminal />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
