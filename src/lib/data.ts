// ============================================
// PORTFOLIO DATA - Central data source
// ============================================

export const personalInfo = {
  name: "Ashu Yadav",
  title: "Full Stack Developer & AI Enthusiast",
  email: "ashuya38@gmail.com",
  phone: "+919371493956",
  github: "https://github.com/ashuyadav180",
  linkedin: "https://www.linkedin.com/in/ashu-yadav-843a85277",
  location: "Pune, India",
  university: "B.Tech. IT (2024 - 2028)",
  bio: "B.Tech. Information Technology student at MIT Academy of Engineering, Pune. Dedicated full-stack developer and AI automation engineer focused on building robust microservice pipelines, scalable web architectures, and immersive interactive user interfaces.",
  shortBio: "Building automated AI engines and secure full-stack ecosystems.",
};

export const roles = [
  "Full Stack Developer",
  "AI Automation Engineer",
  "FastAPI & Node.js Developer",
  "BTech IT Student @ MIT Academy",
  "Creative UI/UX Visual Architect",
];

export const stats = [
  { label: "Core Projects Completed", value: 2, suffix: "" },
  { label: "Technologies Mastered", value: 25, suffix: "+" },
  { label: "API Services Integrated", value: 8, suffix: "+" },
  { label: "Academic CGPA", value: 7, suffix: ".73 / 10" },
];

export const skills = {
  Frontend: [
    { name: "React.js", icon: "⚛️", level: 90, color: "#38bdf8" },
    { name: "Vite", icon: "⚡", level: 86, color: "#ffc107" },
    { name: "HTML5", icon: "🌐", level: 92, color: "#e34f26" },
    { name: "CSS3", icon: "🎨", level: 90, color: "#1572b6" },
    { name: "JavaScript", icon: "JS", level: 88, color: "#f7df1e" },
    { name: "Socket.IO", icon: "🔌", level: 82, color: "#00d2ff" },
  ],
  Backend: [
    { name: "Node.js", icon: "🟢", level: 88, color: "#339933" },
    { name: "Express.js", icon: "🚀", level: 85, color: "#ffffff" },
    { name: "FastAPI", icon: "⚡", level: 84, color: "#009688" },
    { name: "Python", icon: "🐍", level: 80, color: "#3776ab" },
    { name: "REST APIs", icon: "🔗", level: 90, color: "#00bcd4" },
    { name: "Microservices", icon: "⚙️", level: 78, color: "#8b5cf6" },
  ],
  Tools: [
    { name: "MongoDB", icon: "🍃", level: 84, color: "#47a248" },
    { name: "SQLite", icon: "🗄️", level: 75, color: "#003b57" },
    { name: "Firebase", icon: "🔥", level: 80, color: "#ffca28" },
    { name: "GitHub", icon: "🐙", level: 90, color: "#ffffff" },
    { name: "FFmpeg", icon: "🎥", level: 80, color: "#00e676" },
    { name: "Postman", icon: "📬", level: 85, color: "#ff6c37" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "AUTOREEL.AI",
    subtitle: "AI Video Generation Platform",
    description:
      "A full-stack AI-powered video reel generation platform that automates the entire content pipeline from script creation, voice synthesis, image generation, video assembly, subtitle generation, to one-click publishing.",
    longDescription:
      "AutoReel.AI orchestrates an 8-stage microservice pipeline using Python and FastAPI, managed by a Node.js backend. Integrating 6 major AI APIs (Gemini, Claude, Stability, ElevenLabs, Whisper) with real-time Socket.IO status tracks, it compiles video shorts automatically with FFmpeg.",
    features: [
      "8-stage Python/FastAPI backend worker microservice pipeline",
      "Integrated Gemini, Claude, Stability, ElevenLabs, Whisper APIs",
      "Real-time WebSocket-based job tracking via Socket.IO channel streams",
      "Video libraries, system health tracking, Chart.js analytics dashboard",
      "Automated YouTube Shorts publishing via secure OAuth2 & Data API v3",
    ],
    tech: ["React.js", "Node.js", "Python", "FastAPI", "Gemini AI", "Stability SDXL", "RunwayML", "ElevenLabs", "FFmpeg"],
    github: "https://github.com/ashuyadav180",
    live: "#",
    color: "#38bdf8",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    category: "AI / Microservices",
    status: "Completed",
    year: "2026",
    image: "/projects/autoreel.jpg",
  },
  {
    id: 2,
    title: "Medical Store Management",
    subtitle: "Pharmacy & Dispatch Operations Portal",
    description:
      "A full-stack pharmacy management platform featuring custom interactive dashboards for customers, store administrators, and delivery agents covering ordering, prescription checks, and shipment updates.",
    longDescription:
      "A premium enterprise operations system with real-time shipment status channels using Socket.IO, secure JWT and Firebase auth layers, Cloudinary verification flows, and direct WhatsApp and Email notification pipelines.",
    features: [
      "Role-based customer, administrator, and courier portal access",
      "Real-time order dispatch and delivery tracking with Socket.IO",
      "Prescription upload and validation logic via Cloudinary cloud API",
      "Double authentication layers using secure JWT tokens & Firebase",
      "Automated email alerts and WhatsApp customer notification triggers",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Firebase"],
    github: "https://github.com/ashuyadav180",
    live: "#",
    color: "#8b5cf6",
    gradient: "from-purple-500 via-violet-500 to-pink-500",
    category: "Full Stack Web App",
    status: "Completed",
    year: "2025",
    image: "/projects/medical.jpg",
  },
];

export const experience = [
  {
    year: "2022",
    title: "10th Metric Graduation",
    subtitle: "Sunrise English Medium School",
    description: "Graduated secondary education with a stellar score of 92.80%. Discovered foundational logic structures and basic coding.",
    type: "education",
    icon: "🎓",
    color: "#38bdf8",
  },
  {
    year: "2024",
    title: "12th Senior Secondary",
    subtitle: "Shri Shivaji Junior College",
    description: "Completed higher secondary curriculum majoring in Science & Mathematics with 65.83%, preparing for engineering paths.",
    type: "education",
    icon: "🏫",
    color: "#8b5cf6",
  },
  {
    year: "2024 - 2028",
    title: "B.Tech. Information Technology",
    subtitle: "MIT Academy of Engineering, Pune",
    description: "Enrolled in B.Tech IT program. Building advanced engineering foundations with a strong CGPA of 7.73/10.",
    type: "education",
    icon: "🎓",
    color: "#22d3ee",
  },
  {
    year: "Jun - Aug 2025",
    title: "Cybersecurity Virtual Internship",
    subtitle: "Cisco Networking Academy | AICTE",
    description: "Focused on network security diagnostics, virtualization, vulnerabilities threat management, and threat mitigations under Skill India programs.",
    type: "internship",
    icon: "🛡️",
    color: "#ef4444",
  },
  {
    year: "Jul - Aug 2025",
    title: "Emerging Technologies (AI & Cloud)",
    subtitle: "IBM SkillsBuild | Edunet Foundation",
    description: "Engineered localized cloud integrations, generative AI pipelines, model training basics, and multi-tenant architectures.",
    type: "internship",
    icon: "☁️",
    color: "#f59e0b",
  },
  {
    year: "Oct - Dec 2025",
    title: "Medical Store Management",
    subtitle: "Full Stack Pharmacy Portal",
    description: "Developed pharmacy dashboard portal featuring real-time dispatch tracking, Cloudinary verification logic, and automated WhatsApp/email pipelines.",
    type: "project",
    icon: "💊",
    color: "#d946ef",
  },
  {
    year: "Jan - Mar 2026",
    title: "AUTOREEL.AI Development",
    subtitle: "AI Video Generation Engine",
    description: "Architected an 8-stage microservice system parsing prompt scriptings, text-to-voice synthesizers, and auto-sync subtitles with Gemini & Stability AI SDXL.",
    type: "project",
    icon: "🤖",
    color: "#06b6d4",
  }
];

export const techStack = [
  { name: "React", color: "#61DAFB", icon: "⚛️" },
  { name: "Node.js", color: "#339933", icon: "🟢" },
  { name: "Python", color: "#3776ab", icon: "🐍" },
  { name: "FastAPI", color: "#009688", icon: "⚡" },
  { name: "MongoDB", color: "#47A248", icon: "🍃" },
  { name: "Firebase", color: "#FFCA28", icon: "🔥" },
  { name: "SQLite", color: "#003b57", icon: "🗄️" },
  { name: "Gemini", color: "#38bdf8", icon: "✨" },
  { name: "Stability", color: "#ff0055", icon: "🔮" },
  { name: "FFmpeg", color: "#00e676", icon: "🎥" },
  { name: "Postman", color: "#ff6c37", icon: "📬" },
  { name: "C++", color: "#00599c", icon: "💻" },
  { name: "Java", color: "#f89820", icon: "☕" },
  { name: "GitHub", color: "#ffffff", icon: "🐙" },
  { name: "Vite", color: "#ffc107", icon: "⚡" },
];
