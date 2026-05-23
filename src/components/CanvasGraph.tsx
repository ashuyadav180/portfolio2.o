"use client";

import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface Node {
  id: string;
  name: string;
  type: "file" | "dir";
  size?: number;
  loc?: number;
  category: "app" | "component" | "section" | "lib" | "config" | "style" | "folder";
}

interface Link {
  source: string;
  target: string;
  type: "structure" | "import";
}

interface PhysicalNode extends Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface CanvasGraphProps {
  nodes: Node[];
  links: Link[];
  onSelectNode: (node: Node | null) => void;
  onDoubleClickNode: (node: Node) => void;
  triggerReset: number;
}

// Neon Colors mapping
const CATEGORY_COLORS = {
  app: "#ef4444",        // Pink/Red glow
  component: "#38bdf8",  // Blue glow
  section: "#8b5cf6",    // Purple glow
  lib: "#f59e0b",        // Amber glow
  style: "#e0f2fe",      // Blue Ice
  config: "#10b981",     // Emerald green glow
  folder: "#ffffff",     // White
};

export default function CanvasGraph({
  nodes,
  links,
  onSelectNode,
  onDoubleClickNode,
  triggerReset,
}: CanvasGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [zoom, setZoom] = useState<number>(0.85);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  
  const [hoveredNode, setHoveredNode] = useState<PhysicalNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<PhysicalNode | null>(null);

  // Keep simulation states in ref to prevent React re-render lags
  const simulationRef = useRef<{
    pNodes: PhysicalNode[];
    pLinks: { source: PhysicalNode; target: PhysicalNode; type: "structure" | "import" }[];
    dragNode: PhysicalNode | null;
    isPanning: boolean;
    startX: number;
    startY: number;
    pulseOffset: number;
  }>({
    pNodes: [],
    pLinks: [],
    dragNode: null,
    isPanning: false,
    startX: 0,
    startY: 0,
    pulseOffset: 0,
  });

  // Re-initialize physics on node updates or external triggerReset
  useEffect(() => {
    if (nodes.length === 0) return;

    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    // Convert to physical nodes
    const pNodes: PhysicalNode[] = nodes.map((node) => {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.min(width, height) * 0.25 * Math.random();
      
      // Determine node visual radius
      let radius = 6;
      if (node.type === "dir") {
        radius = node.id.split("/").length === 1 ? 16 : 11; // Root folder bigger
      } else {
        radius = Math.min(10, 4 + Math.log2((node.loc || 10) / 10)); // Scale slightly with LOC
      }

      return {
        ...node,
        x: width / 2 + Math.cos(angle) * r,
        y: height / 2 + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        radius,
      };
    });

    // Create node mapping for fast link reference resolution
    const nodeMap = new Map<string, PhysicalNode>();
    pNodes.forEach((n) => nodeMap.set(n.id, n));

    // Connect links
    const pLinks = links
      .map((link) => {
        const sourceNode = nodeMap.get(link.source);
        const targetNode = nodeMap.get(link.target);
        if (sourceNode && targetNode) {
          return { source: sourceNode, target: targetNode, type: link.type };
        }
        return null;
      })
      .filter((l): l is { source: PhysicalNode; target: PhysicalNode; type: "structure" | "import" } => l !== null);

    simulationRef.current.pNodes = pNodes;
    simulationRef.current.pLinks = pLinks;

    // Apply high repulsion burst
    pNodes.forEach((n) => {
      n.vx += (Math.random() - 0.5) * 35;
      n.vy += (Math.random() - 0.5) * 35;
    });

    // Reset pan/zoom asynchronously to avoid synchronous setState inside useEffect warning
    const timer = setTimeout(() => {
      setZoom(0.85);
      setPanX(0);
      setPanY(0);
    }, 0);

    return () => clearTimeout(timer);
  }, [nodes, links, triggerReset]);

  // Main physics loop and Canvas drawing
  useEffect(() => {
    let animationId: number;
    
    const runFrame = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        animationId = requestAnimationFrame(runFrame);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const { pNodes, pLinks, dragNode } = simulationRef.current;

      // ─── 1. SIMULATE FORCE PHYSICS ───
      const friction = 0.86;
      const repulsionStrength = 180;
      const springStrength = 0.045;
      const centerGravity = 0.015;
      const dpr = (typeof window !== "undefined" && window.devicePixelRatio) || 1;
      const centerX = width / (2 * dpr);
      const centerY = height / (2 * dpr);

      // Robust check to ensure camera/canvas dimensions are valid numbers to prevent canvas transforms TypeError crashes
      if (!Number.isFinite(centerX) || !Number.isFinite(centerY) || !Number.isFinite(zoom) || !Number.isFinite(panX) || !Number.isFinite(panY)) {
        animationId = requestAnimationFrame(runFrame);
        return;
      }

      // Repulsion (Coulomb force)
      for (let i = 0; i < pNodes.length; i++) {
        const nodeA = pNodes[i];
        for (let j = i + 1; j < pNodes.length; j++) {
          const nodeB = pNodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 1;
          
          if (dist < 400) {
            // Push apart
            const force = (repulsionStrength * (nodeA.radius * nodeB.radius)) / (dist * dist);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            
            if (nodeA !== dragNode) {
              nodeA.vx -= fx;
              nodeA.vy -= fy;
            }
            if (nodeB !== dragNode) {
              nodeB.vx += fx;
              nodeB.vy += fy;
            }
          }
        }
      }

      // Spring links (Hooke's Law)
      pLinks.forEach((link) => {
        const { source, target, type } = link;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
        
        // Structure connections (folders) stay tighter, Import lines longer
        const desiredDist = type === "structure" ? 40 : 85;
        const force = (dist - desiredDist) * springStrength;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (source !== dragNode) {
          source.vx += fx;
          source.vy += fy;
        }
        if (target !== dragNode) {
          target.vx -= fx;
          target.vy -= fy;
        }
      });

      // Gravity pull to center
      pNodes.forEach((node) => {
        if (node === dragNode) return;
        node.vx += (centerX - node.x) * centerGravity;
        node.vy += (centerY - node.y) * centerGravity;
        
        // Dampen and integrate
        node.vx *= friction;
        node.vy *= friction;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Increment link animated dash offset
      simulationRef.current.pulseOffset = (simulationRef.current.pulseOffset + 0.4) % 100;

      ctx.clearRect(0, 0, width, height);

      // Camera view matrix: scale & translate
      ctx.save();
      ctx.translate(panX + centerX, panY + centerY);
      ctx.scale(zoom, zoom);
      ctx.translate(-centerX, -centerY);

      // A. DRAW LINKS (Import dependencies and directory structures)
      pLinks.forEach((link) => {
        const { source, target, type } = link;
        // Verify link points are finite before attempting to draw
        if (!Number.isFinite(source.x) || !Number.isFinite(source.y) || !Number.isFinite(target.x) || !Number.isFinite(target.y)) {
          return;
        }
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (type === "structure") {
          // Folder nested connection - subtle dashed white
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          // Dynamic dependency link - neon glowing blue with running particle
          ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
          ctx.lineWidth = 1.25;
          ctx.stroke();

          // Particle pulse running from importer to source
          const t = (simulationRef.current.pulseOffset / 100);
          const px = source.x + (target.x - source.x) * t;
          const py = source.y + (target.y - source.y) * t;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // B. DRAW NODES
      pNodes.forEach((node) => {
        // Verify node coordinates are finite before attempting to draw
        if (!Number.isFinite(node.x) || !Number.isFinite(node.y) || !Number.isFinite(node.radius)) {
          return;
        }
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const color = CATEGORY_COLORS[node.category] || "#ffffff";

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 2.5 : 0), 0, Math.PI * 2);

        // Styling directory nodes vs file nodes
        if (node.type === "dir") {
          // Outer ring style
          ctx.fillStyle = "rgba(10, 15, 30, 0.75)";
          ctx.strokeStyle = color;
          ctx.lineWidth = isHovered || isSelected ? 2.5 : 1.5;
          
          ctx.shadowColor = color;
          ctx.shadowBlur = isHovered || isSelected ? 12 : 3;
          ctx.fill();
          ctx.stroke();
          
          // Dashed concentric inside directory
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius - 3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.18)";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          // File node - glowing core solid bubble
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = isHovered || isSelected ? 15 : 6;
          ctx.fill();

          if (isHovered || isSelected) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,255,255,0.22)";
            ctx.lineWidth = 1.25;
            ctx.stroke();
          }
        }
        ctx.shadowBlur = 0; // Reset shadow

        // C. DRAW TEXT LABELS (Avoid text overlapping clutter)
        const showLabel = 
          node.type === "dir" || 
          isHovered || 
          isSelected || 
          zoom > 1.2 || 
          node.radius > 8;

        if (showLabel) {
          ctx.font = `${isHovered || isSelected ? "bold" : "500"} ${node.type === "dir" ? "8px" : "7px"} 'JetBrains Mono', monospace`;
          ctx.fillStyle = isHovered ? "#ffffff" : isSelected ? "#38bdf8" : "rgba(255, 255, 255, 0.65)";
          
          const labelY = node.y + node.radius + (node.type === "dir" ? 9 : 8);
          ctx.textAlign = "center";
          
          // Ellipsize extremely long names
          let nameStr = node.name;
          if (nameStr.length > 22) nameStr = nameStr.substring(0, 19) + "...";
          ctx.fillText(nameStr, node.x, labelY);

          // Subtext showing file size or LOC for hovered nodes
          if (isHovered && node.type === "file") {
            ctx.font = "6px 'JetBrains Mono', monospace";
            ctx.fillStyle = "#94a3b8";
            ctx.fillText(`${node.loc || 0} LOC • ${( (node.size || 0) / 1024 ).toFixed(1)} KB`, node.x, labelY + 8);
          }
        }
      });

      ctx.restore();
      animationId = requestAnimationFrame(runFrame);
    };

    runFrame();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [panX, panY, zoom, hoveredNode, selectedNode]);

  // Adjust high resolution Retina displays using ResizeObserver to ensure robust size calculation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Zoom helpers
  const zoomIn = () => setZoom((z) => Math.min(3, z + 0.15));
  const zoomOut = () => setZoom((z) => Math.max(0.2, z - 0.15));
  const resetZoom = () => {
    setZoom(0.85);
    setPanX(0);
    setPanY(0);
  };

  // Convert client viewport mouse position to simulation absolute coordinate spaces
  const getSimCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    
    // Reverse translate/scale transform formula
    const x = (mouseX - (panX + width / 2)) / zoom + width / 2;
    const y = (mouseY - (panY + height / 2)) / zoom + height / 2;
    
    return { x, y };
  };

  // Handle pointer interactions
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { pNodes } = simulationRef.current;
    const simCoords = getSimCoordinates(e.clientX, e.clientY);
    
    // Find if clicked on any node
    let clickedNode: PhysicalNode | null = null;
    for (const node of pNodes) {
      const dx = simCoords.x - node.x;
      const dy = simCoords.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < node.radius + 3) {
        clickedNode = node;
        break;
      }
    }

    if (clickedNode) {
      // Start Dragging Node
      simulationRef.current.dragNode = clickedNode;
      setSelectedNode(clickedNode);
      onSelectNode(clickedNode);
    } else {
      // Start Panning Camera
      simulationRef.current.isPanning = true;
      simulationRef.current.startX = e.clientX - panX;
      simulationRef.current.startY = e.clientY - panY;
      setSelectedNode(null);
      onSelectNode(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const simCoords = getSimCoordinates(e.clientX, e.clientY);
    const { isPanning, dragNode, pNodes } = simulationRef.current;

    if (isPanning) {
      setPanX(e.clientX - simulationRef.current.startX);
      setPanY(e.clientY - simulationRef.current.startY);
    } else if (dragNode) {
      dragNode.x = simCoords.x;
      dragNode.y = simCoords.y;
      dragNode.vx = 0;
      dragNode.vy = 0;
    } else {
      // Check Node Hover
      let hoverTarget: PhysicalNode | null = null;
      for (const node of pNodes) {
        const dx = simCoords.x - node.x;
        const dy = simCoords.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < node.radius + 4) {
          hoverTarget = node;
          break;
        }
      }
      setHoveredNode(hoverTarget);
    }
  };

  const handleMouseUp = () => {
    simulationRef.current.isPanning = false;
    simulationRef.current.dragNode = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = 1.05;
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(3.0, z * zoomFactor));
    } else {
      setZoom((z) => Math.max(0.15, z / zoomFactor));
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const simCoords = getSimCoordinates(e.clientX, e.clientY);
    const { pNodes } = simulationRef.current;

    for (const node of pNodes) {
      const dx = simCoords.x - node.x;
      const dy = simCoords.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < node.radius + 3) {
        if (node.type === "file") {
          onDoubleClickNode(node);
        }
        break;
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-3xl border border-white/5 bg-[#030611]/85 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
      {/* Dynamic canvas backdrop grids */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-45" />

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        className="w-full h-full block absolute inset-0 z-10"
      />

      {/* Floating Canvas camera controller overlay panel */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 px-3 py-2 rounded-2xl glass border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <button
          onClick={zoomIn}
          className="w-8 h-8 rounded-xl glass border-white/5 hover:border-white/20 hover:bg-white/4 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        <button
          onClick={zoomOut}
          className="w-8 h-8 rounded-xl glass border-white/5 hover:border-white/20 hover:bg-white/4 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
        <button
          onClick={resetZoom}
          className="w-8 h-8 rounded-xl glass border-white/5 hover:border-white/20 hover:bg-white/4 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Recenter & Reset Viewport"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Mini Color Legend */}
      <div className="absolute top-6 left-6 z-20 hidden md:flex flex-col gap-2 p-4 rounded-2xl glass border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] text-[0.65rem] font-mono-custom font-semibold select-none">
        <span className="text-[#94a3b8] tracking-widest uppercase mb-1">CATEGORIES</span>
        {[
          { label: "App pages", color: CATEGORY_COLORS.app },
          { label: "Components", color: CATEGORY_COLORS.component },
          { label: "Page sections", color: CATEGORY_COLORS.section },
          { label: "Lib / Data", color: CATEGORY_COLORS.lib },
          { label: "Styling files", color: CATEGORY_COLORS.style },
          { label: "Config files", color: CATEGORY_COLORS.config },
          { label: "Directories", color: CATEGORY_COLORS.folder, border: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: item.color,
                boxShadow: item.border ? "none" : `0 0 10px ${item.color}`,
                border: item.border ? `1px dashed rgba(255,255,255,0.6)` : "none",
              }}
            />
            <span className="text-white/80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
