import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Github, Linkedin, Instagram, ExternalLink, Menu, X, Cpu, Globe, Palette, Video, Layout, Server, Zap, Camera, ArrowRight, Youtube, Play } from "lucide-react";
import { useState, useEffect } from "react";
import type { Project } from "../types";

const GLASS = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(28px) saturate(200%)",
  WebkitBackdropFilter: "blur(28px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.85)",
  boxShadow: "0 4px 28px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)"
} as const;

const GLASS_STRONG = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(40px) saturate(220%)",
  WebkitBackdropFilter: "blur(40px) saturate(220%)",
  border: "1px solid rgba(255,255,255,0.95)",
  boxShadow: "0 8px 48px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,1)"
} as const;

const roles = ["AI", "Web Development", "UI/UX Design", "IoT", "Robotics", "Electronics", "Product Design", "Creative Media", "Graphic Design", "Video Editing", "Frontend Dev", "Backend Dev"];

const skillGroups = [
  { icon: <Cpu className="w-5 h-5" />, title: "Hardware & IoT", color: "#e8f0fe", border: "#c7d9fd", items: ["ESP32", "Arduino", "IoT", "Electronics", "Robotics"] },
  { icon: <Globe className="w-5 h-5" />, title: "Web Development", color: "#e6f9ee", border: "#b6efd0", items: ["HTML / CSS", "Frontend Dev", "Backend Dev", "Git"] },
  { icon: <Palette className="w-5 h-5" />, title: "Design", color: "#fdf0fb", border: "#f5cef0", items: ["UI / UX Design", "Graphic Design", "Product Design"] },
  { icon: <Video className="w-5 h-5" />, title: "Creative Media", color: "#fff6e6", border: "#fde4b0", items: ["Video Editing", "Creative Media", "Visual Storytelling"] }
];

const DEFAULT_PROJECTS: Project[] = [
  { id: "1", title: "Techraft Studio", description: "Official website and digital hub for @techraft studio — my main platform showcasing innovative IoT projects, web applications, creative work, and comprehensive tech solutions across hardware and software.", tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"], imageUrl: "", githubUrl: "https://project.techraft.store", youtubeUrl: "" },
  { id: "2", title: "ESP32 IoT Dashboard", description: "Real-time monitoring dashboard for ESP32 sensors with live data visualization and remote control.", tech: ["ESP32", "React", "WebSocket", "Firebase"], imageUrl: "", githubUrl: "", youtubeUrl: "" },
  { id: "3", title: "Smart Home Automation", description: "ESP32-based home automation system with mobile app control and voice assistant integration.", tech: ["ESP32", "Arduino", "MQTT", "React Native"], imageUrl: "", githubUrl: "", youtubeUrl: "" },
  { id: "4", title: "Weather Station", description: "Complete weather monitoring using ESP32 with cloud data logging and historical trend analysis.", tech: ["ESP32", "Python", "Node.js", "MongoDB"], imageUrl: "", githubUrl: "", youtubeUrl: "" },
  { id: "5", title: "Portfolio Website", description: "Personal portfolio with glassmorphism design, smooth animations and a fully responsive layout.", tech: ["React", "Tailwind CSS", "Motion", "Vite"], imageUrl: "", githubUrl: "", youtubeUrl: "" },
  { id: "6", title: "Task Tracker App", description: "Productivity app for tracking tasks and projects with real-time collaboration features.", tech: ["React", "Firebase", "Tailwind CSS"], imageUrl: "", githubUrl: "", youtubeUrl: "" }
];

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

function FloatingOrb({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none" style={style}
      animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }} />
  );
}

function RoleCycler() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % roles.length), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="overflow-hidden h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span key={index}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ fontSize: "clamp(14px,2vw,18px)", fontWeight: 600, color: "#3a3a3c", letterSpacing: "0.04em", fontFamily: "'Space Grotesk',sans-serif" }}>
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  const ytId = getYoutubeId(url);
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }} />
      <motion.div className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
        style={{ aspectRatio: "16/9", zIndex: 1 }}
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={e => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen />
        <button onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full"
          style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}>
          <X className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [playVideo, setPlayVideo] = useState(false);
  const ytId = project.youtubeUrl ? getYoutubeId(project.youtubeUrl) : null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }} />

      <motion.div className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 32px 80px rgba(0,0,0,0.18)", maxHeight: "90vh", overflowY: "auto" }}
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full"
          style={{ background: "rgba(0,0,0,0.07)", color: "#6e6e73" }}>
          <X className="w-5 h-5" />
        </button>

        {/* Image / Video hero */}
        {(project.imageUrl || ytId) && (
          <div className="relative w-full" style={{ height: 260 }}>
            <img
              src={project.imageUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "")}
              alt={project.title} className="w-full h-full object-cover" />
            {ytId && !playVideo && (
              <motion.button
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.35)" }}
                onClick={() => setPlayVideo(true)}
                whileHover={{ background: "rgba(0,0,0,0.5)" }}>
                <motion.div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                  whileHover={{ scale: 1.1 }}>
                  <Play className="w-7 h-7 text-black ml-1" />
                </motion.div>
              </motion.button>
            )}
            {ytId && playVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen" allowFullScreen />
            )}
          </div>
        )}

        <div className="p-8">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.youtubeUrl && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: "#fee2e2", border: "1px solid #fca5a5", fontSize: "11px", fontWeight: 700, color: "#dc2626" }}>
                <Youtube className="w-3 h-3" /> VIDEO
              </span>
            )}
            {project.githubUrl && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)", fontSize: "11px", fontWeight: 700, color: "#3a3a3c" }}>
                <Github className="w-3 h-3" /> OPEN SOURCE
              </span>
            )}
          </div>

          <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.03em", fontFamily: "'Space Grotesk',sans-serif", marginBottom: "12px" }}>
            {project.title}
          </h2>

          <p style={{ fontSize: "15px", color: "#3a3a3c", lineHeight: 1.8, marginBottom: "24px" }}>
            {project.description}
          </p>

          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, i) => (
                <motion.span key={tech}
                  className="px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.09)", fontSize: "12px", fontWeight: 600, color: "#3a3a3c", letterSpacing: "0.04em" }}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}>
                  {tech}
                </motion.span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            {project.githubUrl && (
              <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl"
                style={{ background: "#1d1d1f", color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <ExternalLink className="w-4 h-4" /> {project.githubUrl.includes('github.com') ? 'VIEW ON GITHUB' : 'VISIT WEBSITE'}
              </motion.a>
            )}
            {project.youtubeUrl && (
              <motion.button onClick={() => setPlayVideo(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl"
                style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#dc2626", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Play className="w-4 h-4" /> WATCH VIDEO
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ytId = project.youtubeUrl ? getYoutubeId(project.youtubeUrl) : null;

  return (
    <motion.div className="rounded-3xl overflow-hidden relative cursor-pointer group"
      style={{ ...GLASS, transition: "box-shadow 0.3s ease" }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 80 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}>

      <motion.div className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.5) 0%,transparent 50%)", opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} />

      {/* Thumbnail */}
      {(project.imageUrl || ytId) && (
        <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
          <img
            src={project.imageUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "")}
            alt={project.title} className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          {ytId && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.9)" }}>
                <Play className="w-5 h-5 text-black ml-0.5" />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-7 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {project.youtubeUrl && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: "#fee2e2", border: "1px solid #fca5a5", fontSize: "10px", fontWeight: 700, color: "#dc2626" }}>
                <Youtube className="w-3 h-3" /> VIDEO
              </span>
            )}
            {project.githubUrl && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)", fontSize: "10px", fontWeight: 700, color: "#3a3a3c" }}>
                <Github className="w-3 h-3" /> CODE
              </span>
            )}
          </div>
          <ExternalLink className="w-4 h-4" style={{ color: "#aeaeb2" }} />
        </div>

        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1d1d1f", marginBottom: "10px", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk',sans-serif" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#6e6e73", lineHeight: 1.75, marginBottom: "18px" }}>
          {project.description.length > 100 ? project.description.slice(0, 100) + "…" : project.description}
        </p>

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map(tech => (
              <span key={tech} className="px-3 py-1 rounded-full"
                style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", color: "#3a3a3c" }}>
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && <span style={{ fontSize: "11px", color: "#aeaeb2", alignSelf: "center" }}>+{project.tech.length - 4}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.18], [0, -60]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kdj_projects");
      if (stored) setUserProjects(JSON.parse(stored));
    } catch {}
  }, []);

  const allProjects = [...DEFAULT_PROJECTS, ...userProjects];
  const whatsappNumber = "9743714881";

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(145deg,#f2f2f5 0%,#e9e9ed 50%,#eeecf3 100%)", fontFamily: "'Inter',-apple-system,sans-serif", color: "#1d1d1f" }}>

      <motion.div className="fixed top-0 left-0 z-[60] h-[2px]"
        style={{ width: progressWidth, background: "linear-gradient(90deg,#1d1d1f,#6e6e73)", transformOrigin: "left" }} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <FloatingOrb style={{ top: "-8%", right: "5%", width: 600, height: 600, background: "radial-gradient(circle,rgba(170,175,210,0.5) 0%,transparent 65%)", filter: "blur(50px)" }} />
        <FloatingOrb style={{ top: "35%", left: "-6%", width: 480, height: 480, background: "radial-gradient(circle,rgba(195,205,225,0.4) 0%,transparent 65%)", filter: "blur(70px)" }} />
        <FloatingOrb style={{ bottom: "8%", right: "12%", width: 550, height: 550, background: "radial-gradient(circle,rgba(185,178,215,0.35) 0%,transparent 65%)", filter: "blur(90px)" }} />
        <FloatingOrb style={{ top: "55%", left: "35%", width: 380, height: 380, background: "radial-gradient(circle,rgba(210,200,230,0.25) 0%,transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* NAV */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50"
        style={{ ...GLASS_STRONG, borderLeft: "none", borderRight: "none", borderTop: "none", borderRadius: 0 }}
        initial={{ y: -80 }} animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <motion.div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ ...GLASS }}
              whileHover={{ scale: 1.08, rotate: 5 }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#1d1d1f", letterSpacing: "0.04em", fontFamily: "'Space Grotesk',sans-serif" }}>KH</span>
            </motion.div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "0.06em" }}>KEDRAJ H</div>
              <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", color: "#6e6e73", marginTop: "2px" }}>@techraft studio</div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {["Projects", "Skills", "About", "Contact"].map((item, i) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`}
                className="relative"
                style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 600 }}
                initial={{ opacity: 0, y: -10, color: "#6e6e73" }} animate={{ opacity: 1, y: 0, color: "#6e6e73" }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ color: "#1d1d1f" }}>
                {item.toUpperCase()}
                <motion.div className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-black origin-left"
                  initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25 }} />
              </motion.a>
            ))}
          </div>

          <motion.button onClick={() => setMenuOpen(!menuOpen)} className="p-2.5 rounded-xl md:hidden"
            style={{ ...GLASS }} whileTap={{ scale: 0.94 }}>
            <AnimatePresence mode="wait">
              <motion.div key={menuOpen ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {menuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ background: "rgba(238,238,242,0.96)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
            {["Projects", "Skills", "About", "Contact"].map((item, i) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Space Grotesk',sans-serif" }}
                initial={{ opacity: 0, y: 20, color: "#1d1d1f" }} animate={{ opacity: 1, y: 0, color: "#1d1d1f" }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ x: 8, color: "#3a3a3c" }}>
                {item.toUpperCase()}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        <motion.a href="https://www.linkedin.com/in/kedaraj-holikatti?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl"
          style={{ ...GLASS }}
          initial={{ opacity: 0, x: -30, color: "#6e6e73" }} animate={{ opacity: 1, x: 0, color: "#6e6e73" }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.15, color: "#1d1d1f" }}>
          <Linkedin className="w-4 h-4" />
        </motion.a>
        <motion.a href="https://www.instagram.com/kedaraj___?igsh=MW92aXl4NnliYnV4Ng%3D%3D" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl"
          style={{ ...GLASS }}
          initial={{ opacity: 0, x: -30, color: "#6e6e73" }} animate={{ opacity: 1, x: 0, color: "#6e6e73" }}
          transition={{ delay: 0.72, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.15, color: "#1d1d1f" }}>
          <Instagram className="w-4 h-4" />
        </motion.a>
        <motion.a href="https://github.com/kedaraj" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl"
          style={{ ...GLASS }}
          initial={{ opacity: 0, x: -30, color: "#6e6e73" }} animate={{ opacity: 1, x: 0, color: "#6e6e73" }}
          transition={{ delay: 0.84, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.15, color: "#1d1d1f" }}>
          <Github className="w-4 h-4" />
        </motion.a>
      </div>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <motion.div className="relative z-10 text-center max-w-5xl w-full"
          style={{ opacity: heroOpacity, y: heroY }}>
          <motion.div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
            style={{ ...GLASS }}
            initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}>
            <motion.div className="w-2 h-2 rounded-full bg-black"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.25em", fontWeight: 700, color: "#3a3a3c", fontFamily: "'Space Grotesk',sans-serif" }}>
              @TECHRAFT STUDIO
            </span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "clamp(64px,13vw,150px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.88, color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif" }}>
              KEDRAJ H
            </motion.h1>
          </div>

          <motion.div className="mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <RoleCycler />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            style={{ fontSize: "14px", color: "#8e8e93", letterSpacing: "0.06em", fontWeight: 500, marginBottom: "48px" }}>
            Computer Science Engineering Student
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-2 mb-14"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {["AI", "IoT", "Robotics", "UI/UX", "Web Dev", "Electronics", "Graphic Design", "Video Editing", "Product Design"].map((tag, i) => (
              <motion.span key={tag} className="px-3.5 py-1.5 rounded-full cursor-default"
                style={{ ...GLASS, fontSize: "11px", fontWeight: 600, color: "#3a3a3c", letterSpacing: "0.06em" }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -3 }}>
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 100 }}>
            <motion.a href="#projects" className="flex items-center gap-2 px-8 py-4 rounded-2xl"
              style={{ background: "#1d1d1f", color: "#fff", fontSize: "13px", letterSpacing: "0.1em", fontWeight: 700 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              VIEW PROJECTS <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a href="#contact" className="px-8 py-4 rounded-2xl"
              style={{ ...GLASS, fontSize: "13px", letterSpacing: "0.1em", fontWeight: 700, color: "#1d1d1f" }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              CONTACT ME
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "80px 80px" }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 6, repeat: Infinity }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(transparent,#e9e9ed)" }} />
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }} className="mb-20">
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.35em", fontWeight: 700, color: "#aeaeb2", marginBottom: "14px", fontFamily: "'Space Grotesk',sans-serif" }}>SELECTED WORK</p>
              <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif" }}>
                Featured Projects
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }} className="mb-20">
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", fontWeight: 700, color: "#aeaeb2", marginBottom: "14px", fontFamily: "'Space Grotesk',sans-serif" }}>EXPERTISE</p>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif" }}>
              Skills & Technologies
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((group, gi) => (
              <motion.div key={group.title} className="rounded-3xl p-7 relative overflow-hidden"
                style={{ ...GLASS_STRONG, transition: "box-shadow 0.3s ease" }}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: gi * 0.1, type: "spring", stiffness: 90 }}
                whileHover={{ y: -6 }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: group.border }} />
                <motion.div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: group.color, border: `1.5px solid ${group.border}`, color: "#1d1d1f" }}
                  whileHover={{ rotate: 8, scale: 1.1 }}>
                  {group.icon}
                </motion.div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1d1d1f", marginBottom: "16px", fontFamily: "'Space Grotesk',sans-serif" }}>{group.title}</h3>
                <div className="flex flex-col gap-3">
                  {group.items.map((skill, si) => (
                    <motion.div key={skill} className="flex items-center gap-2.5"
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: gi * 0.1 + si * 0.06 }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: group.border }} />
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "#3a3a3c" }}>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }} className="mb-20">
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", fontWeight: 700, color: "#aeaeb2", marginBottom: "14px", fontFamily: "'Space Grotesk',sans-serif" }}>WHO I AM</p>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif" }}>About Me</h2>
          </motion.div>
          <motion.div className="rounded-3xl overflow-hidden relative" style={{ ...GLASS_STRONG }}
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 70 }}>
            <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg,transparent 0%,rgba(0,0,0,0.12) 30%,rgba(0,0,0,0.06) 70%,transparent 100%)" }} />
            <div className="p-10 md:p-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <Camera className="w-3.5 h-3.5" style={{ color: "#6e6e73" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#6e6e73" }}>@TECHRAFT STUDIO</span>
              </div>
              <p style={{ fontSize: "17px", color: "#3a3a3c", lineHeight: 1.85, marginBottom: "20px" }}>
                I'm <strong style={{ color: "#1d1d1f" }}>Kedraj H</strong> — a <strong style={{ color: "#1d1d1f" }}>Computer Science Engineering student</strong> passionate about building across every layer of technology. From microcontrollers to full-stack apps, hardware to cloud, I explore it all. 🚀
              </p>
              <p style={{ fontSize: "17px", color: "#3a3a3c", lineHeight: 1.85, marginBottom: "52px" }}>
                Through <strong style={{ color: "#1d1d1f" }}>@techraft studio</strong> I blend IoT, robotics, web development, UI/UX design, graphic design, and creative media into holistic digital products. If it's technology or creativity — I'm in.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[{ value: `${allProjects.length}`, label: "Projects" }, { value: "CSE", label: "Degree" }, { value: "12+", label: "Skills" }, { value: "∞", label: "Curiosity" }].map(({ value, label }, i) => (
                  <motion.div key={label} className="rounded-2xl p-6 text-center"
                    style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}
                    initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 150 }}
                    whileHover={{ scale: 1.04 }}>
                    <div style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.04em", color: "#1d1d1f", marginBottom: "6px", fontFamily: "'Space Grotesk',sans-serif" }}>{value}</div>
                    <div style={{ fontSize: "11px", letterSpacing: "0.18em", fontWeight: 600, color: "#8e8e93" }}>{label.toUpperCase()}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", fontWeight: 700, color: "#aeaeb2", marginBottom: "16px", fontFamily: "'Space Grotesk',sans-serif" }}>LET'S BUILD SOMETHING</p>
            <h2 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#1d1d1f", lineHeight: 0.95, marginBottom: "24px", fontFamily: "'Space Grotesk',sans-serif" }}>Get In Touch</h2>
            <p style={{ fontSize: "16px", color: "#6e6e73", marginBottom: "48px", lineHeight: 1.65 }}>
              Have a project, collab idea, or just want to say hi?<br />Hit me up — I'm always open. 🚀
            </p>
            <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl mb-10"
              style={{ background: "#1d1d1f", color: "#fff", fontSize: "13px", letterSpacing: "0.12em", fontWeight: 700 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              CONTACT VIA WHATSAPP <ArrowRight className="w-4 h-4" />
            </motion.a>
            <div className="flex gap-3 justify-center">
              <motion.a href="https://github.com/kedaraj" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl"
                style={{ ...GLASS }}
                initial={{ opacity: 0, y: 20, color: "#6e6e73" }}
                whileInView={{ opacity: 1, y: 0, color: "#6e6e73" }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                whileHover={{ scale: 1.12, color: "#1d1d1f", y: -4 }}>
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/kedaraj-holikatti?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl"
                style={{ ...GLASS }}
                initial={{ opacity: 0, y: 20, color: "#6e6e73" }}
                whileInView={{ opacity: 1, y: 0, color: "#6e6e73" }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.12, color: "#1d1d1f", y: -4 }}>
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a href="https://www.instagram.com/kedaraj___?igsh=MW92aXl4NnliYnV4Ng%3D%3D" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl"
                style={{ ...GLASS }}
                initial={{ opacity: 0, y: 20, color: "#6e6e73" }}
                whileInView={{ opacity: 1, y: 0, color: "#6e6e73" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.12, color: "#1d1d1f", y: -4 }}>
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <footer className="py-8 px-6 relative z-10" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 500, color: "#aeaeb2" }}>© 2026 KEDRAJ H — ALL RIGHTS RESERVED</p>
          <p style={{ fontSize: "12px", letterSpacing: "0.08em", fontWeight: 600, color: "#aeaeb2", fontFamily: "'Space Grotesk',sans-serif" }}>@TECHRAFT STUDIO 🚀</p>
        </div>
      </footer>
    </div>
  );
}