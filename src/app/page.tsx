"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import AuroraBackground  from "@/components/AuroraBackground";
import CustomCursor      from "@/components/CustomCursor";
import LoadingScreen     from "@/components/LoadingScreen";
import Navbar            from "@/components/Navbar";
import HeroSection       from "@/sections/HeroSection";
import AboutSection      from "@/sections/AboutSection";
import SkillsSection     from "@/sections/SkillsSection";
import TechStackSection  from "@/sections/TechStackSection";
import ProjectsSection   from "@/sections/ProjectsSection";
import ExperienceSection from "@/sections/ExperienceSection";
import ResumeSection     from "@/sections/ResumeSection";
import ContactSection    from "@/sections/ContactSection";
import Footer            from "@/sections/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    (window as any).lenis = lenis;
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050816] overflow-hidden">
      {/* Global ambient layers */}
      <AuroraBackground />

      {/* UI chrome */}
      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      {/* Page sections */}
      <div className="relative z-10">
        <HeroSection />
        <div className="divider" />
        <AboutSection />
        <div className="divider" />
        <SkillsSection />
        <div className="divider" />
        <TechStackSection />
        <div className="divider" />
        <ProjectsSection />
        <div className="divider" />
        <ExperienceSection />
        <div className="divider" />
        <ResumeSection />
        <div className="divider" />
        <ContactSection />
        <div className="divider" />
        <Footer />
      </div>
    </main>
  );
}
