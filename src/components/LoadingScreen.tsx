"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGS = [
  "INIT_SEQUENCE: LAUNCHING KERNEL PORTFOLIO_v2.0",
  "SYS_CHECK: MEMORY_ALLOC OK // SWAP_MEM_STABLE",
  "SECURE_LINK: SSL_INIT // HANDSHAKE PORT 443",
  "PARSING_DOM_DATA: CORE_STRUCTURES INSTANTIATED",
  "NEURAL_NET_MAPPING: ABOUT // SKILLS // EXPERIENCE",
  "LOADING_3D_CONTROLLER: WEBLGL_FOUND // ACTIVE",
  "COMPILING_DYNAMIC_VERTEX: THREE.JS INTERACTIVE_GRID",
  "OPTIMIZING_RENDER_PIPELINE: VSYNC ENABLED",
  "VERIFYING_SECURE_BADGES: CISCO_OK // IBM_OK",
  "TELEMETRY_LINK_ESTABLISHED: SYSTEM READY"
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 14 + 4, 100);
        if (next >= 100) {
          clearInterval(iv);
          setTimeout(() => {
            setDone(true);
          }, 600);
        }
        return next;
      });
    }, 90);
    return () => clearInterval(iv);
  }, []);

  const activeLogs = LOGS.filter((_, idx) => progress >= (idx + 1) * 9.5);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#040714] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

          {/* Premium Ambient AI Core Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,rgba(139,92,246,0.05)_50%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Holographic Spinning Node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-2"
            >
              {/* Sci-Fi Rings */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[#38bdf8]/30 animate-spin-slow"
                style={{ margin: -16, animationDuration: "25s" }}
              />
              <div
                className="absolute inset-0 rounded-full border border-[#22d3ee]/20 animate-spin-slow"
                style={{ margin: -32, animationDirection: "reverse", animationDuration: "12s" }}
              />

              <div className="w-20 h-20 rounded-2xl bg-[#080d24] border border-[#38bdf8]/30 flex items-center justify-center font-display font-black text-xl text-[#38bdf8] shadow-[inset_0_0_20px_rgba(56,189,248,0.15),0_0_30px_rgba(56,189,248,0.1)] relative">
                <span className="font-mono-custom tracking-wider">[AY]</span>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#38bdf8]" />
                <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#38bdf8]" />
              </div>
            </motion.div>

            {/* Title Console Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl font-black tracking-[0.25em] text-white uppercase">
                ASHU YADAV
              </h1>
              <div className="font-mono-custom text-[0.52rem] text-[#38bdf8] tracking-[0.2em] uppercase font-bold mt-1">
                SYSTEM CORE INITIALIZER // PORT_D.20
              </div>
            </motion.div>

            {/* Real-time Diagnostics Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-80 h-32 glass rounded-2xl p-4 font-mono-custom text-[0.58rem] text-left overflow-hidden relative border border-white/5 bg-[#050816]/70 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute top-0 right-0 p-2 text-[#64748b] text-[0.48rem] uppercase font-bold tracking-widest pointer-events-none">
                DIAG_FEED
              </div>
              <div className="space-y-1.5 flex flex-col justify-end min-h-full">
                {activeLogs.slice(-4).map((log, i) => {
                  const isLast = i === Math.min(activeLogs.slice(-4).length - 1, 3);
                  return (
                    <div
                      key={log}
                      className={`transition-all duration-200 flex items-center gap-1.5 ${
                        isLast ? "text-[#38bdf8]" : "text-[#64748b]"
                      }`}
                    >
                      <span className="text-white/20 select-none">&gt;</span>
                      <span className="truncate">{log}</span>
                    </div>
                  );
                })}
                {activeLogs.length === 0 && (
                  <div className="text-[#64748b] animate-pulse flex items-center gap-1.5">
                    <span className="text-white/20">&gt;</span>
                    <span>ESTABLISHING BOOT BUFFER...</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Loader Progress & Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-80 flex flex-col items-end gap-1.5"
            >
              <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#8b5cf6] rounded-full shadow-[0_0_10px_#38bdf8]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="w-full flex justify-between font-mono-custom text-[0.58rem] text-[#64748b] font-bold">
                <span>SECURE BOOT</span>
                <span className="text-white">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </motion.div>
          </div>

          {/* Aesthetic Cyber Corner Decorations */}
          <div className="absolute top-6 left-6 font-mono-custom text-[0.52rem] text-[#64748b] select-none tracking-widest hidden sm:block">
            SYS_INIT // BOOT_VER_4.16
          </div>
          <div className="absolute top-6 right-6 font-mono-custom text-[0.52rem] text-[#64748b] select-none tracking-widest hidden sm:block">
            LOC.IN // IP_127.0.0.1
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
