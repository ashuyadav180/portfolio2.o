"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Server, Network, Folder, File, Code, Hash, HardDrive } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasGraph from "@/components/CanvasGraph";
import InteractiveCLI from "@/components/InteractiveCLI";
import CodeViewerDrawer from "@/components/CodeViewerDrawer";

interface Node {
  id: string;
  name: string;
  type: "file" | "dir";
  size?: number;
  loc?: number;
  category: "app" | "component" | "section" | "lib" | "config" | "style" | "folder";
}

interface LinkType {
  source: string;
  target: string;
  type: "structure" | "import";
}

export default function GraphifyPage() {
  const [data, setData] = useState<{ nodes: Node[]; links: LinkType[] }>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [doubleClickedNode, setDoubleClickedNode] = useState<Node | null>(null);
  const [triggerReset, setTriggerReset] = useState<number>(0);

  // Load codebase graph and simulate cyberpunk boot logs
  useEffect(() => {
    const logs = [
      "INITIALIZING INTEL SYSTEM MAP DIRECTORY SCANNER...",
      "TARGET ROOT SPECIFIED: '.' [WORKSPACE PORTFOLIO 2.0]",
      "ESTABLISHING SECURE BUFFER FLOW FOR STREAM PREVIEWS...",
      "EXCLUDING DIR OBJECTS: [.git, .next, node_modules, dist]...",
      "RUNNING PARSER FIRST-PASS: CONSTRUCTING NODE CLUSTERS...",
      "RUNNING PARSER SECOND-PASS: MAPPING MODULE DEPS / IMPORT LINKS...",
      "CALCULATING CORE METADATA TELEMETRY (LOC, BYTES)...",
      "PORTFOLIO DIRECTORY STRUCTURE GRAPHIFIED SUCCESSFUL!"
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setLoadingLogs((prev) => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 280);

    const fetchData = async () => {
      try {
        const response = await fetch("/api/codebase");
        if (!response.ok) {
          throw new Error("Failed to fetch repository metadata.");
        }
        const json = await response.json();
        
        // Wait briefly to finish log animations
        setTimeout(() => {
          setData(json);
          setLoading(false);
        }, 2500);

      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred during build mapping.";
        setFetchError(message);
        setLoading(false);
      }
    };

    fetchData();

    return () => clearInterval(logInterval);
  }, []);

  const handleGraphifyReset = () => {
    setTriggerReset((prev) => prev + 1);
  };

  const handleCatFile = (path: string) => {
    const fileNode = data.nodes.find((n) => n.id === path);
    if (fileNode) {
      setDoubleClickedNode(fileNode);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050816] text-white overflow-hidden flex flex-col font-sans">
      {/* Background cyber ambient flows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[500px] h-[500px] rounded-full bg-[#38bdf8]/5 blur-[120px] absolute -top-40 -left-40 animate-pulse-orb" />
        <div className="w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/5 blur-[120px] absolute -bottom-40 -right-40 animate-pulse-orb" />
        <div className="absolute inset-0 bg-[#050816]/30 noise pointer-events-none" />
      </div>

      {/* Cyberpunk Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-[#030612] flex flex-col items-center justify-center font-mono-custom p-6"
          >
            {/* Ambient loading grids */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="w-80 h-80 rounded-full bg-[#38bdf8]/10 blur-[100px] absolute pointer-events-none" />

            <div className="w-full max-w-[620px] glass border border-white/10 rounded-3xl p-8 relative flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.05)] bg-[#050816]/95">
              {/* Spinning core */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/10 flex items-center justify-center text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                  <Network size={22} className="animate-spin" style={{ animationDuration: "3.5s" }} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold font-display tracking-widest text-white uppercase select-none">
                    GRAPHIFY CORE V1.0
                  </h2>
                  <p className="text-[0.62rem] text-[#38bdf8] tracking-[0.25em] font-bold">
                    SYSTEM ANALYTICS ENGINE
                  </p>
                </div>
              </div>

              {/* Console log list */}
              <div className="h-[180px] overflow-y-auto mb-6 text-[0.68rem] leading-relaxed text-[#22d3ee] flex flex-col gap-1.5 scrollbar-none font-bold">
                {loadingLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-[#38bdf8] select-none">&gt;&gt;</span>
                    <span className="font-mono-custom whitespace-pre-wrap">{log}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-white/5 border border-white/5 overflow-hidden">
                <div className="h-full loader-bar rounded-full w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Graphify Header bar */}
      <header className="relative z-40 px-5 md:px-10 lg:px-16 py-4 flex items-center justify-between border-b border-white/5 bg-[#050816]/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 glass border-white/10 rounded-2xl flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
            title="Return to Portfolio"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-bold tracking-[0.25em] font-display text-white uppercase select-none">
                Graphify Workspace
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[0.58rem] font-mono-custom font-bold text-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                SECURE
              </span>
            </div>
            <p className="text-[0.62rem] text-[#94a3b8] font-mono-custom tracking-wider">
              RECURSIVE FILE RELATIONSHIP NETWORKS • PORTFOLIO 2.0
            </p>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="hidden lg:flex items-center gap-6 text-[0.65rem] font-mono-custom text-[#94a3b8] tracking-widest select-none">
          <div className="flex items-center gap-2 px-4 py-2 glass border-white/5 rounded-2xl">
            <Server size={13} className="text-[#38bdf8]" />
            <span>NODES: {data.nodes.length}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass border-white/5 rounded-2xl">
            <Network size={13} className="text-[#8b5cf6]" />
            <span>LINKS: {data.links.length}</span>
          </div>
        </div>
      </header>

      {/* Primary Workspace Dashboard grid */}
      <div className="flex-1 relative z-10 w-full p-5 md:p-8 flex flex-col lg:flex-row gap-6 h-[calc(100vh-80px)]">
        
        {/* Left Side: Canvas Graph Container */}
        <div className="flex-1 h-full relative">
          <CanvasGraph
            nodes={data.nodes}
            links={data.links}
            onSelectNode={setSelectedNode}
            onDoubleClickNode={setDoubleClickedNode}
            triggerReset={triggerReset}
          />
        </div>

        {/* Right Side Panel: File Information Card */}
        <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              /* Glowing Node Properties Sheet */
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 glass border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(56,189,248,0.02)] bg-[#050816]/90 backdrop-blur-2xl"
              >
                <div>
                  {/* File Category Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5 select-none">
                    <span className="text-[0.62rem] font-mono-custom tracking-[0.2em] uppercase font-bold text-[#38bdf8]">
                      Node telemetry
                    </span>
                    <span className="chip uppercase text-[0.6rem] py-0.5">
                      {selectedNode.type === "dir" ? "Directory" : selectedNode.category}
                    </span>
                  </div>

                  {/* Icon and Name */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/10 flex items-center justify-center text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.08)] select-none">
                      {selectedNode.type === "dir" ? <Folder size={22} /> : <File size={20} />}
                    </div>
                    <div className="overflow-hidden">
                      <h2 className="text-sm font-bold font-display text-white tracking-wide truncate">
                        {selectedNode.name}
                      </h2>
                      <p className="text-[0.65rem] text-[#94a3b8] font-mono-custom tracking-wider truncate mt-0.5" title={selectedNode.id}>
                        {selectedNode.id}
                      </p>
                    </div>
                  </div>

                  {/* Node statistics */}
                  <div className="flex flex-col gap-3 font-mono-custom select-none">
                    {selectedNode.type === "file" && (
                      <>
                        <div className="flex items-center justify-between p-3.5 rounded-2xl glass border-white/5 text-xs">
                          <div className="flex items-center gap-2 text-[#94a3b8]">
                            <Hash size={13} className="text-[#8b5cf6]" />
                            <span>Lines of Code</span>
                          </div>
                          <span className="text-white font-bold">{selectedNode.loc} LOC</span>
                        </div>

                        <div className="flex items-center justify-between p-3.5 rounded-2xl glass border-white/5 text-xs">
                          <div className="flex items-center gap-2 text-[#94a3b8]">
                            <HardDrive size={13} className="text-[#38bdf8]" />
                            <span>Storage Weight</span>
                          </div>
                          <span className="text-white font-bold">
                            {selectedNode.size ? `${(selectedNode.size / 1024).toFixed(2)} KB` : "0 KB"}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between p-3.5 rounded-2xl glass border-white/5 text-xs">
                      <div className="flex items-center gap-2 text-[#94a3b8]">
                        <Network size={13} className="text-[#f59e0b]" />
                        <span>Connected Links</span>
                      </div>
                      <span className="text-white font-bold">
                        {
                          data.links.filter(
                            (l) => l.source === selectedNode.id || l.target === selectedNode.id
                          ).length
                        } links
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Action buttons */}
                <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
                  {selectedNode.type === "file" && (
                    <button
                      onClick={() => setDoubleClickedNode(selectedNode)}
                      className="btn-primary w-full py-3 shadow-[0_0_20px_rgba(14,165,233,0.15)] text-center justify-center cursor-pointer select-none"
                    >
                      <Code size={14} />
                      View Source ✦
                    </button>
                  )}
                  <button
                    onClick={handleGraphifyReset}
                    className="btn-ghost w-full py-3 text-center justify-center cursor-pointer select-none"
                  >
                    Re-layout Node
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Cyber Legend Fallback Sheet */
              <motion.div
                key="legend"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 glass border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)] bg-[#050816]/75 backdrop-blur-2xl select-none"
              >
                <div className="flex-1 flex flex-col justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#38bdf8]/5 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] mx-auto mb-6 shadow-[inset_0_0_15px_rgba(56,189,248,0.1)]">
                    <Network size={28} className="animate-pulse" />
                  </div>
                  {fetchError ? (
                    <>
                      <h3 className="text-sm font-bold font-display text-[#f87171] tracking-widest uppercase">
                        SCAN FAILED
                      </h3>
                      <p className="text-[0.74rem] text-[#fca5a5] leading-relaxed mt-3 max-w-[240px] mx-auto font-mono-custom">
                        {fetchError}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm font-bold font-display text-white tracking-widest uppercase">
                        Interactive Map
                      </h3>
                      <p className="text-[0.74rem] text-[#94a3b8] leading-relaxed mt-3 max-w-[240px] mx-auto">
                        Click any module/file node inside the space viewport to stream dynamic system telemetry and statistics.
                      </p>
                    </>
                  )}
                  <div className="mt-8 p-3 rounded-2xl glass border-white/5 border text-[0.62rem] text-[#8ea0b5] font-mono-custom uppercase tracking-wider text-center">
                    Double Click node to open code ✦
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button
                    onClick={handleGraphifyReset}
                    className="btn-primary w-full py-3 justify-center shadow-[0_0_20px_rgba(14,165,233,0.15)] border-glow cursor-pointer"
                  >
                    Recalculate Physics
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Retro CLI Terminal overlay */}
      <InteractiveCLI
        nodes={data.nodes}
        links={data.links}
        onTriggerGraphify={handleGraphifyReset}
        onCatFile={handleCatFile}
      />

      {/* Translucent Sliding Code Sheet Drawer */}
      <CodeViewerDrawer
        filePath={doubleClickedNode ? doubleClickedNode.id : null}
        onClose={() => setDoubleClickedNode(null)}
      />
    </main>
  );
}
