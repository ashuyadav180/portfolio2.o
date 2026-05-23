"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Copy, Check, FileCode, HardDrive, Hash, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeViewerDrawerProps {
  filePath: string | null;
  onClose: () => void;
}

export default function CodeViewerDrawer({ filePath, onClose }: CodeViewerDrawerProps) {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<{ size?: number; loc?: number }>({});

  useEffect(() => {
    if (!filePath) return;

    const fetchCode = async () => {
      setLoading(true);
      setError(null);
      setCode("");
      try {
        // Fetch file preview
        const response = await fetch(`/api/code-preview?path=${encodeURIComponent(filePath)}`);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to load file content");
        }
        const text = await response.text();
        setCode(text);
        
        // Count LOC
        const lines = text.split("\n").length;
        setMetadata({
          loc: lines,
          size: new Blob([text]).size,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An error occurred while loading the code.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [filePath]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe escape HTML helper
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Custom high-contrast, premium neon regex syntax highlighter
  const highlightedHtml = useMemo(() => {
    if (!code) return "";
    
    const escaped = escapeHtml(code);
    const ext = filePath ? filePath.split(".").pop()?.toLowerCase() : "";

    if (ext === "json") {
      return escaped
        .replace(/(&quot;[^&]+&quot;)(?=\s*:)/g, '<span class="text-[#38bdf8] font-medium">$1</span>') // keys
        .replace(/(:\s*)(&quot;[^&]*&quot;)/g, '$1<span class="text-[#f59e0b]">$2</span>') // string values
        .replace(/(:\s*)(-?\d+\.?\d*)/g, '$1<span class="text-[#22d3ee] font-semibold">$2</span>') // numbers
        .replace(/(true|false|null)/g, '<span class="text-[#8b5cf6] font-bold">$1</span>'); // boolean/null
    }

    if (ext === "css") {
      return escaped
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-[#64748b] italic">$1</span>') // comments
        .replace(/([a-zA-Z-]+\s*)(?=\s*:)/g, '<span class="text-[#38bdf8]">$1</span>') // properties
        .replace(/(:\s*)([^;]+)/g, '$1<span class="text-[#eab308]">$2</span>') // values
        .replace(/(\.[a-zA-Z-._]+|#[a-zA-Z-._]+)/g, '<span class="text-[#f43f5e] font-semibold">$1</span>') // classes/ids
        .replace(/(@[a-zA-Z-]+)/g, '<span class="text-[#8b5cf6]">$1</span>'); // media rules
    }

    // Default for TS, TSX, JS, JSX, config files
    return escaped
      // Multi-line and single-line comments
      .replace(/(\/\*[\s\S]*?\*\/|\/\/.+)$/gm, '<span class="text-[#64748b] italic">$1</span>')
      // Strings (double, single, backtick quotes)
      .replace(/(&quot;[\s\S]*?&quot;|&#039;[\s\S]*?&#039;|`[\s\S]*?`)/g, '<span class="text-[#f59e0b]">$1</span>')
      // HTML/JSX Elements & tags like <div>, <motion.div>, </Navbar>
      .replace(/(&lt;\/?[a-zA-Z0-9.-]+|&gt;|\/&gt;)/g, '<span class="text-[#f43f5e] font-semibold">$1</span>')
      // Keywords
      .replace(
        /\b(import|export|from|default|const|let|var|function|return|class|extends|interface|type|as|async|await|if|else|for|while|switch|case|break|continue|new|this|typeof|keyof|readonly|public|private|protected)\b/g,
        '<span class="text-[#8b5cf6] font-semibold">$1</span>'
      )
      // Key functions / methods
      .replace(/\b(useState|useEffect|useMemo|useCallback|useRef|useContext|NextResponse|Response|scan|resolveImport|GET|POST|fetch|console)\b/g, '<span class="text-[#22d3ee]">$1</span>')
      // Numeric values
      .replace(/\b(\d+)\b/g, '<span class="text-[#38bdf8]">$1</span>')
      // Types / Interfaces
      .replace(/\b(string|number|boolean|any|void|unknown|never|Record|Promise|Node|Link|NextRequest|NextResponse|Error|Set|Map)\b/g, '<span class="text-[#10b981] italic">$1</span>');

  }, [code, filePath]);

  return (
    <AnimatePresence>
      {filePath && (
        <>
          {/* Background backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#02040a] z-[9500] cursor-pointer"
          />

          {/* Drawer sheet container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[640px] md:w-[750px] lg:w-[850px] z-[9600] glass-strong border-l border-white/10 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header section */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#050816]/75 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/10 flex items-center justify-center text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                  <FileCode size={18} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider font-display text-white select-none">
                    {filePath.split("/").pop()}
                  </h3>
                  <p className="text-[0.68rem] text-[#94a3b8] font-mono-custom tracking-wider">
                    {filePath}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  disabled={loading || !!error}
                  className="w-9 h-9 flex items-center justify-center rounded-xl glass border-white/10 hover:border-white/20 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
                  title="Copy file contents"
                >
                  {copied ? <Check size={14} className="text-[#10b981]" /> : <Copy size={14} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-xl glass border-white/10 hover:border-[#f43f5e]/30 text-[#94a3b8] hover:text-[#f43f5e] transition-colors cursor-pointer"
                  title="Close viewer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Metadata Bar */}
            {!loading && !error && (
              <div className="px-6 py-2.5 bg-[#050816]/40 border-b border-white/5 flex items-center gap-5 text-[0.68rem] text-[#8ea0b5] font-mono-custom select-none">
                <div className="flex items-center gap-1.5">
                  <Hash size={12} className="text-[#8b5cf6]" />
                  <span>{metadata.loc ?? 0} LINES</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HardDrive size={12} className="text-[#38bdf8]" />
                  <span>
                    {metadata.size ? `${(metadata.size / 1024).toFixed(2)} KB` : "0 KB"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto text-[#22d3ee]">
                  <ExternalLink size={11} />
                  <span className="uppercase tracking-wider">Workspace Mode</span>
                </div>
              </div>
            )}

            {/* Code Body */}
            <div className="flex-1 overflow-auto bg-[#030612] relative font-mono-custom text-[0.8rem] leading-relaxed p-6">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#38bdf8]/20 border-t-[#38bdf8] animate-spin" />
                  <span className="text-xs text-[#94a3b8] tracking-widest font-mono-custom uppercase select-none">
                    Loading Source
                  </span>
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center text-[#f43f5e]">
                    <X size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display select-none">
                      STREAM ERROR
                    </h4>
                    <p className="text-xs text-[#94a3b8] mt-1 max-w-sm">
                      {error}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  {/* Line Numbers column */}
                  <div className="text-right text-[#334155] pr-4 select-none border-r border-white/5 mr-4 w-9 text-shadow-none">
                    {Array.from({ length: metadata.loc ?? 1 }).map((_, i) => (
                      <div key={i + 1} className="h-5">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Rendered highlighted code */}
                  <pre className="flex-1 overflow-x-auto select-text whitespace-pre text-[#e2e8f0] scrollbar-thin">
                    <code
                      className="block h-full"
                      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                    />
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
