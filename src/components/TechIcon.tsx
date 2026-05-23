"use client";
import React from "react";

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export default function TechIcon({ name, size = 24, className = "", color }: TechIconProps) {
  const normName = name.toLowerCase().trim();

  // Unified SVG wrapper for standard styling
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color || "currentColor",
    className: `transition-transform duration-300 ${className}`,
  };

  switch (normName) {
    case "react":
      return (
        <svg {...svgProps} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
          <title>React</title>
          <circle cx="0" cy="0" r="2.05" fill={color || "#61DAFB"} />
          <g stroke={color || "#61DAFB"} strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "next.js":
    case "nextjs":
    case "next":
      return (
        <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="1.5">
          <title>Next.js</title>
          <path
            fill={color || "#fff"}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM18 16.5C18 14.567 16.433 13 14.5 13H11.5V11H13V9.5H11.5V8H10V16.5H11.5V14.5H14.5C16.433 14.5 18 15.3954 18 16.5ZM10 8V9.5H7V8H10ZM10 11V12.5H7V11H10ZM10 14V15.5H7V14H10Z"
            style={{ display: "none" }} // Standard fallback
          />
          {/* Official minimalist Next.js logo */}
          <svg viewBox="0 0 180 180" width={size} height={size} fill="none">
            <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
              <circle cx="90" cy="90" r="90" fill="#FFF" />
            </mask>
            <g mask="url(#next-mask)">
              <circle cx="90" cy="90" r="90" fill="#000" stroke={color || "#fff"} strokeWidth="4" />
              <path
                d="M149.508 157.52L69.142 54H54v72h14.4V78.07l66.478 86.82a90 90 0 0014.63-7.37z"
                fill="url(#next-grad)"
              />
              <path d="M115.2 54h14.4v72h-14.4z" fill="url(#next-grad)" />
            </g>
            <defs>
              <linearGradient id="next-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF" />
                <stop offset="1" stopColor="#FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </svg>
      );

    case "typescript":
    case "ts":
      return (
        <svg {...svgProps}>
          <title>TypeScript</title>
          <path d="M0 0h24v24H0z" fill={color || "#3178C6"} />
          <path d="M22 22h-3.333v-8.77h-3.14V10.23h9.613v3h-3.14zm-9.333 0h-3.34c0-2.82-.44-5.213-2-6.556V22H4V2.002h3.333V9.75c1.47-1.4 1.95-3.8 1.95-6.622l.05-1.127H12.67l-.05 1.488c-.06 2.923-1.02 5.584-2.85 7.422C11.537 12.822 12.667 16.57 12.667 22z" fill="#fff" style={{ display: "none" }} />
          {/* Clean standard TS block */}
          <path d="M1.5 1.5h21v21h-21z" fill={color || "#3178C6"} />
          <path d="M13.2 11.2h3v-2.3h-8.4v2.3h2.7v7.5h2.7v-7.5zm4.8 5c.4.6.9.9 1.6.9.7 0 1.2-.3 1.2-.8 0-.5-.4-.7-1.3-1.1-1.3-.5-2.2-1.1-2.2-2.4 0-1.3 1.1-2.2 2.6-2.2 1.2 0 2 .4 2.5 1.2l-1.6 1.4c-.3-.4-.6-.6-1-.6-.4 0-.7.2-.7.5 0 .4.3.6 1 .9 1.4.5 2.5 1.1 2.5 2.6 0 1.5-1.1 2.4-2.8 2.4-1.5 0-2.6-.6-3.1-1.7l1.8-1.2z" fill="#FFF" />
        </svg>
      );

    case "tailwind css":
    case "tailwindcss":
    case "tailwind":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none">
          <title>Tailwind CSS</title>
          <path
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
            fill={color || "#38BDF8"}
          />
        </svg>
      );

    case "framer motion":
    case "framermotion":
    case "framer":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Framer Motion</title>
          <path d="M0 0h24v12H12L0 0zm0 12h12l12 12H0V12zm12-12l12 12H12V0z" fill={color || "#FF0055"} />
        </svg>
      );

    case "three.js":
    case "threejs":
    case "three":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <title>Three.js</title>
          <path
            d="M12 2L2 7v10l10 5 10-5V7L12 2zM12 7l7.5 3.75M12 7v10M12 7L4.5 10.75M19.5 10.75v3.5M4.5 10.75v3.5M12 17l7.5-3.75M12 17L4.5 13.25"
            stroke={color || "#FFF"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "node.js":
    case "nodejs":
    case "node":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Node.js</title>
          <path
            d="M12 2a.965.965 0 0 0-.48.13l-8.4 4.8A1 1 0 0 0 2.62 7.8v9.6a1 1 0 0 0 .5.87l8.4 4.8a.965.965 0 0 0 .96 0l8.4-4.8a1 1 0 0 0 .5-.87V7.8a1 1 0 0 0-.5-.87l-8.4-4.8A.965.965 0 0 0 12 2zm-1 3.44v5.33l-4.57 2.6v-5.32zm2 0l4.57 2.61v5.32l-4.57-2.6zm-6.57 9.17l4.57 2.61v5.34l-4.57-2.61zm6.57 2.61l4.57-2.61v5.34l-4.57-2.61z"
            fill={color || "#339933"}
          />
        </svg>
      );

    case "express.js":
    case "expressjs":
    case "express":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <title>Express.js</title>
          <path
            d="M3 12h18M3 6h18M3 18h12"
            stroke={color || "#FFF"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* E logo look */}
          <rect x="2" y="2" width="20" height="20" rx="4" fill="rgba(255,255,255,0.02)" stroke={color || "#FFF"} strokeWidth="1.5" />
          <path d="M8 8h8v2H8v2h6v2H8v2h8" stroke={color || "#FFF"} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "mongodb":
    case "mongo":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>MongoDB</title>
          <path
            d="M17.15 10.37c-.77-2.92-2.31-5.18-3.95-7.7A26.96 26.96 0 0 0 12 0c-.39.87-.78 1.76-1.13 2.66-.9 2.3-2.11 4.54-2.83 6.94-.75 2.5-.52 5.09.43 7.5.39 1 1 1.83 1.54 2.76.71 1.2 1.34 2.45 2 3.69.17.33.27.45.41.45h.1a1.27 1.27 0 0 0 .42-.45c.67-1.24 1.3-2.49 2-3.69.52-.93 1.15-1.78 1.54-2.76.95-2.41 1.18-5 .43-7.5zm-5.1 8.87c-.63-.94-1.29-1.87-1.91-2.82a10.87 10.87 0 0 1-.95-3.41 11.23 11.23 0 0 1 2.86-8c.41-.45.85-.86 1.28-1.28v16.14l-.28-.63z"
            fill={color || "#47A248"}
          />
        </svg>
      );

    case "rest apis":
    case "rest api":
    case "rest":
    case "api":
    case "apis":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <title>REST APIs</title>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={color || "#38BDF8"} strokeLinecap="round" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={color || "#38BDF8"} strokeLinecap="round" />
        </svg>
      );

    case "github":
    case "git":
      return (
        <svg {...svgProps}>
          <title>GitHub</title>
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill={color || "#FFF"}
          />
        </svg>
      );

    case "figma":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Figma</title>
          <path
            d="M12 2C9.24 2 7 4.24 7 7c0 2.26 1.5 4.16 3.55 4.75C8.5 12.34 7 14.24 7 17c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.76-1.5-4.66-3.55-5.25C15.5 11.16 17 9.26 17 7c0-2.76-2.24-5-5-5zm-2.5 5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5zM12 14.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0-5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
            fill={color || "#F24E1E"}
            style={{ display: "none" }}
          />
          {/* Precise Figma 5-ring logo */}
          <path d="M8.5 12C6.567 12 5 10.433 5 8.5S6.567 5 8.5 5H12v7H8.5zm0 7c-1.933 0-3.5-1.567-3.5-3.5S6.567 12 8.5 12H12v7H8.5zM12 5c0-1.933 1.567-3.5 3.5-3.5S19 3.067 19 5s-1.567 3.5-3.5 3.5H12V5zm3.5 7c1.933 0 3.5-1.567 3.5-3.5S17.433 5 15.5 5H12v7h3.5zm0 7c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5H12v7h3.5z" fill={color || "#F24E1E"} />
        </svg>
      );

    case "firebase":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Firebase</title>
          <path
            d="M3.89 15.4L2.33 6.07A.52.52 0 0 1 3.2 5.5l3.87 3.86zm16.32-.4L16.4 5.3a.52.52 0 0 0-.82-.07l-3.23 3.23zM13.2 8.64L9.82 2.2a.52.52 0 0 0-.91 0L3.38 12.27z"
            fill={color || "#FFCA28"}
          />
          <path d="M20.27 15l-1.92-11.66a.52.52 0 0 0-.89-.31L3.18 17.5a.52.52 0 0 0 .43.85h16.22a.52.52 0 0 0 .44-.85z" fill={color || "#F57C00"} />
        </svg>
      );

    case "arduino":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Arduino</title>
          <path
            d="M7.5 7C4.467 7 2 9.243 2 12c0 2.757 2.467 5 5.5 5 1.934 0 3.633-.913 4.5-2.285.867 1.372 2.566 2.285 4.5 2.285 3.033 0 5.5-2.243 5.5-5 0-2.757-2.467-5-5.5-5-1.934 0-3.633.913-4.5 2.285C11.133 7.913 9.434 7 7.5 7zm0 1.5c2.04 0 3.5 1.547 3.5 3.5s-1.46 3.5-3.5 3.5S4 14.053 4 12s1.46-3.5 3.5-3.5zm9 0c2.04 0 3.5 1.547 3.5 3.5s-1.46 3.5-3.5 3.5S13 14.053 13 12s1.46-3.5 3.5-3.5zm-9 2.5v2h-1v-2h1zm9.5 1h-2v-1h2v1z"
            fill={color || "#00979D"}
          />
        </svg>
      );

    case "gsap":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <title>GSAP</title>
          {/* GSAP Green Wheel / Speed Ring logo */}
          <circle cx="12" cy="12" r="10" stroke={color || "#88CE02"} strokeWidth="1.5" />
          <path d="M8 12h8M12 8v8" stroke={color || "#88CE02"} strokeLinecap="round" />
          <path d="M12 12m-4 0a4 4 0 1 0 8 0 4 4 0 1 0 -8 0" stroke={color || "#88CE02"} />
        </svg>
      );

    case "linux":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Linux</title>
          <path
            d="M12 2C8.5 2 6.5 4.5 6.5 7.5c0 1.7.6 3.2 1.6 4.3C7.2 12.5 6.5 13.5 6 15c-.7 2 0 4 1.5 5 1.3.8 3.5.5 4.5-.5 1 1 3.2 1.3 4.5.5 1.5-1 2.2-3 1.5-5-.5-1.5-1.2-2.5-2.1-3.2 1-1.1 1.6-2.6 1.6-4.3C17.5 4.5 15.5 2 12 2zm0 1.5c2.5 0 4 1.8 4 4s-1.5 4-4 4-4-1.8-4-4 1.5-4 4-4z"
            fill={color || "#FCC624"}
          />
        </svg>
      );

    case "docker":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Docker</title>
          <path
            d="M13.983 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.917 0h2.118c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.118c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.918 0h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H8.148c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.918 0h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H5.23c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm2.918-2.917h2.119c.102 0 .186-.084.186-.186V5.856c0-.102-.084-.186-.186-.186H8.148c-.102 0-.186.084-.186.186v2.118c0 .102.084.187.186.187zm3.178 0h2.119c.102 0 .186-.084.186-.186V5.856c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.118c0 .102.084.187.186.187zm-6.096 0h2.119c.102 0 .186-.084.186-.186V5.856c0-.102-.084-.186-.186-.186H5.23c-.102 0-.186.084-.186.186v2.118c0 .102.084.187.186.187zm9.274 0h2.119c.102 0 .186-.084.186-.186V5.856c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.118c0 .102.084.187.186.187zm-3.178-2.918h2.119c.102 0 .186-.084.186-.186V2.937c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM23.904 12.2c-.419-.785-1.127-1.341-2.138-1.579-.059-.015-.12-.015-.175-.015-.718 0-1.35.321-1.785.834-.059.074-.112.155-.164.24-.132.222-.249.467-.349.719-.228.566-.341 1.157-.341 1.748 0 2.946 2.378 5.344 5.304 5.344.471 0 .918-.066 1.344-.191.074-.022.146-.051.219-.081.081-.037.155-.081.228-.124.081-.052.155-.11.228-.176.081-.067.146-.14.212-.213.067-.074.124-.154.175-.242.052-.081.095-.169.132-.257.037-.088.066-.183.088-.278.022-.095.037-.198.037-.3v-.029c.007-.052.015-.102.015-.154 0-.961-.278-1.897-.81-2.698zm-3.14 4.88h-14.77c-.439 0-.82-.242-1.02-.614a1.86 1.86 0 0 1 .15-1.921c.148-.22.341-.397.581-.51.109-.052.228-.088.349-.11h14.86c.121.022.24.058.349.11.24.113.433.29.581.51.248.373.3.834.15 1.206-.201.372-.582.614-1.23.629z"
            fill={color || "#2496ED"}
          />
        </svg>
      );

    case "redux":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Redux</title>
          <path
            d="M12 2c-.218 0-.437.042-.646.126L3.633 5.176c-.417.168-.707.54-.707.962V17.86c0 .422.29.794.707.962l7.72 3.05c.42.166.883.166 1.302 0l7.72-3.05c.417-.168.707-.54.707-.962V6.138c0-.422-.29-.794-.707-.962L12.646 2.126C12.437 2.042 12.218 2 12 2zm1 3.5l4.5 1.77v3.53L13 9.03zm-2 0V9.03L6.5 10.8V7.27zM5.5 12l2.5-.99v1.98zM16 11.01l2.5.99-2.5.99zm-4.5.8L7 13.58v-3.53l4.5 1.75zm1 0l4.5-1.75v3.53l-4.5-1.78z"
            fill={color || "#764ABC"}
            style={{ display: "none" }}
          />
          {/* Beautiful tri-loop official wireframe redux symbol */}
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.89-6.425a4.7 4.7 0 0 0 1.268-1.576h1.246c.3 0 .578-.175.71-.453l.423-.883a4.735 4.735 0 0 0 1.834.723 3.655 3.655 0 0 0 1.55-.175 3.634 3.634 0 0 0 2.228-2.614 3.738 3.738 0 0 0-.829-3.217 3.736 3.736 0 0 0-3.256-1.127l-.803.11c-.512-.663-1.226-1.157-2.03-1.408A3.67 3.67 0 0 0 12.012 5a3.64 3.64 0 0 0-3.328 2.01 3.717 3.717 0 0 0-.022 3.398 3.734 3.734 0 0 0-2.483 1.942 3.722 3.722 0 0 0 .532 3.315 3.725 3.725 0 0 0 3.2 1.636c.078 0 .157-.003.238-.01.353-.028.665-.213.844-.523l.117-.243zm2.513-.775l-.369.756-.118.243-.117-.243-.37-.756a2.766 2.766 0 0 1-1.077 0l-.369.756-.118.243-.117-.243-.37-.756a2.766 2.766 0 0 1-.954-.539l-.612.613-.171.171-.171-.171-.613-.612a2.766 2.766 0 0 1-.416-.954l-.84-.11-.24-.032.062-.234.364-1.356a2.753 2.753 0 0 1 .416-.954l-.612-.613-.172-.171.172-.172.612-.612c.23-.284.522-.511.85-.668v-1.1c0-.3 0-.6-.002-.9 2-.2 2.1 1.9 2.1 2 .4.04.8.12 1.2.22z" fill={color || "#764ABC"} />
        </svg>
      );

    case "zustand":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <title>Zustand</title>
          {/* Custom high-fidelity honey pot bear icon */}
          <path d="M12 2C8 2 6 4 6 7c0 3.5 3 5 6 7 3-2 6-3.5 6-7 0-3-2-5-6-5z" stroke={color || "#FFCA28"} fill="rgba(255, 202, 40, 0.1)" />
          <path d="M6 14v4a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-4" stroke={color || "#FFCA28"} />
          <circle cx="12" cy="7" r="1.5" fill={color || "#FFCA28"} />
        </svg>
      );

    case "jwt auth":
    case "jwt":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <title>JWT Auth</title>
          <rect x="3" y="11" width="18" height="10" rx="2" stroke={color || "#d63aff"} />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color || "#d63aff"} />
          <circle cx="12" cy="16" r="1" fill={color || "#d63aff"} />
        </svg>
      );

    case "socket.io":
    case "socket":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Socket.io</title>
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            fill={color || "#010101"}
            style={{ display: "none" }}
          />
          {/* Custom gorgeous circuit flash lightning */}
          <circle cx="12" cy="12" r="10" stroke={color || "#FFF"} strokeWidth="1.5" fill="none" />
          <path d="M13 5L7 13h5l-1 6 6-8h-5l2-6z" fill={color || "#FFF"} />
        </svg>
      );

    case "vercel":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Vercel</title>
          <path d="M24 22.525H0L12 1.475l12 21.05z" fill={color || "#FFF"} />
        </svg>
      );

    case "netlify":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none">
          <title>Netlify</title>
          <path
            d="M20.25 10.75l-7.5-7.5c-.414-.414-1.086-.414-1.5 0l-7.5 7.5c-.414.414-.414 1.086 0 1.5l7.5 7.5c.414.414 1.086.414 1.5 0l7.5-7.5c.414-.414.414-1.086 0-1.5z"
            stroke={color || "#00C7B7"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7.75l3.5 3.5M12 7.75L8.5 11.25M12 7.75v8.5"
            stroke={color || "#00C7B7"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "vs code":
    case "vscode":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none">
          <title>VS Code</title>
          <path
            d="M22 6.5L16 2.2V17l4.5-3.3 1.5-.7V6.5zM2 13v-2l10-7.5v17L2 13z"
            fill={color || "#007ACC"}
          />
          <path
            d="M16 2.2L7 9.5 2 11l5 1.5 9 7.3V2.2z"
            fill={color || "#007ACC"}
            opacity="0.85"
          />
        </svg>
      );

    case "postman":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          <title>Postman</title>
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v6z"
            fill={color || "#FF6C37"}
            style={{ display: "none" }}
          />
          {/* Postman Space Rocket official shape */}
          <path d="M12.03 2.012c-.173.003-.34.02-.5.053-.467.094-.88.358-1.187.727a26.837 26.837 0 0 0-3.315 5.617c-.896 2.115-1.42 4.417-1.488 6.726a4.41 4.41 0 0 0-1.196.48c-.64.385-1.077.962-1.246 1.636a4.137 4.137 0 0 0 .592 3.323c.53.794 1.396 1.295 2.378 1.365a12.637 12.637 0 0 0 3.018.172v-1.745c0-.498.24-.962.639-1.233l2.846-1.921 2.846 1.921c.4.271.64.735.64 1.233v1.745c1.026.046 2.046-.1 3.018-.172.982-.07 1.848-.571 2.378-1.365a4.137 4.137 0 0 0 .592-3.323c-.169-.674-.606-1.251-1.246-1.636-.34-.204-.73-.346-1.196-.48-.068-2.31-.592-4.61-1.488-6.726A26.837 26.837 0 0 0 13.717 2.79a1.996 1.996 0 0 0-1.187-.727 1.97 1.97 0 0 0-.5-.053z" fill={color || "#FF6C37"} />
        </svg>
      );

    default:
      // A premium generic tech-cube/code icon fallback
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <title>{name}</title>
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={color || "#38BDF8"} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 4l-4 16" stroke={color || "#38BDF8"} strokeLinecap="round" />
        </svg>
      );
  }
}
