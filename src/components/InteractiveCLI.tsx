"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Minimize2, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveCLILog {
  type: "input" | "output" | "error" | "system";
  text: string;
}

interface InteractiveCLIProps {
  nodes: { id: string; name: string; type: string; loc?: number; size?: number }[];
  links: { source: string; target: string; type: string }[];
  onTriggerGraphify: () => void;
  onCatFile: (path: string) => void;
}

export default function InteractiveCLI({
  nodes,
  onTriggerGraphify,
  onCatFile,
}: InteractiveCLIProps) {
  const [minimized, setMinimized] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [logs, setLogs] = useState<InteractiveCLILog[]>([
    { type: "system", text: "Graphify CLI Shell v1.0.0" },
    { type: "system", text: "Type 'help' to view available operations." },
  ]);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll console
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, minimized]);

  // Focus input when clicking console or opening it
  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newLogs = [...logs, { type: "input" as const, text: `guest@ashuyadav.dev:~$ ${trimmed}` }];
    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();
    const target = args.slice(1).join(" ");

    switch (command) {
      case "help":
        newLogs.push({
          type: "output",
          text: `Available Commands:
  help               - Displays this usage menu.
  /graphify .        - Re-layouts the codebase nodes with energetic repulsion particle physics.
  ls                 - Lists all folders and files inside the current root.
  cat <filepath>     - Streams and views the source code of a specific file.
  stats              - Analyzes codebase telemetry (Total LOC, sizes, distributions).
  neofetch           - Displays Ashu's cyberpunk system dashboard.
  clear              - Clears the terminal screen buffer.`,
        });
        break;

      case "/graphify":
      case "graphify":
        onTriggerGraphify();
        newLogs.push({
          type: "system",
          text: "Emitting high-energy physics layout burst! Recalculating charges...",
        });
        break;

      case "ls": {
        const files = nodes.filter((n) => n.type === "file").map((n) => n.id);
        const dirs = nodes.filter((n) => n.type === "dir").map((n) => n.id);
        
        const output = `DIRECTORIES:
${dirs.length > 0 ? dirs.map((d) => `  [DIR]  ${d}`).join("\n") : "  None"}

FILES:
${files.length > 0 ? files.map((f) => `  [FILE] ${f}`).join("\n") : "  None"}`;
        
        newLogs.push({ type: "output", text: output });
        break;
      }

      case "cat": {
        if (!target) {
          newLogs.push({ type: "error", text: "cat: missing file argument. Usage: cat <filepath>" });
          break;
        }

        // Try to match file exactly, or search case-insensitively
        const matchedNode = nodes.find(
          (n) => n.type === "file" && (n.id.toLowerCase() === target.toLowerCase() || n.name.toLowerCase() === target.toLowerCase())
        );

        if (matchedNode) {
          onCatFile(matchedNode.id);
          newLogs.push({ type: "system", text: `Opening viewer stream for node: ${matchedNode.id}...` });
        } else {
          newLogs.push({ type: "error", text: `cat: ${target}: File not found in workspace graph. Type 'ls' to see available files.` });
        }
        break;
      }

      case "stats": {
        const files = nodes.filter((n) => n.type === "file");
        const totalLoc = files.reduce((acc, f) => acc + (f.loc || 0), 0);
        const totalSize = files.reduce((acc, f) => acc + (f.size || 0), 0);
        
        // Count extensions
        const extCounts: { [key: string]: number } = {};
        files.forEach((f) => {
          const ext = f.name.split(".").pop() || "unknown";
          extCounts[ext] = (extCounts[ext] || 0) + 1;
        });

        const extBreakdown = Object.entries(extCounts)
          .map(([ext, count]) => `  .${ext}: ${count} files`)
          .join("\n");

        newLogs.push({
          type: "output",
          text: `CODEBASE TELEMETRY DATA:
------------------------------------------
Total Nodes Scanned : ${nodes.length}
Total Directories   : ${nodes.filter((n) => n.type === "dir").length}
Total Source Files  : ${files.length}
Total Lines of Code : ${totalLoc} lines
Total Bundle Weight : ${(totalSize / 1024).toFixed(2)} KB

FILE DISTRIBUTIONS:
${extBreakdown}
------------------------------------------`,
        });
        break;
      }

      case "neofetch": {
        const seconds = Math.floor(performance.now() / 1000);
        const uptime = `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
        newLogs.push({
          type: "output",
          text: `      _  _      guest@ashuyadav.dev
    ( '   ' )    -------------------
   (  ' _ '  )   Host    : Ashu Yadav Portfolio Site
   ( ( '_ ) )    OS      : Next.js Node Environment
    ( '   ' )    Uptime  : ${uptime}
      '-'        Shell   : Graphify-CLI v1.0.0
                 Engine  : Custom Canvas Force-Directed HTML5 Physics
                 Memory  : V8 JS Heap Limit Max
                 Terminal: Neo-Retro Glass Console
                 Theme   : Neon Cyberpunk Glassmorphism
                 Author  : Ashu Yadav (BTech CSE 3rd Year)`,
        });
        break;
      }

      case "clear":
        setLogs([]);
        setInput("");
        return;

      default:
        newLogs.push({
          type: "error",
          text: `shell: command not found: '${command}'. Type 'help' to see valid operations.`,
        });
        break;
    }

    setLogs(newLogs);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9000] font-mono-custom select-none">
      <AnimatePresence>
        {minimized ? (
          /* Minimized circular pulse button */
          <motion.button
            key="minimized"
            layoutId="cli-box"
            onClick={() => setMinimized(false)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34,211,238,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full glass border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] hover:text-white cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.15)] bg-[#050816]/90 backdrop-blur-xl"
            title="Open CLI Terminal"
          >
            <TerminalIcon size={18} />
          </motion.button>
        ) : (
          /* Expanded full glass console box */
          <motion.div
            key="expanded"
            layoutId="cli-box"
            onClick={handleConsoleClick}
            className="w-[320px] sm:w-[480px] h-[280px] sm:h-[320px] glass border border-[#38bdf8]/20 rounded-2xl flex flex-col overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(56,189,248,0.04)] bg-[#050816]/95 backdrop-blur-2xl"
          >
            {/* CLI Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-2 text-xs text-[#38bdf8] font-semibold tracking-wider font-display">
                <TerminalIcon size={13} className="animate-pulse" />
                <span>WORKSPACE TERMINAL</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMinimized(true);
                }}
                className="w-6 h-6 flex items-center justify-center rounded-lg glass border-white/5 hover:border-white/10 hover:text-white text-[#94a3b8] transition-colors cursor-pointer"
              >
                <Minimize2 size={11} />
              </button>
            </div>

            {/* Scroll log body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 text-[0.74rem] leading-relaxed scrollbar-thin select-text cursor-text">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap mb-1.5 ${
                    log.type === "input"
                      ? "text-white"
                      : log.type === "error"
                      ? "text-[#ef4444] font-medium"
                      : log.type === "system"
                      ? "text-[#8b5cf6]"
                      : "text-[#22d3ee]"
                  }`}
                >
                  {log.text}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* CLI Input Footer */}
            <div className="px-4 py-2 bg-white/1 border-t border-white/5 flex items-center gap-2">
              <span className="text-white text-[0.72rem] select-none">guest@ashuyadav:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent border-none outline-none text-[#22d3ee] text-[0.74rem] font-mono-custom p-0 placeholder-[#475569] shadow-none caret-[#38bdf8]"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(input);
                }}
                className="p-1.5 rounded-lg bg-white/2 border border-white/5 hover:border-[#38bdf8]/40 text-[#94a3b8] hover:text-[#38bdf8] transition-colors cursor-pointer"
              >
                <CornerDownLeft size={11} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
