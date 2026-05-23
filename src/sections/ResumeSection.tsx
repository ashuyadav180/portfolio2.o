"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  FileText, 
  Eye, 
  CheckCircle, 
  Clock, 
  FileCheck, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Lock, 
  Activity,
  X,
  Printer,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Sliders,
  Minus,
  Plus
} from "lucide-react";

/* ─── Custom Interface Definitions ─── */
interface AuthCoreCanvasProps {
  hoveredSide: "left" | "right" | null;
  isAuthenticating: boolean;
}

/* ─── Centerpiece: Interactive Auth Core Canvas ──────────── */
function AuthCoreCanvas({ hoveredSide, isAuthenticating }: AuthCoreCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
    };
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      mousePosRef.current = { x: 0, y: 0 };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = 240;
    let height = canvas.height = 360;
    let rotation = 0;
    let pulseScale = 1;
    let pulseDir = 1;

    // Resizing relative to container dynamically
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height || 360;
      width = canvas.width;
      height = canvas.height;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Seeding neural grid particles with fixed parameters to respect React 19 render purity
    const particlesCount = 20;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      orbit: number;
      angle: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        orbit: Math.random() * 60 + 30,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      // Speed up factors based on authentication status or hovered panels
      let speedFactor = 1;
      if (isAuthenticating) speedFactor = 4;
      else if (hoveredSide) speedFactor = 1.8;

      rotation += 0.008 * speedFactor;

      // Pulse scaling logic
      pulseScale += 0.003 * pulseDir * speedFactor;
      if (pulseScale > 1.15) pulseDir = -1;
      if (pulseScale < 0.92) pulseDir = 1;

      // Draw background ambient HUD coordinate grids
      ctx.strokeStyle = "rgba(56, 189, 248, 0.02)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Outer Compass Frame Circles
      ctx.strokeStyle = hoveredSide ? "rgba(139, 92, 246, 0.12)" : "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120 * pulseScale, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating dashed digital rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // Dash circle 1 (Cyan/Teal)
      ctx.strokeStyle = isAuthenticating ? "rgba(34, 211, 238, 0.5)" : "rgba(56, 189, 248, 0.3)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, 90, 0, Math.PI * 2);
      ctx.stroke();

      // Dash circle 2 (Purple/Violet - opposite rotation)
      ctx.rotate(-rotation * 2);
      ctx.strokeStyle = hoveredSide === "right" ? "rgba(167, 139, 250, 0.35)" : "rgba(34, 211, 238, 0.2)";
      ctx.setLineDash([40, 15, 5, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.stroke();

      // Digital Tick marks inside compass
      ctx.rotate(rotation * 1.5);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.setLineDash([]);
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 75, Math.sin(angle) * 75);
        ctx.lineTo(Math.cos(angle) * 82, Math.sin(angle) * 82);
        ctx.stroke();
      }
      ctx.restore();

      // Concentric Security Pulse Beams (expanding circular sweeps)
      const shockwaveRadius = (Date.now() / 25 % 150);
      ctx.strokeStyle = isAuthenticating 
        ? `rgba(34, 211, 238, ${Math.max(0, 1 - shockwaveRadius / 150) * 0.6})`
        : `rgba(56, 189, 248, ${Math.max(0, 1 - shockwaveRadius / 150) * 0.25})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Security Radar Sweeper Ray
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation * 0.6);
      const radarGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
      radarGrad.addColorStop(0, "rgba(56, 189, 248, 0.12)");
      radarGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = radarGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 120, -0.25, 0.25);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Curved connection cables linking centerpiece to Left and Right panels
      const leftTargetX = 0;
      const leftTargetY = centerY;
      const rightTargetX = width;
      const rightTargetY = centerY;

      // Draw left path
      ctx.strokeStyle = hoveredSide === "left" || isAuthenticating 
        ? "rgba(34, 211, 238, 0.35)" 
        : "rgba(56, 189, 248, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - 40, centerY);
      ctx.bezierCurveTo(centerX - 80, centerY - 20, leftTargetX + 60, leftTargetY + 20, leftTargetX, leftTargetY);
      ctx.stroke();

      // Draw right path
      ctx.strokeStyle = hoveredSide === "right" || isAuthenticating 
        ? "rgba(139, 92, 246, 0.35)" 
        : "rgba(139, 92, 246, 0.1)";
      ctx.beginPath();
      ctx.moveTo(centerX + 40, centerY);
      ctx.bezierCurveTo(centerX + 80, centerY + 20, rightTargetX - 60, rightTargetY - 20, rightTargetX, rightTargetY);
      ctx.stroke();

      // Glowing data packets flowing along lines
      const flowT = (Date.now() / 2000) % 1;
      
      // Packet to Left
      const pLeftX = (1 - flowT) * (1 - flowT) * (centerX - 40) + 2 * (1 - flowT) * flowT * (centerX - 80) + flowT * flowT * leftTargetX;
      const pLeftY = (1 - flowT) * (1 - flowT) * centerY + 2 * (1 - flowT) * flowT * (centerY - 20) + flowT * flowT * leftTargetY;
      ctx.fillStyle = "#22d3ee";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#22d3ee";
      ctx.beginPath();
      ctx.arc(pLeftX, pLeftY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Packet to Right
      const pRightX = (1 - flowT) * (1 - flowT) * (centerX + 40) + 2 * (1 - flowT) * flowT * (centerX + 80) + flowT * flowT * rightTargetX;
      const pRightY = (1 - flowT) * (1 - flowT) * centerY + 2 * (1 - flowT) * flowT * (centerY + 20) + flowT * flowT * rightTargetY;
      ctx.fillStyle = "#c084fc";
      ctx.shadowColor = "#c084fc";
      ctx.beginPath();
      ctx.arc(pRightX, pRightY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Clean shadow states
      ctx.shadowBlur = 0;

      // Draw Orbiting Particles (Neural synapse points)
      particles.forEach((p, idx) => {
        p.angle += 0.008 * speedFactor;
        
        let orbitRadius = p.orbit * pulseScale;
        if (isHoveredRef.current) {
          const dx = mousePosRef.current.x;
          const dy = mousePosRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            orbitRadius += (dist - orbitRadius) * 0.05;
          }
        }

        const px = centerX + Math.cos(p.angle) * orbitRadius;
        const py = centerY + Math.sin(p.angle) * orbitRadius;

        // Draw radial link line
        ctx.strokeStyle = `rgba(56, 189, 248, ${p.alpha * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Node dot
        ctx.fillStyle = idx % 2 === 0 ? "rgba(34, 211, 238, 0.75)" : "rgba(167, 139, 250, 0.75)";
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central Shield Core (Double Hexagon wireframe & circles)
      ctx.strokeStyle = isAuthenticating ? "#22d3ee" : "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32 * pulseScale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24 * pulseScale, 0, Math.PI * 2);
      ctx.stroke();

      // Center glowing beacon
      ctx.fillStyle = isAuthenticating ? "#22d3ee" : "#38bdf8";
      ctx.shadowBlur = 12;
      ctx.shadowColor = isAuthenticating ? "#22d3ee" : "#38bdf8";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [hoveredSide, isAuthenticating]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[360px] flex items-center justify-center pointer-events-auto cursor-pointer"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 drop-shadow-[0_0_20px_rgba(56,189,248,0.12)]" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#050816]/75 border border-white/5 backdrop-blur-md px-3 py-1 rounded-full text-[0.52rem] font-mono-custom text-[#38bdf8] flex items-center gap-1.5 uppercase select-none tracking-widest shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
        Core_Synapse: online
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#050816]/75 border border-white/5 backdrop-blur-md px-3 py-1 rounded-full text-[0.52rem] font-mono-custom text-[#8b5cf6] flex items-center gap-1.5 uppercase select-none tracking-widest shadow-md">
        Shield: {isAuthenticating ? "decrypting" : "aes-256"}
      </div>
    </div>
  );
}

/* ─── Mock Resume Section Data ─── */
const RESUME_SECTIONS = [
  { key: "CORE_COMPILER_INFO", title: "Core Compiler Info" },
  { key: "NEURAL_PROJECTS", title: "Neural Projects" },
  { key: "EDUCATION_LOG", title: "Education Log" },
  { key: "SYSTEM_ROLES", title: "System Roles" }
];

const CREDENTIALS_LIST = [
  {
    id: 0,
    title: "CISCO SECURITY ACCREDITATION",
    desc: "Cisco verified network safety & secure communications protocols.",
    telemetry: "CRED_ID: CC-8742A | CRYPTO: AES-256 | NETWORK SAFETY: SECURE"
  },
  {
    id: 1,
    title: "IBM EMERGING AI & CLOUD ACCREDITATION",
    desc: "Cognitive cloud infrastructures, virtual clustering & LLM pipeline management.",
    telemetry: "CRED_ID: IBM-491F | COMPLIANCE: 99.8% | CLOUD NODES: ACTIVE"
  },
  {
    id: 2,
    title: "FULL-STACK WEB & ASYNCHRONOUS ARCHITECTURES",
    desc: "Multi-threaded server environments, low-latency rendering loops, reactive microservices.",
    telemetry: "ENG_ID: ARCH-88 | DEV_SPEED: HOT-REPLAY | THREADS: MULTI"
  },
  {
    id: 3,
    title: "B.TECH IT PROGRAM (MIT ACADEMY OF ENGINEERING)",
    desc: "Engineering algorithms, operational structures, and system security frameworks.",
    telemetry: "ACAD_ID: BTECH-IT | PERIOD: 2022-2026 | CGPA: 8.9 / 10"
  },
  {
    id: 4,
    title: "REAL-TIME PIPELINES (SOCKET.IO, FFMPEG ENGINES)",
    desc: "Pulsing multi-user syncing channels, low-latency audio/video multiplexing cores.",
    telemetry: "PIPE_ID: STREAM-3 | ASYNC_CORE: FFmpeg | LATENCY: 8ms"
  },
  {
    id: 5,
    title: "ENTERPRISE ROLE-BASED OPERATION FRAMEWORKS",
    desc: "Holographic multi-tenant authorization controls, secure RBAC routing gateways.",
    telemetry: "ROLE_ID: RBAC-ENT | LEVEL: SYNC-ROOT | SOC2: SHIELD-ON"
  }
];

export default function ResumeSection() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [hoveredCredIndex, setHoveredCredIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStage, setDownloadStage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTheme, setModalTheme] = useState<"cyber" | "classic">("classic");
  const [zoom, setZoom] = useState(1.0);
  const [resumeHeight, setResumeHeight] = useState<number | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Auto-calculate zoom for responsive fitting
  useEffect(() => {
    if (!isModalOpen) return;
    const handleResize = () => {
      const width = window.innerWidth;
      const padding = width < 768 ? 32 : 64;
      if (width < 900) {
        const targetScale = (width - padding) / 810;
        setZoom(Math.max(0.4, Math.min(targetScale, 1.0)));
      } else {
        setZoom(1.0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isModalOpen]);

  // Handle keydown shortcuts (Escape to close, Ctrl+D to download PDF)
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsModalOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        triggerHtml2PdfDownload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Measure natural unscaled height of resume sheet container
  useEffect(() => {
    if (isModalOpen && resumeRef.current) {
      const originalTransform = resumeRef.current.style.transform;
      resumeRef.current.style.transform = "none";
      const height = resumeRef.current.offsetHeight;
      setResumeHeight(height);
      resumeRef.current.style.transform = originalTransform;
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
      setModalTheme("classic");
    };
    window.addEventListener("open-resume-modal", handleOpenModal);
    return () => window.removeEventListener("open-resume-modal", handleOpenModal);
  }, []);

  // Suspend Lenis smooth scrolling and lock body overflow when fullscreen modal is active
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = (window as any).lenis;
    if (isModalOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handlePrintAction = () => {
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Live OCR parser state simulation
  const [parsingIndex, setParsingIndex] = useState(0);
  const parsingLogs = [
    { label: "CORE_COMPILER_INFO", status: "PARSING SKILLS... OK", code: "SYS.VEC_0" },
    { label: "NEURAL_PROJECTS", status: "EXTRAPOLATING PIPELINES... OK", code: "SYS.VEC_1" },
    { label: "EDUCATION_LOG", status: "ACADEMICS DECODED... OK", code: "SYS.VEC_2" },
    { label: "SYSTEM_ROLES", status: "ATS ALIGNMENT SYNC... 100%", code: "SYS.VEC_3" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setParsingIndex(prev => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Bottom live telemetry log stream
  const [logs, setLogs] = useState<string[]>(() => [
    "[SYS] INITIALIZING SECURE DOSSIS CONNECT...",
    "[AUTH] RESOLVING TELEMETRY ENVELOPE: yadav_telemetry.pdf",
    "[SYS] SECURE SHA-256 HASH VERIFICATION: COMPLETED",
    "[SEC] ENCRYPTION SHIELD: AES_256_GCM ACTIVE",
    "[ATS] COMPLIANCE SCORE CHECK: 100% SUCCESS"
  ]);

  useEffect(() => {
    const extraLogs = [
      "[SYS] SYSTEM DECODE CHANNEL ACTIVE",
      "[ATS] PARSING SKILLS: REACT.JS, NODE.JS, NEXT.JS, FASTAPI",
      "[SYS] PORTFOLIO VERSION 2.0 COMPILER STABLE",
      "[AUTH] SECURITY ENCRYPT ENVELOPE VERIFIED",
      "[SEC] RECRUITER CHANNEL SHIELD ENABLED",
      "[SYS] COMPILING RESUME EXPORT FOR DEPLOYMENT",
      "[ATS] KEYWORDS MATCHED: AI SYSTEMS, PIPELINES, TELEMETRY",
      "[SEC] VERIFICATION CERTIFICATE: ISSUED BY MULTI-SIGNATURE"
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const nextLogs = [...prev.slice(1)];
        const randomLog = extraLogs[Math.floor(Math.random() * extraLogs.length)];
        const time = new Date().toLocaleTimeString().split(" ")[0];
        nextLogs.push(`[${time}] ${randomLog}`);
        return nextLogs;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const triggerHtml2PdfDownload = () => {
    return new Promise<void>((resolve) => {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Ashu_Yadav_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      resolve();
    });
  };

  // Secure download progress compiler handler
  const handleSecureDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);

    const stages = [
      { progress: 0, text: "CONNECTING TO SECURE TELEMETRY GATE..." },
      { progress: 20, text: "DECRYPTING PRIVATE DOSSIER PAYLOAD..." },
      { progress: 50, text: "ATS COMPLIANCE VERIFICATION MATCH..." },
      { progress: 75, text: "GENERATING SHA-256 CRYPTO SIGNATURE..." },
      { progress: 95, text: "SYS_DECODE_SUCCESSFUL // REDIRECTING EXPORT..." }
    ];

    let currentStageIndex = 0;
    setDownloadStage(stages[0].text);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const nextProgress = prev + Math.floor(Math.random() * 4) + 2;

        if (currentStageIndex < stages.length - 1 && nextProgress >= stages[currentStageIndex + 1].progress) {
          currentStageIndex++;
          setDownloadStage(stages[currentStageIndex].text);
        }

        if (nextProgress >= 100) {
          clearInterval(interval);

          triggerHtml2PdfDownload().then(() => {
            setTimeout(() => {
              setIsDownloading(false);
              setDownloadProgress(0);
              setDownloadStage("");
            }, 1500);
          }).catch((err) => {
            console.error("Secure PDF compilation failed, falling back to static pdf", err);
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Ashu_Yadav_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
              setIsDownloading(false);
              setDownloadProgress(0);
              setDownloadStage("");
            }, 1500);
          });

          return 100;
        }
        return nextProgress;
      });
    }, 80);
  };

  return (
    <section id="resume" className="relative section-pad overflow-hidden bg-[#050816]/40">
      {/* ─── Layered Cinematic Background System ─── */}
      <div className="absolute inset-0 bg-[#050816]/70 pointer-events-none -z-20" />
      
      {/* Cyber grid layout */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none -z-20" 
      />

      {/* Floating high-tech glowing halos */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.03)_0%,transparent_75%)] blur-[80px] pointer-events-none -z-20 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.025)_0%,transparent_75%)] blur-[80px] pointer-events-none -z-20" />
      
      {/* Scanning overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-transparent to-[#050816] pointer-events-none -z-10" />

      <div className="relative z-10 container-xl">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            <span className="font-mono-custom tracking-[0.2em] text-[#38bdf8] text-xs">
              SYS.DOCS // EXPORT.05
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e8f0] to-[#94a3b8] uppercase font-display select-none">
            Credentials & <span className="gradient-text">Resume</span>
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* ─── Massive 3-Column Interactive Dashboard ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Column 1: Left Holographic Document Viewer (lg:grid-span-4) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
            onMouseEnter={() => setHoveredSide("left")}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div 
              onClick={() => {
                setIsModalOpen(true);
                setModalTheme("classic");
              }}
              className="relative group transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
            >
              <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/5 bg-[#040714]/80 shadow-[0_20px_50px_rgba(0,0,0,0.65)] p-0 z-10">
                {/* Sci-Fi HUD Coordinates and Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#38bdf8]/50 z-20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#38bdf8]/50 z-20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#38bdf8]/50 z-20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#38bdf8]/50 z-20" />

                {/* Laser scanline vertical beam overlay */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee]/80 to-transparent shadow-[0_0_15px_#22d3ee] z-20 pointer-events-none animate-[scanBeam_5s_infinite_ease-in-out]" />

                {/* Document Top Header Frame */}
                <div className="bg-white/4 border-b border-white/5 px-5 py-3 flex items-center justify-between select-none">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60" />
                  </div>
                  <div className="flex items-center gap-2 glass px-3 py-1 rounded-md border border-white/5">
                    <FileText size={11} className="text-[#38bdf8] animate-pulse" />
                    <span className="font-mono-custom text-[0.58rem] text-[#94a3b8]">yadav_telemetry.pdf</span>
                  </div>
                  <span className="text-[0.55rem] font-mono-custom text-[#38bdf8] font-bold tracking-widest animate-pulse">
                    100% SCAN
                  </span>
                </div>

                {/* Resume Virtual Document Layout */}
                <div className="p-6 space-y-6 select-none relative bg-gradient-to-b from-transparent to-[#050816]/40 min-h-[300px]">
                  {/* Name block */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0ea5e9]/10 to-[#8b5cf6]/10 border border-[#38bdf8]/50 flex items-center justify-center font-display font-black text-sm text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                      AY
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-mono-custom font-black tracking-wider uppercase">
                        Ashu Yadav
                      </h4>
                      <p className="text-[0.62rem] text-[#38bdf8] font-mono-custom mt-0.5 uppercase tracking-widest">
                        AI SYSTEM ENGINEER // INFRASTRUCTURE
                      </p>
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                      <div className="text-[0.52rem] font-mono-custom text-[#8b5cf6] border border-[#8b5cf6]/30 px-1.5 py-0.5 rounded uppercase">
                        VERIFIED_DOSS
                      </div>
                    </div>
                  </div>

                  {/* Dynamic OCR Indexing / Skill Extraction Overlay Panel */}
                  <div className="bg-[#050816]/80 border border-white/5 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-[0.52rem] font-mono-custom border-b border-white/5 pb-1.5">
                      <span className="text-[#94a3b8] flex items-center gap-1">
                        <Terminal size={10} className="text-[#38bdf8]" /> OCR DECODER SERVICE
                      </span>
                      <span className="text-emerald-400 font-bold animate-pulse">
                        {parsingLogs[parsingIndex].code}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono-custom">
                      <span className="text-white text-[0.68rem] tracking-tight">
                        {parsingLogs[parsingIndex].label}
                      </span>
                      <span className="text-cyan-400 text-[0.62rem] animate-pulse">
                        {parsingLogs[parsingIndex].status}
                      </span>
                    </div>
                    {/* Simulated process meter */}
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6]"
                        initial={{ width: "0%" }}
                        animate={{ width: ["15%", "90%", "30%", "100%", "0%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* Visual bullet entries representing scanned resume sections */}
                  <div className="space-y-4 pt-1">
                    {RESUME_SECTIONS.map((sec, idx) => {
                      const isVerified = parsingIndex >= idx;
                      return (
                        <div key={sec.key} className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono-custom text-[0.52rem] text-[#64748b]">
                              {sec.key}
                            </span>
                            <div className="flex-1 h-[1px] bg-white/5" />
                            {isVerified ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-1 text-[0.52rem] font-mono-custom text-emerald-400"
                              >
                                <CheckCircle size={8} className="text-emerald-400 animate-pulse" />
                                CHECK_OK
                              </motion.div>
                            ) : (
                              <span className="font-mono-custom text-[0.48rem] text-[#64748b] tracking-wider animate-pulse">
                                SCANNING_INIT...
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 pl-2">
                            <div className="h-1.5 w-full bg-white/5 rounded-sm overflow-hidden relative">
                              {isVerified && (
                                <motion.div 
                                  className="absolute inset-0 bg-[#38bdf8]/15"
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "0%" }}
                                  transition={{ duration: 0.5 }}
                                />
                              )}
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-sm overflow-hidden relative" style={{ width: idx % 2 === 0 ? "85%" : "70%" }}>
                              {isVerified && (
                                <motion.div 
                                  className="absolute inset-0 bg-[#8b5cf6]/15"
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "0%" }}
                                  transition={{ duration: 0.6 }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Holographic Mouse Overlay Spotlight */}
                <div className="absolute inset-0 bg-[#040714]/85 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none select-none z-30">
                  <div className="text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/35 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(56,189,248,0.25)] animate-bounce">
                      <Eye className="text-[#38bdf8] animate-pulse" size={24} />
                    </div>
                    <p className="text-white text-xs font-mono-custom uppercase font-bold tracking-widest">
                      INITIALIZE DUAL-MODE RESUME
                    </p>
                    <p className="text-[0.62rem] text-cyan-400 font-mono-custom mt-1 animate-pulse">
                      ✦ CLICK TO LAUNCH LIVE DOSSIER MODAL ✦
                    </p>
                  </div>
                </div>
              </div>

              {/* Holographic frame halo */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[#38bdf8]/10 to-[#8b5cf6]/10 rounded-3xl blur-2xl -z-10 group-hover:from-[#38bdf8]/15 group-hover:to-[#8b5cf6]/15 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Column 2: Centerpiece AI Authentication Core (lg:grid-span-4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[360px] cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
              setModalTheme("classic");
            }}
          >
            <AuthCoreCanvas hoveredSide={hoveredSide} isAuthenticating={isDownloading} />
          </motion.div>

          {/* Column 3: Right AI Telemetry & Credentials Terminal (lg:grid-span-4) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
            onMouseEnter={() => setHoveredSide("right")}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div className="glass-strong rounded-3xl p-6 border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.55)] bg-[#040714]/85 relative">
              {/* Sci-Fi HUD Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

              {/* Title & Trust Score Flex Layout */}
              <div className="flex items-center justify-between mb-6 select-none border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/35 flex items-center justify-center shadow-[inset_0_0_10px_rgba(56,189,248,0.2)]">
                    <ShieldCheck size={18} className="text-[#38bdf8] flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-sm uppercase font-display tracking-wide">
                      AI System Telemetry
                    </h3>
                    <p className="font-mono-custom text-[0.58rem] text-[#94a3b8] uppercase tracking-wider mt-0.5">
                      Identity Node: Verified
                    </p>
                  </div>
                </div>

                {/* Exquisite Trust Score gauge widget */}
                <div className="flex flex-col items-center">
                  <div className="relative w-12 h-12 flex items-center justify-center bg-[#050816] rounded-full border border-white/5">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        className="stroke-white/5 fill-none"
                        strokeWidth="2.5"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        className="stroke-[#38bdf8] fill-none"
                        strokeWidth="2.5"
                        strokeDasharray={2 * Math.PI * 20}
                        initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - 0.992) }}
                        transition={{ duration: 2, delay: 0.5 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-mono-custom text-[0.62rem] text-white font-bold tracking-tighter">
                      99.2%
                    </span>
                  </div>
                  <span className="font-mono-custom text-[0.42rem] text-[#10b981] uppercase tracking-widest mt-1">
                    Trust_score
                  </span>
                </div>
              </div>

              {/* Verified Credentials Diagnostic Rows */}
              <div className="space-y-2 mb-6">
                <span className="text-[0.55rem] font-mono-custom text-[#64748b] uppercase tracking-[0.18em] block select-none">
                  [ CREDENTIAL_ARCHIVE_VERIFIED ]
                </span>
                
                <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                  {CREDENTIALS_LIST.map((cred) => (
                    <div 
                      key={cred.id} 
                      className="group/item flex flex-col px-3.5 py-2.5 rounded-xl bg-[#050816] border border-white/5 hover:border-[#38bdf8]/30 transition-all duration-300 relative cursor-pointer select-none"
                      onMouseEnter={() => setHoveredCredIndex(cred.id)}
                      onMouseLeave={() => setHoveredCredIndex(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[0.68rem] text-white font-mono-custom font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
                          <span className="truncate max-w-[180px] group-hover/item:text-[#38bdf8] transition-colors duration-200">
                            {cred.title}
                          </span>
                        </div>
                        <span className="text-[0.48rem] font-mono-custom text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 rounded-sm">
                          SECURE
                        </span>
                      </div>
                      <p className="text-[0.58rem] text-[#64748b] font-mono-custom mt-1 truncate">
                        {cred.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Telemetry Diagnostics Box */}
              <div className="mb-6 bg-[#03050c] border border-white/5 rounded-xl p-3.5 min-h-[70px] flex flex-col justify-center select-none relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded-bl font-mono-custom text-[0.48rem] uppercase tracking-wider">
                  Telemetry Readout
                </div>
                <AnimatePresence mode="wait">
                  {hoveredCredIndex !== null ? (
                    <motion.div
                      key={hoveredCredIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono-custom text-[0.58rem] text-[#38bdf8] space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <Cpu size={11} className="text-[#38bdf8] animate-pulse" />
                        ACTIVE_DIAGNOSTICS:
                      </div>
                      <div className="text-white leading-relaxed tracking-wide font-medium font-mono-custom break-all">
                        {CREDENTIALS_LIST[hoveredCredIndex].telemetry}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono-custom text-[0.58rem] text-[#64748b] space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#38bdf8] animate-ping" />
                        SYSTEM RESOLVER STATUS: STABLE
                      </div>
                      <div className="text-[#475569] leading-relaxed italic">
                        Hover verified credentials on the list above to project active neural registers.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ─── Premium Holographic Export Action Button ─── */}
              <div className="flex flex-col gap-3">
                <div className="relative">
                  {isDownloading && (
                    <div className="absolute inset-0 bg-[#040714] border border-cyan-500/40 rounded-xl z-20 flex flex-col justify-center px-4">
                      <div className="flex justify-between items-center text-[0.58rem] font-mono-custom text-cyan-400 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Lock size={10} className="text-cyan-400 animate-pulse" />
                          {downloadStage}
                        </span>
                        <span className="font-bold">{downloadProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-[#8b5cf6] shadow-[0_0_10px_#22d3ee]"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <motion.button
                    onClick={handleSecureDownload}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono-custom font-bold tracking-widest text-[0.65rem] bg-gradient-to-r from-[#0ea5e9]/90 to-[#8b5cf6]/90 text-white hover:from-[#0ea5e9] hover:to-[#8b5cf6] border border-white/10 hover:border-[#38bdf8]/40 shadow-[0_8px_30px_rgba(14,165,233,0.25)] select-none cursor-pointer relative overflow-hidden group/btn"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    {/* Premium border tracing neon effect */}
                    <span className="absolute inset-0 border border-transparent group-hover/btn:border-cyan-400/20 rounded-xl pointer-events-none transition-colors duration-300" />
                    
                    {/* Dynamic light sweep effect */}
                    <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[30deg] group-hover/btn:animate-[shimmer_1.5s_infinite_linear]" style={{ transition: "all 0.5s" }} />

                    <Download size={13} className={isDownloading ? "animate-spin text-cyan-400" : ""} />
                    SYSTEM_EXPORT_PDF // LOAD.v2 ✦
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => {
                    setIsModalOpen(true);
                    setModalTheme("classic");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono-custom font-bold tracking-widest text-[0.65rem] bg-transparent hover:bg-white/5 text-cyan-400 border border-cyan-400/30 hover:border-cyan-400/70 select-none cursor-pointer relative overflow-hidden group/view-btn shadow-[0_4px_20px_rgba(34,211,238,0.1)]"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                >
                  <Eye size={13} className="group-hover/view-btn:animate-pulse" />
                  LAUNCH_VIRTUAL_TERMINAL // VIEW.v2 ✦
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─── Bottom Telemetry status Grid Panel ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5"
        >
          {/* Diagnostic variables indicators (Span 5) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3.5 select-none">
            {[
              { icon: Clock, label: "RESP_LATENCY", val: "< 12 HOURS", glow: "text-emerald-400" },
              { icon: FileCheck, label: "ATS_STANDARD", val: "100% COMPLIANT", glow: "text-cyan-400" },
              { icon: Activity, label: "OPER_CAPACITY", val: "IMMEDIATE", glow: "text-purple-400 animate-pulse" },
            ].map(({ icon: Icon, label, val, glow }) => (
              <div
                key={label}
                className="glass rounded-2xl p-4 border border-white/5 bg-[#040714]/60 flex flex-col items-center text-center shadow-md justify-between transition-all duration-300 hover:border-white/10"
              >
                <Icon size={15} className="text-[#38bdf8] mb-1.5 animate-pulse" />
                <span className="font-mono-custom text-[0.52rem] text-[#64748b] tracking-wider uppercase block">
                  {label}
                </span>
                <span className={`text-[0.62rem] font-mono-custom font-bold tracking-tight mt-1.5 truncate max-w-full ${glow}`}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Runtime Cryptographic Export Logs Buffer Stream (Span 7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-[#03050c]/90 border border-white/5 rounded-2xl p-4 shadow-inner flex flex-col h-full justify-between">
              {/* Log Header */}
              <div className="flex items-center justify-between text-[0.52rem] font-mono-custom text-[#64748b] border-b border-white/5 pb-2 mb-2 select-none">
                <span className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-cyan-400 animate-pulse" />
                  RUNTIME CRYPTOGRAPHIC OPERATIONS STREAM
                </span>
                <span className="text-cyan-500/60 font-bold uppercase tracking-widest">
                  Active_logs_buffer: v2.0
                </span>
              </div>
              
              {/* Dynamic logs display */}
              <div className="space-y-1.5 font-mono-custom text-[0.58rem] text-slate-400 overflow-hidden select-none min-h-[90px] flex flex-col justify-end">
                {logs.map((log, index) => {
                  let colorClass = "text-slate-400";
                  if (log.includes("[SYS]")) colorClass = "text-cyan-400/95";
                  else if (log.includes("[SEC]")) colorClass = "text-yellow-400/95";
                  else if (log.includes("[AUTH]")) colorClass = "text-purple-400/95";
                  else if (log.includes("[ATS]")) colorClass = "text-emerald-400/95";

                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: index === logs.length - 1 ? [0, 1] : 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-2 items-center leading-tight truncate ${colorClass}`}
                    >
                      <span className="text-[0.5rem] text-slate-600 font-normal select-none">❯</span>
                      <span className="font-mono-custom select-text">{log}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ─── Fullscreen High-Security Resume Modal ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="print-resume-modal fixed inset-0 z-[9999] overflow-hidden flex flex-col justify-start items-center"
          >
            {/* Cinematic background layers */}
            <div className="absolute inset-0 bg-[#03050c]/90 backdrop-blur-xl -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#03050c_90%)] -z-10" />
            <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+Cjwvc3ZnPg==')] pointer-events-none -z-10" />
            
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "2s" }} />

            {/* Premium Document Toolbar */}
            <div className="w-full max-w-[850px] bg-[#0a0f24]/80 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none no-print shadow-[0_15px_40px_rgba(0,0,0,0.5)] z-20 mx-4">
              {/* Left section: Identity & Badge */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]">
                  <FileText size={16} />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-extrabold text-xs tracking-wide font-sans flex items-center gap-2">
                    Ashu Yadav - Resume
                    <span className="flex items-center gap-0.5 text-[8px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-md font-bold font-sans">
                      <ShieldCheck size={8} className="text-emerald-400" /> ATS VERIFIED
                    </span>
                  </h4>
                  <p className="text-[10px] text-[#64748b] font-sans mt-0.5">
                    Times New Roman • 810px Academic Standard
                  </p>
                </div>
              </div>

              {/* Center section: Custom Professional Zoom controls */}
              <div className="flex items-center gap-2.5 bg-[#03050c]/80 border border-white/5 px-3 py-1.5 rounded-xl text-xs text-white">
                <button 
                  onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.4))}
                  className="p-1 rounded hover:bg-white/5 active:scale-95 transition-all cursor-pointer text-slate-400 hover:text-white"
                  title="Zoom Out"
                >
                  <Minus size={13} />
                </button>
                <span 
                  onClick={() => {
                    const width = window.innerWidth;
                    const padding = width < 768 ? 32 : 64;
                    if (width < 900) {
                      const targetScale = (width - padding) / 810;
                      setZoom(Math.max(0.4, Math.min(targetScale, 1.0)));
                    } else {
                      setZoom(1.0);
                    }
                  }}
                  className="font-mono-custom text-[11px] min-w-[36px] text-center text-slate-300 font-bold select-none cursor-pointer hover:text-white" 
                  title="Reset Zoom"
                >
                  {Math.round(zoom * 100)}%
                </span>
                <button 
                  onClick={() => setZoom(prev => Math.min(prev + 0.1, 1.6))}
                  className="p-1 rounded hover:bg-white/5 active:scale-95 transition-all cursor-pointer text-slate-400 hover:text-white"
                  title="Zoom In"
                >
                  <Plus size={13} />
                </button>
                <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
                <span className="font-sans text-[10px] text-slate-400 flex items-center gap-1 font-bold">
                  Page 1 of 1
                </span>
              </div>

              {/* Right section: Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintAction}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                  title="Print Document"
                >
                  <Printer size={13} />
                </button>
                <button
                  onClick={triggerHtml2PdfDownload}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 font-sans"
                >
                  <Download size={12} />
                  Download
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                  title="Open in New Tab"
                >
                  <ExternalLink size={13} />
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/20 flex items-center justify-center transition-all cursor-pointer"
                  title="Close Viewer"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Document Viewer Viewport Area */}
            <div className="flex-1 w-full overflow-y-auto px-4 py-8 flex justify-center items-start custom-scrollbar">
              
              {/* Floating realistic paper wrapper */}
              <motion.div 
                initial={{ y: 20, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 20, scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="w-full overflow-visible flex justify-center items-start pb-20"
                style={{
                  height: resumeHeight ? `${resumeHeight * zoom + 100}px` : "auto",
                  minHeight: resumeHeight ? `${resumeHeight * zoom + 100}px` : "auto",
                  overflow: "visible",
                  transition: "height 0.15s ease-out"
                }}
              >
                <div 
                  ref={resumeRef}
                  id="printable-resume-modal" 
                  className="bg-white text-black pt-12 px-12 pb-24 shadow-[0_30px_70px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.15)] select-text font-serif leading-snug text-[13px] border border-gray-200/50 rounded-lg"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    backgroundColor: "white",
                    color: "black",
                    width: "810px",
                    minWidth: "810px",
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                    transition: "transform 0.15s ease-out",
                    boxSizing: "border-box"
                  }}
                >
                  {/* Candidates Name Header */}
                  <div className="text-center">
                    <h1 className="text-3xl font-normal tracking-wide uppercase m-0 p-0 text-black font-serif">
                      ASHU YADAV
                    </h1>
                    
                    {/* Centered Contacts details */}
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11.5px] text-black mt-3.5 font-serif select-all">
                      <span className="flex items-center text-black">
                        <MapPin size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> Pune
                      </span>
                      <a href="mailto:ashuya38@gmail.com" className="flex items-center text-black hover:underline">
                        <Mail size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> ashuya38@gmail.com
                      </a>
                      <span className="flex items-center text-black">
                        <Phone size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> +919371493956
                      </span>
                      <a href="https://github.com/ashuyadav180" target="_blank" rel="noopener noreferrer" className="flex items-center text-black hover:underline">
                        <ExternalLink size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> https://github.com/ashuyadav180
                      </a>
                    </div>
                    <div className="flex items-center justify-center text-[11.5px] text-black mt-1.5 font-serif select-all">
                      <a href="https://www.linkedin.com/in/ashu-yadav-843a85277" target="_blank" rel="noopener noreferrer" className="flex items-center text-black hover:underline">
                        <span className="bg-black text-white px-0.5 rounded text-[8px] font-sans font-bold mr-1 inline-flex items-center justify-center w-3.5 h-3.5 align-middle" style={{ borderRadius: "1.5px" }}>in</span>
                        https://www.linkedin.com/in/ashu-yadav-843a85277
                      </a>
                    </div>
                    <hr className="border-t border-black mt-4 mb-2" style={{ borderColor: "black" }} />
                  </div>

                  {/* EDUCATION SECTION */}
                  <div className="mt-5">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
                      EDUCATION
                    </h3>
                    <div className="space-y-3.5 font-serif text-[12.5px] text-black">
                      <div className="flex justify-between items-baseline text-black font-serif">
                        <div>
                          <strong className="font-bold text-[13px]">MIT Academy of Engineering, Pune</strong>
                          <span className="block text-[12px] mt-0.5 text-black font-serif">B.Tech. - Information Technology | CGPA: 7.73 / 10</span>
                        </div>
                        <span className="font-normal text-[12px] text-black font-serif">2024 - 2028</span>
                      </div>

                      <div className="flex justify-between items-baseline text-black font-serif">
                        <div>
                          <strong className="font-bold text-[13px]">Shri shivji junior college</strong>
                          <span className="block text-[12px] mt-0.5 text-black font-serif">12th | Percentage: 65.83 / 100</span>
                        </div>
                        <span className="font-normal text-[12px] text-black font-serif">2024</span>
                      </div>

                      <div className="flex justify-between items-baseline text-black font-serif">
                        <div>
                          <strong className="font-bold text-[13px]">Sunrise english medium school</strong>
                          <span className="block text-[12px] mt-0.5 text-black font-serif">10th | Percentage: 92.80 / 100</span>
                        </div>
                        <span className="font-normal text-[12px] text-black font-serif">2022</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

                  {/* PROJECTS SECTION */}
                  <div className="mt-5">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 text-black font-serif">
                        PROJECTS
                      </h3>
                      <span className="font-bold text-[12px] text-black font-serif uppercase">JAN 2026 - MAR 2026</span>
                    </div>

                    <div className="space-y-4 font-serif text-[12.5px] text-black">
                      <div>
                        <div className="text-black font-serif">
                          <strong className="font-bold text-[13px] font-serif">AUTOREEL..AI</strong>
                          <span className="font-normal text-[12px] ml-1.5 text-black font-serif">| React.js, Node.js, Python, FastAPI, Google Gemini, Stability AI, RunwayML, ElevenLabs, FFmpeg</span>
                        </div>
                        <a href="https://github.com/ashuyadav180" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-800 underline text-[11px] mt-0.5 font-serif">
                          Github ↗
                        </a>
                        <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-black font-serif text-[12px] leading-relaxed">
                          <li>Built a full-stack AI video generation platform that automated the entire content pipeline from script creation, voice synthesis, image generation, video assembly, subtitle generation, to one-click publishing.</li>
                          <li>Architected an 8-stage microservice pipeline using Python and FastAPI, orchestrated by a Node.js backend with REST APIs and Socket.IO for reliable end-to-end workflow execution.</li>
                          <li>Integrated 6 major AI services including Google Gemini, Anthropic Claude, Stability AI, RunwayML, ElevenLabs, and Whisper to power multimodal content generation across text, audio, image, and video.</li>
                          <li>Implemented real-time WebSocket-based job tracking, enabling the React frontend to display live pipeline progress, status updates, and system events without polling.</li>
                          <li>Developed SaaS platform features including a video library, analytics dashboard using Chart.js, system health monitoring, and automated YouTube Shorts publishing via OAuth2 and YouTube Data API v3.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline text-black font-serif">
                          <div>
                            <strong className="font-bold text-[13px] font-serif">Medical Store Management System</strong>
                            <span className="font-normal text-[12px] ml-1.5 text-black font-serif">| React.js, Node.js, Express.js, MongoDB, Socket.IO, Firebase</span>
                          </div>
                          <span className="font-bold text-[12px] text-black font-serif uppercase whitespace-nowrap ml-4">OCT 2025 - DEC 2025</span>
                        </div>
                        <a href="https://github.com/ashuyadav180" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-800 underline text-[11px] mt-0.5 font-serif">
                          Github ↗
                        </a>
                        <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-black font-serif text-[12px] leading-relaxed">
                          <li>Built a full-stack pharmacy management platform with separate dashboards for customers, admins, and delivery personnel, covering medicine ordering, prescription verification, and delivery workflow.</li>
                          <li>Implemented real-time order tracking with Socket.IO, prescription upload via Cloudinary, secure JWT + Firebase auth, and automated email/WhatsApp notification pipelines.</li>
                          <li>Designed role-based access control across 3 user roles with analytics and inventory reporting for the admin dashboard.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

                  {/* TECHNICAL SKILLS SECTION */}
                  <div className="mt-5 font-serif">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
                      TECHNICAL SKILLS
                    </h3>
                    <div className="space-y-1 text-[12.5px] text-black font-serif leading-relaxed">
                      <div className="font-serif"><strong className="font-bold font-serif text-black">Programming Languages:</strong> Java, C++, C, Python</div>
                      <div className="font-serif"><strong className="font-bold font-serif text-black">Frontend:</strong> React.js, Vite, HTML5, CSS3, JavaScript (ES6+), Responsive Design, Socket.IO</div>
                      <div className="font-serif"><strong className="font-bold font-serif text-black">Backend:</strong> Node.js, Express.js, Python, FastAPI, REST APIs, JWT Authentication, OAuth2, Microservices</div>
                      <div className="font-serif"><strong className="font-bold font-serif text-black">Databases:</strong> MongoDB, SQLite, Firebase Firestore</div>
                      <div className="font-serif"><strong className="font-bold font-serif text-black">AI / APIs:</strong> OpenAI, Google Gemini, Stability AI SDXL, RunwayML, ElevenLabs TTS, Cloudinary, YouTube Data API</div>
                      <div className="font-serif"><strong className="font-bold font-serif text-black">Developer Tools:</strong> Git, GitHub, VS Code, FFmpeg, Postman</div>
                    </div>
                  </div>

                  <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

                  {/* CERTIFICATIONS / ACHIVEMENTS SECTION */}
                  <div className="mt-5 font-serif">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
                      CERTIFICATIONS / ACHIVEMENTS
                    </h3>
                    <ul className="list-none pl-0 space-y-3.5 text-[12.5px] text-black font-serif">
                      <li className="relative pl-5">
                        <span className="absolute left-0 top-0.5 text-black font-serif text-sm">•</span>
                        <div className="flex justify-between items-baseline w-full">
                          <strong className="font-bold text-black font-serif text-[13px]">Cybersecurity – Virtual Internship</strong>
                          <span className="font-normal text-[12px] text-black font-serif whitespace-nowrap ml-4">June–August 2025</span>
                        </div>
                        <span className="block text-[12px] mt-0.5 text-black font-serif">Cisco Networking Academy | AICTE | Skill India</span>
                      </li>
                      <li className="relative pl-5">
                        <span className="absolute left-0 top-0.5 text-black font-serif text-sm">•</span>
                        <div className="flex justify-between items-baseline w-full">
                          <strong className="font-bold text-black font-serif text-[13px]">Emerging Technologies (AI & Cloud) – Internship</strong>
                          <span className="font-normal text-[12px] text-black font-serif whitespace-nowrap ml-4">July–August 2025</span>
                        </div>
                        <span className="block text-[12px] mt-0.5 text-black font-serif">Edunet Foundation | AICTE | IBM SkillsBuild</span>
                      </li>
                    </ul>
                  </div>

                  <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

                  {/* EXTRA-CURRICULAR ACTIVITIES SECTION */}
                  <div className="mt-5 font-serif">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
                      EXTRA-CURRICULAR ACTIVITIES
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-[12.5px] text-black font-serif leading-relaxed">
                      <li>Actively building and deploying full-stack projects to strengthen real-world development and problem-solving skills.</li>
                      <li>Exploring AI/ML tools and APIs to stay current with advances in generative AI and automation technology.</li>
                      <li>Reading technical content and documentation to continuously improve knowledge across frontend, backend, and cloud domains.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Premium Floating Download FAB */}
            <div className="fixed bottom-8 right-8 z-40 no-print">
              <button
                onClick={triggerHtml2PdfDownload}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3.5 rounded-full shadow-[0_12px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.5)] border border-blue-400/20 transition-all duration-300 font-sans text-xs font-black uppercase tracking-wider scale-100 hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <Download size={13} className="animate-pulse" />
                Download Resume PDF
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden off-screen resume container for background PDF compilation */}
      <div className="absolute left-[-9999px] top-[-9999px] overflow-hidden no-print" aria-hidden="true">
        <div 
          id="offscreen-printable-resume" 
          className="bg-white text-black pt-12 px-12 pb-32 font-serif leading-snug text-[13.5px]"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            backgroundColor: "white",
            color: "black",
            width: "800px",
            minWidth: "800px"
          }}
        >
          {/* Candidates Name Header */}
          <div className="text-center">
            <h1 className="text-3xl font-normal tracking-wide uppercase m-0 p-0 text-black font-serif">
              ASHU YADAV
            </h1>
            
            {/* Centered Contacts details */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11.5px] text-black mt-3.5 font-serif select-all">
              <span className="flex items-center text-black">
                <MapPin size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> Pune
              </span>
              <a href="mailto:ashuya38@gmail.com" className="flex items-center text-black hover:underline">
                <Mail size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> ashuya38@gmail.com
              </a>
              <span className="flex items-center text-black">
                <Phone size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> +919371493956
              </span>
              <a href="https://github.com/ashuyadav180" target="_blank" rel="noopener noreferrer" className="flex items-center text-black hover:underline">
                <ExternalLink size={11} className="mr-1 text-black inline align-middle" strokeWidth={2} /> https://github.com/ashuyadav180
              </a>
            </div>
            <div className="flex items-center justify-center text-[11.5px] text-black mt-1.5 font-serif select-all">
              <a href="https://www.linkedin.com/in/ashu-yadav-843a85277" target="_blank" rel="noopener noreferrer" className="flex items-center text-black hover:underline">
                <span className="bg-black text-white px-0.5 rounded text-[8px] font-sans font-bold mr-1 inline-flex items-center justify-center w-3.5 h-3.5 align-middle" style={{ borderRadius: "1.5px" }}>in</span>
                https://www.linkedin.com/in/ashu-yadav-843a85277
              </a>
            </div>
            <hr className="border-t border-black mt-4 mb-2" style={{ borderColor: "black" }} />
          </div>

          {/* EDUCATION SECTION */}
          <div className="mt-5">
            <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
              EDUCATION
            </h3>
            <div className="space-y-3.5 font-serif text-[12.5px] text-black">
              <div className="flex justify-between items-baseline text-black font-serif">
                <div>
                  <strong className="font-bold text-[13px]">MIT Academy of Engineering, Pune</strong>
                  <span className="block text-[12px] mt-0.5 text-black font-serif">B.Tech. - Information Technology | CGPA: 7.73 / 10</span>
                </div>
                <span className="font-normal text-[12px] text-black font-serif">2024 - 2028</span>
              </div>

              <div className="flex justify-between items-baseline text-black font-serif">
                <div>
                  <strong className="font-bold text-[13px]">Shri shivji junior college</strong>
                  <span className="block text-[12px] mt-0.5 text-black font-serif">12th | Percentage: 65.83 / 100</span>
                </div>
                <span className="font-normal text-[12px] text-black font-serif">2024</span>
              </div>

              <div className="flex justify-between items-baseline text-black font-serif">
                <div>
                  <strong className="font-bold text-[13px]">Sunrise english medium school</strong>
                  <span className="block text-[12px] mt-0.5 text-black font-serif">10th | Percentage: 92.80 / 100</span>
                </div>
                <span className="font-normal text-[12px] text-black font-serif">2022</span>
              </div>
            </div>
          </div>

          <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

          {/* PROJECTS SECTION */}
          <div className="mt-5">
            <div className="flex justify-between items-baseline mb-3">
              <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 text-black font-serif">
                PROJECTS
              </h3>
              <span className="font-bold text-[12px] text-black font-serif uppercase">JAN 2026 - MAR 2026</span>
            </div>

            <div className="space-y-4 font-serif text-[12.5px] text-black">
              <div>
                <div className="text-black font-serif">
                  <strong className="font-bold text-[13px] font-serif">AUTOREEL..AI</strong>
                  <span className="font-normal text-[12px] ml-1.5 text-black font-serif">| React.js, Node.js, Python, FastAPI, Google Gemini, Stability AI, RunwayML, ElevenLabs, FFmpeg</span>
                </div>
                <a href="https://github.com/ashuyadav180" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-800 underline text-[11px] mt-0.5 font-serif">
                  Github ↗
                </a>
                <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-black font-serif text-[12px] leading-relaxed">
                  <li>Built a full-stack AI video generation platform that automated the entire content pipeline from script creation, voice synthesis, image generation, video assembly, subtitle generation, to one-click publishing.</li>
                  <li>Architected an 8-stage microservice pipeline using Python and FastAPI, orchestrated by a Node.js backend with REST APIs and Socket.IO for reliable end-to-end workflow execution.</li>
                  <li>Integrated 6 major AI services including Google Gemini, Anthropic Claude, Stability AI, RunwayML, ElevenLabs, and Whisper to power multimodal content generation across text, audio, image, and video.</li>
                  <li>Implemented real-time WebSocket-based job tracking, enabling the React frontend to display live pipeline progress, status updates, and system events without polling.</li>
                  <li>Developed SaaS platform features including a video library, analytics dashboard using Chart.js, system health monitoring, and automated YouTube Shorts publishing via OAuth2 and YouTube Data API v3.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-black font-serif">
                  <div>
                    <strong className="font-bold text-[13px] font-serif">Medical Store Management System</strong>
                    <span className="font-normal text-[12px] ml-1.5 text-black font-serif">| React.js, Node.js, Express.js, MongoDB, Socket.IO, Firebase</span>
                  </div>
                  <span className="font-bold text-[12px] text-black font-serif uppercase whitespace-nowrap ml-4">OCT 2025 - DEC 2025</span>
                </div>
                <a href="https://github.com/ashuyadav180" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-800 underline text-[11px] mt-0.5 font-serif">
                  Github ↗
                </a>
                <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-black font-serif text-[12px] leading-relaxed">
                  <li>Built a full-stack pharmacy management platform with separate dashboards for customers, admins, and delivery personnel, covering medicine ordering, prescription verification, and delivery workflow.</li>
                  <li>Implemented real-time order tracking with Socket.IO, prescription upload via Cloudinary, secure JWT + Firebase auth, and automated email/WhatsApp notification pipelines.</li>
                  <li>Designed role-based access control across 3 user roles with analytics and inventory reporting for the admin dashboard.</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

          {/* TECHNICAL SKILLS SECTION */}
          <div className="mt-5 font-serif">
            <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
              TECHNICAL SKILLS
            </h3>
            <div className="space-y-1 text-[12.5px] text-black font-serif leading-relaxed">
              <div className="font-serif"><strong className="font-bold font-serif text-black">Programming Languages:</strong> Java, C++, C, Python</div>
              <div className="font-serif"><strong className="font-bold font-serif text-black">Frontend:</strong> React.js, Vite, HTML5, CSS3, JavaScript (ES6+), Responsive Design, Socket.IO</div>
              <div className="font-serif"><strong className="font-bold font-serif text-black">Backend:</strong> Node.js, Express.js, Python, FastAPI, REST APIs, JWT Authentication, OAuth2, Microservices</div>
              <div className="font-serif"><strong className="font-bold font-serif text-black">Databases:</strong> MongoDB, SQLite, Firebase Firestore</div>
              <div className="font-serif"><strong className="font-bold font-serif text-black">AI / APIs:</strong> OpenAI, Google Gemini, Stability AI SDXL, RunwayML, ElevenLabs TTS, Cloudinary, YouTube Data API</div>
              <div className="font-serif"><strong className="font-bold font-serif text-black">Developer Tools:</strong> Git, GitHub, VS Code, FFmpeg, Postman</div>
            </div>
          </div>

          <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

          {/* CERTIFICATIONS / ACHIVEMENTS SECTION */}
          <div className="mt-5 font-serif">
            <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
              CERTIFICATIONS / ACHIVEMENTS
            </h3>
            <ul className="list-none pl-0 space-y-3.5 text-[12.5px] text-black font-serif">
              <li className="relative pl-5">
                <span className="absolute left-0 top-0.5 text-black font-serif text-sm">•</span>
                <div className="flex justify-between items-baseline w-full">
                  <strong className="font-bold text-black font-serif text-[13px]">Cybersecurity – Virtual Internship</strong>
                  <span className="font-normal text-[12px] text-black font-serif whitespace-nowrap ml-4">June–August 2025</span>
                </div>
                <span className="block text-[12px] mt-0.5 text-black font-serif">Cisco Networking Academy | AICTE | Skill India</span>
              </li>
              <li className="relative pl-5">
                <span className="absolute left-0 top-0.5 text-black font-serif text-sm">•</span>
                <div className="flex justify-between items-baseline w-full">
                  <strong className="font-bold text-black font-serif text-[13px]">Emerging Technologies (AI & Cloud) – Internship</strong>
                  <span className="font-normal text-[12px] text-black font-serif whitespace-nowrap ml-4">July–August 2025</span>
                </div>
                <span className="block text-[12px] mt-0.5 text-black font-serif">Edunet Foundation | AICTE | IBM SkillsBuild</span>
              </li>
            </ul>
          </div>

          <hr className="border-t border-black my-5" style={{ borderColor: "black" }} />

          {/* EXTRA-CURRICULAR ACTIVITIES SECTION */}
          <div className="mt-5 font-serif">
            <h3 className="text-[14px] font-bold uppercase tracking-wider m-0 mb-3 text-black font-serif">
              EXTRA-CURRICULAR ACTIVITIES
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-[12.5px] text-black font-serif leading-relaxed">
              <li>Actively building and deploying full-stack projects to strengthen real-world development and problem-solving skills.</li>
              <li>Exploring AI/ML tools and APIs to stay current with advances in generative AI and automation technology.</li>
              <li>Reading technical content and documentation to continuously improve knowledge across frontend, backend, and cloud domains.</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        /* Scanbeam Animation keyframes */
        @keyframes scanBeam {
          0% { top: 0%; opacity: 0.3; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.3; }
        }

        /* Shimmer effect for premium buttons */
        @keyframes shimmer {
          100% {
            left: 125%;
          }
        }

        /* Customize scrollbars for the telemetry panel */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.15);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 189, 248, 0.3);
        }

        /* Keyframe for card glow pulse */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.05); }
          50% { box-shadow: 0 0 25px rgba(56, 189, 248, 0.15); }
        }

        /* Print Mode CSS Interceptor Stylesheet */
        @media print {
          /* Hide all other sections in page layout */
          main > div > *:not(#resume) {
            display: none !important;
          }
          main > *:not(.relative) {
            display: none !important;
          }
          
          /* Hide all sibling elements of the modal within the #resume section */
          #resume > *:not(.print-resume-modal) {
            display: none !important;
          }

          /* Hide controls header inside the modal during printing */
          .no-print {
            display: none !important;
          }

          /* Remove global page styling limits to match classic A4 print preview */
          body, html, main, #resume, .print-resume-modal {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            height: auto !important;
            min-height: 100% !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            overflow: visible !important;
            backdrop-filter: none !important;
          }

          /* Force classic resume modal container visibility & center page dimensions */
          #printable-resume-modal {
            margin: 0 auto !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
            display: block !important;
            color: black !important;
            background: white !important;
          }
        }
      `}</style>
    </section>
  );
}
