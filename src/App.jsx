import { useState, useEffect, useRef } from "react";
import {
  Zap, Code2, Database, Server, Globe, GitBranch, Terminal,
  Cpu, Package, BrainCircuit, Layers, Lock, Activity, Boxes,
  Binary, Workflow, Network, Bot, FlaskConical, Shield, Download, Monitor
} from "lucide-react";

/* ─────────────── DESIGN TOKENS ─────────────── */
const C = {
  bg:     "var(--bg)",
  bg2:    "var(--bg2)",
  paper:  "var(--paper)",
  ink:    "var(--ink)",
  inkMid: "var(--inkMid)",
  v:      "#2563EB",
  vLight: "#60A5FA",
  vPale:  "var(--vPale)",
  vDeep:  "#1E40AF",
  accent: "#0EA5E9",
  muted:  "var(--muted)",
  gold:   "#F59E0B",
};

/* ─────────────── GLOBAL STYLES ─────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');

  :root {
    --bg:     #F8F5F0;
    --bg2:    #F0EBE3;
    --paper:  #FFFFFF;
    --ink:    #160D28;
    --inkMid: #2E1A50;
    --vPale:  #DBEAFE;
    --muted:  #9284AD;
  }
  [data-theme="dark"] {
    --bg:     #0D0B14;
    --bg2:    #130F1E;
    --paper:  #1A1528;
    --ink:    #F0EBF8;
    --inkMid: #C4B5E8;
    --vPale:  #1E1538;
    --muted:  #8878A8;
  }

  @keyframes darkToggle    { from{transform:rotate(-30deg) scale(0.7);opacity:0} to{transform:rotate(0deg) scale(1);opacity:1} }
  @keyframes particleDrift { 0%{opacity:0.7} 100%{transform:translate(var(--px),var(--py));opacity:0} }
  @keyframes pulse2        { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.25);opacity:0.7} }
  @keyframes backTopIn     { from{opacity:0;transform:translateY(12px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes learnPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0.25)} 50%{box-shadow:0 0 0 6px rgba(124,58,237,0)} }
  @keyframes connLine      { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
  @keyframes confettiFall  { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
  @keyframes toastIn       { from{opacity:0;transform:translateX(120%)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastOut      { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(120%)} }
  @keyframes floatCTA      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes sparkle       { 0%{transform:scale(0) rotate(0deg);opacity:1} 100%{transform:scale(1.5) rotate(180deg);opacity:0} }
  @keyframes radarIn       { from{stroke-dashoffset:500;opacity:0} to{stroke-dashoffset:0;opacity:1} }
  @keyframes gradShift     { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes statusPing    { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2.2);opacity:0} }
  @keyframes kbdIn         { from{opacity:0;transform:translateY(8px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes factSlide     { 0%{opacity:0;transform:translateY(10px)} 15%,85%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }

  .sec-transition { opacity:0; transform:translateY(28px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
  .sec-transition.visible { opacity:1; transform:translateY(0); }

  .progress-dot { width:8px; height:8px; border-radius:50%; background:rgba(124,58,237,0.2); border:1.5px solid rgba(124,58,237,0.3); transition:all 0.3s; cursor:pointer; }
  .progress-dot.active { background:#2563EB; border-color:#2563EB; transform:scale(1.4); box-shadow:0 0 8px rgba(124,58,237,0.5); }
  .progress-dot:hover:not(.active) { background:rgba(124,58,237,0.45); }

  .btt-btn { position:fixed; bottom:2rem; right:2rem; width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#2563EB,#0EA5E9); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:800; box-shadow:0 4px 20px rgba(124,58,237,0.4); transition:transform 0.2s, box-shadow 0.2s; }
  .btt-btn:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(124,58,237,0.55); }

  /* Scroll progress bar */
  .scroll-bar { position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg,#2563EB,#0EA5E9,#60A5FA); z-index:9999; transition:width 0.05s linear; border-radius:0 2px 2px 0; }

  /* Spotlight glow */
  .spotlight { position:fixed; pointer-events:none; z-index:1; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 65%); transition:opacity 0.3s; }

  /* Noise texture */
  .noise-overlay { position:absolute; inset:0; pointer-events:none; opacity:0.035; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-size: 180px; }

  /* Toast */
  .toast-wrap { position:fixed; bottom:5.5rem; right:1.5rem; z-index:9000; display:flex; flex-direction:column; gap:0.5rem; pointer-events:none; }
  .toast { background:var(--paper); border:1px solid rgba(124,58,237,0.2); border-left:3px solid #2563EB; border-radius:10px; padding:0.75rem 1.1rem; font-size:0.82rem; font-family:'Syne',sans-serif; color:var(--ink); box-shadow:0 4px 24px rgba(0,0,0,0.12); display:flex; align-items:center; gap:0.6rem; pointer-events:all; animation:toastIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
  .toast.out { animation:toastOut 0.3s ease both; }

  /* Float connect CTA */
  .float-cta { position:fixed; bottom:6rem; left:2rem; z-index:799; animation:floatCTA 0.5s cubic-bezier(0.16,1,0.3,1) both; }

  /* Magnetic btn */
  .mag-btn { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1); }

  /* Accent theme vars */
  [data-accent="purple"] { --acc:#2563EB; --acc2:#0EA5E9; --accP:#DBEAFE; }
  [data-accent="blue"]   { --acc:#2563EB; --acc2:#06B6D4; --accP:#EFF6FF; }
  [data-accent="green"]  { --acc:#059669; --acc2:#34D399; --accP:#ECFDF5; }
  [data-accent="rose"]   { --acc:#E11D48; --acc2:#FB7185; --accP:#FFF1F2; }

  /* Kbd shortcut hint */
  .kbd-hint { position:fixed; bottom:2rem; left:50%; transform:translateX(-50%); z-index:799; background:var(--paper); border:1px solid rgba(124,58,237,0.18); border-radius:100px; padding:0.45rem 1.2rem; font-size:0.72rem; font-family:'JetBrains Mono',monospace; color:var(--muted); box-shadow:0 4px 20px rgba(0,0,0,0.08); display:flex; align-items:center; gap:0.6rem; animation:kbdIn 0.3s ease both; pointer-events:none; }
  .kbd-key { background:var(--vPale); color:#2563EB; border:1px solid rgba(124,58,237,0.2); border-radius:4px; padding:0.1rem 0.45rem; font-size:0.68rem; font-weight:700; }

  /* Status badge */
  .status-available { display:inline-flex; align-items:center; gap:0.5rem; padding:0.35rem 0.9rem; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:100px; }
  .status-ping { width:8px; height:8px; border-radius:50%; background:#10B981; position:relative; }
  .status-ping::before { content:''; position:absolute; inset:0; border-radius:50%; background:#10B981; animation:statusPing 1.5s cubic-bezier(0,0,0.2,1) infinite; }

  @media(max-width:768px) {
    .progress-sidebar { display:none !important; }
    .btt-btn { bottom:1.2rem; right:1.2rem; width:38px; height:38px; border-radius:10px; }
    .float-cta { display:none !important; }
    .kbd-hint { display:none !important; }
    .footer-grid { grid-template-columns:1fr !important; gap:2rem !important; }
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    font-family: 'Syne', sans-serif;
    color: var(--ink);
    overflow-x: hidden;
    cursor: none;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#2563EB, #0EA5E9); border-radius: 2px; }

  .serif { font-family: 'Instrument Serif', serif; }
  .mono  { font-family: 'JetBrains Mono', monospace; }
  .sans  { font-family: 'Syne', sans-serif; }

  .rv { opacity: 0; transform: translateY(36px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
  .rv.on { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.08s; } .d2 { transition-delay: 0.16s; }
  .d3 { transition-delay: 0.24s; } .d4 { transition-delay: 0.32s; }
  .d5 { transition-delay: 0.40s; }

  @keyframes floatUp    { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-18px) rotate(3deg)} }
  @keyframes spinSlow   { to{transform:rotate(360deg)} }
  @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes tagIn      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes iconDrift  { 0%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(8px,-16px) rotate(6deg)} 66%{transform:translate(-5px,-8px) rotate(-4deg)} 100%{transform:translate(0,0) rotate(0deg)} }
  @keyframes iconDriftB { 0%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(-14px,-22px) rotate(-9deg)} 100%{transform:translate(0,0) rotate(0deg)} }
  @keyframes iconDriftC { 0%{transform:translate(0,0) rotate(0deg)} 40%{transform:translate(12px,10px) rotate(12deg)} 100%{transform:translate(0,0) rotate(0deg)} }
  @keyframes iconDriftD { 0%{transform:translate(0,0) rotate(0deg)} 60%{transform:translate(-8px,-18px) rotate(-7deg)} 100%{transform:translate(0,0) rotate(0deg)} }
  @keyframes resumePulse{ 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0.35)} 50%{box-shadow:0 0 0 8px rgba(124,58,237,0)} }
  @keyframes menuSlide  { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hamburgerTop    { to{transform:translateY(8px) rotate(45deg)} }
  @keyframes hamburgerMid    { to{opacity:0;transform:scaleX(0)} }
  @keyframes hamburgerBot    { to{transform:translateY(-8px) rotate(-45deg)} }

  .grad { background: linear-gradient(135deg, ${C.v}, ${C.accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  .chip {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; padding: 0.22rem 0.65rem; border-radius: 5px;
    background: var(--vPale); color: #2563EB; border: 1px solid rgba(124,58,237,0.18);
    transition: background 0.2s, color 0.2s;
  }
  .chip:hover { background: #2563EB; color: #fff; }

  .nav-link { position: relative; text-decoration: none; }
  .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #2563EB; transition: width 0.25s; }
  .nav-link:hover::after { width: 100%; }

  /* ── Mobile menu ── */
  .mob-menu {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.02);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    background: var(--bg);
    z-index: 590;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    animation: menuSlide 0.3s ease both;
  }
  .mob-menu.open { display: flex; }
  .mob-menu a {
    font-family: 'Instrument Serif', serif;
    font-size: 2.2rem;
    font-style: italic;
    color: var(--ink);
    text-decoration: none;
    transition: color 0.2s;
  }
  .mob-menu a:hover { color: #2563EB; }

  /* ── Hide/show helpers ── */
  .hide-mob { display: flex; }
  .show-mob { display: none; }

  /* ── Global mobile breakpoints ── */
  @media(max-width: 768px) {
    body { cursor: auto; }

    .hide-mob { display: none !important; }
    .show-mob { display: flex !important; }

    /* Section padding */
    .sec-pad { padding: 5rem 1.4rem !important; }

    /* Grids */
    .grid2   { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .grid3   { grid-template-columns: 1fr !important; }
    .grid-auto { grid-template-columns: 1fr !important; }

    /* Hero */
    .hero-sec { padding: 7rem 1.4rem 3rem !important; }
    .hero-stats { gap: 1.2rem !important; flex-wrap: wrap !important; }
    .hero-stats > div { padding-right: 1.2rem !important; margin-right: 1.2rem !important; }
    .hero-ctarow { flex-direction: column !important; }
    .hero-ctarow a, .hero-ctarow button { width: 100% !important; justify-content: center !important; }

    /* Marquee */
    .marquee-track { animation-duration: 18s !important; }

    /* Cards */
    .exp-card-inner { flex-direction: column !important; gap: 1rem !important; }
    .exp-date-col { text-align: left !important; }

    /* Contact */
    .contact-email-row { flex-direction: column !important; }
    .contact-email-row > div, .contact-email-row > a, .contact-email-row > button { width: 100% !important; }

    /* Footer */
    .footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 0.5rem !important; }

    /* Float icons — hide on mobile for performance */
    .float-bg { display: none !important; }

    /* Skill bars */
    .skill-bar-grid { grid-template-columns: 1fr !important; gap: 0 !important; }

    /* Open-to-work banner */
    .otw-banner { flex-direction: column !important; align-items: flex-start !important; }
  }

  @media(max-width: 480px) {
    .hero-sec { padding: 6rem 1rem 2.5rem !important; }
    .sec-pad  { padding: 4rem 1rem !important; }
    .chip { font-size: 0.6rem !important; padding: 0.18rem 0.5rem !important; }
  }
`;

/* ─────────────── TOAST SYSTEM ─────────────── */
const toastListeners = [];
function showToast(msg, icon = "✓") {
  toastListeners.forEach(fn => fn({ msg, icon, id: Date.now() }));
}
function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const fn = (t) => {
      setToasts(p => [...p, t]);
      setTimeout(() => setToasts(p => p.filter(x => x.id !== t.id)), 3000);
    };
    toastListeners.push(fn);
    return () => { const i = toastListeners.indexOf(fn); if (i > -1) toastListeners.splice(i, 1); };
  }, []);
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <span style={{ fontSize:"1rem" }}>{t.icon}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── SCROLL PROGRESS BAR ─────────────── */
function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />;
}

/* ─────────────── SPOTLIGHT GLOW ─────────────── */
function SpotlightGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fn = (e) => {
      el.style.left = (e.clientX - 200) + "px";
      el.style.top  = (e.clientY - 200) + "px";
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return <div ref={ref} className="spotlight" style={{ width:400, height:400 }} />;
}

/* ─────────────── MOUSE TRAIL SPARKLES ─────────────── */
function MouseTrail() {
  useEffect(() => {
    const COLORS = ["#2563EB","#0EA5E9","#60A5FA","#F59E0B"];
    let count = 0;
    const fn = (e) => {
      if (count++ % 3 !== 0) return; // throttle
      const el = document.createElement("div");
      const size = Math.random() * 6 + 4;
      el.style.cssText = `
        position:fixed; pointer-events:none; z-index:9997;
        width:${size}px; height:${size}px; border-radius:50%;
        background:${COLORS[Math.floor(Math.random()*COLORS.length)]};
        left:${e.clientX - size/2}px; top:${e.clientY - size/2}px;
        animation:sparkle 0.6s ease both;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return null;
}

/* ─────────────── KONAMI CONFETTI ─────────────── */
function KonamiConfetti() {
  const seq = useRef([]);
  const CODE = [38,38,40,40,37,39,37,39,66,65];
  useEffect(() => {
    const fn = (e) => {
      seq.current = [...seq.current, e.keyCode].slice(-10);
      if (seq.current.join(",") === CODE.join(",")) {
        const COLORS = ["#2563EB","#0EA5E9","#F59E0B","#10B981","#0EA5E9","#EF4444","#60A5FA"];
        for (let i = 0; i < 80; i++) {
          const el = document.createElement("div");
          const size = Math.random() * 10 + 5;
          const col = COLORS[Math.floor(Math.random() * COLORS.length)];
          el.style.cssText = `
            position:fixed; pointer-events:none; z-index:9999;
            width:${size}px; height:${size}px;
            background:${col}; border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
            left:${Math.random() * 100}vw; top:-20px;
            animation:confettiFall ${1.5 + Math.random() * 2}s ease ${Math.random() * 0.8}s both;
          `;
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 4000);
        }
        showToast("🎉 Konami Code activated! You found the easter egg!", "🎮");
        seq.current = [];
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  return null;
}

/* ─────────────── KEYBOARD SHORTCUTS ─────────────── */
function KeyboardShortcuts() {
  const [hint, setHint] = useState(null);
  useEffect(() => {
    let timer;
    const fn = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const map = {
        g: { url:"https://github.com/armanphaugat", label:"Opening GitHub…", icon:"🐙" },
        l: { url:"https://leetcode.com/u/armanphaugat20", label:"Opening LeetCode…", icon:"🧩" },
        k: { url:"https://www.linkedin.com/in/armanphaugat05/", label:"Opening LinkedIn…", icon:"💼" },
        r: { url:"/ARMANRESUME.pdf", label:"Downloading Resume…", icon:"📄" },
      };
      const scroll = {
        "1": "hero","2": "about","3": "projects","4": "skills","5": "contact",
      };
      if (map[e.key]) {
        const { url, label, icon } = map[e.key];
        showToast(label, icon);
        setHint(null);
        setTimeout(() => window.open(url, "_blank"), 400);
      }
      if (scroll[e.key]) {
        document.getElementById(scroll[e.key])?.scrollIntoView({ behavior:"smooth" });
        showToast(`Jumped to section ${e.key}`, "⌨️");
      }
      if (e.key === "?") {
        setHint(p => p ? null : true);
        clearTimeout(timer);
        if (!hint) timer = setTimeout(() => setHint(null), 5000);
      }
    };
    window.addEventListener("keydown", fn);
    return () => { window.removeEventListener("keydown", fn); clearTimeout(timer); };
  }, [hint]);

  if (!hint) return (
    <div className="kbd-hint" style={{ opacity:0.6 }}>
      Press <span className="kbd-key">?</span> for keyboard shortcuts
    </div>
  );
  return (
    <div className="kbd-hint" style={{ gap:"1.2rem", opacity:1, borderRadius:14, padding:"0.8rem 1.5rem" }}>
      {[["G","GitHub"],["L","LeetCode"],["K","LinkedIn"],["R","Resume"],["1-5","Sections"]].map(([k,v]) => (
        <span key={k} style={{ display:"flex", alignItems:"center", gap:"0.3rem" }}>
          <span className="kbd-key">{k}</span>
          <span style={{ fontSize:"0.65rem" }}>{v}</span>
        </span>
      ))}
    </div>
  );
}

/* ─────────────── FLOATING CONNECT CTA ─────────────── */
function FloatingConnectCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { if (!dismissed) setShow(true); }, 12000);
    return () => clearTimeout(t);
  }, [dismissed]);
  if (!show || dismissed) return null;
  return (
    <div className="float-cta">
      <div style={{
        background:"var(--paper)", border:"1px solid rgba(124,58,237,0.2)",
        borderRadius:14, padding:"1rem 1.3rem", boxShadow:"0 8px 40px rgba(124,58,237,0.18)",
        maxWidth:220, position:"relative",
      }}>
        <button onClick={() => setDismissed(true)} style={{
          position:"absolute", top:"0.4rem", right:"0.5rem",
          background:"none", border:"none", cursor:"pointer",
          fontSize:"0.75rem", color:"var(--muted)", lineHeight:1,
        }}>✕</button>
        <div className="status-available" style={{ marginBottom:"0.7rem" }}>
          <div className="status-ping"/>
          <span style={{ fontSize:"0.65rem", color:"#059669", fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>AVAILABLE FOR HIRE</span>
        </div>
        <div style={{ fontSize:"0.82rem", fontWeight:700, color:"var(--ink)", marginBottom:"0.4rem" }}>Open to opportunities</div>
        <div style={{ fontSize:"0.75rem", color:"var(--muted)", marginBottom:"0.9rem", lineHeight:1.5 }}>Backend · AI/ML · Full Stack</div>
        <a href="mailto:armanphaugat20@gmail.com" style={{
          display:"block", textAlign:"center", padding:"0.55rem",
          background:"linear-gradient(135deg,#2563EB,#0EA5E9)",
          color:"#fff", borderRadius:8, textDecoration:"none",
          fontSize:"0.78rem", fontWeight:700,
        }} onClick={() => setDismissed(true)}>Let's talk →</a>
      </div>
    </div>
  );
}

/* ─────────────── THEME ACCENT PICKER ─────────────── */
function ThemeAccentPicker() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState("purple");
  const ACCENTS = [
    { key:"purple", col:"#2563EB", label:"Purple" },
    { key:"blue",   col:"#2563EB", label:"Blue"   },
    { key:"green",  col:"#059669", label:"Green"  },
    { key:"rose",   col:"#E11D48", label:"Rose"   },
  ];
  const pick = (key) => {
    setAccent(key);
    document.documentElement.setAttribute("data-accent", key);
    showToast(`Theme: ${key.charAt(0).toUpperCase()+key.slice(1)}`, "🎨");
    setOpen(false);
  };
  const cur = ACCENTS.find(a => a.key === accent);
  return (
    <div style={{ position:"relative" }}>
      <button onClick={() => setOpen(o => !o)} title="Change accent color" style={{
        width:34, height:34, borderRadius:6,
        background: cur.col + "22",
        border:`1.5px solid ${cur.col}44`,
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        transition:"transform 0.2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
        onMouseLeave={e=>e.currentTarget.style.transform=""}
      >
        <div style={{ width:14, height:14, borderRadius:"50%", background:`linear-gradient(135deg,${cur.col},${cur.col}88)` }}/>
      </button>
      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 0.5rem)", right:0,
          background:"var(--paper)", border:"1px solid rgba(124,58,237,0.15)",
          borderRadius:10, padding:"0.6rem", boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
          display:"flex", gap:"0.4rem", zIndex:900, animation:"backTopIn 0.2s ease both",
        }}>
          {ACCENTS.map(a => (
            <button key={a.key} onClick={() => pick(a.key)} title={a.label} style={{
              width:24, height:24, borderRadius:"50%",
              background:a.col, border: accent===a.key ? `2px solid var(--ink)` : "2px solid transparent",
              cursor:"pointer", transition:"transform 0.15s",
            }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────── GITHUB STATS CARD ─────────────── */
function GitHubStatsCard() {
  const stats = [
    { label:"Max Streak",  value:"120+",  icon:"📦" },
    { label:"Languages",      value:"3",    icon:"💻" },
    { label:"Questions",  value:"700+", icon:"🔥" },
    { label:"Badges Earned",   value:"9+",  icon:"⭐" },
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg,#0D1117,#161B22)",
      border:"1px solid rgba(255,255,255,0.08)",
      borderRadius:16, padding:"1.8rem",
      boxShadow:"0 4px 32px rgba(0,0,0,0.3)",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.4rem" }}>
        {/* LeetCode Logo */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116"/>
        </svg>
        <div>
          <div style={{ fontSize:"0.9rem", fontWeight:700, color:"#fff" }}>armanphaugat</div>
          <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.4)", fontFamily:"'JetBrains Mono',monospace" }}>leetcode.com/armanphaugat20</div>
        </div>
        <a href="https://leetcode.com/armanphaugat20" target="_blank" rel="noreferrer" style={{
          marginLeft:"auto", padding:"0.35rem 0.9rem",
          background:"rgba(255,255,255,0.1)", color:"#fff",
          border:"1px solid rgba(255,255,255,0.15)", borderRadius:6,
          fontSize:"0.72rem", fontWeight:700, textDecoration:"none",
          transition:"background 0.2s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
        >Follow</a>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem", marginBottom:"1.2rem" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"0.8rem 1rem" }}>
            <div style={{ fontSize:"0.9rem", marginBottom:"0.2rem" }}>{s.icon}</div>
            <div style={{ fontSize:"1.1rem", fontWeight:800, color:"#fff", fontFamily:"'Syne',sans-serif" }}>{s.value}</div>
            <div style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.35)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"1px" }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Fake contribution graph */}
      <div style={{ marginTop:"0.5rem" }}>
        <div style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.3)", fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.5rem" }}>Contribution activity</div>
        <div style={{ display:"flex", gap:"3px", flexWrap:"wrap" }}>
          {Array.from({length:52*7}).map((_,i) => {
            const intensity = Math.random();
            const bg = intensity > 0.85 ? "#FFA116" : intensity > 0.6 ? "#CC8000" : intensity > 0.35 ? "#7A4D00" : intensity > 0.15 ? "#3D2600" : "rgba(255,255,255,0.04)";
            return <div key={i} style={{ width:9, height:9, borderRadius:2, background:bg }}/>;
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── FUN FACTS TICKER ─────────────── */
const FUN_FACTS = [
  "I debug with console.log and I'm not ashamed 🐛",
  "My first language was C, not Python 🔥",
  "I solve LeetCode problems while waiting for builds 😤",
  "I read system design blogs for fun 📚",
  "Dark mode was always on before it was cool 🌙",
  "I've rewritten a project from scratch at least 3 times 🔄",
  "ACID compliance keeps me up at night (in a good way) 🗄️",
  "I named a variable 'temp2' once. I regret it every day 😔",
];
function FunFactsTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i+1) % FUN_FACTS.length); setVisible(true); }, 400);
    }, 4000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ overflow:"hidden", height:"1.4rem" }}>
      <div style={{
        fontSize:"0.72rem", color:"rgba(255,255,255,0.3)",
        fontFamily:"'JetBrains Mono',monospace",
        transition:"opacity 0.4s, transform 0.4s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        whiteSpace:"nowrap",
      }}>
        {FUN_FACTS[idx]}
      </div>
    </div>
  );
}

/* ─────────────── AVAILABILITY WIDGET ─────────────── */
function AvailabilityWidget() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const slots = {
    Mon: ["10:00","14:00","16:00"],
    Tue: ["11:00","15:00"],
    Wed: ["10:00","13:00","17:00"],
    Thu: ["14:00","16:00"],
    Fri: ["10:00","12:00"],
    Sat: [],
    Sun: [],
  };
  return (
    <div style={{ background:"var(--paper)", border:"1px solid rgba(124,58,237,0.1)", borderRadius:14, padding:"1.5rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.2rem" }}>
        <span style={{ fontSize:"1.1rem" }}>📅</span>
        <div>
          <div style={{ fontSize:"0.9rem", fontWeight:800, color:"var(--ink)" }}>Availability</div>
          <div style={{ fontSize:"0.7rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace" }}>IST (UTC+5:30) · Open to calls</div>
        </div>
        <div className="status-available" style={{ marginLeft:"auto" }}>
          <div className="status-ping"/>
          <span style={{ fontSize:"0.6rem", color:"#059669", fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>OPEN</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"0.3rem" }}>
        {days.map(d => (
          <div key={d} style={{ textAlign:"center" }}>
            <div style={{ fontSize:"0.58rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.3rem", textTransform:"uppercase" }}>{d}</div>
            {slots[d].length > 0 ? slots[d].map(t => (
              <div key={t} style={{
                fontSize:"0.58rem", padding:"0.2rem 0.2rem", borderRadius:4, marginBottom:"0.2rem",
                background:"rgba(124,58,237,0.12)", color:"#2563EB",
                fontFamily:"'JetBrains Mono',monospace", fontWeight:600,
              }}>{t}</div>
            )) : (
              <div style={{ fontSize:"0.58rem", color:"var(--muted)", opacity:0.4, fontFamily:"'JetBrains Mono',monospace" }}>–</div>
            )}
          </div>
        ))}
      </div>
      <a href="mailto:armanphaugat20@gmail.com?subject=Meeting Request" style={{
        display:"block", textAlign:"center", marginTop:"1rem",
        padding:"0.55rem", background:"rgba(124,58,237,0.1)",
        border:"1px solid rgba(124,58,237,0.2)", borderRadius:8,
        fontSize:"0.78rem", fontWeight:700, color:"#2563EB",
        textDecoration:"none", transition:"background 0.2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(124,58,237,0.2)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(124,58,237,0.1)"}
      >Book a call →</a>
    </div>
  );
}

/* ─────────────── SKILL RADAR CHART ─────────────── */
function SkillRadar() {
  const skills = [
    { label:"Backend",  val:90 }, { label:"DSA/CP",   val:92 },
    { label:"AI / ML",  val:80 }, { label:"Databases", val:85 },
    { label:"DevOps",   val:75 }, { label:"Frontend",  val:72 },
  ];
  const N = skills.length;
  const cx = 160, cy = 160, R = 120;
  const angleStep = (Math.PI * 2) / N;
  const polarToXY = (i, r) => ({
    x: cx + r * Math.sin(i * angleStep),
    y: cy - r * Math.cos(i * angleStep),
  });
  const rings = [0.25, 0.5, 0.75, 1.0];
  const dataPoints = skills.map((s, i) => polarToXY(i, (s.val / 100) * R));
  const poly = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column" }}>
      <svg width="320" height="320" viewBox="0 0 320 320">
        {/* Rings */}
        {rings.map(r => (
          <polygon key={r} points={skills.map((_,i) => { const p = polarToXY(i, r*R); return `${p.x},${p.y}`; }).join(" ")}
            fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="1"/>
        ))}
        {/* Axes */}
        {skills.map((_,i) => { const p = polarToXY(i, R); return (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(124,58,237,0.15)" strokeWidth="1"/>
        );})}
        {/* Data polygon */}
        <polygon points={poly} fill="rgba(124,58,237,0.18)" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round"/>
        {/* Data dots */}
        {dataPoints.map((p,i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#2563EB" stroke="#fff" strokeWidth="2"/>
        ))}
        {/* Labels */}
        {skills.map((s, i) => {
          const p = polarToXY(i, R + 22);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
              fill="var(--ink)" fontSize="10" fontFamily="'Syne',sans-serif" fontWeight="700">
              {s.label}
            </text>
          );
        })}
        {/* Values at center ring labels */}
        {skills.map((s, i) => {
          const p = polarToXY(i, (s.val / 100) * R - 14);
          return (
            <text key={`v${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
              fill="#2563EB" fontSize="9" fontFamily="'JetBrains Mono',monospace" fontWeight="700">
              {s.val}%
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ─────────────── PROJECT CATEGORY STATS BAR ─────────────── */
function ProjectStatsBar() {
  const cats = [
    { label:"Backend",  count:2, col:"#2563EB" },
    { label:"AI / ML",  count:5, col:"#0EA5E9" },
    { label:"Frontend", count:2, col:"#10B981" },
    { label:"Game",     count:1, col:"#F59E0B" },
  ];
  const total = cats.reduce((s,c) => s+c.count, 0);
  return (
    <div style={{ marginBottom:"2rem" }} className="rv">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.8rem" }}>
        <span style={{ fontSize:"0.78rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace" }}>Category breakdown</span>
        <span style={{ fontSize:"0.78rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace" }}>{total} total</span>
      </div>
      <div style={{ height:8, borderRadius:4, overflow:"hidden", display:"flex", gap:2 }}>
        {cats.map(c => (
          <div key={c.label} style={{ flex:c.count, background:c.col, borderRadius:2, transition:"flex 0.5s ease" }}
            title={`${c.label}: ${c.count}`}
          />
        ))}
      </div>
      <div style={{ display:"flex", gap:"1.2rem", marginTop:"0.6rem", flexWrap:"wrap" }}>
        {cats.map(c => (
          <div key={c.label} style={{ display:"flex", alignItems:"center", gap:"0.35rem" }}>
            <div style={{ width:8, height:8, borderRadius:2, background:c.col }}/>
            <span style={{ fontSize:"0.68rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace" }}>{c.label} ({c.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── CURSOR ─────────────── */
function Cursor() {
  const dot   = useRef(null);
  const trail = useRef(null);
  useEffect(() => {
    let tx = 0, ty = 0;
    const onMove = (e) => {
      const x = e.clientX, y = e.clientY;
      if (dot.current) { dot.current.style.left = x + "px"; dot.current.style.top = y + "px"; }
      const step = () => {
        tx += (x - tx) * 0.1; ty += (y - ty) * 0.1;
        if (trail.current) { trail.current.style.left = tx + "px"; trail.current.style.top = ty + "px"; }
        requestAnimationFrame(step);
      };
      step();
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <>
      <div ref={dot}   style={{ position:"fixed", width:7, height:7, background:C.v, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999 }} />
      <div ref={trail} style={{ position:"fixed", width:28, height:28, border:`1.5px solid ${C.v}`, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9998, opacity:.4 }} />
    </>
  );
}

/* ─────────────── SCROLL REVEAL ─────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─────────────── SECTION TRANSITION ─────────────── */
function useSectionTransitions() {
  useEffect(() => {
    const els = document.querySelectorAll(".sec-transition");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─────────────── TILT ─────────────── */
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
      el.style.boxShadow = `${-x * 20}px ${y * 20}px 48px rgba(124,58,237,0.14)`;
    };
    const onLeave = () => { el.style.transform = ""; el.style.boxShadow = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
}

/* ─────────────── NAV ─────────────── */
function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About","Experience","Resume","Projects","Skills","Blog","Timeline","Contact"];
  const closeMenu = () => setMenuOpen(false);

  const barStyle = (open, which) => ({
    display:"block", width:22, height:2, background:"var(--ink)", borderRadius:2,
    transformOrigin:"center",
    transition:"transform 0.3s, opacity 0.3s",
    transform: open
      ? which==="top" ? "translateY(8px) rotate(45deg)"
      : which==="bot" ? "translateY(-8px) rotate(-45deg)"
      : "scaleX(0)"
      : "none",
    opacity: open && which==="mid" ? 0 : 1,
  });

  return (
    <>
      {/* Mobile full-screen menu */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu}>{l}</a>
        ))}
        <button onClick={() => setDark(d => !d)} style={{
          background:"none", border:`1.5px solid rgba(124,58,237,0.3)`, borderRadius:100,
          padding:"0.6rem 1.6rem", cursor:"pointer", fontSize:"1rem",
          display:"flex", alignItems:"center", gap:"0.6rem",
          fontFamily:"'Syne',sans-serif", fontWeight:700, color:"var(--ink)",
        }}>
          <span key={dark ? "m" : "s"} style={{ animation:"darkToggle 0.3s ease both" }}>{dark ? "☀️" : "🌙"}</span>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <div style={{ display:"flex", gap:"0.8rem", marginTop:"1rem", flexWrap:"wrap", justifyContent:"center" }}>
          <a href="mailto:armanphaugat20@gmail.com" onClick={closeMenu} style={{
            padding:"0.7rem 1.5rem", background:C.v, color:"#fff",
            borderRadius:8, textDecoration:"none", fontWeight:700, fontSize:"0.9rem",
          }}>Hire Me →</a>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" onClick={closeMenu} style={{
            padding:"0.7rem 1.5rem", background:"transparent", color:C.v,
            border:`1.5px solid ${C.v}`, borderRadius:8, textDecoration:"none",
            fontWeight:700, fontSize:"0.9rem", display:"flex", alignItems:"center", gap:"0.4rem",
          }}><Download size={14}/> Resume</a>
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" onClick={closeMenu} style={{
            padding:"0.7rem 1.5rem", background:"#0A66C2", color:"#fff",
            borderRadius:8, textDecoration:"none", fontWeight:700, fontSize:"0.9rem",
            display:"flex", alignItems:"center", gap:"0.4rem",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" onClick={closeMenu} style={{
            padding:"0.7rem 1.5rem", background:"#FFA116", color:"#fff",
            borderRadius:8, textDecoration:"none", fontWeight:700, fontSize:"0.9rem",
            display:"flex", alignItems:"center", gap:"0.4rem",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
            LeetCode
          </a>
        </div>
      </div>

      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:600,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding: scrolled ? "0.85rem 2rem" : "1.3rem 2rem",
        background: scrolled || menuOpen ? "var(--bg)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.1)" : "1px solid transparent",
        transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
          <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg,${C.v},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:"0.8rem", fontWeight:800 }}>AP</span>
          </div>
          <span className="mono" style={{ fontSize:"0.8rem", color:C.v, fontWeight:500 }}>arman<span style={{color:C.muted}}>.dev</span></span>
        </div>

        {/* Desktop links */}
        <div className="hide-mob" style={{ display:"flex", gap:"2.2rem" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link"
              style={{ color:C.inkMid, fontSize:"0.82rem", fontWeight:600, letterSpacing:"0.2px" }}
              onMouseEnter={e => e.currentTarget.style.color = C.v}
              onMouseLeave={e => e.currentTarget.style.color = C.inkMid}
            >{l}</a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hide-mob" style={{ display:"flex", gap:"0.7rem", alignItems:"center" }}>
          {/* Theme accent picker */}
          <ThemeAccentPicker />
          {/* Dark mode toggle */}
          <button onClick={() => setDark(d => !d)} title={dark ? "Switch to light mode" : "Switch to dark mode"} style={{
            width:34, height:34, borderRadius:6,
            background: dark ? "rgba(167,139,250,0.15)" : "rgba(124,58,237,0.08)",
            border: `1.5px solid ${dark ? "rgba(167,139,250,0.3)" : "rgba(124,58,237,0.2)"}`,
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            transition:"background 0.2s, border-color 0.2s, transform 0.2s", flexShrink:0,
          }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform=""}
          >
            <span key={dark ? "moon" : "sun"} style={{ fontSize:"1rem", display:"block", animation:"darkToggle 0.3s ease both" }}>
              {dark ? "☀️" : "🌙"}
            </span>
          </button>
          {/* LinkedIn icon button */}
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" title="LinkedIn" style={{
            width:34, height:34, borderRadius:6, background:"#0A66C2", color:"#fff",
            display:"flex", alignItems:"center", justifyContent:"center",
            textDecoration:"none", transition:"background 0.2s, transform 0.2s", flexShrink:0,
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="#004182";e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#0A66C2";e.currentTarget.style.transform="";}}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          {/* LeetCode icon button */}
          <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" title="LeetCode" style={{
            width:34, height:34, borderRadius:6, background:"#FFA116", color:"#fff",
            display:"flex", alignItems:"center", justifyContent:"center",
            textDecoration:"none", transition:"background 0.2s, transform 0.2s", flexShrink:0,
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="#cc8100";e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#FFA116";e.currentTarget.style.transform="";}}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
          </a>
          <a href="mailto:armanphaugat20@gmail.com" style={{
            padding:"0.5rem 1.3rem", background:C.v, color:"#fff",
            borderRadius:6, fontSize:"0.8rem", fontWeight:600, textDecoration:"none", transition:"background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.vDeep}
            onMouseLeave={e => e.currentTarget.style.background = C.v}
          >Hire Me →</a>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" style={{
            padding:"0.5rem 1.2rem", background:"transparent", color:C.v,
            border:`1.5px solid ${C.v}`, borderRadius:6, fontSize:"0.8rem", fontWeight:600,
            textDecoration:"none", transition:"background 0.2s, color 0.2s",
            display:"flex", alignItems:"center", gap:"0.4rem",
            animation:"resumePulse 2.5s ease-in-out infinite",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.v;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.v;}}
          >
            <Download size={13} strokeWidth={2.5} />
            Resume
          </a>
        </div>

        {/* Hamburger */}
        <button className="show-mob" onClick={() => setMenuOpen(o => !o)} style={{
          background:"none", border:"none", cursor:"pointer", padding:"4px",
          display:"flex", flexDirection:"column", gap:6, zIndex:700,
        }}>
          <span style={barStyle(menuOpen,"top")} />
          <span style={barStyle(menuOpen,"mid")} />
          <span style={barStyle(menuOpen,"bot")} />
        </button>
      </nav>
    </>
  );
}

/* ─────────────── ANIMATED COUNTER ─────────────── */
function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const isFloat = String(target).includes(".");
    const numTarget = parseFloat(target);
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = numTarget * ease;
      setCount(isFloat ? val.toFixed(2) : Math.floor(val));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return { ref, count };
}

function AnimatedStat({ value, label, suffix = "" }) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const prefix  = value.match(/^[^0-9]*/)?.[0] || "";
  const sfx     = value.match(/[^0-9.]+$/)?.[0] || suffix;
  const { ref, count } = useCounter(numeric);
  return (
    <div ref={ref} style={{ padding:"0 2.5rem 0 0", marginRight:"2.5rem", borderRight:"1px solid rgba(124,58,237,0.1)", marginBottom:"1rem" }}>
      <div className="serif" style={{ fontSize:"1.9rem", fontWeight:400, color:"var(--ink)", letterSpacing:"-1px" }}>
        {prefix}{count}{sfx}
      </div>
      <div className="mono" style={{ fontSize:"0.62rem", color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1.5px", marginTop:"0.2rem", lineHeight:1.4 }}>{label}</div>
    </div>
  );
}

/* ─────────────── SECTION PROGRESS SIDEBAR ─────────────── */
const SECTIONS = ["hero","about","experience","resume","projects","skills","achievements","blog","timeline","contact"];
const SECTION_LABELS = ["Home","About","Exp","Resume","Projects","Skills","Awards","Blog","Timeline","Contact"];

function SectionProgress() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = SECTIONS.indexOf(e.target.id);
          if (idx !== -1) setActive(idx);
        }
      });
    }, { threshold: 0.35 });
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="progress-sidebar" style={{
      position:"fixed", right:"1.4rem", top:"50%", transform:"translateY(-50%)",
      zIndex:700, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.55rem",
    }}>
      <div style={{ position:"absolute", top:0, bottom:0, left:"50%", width:1, background:"rgba(124,58,237,0.12)", transform:"translateX(-50%)", zIndex:-1 }}/>
      {SECTIONS.map((id, i) => (
        <div key={id} style={{ position:"relative", display:"flex", alignItems:"center", gap:"0.5rem" }}>
          {active === i && (
            <div style={{
              position:"absolute", right:"calc(100% + 0.6rem)",
              background:"var(--paper)", border:"1px solid rgba(124,58,237,0.2)",
              borderRadius:6, padding:"0.2rem 0.55rem",
              fontSize:"0.6rem", fontFamily:"'JetBrains Mono',monospace",
              color:"#2563EB", whiteSpace:"nowrap", fontWeight:700,
              animation:"backTopIn 0.2s ease both",
              boxShadow:"0 2px 12px rgba(124,58,237,0.12)",
            }}>{SECTION_LABELS[i]}</div>
          )}
          <div
            className={`progress-dot${active === i ? " active" : ""}`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })}
            title={SECTION_LABELS[i]}
          />
        </div>
      ))}
    </div>
  );
}

/* ─────────────── BACK TO TOP ─────────────── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button className="btt-btn" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      style={{ animation:"backTopIn 0.3s ease both" }}
      title="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
}

/* ─────────────── PARTICLE CANVAS ─────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#2563EB","#60A5FA","#0EA5E9","#C4B5FD"];
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + "99";
        ctx.fill();
      });
      // Draw constellation lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.55 }} />;
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Backend Engineer","System Designer","AI / ML Builder","Competitive Programmer","Full Stack Dev"];
  useEffect(() => {
    let idx = 0, dir = 1, wi = 0;
    const iv = setInterval(() => {
      const w = words[wi % words.length];
      setTyped(dir === 1 ? w.slice(0, idx + 1) : w.slice(0, idx));
      if (dir === 1) { idx++; if (idx === w.length) dir = -1; }
      else { idx--; if (idx < 0) { dir = 1; idx = 0; wi++; } }
    }, 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" className="hero-sec" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"9rem 4rem 5rem", position:"relative", overflow:"hidden" }}>
      {/* Animated BG + Floating Tech Icons */}
      <div className="float-bg" style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <div className="noise-overlay" />
        <ParticleCanvas />
        {/* Gradient orbs */}
        <div style={{ position:"absolute", top:"-10%", right:"-5%", width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)`, animation:"floatUp 10s ease-in-out infinite" }} />
        <div style={{ position:"absolute", bottom:"-5%", left:"-8%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,rgba(232,121,249,0.08) 0%,transparent 70%)`, animation:"floatUp 13s ease-in-out infinite reverse" }} />
        {/* Grid lines */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.035 }}>
          {Array.from({length:12}).map((_,i) => <line key={i} x1={`${(i+1)*8.33}%`} y1="0" x2={`${(i+1)*8.33}%`} y2="100%" stroke={C.v} strokeWidth="1"/>)}
        </svg>
        {/* Rings */}
        <div style={{ position:"absolute", top:"20%", right:"12%", width:160, height:160, border:`1px solid rgba(124,58,237,0.15)`, borderRadius:"50%", animation:"spinSlow 25s linear infinite" }} />
        <div style={{ position:"absolute", top:"22%", right:"14%", width:120, height:120, border:`1px dashed rgba(232,121,249,0.12)`, borderRadius:"50%", animation:"spinSlow 18s linear infinite reverse" }} />
        {/* Floating Lucide tech icons */}
        {[
          { Icon:Zap,          top:"12%",  left:"5%",   sz:32, anim:"iconDrift  7s  ease-in-out infinite", delay:"0s"   },
          { Icon:Code2,        top:"25%",  left:"90%",  sz:28, anim:"iconDriftB 9s  ease-in-out infinite", delay:"1.2s" },
          { Icon:Database,     top:"55%",  left:"88%",  sz:26, anim:"iconDrift  11s ease-in-out infinite", delay:"2.1s" },
          { Icon:Server,       top:"70%",  left:"6%",   sz:30, anim:"iconDriftC 8s  ease-in-out infinite", delay:"0.7s" },
          { Icon:Globe,        top:"80%",  left:"78%",  sz:26, anim:"iconDriftB 12s ease-in-out infinite", delay:"3.5s" },
          { Icon:GitBranch,    top:"40%",  left:"3%",   sz:24, anim:"iconDriftD 9s  ease-in-out infinite", delay:"1.8s" },
          { Icon:BrainCircuit, top:"88%",  left:"40%",  sz:28, anim:"iconDrift  13s ease-in-out infinite", delay:"4.1s" },
          { Icon:Terminal,     top:"15%",  left:"74%",  sz:24, anim:"iconDriftC 10s ease-in-out infinite", delay:"2.8s" },
          { Icon:Package,      top:"60%",  left:"50%",  sz:22, anim:"iconDriftD 14s ease-in-out infinite", delay:"0.3s" },
          { Icon:Lock,         top:"35%",  left:"64%",  sz:20, anim:"iconDrift  6s  ease-in-out infinite", delay:"5.0s" },
          { Icon:Network,      top:"90%",  left:"15%",  sz:26, anim:"iconDriftB 11s ease-in-out infinite", delay:"1.5s" },
          { Icon:Bot,          top:"5%",   left:"48%",  sz:28, anim:"iconDriftC 8s  ease-in-out infinite", delay:"3.0s" },
          { Icon:Layers,       top:"48%",  left:"92%",  sz:22, anim:"iconDrift  9s  ease-in-out infinite", delay:"6.0s" },
          { Icon:Workflow,     top:"92%",  left:"60%",  sz:24, anim:"iconDriftD 12s ease-in-out infinite", delay:"2.4s" },
        ].map(({Icon, top, left, sz, anim, delay}, i) => (
          <div key={i} style={{
            position:"absolute", top, left,
            opacity:0.12,
            animation: anim,
            animationDelay: delay,
            color: i % 3 === 0 ? C.v : i % 3 === 1 ? C.accent : C.vLight,
          }}>
            <Icon size={sz} strokeWidth={1.2} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth:1060, margin:"0 auto", width:"100%", position:"relative", zIndex:1, paddingLeft:0, paddingRight:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.6rem", flexWrap:"wrap" }}>
          <div className="rv mono" style={{ fontSize:"0.72rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ display:"inline-block", width:32, height:1, background:C.v }} />
            3rd Year CSE · Manipal University Jaipur · 2023–2027
          </div>
          <div className="rv d1 status-available">
            <div className="status-ping"/>
            <span style={{ fontSize:"0.62rem", color:"#059669", fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>OPEN TO WORK</span>
          </div>
        </div>

        <h1 className="rv d1 serif" style={{ fontSize:"clamp(3.8rem,9vw,8rem)", fontWeight:400, lineHeight:1.0, marginBottom:"0.6rem", letterSpacing:"-2px", color:C.ink }}>
          Arman<br/>
          <span className="grad" style={{ fontStyle:"italic" }}>Phaugat</span>
        </h1>

        <div className="rv d2" style={{ marginBottom:"2rem", height:"2.2rem", display:"flex", alignItems:"center" }}>
          <span className="mono" style={{ fontSize:"clamp(1rem,2.2vw,1.4rem)", color:C.muted, fontWeight:300 }}>
            {typed}<span style={{ animation:"blink 1s infinite", display:"inline-block", color:C.v }}>|</span>
          </span>
        </div>

        <p className="rv d3" style={{ fontSize:"1.05rem", color:C.muted, maxWidth:520, lineHeight:1.9, marginBottom:"3rem", fontWeight:400 }}>
          Building fast backends, shipping ML models, and crafting AI-powered apps.
          Top <strong style={{color:C.v}}>0.3% LeetCode</strong> · <strong style={{color:C.v}}>9.05 CGPA</strong> · 900+ DSA problems solved.
        </p>

        {/* ✅ FIX 1: Merged duplicate className props into one — was: className="rv d4" style={{...}} className="hero-ctarow }}" */}
        <div className="rv d4 hero-ctarow" style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"4.5rem" }}>
          <a href="#projects" style={{
            padding:"0.95rem 2.2rem", background:`linear-gradient(135deg,${C.v},${C.accent})`,
            color:"#fff", borderRadius:8, textDecoration:"none", fontSize:"0.88rem", fontWeight:700,
            boxShadow:`0 8px 32px rgba(124,58,237,0.35)`, transition:"transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 14px 40px rgba(124,58,237,0.5)`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 8px 32px rgba(124,58,237,0.35)`;}}
          >View Projects ↗</a>
          <a href="#contact" style={{
            padding:"0.95rem 2.2rem", background:"transparent", color:C.ink,
            border:`1.5px solid rgba(124,58,237,0.25)`, borderRadius:8, textDecoration:"none",
            fontSize:"0.88rem", fontWeight:700, transition:"border-color 0.2s, background 0.2s, transform 0.2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.v;e.currentTarget.style.background=C.vPale;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(124,58,237,0.25)";e.currentTarget.style.background="transparent";e.currentTarget.style.transform="";}}
          >Let's Talk</a>
          <a href="https://github.com/armanphaugat" target="_blank" rel="noreferrer" style={{
            padding:"0.95rem 1.6rem", background:C.ink, color:"#fff", borderRadius:8,
            textDecoration:"none", fontSize:"0.88rem", fontWeight:700,
            transition:"background 0.2s, transform 0.2s", display:"flex", alignItems:"center", gap:"0.5rem",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.vDeep;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=C.ink;e.currentTarget.style.transform="";}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" style={{
            padding:"0.95rem 1.6rem", background:"#0A66C2", color:"#fff", borderRadius:8,
            textDecoration:"none", fontSize:"0.88rem", fontWeight:700,
            transition:"background 0.2s, transform 0.2s", display:"flex", alignItems:"center", gap:"0.5rem",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="#004182";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#0A66C2";e.currentTarget.style.transform="";}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" style={{
            padding:"0.95rem 1.6rem", background:"#FFA116", color:"#fff", borderRadius:8,
            textDecoration:"none", fontSize:"0.88rem", fontWeight:700,
            transition:"background 0.2s, transform 0.2s", display:"flex", alignItems:"center", gap:"0.5rem",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="#cc8100";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#FFA116";e.currentTarget.style.transform="";}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
            LeetCode
          </a>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" style={{
            padding:"0.95rem 1.6rem", background:"transparent", color:C.v,
            border:`1.5px solid ${C.v}`, borderRadius:8, textDecoration:"none",
            fontSize:"0.88rem", fontWeight:700, display:"flex", alignItems:"center", gap:"0.5rem",
            transition:"background 0.2s, color 0.2s, transform 0.2s",
            animation:"resumePulse 2.5s ease-in-out infinite",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.v;e.currentTarget.style.color="#fff";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.v;e.currentTarget.style.transform="";}}
          >
            <Download size={15} strokeWidth={2.5} />
            Resume
          </a>
        </div>

        {/* Stats row — animated counters */}
        <div className="rv hero-stats" style={{ display:"flex", gap:"0", borderTop:"1px solid rgba(124,58,237,0.1)", paddingTop:"2.5rem", flexWrap:"wrap" }}>
          <AnimatedStat value="9.05" label="CGPA — Dean's Award" />
          <AnimatedStat value="900+" label="DSA Problems" />
          <AnimatedStat value="10+" label="Projects Built" />
          <div style={{ padding:"0 2.5rem 0 0", marginRight:"2.5rem", marginBottom:"1rem" }}>
            <div className="serif" style={{ fontSize:"1.9rem", fontWeight:400, color:"var(--ink)", letterSpacing:"-1px" }}>Top 0.3%</div>
            <div className="mono" style={{ fontSize:"0.62rem", color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1.5px", marginTop:"0.2rem", lineHeight:1.4 }}>LeetCode Global</div>
          </div>
          <div style={{ padding:"0", marginBottom:"1rem" }}>
            <div className="serif" style={{ fontSize:"1.9rem", fontWeight:400, color:"var(--ink)", letterSpacing:"-1px" }}>3rd Year</div>
            <div className="mono" style={{ fontSize:"0.62rem", color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1.5px", marginTop:"0.2rem", lineHeight:1.4 }}>B.Tech CSE</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MARQUEE ─────────────── */
function Marquee() {
  const items = ["Node.js","Redis","MySQL","BullMQ","Python","FastAPI","LangChain","FAISS","MongoDB","Docker","XGBoost","Streamlit","Pygame","React","Scikit-learn","RAG","HuggingFace","JWT","Pandas","Groq","System Design","ACID Transactions"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background:C.ink, padding:"1rem 0", overflow:"hidden", borderTop:`1px solid rgba(124,58,237,0.3)`, borderBottom:`1px solid rgba(124,58,237,0.3)` }}>
      <div style={{ display:"flex", animation:"marquee 30s linear infinite", width:"max-content" }}>
        {doubled.map((item,i) => (
          <span key={i} className="mono" style={{ color:C.vLight, fontSize:"0.72rem", letterSpacing:"2px", textTransform:"uppercase", padding:"0 2rem", display:"flex", alignItems:"center", gap:"2rem" }}>
            {item} <span style={{ color:C.v, fontSize:"0.45rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── ABOUT ─────────────── */
function About() {
  const cardRef = useRef(null);
  useTilt(cardRef);
  return (
    <section id="about" style={{ padding:"8rem 4rem", background:C.bg2, position:"relative", overflow:"hidden" }} className="sec-pad">
      {/* Floating Lucide icons bg */}
      <div className="float-bg" style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        {[
          { Icon:Code2,    top:"8%",  left:"92%", sz:36, anim:"iconDrift  9s  ease-in-out infinite", delay:"0s",   col:C.v      },
          { Icon:Binary,   top:"75%", left:"2%",  sz:32, anim:"iconDriftB 11s ease-in-out infinite", delay:"2s",   col:C.accent },
          { Icon:Cpu,      top:"50%", left:"95%", sz:30, anim:"iconDriftC 8s  ease-in-out infinite", delay:"1s",   col:C.vLight },
          { Icon:Zap,      top:"88%", left:"88%", sz:28, anim:"iconDrift  13s ease-in-out infinite", delay:"3.5s", col:C.v      },
          { Icon:Terminal, top:"20%", left:"0%",  sz:26, anim:"iconDriftD 10s ease-in-out infinite", delay:"1.5s", col:C.accent },
        ].map(({Icon,top,left,sz,anim,delay,col},i) => (
          <div key={i} style={{ position:"absolute", top, left, opacity:0.09, animation:anim, animationDelay:delay, color:col }}><Icon size={sz} strokeWidth={1} /></div>
        ))}
      </div>
      <div style={{ maxWidth:1060, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start", position:"relative", zIndex:1 }} className="grid2">
        <div>
          <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
            <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>About Me
          </div>
          <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.4rem,4vw,3.4rem)", fontWeight:400, letterSpacing:"-1.5px", lineHeight:1.1, marginBottom:"1.5rem", fontStyle:"italic", color:C.ink }}>
            Passionate about <span className="grad">systems & scale</span>
          </h2>
          <div className="rv d2" style={{ fontSize:"0.97rem", color:C.muted, lineHeight:1.95 }}>
            <p style={{marginBottom:"1.1rem"}}>I'm a <strong style={{color:C.ink}}>3rd-year Computer Science student</strong> at Manipal University Jaipur who builds things that work fast, scale cleanly, and solve real problems.</p>
            <p style={{marginBottom:"1.1rem"}}>My core focus is backend engineering — <strong style={{color:C.v}}>Node.js, Redis, BullMQ, MySQL</strong> — plus AI applications with <strong style={{color:C.v}}>LangChain, FAISS, and Groq</strong>. I also train ML models with Scikit-learn and XGBoost.</p>
            <p>I solve 900+ DSA problems not for the resume line, but because I genuinely love finding the most elegant path through a hard problem.</p>
          </div>
          <div className="rv d3" style={{ display:"flex", gap:"0.7rem", marginTop:"2rem", flexWrap:"wrap" }}>
            {["Open to Internships","Available for Projects","LeetCode Top 0.3%"].map(t => (
              <span key={t} style={{ padding:"0.4rem 1rem", border:`1px solid rgba(124,58,237,0.2)`, borderRadius:100, fontSize:"0.75rem", color:C.v, fontWeight:600, background:C.vPale }}>{t}</span>
            ))}
          </div>
        </div>

        <div ref={cardRef} className="rv d2" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:20, padding:"2.5rem", boxShadow:"0 4px 40px rgba(124,58,237,0.06)", willChange:"transform", transition:"transform 0.15s ease, box-shadow 0.15s ease" }}>
          {[
            ["🎓","Education","B.Tech CSE · 3rd Year","Manipal University Jaipur · 2023–2027"],
            ["📍","Location","Jaipur, Rajasthan","India"],
            ["🏅","CGPA","9.05 / 10","Dean's Excellence Award — Multiple Semesters"],
            ["⚡","Focus","Backend · AI/ML","Node.js · Python · System Design"],
            ["🧩","Competitive","LeetCode Top 0.3%","900+ problems · Global Rank"],
            ["🚀","Hackathon","MUJHackX Round 2","Among 1300+ participants"],
          ].map(([ico,label,val,sub],i) => (
            <div key={label} style={{ display:"flex", gap:"1.1rem", alignItems:"flex-start", padding:"1rem 0", borderBottom: i < 5 ? `1px solid rgba(124,58,237,0.06)` : "none" }}>
              <div style={{ width:36, height:36, borderRadius:10, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", flexShrink:0 }}>{ico}</div>
              <div>
                <div className="mono" style={{ fontSize:"0.6rem", color:C.muted, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"0.1rem" }}>{label}</div>
                <div style={{ fontSize:"0.9rem", fontWeight:700, color:C.ink }}>{val}</div>
                <div style={{ fontSize:"0.78rem", color:C.muted, marginTop:"0.1rem" }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* GitHub Stats card below */}
      <div style={{ maxWidth:1060, margin:"2.5rem auto 0", position:"relative", zIndex:1 }} className="rv d4">
        <GitHubStatsCard />
      </div>
    </section>
  );
}

/* ─────────────── EXPERIENCE ─────────────── */
function Experience() {
  return (
    <section id="experience" style={{ padding:"8rem 4rem", background:C.bg }} className="sec-pad">
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Experience
        </div>
        <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink, marginBottom:"0.7rem" }}>
          Where I've <span className="grad">worked</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.95rem", color:C.muted, marginBottom:"3rem", lineHeight:1.8 }}>Real-world experience shipping under professional deadlines.</p>

        <div className="rv d3" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:18, padding:"2.5rem", boxShadow:"0 4px 40px rgba(124,58,237,0.06)", transition:"transform 0.25s, box-shadow 0.25s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 16px 56px rgba(124,58,237,0.13)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 40px rgba(124,58,237,0.06)";}}
        >
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"1rem", marginBottom:"1.5rem" }}>
            <div style={{ display:"flex", gap:"1.2rem", alignItems:"center" }}>
              <div style={{ width:52, height:52, borderRadius:14, background:C.ink, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", flexShrink:0 }}>🏥</div>
              <div>
                <div style={{ fontSize:"1.1rem", fontWeight:800, color:C.ink }}>Web Development Intern</div>
                <div style={{ fontSize:"0.9rem", color:C.v, fontWeight:600 }}>Indavis Lifesciences, Haridwar</div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <span className="mono" style={{ fontSize:"0.72rem", color:C.v, background:C.vPale, padding:"0.3rem 1rem", borderRadius:100, display:"inline-block" }}>Jun 2025 – Jul 2025</span>
              <div className="mono" style={{ fontSize:"0.65rem", color:C.muted, marginTop:"0.4rem", letterSpacing:"1px" }}>FULL-TIME · ON-SITE</div>
            </div>
          </div>
          {["Maintained and updated the company website ensuring smooth performance and content accuracy.","Collaborated with cross-functional teams to align website updates with brand guidelines and business objectives."].map((b,i) => (
            <div key={i} style={{ display:"flex", gap:"0.7rem", fontSize:"0.9rem", color:C.muted, marginBottom:"0.6rem", lineHeight:1.75 }}>
              <span style={{ color:C.v, flexShrink:0 }}>▸</span>{b}
            </div>
          ))}
          <div style={{ marginTop:"1.4rem", display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
            {["Website Maintenance","Team Collaboration","Content Management","Brand Alignment"].map(t=>(
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        {/* ✅ FIX 2: Merged duplicate className props into one — was: className="rv d4" className="otw-banner" */}
        <div className="rv d4 otw-banner" style={{ marginTop:"2rem", background:`linear-gradient(135deg,${C.vDeep},${C.v})`, borderRadius:18, padding:"2.5rem", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1.5rem" }}>
          <div>
            <div className="mono" style={{ fontSize:"0.68rem", letterSpacing:"2px", textTransform:"uppercase", opacity:.6, marginBottom:"0.5rem" }}>Currently Seeking</div>
            <div style={{ fontSize:"1.3rem", fontWeight:800, marginBottom:"0.4rem" }}>Summer Internship 2026 · Full-Time Roles</div>
            <div style={{ opacity:0.7, fontSize:"0.88rem" }}>Backend Engineering · AI/ML Engineering · Full Stack</div>
          </div>
          <a href="mailto:armanphaugat20@gmail.com" style={{
            padding:"0.85rem 2rem", background:"rgba(255,255,255,0.15)", color:"#fff",
            border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:8, textDecoration:"none",
            fontWeight:700, fontSize:"0.85rem", whiteSpace:"nowrap", transition:"background 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}
          >Reach Out →</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── RESUME ─────────────── */
function Resume() {
  return (
    <section id="resume" style={{ padding:"8rem 4rem", background:C.bg }} className="sec-pad">
      <div style={{ maxWidth:1060, margin:"0 auto" }}>

        {/* Header */}
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Resume
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1.5rem", marginBottom:"3.5rem" }}>
          <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink }}>
            Curriculum <span className="grad">Vitae</span>
          </h2>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" className="rv d2" style={{
            padding:"0.85rem 2rem", background:`linear-gradient(135deg,${C.v},${C.accent})`,
            color:"#fff", borderRadius:8, textDecoration:"none", fontSize:"0.85rem", fontWeight:700,
            display:"flex", alignItems:"center", gap:"0.6rem",
            boxShadow:`0 8px 28px rgba(124,58,237,0.35)`,
            transition:"transform 0.2s, box-shadow 0.2s",
            animation:"resumePulse 2.5s ease-in-out infinite",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 14px 40px rgba(124,58,237,0.5)`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 8px 28px rgba(124,58,237,0.35)`;}}
          >
            <Download size={16} strokeWidth={2.5} />
            Download Resume (PDF)
          </a>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", alignItems:"start" }} className="grid2">

          {/* LEFT COLUMN */}
          <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>

            {/* Summary */}
            <div className="rv" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:`linear-gradient(135deg,rgba(124,58,237,0.08),rgba(232,121,249,0.06))`, pointerEvents:"none" }}/>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.2rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>👤</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Summary</div>
              </div>
              <p style={{ fontSize:"0.88rem", color:C.muted, lineHeight:1.9, position:"relative", zIndex:1 }}>
                Passionate <strong style={{color:C.ink}}>Backend & AI/ML Engineer</strong> in my 3rd year of B.Tech CSE at Manipal University Jaipur, maintaining a <strong style={{color:"#2563EB"}}>9.05 CGPA</strong> with the Dean's Excellence Award. I build high-performance distributed systems with <strong style={{color:"#2563EB"}}>Node.js, Redis, and MySQL</strong>, and AI-powered applications using <strong style={{color:"#2563EB"}}>LangChain, FAISS, and Groq</strong>. Ranked in the <strong style={{color:"#2563EB"}}>top 0.3% globally on LeetCode</strong> with 900+ problems solved — I combine strong algorithmic thinking with real-world engineering to ship fast, scalable, production-ready systems. Actively seeking internship and full-time opportunities in backend, AI/ML, or full-stack engineering.
              </p>
              <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginTop:"1.2rem" }}>
                {["Backend Engineering","AI / ML","System Design","Open to Internships","Available 2026"].map(t => (
                  <span key={t} style={{ padding:"0.28rem 0.8rem", background:C.vPale, border:"1px solid rgba(124,58,237,0.15)", borderRadius:100, fontSize:"0.7rem", color:"#2563EB", fontWeight:600 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="rv" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.4rem" }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`linear-gradient(135deg,${C.v},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:"#fff", fontSize:"0.85rem", fontWeight:800 }}>AP</span>
                </div>
                <div>
                  <div style={{ fontSize:"1rem", fontWeight:800, color:C.ink }}>Arman Phaugat</div>
                  <div className="mono" style={{ fontSize:"0.65rem", color:C.muted }}>B.Tech CSE · MUJ · 2023–2027</div>
                </div>
              </div>
              {[
                ["✉️", "armanphaugat20@gmail.com", "mailto:armanphaugat20@gmail.com"],
                ["📱", "+91-9306115772",            "tel:+919306115772"],
                ["🐙", "github.com/armanphaugat",   "https://github.com/armanphaugat"],
                ["💼", "linkedin.com/in/armanphaugat05", "https://www.linkedin.com/in/armanphaugat05/"],
                ["🧩", "leetcode.com/u/armanphaugat20",  "https://leetcode.com/u/armanphaugat20"],
                ["📍", "Jaipur, Rajasthan, India",  null],
              ].map(([icon, label, href]) => (
                <div key={label} style={{ display:"flex", gap:"0.8rem", alignItems:"center", padding:"0.55rem 0", borderBottom:"1px solid rgba(124,58,237,0.05)" }}>
                  <span style={{ fontSize:"0.9rem", flexShrink:0 }}>{icon}</span>
                  {href
                    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        style={{ fontSize:"0.8rem", color:C.v, textDecoration:"none", fontWeight:500, wordBreak:"break-all" }}
                        onMouseEnter={e=>e.currentTarget.style.textDecoration="underline"}
                        onMouseLeave={e=>e.currentTarget.style.textDecoration="none"}
                      >{label}</a>
                    : <span style={{ fontSize:"0.8rem", color:C.muted }}>{label}</span>
                  }
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="rv d1" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>🎓</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Education</div>
              </div>
              <div style={{ borderLeft:`2px solid ${C.vPale}`, paddingLeft:"1.2rem" }}>
                <div style={{ fontSize:"0.95rem", fontWeight:700, color:C.ink }}>B.Tech in Computer Science & Engineering</div>
                <div style={{ fontSize:"0.82rem", color:C.v, fontWeight:600, marginTop:"0.2rem" }}>Manipal University Jaipur</div>
                <div className="mono" style={{ fontSize:"0.68rem", color:C.muted, marginTop:"0.25rem" }}>2023 – 2027 · Jaipur, Rajasthan</div>
                <div style={{ marginTop:"0.8rem", display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                  <span style={{ padding:"0.25rem 0.7rem", background:C.vPale, color:C.v, borderRadius:100, fontSize:"0.72rem", fontWeight:700 }}>CGPA: 9.05 / 10</span>
                  <span style={{ padding:"0.25rem 0.7rem", background:"rgba(245,158,11,0.1)", color:"#92400E", borderRadius:100, fontSize:"0.72rem", fontWeight:700 }}>Dean's Excellence Award</span>
                </div>
                <div style={{ fontSize:"0.8rem", color:C.muted, marginTop:"0.8rem", lineHeight:1.7 }}>
                  Relevant coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Discrete Mathematics.
                </div>
              </div>
            </div>

            {/* Competitive Programming */}
            <div className="rv d2" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>🏆</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Competitive Programming</div>
              </div>
              {[
                { platform:"LeetCode", handle:"armanphaugat20", stat:"Beats 99.7% · 900+ problems solved", col:"#FFA116", badge:"Top 0.3%" },
                { platform:"Codeforces", handle:"Active participant", stat:"Regular contest participation", col:"#1890FF", badge:"Rated" },
              ].map(({ platform, handle, stat, col, badge }) => (
                <div key={platform} style={{ display:"flex", gap:"1rem", alignItems:"flex-start", padding:"0.8rem 0", borderBottom:"1px solid rgba(124,58,237,0.05)" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:col, marginTop:"0.35rem", flexShrink:0 }}/>
                  <div>
                    <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
                      <span style={{ fontSize:"0.88rem", fontWeight:700, color:C.ink }}>{platform}</span>
                      <span style={{ fontSize:"0.62rem", padding:"0.1rem 0.5rem", background:`${col}18`, color:col, borderRadius:4, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>{badge}</span>
                    </div>
                    <div className="mono" style={{ fontSize:"0.68rem", color:C.muted, marginTop:"0.1rem" }}>{handle}</div>
                    <div style={{ fontSize:"0.78rem", color:C.muted, marginTop:"0.3rem" }}>{stat}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="rv d3" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>⭐</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Achievements</div>
              </div>
              {[
                { icon:"🏅", text:"Dean's Excellence Award — Multiple semesters for 9.0+ CGPA" },
                { icon:"⚡", text:"LeetCode Top 0.3% — Global rank among millions of users" },
                { icon:"🚀", text:"MUJHackX Round 2 Qualifier — Top performers among 1300+ participants" },
                { icon:"💡", text:"900+ DSA problems solved across LeetCode, Codeforces & more" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display:"flex", gap:"0.8rem", alignItems:"flex-start", padding:"0.6rem 0", borderBottom:"1px solid rgba(124,58,237,0.05)" }}>
                  <span style={{ fontSize:"1rem", flexShrink:0 }}>{icon}</span>
                  <span style={{ fontSize:"0.82rem", color:C.muted, lineHeight:1.6 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="rv d4" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>📜</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Licenses & Certifications</div>
              </div>
              {[
                {
                  org:"TLE Eliminators", icon:"🥋", col:"#E53E3E",
                  name:"Competitive Programming — Level 1, 2 & 3",
                  issued:"Dec 2023", skills:["C++","Algorithms","Data Structures","CP Contests"],
                  badge:"3 Certs",
                },
                {
                  org:"NPTEL", icon:"🎓", col:"#2B6CB0",
                  name:"Design and Analysis of Algorithms (DAA)",
                  issued:"Jan 2025", skills:["C++","Algorithm Design","Complexity Analysis"],
                  badge:"Verified",
                },
                {
                  org:"Red Hat", icon:"🎩", col:"#C53030",
                  name:"System Administration I & II",
                  issued:"Jan 2025", skills:["Linux","RHEL","Sysadmin","Shell Scripting"],
                  badge:"2 Certs",
                },
                {
                  org:"Coursera", icon:"📡", col:"#2D3748",
                  name:"RAG (Retrieval-Augmented Generation) Course",
                  issued:"2024", skills:["LangChain","FAISS","Vector DBs","RAG","LLMs"],
                  badge:"Verified",
                },
                {
                  org:"GeeksforGeeks", icon:"💚", col:"#276749",
                  name:"OOP Programming using Java",
                  issued:"Aug 2024", skills:["Java","OOP","Inheritance","Polymorphism"],
                  badge:"Verified",
                },
                {
                  org:"Oracle", icon:"🔴", col:"#C05621",
                  name:"Database Design and Foundations",
                  issued:"Aug 2024", skills:["SQL","PL/SQL","Database Design","ER Modelling"],
                  badge:"2 Certs",
                },
              ].map(({ org, icon, col, name, issued, skills, badge }, i) => (
                <div key={name} style={{
                  display:"flex", gap:"1rem", alignItems:"flex-start",
                  padding:"1rem 0",
                  borderBottom: i < 5 ? "1px solid rgba(124,58,237,0.06)" : "none",
                }}>
                  {/* Org avatar */}
                  <div style={{
                    width:38, height:38, borderRadius:9, background:`${col}18`,
                    border:`1.5px solid ${col}33`, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:"1.1rem", flexShrink:0,
                  }}>{icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"0.5rem", flexWrap:"wrap" }}>
                      <div>
                        <div style={{ fontSize:"0.85rem", fontWeight:700, color:C.ink, lineHeight:1.35 }}>{name}</div>
                        <div style={{ fontSize:"0.75rem", color:col, fontWeight:600, marginTop:"0.1rem" }}>{org}</div>
                      </div>
                      <span style={{
                        fontSize:"0.6rem", padding:"0.15rem 0.55rem", borderRadius:4,
                        background:`${col}15`, color:col, fontWeight:700,
                        fontFamily:"'JetBrains Mono',monospace", flexShrink:0, whiteSpace:"nowrap",
                      }}>{badge}</span>
                    </div>
                    <div className="mono" style={{ fontSize:"0.62rem", color:C.muted, marginTop:"0.35rem" }}>Issued {issued}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem", marginTop:"0.5rem" }}>
                      {skills.map(s => (
                        <span key={s} style={{
                          fontSize:"0.62rem", padding:"0.15rem 0.5rem", borderRadius:4,
                          background:C.vPale, color:C.v,
                          border:"1px solid rgba(124,58,237,0.15)",
                          fontFamily:"'JetBrains Mono',monospace",
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>

            {/* Experience */}
            <div className="rv" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>💼</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Work Experience</div>
              </div>
              <div style={{ borderLeft:`2px solid ${C.vPale}`, paddingLeft:"1.2rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.5rem" }}>
                  <div>
                    <div style={{ fontSize:"0.95rem", fontWeight:700, color:C.ink }}>Web Development Intern</div>
                    <div style={{ fontSize:"0.82rem", color:C.v, fontWeight:600, marginTop:"0.2rem" }}>Indavis Lifesciences, Haridwar</div>
                  </div>
                  <span className="mono" style={{ fontSize:"0.65rem", color:C.v, background:C.vPale, padding:"0.2rem 0.7rem", borderRadius:100 }}>Jun – Jul 2025</span>
                </div>
                <ul style={{ listStyle:"none", marginTop:"0.9rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                  {[
                    "Maintained and updated the company website ensuring smooth performance and content accuracy",
                    "Collaborated with cross-functional teams to align website updates with brand guidelines",
                    "Managed content workflows and ensured consistent brand representation across all web pages",
                  ].map((b,i) => (
                    <li key={i} style={{ display:"flex", gap:"0.5rem", fontSize:"0.8rem", color:C.muted, lineHeight:1.65 }}>
                      <span style={{ color:C.v, flexShrink:0 }}>▸</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="rv d1" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>🛠️</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Technical Skills</div>
              </div>
              {[
                { label:"Languages",         items:["Python","JavaScript","C","C++","Java","HTML","CSS"] },
                { label:"Backend",           items:["Node.js","Express.js","FastAPI","REST APIs","JWT","Argon2","Bcrypt"] },
                { label:"Databases & Cache", items:["MySQL","MongoDB","Redis","FAISS","SQLite3"] },
                { label:"AI / ML",           items:["LangChain","HuggingFace","RAG","XGBoost","Scikit-learn","Pandas","NumPy"] },
                { label:"DevOps & Tools",    items:["Docker","Git","GitHub","Postman","Cloudinary","Groq","BullMQ"] },
                { label:"Concepts",          items:["System Design","DSA","ACID","Caching","Rate Limiting","OOP","Auth & AuthZ"] },
              ].map(({ label, items }) => (
                <div key={label} style={{ marginBottom:"1rem" }}>
                  <div className="mono" style={{ fontSize:"0.62rem", color:C.v, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"0.45rem", fontWeight:700 }}>{label}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
                    {items.map(t => <span key={t} className="chip" style={{ fontSize:"0.72rem" }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Projects (condensed) */}
            <div className="rv d2" style={{ background:C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16, padding:"1.8rem", boxShadow:"0 2px 20px rgba(124,58,237,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>🚀</div>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>Key Projects</div>
              </div>
              {[
                { name:"Real Time Stock Trading Backend", tech:"Node.js · Redis · MySQL · BullMQ · Docker", points:["Redis Sorted Sets → <50ms leaderboard queries","JWT auth + Token Bucket rate limiter","MySQL row-level locking for concurrent trades"] },
                { name:"RAG Discord Bot", tech:"Python · FastAPI · LangChain · FAISS · Groq", points:["Ingests PDFs & web pages into per-guild vector stores","LCEL chain with Groq Llama 3.3 for contextual answers","Multi-server isolation with permission-gated uploads"] },
                { name:"Video Streaming & User Management", tech:"Node.js · MongoDB · Cloudinary · ffmpeg", points:["HLS transcoding (360p/720p) via ffmpeg + Cloudinary","JWT access/refresh token lifecycle management","MongoDB aggregation pipelines for watch history"] },
                { name:"Cricket Score & IPL Win Predictor", tech:"Python · XGBoost · Streamlit · CricAPI", points:["XGBoost models for IPL, T20, and ODI formats","Live CricAPI integration for real-time predictions","Logistic Regression for in-match win probability"] },
              ].map(({ name, tech, points }, i) => (
                <div key={name} style={{ padding:"1rem 0", borderBottom: i < 3 ? "1px solid rgba(124,58,237,0.06)" : "none" }}>
                  <div style={{ fontSize:"0.88rem", fontWeight:700, color:C.ink, marginBottom:"0.2rem" }}>{name}</div>
                  <div className="mono" style={{ fontSize:"0.63rem", color:C.v, marginBottom:"0.5rem" }}>{tech}</div>
                  {points.map((p,j) => (
                    <div key={j} style={{ display:"flex", gap:"0.5rem", fontSize:"0.77rem", color:C.muted, lineHeight:1.55, marginBottom:"0.2rem" }}>
                      <span style={{ color:C.v, flexShrink:0 }}>→</span>{p}
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom download CTA bar */}
        <div className="rv d4" style={{ marginTop:"2.5rem", background:C.ink, borderRadius:16, padding:"2rem 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1.5rem" }}>
          <div>
            <div className="mono" style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.4)", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"0.4rem" }}>Ready to hire?</div>
            <div style={{ fontSize:"1.1rem", fontWeight:800, color:"#fff" }}>Download the full PDF resume</div>
            <div style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", marginTop:"0.2rem" }}>Last updated · 2025 · ARMANRESUME.pdf</div>
          </div>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" style={{
              padding:"0.85rem 2rem", background:`linear-gradient(135deg,${C.v},${C.accent})`, color:"#fff",
              borderRadius:8, textDecoration:"none", fontWeight:700, fontSize:"0.85rem",
              display:"flex", alignItems:"center", gap:"0.6rem", whiteSpace:"nowrap",
              transition:"transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 10px 30px rgba(124,58,237,0.4)`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
            >
              <Download size={15} strokeWidth={2.5}/>
              Download PDF
            </a>
            <a href="mailto:armanphaugat20@gmail.com" style={{
              padding:"0.85rem 2rem", background:"rgba(255,255,255,0.1)", color:"#fff",
              border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, textDecoration:"none",
              fontWeight:700, fontSize:"0.85rem", whiteSpace:"nowrap", transition:"background 0.2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
            >Reach Out →</a>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────── PROJECTS ─────────────── */
const PROJECTS = [
  { num:"01", name:"Real Time Stock Trading Backend", tagline:"High-perf system · live leaderboards · ACID-safe concurrency", category:"Backend",
    highlights:["Redis Sorted Sets + pipeline opt → <50ms leaderboard queries","BullMQ price engine · 30-min repeatable jobs · ±25% variation","JWT auth + Token Bucket rate limiter at 5 req/sec/user","MySQL row-level locking for concurrent buy/sell workflows"],
    tech:["Node.js","Express","MySQL","Redis","BullMQ","JWT","Docker","Argon2"] },
  { num:"02", name:"Video Streaming & User Management", tagline:"YouTube-like backend · HLS adaptive streaming · real-time analytics", category:"Backend",
    highlights:["HLS transcoding via ffmpeg · 360p/720p on Cloudinary","JWT access + refresh token flow · secure auth lifecycle","MongoDB query opt — ~200ms → ~120ms response time","Aggregation pipelines for watch history & subscriptions"],
    tech:["Node.js","MongoDB","Express","Cloudinary","JWT","ffmpeg","Bcrypt"] },
  { num:"03", name:"RAG Discord Bot", tagline:"AI bot ingesting PDFs & web pages · answers via Llama 3.3", category:"AI/ML",
    highlights:["LangChain: web scrape · PDF parse · recursive chunking → FAISS","HuggingFace embeddings · per-guild persistent vector stores","LCEL chain feeds context chunks to Groq Llama 3.3 LLM","FastAPI · multi-server isolation · permission-gated uploads"],
    tech:["Python","FastAPI","LangChain","FAISS","Discord.py","Groq","HuggingFace"] },
  { num:"04", name:"RAG Bot Website", tagline:"React showcase for the Discord RAG bot with interactive demos", category:"Frontend",
    highlights:["Scroll-triggered animations via IntersectionObserver","Interactive feature tabs — PDF / web scraping / Q&A modes","Zero CSS framework · pure React inline styling architecture","Vite + React · modular component structure"],
    tech:["React","Vite","JavaScript","CSS","Lucide Icons"] },
  { num:"05", name:"Cricket Score Predictor", tagline:"Live IPL · T20 · ODI score prediction via XGBoost models", category:"AI/ML",
    highlights:["3 pre-trained XGBoost models for IPL, T20, and ODI formats","CricAPI integration for live match data","Streamlit UI with team + overs input for instant predictions","Format-specific feature engineering pipelines"],
    tech:["Python","Streamlit","XGBoost","Scikit-learn","Pandas","CricAPI","Pickle"] },
  { num:"06", name:"IPL Win Predictor", tagline:"Real-time IPL win probability via ML on historical data", category:"AI/ML",
    highlights:["Logistic Regression / Random Forest on seasons of IPL records","Dynamic win % via CRR, RRR, wickets, overs remaining","Feature engineering on 4500+ raw CSV match rows","Streamlit web app for in-match probability visualization"],
    tech:["Python","Streamlit","Scikit-learn","Pandas","NumPy","Matplotlib"] },
  { num:"07", name:"Book Recommender System", tagline:"Dual-mode engine — popularity-based & collaborative filtering", category:"AI/ML",
    highlights:["Popularity: top 50 books filtered by 250+ ratings + avg score","Collaborative filtering with cosine similarity on pivot matrix","Filters to users with 200+ ratings for higher signal quality","Streamlit UI with covers, authors, top-N recommendations"],
    tech:["Python","Streamlit","Scikit-learn","Pandas","NumPy","Cosine Similarity"] },
  { num:"08", name:"WhatsApp Chat Analyser", tagline:"Upload any export · visualize conversation trends instantly", category:"AI/ML",
    highlights:["Timeline analysis · daily, weekly, monthly message frequency","Top emoji breakdown with pie chart visualizations","Most active user leaderboard for group chats","WordCloud + Matplotlib interactive charts"],
    tech:["Python","Streamlit","Pandas","Matplotlib","WordCloud","Regex","Emoji"] },
  { num:"09", name:"Cuntrex — 2D Shooter Game", tagline:"Two-player 2D shooter built from scratch with Pygame", category:"Game",
    highlights:["Full game loop · frame control · event handling · collision detection","Health bar system with real-time ratio-based rendering","Menu / play / retry screens with image-based hit detection","Background music + jump SFX via Pygame mixer"],
    tech:["Python","Pygame","OOP","Game Loop","Sprite Animation"] },
  { num:"10", name:"SalesForce UI Clone", tagline:"Pixel-accurate frontend clone of the Salesforce homepage", category:"Frontend",
    highlights:["Full layout: nav, hero, content strips — no frameworks","CSS-only responsive grid and flexbox layout","Faithfully replicated brand typography and spacing","A focused exercise in CSS precision and layout mastery"],
    tech:["HTML","CSS","Flexbox","Responsive Design"] },
];

const CAT_COLORS = { Backend:C.v, "AI/ML":"#0EA5E9", Frontend:"#10B981", Game:"#F59E0B" };
const CATEGORIES = ["All","Backend","AI/ML","Frontend","Game"];

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  const cc = CAT_COLORS[p.category] || C.v;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      background: hov ? C.ink : C.paper, border:`1px solid rgba(124,58,237,0.1)`, borderRadius:16,
      padding:"1.9rem", transition:"background 0.35s, transform 0.25s, box-shadow 0.25s",
      transform: hov ? "translateY(-8px)" : "translateY(0)",
      boxShadow: hov ? "0 24px 64px rgba(22,13,40,0.22)" : "0 2px 20px rgba(124,58,237,0.05)",
      display:"flex", flexDirection:"column", cursor:"default",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <span className="mono" style={{ fontSize:"0.65rem", color: hov ? "rgba(255,255,255,0.3)" : C.muted }}>/{p.num}</span>
          <span style={{ fontSize:"0.6rem", fontWeight:700, padding:"0.18rem 0.6rem", borderRadius:100, background:`${cc}18`, color:cc, border:`1px solid ${cc}44`, fontFamily:"'JetBrains Mono',monospace" }}>{p.category}</span>
        </div>
        <div style={{ width:28, height:28, borderRadius:7, background: hov ? "rgba(124,58,237,0.3)" : C.vPale, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.3s" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={hov ? C.vLight : C.v} strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </div>
      </div>
      <h3 style={{ fontSize:"1rem", fontWeight:800, color: hov ? "#fff" : C.ink, marginBottom:"0.4rem", lineHeight:1.3, letterSpacing:"-0.2px" }}>{p.name}</h3>
      <p style={{ fontSize:"0.8rem", color: hov ? "rgba(255,255,255,0.5)" : C.muted, marginBottom:"1rem", lineHeight:1.65 }}>{p.tagline}</p>
      <div style={{ flex:1, marginBottom:"1.2rem" }}>
        {p.highlights.map((h,i) => (
          <div key={i} style={{ display:"flex", gap:"0.5rem", fontSize:"0.78rem", color: hov ? "rgba(255,255,255,0.6)" : C.muted, marginBottom:"0.38rem", lineHeight:1.55 }}>
            <span style={{ color: hov ? C.vLight : C.v, flexShrink:0 }}>→</span>{h}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
        {p.tech.map(t => (
          <span key={t} className="mono" style={{
            fontSize:"0.62rem", padding:"0.2rem 0.6rem", borderRadius:5,
            background: hov ? "rgba(124,58,237,0.2)" : C.vPale,
            color: hov ? C.vLight : C.v, border:`1px solid ${hov ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.15)"}`,
            transition:"background 0.3s, color 0.3s",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);
  return (
    <section id="projects" style={{ padding:"8rem 4rem", background:C.bg2 }} className="sec-pad">
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Projects
        </div>
        <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink, marginBottom:"0.7rem" }}>
          Things I've <span className="grad">built</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.95rem", color:C.muted, marginBottom:"2rem", lineHeight:1.8 }}>10 projects spanning backends · ML models · AI bots · games · frontend clones</p>
        <ProjectStatsBar />
        <div className="rv d3" style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"2.5rem" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={()=>setActive(cat)} style={{
              padding:"0.45rem 1.2rem", borderRadius:100, cursor:"pointer",
              border: active === cat ? "none" : `1px solid rgba(124,58,237,0.18)`,
              background: active === cat ? C.ink : "transparent",
              color: active === cat ? "#fff" : C.muted,
              fontSize:"0.78rem", fontWeight:600, fontFamily:"'Syne',sans-serif", transition:"all 0.2s",
            }}>
              {cat} <span style={{opacity:.6, fontSize:"0.68rem"}}>({cat==="All" ? PROJECTS.length : PROJECTS.filter(p=>p.category===cat).length})</span>
            </button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1.3rem" }}>
          {filtered.map(p => <ProjectCard key={p.num} p={p}/>)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SKILLS ─────────────── */
const SKILL_LEVELS = [
  { name:"DSA / Competitive Programming", pct:92, cat:"CS Core" },
  { name:"Node.js / Express",             pct:90, cat:"Backend" },
  { name:"Python / FastAPI",              pct:88, cat:"Backend" },
  { name:"MySQL / ACID Design",           pct:85, cat:"Backend" },
  { name:"Redis / BullMQ",               pct:82, cat:"Backend" },
  { name:"MongoDB",                       pct:82, cat:"Database" },
  { name:"LangChain / RAG",              pct:80, cat:"AI/ML"   },
  { name:"Scikit-learn / XGBoost",       pct:78, cat:"AI/ML"   },
  { name:"Docker",                        pct:75, cat:"DevOps"  },
  { name:"React / Frontend",             pct:72, cat:"Frontend" },
];

const SKILL_GROUPS = [
  { icon:"💻", label:"Languages",     items:["Python","JavaScript","C","C++","Java","HTML","CSS"] },
  { icon:"🌐", label:"Web Tech",      items:["Node.js","Express.js","FastAPI","React","Tailwind","REST APIs","Streamlit"] },
  { icon:"🗄️", label:"Databases",    items:["MySQL","MongoDB","Redis","FAISS","SQLite3"] },
  { icon:"🤖", label:"AI / ML",       items:["LangChain","HuggingFace","RAG","Vector DBs","Pandas","NumPy","XGBoost"] },
  { icon:"🔧", label:"Tools",         items:["Docker","Git","GitHub","Postman","Cloudinary","Groq","Jupyter"] },
  { icon:"🧠", label:"Core Concepts", items:["System Design","DSA","ACID","Caching","Rate Limiting","OOP","Auth & AuthZ"] },
];

function SkillBar({ name, pct, cat }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const catC = { Backend:C.v, "AI/ML":"#0EA5E9", Database:"#10B981", DevOps:C.accent, Frontend:"#F59E0B", "CS Core":C.vDeep };
  const col = catC[cat] || C.v;
  return (
    <div ref={ref} style={{ marginBottom:"1.2rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.4rem" }}>
        <span style={{ fontSize:"0.85rem", fontWeight:600, color:C.ink }}>{name}</span>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span className="mono" style={{ fontSize:"0.6rem", color:col, fontWeight:700, background:`${col}18`, padding:"0.1rem 0.5rem", borderRadius:4 }}>{cat}</span>
          <span className="mono" style={{ fontSize:"0.72rem", color:C.muted }}>{pct}%</span>
        </div>
      </div>
      <div style={{ height:6, background:"rgba(124,58,237,0.08)", borderRadius:3, overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:3,
          background:`linear-gradient(90deg,${col},${col}99)`,
          width: vis ? `${pct}%` : "0%",
          transition:"width 1.3s cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: vis ? "0.2s" : "0s",
        }}/>
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("bars");
  return (
    <section id="skills" style={{ padding:"8rem 4rem", background:C.bg, position:"relative", overflow:"hidden" }} className="sec-pad">
      <div className="float-bg" style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        {[
          { Icon:Monitor,    top:"10%", left:"90%", sz:34, anim:"iconDrift  10s ease-in-out infinite", delay:"0s",   col:C.v      },
          { Icon:FlaskConical,top:"60%",left:"3%",  sz:30, anim:"iconDriftB 8s  ease-in-out infinite", delay:"1.5s", col:C.accent },
          { Icon:Bot,        top:"85%", left:"85%", sz:32, anim:"iconDriftC 12s ease-in-out infinite", delay:"3s",   col:C.vLight },
          { Icon:Database,   top:"30%", left:"96%", sz:28, anim:"iconDrift  9s  ease-in-out infinite", delay:"2s",   col:C.v      },
          { Icon:Cpu,        top:"78%", left:"48%", sz:30, anim:"iconDriftD 11s ease-in-out infinite", delay:"4s",   col:C.accent },
          { Icon:Activity,   top:"5%",  left:"40%", sz:26, anim:"iconDriftB 13s ease-in-out infinite", delay:"2.5s", col:C.vLight },
          { Icon:Shield,     top:"92%", left:"25%", sz:28, anim:"iconDriftC 9s  ease-in-out infinite", delay:"1s",   col:C.v      },
        ].map(({Icon,top,left,sz,anim,delay,col},i) => (
          <div key={i} style={{ position:"absolute", top, left, opacity:0.08, animation:anim, animationDelay:delay, color:col }}><Icon size={sz} strokeWidth={1} /></div>
        ))}
      </div>
      <div style={{ maxWidth:1060, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Skills
        </div>
        <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink, marginBottom:"0.7rem" }}>
          My <span className="grad">toolkit</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.95rem", color:C.muted, marginBottom:"2rem", lineHeight:1.8 }}>Technologies and concepts I reach for every day.</p>
        <div className="rv d3" style={{ display:"flex", gap:"0.4rem", marginBottom:"2.5rem" }}>
          {[["bars","Proficiency Bars"],["tags","Tech Tags"],["radar","Radar Chart"]].map(([k,l]) => (
            <button key={k} onClick={()=>setTab(k)} style={{
              padding:"0.45rem 1.3rem", borderRadius:100, cursor:"pointer",
              fontSize:"0.78rem", fontWeight:600, fontFamily:"'Syne',sans-serif",
              border: tab===k ? "none" : `1px solid rgba(124,58,237,0.18)`,
              background: tab===k ? C.v : "transparent",
              color: tab===k ? "#fff" : C.muted, transition:"all 0.2s",
            }}>{l}</button>
          ))}
        </div>
        {tab === "bars" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 4rem" }} className="grid2 skill-bar-grid">
            {SKILL_LEVELS.map(s => <SkillBar key={s.name} {...s}/>)}
          </div>
        )}
        {tab === "tags" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.2rem" }}>
            {SKILL_GROUPS.map((s, i) => (
              <div key={s.label} style={{
                background:C.paper, border:`1px solid rgba(124,58,237,0.08)`, borderRadius:14, padding:"1.5rem",
                animation:`tagIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s both`,
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1rem" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:C.vPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>{s.icon}</div>
                  <div style={{ fontSize:"0.9rem", fontWeight:700, color:C.ink }}>{s.label}</div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {s.items.map(t => <span key={t} className="chip" style={{fontSize:"0.74rem"}}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "radar" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" }} className="grid2">
            <SkillRadar />
            <div>
              {[
                { label:"Backend",  val:90, col:"#2563EB" },
                { label:"DSA / CP", val:92, col:"#0EA5E9" },
                { label:"AI / ML",  val:80, col:"#0EA5E9" },
                { label:"Databases",val:85, col:"#10B981" },
                { label:"DevOps",   val:75, col:"#F59E0B" },
                { label:"Frontend", val:72, col:"#EF4444" },
              ].map(s => (
                <div key={s.label} style={{ marginBottom:"1rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.35rem" }}>
                    <span style={{ fontSize:"0.82rem", fontWeight:700, color:C.ink }}>{s.label}</span>
                    <span className="mono" style={{ fontSize:"0.72rem", color:s.col, fontWeight:700 }}>{s.val}%</span>
                  </div>
                  <div style={{ height:6, background:"rgba(124,58,237,0.08)", borderRadius:3 }}>
                    <div style={{ height:"100%", width:`${s.val}%`, background:`linear-gradient(90deg,${s.col},${s.col}88)`, borderRadius:3, transition:"width 1s ease" }}/>
                  </div>
                </div>
              ))}
              <p style={{ fontSize:"0.78rem", color:C.muted, marginTop:"1.5rem", lineHeight:1.7, fontStyle:"italic" }}>
                Ratings reflect hands-on project experience, not just course completion.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────── ACHIEVEMENTS ─────────────── */
const ACHIEVEMENTS = [
  { icon:"🏆", title:"Dean's Excellence Award",  desc:"Received across multiple semesters for maintaining a 9.0+ CGPA at Manipal University Jaipur.", col:"#F59E0B" },
  { icon:"🔥", title:"900+ DSA Problems",        desc:"Consistent problem solving on LeetCode, Codeforces, and other competitive platforms.", col:C.v },
  { icon:"⚡", title:"Top 0.3% on LeetCode",    desc:"Ranked globally in the top 0.3% of all LeetCode users worldwide through daily practice.", col:"#0EA5E9" },
  { icon:"🚀", title:"MUJHackX Round 2",         desc:"Qualified for Round 2 among 1300+ participants at MUJHackX at Manipal University Jaipur.", col:"#10B981" },
];

function Achievements() {
  return (
    <section id="achievements" style={{ padding:"8rem 4rem", background:C.bg2 }} className="sec-pad">
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Achievements
        </div>
        <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink, marginBottom:"0.7rem" }}>
          Milestones & <span className="grad">recognition</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.95rem", color:C.muted, marginBottom:"3rem", lineHeight:1.8 }}>Consistent performance across academics, competitive programming, and hackathons.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.3rem" }}>
          {ACHIEVEMENTS.map((a,i) => (
            <div key={a.title} className={`rv d${i+1}`} style={{
              background:C.paper, border:`1px solid rgba(124,58,237,0.08)`, borderRadius:16, padding:"2rem",
              position:"relative", overflow:"hidden", transition:"transform 0.25s, box-shadow 0.25s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 20px 56px ${a.col}22`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
            >
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:a.col, borderRadius:"16px 16px 0 0" }}/>
              <div style={{ fontSize:"2.4rem", marginBottom:"1rem" }}>{a.icon}</div>
              <div style={{ fontSize:"1rem", fontWeight:800, color:C.ink, marginBottom:"0.5rem" }}>{a.title}</div>
              <div style={{ fontSize:"0.84rem", color:C.muted, lineHeight:1.75 }}>{a.desc}</div>
            </div>
          ))}
        </div>

        {/* LeetCode stat card */}
        <div className="rv d5" style={{ marginTop:"2rem", background:C.ink, borderRadius:18, padding:"2.5rem", display:"flex", alignItems:"center", gap:"3rem", flexWrap:"wrap" }}>
          <div>
            <div className="mono" style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.4)", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"0.6rem" }}>LeetCode Stats</div>
            <div className="serif" style={{ fontSize:"3.5rem", fontWeight:400, color:"#fff", letterSpacing:"-2px", fontStyle:"italic" }}>Top <span style={{color:C.vLight}}>0.3%</span></div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.85rem", marginTop:"0.3rem" }}>Global Rank · 900+ Problems</div>
          </div>
          <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap" }}>
            {[["900+","Problems Solved"],["Top 0.3%","Global Rank"],["All Levels","Easy · Med · Hard"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div className="mono" style={{ fontSize:"1.3rem", color:C.vLight, fontWeight:500 }}>{n}</div>
                <div style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.4)", marginTop:"0.2rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── BLOG ─────────────── */
const BLOGS = [
  {
    num: "01",
    title: "Building a Real-Time Stock Trading Backend with Redis & BullMQ",
    excerpt: "A deep-dive into designing a high-performance trading system — how Redis Sorted Sets power sub-50ms leaderboards, how BullMQ handles repeatable price jobs, and how MySQL row-level locking keeps concurrent trades ACID-safe.",
    tags: ["Node.js", "Redis", "BullMQ", "System Design"],
    date: "Jan 2025",
    readTime: "8 min read",
    col: "#2563EB",
    href: "#",
  },
  {
    num: "02",
    title: "RAG from Scratch: Building an AI Discord Bot with LangChain & FAISS",
    excerpt: "How I built a retrieval-augmented generation bot that ingests PDFs and web pages, creates per-guild persistent vector stores, and answers contextual questions using Groq's Llama 3.3 — all inside Discord.",
    tags: ["LangChain", "FAISS", "RAG", "Python", "Groq"],
    date: "Feb 2025",
    readTime: "11 min read",
    col: "#0EA5E9",
    href: "#",
  },
];

function Blog() {
  return (
    <section id="blog" className="sec-pad sec-transition" style={{ padding:"8rem 4rem", background:C.bg2 }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Writing
        </div>
        <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink, marginBottom:"0.7rem" }}>
          Blog & <span className="grad">Articles</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.95rem", color:C.muted, marginBottom:"3rem", lineHeight:1.8 }}>
          Writing about things I build — the problems, the design decisions, and what I learned.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }} className="grid2">
          {BLOGS.map((b, i) => (
            <a key={b.num} href={b.href} className={`rv d${i+1}`} style={{
              display:"block", textDecoration:"none",
              background:C.paper, border:`1px solid rgba(124,58,237,0.1)`,
              borderRadius:16, padding:"2rem", position:"relative", overflow:"hidden",
              transition:"transform 0.25s, box-shadow 0.25s",
              boxShadow:"0 2px 20px rgba(124,58,237,0.05)",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 20px 56px ${b.col}22`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 20px rgba(124,58,237,0.05)";}}
            >
              {/* Top accent line */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${b.col},${b.col}88)`, borderRadius:"16px 16px 0 0" }}/>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.2rem" }}>
                <span className="mono" style={{ fontSize:"0.65rem", color:C.muted }}>/{b.num}</span>
                <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
                  <span className="mono" style={{ fontSize:"0.62rem", color:C.muted }}>{b.date}</span>
                  <span style={{ width:3, height:3, borderRadius:"50%", background:C.muted, display:"inline-block" }}/>
                  <span className="mono" style={{ fontSize:"0.62rem", color:b.col, fontWeight:700 }}>{b.readTime}</span>
                </div>
              </div>
              <h3 style={{ fontSize:"1rem", fontWeight:800, color:C.ink, lineHeight:1.4, marginBottom:"0.8rem" }}>{b.title}</h3>
              <p style={{ fontSize:"0.82rem", color:C.muted, lineHeight:1.75, marginBottom:"1.2rem" }}>{b.excerpt}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginBottom:"1.2rem" }}>
                {b.tags.map(t => <span key={t} className="chip" style={{ fontSize:"0.68rem" }}>{t}</span>)}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.8rem", fontWeight:700, color:b.col }}>
                Read article
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TIMELINE ─────────────── */
const TIMELINE_EVENTS = [
  { year:"2023", month:"Aug", icon:"🎓", title:"Started B.Tech CSE", sub:"Manipal University Jaipur", desc:"Began Computer Science degree. Immediately dove into DSA and competitive programming.", col:"#2563EB" },
  { year:"2023", month:"Dec", icon:"🏆", title:"TLE Eliminators — CP Level 1", sub:"Competitive Programming", desc:"Completed Level 1 of TLE Eliminators' competitive programming course. Foundation in C++ and algorithmic thinking.", col:"#0EA5E9" },
  { year:"2024", month:"Mar", icon:"⭐", title:"Dean's Excellence Award — Sem 1", sub:"9.05 CGPA", desc:"Awarded Dean's Excellence for outstanding academic performance in the first semester.", col:"#F59E0B" },
  { year:"2024", month:"Jun", icon:"📜", title:"Oracle DB & GeeksforGeeks OOP", sub:"Certifications", desc:"Completed Oracle Database Design & Foundations and OOP in Java from GeeksforGeeks.", col:"#0EA5E9" },
  { year:"2024", month:"Aug", icon:"🔥", title:"500+ DSA Problems Solved", sub:"LeetCode · Codeforces", desc:"Hit the 500 problem milestone. Moved into medium-hard difficulty consistently.", col:"#10B981" },
  { year:"2024", month:"Nov", icon:"🥋", title:"TLE Eliminators — CP Level 2 & 3", sub:"Advanced Algorithms", desc:"Completed Levels 2 & 3 covering advanced graph theory, segment trees, and DP optimizations.", col:"#2563EB" },
  { year:"2025", month:"Jan", icon:"🎩", title:"Red Hat Sysadmin I & II + NPTEL DAA", sub:"Dual Certifications", desc:"Earned Red Hat System Administration I & II and NPTEL's Design and Analysis of Algorithms certificate.", col:"#C53030" },
  { year:"2025", month:"Feb", icon:"🚀", title:"MUJHackX Round 2 Qualifier", sub:"1300+ participants", desc:"Qualified for Round 2 at MUJHackX, competing among 1300+ participants from across the university.", col:"#0EA5E9" },
  { year:"2025", month:"Mar", icon:"⚡", title:"LeetCode Top 0.3% Globally", sub:"Beats 99.7%", desc:"Surpassed 900+ problems. Ranked in the top 0.3% of all LeetCode users worldwide.", col:"#FFA116" },
  { year:"2025", month:"Jun", icon:"💼", title:"Web Dev Intern — Indavis Lifesciences", sub:"Haridwar · On-site", desc:"First professional internship. Maintained and updated the company website under real business constraints.", col:"#0EA5E9" },
];

function Timeline() {
  return (
    <section id="timeline" className="sec-pad sec-transition" style={{ padding:"8rem 4rem", background:C.bg }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Journey
        </div>
        <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink, marginBottom:"0.7rem" }}>
          My <span className="grad">timeline</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.95rem", color:C.muted, marginBottom:"3.5rem", lineHeight:1.8 }}>
          From day one at MUJ to where I am now — every milestone that shaped me.
        </p>

        <div style={{ position:"relative" }}>
          {/* Central line */}
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, background:"linear-gradient(to bottom, transparent, rgba(124,58,237,0.3) 5%, rgba(124,58,237,0.3) 95%, transparent)", transform:"translateX(-50%)" }} className="hide-mob"/>
          {/* Mobile line */}
          <div style={{ position:"absolute", left:20, top:0, bottom:0, width:2, background:"rgba(124,58,237,0.2)" }} className="show-mob"/>

          {TIMELINE_EVENTS.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`rv d${(i % 5) + 1}`} style={{
                display:"flex", justifyContent: isLeft ? "flex-start" : "flex-end",
                marginBottom:"2rem", position:"relative",
              }}>
                {/* Dot on line */}
                <div style={{
                  position:"absolute", left:"calc(50% - 18px)", top:"1.2rem",
                  width:36, height:36, borderRadius:"50%",
                  background:`linear-gradient(135deg,${ev.col},${ev.col}bb)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"1rem", zIndex:2,
                  boxShadow:`0 0 0 4px var(--bg), 0 0 0 6px ${ev.col}44`,
                }} className="hide-mob">{ev.icon}</div>
                {/* Mobile dot */}
                <div style={{
                  position:"absolute", left:9, top:"1.2rem",
                  width:24, height:24, borderRadius:"50%",
                  background:`linear-gradient(135deg,${ev.col},${ev.col}bb)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"0.7rem", zIndex:2,
                  boxShadow:`0 0 0 3px var(--bg), 0 0 0 5px ${ev.col}44`,
                }} className="show-mob">{ev.icon}</div>

                {/* Card */}
                <div style={{
                  width:"45%", background:C.paper,
                  border:`1px solid rgba(124,58,237,0.1)`,
                  borderRadius:14, padding:"1.3rem 1.5rem",
                  boxShadow:"0 2px 16px rgba(124,58,237,0.06)",
                  marginLeft: isLeft ? "0" : "auto",
                  borderLeft: isLeft ? `3px solid ${ev.col}` : "1px solid rgba(124,58,237,0.1)",
                  borderRight: !isLeft ? `3px solid ${ev.col}` : "1px solid rgba(124,58,237,0.1)",
                  transition:"transform 0.25s, box-shadow 0.25s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow=`0 8px 32px ${ev.col}22`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 16px rgba(124,58,237,0.06)";}}
                  className="hide-mob"
                >
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.5rem" }}>
                    <div style={{ fontSize:"0.88rem", fontWeight:800, color:C.ink, lineHeight:1.3 }}>{ev.title}</div>
                    <span className="mono" style={{ fontSize:"0.6rem", color:ev.col, background:`${ev.col}15`, padding:"0.18rem 0.55rem", borderRadius:100, fontWeight:700, whiteSpace:"nowrap", marginLeft:"0.5rem", flexShrink:0 }}>{ev.month} {ev.year}</span>
                  </div>
                  <div style={{ fontSize:"0.75rem", color:ev.col, fontWeight:600, marginBottom:"0.5rem" }}>{ev.sub}</div>
                  <div style={{ fontSize:"0.78rem", color:C.muted, lineHeight:1.65 }}>{ev.desc}</div>
                </div>

                {/* Mobile card */}
                <div style={{
                  marginLeft:"2.8rem", flex:1,
                  background:C.paper, border:`1px solid rgba(124,58,237,0.1)`,
                  borderLeft:`3px solid ${ev.col}`,
                  borderRadius:12, padding:"1rem 1.2rem",
                  boxShadow:"0 2px 12px rgba(124,58,237,0.05)",
                }} className="show-mob">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.3rem" }}>
                    <div style={{ fontSize:"0.85rem", fontWeight:800, color:C.ink }}>{ev.title}</div>
                    <span className="mono" style={{ fontSize:"0.58rem", color:ev.col, background:`${ev.col}15`, padding:"0.15rem 0.45rem", borderRadius:100, fontWeight:700, whiteSpace:"nowrap", marginLeft:"0.4rem" }}>{ev.month} '{ev.year.slice(2)}</span>
                  </div>
                  <div style={{ fontSize:"0.72rem", color:ev.col, fontWeight:600, marginBottom:"0.35rem" }}>{ev.sub}</div>
                  <div style={{ fontSize:"0.76rem", color:C.muted, lineHeight:1.6 }}>{ev.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CURRENTLY LEARNING ─────────────── */
const LEARNING = [
  { icon:"🐹", name:"Go (Golang)", desc:"Building high-concurrency backend services. Focusing on goroutines, channels, and building REST APIs with Gin.", progress:40, col:"#00ACD7", status:"Active" },
  { icon:"☸️", name:"Kubernetes", desc:"Container orchestration, deployments, services, and scaling stateful applications. Following CKA prep path.", progress:30, col:"#326CE5", status:"Active" },
  { icon:"🦀", name:"Rust", desc:"Systems programming, memory safety, and ownership model. Working through The Book + small CLI tools.", progress:20, col:"#CE422B", status:"Started" },
  { icon:"📡", name:"gRPC & Protobuf", desc:"High-performance inter-service communication for microservices. Building on top of my existing Node.js backend experience.", progress:45, col:"#4285F4", status:"Active" },
  { icon:"🔭", name:"Apache Kafka", desc:"Event-driven architecture, distributed messaging, and stream processing for large-scale backend pipelines.", progress:25, col:"#000000", status:"Started" },
  { icon:"🧠", name:"LLM Fine-tuning", desc:"Supervised fine-tuning of open-source models (Mistral/Llama) for domain-specific RAG applications.", progress:35, col:"#10B981", status:"Active" },
];

function CurrentlyLearning() {
  return (
    <section id="learning" className="sec-pad sec-transition" style={{ padding:"8rem 4rem", background:C.bg2, position:"relative", overflow:"hidden" }}>
      {/* Subtle animated bg orb */}
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)`, pointerEvents:"none", animation:"floatUp 12s ease-in-out infinite" }}/>
      <div style={{ maxWidth:1060, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.v, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.v, display:"inline-block" }}/>Currently Learning
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"0.7rem" }}>
          <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:400, letterSpacing:"-1.5px", fontStyle:"italic", color:C.ink }}>
            What I'm <span className="grad">exploring</span> now
          </h2>
          <div className="rv d2" style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.4rem 1rem", background:C.vPale, border:"1px solid rgba(124,58,237,0.2)", borderRadius:100, animation:"learnPulse 2.5s ease-in-out infinite" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", animation:"pulse2 1.5s ease-in-out infinite" }}/>
            <span className="mono" style={{ fontSize:"0.65rem", color:C.v, fontWeight:700, letterSpacing:"1px" }}>LEARNING IN PROGRESS</span>
          </div>
        </div>
        <p className="rv d2" style={{ fontSize:"0.95rem", color:C.muted, marginBottom:"3rem", lineHeight:1.8 }}>
          Going deeper into backend infrastructure, systems programming, and advanced AI — the stack of a senior backend engineer.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1.3rem" }}>
          {LEARNING.map((item, i) => (
            <div key={item.name} className={`rv d${(i % 4) + 1}`} style={{
              background:C.paper, border:`1px solid rgba(124,58,237,0.1)`,
              borderRadius:16, padding:"1.6rem",
              boxShadow:"0 2px 20px rgba(124,58,237,0.05)",
              transition:"transform 0.25s, box-shadow 0.25s",
              position:"relative", overflow:"hidden",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 16px 48px ${item.col}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 20px rgba(124,58,237,0.05)";}}
            >
              {/* Status badge */}
              <div style={{
                position:"absolute", top:"1rem", right:"1rem",
                fontSize:"0.58rem", padding:"0.15rem 0.55rem", borderRadius:100,
                background: item.status === "Active" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                color: item.status === "Active" ? "#059669" : "#B45309",
                fontFamily:"'JetBrains Mono',monospace", fontWeight:700,
              }}>{item.status}</div>

              <div style={{ display:"flex", gap:"0.9rem", alignItems:"flex-start", marginBottom:"1rem" }}>
                <div style={{
                  width:44, height:44, borderRadius:12,
                  background:`${item.col}15`, border:`1.5px solid ${item.col}30`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"1.4rem", flexShrink:0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize:"0.95rem", fontWeight:800, color:C.ink }}>{item.name}</div>
                  <div className="mono" style={{ fontSize:"0.62rem", color:item.col, marginTop:"0.15rem", fontWeight:600 }}>{item.progress}% through</div>
                </div>
              </div>

              <p style={{ fontSize:"0.8rem", color:C.muted, lineHeight:1.7, marginBottom:"1.1rem" }}>{item.desc}</p>

              {/* Progress bar */}
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.4rem" }}>
                  <span style={{ fontSize:"0.68rem", color:C.muted, fontFamily:"'JetBrains Mono',monospace" }}>Progress</span>
                  <span style={{ fontSize:"0.68rem", color:item.col, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>{item.progress}%</span>
                </div>
                <div style={{ height:5, background:"rgba(124,58,237,0.08)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{
                    height:"100%", borderRadius:3,
                    background:`linear-gradient(90deg,${item.col},${item.col}aa)`,
                    width:`${item.progress}%`,
                    transition:"width 1.2s cubic-bezier(0.16,1,0.3,1)",
                  }}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="rv d5" style={{ marginTop:"2.5rem", padding:"1.2rem 1.8rem", background:C.vPale, border:"1px solid rgba(124,58,237,0.15)", borderRadius:12, display:"flex", alignItems:"center", gap:"1rem" }}>
          <span style={{ fontSize:"1.3rem" }}>💡</span>
          <span style={{ fontSize:"0.85rem", color:C.inkMid, lineHeight:1.6 }}>
            <strong>Goal for 2025–26:</strong> Ship production-grade services in Go, get comfortable with Kubernetes deployments, and contribute to an open-source backend project.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTACT ─────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("armanphaugat20@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const LINKS = [
    { icon:"✉️", label:"Email",    value:"armanphaugat20@gmail.com", href:"mailto:armanphaugat20@gmail.com" },
    { icon:"📱", label:"Phone",    value:"+91-9306115772",            href:"tel:+919306115772" },
    { icon:"🐙", label:"GitHub",   value:"github.com/armanphaugat",       href:"https://github.com/armanphaugat" },
    { icon:"💼", label:"LinkedIn", value:"linkedin.com/in/armanphaugat05", href:"https://www.linkedin.com/in/armanphaugat05/" },
    { icon:"🧩", label:"LeetCode", value:"Top 0.3% · armanphaugat20",     href:"https://leetcode.com/u/armanphaugat20" },
  ];
  return (
    <section id="contact" style={{ padding:"9rem 4rem", background:`linear-gradient(160deg,${C.vDeep} 0%,#1e0d6e 50%,#0D0820 100%)`, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-150, right:-150, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(232,121,249,0.15) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-100, left:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1060, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="rv mono" style={{ fontSize:"0.68rem", color:C.vLight, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ width:22, height:1, background:C.vLight, display:"inline-block" }}/>Get In Touch
        </div>
        <h2 className="rv d1 serif" style={{ fontSize:"clamp(2.8rem,6vw,5rem)", fontWeight:400, letterSpacing:"-2px", color:"#fff", marginBottom:"0.8rem", lineHeight:1.05, fontStyle:"italic" }}>
          Let's <span style={{color:C.vLight}}>connect</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"1rem", color:"rgba(255,255,255,0.55)", maxWidth:480, marginBottom:"3.5rem", lineHeight:1.85 }}>
          Whether it's a summer internship, a project collab, or a conversation about tech — reach out and I'll get back fast.
        </p>
        {/* Email CTA with copy */}
        <div className="rv d3 contact-email-row" style={{ display:"flex", gap:"1rem", alignItems:"center", marginBottom:"3rem", flexWrap:"wrap" }}>
          <div style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"1rem 1.5rem", flex:1, minWidth:260 }}>
            <div className="mono" style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"0.2rem" }}>Primary Email</div>
            <div style={{ fontSize:"1rem", color:"#fff", fontWeight:600 }}>armanphaugat20@gmail.com</div>
          </div>
          <button onClick={copy} style={{
            padding:"1rem 1.8rem", background: copied ? "#10B981" : C.v, color:"#fff",
            border:"none", borderRadius:10, cursor:"pointer", fontSize:"0.85rem", fontWeight:700,
            fontFamily:"'Syne',sans-serif", transition:"background 0.3s", whiteSpace:"nowrap",
          }}>{copied ? "✓ Copied!" : "Copy Email"}</button>
          <a href="mailto:armanphaugat20@gmail.com" style={{
            padding:"1rem 1.8rem", background:"rgba(255,255,255,0.1)", color:"#fff",
            border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, textDecoration:"none",
            fontSize:"0.85rem", fontWeight:700, whiteSpace:"nowrap", transition:"background 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
          >Open Mail App →</a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem" }}>
          {LINKS.map((l,i) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className={`rv d${i+1}`}
              style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1.2rem 1.4rem", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, textDecoration:"none", color:"#fff", transition:"background 0.2s, border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,58,237,0.2)";e.currentTarget.style.borderColor="rgba(124,58,237,0.4)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.transform="";}}
            >
              <div style={{ fontSize:"1.3rem", flexShrink:0 }}>{l.icon}</div>
              <div>
                <div className="mono" style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:"0.1rem" }}>{l.label}</div>
                <div style={{ fontSize:"0.82rem", fontWeight:600, wordBreak:"break-all" }}>{l.value}</div>
              </div>
            </a>
          ))}
        </div>
        {/* Availability */}
        <div className="rv d5" style={{ marginTop:"3rem" }}>
          <AvailabilityWidget />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer style={{ background:"#080414", borderTop:"1px solid rgba(124,58,237,0.12)" }}>
      {/* Main footer body */}
      <div style={{ maxWidth:1060, margin:"0 auto", padding:"3rem 2rem 2rem", display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:"3rem" }} className="footer-grid">
        {/* Brand col */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1rem" }}>
            <div style={{ width:34, height:34, borderRadius:9, background:`linear-gradient(135deg,${C.v},${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#fff", fontSize:"0.8rem", fontWeight:800 }}>AP</span>
            </div>
            <span style={{ fontSize:"1rem", fontWeight:800, color:"#fff" }}>Arman Phaugat</span>
          </div>
          <p style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.35)", lineHeight:1.8, maxWidth:280, marginBottom:"1.2rem" }}>
            Backend & AI/ML Engineer · 3rd Year B.Tech CSE · Manipal University Jaipur · Building fast, scalable systems.
          </p>
          <div style={{ display:"flex", gap:"0.7rem" }}>
            {[
              { href:"https://github.com/armanphaugat", label:"GitHub", svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> },
              { href:"https://www.linkedin.com/in/armanphaugat05/", label:"LinkedIn", svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { href:"https://leetcode.com/u/armanphaugat20", label:"LeetCode", svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label} style={{
                width:34, height:34, borderRadius:8,
                background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background 0.2s, transform 0.2s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,58,237,0.3)";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.transform="";}}
              >{s.svg}</a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize:"0.7rem", fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"2px", fontFamily:"'JetBrains Mono',monospace", marginBottom:"1rem" }}>Navigate</div>
          {["About","Experience","Projects","Skills","Blog","Timeline","Contact"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} style={{ display:"block", fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", textDecoration:"none", marginBottom:"0.55rem", transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#60A5FA"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.45)"}
            >{s}</a>
          ))}
        </div>

        {/* Status & fun fact */}
        <div>
          <div style={{ fontSize:"0.7rem", fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"2px", fontFamily:"'JetBrains Mono',monospace", marginBottom:"1rem" }}>Status</div>
          <div className="status-available" style={{ marginBottom:"1rem", width:"fit-content" }}>
            <div className="status-ping"/>
            <span style={{ fontSize:"0.68rem", color:"#10B981", fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>OPEN TO WORK</span>
          </div>
          <div style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.35)", lineHeight:1.7, marginBottom:"1.2rem" }}>
            Available for internships & projects.<br/>Backend · AI/ML · Full Stack
          </div>
          <div style={{ fontSize:"0.7rem", fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"2px", fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.6rem" }}>Dev thought</div>
          <FunFactsTicker />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"1.2rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem", maxWidth:1060, margin:"0 auto" }}>
        <span className="mono" style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.18)" }}>© 2025 Arman Phaugat · All rights reserved</span>
        <span className="mono" style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.18)" }}>Built with React · Press <span style={{color:"rgba(124,58,237,0.7)"}}>?</span> for keyboard shortcuts</span>
      </div>
    </footer>
  );
}

/* ─────────────── APP ─────────────── */
export default function App() {
  const [dark, setDark] = useState(false);
  useReveal();
  useSectionTransitions();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <>
      <style>{G}</style>
      {/* Global overlays & utilities */}
      <ScrollProgressBar />
      <SpotlightGlow />
      <MouseTrail />
      <KonamiConfetti />
      <KeyboardShortcuts />
      <ToastContainer />
      <FloatingConnectCTA />
      <Cursor />
      <SectionProgress />
      <BackToTop />
      <Nav dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Resume />
        <Projects />
        <Skills />
        <Achievements />
        <Blog />
        <Timeline />
        <CurrentlyLearning />
        <Contact />
      </main>
      <Footer />
    </>
  );
}