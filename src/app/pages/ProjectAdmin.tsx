import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, Trash2, Github, Youtube, Image, Tag, X, Play, ExternalLink, Edit3, Check } from "lucide-react";
import type { Project } from "../types";

const GLASS = {
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(28px) saturate(200%)",
  WebkitBackdropFilter: "blur(28px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow: "0 4px 28px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.95)"
} as const;

const GLASS_STRONG = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(40px) saturate(220%)",
  WebkitBackdropFilter: "blur(40px) saturate(220%)",
  border: "1px solid rgba(255,255,255,0.95)",
  boxShadow: "0 8px 48px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,1)"
} as const;

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

const EMPTY_FORM = { title: "", description: "", imageUrl: "", githubUrl: "", youtubeUrl: "", techInput: "", tech: [] as string[] };

function FloatingOrb({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none" style={style}
      animate={{ y: [0, -25, 0], x: [0, 12, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
  );
}

function InputField({ label, icon, value, onChange, placeholder, type = "text" }: {
  label: string; icon: React.ReactNode; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#6e6e73", display: "block", marginBottom: "8px", fontFamily: "'Space Grotesk',sans-serif" }}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#aeaeb2" }}>{icon}</div>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none transition-all"
          style={{
            ...GLASS,
            fontSize: "14px",
            color: "#1d1d1f",
            fontFamily: "'Inter',sans-serif"
          }}
          onFocus={e => { e.target.style.border = "1px solid rgba(0,0,0,0.2)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.06), 0 4px 28px rgba(0,0,0,0.07)"; }}
          onBlur={e => { e.target.style.border = GLASS.border; e.target.style.boxShadow = GLASS.boxShadow; }}
        />
      </div>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#6e6e73", display: "block", marginBottom: "8px", fontFamily: "'Space Grotesk',sans-serif" }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all resize-none"
        style={{ ...GLASS, fontSize: "14px", color: "#1d1d1f", fontFamily: "'Inter',sans-serif" }}
        onFocus={e => { e.target.style.border = "1px solid rgba(0,0,0,0.2)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.06)"; }}
        onBlur={e => { e.target.style.border = GLASS.border; e.target.style.boxShadow = GLASS.boxShadow; }}
      />
    </div>
  );
}

const ADMIN_PASSWORD = "techraft2026";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt() {
    if (input === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
      setInput("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative"
      style={{ background: "linear-gradient(145deg,#f2f2f5 0%,#e9e9ed 50%,#eeecf3 100%)", fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] right-[8%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(170,175,210,0.45) 0%,transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[420px] h-[420px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(195,205,225,0.35) 0%,transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <motion.div className="w-full max-w-sm relative z-10"
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}>
        <motion.div className="rounded-3xl overflow-hidden" style={{ ...GLASS_STRONG }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}>
          <div className="p-10 flex flex-col items-center">
            <motion.div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)" }}
              animate={error ? { rotate: [0, -5, 5, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}>
              <span style={{ fontSize: "28px" }}>{error ? "🔒" : "🔐"}</span>
            </motion.div>

            <p style={{ fontSize: "11px", letterSpacing: "0.3em", fontWeight: 700, color: "#aeaeb2", marginBottom: "8px", fontFamily: "'Space Grotesk',sans-serif" }}>
              RESTRICTED ACCESS
            </p>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.02em", marginBottom: "24px" }}>
              Project Manager
            </h2>

            <div className="w-full mb-3">
              <input
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setError(false); }}
                onKeyDown={e => e.key === "Enter" && attempt()}
                placeholder="Enter password"
                className="w-full px-4 py-3.5 rounded-2xl outline-none text-center transition-all"
                style={{
                  ...GLASS,
                  fontSize: "16px",
                  letterSpacing: "0.2em",
                  color: error ? "#ef4444" : "#1d1d1f",
                  border: error ? "1px solid rgba(239,68,68,0.4)" : GLASS.border
                }}
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, textAlign: "center", marginTop: "8px" }}>
                    Incorrect password
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button onClick={attempt}
              className="w-full py-3.5 rounded-2xl"
              style={{ background: "#1d1d1f", color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              UNLOCK
            </motion.button>

            <motion.button onClick={() => navigate("/")}
              className="mt-4 text-sm"
              style={{ color: "#aeaeb2", fontSize: "12px", fontWeight: 500 }}
              whileHover={{ color: "#6e6e73" }}>
              ← Back to portfolio
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProjectAdmin() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saved, setSaved] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kdj_projects");
      if (stored) setProjects(JSON.parse(stored));
    } catch {}
  }, []);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  function persist(list: Project[]) {
    localStorage.setItem("kdj_projects", JSON.stringify(list));
    setProjects(list);
  }

  function addTech() {
    const tag = form.techInput.trim();
    if (tag && !form.tech.includes(tag)) {
      setForm(f => ({ ...f, tech: [...f.tech, tag], techInput: "" }));
    }
  }

  function removeTech(tag: string) {
    setForm(f => ({ ...f, tech: f.tech.filter(t => t !== tag) }));
  }

  function startEdit(p: Project) {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, imageUrl: p.imageUrl, githubUrl: p.githubUrl, youtubeUrl: p.youtubeUrl, techInput: "", tech: [...p.tech] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit() {
    if (!form.title.trim()) return;
    if (editId) {
      const updated = projects.map(p => p.id === editId ? { ...p, ...form } : p);
      persist(updated);
      setEditId(null);
    } else {
      const newProject: Project = { id: Date.now().toString(), title: form.title, description: form.description, imageUrl: form.imageUrl, githubUrl: form.githubUrl, youtubeUrl: form.youtubeUrl, tech: form.tech };
      persist([...projects, newProject]);
    }
    setForm(EMPTY_FORM);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleDelete(id: string) {
    persist(projects.filter(p => p.id !== id));
    setDeleteId(null);
  }

  const ytPreviewId = form.youtubeUrl ? getYoutubeId(form.youtubeUrl) : null;

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(145deg,#f2f2f5 0%,#e9e9ed 50%,#eeecf3 100%)", fontFamily: "'Inter',-apple-system,sans-serif", color: "#1d1d1f" }}>

      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <FloatingOrb style={{ top: "-5%", right: "8%", width: 500, height: 500, background: "radial-gradient(circle,rgba(170,175,210,0.45) 0%,transparent 65%)", filter: "blur(60px)" }} />
        <FloatingOrb style={{ bottom: "10%", left: "-5%", width: 420, height: 420, background: "radial-gradient(circle,rgba(195,205,225,0.35) 0%,transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* Header */}
      <motion.div className="sticky top-0 z-50"
        style={{ ...GLASS_STRONG, borderLeft: "none", borderRight: "none", borderTop: "none", borderRadius: 0 }}
        initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ ...GLASS, fontSize: "13px", fontWeight: 600, color: "#3a3a3c" }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <ArrowLeft className="w-4 h-4" /> Back
            </motion.button>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.02em" }}>
                Project Manager
              </div>
              <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", color: "#aeaeb2" }}>
                /KDJ · @TECHRAFT STUDIO
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.07)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#6e6e73" }}>{projects.length} saved</span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div className="rounded-3xl overflow-hidden" style={{ ...GLASS_STRONG }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 80 }}>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: editId ? "rgba(234,179,8,0.12)" : "rgba(0,0,0,0.06)", border: `1px solid ${editId ? "rgba(234,179,8,0.3)" : "rgba(0,0,0,0.1)"}` }}>
                    {editId ? <Edit3 className="w-4 h-4" style={{ color: "#ca8a04" }} /> : <Plus className="w-4 h-4" style={{ color: "#1d1d1f" }} />}
                  </div>
                  <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.02em" }}>
                    {editId ? "Edit Project" : "Add New Project"}
                  </h2>
                  {editId && (
                    <motion.button onClick={() => { setEditId(null); setForm(EMPTY_FORM); }}
                      className="ml-auto p-1.5 rounded-lg"
                      style={{ background: "rgba(0,0,0,0.05)", color: "#6e6e73" }}
                      whileHover={{ scale: 1.1 }}>
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>

                <div className="flex flex-col gap-5">
                  <InputField label="PROJECT TITLE *" icon={<Tag className="w-4 h-4" />}
                    value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))}
                    placeholder="My Awesome Project" />

                  <TextArea label="DESCRIPTION"
                    value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))}
                    placeholder="What does this project do?" />

                  <InputField label="IMAGE URL" icon={<Image className="w-4 h-4" />}
                    value={form.imageUrl} onChange={v => setForm(f => ({ ...f, imageUrl: v }))}
                    placeholder="https://example.com/image.png" />

                  <InputField label="GITHUB LINK" icon={<Github className="w-4 h-4" />}
                    value={form.githubUrl} onChange={v => setForm(f => ({ ...f, githubUrl: v }))}
                    placeholder="https://github.com/username/repo" />

                  <InputField label="YOUTUBE VIDEO LINK" icon={<Youtube className="w-4 h-4" />}
                    value={form.youtubeUrl} onChange={v => setForm(f => ({ ...f, youtubeUrl: v }))}
                    placeholder="https://youtube.com/watch?v=..." />

                  {/* YouTube preview */}
                  <AnimatePresence>
                    {ytPreviewId && (
                      <motion.div className="rounded-2xl overflow-hidden relative cursor-pointer"
                        style={{ aspectRatio: "16/9" }}
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onClick={() => setPreviewVideo(form.youtubeUrl)}>
                        <img src={`https://img.youtube.com/vi/${ytPreviewId}/hqdefault.jpg`}
                          alt="YouTube preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ background: "rgba(0,0,0,0.3)" }}>
                          <div className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.9)" }}>
                            <Play className="w-6 h-6 text-black ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg"
                          style={{ background: "rgba(0,0,0,0.7)", fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>
                          CLICK TO PREVIEW
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tech tags */}
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#6e6e73", display: "block", marginBottom: "8px", fontFamily: "'Space Grotesk',sans-serif" }}>
                      TECH TAGS
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          value={form.techInput}
                          onChange={e => setForm(f => ({ ...f, techInput: e.target.value }))}
                          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTech())}
                          placeholder="React, ESP32, Python… press Enter"
                          className="w-full px-4 py-3 rounded-xl outline-none"
                          style={{ ...GLASS, fontSize: "13px", color: "#1d1d1f" }}
                        />
                      </div>
                      <motion.button onClick={addTech}
                        className="px-4 py-3 rounded-xl"
                        style={{ background: "#1d1d1f", color: "#fff", fontSize: "13px", fontWeight: 700 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                        Add
                      </motion.button>
                    </div>
                    {form.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <AnimatePresence>
                          {form.tech.map(tag => (
                            <motion.div key={tag}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                              style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)", fontSize: "12px", fontWeight: 600, color: "#3a3a3c" }}
                              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}>
                              {tag}
                              <button onClick={() => removeTech(tag)} style={{ color: "#aeaeb2" }}>
                                <X className="w-3 h-3" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Image preview */}
                  <AnimatePresence>
                    {form.imageUrl && (
                      <motion.div className="rounded-2xl overflow-hidden"
                        style={{ maxHeight: 200 }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <img src={form.imageUrl} alt="Preview" className="w-full object-cover"
                          style={{ maxHeight: 200 }}
                          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button onClick={handleSubmit}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl relative overflow-hidden"
                    style={{ background: "#1d1d1f", color: "#fff", fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'Space Grotesk',sans-serif" }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <AnimatePresence mode="wait">
                      {saved ? (
                        <motion.span key="saved" className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          <Check className="w-4 h-4" /> SAVED!
                        </motion.span>
                      ) : (
                        <motion.span key="save" className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          {editId ? <><Edit3 className="w-4 h-4" /> UPDATE PROJECT</> : <><Plus className="w-4 h-4" /> ADD PROJECT</>}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Saved projects list */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 80 }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.25em", fontWeight: 700, color: "#aeaeb2", marginBottom: "16px", fontFamily: "'Space Grotesk',sans-serif" }}>
                SAVED PROJECTS
              </p>

              {projects.length === 0 ? (
                <div className="rounded-3xl p-10 text-center" style={{ ...GLASS }}>
                  <div className="text-4xl mb-3">📁</div>
                  <p style={{ fontSize: "14px", color: "#aeaeb2", fontWeight: 500 }}>No projects yet.<br />Add one on the left!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {projects.map((p, i) => {
                      const ytId = p.youtubeUrl ? getYoutubeId(p.youtubeUrl) : null;
                      return (
                        <motion.div key={p.id}
                          className="rounded-2xl overflow-hidden"
                          style={{ ...GLASS }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                          transition={{ delay: i * 0.05 }}>

                          {(p.imageUrl || ytId) && (
                            <div className="relative w-full overflow-hidden" style={{ height: 100 }}>
                              <img
                                src={p.imageUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : "")}
                                alt={p.title} className="w-full h-full object-cover" />
                              {ytId && (
                                <button onClick={() => setPreviewVideo(p.youtubeUrl)}
                                  className="absolute inset-0 flex items-center justify-center"
                                  style={{ background: "rgba(0,0,0,0.3)" }}>
                                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,0.9)" }}>
                                    <Play className="w-4 h-4 text-black ml-0.5" />
                                  </div>
                                </button>
                              )}
                            </div>
                          )}

                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1d1d1f", fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                                {p.title}
                              </h3>
                              <div className="flex gap-1 flex-shrink-0">
                                {p.githubUrl && (
                                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg" style={{ color: "#aeaeb2" }}>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                <motion.button onClick={() => startEdit(p)}
                                  className="p-1.5 rounded-lg"
                                  initial={{ color: "#aeaeb2" }} animate={{ color: "#aeaeb2" }}
                                  whileHover={{ color: "#ca8a04" }}>
                                  <Edit3 className="w-3.5 h-3.5" />
                                </motion.button>
                                <motion.button onClick={() => setDeleteId(p.id)}
                                  className="p-1.5 rounded-lg"
                                  initial={{ color: "#aeaeb2" }} animate={{ color: "#aeaeb2" }}
                                  whileHover={{ color: "#ef4444" }}>
                                  <Trash2 className="w-3.5 h-3.5" />
                                </motion.button>
                              </div>
                            </div>
                            {p.tech.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {p.tech.slice(0, 4).map(t => (
                                  <span key={t} className="px-2 py-0.5 rounded-full"
                                    style={{ background: "rgba(0,0,0,0.05)", fontSize: "10px", fontWeight: 600, color: "#6e6e73" }}>
                                    {t}
                                  </span>
                                ))}
                                {p.tech.length > 4 && <span style={{ fontSize: "10px", color: "#aeaeb2" }}>+{p.tech.length - 4}</span>}
                              </div>
                            )}
                          </div>

                          {/* Delete confirm */}
                          <AnimatePresence>
                            {deleteId === p.id && (
                              <motion.div className="px-4 pb-4 flex items-center gap-2"
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <span style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, flex: 1 }}>Delete this project?</span>
                                <button onClick={() => handleDelete(p.id)}
                                  className="px-3 py-1 rounded-lg text-white"
                                  style={{ background: "#ef4444", fontSize: "12px", fontWeight: 700 }}>
                                  Yes
                                </button>
                                <button onClick={() => setDeleteId(null)}
                                  className="px-3 py-1 rounded-lg"
                                  style={{ background: "rgba(0,0,0,0.06)", fontSize: "12px", fontWeight: 700, color: "#6e6e73" }}>
                                  No
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video preview modal */}
      <AnimatePresence>
        {previewVideo && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPreviewVideo(null)}>
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }} />
            <motion.div className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
              style={{ aspectRatio: "16/9", zIndex: 1 }}
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}>
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeId(previewVideo)}?autoplay=1`}
                className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
              <button onClick={() => setPreviewVideo(null)}
                className="absolute top-3 right-3 p-2 rounded-full"
                style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}>
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
