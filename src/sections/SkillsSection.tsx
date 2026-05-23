"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Zap, CheckCircle2, Activity } from "lucide-react";
import { skills } from "@/lib/data";
import TechIcon from "@/components/TechIcon";

const CATS = ["Frontend", "Backend", "Tools"] as const;
const CAT_COLOR: Record<string, string> = {
  Frontend: "#38bdf8", // Neon blue
  Backend:  "#8b5cf6", // Neon purple
  Tools:    "#22d3ee", // Neon cyan/green
};

// Technical logs database specific to each technology for live diagnostic typewriter
const DENSE_LOGS: Record<string, string[]> = {
  "React.js": [
    "RECONCILING virtual DOM states...",
    "HOOKS registry binding complete [OK]",
    "MOUNTING virtual nodes (6 cores)...",
    "PERFORMANCE matrix optimization active",
    "FIBER architecture initialized",
    "STATE PROV: context API synchronized"
  ],
  Vite: [
    "COMPILING tree-shaking indices...",
    "HOT MODULE REPLACEMENT server active",
    "DEPENDENCY pre-bundling with esbuild",
    "MODULE GRAPH resolution finished",
    "VITE BUNDLE asset size: 104.2kB",
    "OPTIMIZATION: static asset caching OK"
  ],
  HTML5: [
    "VALIDATING semantic layout structures...",
    "ACCESSIBILITY ARIA guidelines bound",
    "COMPILING DOM tree nodes...",
    "SEO microdata indexing successful",
    "RESOURCE preload optimization active",
    "MEDIA streams bound to pipeline"
  ],
  CSS3: [
    "COMPILING CSS-GRID matrices...",
    "ANIMATION GPU hardware acceleration on",
    "RESPONSIVE viewport layouts synchronized",
    "REFLECTING flexbox calculations...",
    "STYLING tokens applied from root.css",
    "TRANSITIONS frame rate locked [60fps]"
  ],
  JavaScript: [
    "INTERPRETING ECMAScript 2026 syntax...",
    "COMPILING asynchronous event loops...",
    "PROMISE thread pipelines secure [OK]",
    "MEM ALLOC: garbage collector active",
    "CLOSURE registers mapped to stack",
    "OBJECT prototyping links verified"
  ],
  "Socket.IO": [
    "ESTABLISHING secure websocket handshake",
    "PIPELINE: full-duplex channels active",
    "HEARTBEAT stream ping: 12ms [GOOD]",
    "BROADCAST rooms registry mounted",
    "MULTI-USER packet routing operational",
    "SYNC state: client heartbeat approved"
  ],
  "Node.js": [
    "INITIALIZING V8 compilation engine...",
    "EVENT LOOP polling system active",
    "THREAD POOL size expanded (worker x4)",
    "STREAM pipeline: reading buffer arrays",
    "BUFFERS flush cycle completed",
    "SERVER node listening on secure port"
  ],
  "Express.js": [
    "ROUTING tree index compiled [secure]",
    "AUTHENTICATION middlewares linked",
    "RATE LIMITER firewall listening...",
    "REQUEST parsing arrays allocated",
    "CORS policies matching local networks",
    "API ENDPOINTS structural scan OK"
  ],
  FastAPI: [
    "ASYNC WORKER loops initialized...",
    "COMPILING automatic OpenAPI schemas",
    "PYDANTIC class schemas compiled [OK]",
    "HIGH THROUGHPUT request pool active",
    "ROUTING table loaded: 14 channels",
    "SPEED telemetrics: execution < 1.1ms"
  ],
  Python: [
    "COMPILING asyncio event workers...",
    "AI NUMPY matrices parsed to cache",
    "PROCESS POOL spawned (8 instances)",
    "API endpoint loop ping: 14ms",
    "GARBAGE COLLECTOR clean sweep [OK]",
    "INTELLIGENT model links validated"
  ],
  "REST APIs": [
    "COMPILING REST contract mappings...",
    "AUTHENTICATING secure JSON payloads",
    "MAPPING error response matrix...",
    "SECURE TOKENS authorization approved",
    "GATEWAY pipeline latency: 8ms",
    "INTEGRITY: schema constraints bound"
  ],
  Microservices: [
    "DECOUPLING modular API architectures...",
    "SPAWNING gateway worker pipelines",
    "EVENT BROKER channel sync verified",
    "SERVICE REGISTRY: all nodes ONLINE",
    "HEALTH monitor: load balancing active",
    "ASYNC message loops operational"
  ],
  MongoDB: [
    "CONNECTING to document clusters...",
    "AGGREGATION query pipelines optimized",
    "INDEX MATRIX structural scan complete",
    "WRITE CONCERN: primary replica OK",
    "QUERY latency readout: 3.2ms",
    "SCHEMA validations enforced [100%]"
  ],
  SQLite: [
    "MOUNTING local disk DB file...",
    "ACID TRANSACTION journal verified",
    "QUERY parsing indexes allocated [OK]",
    "ROW LOCKS synchronization active",
    "SQLITE local storage cache optimized",
    "INDEX check: 100% table coverage"
  ],
  Firebase: [
    "OAUTH authentication registers active",
    "FIRESTORE database real-time sync ON",
    "CLOUD STORAGE buckets loaded...",
    "SECURITY rules verification check OK",
    "SERVERLESS functions warm start active",
    "PUSH: payload dispatcher operational"
  ],
  GitHub: [
    "VERIFYING git tree secure protocols...",
    "MERGE CONFLICT resolver loops clean",
    "SPAWNING CI/CD workflows (GitHub Actions)",
    "GIT TREE HEAD synced to origin/main",
    "VERSION index incremented: build 4802",
    "SSH handshake approved (RSA 4096)"
  ],
  FFmpeg: [
    "OPENING video transcoding buffers...",
    "GPU hardware encoders mapped (H.264)",
    "MEDIA filters: processing subtitles...",
    "AUDIO wave pipeline: rendering mp3",
    "BITRATE telemetrics: optimal 4500kbps",
    "FFMPEG compilation: 8 stages complete"
  ],
  Postman: [
    "LAUNCHING automated endpoint test suite",
    "ENVIRONMENT mapping arrays synchronized",
    "MOCK SERVICE registry active...",
    "TEST RESULTS: 12 passes, 0 failures",
    "PAYLOAD validation schemes: PERFECT",
    "TELEMETRY readout format approved"
  ]
};

// Rich technical details database for the HUD Terminal
interface TechDetails {
  desc: string;
  loadRate: string;
  threads: number;
  projects: string[];
  verdict: string;
  syntax: string;
  addr: string;
  coreTemp: string;
  memAlloc: string;
}

const TECH_DETAILS: Record<string, TechDetails> = {
  "React.js": {
    desc: "Expertise in virtual DOM reconciliation, custom React hooks, context APIs, and rendering performance optimisations.",
    loadRate: "94.8%",
    threads: 16,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "PRODUCTION READY — Mastered component modularity & state managers.",
    syntax: "import React, { useState, useEffect, useMemo } from 'react';",
    addr: "0x7F0A88",
    coreTemp: "42.1°C",
    memAlloc: "24.8 MB"
  },
  Vite: {
    desc: "Experienced with lightning fast hot module replacement (HMR), bundle treeshaking, and modular environment configurations.",
    loadRate: "89.2%",
    threads: 8,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "FAST BUNDLING — Pre-bundled dependencies with esbuild.",
    syntax: "export default defineConfig({ plugins: [react()] });",
    addr: "0x7F0B12",
    coreTemp: "38.5°C",
    memAlloc: "12.4 MB"
  },
  HTML5: {
    desc: "Semantic element modularity, accessibility validation standards, and responsive rich media layouts.",
    loadRate: "98.0%",
    threads: 2,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "SEMANTIC COMPLIANCE — Perfect structural layout hierarchy.",
    syntax: "<section id='projects' aria-labelledby='heading-id'>",
    addr: "0x7F0C45",
    coreTemp: "35.2°C",
    memAlloc: "4.2 MB"
  },
  CSS3: {
    desc: "Responsive layout controls using flexboxes, grid systems, custom animators, variables, and media query matrices.",
    loadRate: "92.4%",
    threads: 4,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "STYLING MASTER — Advanced responsive grids and transitions.",
    syntax: "grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));",
    addr: "0x7F0D89",
    coreTemp: "36.8°C",
    memAlloc: "8.1 MB"
  },
  JavaScript: {
    desc: "Fluent in modern ECMAScript standards (ES6+), asynchronous await loops, promises, closures, and object structures.",
    loadRate: "90.2%",
    threads: 8,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "LOGIC RUNTIME — Clean algorithms and event listeners.",
    syntax: "const fetchTelemetry = async (url) => await fetch(url);",
    addr: "0x7F0E11",
    coreTemp: "39.4°C",
    memAlloc: "15.6 MB"
  },
  "Socket.IO": {
    desc: "Programmed two-way real-time websocket handshakes, pipeline event tracking, active heartbeats, and room broadcast logic.",
    loadRate: "91.2%",
    threads: 12,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "REAL-TIME SYNC — Multi-user broadcast operations completed.",
    syntax: "io.on('connection', (socket) => { socket.emit('status'); });",
    addr: "0x7F0F92",
    coreTemp: "41.2°C",
    memAlloc: "19.3 MB"
  },
  "Node.js": {
    desc: "Server-side asynchronous engine deployment. Proficient in Event Loops, file streams, buffer processes, and clustered server networks.",
    loadRate: "88.0%",
    threads: 16,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "BACKEND STALWART — Expert in stream processing & event driven patterns.",
    syntax: "const fs = require('fs'); const http = require('http');",
    addr: "0x8E0A12",
    coreTemp: "43.5°C",
    memAlloc: "32.4 MB"
  },
  "Express.js": {
    desc: "Architected secure MVC routers, request-validation microservices, robust API rate-limit controllers, and localized security firewalls.",
    loadRate: "90.2%",
    threads: 10,
    projects: ["Medical Store Management"],
    verdict: "REST INTEGRITY — Perfect routing architectures and authentication loops.",
    syntax: "app.use('/api/v1/auth', authRouter);",
    addr: "0x8E0B34",
    coreTemp: "40.1°C",
    memAlloc: "18.2 MB"
  },
  FastAPI: {
    desc: "Architected asynchronous worker processes with automatic OpenAPI schemas, Pydantic data validations, and fast response times.",
    loadRate: "94.5%",
    threads: 16,
    projects: ["AUTOREEL.AI"],
    verdict: "HIGH THROUGHPUT — Fast routing engine matching performance of Go & NodeJS.",
    syntax: "from fastapi import FastAPI, BackgroundTasks\napp = FastAPI()",
    addr: "0x8E0C56",
    coreTemp: "42.8°C",
    memAlloc: "22.5 MB"
  },
  Python: {
    desc: "Engineered deep pipeline operations, multithreaded AI API request loops, media manipulations, and automation scripts.",
    loadRate: "86.4%",
    threads: 12,
    projects: ["AUTOREEL.AI"],
    verdict: "AI PIPELINE KING — Efficient file management and concurrent workers.",
    syntax: "import asyncio\nasync def process_task(task_id): pass",
    addr: "0x8E0D78",
    coreTemp: "41.5°C",
    memAlloc: "29.7 MB"
  },
  "REST APIs": {
    desc: "Designed unified data contract pipelines, standardized JSON-wrapper responses, robust token authenticators, and error mapping grids.",
    loadRate: "95.0%",
    threads: 16,
    projects: ["AUTOREEL.AI", "Medical Store Management"],
    verdict: "REST ARCHITECT — Complete standardization of secure communication networks.",
    syntax: "res.status(200).json({ success: true, payload: data });",
    addr: "0x8E0E90",
    coreTemp: "38.9°C",
    memAlloc: "11.1 MB"
  },
  Microservices: {
    desc: "Decoupled monolithic logic into distributed, isolated worker services. Established clean gateway controllers and async workers.",
    loadRate: "82.5%",
    threads: 24,
    projects: ["AUTOREEL.AI"],
    verdict: "SCALABLE SYSTEMS — Resilient multi-stage asynchronous processing grids.",
    syntax: "services = { 'gateway': 'http://localhost:8000', 'worker': '...' }",
    addr: "0x8E0FFF",
    coreTemp: "44.6°C",
    memAlloc: "45.2 MB"
  },
  MongoDB: {
    desc: "Mastery in document database design, multi-stage aggregation pipelines, optimized index mapping, and query latency reductions.",
    loadRate: "83.5%",
    threads: 32,
    projects: ["Medical Store Management"],
    verdict: "DATABASE COMMANDER — Excellent schema architecture for complex data structures.",
    syntax: "const userSchema = new mongoose.Schema({ email: { type: String } });",
    addr: "0x9D0A11",
    coreTemp: "39.9°C",
    memAlloc: "54.8 MB"
  },
  SQLite: {
    desc: "Deployed localized database structures, structured schemas, dynamic transactions, and indexing structures.",
    loadRate: "78.0%",
    threads: 4,
    projects: ["Academic DB Projects"],
    verdict: "RELIABLE STORAGE — ACID compliant transactions on simple file networks.",
    syntax: "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY);",
    addr: "0x9D0B23",
    coreTemp: "35.8°C",
    memAlloc: "6.3 MB"
  },
  Firebase: {
    desc: "Rapid deployment of OAuth security protocols, serverless Cloud Function microservices, real-time firestore listeners, and media buckets.",
    loadRate: "80.5%",
    threads: 8,
    projects: ["Medical Store Management"],
    verdict: "RAPID DEPLOYER — Fluent integration of serverless modules.",
    syntax: "const db = getFirestore(firebaseApp); const unsub = onSnapshot(...);",
    addr: "0x9D0C45",
    coreTemp: "37.2°C",
    memAlloc: "14.1 MB"
  },
  GitHub: {
    desc: "Proficient in branching networks, merge conflict resolutions, custom workflows (CI/CD), and organized semantic versioning hooks.",
    loadRate: "97.1%",
    threads: 2,
    projects: ["All Project Repositories"],
    verdict: "COLLABORATION ENGINE — Excellent Git hygiene and deployment mechanics.",
    syntax: "git commit -m 'feat(auth): integrate dynamic oauth token payload'",
    addr: "0x9D0D67",
    coreTemp: "34.5°C",
    memAlloc: "3.8 MB"
  },
  FFmpeg: {
    desc: "Programmed complex dynamic audio/video media filters, overlays, concatenations, subtitle integrations, and high-fidelity transcoding.",
    loadRate: "89.6%",
    threads: 16,
    projects: ["AUTOREEL.AI"],
    verdict: "MEDIA OVERLORD — Automated video compile rendering via terminal wrappers.",
    syntax: "ffmpeg -i script.mp3 -vf 'subtitles=sub.srt' out.mp4",
    addr: "0x9D0E89",
    coreTemp: "45.2°C",
    memAlloc: "64.0 MB"
  },
  Postman: {
    desc: "Conducted automated route testing suite integrations, environment variables mapping, route mocking, and payload telemetry tracking.",
    loadRate: "84.2%",
    threads: 6,
    projects: ["All Project APIs"],
    verdict: "API INTEGRITY ASSURED — Standardized endpoint validations and payloads.",
    syntax: "pm.test('Status code is 200', () => { pm.response.to.have.status(200); });",
    addr: "0x9D0FFF",
    coreTemp: "36.2°C",
    memAlloc: "9.5 MB"
  }
};

/* ─── Dynamic Real-time Waveform Sparkline Component ──────── */
function WaveformSparkline({ color, active }: { color: string; active: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let animId: number;
    const tick = () => {
      setTime((t) => t + (active ? 0.18 : 0.05));
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [active]);

  const points = 16;
  const width = 140;
  const height = 24;
  let d = `M 0 ${height / 2}`;
  
  const currentTime = mounted ? time : 0;
  
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const offset = i * (active ? 0.8 : 0.4);
    const amp = active 
      ? 9 + Math.sin(currentTime * 1.5 + i) * 3 
      : 3 + Math.sin(currentTime * 0.5 + i * 0.3) * 1.2;
    const y = (height / 2) + Math.sin(currentTime * 2.5 - offset) * amp;
    d += ` L ${x} ${y}`;
  }

  return (
    <svg className="w-[140px] h-[24px] opacity-40 group-hover:opacity-100 transition-opacity duration-300" viewBox={`0 0 ${width} ${height}`} fill="none">
      <path
        d={d}
        stroke={color}
        strokeWidth={active ? "1.8" : "1.2"}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-150"
        style={{
          filter: active ? `drop-shadow(0 0 4px ${color}80)` : "none"
        }}
      />
    </svg>
  );
}

/* ─── Holographic interactive skill card module ────────────── */
function SkillCard3D({
  name,
  level,
  color,
  isSelected,
  onClick,
  index,
}: {
  name: string;
  level: number;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse position from -0.5 to +0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    // Elegant and premium max 12 degree 3D tilt
    setTilt({ x: -y * 12, y: x * 12 });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const totalSegments = 10;
  const activeSegments = Math.round(level / 10);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? "transform 0.03s linear" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className={`group relative rounded-2xl p-4 border cursor-pointer select-none overflow-hidden transition-all duration-300 ${
        isSelected
          ? "border-white/20 bg-white/[0.05] shadow-[0_15px_40px_-10px_rgba(56,189,248,0.18)]"
          : "border-white/5 bg-[#0a0f1e]/45 hover:border-white/12 hover:bg-white/[0.015]"
      }`}
    >
      {/* Animated Edge Border Tracing (Hover Laser effect) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl"
        style={{
          border: `1px solid ${color}35`,
          boxShadow: `inset 0 0 12px ${color}10`
        }}
      />

      {/* Pointer Spotlight Radial Gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 110px at ${mousePos.x}px ${mousePos.y}px, ${color}18 0%, transparent 80%)`,
        }}
      />

      {/* Dynamic scanline tracer within active card */}
      {isSelected && (
        <div 
          className="absolute inset-x-0 h-[1.5px] opacity-[0.4] pointer-events-none bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent animate-pulse"
          style={{
            top: "50%",
            boxShadow: `0 0 8px ${color}`,
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }}
        />
      )}

      {/* Top Header Information Tag */}
      <div className="flex items-center justify-between mb-3 text-[#94a3b8]/40 font-mono-custom text-[0.62rem] tracking-widest border-b border-white/5 pb-2">
        <span className="flex items-center gap-1">
          <span className={`w-1 h-1 rounded-full ${isSelected ? "animate-ping" : ""}`} style={{ backgroundColor: color }} />
          ADDR: 0x{(index * 16 + 128).toString(16).toUpperCase()}
        </span>
        <span className="font-semibold" style={{ color: isSelected ? color : "rgba(255,255,255,0.2)" }}>
          {isSelected ? "LINKED" : "STANDBY"}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        {/* Glowing Vector Icon box */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
          style={{
            background: isSelected ? `${color}25` : `${color}06`,
            border: `1px solid ${isSelected ? `${color}40` : "rgba(255,255,255,0.04)"}`,
            boxShadow: isSelected || isHovered ? `0 0 15px ${color}20` : "none",
          }}
        >
          <TechIcon name={name} size={20} color={color} />
        </div>

        {/* Info detail */}
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-xs md:text-sm text-white truncate group-hover:text-white leading-tight">
            {name}
          </h4>
          <span className="font-mono-custom text-[0.6rem] text-[#94a3b8]/60 tracking-wider">
            LOAD LEVEL: {level}%
          </span>
        </div>

        {/* Core Live Waveform */}
        <div className="hidden sm:block">
          <WaveformSparkline color={color} active={isSelected || isHovered} />
        </div>
      </div>

      {/* Cybernetic Segmented Progress Bar */}
      <div className="flex gap-[3px] w-full pt-1">
        {Array.from({ length: totalSegments }).map((_, i) => {
          const isActive = i < activeSegments;
          return (
            <div
              key={i}
              className="flex-1 h-[2.5px] rounded-sm transition-all duration-500"
              style={{
                backgroundColor: isActive
                  ? color
                  : "rgba(255, 255, 255, 0.05)",
                boxShadow: isActive && (isHovered || isSelected)
                  ? `0 0 5px ${color}`
                  : "none",
                opacity: isActive ? 1 - i * 0.05 : 0.6,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── 3D Projected 2D HTML5 Canvas AI Core centerpiece ─────── */
function AICoreCanvas({ activeColor }: { activeColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dynamic interaction offsets
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, hover: false });
  const activeColorRef = useRef(activeColor);

  useEffect(() => {
    activeColorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    
    // Set system sizing
    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = Math.max(rect.height, 460);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Coordinate rotation matrices for a spinning dodecahedron
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    // Define 12 vertices of an icosahedron (for a stunning hollow structure)
    const p = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      { x: -1, y:  p, z: 0 }, { x:  1, y:  p, z: 0 }, { x: -1, y: -p, z: 0 }, { x:  1, y: -p, z: 0 },
      { x: 0, y: -1, z:  p }, { x: 0, y:  1, z:  p }, { x: 0, y: -1, z: -p }, { x: 0, y:  1, z: -p },
      { x:  p, y: 0, z: -1 }, { x:  p, y: 0, z:  1 }, { x: -p, y: 0, z: -1 }, { x: -p, y: 0, z:  1 },
    ];
    // Normalize to make spherical
    const radiusScale = 1.35;
    const len = Math.sqrt(1 + p * p);
    const vertices = baseVertices.map((v) => ({
      x: (v.x / len) * radiusScale,
      y: (v.y / len) * radiusScale,
      z: (v.z / len) * radiusScale,
    }));

    // Find edges by distance check (< 2.05)
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.05) {
          edges.push([i, j]);
        }
      }
    }

    // 3D rotation functions
    const rotVertex = (v: { x: number; y: number; z: number }) => {
      // Rotate Y
      const x1 = v.x * Math.cos(rotY) - v.z * Math.sin(rotY);
      const z1 = v.x * Math.sin(rotY) + v.z * Math.cos(rotY);
      // Rotate X
      const y2 = v.y * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = v.y * Math.sin(rotX) + z1 * Math.cos(rotX);
      // Rotate Z
      const x3 = x1 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
      const y3 = x1 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
      return { x: x3, y: y3, z: z2 };
    };

    // Synapse floating micro-particles
    const particlesCount = 35;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let timeTick = 0;

    // Core Animation Frame Loop
    const draw = () => {
      timeTick += 0.01;
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      // Inertia mouse follow logic
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Base rotation rate + cursor offset vectors
      rotY += 0.007 + mouseRef.current.x * 0.00012;
      rotX += 0.003 + mouseRef.current.y * 0.00008;
      rotZ += 0.002;

      const themeColor = activeColorRef.current;

      // ─── BACKGROUND GLOW ORB ───
      const radGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 180);
      radGlow.addColorStop(0, `${themeColor}20`);
      radGlow.addColorStop(0.4, `${themeColor}06`);
      radGlow.addColorStop(1, "transparent");
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 200, 0, Math.PI * 2);
      ctx.fill();

      // ─── RADAR GRID SCANNER RINGS ───
      ctx.strokeStyle = `${themeColor}12`;
      ctx.lineWidth = 1;
      
      // Ring 1 (Static Outer Grid Limit)
      ctx.beginPath();
      ctx.arc(cx, cy, 190, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2 (Dashed slowly spinning Telemetry track)
      ctx.save();
      ctx.strokeStyle = `${themeColor}25`;
      ctx.setLineDash([6, 16]);
      ctx.beginPath();
      ctx.arc(cx, cy, 150, timeTick * 0.15, timeTick * 0.15 + Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Ring 3 (Fast tick ring with mini compass labels)
      ctx.save();
      ctx.strokeStyle = `${themeColor}40`;
      ctx.setLineDash([2, 38]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 110, -timeTick * 0.4, -timeTick * 0.4 + Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw active cyber crosshairs in canvas background
      ctx.strokeStyle = `${themeColor}15`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      // Vert line
      ctx.moveTo(cx, cy - 210); ctx.lineTo(cx, cy + 210);
      // Horiz line
      ctx.moveTo(cx - 210, cy); ctx.lineTo(cx + 210, cy);
      ctx.stroke();

      // ─── DYNAMIC 3D ROTATED DODECAHEDRON NEURAL SHAPE ───
      const projected = vertices.map((v) => {
        const rotated = rotVertex(v);
        // Perspective projection formula
        const fov = 260;
        const scaleDist = 3.6;
        const screenX = cx + (rotated.x * fov) / (rotated.z + scaleDist);
        const screenY = cy + (rotated.y * fov) / (rotated.z + scaleDist);
        return { x: screenX, y: screenY, z: rotated.z };
      });

      // Draw projected edges with depth sorting
      ctx.lineWidth = 1.2;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        
        // Dynamic opacity based on average Z coordinate (spatial 3D feeling)
        const avgZ = (p1.z + p2.z) / 2;
        const op = Math.max(0.08, Math.min(0.7, 0.4 - avgZ * 0.25));

        ctx.strokeStyle = `${themeColor}${Math.round(op * 255).toString(16).padStart(2, "0")}`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw projected neural vertices (glowing nodes)
      projected.forEach((p, idx) => {
        const op = Math.max(0.1, Math.min(0.85, 0.5 - p.z * 0.3));
        ctx.fillStyle = themeColor;
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 6;
        
        ctx.beginPath();
        // Inner pulsing core nodes
        ctx.arc(p.x, p.y, Math.max(2, 3.5 - p.z * 1.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        // Draw tiny technical address label next to every 3rd vertex node
        if (idx % 3 === 0) {
          ctx.fillStyle = `${themeColor}${Math.round(op * 180).toString(16).padStart(2, "0")}`;
          ctx.font = "bold 7px JetBrains Mono, monospace";
          ctx.fillText(`N_${100 + idx}`, p.x + 6, p.y - 3);
        }
      });

      // ─── SYNAPSE FLOATING PARTICLES WITH CONNECTIONS ───
      particles.forEach((part, idx) => {
        // Drifting velocity physics
        part.x += part.vx;
        part.y += part.vy;

        // Bounce inside core boundaries
        const rBound = 180;
        const distToCenter = Math.sqrt(part.x * part.x + part.y * part.y);
        if (distToCenter > rBound) {
          const angle = Math.atan2(part.y, part.x);
          part.x = Math.cos(angle) * (rBound - 2);
          part.y = Math.sin(angle) * (rBound - 2);
          part.vx *= -1;
          part.vy *= -1;
        }

        // Magnetic cursor interaction
        if (mouseRef.current.hover) {
          // Absolute cursor coordinates relative to canvas center
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const dx = mx - part.x;
          const dy = my - part.y;
          const distToCursor = Math.sqrt(dx * dx + dy * dy);
          if (distToCursor < 90) {
            // Drag nodes gently toward mouse
            part.x += dx * 0.05;
            part.y += dy * 0.05;
          }
        }

        const absX = cx + part.x;
        const absY = cy + part.y;

        // Draw individual particle node
        ctx.fillStyle = `${themeColor}${Math.round(part.alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.beginPath();
        ctx.arc(absX, absY, part.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles that are in close proximity
        for (let j = idx + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = part.x - other.x;
          const dy = part.y - other.y;
          const lineDist = Math.sqrt(dx * dx + dy * dy);
          if (lineDist < 55) {
            const lineOp = Math.max(0, 0.15 - lineDist / 360);
            ctx.strokeStyle = `${themeColor}${Math.round(lineOp * 255).toString(16).padStart(2, "0")}`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(absX, absY);
            ctx.lineTo(cx + other.x, cy + other.y);
            ctx.stroke();
          }
        }
      });

      // ─── CINEMATIC DATA FEED CONNECTORS (FROM LEFT PANEL TO ENGINE) ───
      // Drawing elegant horizontal data lines with pulsing packets to bind layouts
      ctx.strokeStyle = `${themeColor}12`;
      ctx.lineWidth = 1;
      
      const beamY1 = cy - 80;
      const beamY2 = cy + 80;
      
      ctx.beginPath();
      // Beam line 1
      ctx.moveTo(0, beamY1); ctx.lineTo(cx - 80, beamY1);
      // Beam line 2
      ctx.moveTo(0, beamY2); ctx.lineTo(cx - 60, beamY2);
      ctx.stroke();

      // Flowing packets along horizontal beams
      const packetOffset1 = (timeTick * 60) % (cx - 80);
      const packetOffset2 = ((timeTick * 45) + 120) % (cx - 60);

      ctx.fillStyle = themeColor;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 4;
      
      ctx.beginPath();
      ctx.arc(packetOffset1, beamY1, 2, 0, Math.PI * 2);
      ctx.arc(packetOffset2, beamY2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Core Label overlay
      ctx.fillStyle = `${themeColor}70`;
      ctx.font = "bold 8px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("NEURAL_CORE_v2.0", cx, cy + 135);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "500 7px JetBrains Mono, monospace";
      ctx.fillText(`ROTATION: ${rotY.toFixed(2)} rad`, cx, cy + 148);

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse handlers on local window relative coordinates
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      // Coordinates centered on canvas
      mouseRef.current.targetX = clientX - rect.width / 2;
      mouseRef.current.targetY = clientY - rect.height / 2;
    };

    const handleMouseEnter = () => {
      mouseRef.current.hover = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.hover = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    const targetEl = containerRef.current;
    if (targetEl) {
      targetEl.addEventListener("mousemove", handleMouseMove);
      targetEl.addEventListener("mouseenter", handleMouseEnter);
      targetEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (targetEl) {
        targetEl.removeEventListener("mousemove", handleMouseMove);
        targetEl.removeEventListener("mouseenter", handleMouseEnter);
        targetEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[460px] flex items-center justify-center relative select-none">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}

/* ─── Real-time multi-core CPU bar telemetry graph ───────── */
function CPUBarChart({ activeColor }: { activeColor: string }) {
  // Keyframes defined inline via standard Tailwind heights + animation-delays
  // Render exactly 12 bars representing standard cluster processors
  return (
    <div className="flex items-end justify-between h-[55px] w-full bg-[#030611]/80 border border-white/5 p-2 rounded-xl">
      {Array.from({ length: 12 }).map((_, i) => {
        // Distribute varying durations & animation-delays to look randomized
        const animDuration = 0.8 + (i % 5) * 0.2;
        const animDelay = (i * 0.12).toFixed(2);
        
        return (
          <div
            key={i}
            className="w-[5.5%] rounded-sm transition-all duration-300 relative"
            style={{
              backgroundColor: activeColor,
              animation: `bounceHeight ${animDuration}s ease-in-out infinite`,
              animationDelay: `${animDelay}s`,
              boxShadow: `0 0 6px ${activeColor}40`
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Circular SVG Memory and load telemetry widgets ─────── */
function CircularMemoryTelemetry({ activeColor, loadValue }: { activeColor: string; loadValue: string }) {
  const loadValNumber = parseFloat(loadValue) || 90;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (loadValNumber / 100) * circumference;

  return (
    <div className="flex items-center gap-3 bg-[#030611]/80 border border-white/5 p-3 rounded-xl">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Background Dial */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="24" cy="24" r={radius} stroke="rgba(255,255,255,0.04)" strokeWidth="3" fill="transparent" />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={activeColor}
            strokeWidth="3.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 2.5px ${activeColor})`
            }}
          />
        </svg>
        <span className="absolute font-mono-custom text-[0.62rem] font-bold text-white">
          {Math.round(loadValNumber)}%
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-mono-custom text-[0.58rem] text-[#94a3b8] block tracking-wider uppercase">CORE METRIC</span>
        <span className="font-display font-semibold text-xs text-white truncate block">
          MEM_ALLOC: ACTIVE
        </span>
      </div>
    </div>
  );
}

/* ─── Main Skills (Command Center) Section ────────────────── */
export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<typeof CATS[number]>("Frontend");
  const [selectedSkill, setSelectedSkill] = useState<string>("React.js");

  // Retrieve current active tech specifications
  const techInfo = TECH_DETAILS[selectedSkill] || {
    desc: "Technology integration suite currently active in local environment registers. System loading details...",
    loadRate: "90%",
    threads: 8,
    projects: ["General Portfolio Deployments"],
    verdict: "READY — Fully operational development module.",
    syntax: "console.log('Technical interface active');",
    addr: "0x7F0AAA",
    coreTemp: "38.0°C",
    memAlloc: "10.0 MB"
  };

  const activeSkills = skills[activeCategory];
  const activeColor = CAT_COLOR[activeCategory];

  // Micro terminal console system real-time running log simulation
  const [terminalLog, setTerminalLog] = useState<string[]>([]);
  
  useEffect(() => {
    // Standard terminal boot sequences
    const handleInit = () => {
      setTerminalLog([
        `SECURE PROTOCOL INITIALIZED [port 443]`,
        `CONNECTING SYSTEM TO COGNITIVE ARRAY RESISTORS...`,
        `ACCESS CONFIRMED: ashuyadav@command-center`,
        `SPAWNING ENGINE PROCESS STREAM: ${selectedSkill.toUpperCase()}.SYS`
      ]);
    };
    
    // Defer using requestAnimationFrame to prevent synchronous setState inside useEffect body
    const frameId = requestAnimationFrame(handleInit);

    // Fast initial sequence loading diagnostic messages
    const timer1 = setTimeout(() => {
      const logsForTech = DENSE_LOGS[selectedSkill] || ["PROCESS LOOP SYNCHRONIZED SUCCESSFULLY"];
      setTerminalLog((prev) => [...prev, `[INIT] ${logsForTech[0]}`]);
    }, 400);

    const timer2 = setTimeout(() => {
      const logsForTech = DENSE_LOGS[selectedSkill] || ["PROCESS LOOP SYNCHRONIZED SUCCESSFULLY"];
      setTerminalLog((prev) => [...prev, `[SYS] ${logsForTech[1]}`]);
    }, 800);

    const timer3 = setTimeout(() => {
      const logsForTech = DENSE_LOGS[selectedSkill] || ["PROCESS LOOP SYNCHRONIZED SUCCESSFULLY"];
      setTerminalLog((prev) => [
        ...prev,
        `[DIAG] ${logsForTech[2]}`,
        `[STATUS] ${techInfo.verdict.slice(0, 42)}...`
      ]);
    }, 1200);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [selectedSkill, techInfo.verdict]);

  // Append background ticker loop logs every 2 seconds dynamically to feel alive
  useEffect(() => {
    const diagnosticInterval = setInterval(() => {
      const logsForTech = DENSE_LOGS[selectedSkill] || ["TELEMETRY BUFFER POLLING SECURE"];
      // Pick a random line from index 3-5
      const randomIndex = 3 + Math.floor(Math.random() * 3);
      const randomLogLine = logsForTech[randomIndex] || logsForTech[3];
      
      setTerminalLog((prev) => {
        const kept = prev.slice(-8); // keep last 8 lines to prevent buffer overflow
        const timeStr = new Date().toLocaleTimeString("en-US", { hour12: false, fractionalSecondDigits: 2 } as Intl.DateTimeFormatOptions);
        return [...kept, `[${timeStr}] ${randomLogLine}`];
      });
    }, 2000);

    return () => clearInterval(diagnosticInterval);
  }, [selectedSkill]);

  return (
    <section id="skills" className="relative section-pad overflow-hidden">
      {/* CSS custom keyframe style block inject (highly robust, 0 build dependencies) */}
      <style jsx global>{`
        @keyframes bounceHeight {
          0%, 100% { height: 15%; }
          50% { height: 95%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 24s linear infinite;
        }
        .bg-grid-cyber {
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.012) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
        }
        .cyber-scanlines::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 3px, 3px 100%;
          pointer-events: none;
          opacity: 0.12;
        }
      `}</style>

      {/* Background Ambience & Cyber grid overlays */}
      <div className="absolute inset-0 bg-[#050816]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-cyber opacity-[0.45] pointer-events-none" />
      <div className="absolute inset-0 cyber-scanlines pointer-events-none" />

      {/* Floating Animated Grid Light rays overlaying active colors */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ease-in-out opacity-25"
        style={{
          background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10 container-xl">
        {/* Cinematic Stagger Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeColor }} />
            <span className="font-mono-custom text-[0.68rem] font-bold tracking-[0.25em] text-[#94a3b8]" style={{ textShadow: `0 0 10px ${activeColor}60` }}>
              Cap. 002 // CYBERNETIC COGNITION COMMAND CENTER
            </span>
          </motion.div>

          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight relative z-10"
            >
              MY <span className="gradient-text font-black">ARSENAL</span>
            </motion.h2>
            {/* Holographic subtitle text shadow overlay */}
            <span 
              className="absolute inset-0 text-4xl md:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight blur-[15px] select-none opacity-20 pointer-events-none"
              style={{ color: activeColor }}
            >
              MY ARSENAL
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#94a3b8]/75 max-w-xl mx-auto text-sm md:text-base font-sans mt-4 leading-relaxed"
          >
            Integrating full-stack ecosystems, real-time socket grids, and advanced microservice pipelines into structured digital command panels.
          </motion.p>
        </div>

        {/* Cinematic Dashboard category Switcher tab panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="glass-strong rounded-2xl p-1.5 flex gap-1.5 border border-white/6 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.65)] relative z-10">
            {CATS.map((c) => {
              const active = activeCategory === c;
              const color = CAT_COLOR[c];
              return (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCategory(c);
                    const nextSkills = skills[c];
                    if (nextSkills.length > 0) {
                      setSelectedSkill(nextSkills[0].name);
                    }
                  }}
                  className={`relative px-5 py-2.5 rounded-xl text-xs md:text-xs font-bold font-display uppercase tracking-wider transition-all duration-300 ${
                    active ? "text-white" : "text-[#8ea0b5] hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="cat-glow"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${color}22, ${color}05)`,
                        border: `1px solid ${color}45`,
                        boxShadow: `0 0 15px ${color}15`
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 6px ${color}`,
                      }}
                    />
                    {c}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cinematic Dashboard Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-stretch relative z-10">
          
          {/* COLUMN 1 (LEFT): Skill cards stack (6 cards vertical stack) */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <div className="flex items-center gap-2 px-1 mb-1 text-white/80">
              <Activity size={13} style={{ color: activeColor }} />
              <span className="font-mono-custom text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                ACTIVE_MODULE_SELECTOR
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3"
              >
                {activeSkills.map((s, i) => (
                  <SkillCard3D
                    key={s.name}
                    {...s}
                    isSelected={selectedSkill === s.name}
                    onClick={() => setSelectedSkill(s.name)}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* COLUMN 2 (CENTER): AI Holographic Core Interactive Canvas */}
          <div className="lg:col-span-4 glass-strong rounded-3xl border border-white/6 overflow-hidden flex flex-col items-center justify-between p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative min-h-[480px]">
            {/* Cyber Header Indicators */}
            <div className="w-full flex items-center justify-between font-mono-custom text-[0.58rem] text-[#94a3b8]/50 px-2 pb-2 border-b border-white/5">
              <span>MODEL: DODECA_NET_CYBER</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                60FPS SYNCED
              </span>
            </div>

            {/* Interactive Canvas centerpiece */}
            <AICoreCanvas activeColor={activeColor} />

            {/* Holographic operational instructions footer */}
            <div className="w-full text-center border-t border-white/5 pt-2 text-[#94a3b8]/40 font-mono-custom text-[0.58rem]">
              DRAG OR HOVER CURSOR ON CORE ENGINE TO REDIRECT SYNAPSES
            </div>
          </div>

          {/* COLUMN 3 (RIGHT): Live Diagnostics and analytics panel */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div
              layout="position"
              className="h-full flex flex-col glass-strong rounded-3xl border border-white/6 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative"
            >
              {/* Header Tab panel */}
              <div className="flex items-center justify-between px-5 py-3 bg-white/[0.015] border-b border-white/5 font-mono-custom text-xs">
                <span className="flex items-center gap-2 text-white/90">
                  <Terminal size={13} style={{ color: activeColor }} />
                  ACTIVE_DIAGNOSTICS
                </span>
                <span className="flex items-center gap-1.5 text-[#a1b0cb]/60 font-mono-custom text-[0.62rem]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYS ONLINE
                </span>
              </div>

              {/* Panel Content Body */}
              <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
                
                {/* Tech Profile Row */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500"
                    style={{
                      background: `rgba(255,255,255,0.015)`,
                      borderColor: `${activeColor}30`,
                      boxShadow: `0 0 20px ${activeColor}08`,
                    }}
                  >
                    <TechIcon
                      name={selectedSkill}
                      size={26}
                      color={activeColor}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-xl text-white tracking-wide leading-none mb-1 text-glow">
                      {selectedSkill}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono-custom text-[0.62rem] font-bold px-2 py-0.5 rounded border tracking-wider uppercase inline-block"
                        style={{
                          color: activeColor,
                          borderColor: `${activeColor}25`,
                          background: `${activeColor}06`,
                        }}
                      >
                        {activeCategory} LAYER
                      </span>
                      <span className="font-mono-custom text-[0.58rem] text-[#94a3b8]/50">
                        {techInfo.addr}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subsystem Telemetry CPU Grid Graph */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between font-mono-custom text-[0.62rem] text-[#94a3b8] tracking-wider">
                    <span>12-CORE CPU WORKLOAD</span>
                    <span className="font-bold" style={{ color: activeColor }}>
                      {techInfo.loadRate} LOAD
                    </span>
                  </div>
                  <CPUBarChart activeColor={activeColor} />
                </div>

                {/* Double Telemetry layout widgets (Memory Dial + Temp) */}
                <div className="grid grid-cols-2 gap-3">
                  <CircularMemoryTelemetry activeColor={activeColor} loadValue={techInfo.loadRate} />
                  <div className="flex flex-col justify-center bg-[#030611]/80 border border-white/5 p-3 rounded-xl">
                    <span className="font-mono-custom text-[0.58rem] text-[#94a3b8] block tracking-wider uppercase">CORE TEMP</span>
                    <span className="font-display font-bold text-sm text-white flex items-center gap-1.5 mt-0.5">
                      <Zap size={11} className="text-[#f59e0b] animate-pulse" />
                      {techInfo.coreTemp}
                    </span>
                  </div>
                </div>

                {/* Micro Live Auto-Scrolling Terminal log feed */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono-custom text-[0.62rem] text-[#94a3b8] tracking-wider uppercase">SYNAPSE TELEMETRY STREAM</span>
                  <div className="bg-[#030611]/90 border border-white/5 rounded-xl p-3 font-mono-custom text-[0.65rem] leading-relaxed text-emerald-400/90 h-[105px] overflow-y-auto select-text shadow-inner flex flex-col gap-1">
                    {terminalLog.map((log, idx) => (
                      <div key={idx} className="flex gap-1.5">
                        <span className="text-[#38bdf8]/50 flex-shrink-0">&gt;</span>
                        <p className="break-all font-mono-custom">{log}</p>
                      </div>
                    ))}
                    <div className="flex gap-1.5 text-[#38bdf8]">
                      <span className="text-[#38bdf8]/50 flex-shrink-0">&gt;</span>
                      <p className="animate-pulse">_</p>
                    </div>
                  </div>
                </div>

                {/* Description Capability */}
                <div className="border-t border-white/5 pt-3">
                  <h5 className="font-mono-custom text-[0.62rem] text-[#94a3b8] uppercase tracking-wider mb-1">CAPABILITY OUTLINE</h5>
                  <p className="text-xs text-[#a1b0cb] leading-relaxed font-sans">{techInfo.desc}</p>
                </div>

                {/* Syntax syntax snippet */}
                <div>
                  <h5 className="font-mono-custom text-[0.62rem] text-[#94a3b8] uppercase tracking-wider mb-1">INTEGRATION CONTEXT</h5>
                  <div 
                    className="bg-[#030611]/90 border border-white/5 rounded-lg p-2.5 font-mono text-[0.65rem] overflow-x-auto select-all whitespace-pre leading-normal"
                    style={{ color: activeColor }}
                  >
                    {techInfo.syntax}
                  </div>
                </div>

                {/* Tactical Application projects */}
                <div className="border-t border-white/5 pt-3 flex items-center justify-between gap-3">
                  <span className="font-mono-custom text-[0.62rem] text-[#94a3b8] uppercase tracking-wider flex-shrink-0">
                    APPLICATION
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {techInfo.projects.map((proj) => (
                      <span
                        key={proj}
                        className="flex items-center gap-1 font-mono-custom text-[0.58rem] font-bold px-2 py-0.8 bg-white/[0.02] border border-white/6 text-[#e2e8f0] rounded-lg transition-all duration-200"
                      >
                        <CheckCircle2 size={9} className="text-[#38bdf8]" />
                        {proj.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* BOTTOM TECHNOLOGY INFINITE MARQUEE TICKER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 border-t border-white/6 pt-10 relative overflow-hidden"
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="w-1 h-1 rounded-full bg-[#8b5cf6] animate-pulse" />
            <p className="font-mono-custom text-[0.62rem] text-[#94a3b8] tracking-[0.35em] uppercase">
              COGNITIVE SUITE // INFINITE TELEMETRY LINK
            </p>
            <span className="w-1 h-1 rounded-full bg-[#8b5cf6] animate-pulse" />
          </div>

          {/* Marquee viewport container */}
          <div className="relative w-full overflow-hidden py-3 bg-[#030611]/30 border-y border-white/5 flex gap-0">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />
            
            {/* The infinite scrolling row container */}
            <div className="flex animate-marquee-slow whitespace-nowrap gap-6 select-none hover:[animation-play-state:paused]">
              {[
                "React.js", "Vite", "HTML5", "CSS3", "JavaScript", "Socket.IO", 
                "Node.js", "Express.js", "FastAPI", "Python", "REST APIs", "Microservices", 
                "MongoDB", "SQLite", "Firebase", "GitHub", "FFmpeg", "Postman"
              ].concat([ // concatenate list twice to enable perfect looping overlap
                "React.js", "Vite", "HTML5", "CSS3", "JavaScript", "Socket.IO", 
                "Node.js", "Express.js", "FastAPI", "Python", "REST APIs", "Microservices", 
                "MongoDB", "SQLite", "Firebase", "GitHub", "FFmpeg", "Postman"
              ]).map((t, idx) => {
                const isConfigured = !!TECH_DETAILS[t];
                
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isConfigured) {
                        setSelectedSkill(t);
                        if (skills.Frontend.find((s) => s.name === t)) setActiveCategory("Frontend");
                        else if (skills.Backend.find((s) => s.name === t)) setActiveCategory("Backend");
                        else if (skills.Tools.find((s) => s.name === t)) setActiveCategory("Tools");
                      }
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-all duration-300 font-display text-[0.68rem] font-bold tracking-wider ${
                      selectedSkill === t
                        ? "bg-white/[0.06] border-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.08)]"
                        : "bg-[#0a0f1e]/40 border-white/5 text-[#8ea0b5] hover:border-white/15 hover:text-white"
                    }`}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ 
                        backgroundColor: activeCategory === "Frontend" && skills.Frontend.find(s => s.name === t) ? CAT_COLOR.Frontend :
                                         activeCategory === "Backend" && skills.Backend.find(s => s.name === t) ? CAT_COLOR.Backend :
                                         activeCategory === "Tools" && skills.Tools.find(s => s.name === t) ? CAT_COLOR.Tools : "#a1b0cb",
                        boxShadow: `0 0 5px currentColor`
                      }} 
                    />
                    {t.toUpperCase()}
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
