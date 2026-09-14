import { useState, useEffect, useRef } from "react";
import {
  Building2, RefreshCw, Brain, UploadCloud, Globe, Monitor,
  ShieldCheck, Cloud, Terminal, Github,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════
   DESIGN SYSTEM — "FIELD NOTES" THEME
   Warm paper (#F9F7F7) · pale slate band (#DBE2EF) · deep navy ink
   (#112D4E) · single Color Hunt accent blue (#3F72AF) for links,
   active states and one hero flourish · Space Grotesk display /
   Inter body / JetBrains Mono data · restrained hand-drawn accents
   ════════════════════════════════════════════════════════════ */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Michroma&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  :root{
    --paper:    #f9f7f7;
    --paper-2:  #dbe2ef;
    --card:     #ffffff;
    --ink:      #112d4e;
    --ink-80:   rgba(17,45,78,0.82);
    --ink-55:   rgba(17,45,78,0.58);
    --ink-35:   rgba(17,45,78,0.38);
    --line:     rgba(17,45,78,0.18);
    --dark:     #112d4e;
    --dark-2:   #0d2338;
    --accent:      #3f72af;
    --accent-dark: #2f5c92;
    --accent-35:   rgba(63,114,175,0.35);
  }

  *,*::before,*::after{ box-sizing:border-box; margin:0; padding:0; }
  html{ scroll-behavior:smooth; }
  body{
    background:var(--paper);
    color:var(--ink);
    font-family:'Inter',sans-serif;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
    background-image:
      radial-gradient(rgba(17,45,78,0.05) 1px, transparent 1px);
    background-size:22px 22px;
  }
  ::selection{ background:var(--ink); color:var(--paper); }
  ::-webkit-scrollbar{ width:10px; }
  ::-webkit-scrollbar-track{ background:var(--paper); }
  ::-webkit-scrollbar-thumb{ background:var(--ink-35); border-radius:8px; }
  a:focus-visible, button:focus-visible{ outline:2px solid var(--ink); outline-offset:3px; border-radius:2px; }

  @media (prefers-reduced-motion: reduce){
    *,*::before,*::after{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; scroll-behavior:auto !important; }
  }

  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
  @keyframes menu-drop { from{opacity:0; transform:translateY(-6px)} to{opacity:1; transform:translateY(0)} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes wiggle { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
  @keyframes bob { 0%,100%{transform:translateY(0) rotate(var(--r,0deg))} 50%{transform:translateY(-5px) rotate(var(--r,0deg))} }

  .reveal{ opacity:0; transform:translateY(16px); transition:opacity .55s ease, transform .55s cubic-bezier(.2,.8,.2,1); }
  .reveal.visible{ opacity:1; transform:translateY(0); }
  .reveal-d1{ transition-delay:.06s; } .reveal-d2{ transition-delay:.13s; }
  .reveal-d3{ transition-delay:.20s; } .reveal-d4{ transition-delay:.27s; }

  h1,h2,h3,h4{ font-family:'Space Grotesk',sans-serif; font-weight:600; letter-spacing:-0.015em; }
  .brand{ font-family:'Michroma',sans-serif; letter-spacing:-0.01em; }

  /* hand-scribbled sticky-note label, replaces the old tracked eyebrow */
  .tag{
    display:inline-flex; align-items:center; gap:.4rem;
    font-family:'Inter',sans-serif; font-weight:500; font-size:.92rem;
    color:var(--ink); background:var(--card);
    border:1.5px solid var(--ink); border-radius:7px;
    padding:.3rem .85rem .35rem; transform:rotate(-.6deg);
    box-shadow:2px 2px 0 var(--ink);
  }

  .doodle-box{
    background:var(--card); border:1.5px solid var(--ink);
    border-radius: 14px 5px 14px 5px/5px 14px 5px 14px;
    box-shadow:3px 3px 0 0 var(--ink);
    transition:transform .18s ease, box-shadow .18s ease;
  }
  .doodle-box.alt{ border-radius: 5px 14px 5px 14px/14px 5px 14px 5px; }
  .doodle-box.round{ border-radius: 26px; }
  .doodle-hover:hover{ transform:translate(-2px,-2px); box-shadow:5px 5px 0 0 var(--ink); }
  .doodle-box-dark{ background:var(--dark); border:1.5px solid var(--ink); box-shadow:3px 3px 0 0 var(--ink-35); }

  .btn{
    display:inline-flex; align-items:center; gap:.55rem;
    font-family:'Inter',sans-serif; font-weight:500;
    font-size:1.02rem; letter-spacing:.01em;
    padding:.75rem 1.5rem; border-radius:999px;
    border:1.5px solid var(--ink);
    cursor:pointer; text-decoration:none; color:var(--ink);
    background:var(--card);
    box-shadow:3px 3px 0 0 var(--ink);
    transition:transform .15s ease, box-shadow .15s ease;
  }
  .btn:hover{ transform:translate(-2px,-2px); box-shadow:5px 5px 0 0 var(--ink); }
  .btn:active{ transform:translate(1px,1px); box-shadow:1px 1px 0 0 var(--ink); }
  .btn-solid{ background:var(--accent); color:#fff; border-color:var(--accent); box-shadow:3px 3px 0 0 var(--accent-35); }
  .btn-solid:hover{ background:var(--accent-dark); border-color:var(--accent-dark); box-shadow:5px 5px 0 0 var(--accent-35); }
  .btn-light{ border-color:rgba(255,255,255,0.55); color:#fff; background:transparent; box-shadow:3px 3px 0 0 rgba(255,255,255,0.35); }
  .btn-light:hover{ box-shadow:5px 5px 0 0 rgba(255,255,255,0.35); }
  .btn-light-solid{ background:#fff; color:var(--ink); border-color:#fff; box-shadow:3px 3px 0 0 rgba(255,255,255,0.35); }

  .pill{
    display:inline-flex; align-items:center; gap:.4rem;
    font-family:'Inter',sans-serif; font-weight:500; font-size:.88rem;
    padding:.4rem 1rem; border-radius:999px; border:1.5px solid var(--ink);
    color:var(--ink-80); background:var(--card); white-space:nowrap;
  }
  .pill-dark{ background:var(--accent); color:#fff; border-color:var(--accent); }

  .chip{
    font-family:'JetBrains Mono',monospace; font-size:.68rem; font-weight:500;
    padding:.3rem .65rem; border:1.5px dashed var(--ink); color:var(--ink-80);
    border-radius:6px;
  }

  .nav-link{
    font-family:'Inter',sans-serif; font-weight:500; font-size:.98rem; color:var(--ink-80);
    text-decoration:none; position:relative; padding:.3rem 0;
  }
  .nav-link::after{
    content:''; position:absolute; left:-2px; right:-2px; bottom:-3px; height:6px;
    background:transparent; border-bottom:3px solid var(--ink);
    border-radius:0 0 40% 40%/0 0 100% 100%;
    transform:scaleX(0); transform-origin:left; transition:transform .22s ease;
  }
  .nav-link:hover{ color:var(--ink); }
  .nav-link:hover::after{ transform:scaleX(1); }

  .mob-nav-link{
    font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.5rem;
    color:var(--ink); text-decoration:none; display:block; padding:1rem 1.4rem;
    border-bottom:2px dashed var(--line);
  }

  .mobile-menu{
    display:none; position:absolute; top:100%; left:0; right:0;
    background:var(--paper); border-bottom:1.5px solid var(--ink);
    animation:menu-drop .2s ease; z-index:490;
  }
  .mobile-menu.open{ display:block; }

  .hamburger{
    display:none; flex-direction:column; justify-content:center; align-items:center;
    gap:5px; width:42px; height:42px; background:var(--card);
    border:1.5px solid var(--ink); cursor:pointer; padding:0; border-radius:12px 6px 12px 6px;
  }
  .hamburger svg{ width:18px; height:14px; }

  .marquee-strip{ background:var(--dark); overflow:hidden; padding:.9rem 0; border-top:1.5px solid var(--ink); border-bottom:1.5px solid var(--ink); }
  .marquee-track{ display:inline-flex; white-space:nowrap; animation:marquee 38s linear infinite; align-items:center; }

  @media (max-width:768px){
    .hide-mob{ display:none !important; }
    .col-mob-1{ grid-template-columns:1fr !important; }
    .hamburger{ display:flex; }
    .hero-word{ font-size:8.2vw !important; line-height:1.4 !important; }
    .scatter{ display:none !important; }
  }
`;

/* ─────────────── DOODLE ICON SET (hand-drawn line paths) ─────────────── */
const DOODLE_PATHS = {
  star: "M12 2 L14.4 9 L21.6 9.3 L15.9 13.9 L18 21 L12 16.8 L6 21 L8.1 13.9 L2.4 9.3 L9.6 9 Z",
  spark: "M12 3c.5 3.1 1 5.7 3.2 6.9 2.2 1.2 5 .9 6.8 1.1-2.8.6-5.3 1.4-6.7 3.3-1.4 1.9-1.6 4.6-2.3 6.7-.6-3-1-5.7-3-7.3-1.9-1.6-4.8-1.7-6.8-2.2 2.9-.4 5.3-1 6.8-2.7 1.4-1.6 1.6-3.9 2-5.8Z",
  cloud: "M7.3 17.4c-2.4 0-4.3-1.8-4.3-4 0-2 1.6-3.7 3.6-4 .5-2.6 2.9-4.6 5.7-4.6 2.6 0 4.9 1.7 5.6 4.1.3-.1.6-.1.9-.1 2.2 0 4 1.7 4 3.9 0 2.2-1.8 3.9-4 3.9H7.3Z",
  bolt: "M13.6 2 4.4 14.2h6.2l-1.5 8L19.6 10h-6.3l1.3-8Z",
  arrow: "M3 13.3c4.6-7.2 13.3-7.6 17.4-1.7 M15 7l5.6 4.1-5.1 4.4",
  corner: "M7 17 L17 7 M9 7 H17 V15",
  heart: "M12 20.4S3.2 14.9 3.2 9.1C3.2 6.1 5.6 4.2 8.2 4.2c1.7 0 3.2.9 4 2.4.8-1.5 2.3-2.4 4-2.4 2.6 0 5 1.9 5 4.9 0 5.8-9.2 10.5-9.2 10.5Z",
  coffee: "M4.5 8h12.5v5.8a5 5 0 0 1-5 5H9.5a5 5 0 0 1-5-5V8Z M17 9.5h1.6a2.4 2.4 0 0 1 0 4.9H17 M7.3 4.3c0 1-1 1.1-1 2.1 M10.7 4.3c0 1-1 1.1-1 2.1",
  trophy: "M7.2 4h9.6v3.9a4.8 4.8 0 0 1-9.6 0V4Z M4.6 5.1h2.6v2.9a3 3 0 0 1-2.6-2.9Z M16.8 5.1h2.6a3 3 0 0 1-2.6 2.9V5.1Z M12 12.7v3 M9.1 19.7h5.8 M9.6 16.3h4.8l.5 3.4H9.1Z",
  rocket: "M12 2.2c2.4 2 3.8 5.4 3.4 10.1l-1.8 1.8-3.4.1-1.9-1.9C7.8 7.6 9.5 4.1 12 2.2Z M8.8 14.3 6.2 17l.6 2.9 2.9-.6 2.6-2.6 M14.4 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z M9.1 19.4c-1 1-2.9 1-4.4.5.5-1.3 1.4-2.4 2.4-2.9",
  scribbleCircle: "M12 3.6c3.9 0 8 2.5 8.3 6.9.3 4.5-3.9 8-8.3 8.2-4.5.2-8.8-2.9-8.8-7.7C3.2 6.4 7.5 3.6 12 3.6Z",
  wave: "M2 12c2-3.2 4-3.2 6 0s4 3.2 6 0 4-3.2 6 0",
  squiggle: "M1 6c3-4 6-4 9 0s6 4 9 0 6-4 9 0 6 4 9 0",
  underline: "M2 6c15-4 45-4 60 0s45 4 60 0",
  sun: "M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M18.4 5.6l-2.1 2.1 M7.7 16.3l-2.1 2.1 M12 8.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z",
};

function Doodle({ type, size = 24, style, strokeWidth = 1.7, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} fill="none">
      <path d={DOODLE_PATHS[type]} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Underline({ width = 130, height = 14, color = "var(--ink)", style }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 12" style={{ display: "block", ...style }} fill="none">
      <path d="M1 6c15-4 45-4 60 0s45 4 58-1" stroke={color} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

function SectionTag({ children, dark = false }) {
  return (
    <span className="tag" style={dark ? { background: "var(--dark)", color: "#fff", borderColor: "rgba(255,255,255,0.6)", boxShadow: "2px 2px 0 rgba(255,255,255,0.35)" } : undefined}>
      <Doodle type="spark" size={14} color="var(--accent)" />{children}
    </span>
  );
}

/* ─────────────── ROTATING STICKER BADGE ─────────────── */
function RotatingBadge({ text = "OPEN FOR INTERNSHIPS 2026", size = 130, dark = false }) {
  const full = `★ ${text} ★ ${text} `;
  const id = useRef(`badgepath-${Math.random().toString(36).slice(2)}`).current;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ animation: "spin 18s linear infinite" }}>
        <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
        <text fontSize="7.4" fill={dark ? "#fff" : "var(--ink)"} fontFamily="'Inter',sans-serif" letterSpacing="1">
          <textPath href={`#${id}`}>{full}</textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${dark ? "#fff" : "var(--ink)"}`, borderRadius: "50%", width: size * 0.52, height: size * 0.52, margin: "auto", background: dark ? "var(--dark)" : "var(--paper)" }}>
        <Doodle type="rocket" size={size * 0.24} color={dark ? "#fff" : "var(--ink)"} />
      </div>
    </div>
  );
}

/* ─────────────── RING (signature stat element, sketch style) ─────────────── */
function Ring({ pct, label, sub, size = 132, stroke = 4, dark = false }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const ink = dark ? "#fff" : "var(--ink)";
  const trk = dark ? "rgba(255,255,255,0.16)" : "rgba(20,19,15,0.1)";

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".85rem" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trk} strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={ink} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={vis ? offset : circ}
            style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(.2,.8,.2,1)" }}
          />
        </svg>
        <svg width={size} height={size} style={{ transform: "rotate(-84deg)", position: "absolute", inset: 0, opacity: .35 }}>
          <circle
            cx={size / 2} cy={size / 2} r={r - 1} fill="none"
            stroke={ink} strokeWidth={1.3} strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={vis ? offset : circ}
            style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.2,.8,.2,1) .1s" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: size > 110 ? "1.7rem" : "1.2rem", color: ink }}>{pct}%</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", color: ink }}>{label}</div>
        {sub && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", color: dark ? "rgba(255,255,255,0.55)" : "var(--ink-55)", marginTop: ".2rem" }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ─────────────── SCROLL PROGRESS ─────────────── */
function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: "transparent", zIndex: 10001 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--ink)", transition: "width .05s linear", borderRadius: "0 4px 4px 0" }} />
    </div>
  );
}

/* ─────────────── SCROLL REVEAL ─────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─────────────── NAV ─────────────── */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 20); if (menuOpen) setMenuOpen(false); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [menuOpen]);

  const links = [["#about", "About"], ["#projects", "Projects"], ["#skills", "Toolkit"], ["#timeline", "Journey"], ["#contact", "Contact"]];

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, background: scrolled ? "var(--paper)" : "transparent", borderBottom: scrolled ? "1.5px solid var(--ink)" : "1.5px solid transparent", transition: "all .25s ease" }}>
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <a href="#hero" style={{ display: "flex", alignItems: "baseline", gap: ".2rem", textDecoration: "none", color: "var(--ink)" }}>
          <span className="brand" style={{ fontSize: "1rem" }}>ARMAN</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.2rem" }}>.dev</span>
        </a>

        <div className="hide-mob" style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
          {links.map(([href, label]) => <a key={href} href={href} className="nav-link">{label}</a>)}
        </div>

        <div className="hide-mob" style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" className="btn" style={{ padding: ".55rem 1rem", fontSize: ".9rem" }}>LinkedIn</a>
          <a href="/ARMANRESUME.pdf" download className="btn" style={{ padding: ".55rem 1rem", fontSize: ".9rem" }}>↓ Resume</a>
          <a href="mailto:armanphaugat20@gmail.com" className="btn btn-solid" style={{ padding: ".55rem 1.3rem", fontSize: ".9rem" }}>Let's Talk</a>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? <Doodle type="bolt" size={16} /> : <Doodle type="wave" size={18} strokeWidth={2.2} />}
        </button>

        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {links.map(([href, label]) => <a key={href} href={href} className="mob-nav-link" onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} style={{ display: "block", textAlign: "center", margin: "1.2rem 1.2rem 0", padding: "1rem", border: "1.5px solid var(--ink)", borderRadius: "999px", fontFamily: "'Inter',sans-serif", fontSize: "1.1rem", textDecoration: "none", color: "var(--ink)" }}>LinkedIn</a>
          <a href="/ARMANRESUME.pdf" download onClick={() => setMenuOpen(false)} style={{ display: "block", textAlign: "center", margin: "1.2rem", padding: "1rem", border: "1.5px solid var(--ink)", borderRadius: "999px", fontFamily: "'Inter',sans-serif", fontSize: "1.1rem", textDecoration: "none", color: "var(--ink)" }}>↓ Download Resume</a>
          <a href="mailto:armanphaugat20@gmail.com" onClick={() => setMenuOpen(false)} style={{ display: "block", textAlign: "center", margin: "0 1.2rem 1.2rem", padding: "1rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "999px", fontFamily: "'Inter',sans-serif", fontSize: "1.1rem", textDecoration: "none" }}>Let's Talk</a>
        </div>
      </nav>
    </header>
  );
}

/* ─────────────── SCATTER (decorative background doodles) ─────────────── */
function Scatter() {
  const items = [
    { type: "cloud", top: "10%", left: "4%", size: 38, r: -4 },
    { type: "star", top: "18%", left: "92%", size: 22, r: 6 },
    { type: "scribbleCircle", top: "68%", left: "93%", size: 34, r: 0 },
    { type: "wave", top: "88%", left: "42%", size: 50, r: 0 },
  ];
  return (
    <div className="scatter" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {items.map((it, i) => (
        <div key={i} style={{ position: "absolute", top: it.top, left: it.left, "--r": `${it.r}deg`, animation: `bob ${6 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, opacity: 0.3 }}>
          <Doodle type={it.type} size={it.size} strokeWidth={1.5} color="var(--ink-35)" />
        </div>
      ))}
    </div>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Backend Engineer", "AI / ML Builder", "System Architect", "Competitive Programmer", "Founder, Nori"];
  useEffect(() => {
    let wi = 0, idx = 0, dir = 1;
    const iv = setInterval(() => {
      const w = words[wi % words.length];
      setTyped(dir === 1 ? w.slice(0, idx + 1) : w.slice(0, idx));
      if (dir === 1) { idx++; if (idx === w.length) dir = -1; }
      else { idx--; if (idx < 0) { dir = 1; idx = 0; wi++; } }
    }, 65);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" style={{ paddingTop: "8rem", position: "relative", background: "var(--paper-2)", borderBottom: "1.5px solid var(--ink)", overflow: "hidden" }}>
      <Scatter />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.2rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>

        <div className="reveal" style={{ marginBottom: "1.6rem" }}><SectionTag>Available for Internships · 2026</SectionTag></div>

        <h1 className="reveal reveal-d1 hero-word brand" style={{ fontWeight: 400, fontSize: "clamp(1.9rem,5.6vw,4.1rem)", lineHeight: 1.35, marginBottom: "1.4rem", maxWidth: 980 }}>
          I turn hard problems<br />
          into <span style={{ position: "relative", display: "inline-block" }}>systems that scale.
            <Underline width="100%" height={16} color="var(--accent)" style={{ position: "absolute", left: 0, bottom: -10, width: "100%" }} />
          </span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem", alignItems: "end" }} className="col-mob-1">
          <div>
            <div className="reveal reveal-d2" style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: "1rem", color: "var(--ink-80)" }}>
                {typed}<span style={{ display: "inline-block", width: 8, height: "1.1em", background: "var(--ink)", marginLeft: 3, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
              </span>
            </div>

            <p className="reveal reveal-d2" style={{ fontSize: "1.15rem", lineHeight: 1.7, maxWidth: 540, marginBottom: "2rem", color: "var(--ink-80)" }}>
              Backend Engineer, AI Researcher and Founder of <strong style={{ color: "var(--ink)" }}>Nori</strong> at MUJ. I build high-concurrency systems, retrieval-augmented generation pipelines, and production-grade AI platforms.
            </p>

            <div className="reveal reveal-d3" style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
              <a href="#vaultbot" className="btn btn-solid">Meet Nori <Doodle type="arrow" size={16} /></a>
              <a href="#projects" className="btn">Explore Work</a>
              <a href="https://github.com/armanphaugat" target="_blank" rel="noreferrer" className="btn">GitHub</a>
              <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
              <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" className="btn">LeetCode</a>
              <a href="/ARMANRESUME.pdf" download className="btn">↓ Resume</a>
            </div>
          </div>

          <div className="reveal reveal-d3" style={{ display: "flex", justifyContent: "flex-end" }}>
            <RotatingBadge text="FOUNDER OF NORI · 13,300+ LOC" />
          </div>
        </div>

        <div className="reveal reveal-d4" style={{ marginTop: "3.6rem", display: "flex", gap: "clamp(1.5rem,4vw,3.5rem)", flexWrap: "wrap", justifyContent: "space-between", borderTop: "1.5px dashed var(--line)", paddingTop: "2.6rem" }}>
          <Ring pct={91} label="9.05 CGPA" sub="Dean's Award" size={116} />
          <Ring pct={100} label="900+ Problems" sub="DSA Solved" size={116} />
          <Ring pct={99} label="Top 0.3%" sub="LeetCode Global" size={116} />
          <Ring pct={80} label="12+ Projects" sub="Shipped" size={116} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MARQUEE / DARK STRIP ─────────────── */
function Marquee() {
  const items = ["Node.js", "Redis", "MySQL", "BullMQ", "Python", "FastAPI", "LangChain", "FAISS", "MongoDB", "Docker", "XGBoost", "Scikit-learn", "Groq", "RAG", "HuggingFace", "JWT", "Pandas", "Streamlit", "Pygame", "System Design", "ACID", "DSA"];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ padding: "0 1.6rem", display: "inline-flex", alignItems: "center", gap: "1.6rem", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: "1rem", color: "rgba(255,255,255,0.85)" }}>
            {item} <Doodle type="star" size={14} color="rgba(255,255,255,0.45)" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── ABOUT ─────────────── */
function About() {
  return (
    <section id="about" style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 1.5rem" }}>
      <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>About</SectionTag></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }} className="col-mob-1">
        <div>
          <h2 className="reveal reveal-d1" style={{ fontWeight: 700, fontSize: "clamp(2rem,4.2vw,3rem)", lineHeight: 1.15, marginBottom: "1.6rem" }}>
            Passionate about systems &amp; scale
          </h2>
          <div className="reveal reveal-d2" style={{ fontSize: "1.1rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1.1rem", color: "var(--ink-80)" }}>
            <p>I'm a <strong style={{ color: "var(--ink)" }}>3rd-year CS student</strong> at Manipal University Jaipur (2023–2027) building the invisible engines that power modern applications. My focus is distributed systems, async processing, and bridging traditional backend architectures with LLMs.</p>
            <p>Core stack: <strong style={{ color: "var(--ink)" }}>Node.js, Redis, BullMQ, MySQL</strong> on the backend. AI apps with LangChain, FAISS, Groq. ML models with Scikit-learn and XGBoost.</p>
            <p>I also <strong style={{ color: "var(--ink)" }}>founded Nori</strong> — a production-grade multi-tenant RAG AI platform with 13,300+ lines of code, spanning a FastAPI backend, Discord bot, React dashboard, and BullMQ worker system.</p>
            <p>I solve DSA problems because I genuinely love finding elegant solutions to hard problems — ranked in the top 0.3% globally on LeetCode.</p>
          </div>
          <div className="reveal reveal-d3" style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.8rem" }}>
            {["Open to Internships 2026", "Available for Projects", "LeetCode Top 0.3%", "Founder · Nori"].map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </div>

        <div className="reveal reveal-d2">
          <div className="doodle-box" style={{ padding: "1.8rem", marginBottom: "1.5rem" }}>
            <div className="tag" style={{ marginBottom: "1.3rem" }}><Doodle type="scribbleCircle" size={14} />System Specs</div>
            {[["Education", "B.Tech CSE · MUJ · 2023–2027"], ["Location", "Jaipur, Rajasthan, India"], ["CGPA", "9.05 / 10 · Dean's Excellence Award"], ["Focus", "Backend · AI/ML · Sys Design"], ["LeetCode", "Top 0.3% · 900+ Problems"], ["Hackathon", "MUJHackX Round 2 · 1300+ participants"], ["Internship", "Indavis Lifesciences · Jun–Jul 2025"], ["Founder", "Nori · RAG AI Platform · 13,300 LOC"]].map(([k, v], i, arr) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".7rem 0", borderBottom: i < arr.length - 1 ? "2px dashed var(--line)" : "none", gap: "1rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".76rem", fontWeight: 600, color: "var(--ink-55)", flexShrink: 0 }}>{k}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="doodle-box doodle-box-dark" style={{ padding: "1.6rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".9rem", marginBottom: "1.4rem" }}>
              <div style={{ width: 40, height: 40, background: "#fff", borderRadius: "10px 4px 10px 4px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#112d4e" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.05rem", color: "#fff" }}>armanphaugat20</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", color: "rgba(255,255,255,0.55)" }}>leetcode.com</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Ring pct={99} label="Top 0.3%" sub="Global Rank" size={98} dark />
              <Ring pct={72} label="120+" sub="Max Streak" size={98} dark />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── EXPERIENCE ─────────────── */
function Experience() {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>Professional History</SectionTag></div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 700, fontSize: "clamp(1.9rem,3.4vw,2.5rem)", marginBottom: "2rem" }}>
        Where I've shipped
      </h2>

      <div className="reveal reveal-d2 doodle-box" style={{ padding: "2.1rem", display: "grid", gridTemplateColumns: "auto 1fr", gap: "2.2rem" }} className="col-mob-1">
        <div style={{ minWidth: 180 }}>
          <span className="pill pill-dark" style={{ marginBottom: ".6rem" }}>Jun – Jul 2025</span>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", fontWeight: 500, color: "var(--ink-55)", marginTop: ".7rem" }}>Full-Time · On-site</div>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.35rem", marginBottom: ".3rem" }}>Web Dev Intern</h3>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", color: "var(--ink-55)", marginBottom: "1.2rem" }}>Indavis Lifesciences · Haridwar, India</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".65rem", marginBottom: "1.2rem" }}>
            {["Maintained and updated the company website ensuring smooth performance and content accuracy across all pages.", "Collaborated with cross-functional teams to align website updates with brand guidelines and business objectives.", "Managed content workflows, achieving consistent brand representation and user experience improvements."].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: ".7rem", fontSize: "1rem", lineHeight: 1.65, color: "var(--ink-80)" }}>
                <Doodle type="corner" size={15} style={{ flexShrink: 0, marginTop: ".2rem", color: "var(--ink-35)" }} />{b}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            {["Website Maintenance", "Team Collaboration", "Content Management", "Brand Alignment"].map(t => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="reveal reveal-d3 doodle-box doodle-box-dark" style={{ marginTop: "1.4rem", padding: "2rem 2.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <div className="tag" style={{ background: "var(--dark)", color: "#fff", borderColor: "rgba(255,255,255,0.6)", boxShadow: "2px 2px 0 rgba(255,255,255,0.3)", marginBottom: ".8rem" }}><Doodle type="rocket" size={14} />Currently Seeking</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#fff", marginBottom: ".3rem" }}>Summer Internship 2026</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)" }}>Backend · AI/ML · Full Stack</div>
        </div>
        <a href="mailto:armanphaugat20@gmail.com" className="btn btn-light-solid">Reach Out <Doodle type="corner" size={15} /></a>
      </div>
    </section>
  );
}

/* ─────────────── NORI FLAGSHIP ─────────────── */
function NoriFlagship() {
  const VAULT_TECH = [
    { label: "Python", icon: Terminal }, { label: "FastAPI", icon: Terminal }, { label: "Discord.py", icon: Terminal },
    { label: "Graphlit", icon: Brain }, { label: "LangChain", icon: Brain }, { label: "Groq / Llama 3.3", icon: Brain },
    { label: "Tavily Search", icon: Globe }, { label: "Exa AI", icon: Globe }, { label: "Redis", icon: RefreshCw },
    { label: "BullMQ Worker", icon: RefreshCw }, { label: "Supabase Postgres", icon: Building2 }, { label: "SQLAlchemy", icon: Building2 },
    { label: "React + Vite", icon: Monitor }, { label: "Recharts", icon: Monitor }, { label: "framer-motion", icon: Monitor },
    { label: "Docker Compose", icon: Cloud }, { label: "Oracle Cloud", icon: Cloud }, { label: "nginx", icon: Cloud },
    { label: "PyJWT", icon: ShieldCheck }, { label: "docx2txt / openpyxl", icon: UploadCloud }, { label: "pytesseract OCR", icon: UploadCloud },
    { label: "openai-whisper", icon: UploadCloud }, { label: "BeautifulSoup4", icon: Globe },
  ];
  const VAULT_HIGHLIGHTS = [
    { icon: Building2, title: "Multi-tenant Guild Architecture", desc: "Each Discord server gets an isolated knowledge base, scoped by content and feed IDs and enforced through per-guild filters at query time — no cross-server data leakage." },
    { icon: RefreshCw, title: "BullMQ Key Rotation Worker", desc: "A dedicated async BullMQ worker rotates Groq, Tavily, and Exa API keys on a 5-minute cycle via Redis, keeping inference available under provider rate limits without downtime." },
    { icon: Brain, title: "Graphlit-Powered RAG Pipeline", desc: "Retrieval and conversation state are managed through Graphlit's knowledge-base API, with LangChain chaining the Groq Llama 3.3 completion step for grounded answers." },
    { icon: UploadCloud, title: "Multi-Modal Ingestion Pipeline", desc: "Indexes Word docs, spreadsheets, scanned images (OCR), and audio/video (Whisper) — all normalized and fed into Graphlit's knowledge base." },
    { icon: Globe, title: "Live Web Search Fallback", desc: "When the knowledge base has no answer, the bot falls back to real-time Tavily search, with Exa as a secondary provider." },
    { icon: Monitor, title: "React Admin Dashboard", desc: "A full dashboard for server admins: analytics, channel configuration, source uploads, crawler control, and a live chat widget — gated behind Discord OAuth." },
    { icon: ShieldCheck, title: "Discord OAuth + JWT Auth", desc: "PyJWT-based auth middleware with role-based access per server, backed by a Supabase Postgres metadata layer via SQLAlchemy." },
    { icon: Cloud, title: "Production Deployment", desc: "Dockerized services deployed on Oracle Cloud's Always Free tier, with scripted firewall rules and startup automation." },
  ];

  return (
    <section id="vaultbot" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>Flagship Project</SectionTag></div>
      <div className="reveal reveal-d1" style={{ marginBottom: "2.1rem" }}>
        <h2 style={{ fontWeight: 700, fontSize: "clamp(1.9rem,3.4vw,2.5rem)", marginBottom: ".5rem" }}>The project I founded</h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.05rem", color: "var(--ink-55)" }}>Not just built — designed, architected, and shipped from zero.</p>
      </div>

      <div className="reveal reveal-d2 doodle-box doodle-box-dark" style={{ color: "#fff", overflow: "hidden" }}>
        <div style={{ padding: "2.3rem 2.3rem 1.9rem", borderBottom: "2px dashed rgba(255,255,255,0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1.4rem", marginBottom: "1.7rem" }}>
            <div>
              <div style={{ display: "flex", gap: ".6rem", marginBottom: "1.1rem", flexWrap: "wrap" }}>
                <span className="pill" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)" }}>Founder &amp; Sole Architect</span>
                <span className="pill" style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "2px solid rgba(255,255,255,0.35)" }}>Backend Engineer</span>
              </div>
              <h3 className="brand" style={{ fontWeight: 400, fontSize: "clamp(1.9rem,4.6vw,3.1rem)", lineHeight: 1.15, marginBottom: ".7rem" }}>NORI</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", marginBottom: ".7rem" }}>Production-Grade Multi-Tenant RAG Support Bot</p>
              <p style={{ fontSize: "1.02rem", opacity: .65, lineHeight: 1.75, maxWidth: 600 }}>A full-stack, multi-service RAG platform that brings server-specific, context-aware support to Discord communities. Every architectural decision was designed and built solo.</p>
            </div>
            <div style={{ display: "flex", gap: "1.4rem" }}>
              <Ring pct={100} label="13,300+" sub="Lines of Code" size={102} dark />
              <Ring pct={70} label="4" sub="Services" size={102} dark />
            </div>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {[["FastAPI Backend", Terminal], ["Discord Bot", Terminal], ["React Dashboard", Monitor], ["BullMQ Worker", RefreshCw], ["Redis Cache", RefreshCw], ["Supabase Postgres", Building2], ["Docker Compose", Cloud], ["Oracle Cloud", Cloud]].map(([label, Icon]) => (
              <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", border: "1.5px dashed rgba(255,255,255,0.3)", borderRadius: "999px", padding: ".35rem .8rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", opacity: .85 }}>
                <Icon size={13} strokeWidth={2} /> {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "2.3rem" }}>
          <div style={{ marginBottom: "2.3rem" }}>
            <div className="tag" style={{ background: "transparent", color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.4)", boxShadow: "none", marginBottom: "1.3rem" }}><Doodle type="star" size={14} />Engineering Highlights</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1rem" }}>
              {VAULT_HIGHLIGHTS.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: "14px 6px 14px 6px", padding: "1.3rem", transition: "border-color .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}>
                    <div style={{ marginBottom: ".7rem", opacity: .8 }}><Icon size={19} strokeWidth={1.6} /></div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.02rem", marginBottom: ".4rem" }}>{h.title}</div>
                    <div style={{ fontSize: ".85rem", opacity: .6, lineHeight: 1.65 }}>{h.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: "2.1rem" }}>
            <div className="tag" style={{ background: "transparent", color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.4)", boxShadow: "none", marginBottom: "1.1rem" }}><Doodle type="wave" size={14} />Full Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
              {VAULT_TECH.map((t) => {
                const Icon = t.icon;
                return <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", border: "1.5px dashed rgba(255,255,255,0.3)", borderRadius: "999px", padding: ".4rem .85rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", opacity: .8 }}><Icon size={13} strokeWidth={2} />{t.label}</span>;
              })}
            </div>
          </div>

          <div style={{ background: "rgba(0,0,0,0.35)", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: "14px", padding: "1.5rem", marginBottom: "1.8rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", lineHeight: 2 }}>
            <div style={{ opacity: .55, marginBottom: ".6rem", fontSize: ".7rem", letterSpacing: ".08em" }}>ARCHITECTURE.OVERVIEW</div>
            <div style={{ opacity: .9 }}>$ docker compose ps</div>
            <div style={{ opacity: .6, paddingLeft: "1rem" }}>
              <div>backend&nbsp;&nbsp;&nbsp;→ FastAPI + Discord bot · port 8000</div>
              <div>frontend&nbsp;&nbsp;→ React dashboard (nginx) · port 3000</div>
              <div>redis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Key rotation cache · port 6379</div>
              <div>bullmq&nbsp;&nbsp;&nbsp;→ API key worker (5 min cycle)</div>
            </div>
            <div style={{ opacity: .9, marginTop: ".4rem" }}>$ wc -l **/*.py **/*.jsx **/*.js</div>
            <div style={{ opacity: .6, paddingLeft: "1rem" }}>
              <div>Arman Phaugat&nbsp;&nbsp;&nbsp;→ Founder &amp; Lead Architect</div>
              <div>Aayushi Chhabra → Co-Founder &amp; Core Contributor (Frontend · Backend · AI)</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap" }}>
            <a href="https://noribot.dev/?page=landing" target="_blank" rel="noreferrer" className="btn btn-light-solid">Add Nori to Discord</a>
            <a href="https://github.com/armanphaugat" target="_blank" rel="noreferrer" className="btn btn-light"><Github size={14} /> View Source</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PROJECTS DATA ─────────────── */
const PROJECTS = [
  { num: "01", name: "Real Time Stock Trading Backend", tag: "System Architecture", category: "Backend", tagline: "High-concurrency order engine · live leaderboards · ACID-safe concurrency", highlights: ["Redis Sorted Sets → <50ms leaderboard queries", "BullMQ price engine with 30-min scheduled jobs", "JWT auth + Token Bucket rate limiter", "MySQL row-level locking for concurrent trades"], tech: ["Node.js", "Express", "MySQL", "Redis", "BullMQ", "Docker", "Argon2"], youtube: "https://www.youtube.com/watch?v=IcetVmIat-w" },
  { num: "02", name: "ZymeRag", tag: "Artificial Intelligence", category: "AI/ML", tagline: "Self-hosted, multi-modal RAG platform · hybrid retrieval · web-search fallback", highlights: ["Hybrid retrieval: BM25 keyword search + FAISS/sentence-transformer semantic search fused per query", "Multi-modal ingestion — PDF, DOCX, CSV/XLSX, image OCR (PaddleOCR), audio/video (faster-whisper), and live websites (crawl4ai)", "Per-document isolated FAISS + BM25 indexes on disk, addressed by UUID for clean per-query scoping", "Tavily/Exa web-search fallback with cited synthesis when the local knowledge base falls short", "Groq API key rotation worker (Redis-backed) + scheduled BullMQ job that re-crawls saved website feeds", "JWT + refresh-token auth with Argon2 password hashing; two front ends — a React/Vite admin console and a static API-served UI"], tech: ["FastAPI", "PostgreSQL", "SQLAlchemy 2.0", "FAISS", "BM25", "Sentence-Transformers", "Groq", "Tavily", "Exa", "PaddleOCR", "faster-whisper", "crawl4ai", "BullMQ", "Redis", "React 19", "Vite 8"] },
  { num: "03", name: "RAG Discord Bot (Original)", tag: "Artificial Intelligence", category: "AI/ML", tagline: "FastAPI + LangChain · per-guild FAISS · Groq Llama 3.3", highlights: ["Per-guild persistent FAISS vector stores with isolation", "LCEL chain → Groq Llama 3.3 inference with rate limiting", "PDF parsing + web scraping indexing pipeline", "Multi-server permission gating + async handlers"], tech: ["Python", "FastAPI", "LangChain", "FAISS", "Discord.py", "Groq", "HuggingFace"], discord: "https://noribot.dev/?page=landing" },
  { num: "04", name: "Video Streaming & User Management", tag: "Media Pipelines", category: "Backend", tagline: "YouTube-like backend · HLS adaptive streaming · JWT lifecycle", highlights: ["HLS transcoding via ffmpeg (360p/720p adaptive bitrate)", "JWT access + refresh token dual lifecycle", "MongoDB aggregation pipelines for watch history", "Cloudinary asset optimization"], tech: ["Node.js", "MongoDB", "Express", "Cloudinary", "JWT", "ffmpeg", "Bcrypt"], youtube: "https://youtu.be/w6980_4fVSQ" },
  { num: "05", name: "Cricket Score Predictor", tag: "Data Science", category: "AI/ML", tagline: "Live IPL · T20 · ODI score prediction via XGBoost", highlights: ["3 XGBoost models: IPL, T20, ODI formats", "CricAPI live integration for real-time inference", "Format-specific feature engineering + EDA"], tech: ["Python", "XGBoost", "Scikit-learn", "Streamlit", "Pandas", "CricAPI"] },
  { num: "06", name: "IPL Win Predictor", tag: "Data Science", category: "AI/ML", tagline: "Real-time IPL win probability via ML ensemble", highlights: ["Logistic Regression + Random Forest ensemble", "Dynamic win % via CRR/RRR/wickets features", "Feature engineering on 4500+ rows of match data"], tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Matplotlib"] },
  { num: "07", name: "Book Recommender System", tag: "Artificial Intelligence", category: "AI/ML", tagline: "Dual-mode: popularity filter + collaborative filtering", highlights: ["Popularity: top 50 filtered by 250+ user ratings", "Cosine similarity on pivot matrix for CF", "Streamlit UI with covers + ratings display"], tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Cosine Similarity"] },
  { num: "08", name: "WhatsApp Chat Analyser", tag: "Data Science", category: "AI/ML", tagline: "Upload export · visualize conversation trends & patterns", highlights: ["Timeline analysis · daily/weekly/monthly breakdowns", "Top emoji breakdown + WordCloud generation", "Most active user leaderboard + heatmap"], tech: ["Python", "Streamlit", "Pandas", "Matplotlib", "WordCloud", "Regex"] },
  { num: "09", name: "Gamezo Discord Bot", tag: "Backend Bot", category: "Backend", tagline: "Heavy backend bot · multi-game economy · live stock market", highlights: ["SQLite3 persistence with async scheduling", "Games: coin flip, airplane crash, rollover bets", "Live stock market via REST API + hourly rewards system"], tech: ["Python", "Discord.py", "SQLite3", "asyncio", "REST API"] },
  { num: "10", name: "Cuntrex — 2D Shooter Game", tag: "Game Dev", category: "Game", tagline: "Two-player 2D shooter built with Pygame from scratch", highlights: ["Full game loop · sprite collision detection", "Health bar real-time rendering + game states", "Background music + SFX via Pygame mixer"], tech: ["Python", "Pygame", "OOP", "Game Loop", "Sprite Animation"] },
  { num: "11", name: "RAG Bot Website", tag: "Frontend", category: "Frontend", tagline: "React showcase for the Discord RAG bot", highlights: ["Scroll-triggered IntersectionObserver animations", "Interactive feature tabs + zero CSS framework"], tech: ["React", "Vite", "JavaScript", "CSS", "Lucide"], webapp: "https://gamezobot.netlify.app/", website: "https://armanphaugat.github.io/ragwebsite/" },
  { num: "12", name: "Todo App", tag: "Android", category: "Android", tagline: "Android task manager · SQLite persistence · RecyclerView", highlights: ["SQLite CRUD via custom DatabaseHelper", "RecyclerView with live check/delete updates", "View Binding · minSdk 21 · targetSdk 36"], tech: ["Kotlin", "Android", "SQLite", "RecyclerView", "Gradle"] },
  { num: "13", name: "SalesForce UI Clone", tag: "Frontend", category: "Frontend", tagline: "Pixel-accurate Salesforce homepage clone · pure HTML/CSS", highlights: ["Full layout: nav, hero, content strips", "CSS-only responsive grid · brand-faithful typography"], tech: ["HTML", "CSS", "Flexbox", "Responsive Design"] },
];

function ProjectCard({ p, i }) {
  const links = [
    p.youtube && { label: "Demo", href: p.youtube, solid: false },
    p.webapp && { label: "Live", href: p.webapp, solid: true },
    p.website && { label: "Site", href: p.website, solid: false },
    p.discord && { label: "Add Bot", href: p.discord, solid: true },
  ].filter(Boolean);

  return (
    <div className={`reveal doodle-box ${i % 2 ? "alt" : ""}`} style={{ overflow: "hidden" }}>
      <div style={{ padding: "2.1rem 2.1rem 1.7rem", borderBottom: "1.5px dashed var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.2rem", marginBottom: "1.2rem" }}>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <span className="pill">{p.tag}</span>
            <span className="pill" style={{ color: "var(--ink-55)" }}>{p.category}</span>
          </div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--ink-35)" }}>{p.num}</span>
        </div>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem,2.6vw,2.1rem)", lineHeight: 1.2, marginBottom: ".6rem" }}>{p.name}</h3>
        <p style={{ fontSize: "1.02rem", lineHeight: 1.65, color: "var(--ink-55)", maxWidth: 620 }}>{p.tagline}</p>
      </div>

      <div style={{ padding: "2rem 2.1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: ".9rem", marginBottom: "1.7rem" }}>
          {p.highlights.map((h, idx) => (
            <div key={idx} style={{ display: "flex", gap: ".7rem", padding: "1rem 1.1rem", background: "var(--paper-2)", borderRadius: "10px", border: "1.5px solid var(--line)" }}>
              <Doodle type="corner" size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: ".15rem" }} />
              <span style={{ fontSize: ".92rem", lineHeight: 1.55, color: "var(--ink-80)" }}>{h}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: links.length ? "1.7rem" : 0 }}>
          {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
        </div>

        {links.length > 0 && (
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", paddingTop: "1.5rem", borderTop: "1.5px dashed var(--line)" }}>
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={l.solid ? "btn btn-solid" : "btn"}>
                {l.label} <Doodle type="arrow" size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Backend", "AI/ML", "Frontend", "Game", "Android"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>Recent Work</SectionTag></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "1.8rem" }}>
        <h2 className="reveal reveal-d1" style={{ fontWeight: 700, fontSize: "clamp(1.9rem,3.4vw,2.5rem)" }}>
          More system builds &amp; AI implementations
        </h2>
        <span className="reveal reveal-d1 pill">{PROJECTS.length} Projects</span>
      </div>

      <div className="reveal reveal-d2" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.4rem" }}>
        {cats.map(cat => {
          const active = filter === cat;
          return (
            <button key={cat} onClick={() => setFilter(cat)} className={active ? "pill pill-dark" : "pill"} style={{ cursor: "pointer" }}>
              {cat} ({cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length})
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
        {filtered.map((p, i) => <ProjectCard key={p.num} p={p} i={i} />)}
      </div>
    </section>
  );
}

/* ─────────────── SKILLS ─────────────── */
const SKILL_RINGS = [
  { name: "DSA / Competitive Programming", pct: 92 },
  { name: "Node.js / Express", pct: 90 },
  { name: "Python / FastAPI", pct: 88 },
  { name: "MySQL / ACID Design", pct: 85 },
  { name: "Redis / BullMQ", pct: 82 },
  { name: "MongoDB", pct: 82 },
  { name: "LangChain / RAG", pct: 80 },
  { name: "Scikit-learn / XGBoost", pct: 78 },
  { name: "Docker", pct: 75 },
  { name: "React / Frontend", pct: 72 },
];

const SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "JavaScript", "C", "C++", "Java", "HTML", "CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST", "JWT", "Argon2"] },
  { label: "Databases", items: ["MySQL", "MongoDB", "Redis", "FAISS", "SQLite3", "Supabase"] },
  { label: "AI / ML", items: ["LangChain", "HuggingFace", "RAG", "XGBoost", "Scikit-learn", "Groq", "Graphlit", "Tavily", "Exa AI"] },
  { label: "DevOps", items: ["Docker", "Git", "GitHub", "Postman", "BullMQ", "nginx", "Oracle Cloud"] },
  { label: "Concepts", items: ["System Design", "DSA", "ACID", "Caching", "Rate Limiting", "OOP", "Multi-Tenancy"] },
];

function Skills() {
  const [tab, setTab] = useState("rings");
  return (
    <section id="skills" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>Technical Toolkit</SectionTag></div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 700, fontSize: "clamp(1.9rem,3.4vw,2.5rem)", marginBottom: "1.8rem" }}>
        My toolkit
      </h2>

      <div className="reveal reveal-d2" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.4rem" }}>
        {[["rings", "Proficiency"], ["tags", "Tech Tags"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={tab === k ? "pill pill-dark" : "pill"} style={{ cursor: "pointer" }}>{l}</button>
        ))}
      </div>

      {tab === "rings" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2.2rem 1rem" }}>
          {SKILL_RINGS.map((s) => <Ring key={s.name} pct={s.pct} label={s.name} size={110} />)}
        </div>
      )}

      {tab === "tags" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "1rem" }}>
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.label} className={`doodle-box ${i % 2 ? "alt" : ""}`} style={{ padding: "1.4rem" }}>
              <div className="tag" style={{ marginBottom: ".9rem" }}>{g.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                {g.items.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ─────────────── TIMELINE ─────────────── */
const TIMELINE = [
  { year: "Aug 2023", title: "Started B.Tech CSE", sub: "Manipal University Jaipur", desc: "Began CS degree. Immediately dove into DSA and competitive programming.", hot: false },
  { year: "Dec 2023", title: "TLE Eliminators CP Level 1", sub: "Competitive Programming", desc: "Foundation in C++ and algorithmic thinking. Level 1 completed.", hot: false },
  { year: "Mar 2024", title: "Dean's Excellence Award — Sem 1", sub: "9.05 CGPA", desc: "Awarded Dean's Excellence for outstanding academic performance across the semester.", hot: false },
  { year: "Jun 2024", title: "Oracle DB + GFG OOP Certs", sub: "Certifications", desc: "Completed Oracle Database Design & OOP with Java from GeeksforGeeks.", hot: false },
  { year: "Aug 2024", title: "500+ DSA Problems", sub: "LeetCode + Codeforces", desc: "Hit 500 milestone. Consistently solving medium-hard difficulty problems.", hot: false },
  { year: "Nov 2024", title: "TLE Eliminators Level 2 & 3", sub: "Advanced Algorithms", desc: "Advanced graph theory, segment trees, DP optimizations completed.", hot: false },
  { year: "Jan 2025", title: "Red Hat Sysadmin + NPTEL DAA", sub: "Dual Certifications", desc: "Red Hat Sysadmin I & II + NPTEL Design & Analysis of Algorithms.", hot: false },
  { year: "Feb 2025", title: "MUJHackX Round 2", sub: "1300+ participants", desc: "Top performers among 1300+ participants at MUJHackX hackathon.", hot: false },
  { year: "Mar 2025", title: "LeetCode Top 0.3%", sub: "Beats 99.7% globally", desc: "900+ problems solved. Ranked top 0.3% of all LeetCode users worldwide.", hot: true },
  { year: "Jun 2025", title: "Web Dev Intern — Indavis", sub: "Haridwar · On-site", desc: "First professional internship. Real business constraints, production deployments.", hot: false },
  { year: "2025–26", title: "Founded Nori", sub: "Sole Architect · 13,300 LOC", desc: "Designed and built Nori from scratch — a multi-tenant RAG AI platform spanning FastAPI, Discord.py, React dashboard, BullMQ key-rotation worker, and Oracle Cloud deployment.", hot: true },
];

function Timeline() {
  return (
    <section id="timeline" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>Journey Log</SectionTag></div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 700, fontSize: "clamp(1.9rem,3.4vw,2.5rem)", marginBottom: "2.6rem" }}>
        My timeline
      </h2>

      <div style={{ position: "relative", maxWidth: 820, paddingLeft: "2rem", borderLeft: "1.5px dashed var(--ink)" }}>
        {TIMELINE.map((ev, i) => (
          <div key={i} className="reveal" style={{ position: "relative", marginBottom: "2.3rem", marginLeft: "1.4rem" }}>
            <div style={{
              position: "absolute", left: "-2.7rem", top: 2, width: 14, height: 14, borderRadius: "50%",
              background: ev.hot ? "var(--accent)" : "var(--paper)", border: ev.hot ? "1.5px solid var(--accent)" : "1.5px solid var(--ink)",
              boxShadow: ev.hot ? "0 0 0 4px var(--accent-35)" : "none",
            }} />
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".74rem", letterSpacing: ".06em", marginBottom: ".35rem", color: "var(--ink-55)" }}>{ev.year}</div>
            <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: ".2rem" }}>{ev.title}{ev.hot && <Doodle type="star" size={14} style={{ marginLeft: ".4rem", display: "inline" }} />}</h4>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: ".95rem", marginBottom: ".45rem", color: "var(--ink-35)" }}>{ev.sub}</div>
            <p style={{ fontSize: ".95rem", lineHeight: 1.65, maxWidth: 540, color: "var(--ink-80)" }}>{ev.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── ACHIEVEMENTS ─────────────── */
function Achievements() {
  const items = [
    { icon: "bolt", title: "Founder · Nori", desc: "Sole architect of a 13,300-line production RAG AI platform — designed, built, and deployed end-to-end." },
    { icon: "trophy", title: "Dean's Excellence Award", desc: "Received across multiple semesters for maintaining 9.0+ CGPA at MUJ." },
    { icon: "star", title: "Top 0.3% LeetCode", desc: "Ranked globally in the top 0.3% of all LeetCode users. Beats 99.7%." },
    { icon: "rocket", title: "MUJHackX Round 2", desc: "Qualified for Round 2 among 1300+ participants at MUJHackX." },
  ];
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>Recognition</SectionTag></div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 700, fontSize: "clamp(1.9rem,3.4vw,2.5rem)", marginBottom: "2rem" }}>
        Milestones &amp; awards
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "1.1rem" }}>
        {items.map((a, i) => (
          <div key={a.title} className={`reveal doodle-box doodle-hover ${i % 2 ? "alt" : ""}`} style={{ padding: "1.7rem" }}>
            <div style={{ marginBottom: ".9rem" }}><Doodle type={a.icon} size={30} strokeWidth={1.6} /></div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: ".5rem" }}>{a.title}</div>
            <div style={{ fontSize: ".9rem", lineHeight: 1.65, color: "var(--ink-55)" }}>{a.desc}</div>
          </div>
        ))}
      </div>

      <div className="reveal doodle-box doodle-box-dark" style={{ marginTop: "1.3rem", color: "#fff", padding: "2.2rem 2.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
        <div>
          <div className="tag" style={{ background: "transparent", color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.4)", boxShadow: "none", marginBottom: ".8rem" }}>LeetCode Stats</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3rem)", lineHeight: 1 }}>Top 0.3%</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: ".95rem", marginTop: ".6rem", opacity: .6 }}>Global Rank · 900+ Problems · Beats 99.7%</div>
        </div>
        <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
          <Ring pct={99} label="Top 0.3%" sub="Global Rank" size={94} dark />
          <Ring pct={72} label="120+" sub="Max Streak" size={94} dark />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTACT ─────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText("armanphaugat20@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <section id="contact" style={{ padding: "6rem 0", background: "var(--paper-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="reveal" style={{ marginBottom: "1.4rem" }}><SectionTag>Establish Connection</SectionTag></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }} className="col-mob-1">
          <div>
            <h2 className="reveal reveal-d1" style={{ fontWeight: 700, fontSize: "clamp(2.2rem,5.2vw,3.4rem)", lineHeight: 1.12, marginBottom: "1.4rem" }}>
              Interested in a<br />collaboration?
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: "1.08rem", lineHeight: 1.75, marginBottom: "2.1rem", maxWidth: 420, color: "var(--ink-80)" }}>
              Currently seeking Software Engineering Internships for 2026. Let's discuss how I can contribute to your engineering team — Backend, AI/ML, or Full Stack.
            </p>

            <div className="reveal reveal-d3" style={{ display: "flex", gap: ".7rem", marginBottom: "1.8rem", flexWrap: "wrap", alignItems: "stretch" }}>
              <div className="doodle-box" style={{ padding: "1rem 1.3rem", flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: ".65rem", color: "var(--ink-55)", marginBottom: ".25rem" }}>Primary Email</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.02rem" }}>armanphaugat20@gmail.com</div>
              </div>
              <button onClick={copy} className="btn btn-solid" style={{ whiteSpace: "nowrap" }}>{copied ? "Copied ✓" : "Copy Email"}</button>
            </div>

            <div className="reveal reveal-d4" style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {[
                { icon: "heart", label: "Email", value: "armanphaugat20@gmail.com", href: "mailto:armanphaugat20@gmail.com" },
                { icon: "bolt", label: "Phone", value: "+91-9306115772", href: "tel:+919306115772" },
                { icon: "scribbleCircle", label: "GitHub", value: "github.com/armanphaugat", href: "https://github.com/armanphaugat" },
                { icon: "cloud", label: "LinkedIn", value: "linkedin.com/in/armanphaugat05", href: "https://www.linkedin.com/in/armanphaugat05/" },
                { icon: "star", label: "LeetCode", value: "Top 0.3% · armanphaugat20", href: "https://leetcode.com/u/armanphaugat20" },
              ].map((l, i) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`doodle-box doodle-hover ${i % 2 ? "alt" : ""}`}
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".9rem 1.2rem", textDecoration: "none", color: "var(--ink)" }}>
                  <Doodle type={l.icon} size={22} />
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".64rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-55)" }}>{l.label}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", marginTop: ".1rem" }}>{l.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal reveal-d2">
            <div className="doodle-box" style={{ padding: "2rem", marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.3rem" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "blink 1.6s infinite" }} />
                <div className="tag">Open to Opportunities</div>
              </div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.5rem", marginBottom: ".5rem" }}>Summer 2026 Internship</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", color: "var(--ink-55)", marginBottom: "1.4rem" }}>Backend Engineering · AI/ML · Full Stack</div>
              {[["Availability", "Full-time from May 2026"], ["Format", "Remote / Hybrid / On-site"], ["Location", "Jaipur, IN (Reloc. flexible)"], ["Response", "Usually within 24 hours"]].map(([k, v], i, arr) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".6rem 0", borderBottom: i < arr.length - 1 ? "2px dashed var(--line)" : "none" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".75rem", color: "var(--ink-55)" }}>{k}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".98rem" }}>{v}</span>
                </div>
              ))}
              <a href="mailto:armanphaugat20@gmail.com?subject=Internship Opportunity 2026" className="btn btn-solid" style={{ width: "100%", justifyContent: "center", marginTop: "1.5rem" }}>Send Message <Doodle type="corner" size={15} /></a>
            </div>

            <div className="doodle-box doodle-box-dark" style={{ padding: "1.5rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", lineHeight: 2, color: "rgba(255,255,255,0.85)" }}>
              <div style={{ opacity: .4, fontSize: ".7rem", letterSpacing: ".08em", marginBottom: ".6rem" }}>TERMINAL</div>
              <div style={{ color: "#fff" }}>$ whoami</div>
              <div style={{ opacity: .65, paddingLeft: "1rem" }}>arman_phaugat · backend_engineer · founder</div>
              <div style={{ color: "#fff" }}>$ skills --top</div>
              <div style={{ opacity: .65, paddingLeft: "1rem" }}>["Node.js", "Python", "Redis", "LangChain"]</div>
              <div style={{ color: "#fff" }}>$ cat nori.stats</div>
              <div style={{ opacity: .8, paddingLeft: "1rem" }}>13,300 LOC · 4 SERVICES · 23+ TECH</div>
              <div style={{ color: "#fff" }}>$ hire me <span style={{ display: "inline-block", width: 7, height: "1em", background: "rgba(255,255,255,0.85)", marginLeft: 2, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer style={{ padding: "3.4rem 1.5rem 2rem", background: "var(--dark)", color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <div className="brand" style={{ fontWeight: 400, fontSize: "clamp(1.4rem,4vw,2.2rem)", marginBottom: "1.7rem" }}>
          ARMAN<span style={{ fontFamily: "'Inter',sans-serif" }}>.dev</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "1.7rem" }}>
          {[["GitHub", "https://github.com/armanphaugat"], ["LinkedIn", "https://www.linkedin.com/in/armanphaugat05/"], ["LeetCode", "https://leetcode.com/u/armanphaugat20"], ["Nori", "#vaultbot"]].map(([l, h]) => (
            <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ borderTop: "2px dashed rgba(255,255,255,0.2)", paddingTop: "1.6rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", opacity: .45 }}>© 2025 Arman Phaugat</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", opacity: .45 }}>Built with React</div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── APP ─────────────── */
export default function App() {
  useReveal();
  return (
    <>
      <style>{G}</style>
      <ScrollBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <NoriFlagship />
        <Projects />
        <Skills />
        <Achievements />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}