"use client";
import { useEffect, useState, useRef } from "react";

/**
 * AIBackground — full-page fixed ambient layer.
 * Replaces galaxy/stars with:
 *  1. Deep cinematic dark base
 *  2. Animated cyber digital grid with scan-wave effect
 *  3. Energy orb system (neon blue + electric purple + red accent)
 *  4. Animated scan-line sweep
 *  5. Holographic light streaks
 *  6. Film grain noise overlay
 *  7. Corner vignette
 */
export default function AIBackground() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Canvas-based animated digital grid + scan sweep
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", handleResize);

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // — Grid lines —
      const gridSize = 72;
      const gridOpacity = 0.028 + 0.006 * Math.sin(t * 0.5);
      ctx.strokeStyle = `rgba(56, 189, 248, ${gridOpacity})`;
      ctx.lineWidth = 0.6;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // — Horizontal scan sweep —
      const scanY = ((t * 0.18) % 1.6 - 0.3) * H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, "rgba(56,189,248,0)");
      scanGrad.addColorStop(0.5, "rgba(56,189,248,0.04)");
      scanGrad.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, W, 120);

      // — Grid node dots at intersections (sparse) —
      ctx.fillStyle = `rgba(56,189,248,${0.12 + 0.06 * Math.sin(t)})`;
      for (let x = 0; x < W; x += gridSize * 3) {
        for (let y = 0; y < H; y += gridSize * 3) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden style={{ background: "#040810" }}>

      {/* 1. Layered dark gradient base — cinematic depth */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(10,20,50,0.9) 0%, #040810 60%)"
      }} />

      {/* 2. Canvas-driven animated cyber grid */}
      {mounted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 1 }}
        />
      )}

      {/* 3. Energy orb — primary neon blue, top left */}
      <div className="absolute rounded-full" style={{
        width: "52vw", height: "52vw",
        top: "-18%", left: "-12%",
        background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(14,165,233,0.04) 45%, transparent 70%)",
        filter: "blur(80px)",
        animation: "aiOrbDrift1 26s ease-in-out infinite alternate",
      }} />

      {/* 4. Energy orb — electric purple, top right */}
      <div className="absolute rounded-full" style={{
        width: "48vw", height: "48vw",
        top: "-8%", right: "-14%",
        background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(124,58,237,0.03) 50%, transparent 70%)",
        filter: "blur(100px)",
        animation: "aiOrbDrift2 31s ease-in-out infinite alternate",
      }} />

      {/* 5. Energy orb — deep red accent, bottom center */}
      <div className="absolute rounded-full" style={{
        width: "40vw", height: "40vw",
        bottom: "-12%", left: "30%",
        background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, rgba(220,38,38,0.02) 50%, transparent 70%)",
        filter: "blur(120px)",
        animation: "aiOrbDrift3 38s ease-in-out infinite alternate",
      }} />

      {/* 6. Mid-left secondary cyan pulse */}
      <div className="absolute rounded-full" style={{
        width: "32vw", height: "32vw",
        top: "38%", left: "-8%",
        background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)",
        filter: "blur(70px)",
        animation: "aiOrbDrift4 22s ease-in-out infinite alternate",
      }} />

      {/* 7. Holographic diagonal light streaks */}
      {mounted && (
        <>
          <div className="absolute" style={{
            width: "1px", height: "35vh",
            top: "10%", left: "22%",
            background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.18), transparent)",
            animation: "lightStreak 8s ease-in-out infinite",
            animationDelay: "0s",
          }} />
          <div className="absolute" style={{
            width: "1px", height: "28vh",
            top: "40%", right: "18%",
            background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.14), transparent)",
            animation: "lightStreak 12s ease-in-out infinite",
            animationDelay: "3s",
          }} />
          <div className="absolute" style={{
            width: "1px", height: "22vh",
            bottom: "15%", left: "60%",
            background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.1), transparent)",
            animation: "lightStreak 15s ease-in-out infinite",
            animationDelay: "6s",
          }} />
        </>
      )}

      {/* 8. Scanline horizontal lines overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
        backgroundSize: "100% 4px",
      }} />

      {/* 9. Film grain noise texture */}
      <div className="absolute inset-0 noise" style={{ opacity: 0.018 }} />

      {/* 10. Cinematic edge vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 45%, rgba(4,8,16,0.55) 75%, rgba(4,8,16,0.92) 100%)",
      }} />

      {/* Keyframe definitions */}
      <style>{`
        @keyframes aiOrbDrift1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(8vw, 10vh) scale(1.12); }
        }
        @keyframes aiOrbDrift2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-7vw, 14vh) scale(1.08); }
        }
        @keyframes aiOrbDrift3 {
          0%   { transform: translate(0, 0) scale(1.05); }
          100% { transform: translate(10vw, -8vh) scale(0.92); }
        }
        @keyframes aiOrbDrift4 {
          0%   { transform: translate(0, 0) scale(0.95); }
          100% { transform: translate(6vw, -5vh) scale(1.08); }
        }
        @keyframes lightStreak {
          0%, 100% { opacity: 0; transform: translateY(-10vh); }
          40%, 60% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
