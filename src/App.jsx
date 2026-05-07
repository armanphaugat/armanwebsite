import { useState, useEffect, useRef } from "react";

/* ─────────────── GLOBAL STYLES ─────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  :root {
    --bg:        #0a0a0a;
    --surface:   #111111;
    --surf-low:  #151515;
    --surf-high: #1a1a1a;
    --surf-top:  #212121;
    --border:    rgba(77,67,84,0.4);
    --border-hi: rgba(77,67,84,0.7);
    --txt:       #e5e2e1;
    --txt-dim:   #9ca3af;
    --primary:   #ddb7ff;
    --primary-d: #6900b3;
    --secondary: #4cd7f6;
    --on-pri:    #490080;
    --glow-p:    rgba(221,183,255,0.12);
    --glow-s:    rgba(76,215,246,0.10);
    --glow-p-b:  rgba(221,183,255,0.05);
    --glow-s-b:  rgba(76,215,246,0.05);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    background: var(--bg);
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--txt);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: rgba(221,183,255,0.25); color: #fff; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(221,183,255,0.2); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(221,183,255,0.4); }

  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes glow-throb { 0%,100%{opacity:0.4} 50%{opacity:1} }
  @keyframes slide-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fade-in { from{opacity:0} to{opacity:1} }
  @keyframes bar-fill { from{width:0} to{width:var(--target)} }
  @keyframes scan-line { 0%{top:-100%} 100%{top:200%} }
  @keyframes border-glow { 0%,100%{box-shadow:0 0 12px var(--glow-p)} 50%{box-shadow:0 0 28px rgba(221,183,255,0.25)} }
  @keyframes terminal-blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes orbit { from{transform:rotate(0deg) translateX(140px) rotate(0deg)} to{transform:rotate(360deg) translateX(140px) rotate(-360deg)} }
  @keyframes ripple { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(2.5);opacity:0} }
  @keyframes mobile-menu-in { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

  .reveal { opacity:0; transform:translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-d1 { transition-delay: 0.05s; }
  .reveal-d2 { transition-delay: 0.12s; }
  .reveal-d3 { transition-delay: 0.19s; }
  .reveal-d4 { transition-delay: 0.26s; }

  .glass {
    background: rgba(17,17,17,0.85);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .glass:hover { border-color: var(--border-hi); }

  .glow-p {
    border-color: rgba(221,183,255,0.3);
    box-shadow: 0 0 20px var(--glow-p-b);
  }
  .glow-p:hover {
    border-color: rgba(221,183,255,0.7);
    box-shadow: 0 0 30px rgba(221,183,255,0.12), inset 0 0 20px rgba(221,183,255,0.03);
  }
  .glow-s {
    border-color: rgba(76,215,246,0.3);
    box-shadow: 0 0 20px var(--glow-s-b);
  }
  .glow-s:hover {
    border-color: rgba(76,215,246,0.7);
    box-shadow: 0 0 30px rgba(76,215,246,0.12), inset 0 0 20px rgba(76,215,246,0.03);
  }

  .chip-p {
    background: rgba(221,183,255,0.07);
    border: 1px solid rgba(221,183,255,0.2);
    color: var(--primary);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    padding: 0.22rem 0.65rem;
    border-radius: 9999px;
    white-space: nowrap;
    letter-spacing: 0.03em;
    transition: background 0.2s, border-color 0.2s;
  }
  .chip-p:hover { background: rgba(221,183,255,0.14); border-color: rgba(221,183,255,0.45); }

  .chip-s {
    background: rgba(76,215,246,0.07);
    border: 1px solid rgba(76,215,246,0.2);
    color: var(--secondary);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    padding: 0.22rem 0.65rem;
    border-radius: 9999px;
    white-space: nowrap;
    letter-spacing: 0.03em;
    transition: background 0.2s, border-color 0.2s;
  }
  .chip-s:hover { background: rgba(76,215,246,0.14); border-color: rgba(76,215,246,0.45); }

  .nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--txt-dim);
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--primary);
    transition: width 0.25s ease;
  }
  .nav-link:hover { color: var(--primary); }
  .nav-link:hover::after { width: 100%; }

  .mob-nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--txt-dim);
    text-decoration: none;
    transition: color 0.2s, background 0.2s;
    padding: 0.85rem 1.2rem;
    border-radius: 8px;
    display: block;
  }
  .mob-nav-link:hover { color: var(--primary); background: rgba(221,183,255,0.06); }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background: var(--primary);
    color: var(--on-pri);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 0 rgba(221,183,255,0);
  }
  .btn-primary:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 0 20px rgba(221,183,255,0.3);
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background: transparent;
    color: var(--txt);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
  }
  .btn-ghost:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }

  .skill-bar {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .skill-bar-fill-p {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), rgba(221,183,255,0.6));
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(221,183,255,0.5);
    width: 0;
    transition: width 1.4s cubic-bezier(0.25,1,0.5,1);
  }
  .skill-bar-fill-s {
    height: 100%;
    background: linear-gradient(90deg, var(--secondary), rgba(76,215,246,0.6));
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(76,215,246,0.5);
    width: 0;
    transition: width 1.4s cubic-bezier(0.25,1,0.5,1);
  }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--primary);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .timeline-dot-active {
    width: 14px;
    height: 14px;
    background: var(--primary);
    border-radius: 3px;
    position: absolute;
    left: -7px;
    top: 4px;
    box-shadow: 0 0 12px rgba(221,183,255,0.6);
  }
  .timeline-dot {
    width: 10px;
    height: 10px;
    background: rgba(255,255,255,0.15);
    border: 1px solid var(--border);
    border-radius: 2px;
    position: absolute;
    left: -5px;
    top: 6px;
  }

  .terminal-cursor {
    display: inline-block;
    width: 8px;
    height: 14px;
    background: var(--secondary);
    vertical-align: middle;
    margin-left: 2px;
    animation: terminal-blink 1s step-end infinite;
  }

  .noise {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height%3D'100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  .scroll-bar-top {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-d), var(--primary), var(--secondary));
    z-index: 10000;
    transition: width 0.05s linear;
    box-shadow: 0 0 10px rgba(221,183,255,0.5);
  }

  .hero-grid-dot {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(221,183,255,0.06) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 80%);
  }

  .orb1 {
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(221,183,255,0.08) 0%, transparent 70%);
    top: -100px; left: 50%;
    transform: translateX(-30%);
    pointer-events: none;
    animation: float 8s ease-in-out infinite;
  }
  .orb2 {
    position: absolute;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(76,215,246,0.06) 0%, transparent 70%);
    bottom: 10%; right: 5%;
    pointer-events: none;
    animation: float 10s ease-in-out infinite 3s;
  }

  /* Mobile menu */
  .mobile-menu {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 1rem;
    right: 1rem;
    background: rgba(10,10,10,0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(221,183,255,0.2);
    border-radius: 12px;
    padding: 0.75rem;
    animation: mobile-menu-in 0.2s ease;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(221,183,255,0.04);
    z-index: 490;
  }
  .mobile-menu.open { display: block; }

  .mob-divider {
    height: 1px;
    background: rgba(221,183,255,0.1);
    margin: 0.5rem 0;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 38px;
    height: 38px;
    background: transparent;
    border: 1px solid rgba(221,183,255,0.2);
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    padding: 0;
  }
  .hamburger:hover { border-color: rgba(221,183,255,0.5); background: rgba(221,183,255,0.06); }
  .hamburger span {
    display: block;
    width: 16px;
    height: 1.5px;
    background: var(--primary);
    border-radius: 2px;
    transition: all 0.25s ease;
    transform-origin: center;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  @media (max-width: 768px) {
    .hide-mob { display: none !important; }
    .col-mob-1 { grid-template-columns: 1fr !important; }
    .mob-col { flex-direction: column !important; }
    .hamburger { display: flex; }
  }
`;

/* ─── SCROLL PROGRESS ─── */
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
  return <div className="scroll-bar-top" style={{ width: `${pct}%` }} />;
}

/* ─── SCROLL REVEAL ─── */
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

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const fn = () => { if (menuOpen) setMenuOpen(false); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [menuOpen]);

  const links = [
    ["#about", "About"],
    ["#projects", "Projects"],
    ["#skills", "Toolkit"],
    ["#timeline", "Journey"],
    ["#contact", "Contact"],
  ];

  const handleMobLink = () => setMenuOpen(false);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(77,67,84,0.4)" : "1px solid transparent",
      transition: "all 0.3s ease",
      boxShadow: scrolled ? "0 0 30px rgba(221,183,255,0.04)" : "none",
    }}>
      <nav style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "1.1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "relative",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: 28, height: 28,
            background: "linear-gradient(135deg, var(--primary-d), rgba(221,183,255,0.3))",
            border: "1px solid rgba(221,183,255,0.3)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.6rem", fontWeight: 700, color: "#fff",
            fontFamily: "'JetBrains Mono', monospace",
            boxShadow: "0 0 12px rgba(221,183,255,0.2)",
          }}>AP</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", color: "var(--primary)", textTransform: "uppercase" }}>ARMAN.EXE</span>
        </div>

        {/* Desktop nav links */}
        <div className="hide-mob" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Desktop resume button */}
        <a href="/ARMANRESUME.pdf" download className="hide-mob btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.72rem" }}>
          ↓ Resume.pdf
        </a>

        {/* Hamburger (mobile only) */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        {/* Mobile dropdown menu */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="mob-nav-link" onClick={handleMobLink}>{label}</a>
          ))}
          <div className="mob-divider" />
          {/* Resume download — prominent in mobile menu */}
          <a
            href="/ARMANRESUME.pdf"
            download
            onClick={handleMobLink}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              margin: "0.25rem 0 0.25rem",
              padding: "0.85rem 1.2rem",
              background: "var(--primary)",
              color: "var(--on-pri)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: 8,
              transition: "opacity 0.2s",
            }}
          >
            ↓ Download Resume
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Backend Engineer", "AI / ML Builder", "System Architect", "Competitive Programmer"];
  useEffect(() => {
    let wi = 0, idx = 0, dir = 1;
    const iv = setInterval(() => {
      const w = words[wi % words.length];
      setTyped(dir === 1 ? w.slice(0, idx + 1) : w.slice(0, idx));
      if (dir === 1) { idx++; if (idx === w.length) dir = -1; }
      else { idx--; if (idx < 0) { dir = 1; idx = 0; wi++; } }
    }, 72);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "10rem 2rem 6rem", position: "relative", overflow: "hidden", maxWidth: 1200, margin: "0 auto" }}>
      <div className="hero-grid-dot" />
      <div className="orb1" />
      <div className="orb2" />

      <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem", zIndex: 1 }}>
        <div style={{ position: "relative", width: 8, height: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--secondary)", boxShadow: "0 0 8px var(--secondary)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--secondary)", animation: "ripple 2s ease-out infinite" }} />
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--secondary)", letterSpacing: "0.1em" }}>STATUS: AVAILABLE_FOR_OPPORTUNITIES</span>
      </div>

      <h1 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1.2rem", zIndex: 1, maxWidth: 860 }}>
        Architecting{" "}
        <span style={{ background: "linear-gradient(135deg, var(--primary), rgba(221,183,255,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Scalable</span>
        {" "}Intelligent Systems.
      </h1>

      <div className="reveal reveal-d2" style={{ marginBottom: "1.5rem", height: "2rem", zIndex: 1, display: "flex", alignItems: "center" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "var(--txt-dim)" }}>
          {">"} {typed}<span className="terminal-cursor" />
        </span>
      </div>

      <p className="reveal reveal-d2" style={{ fontSize: "1.1rem", color: "var(--txt-dim)", maxWidth: 560, lineHeight: 1.75, marginBottom: "3rem", zIndex: 1 }}>
        Arman Phaugat — Backend Engineer &amp; AI Researcher at MUJ.<br />
        Focused on high-concurrency systems and Retrieval-Augmented Generation.
      </p>

      <div className="reveal reveal-d3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", zIndex: 1, marginBottom: "5rem" }}>
        <a href="#projects" className="btn-primary">Explore Work <span style={{ fontSize: "1rem" }}>↗</span></a>
        <a href="#contact" className="btn-ghost">Get In Touch</a>
        <a href="https://github.com/armanphaugat" target="_blank" rel="noreferrer" className="btn-ghost" style={{ borderColor: "rgba(221,183,255,0.15)" }}>GitHub</a>
        <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" className="btn-ghost" style={{ borderColor: "rgba(76,215,246,0.2)", color: "var(--secondary)" }}>LeetCode</a>
      </div>

      <div className="reveal reveal-d4" style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        border: "1px solid var(--border)", zIndex: 1,
        background: "rgba(17,17,17,0.6)", backdropFilter: "blur(10px)",
        maxWidth: 700,
      }}>
        {[["9.05","CGPA · Dean's Award","var(--primary)"],["900+","DSA Problems Solved","var(--secondary)"],["Top 0.3%","LeetCode Global","var(--primary)"],["12+","Projects Built","var(--secondary)"]].map(([n,l,c],i) => (
          <div key={l} style={{ padding: "1.5rem 1rem", textAlign: "center", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: c, letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--txt-dim)", marginTop: "0.35rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = ["Node.js","Redis","MySQL","BullMQ","Python","FastAPI","LangChain","FAISS","MongoDB","Docker","XGBoost","Scikit-learn","Groq","RAG","HuggingFace","JWT","Pandas","Streamlit","Pygame","System Design","ACID","DSA"];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "1rem 0", overflow: "hidden", background: "rgba(17,17,17,0.5)" }}>
      <div style={{ display: "inline-flex", animation: "marquee 35s linear infinite", whiteSpace: "nowrap" }}>
        {[...items,...items].map((item, i) => (
          <span key={i} style={{ padding: "0 2.5rem", display: "inline-flex", alignItems: "center", gap: "2.5rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--secondary)" : "var(--txt-dim)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {item} <span style={{ fontSize: "0.4rem", opacity: 0.4 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" style={{ maxWidth: 1200, margin: "0 auto", padding: "8rem 2rem" }}>
      <div className="reveal section-label" style={{ marginBottom: "1rem" }}>01 // ABOUT_ME</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="col-mob-1">
        <div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "2rem" }}>
            Passionate about<br />
            <span style={{ color: "var(--primary)" }}>Systems</span> &amp; <span style={{ color: "var(--secondary)" }}>Scale</span>
          </h2>
          <div className="reveal reveal-d2" style={{ fontSize: "1rem", color: "var(--txt-dim)", lineHeight: 1.85, display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <p>I'm a <strong style={{ color: "var(--txt)" }}>3rd-year CS student</strong> at Manipal University Jaipur (2023–2027) building the invisible engines that power modern applications. My focus is distributed systems, async processing, and bridging traditional backend architectures with LLMs.</p>
            <p>Core stack: <strong style={{ color: "var(--primary)" }}>Node.js, Redis, BullMQ, MySQL</strong> on the backend. AI apps with <strong style={{ color: "var(--secondary)" }}>LangChain, FAISS, Groq</strong>. ML models with Scikit-learn and XGBoost.</p>
            <p>I solve 900+ DSA problems because I genuinely love finding elegant solutions to hard problems. Ranked in the <strong style={{ color: "var(--primary)" }}>top 0.3% globally on LeetCode</strong>.</p>
          </div>
          <div className="reveal reveal-d3" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.8rem" }}>
            {["Open to Internships 2026","Available for Projects","LeetCode Top 0.3%"].map((t, i) => (
              <span key={t} className={i === 1 ? "chip-s" : "chip-p"} style={{ fontSize: "0.78rem", padding: "0.35rem 0.85rem" }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="reveal reveal-d2">
          <div className="glass glow-p" style={{ borderRadius: 12, padding: "1.8rem", marginBottom: "1.2rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--primary)", marginBottom: "1.2rem", letterSpacing: "0.1em" }}>SYSTEM_SPECS.LOG</div>
            {[["Education","B.Tech CSE · MUJ · 2023–2027"],["Location","Jaipur, Rajasthan, India"],["CGPA","9.05 / 10 · Dean's Excellence Award"],["Focus","Backend · AI/ML · Sys Design"],["LeetCode","Top 0.3% · 900+ Problems"],["Hackathon","MUJHackX Round 2 · 1300+ participants"],["Internship","Indavis Lifesciences · Jun–Jul 2025"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.65rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", gap: "1rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "var(--txt-dim)", flexShrink: 0 }}>{k}:</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "var(--txt)", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="glass" style={{ borderRadius: 12, padding: "1.5rem", background: "linear-gradient(135deg, rgba(17,17,17,0.9), rgba(25,10,40,0.9))", border: "1px solid rgba(221,183,255,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116"/></svg>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>armanphaugat20</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--txt-dim)" }}>leetcode.com</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "var(--primary)", letterSpacing: "-0.02em" }}>TOP 0.3%</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--txt-dim)" }}>GLOBAL RANK</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              {[["900+","Problems"],["120+","Max Streak"],["9+","Badges"],["All","Difficulties"]].map(([n, l]) => (
                <div key={l} style={{ background: "rgba(221,183,255,0.05)", border: "1px solid rgba(221,183,255,0.1)", borderRadius: 8, padding: "0.7rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "var(--primary)" }}>{n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "var(--txt-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─── */
function Experience() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 8rem" }}>
      <div className="reveal section-label" style={{ marginBottom: "1rem" }}>02 // PROFESSIONAL_HISTORY</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
        Where I've <span style={{ color: "var(--primary)" }}>Shipped</span>
      </h2>

      <div className="reveal reveal-d2 glass glow-p" style={{ borderRadius: 12, padding: "2.5rem", display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", alignItems: "start" }}>
        <div style={{ minWidth: 180 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "var(--primary)", marginBottom: "0.3rem" }}>JUN – JUL 2025</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem", color: "var(--txt-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Full-Time · On-site</div>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>Web Dev Intern</h3>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: "var(--secondary)", marginBottom: "1.2rem" }}>Indavis Lifesciences · Haridwar, India</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem" }}>
            {["Maintained and updated the company website ensuring smooth performance and content accuracy across all pages.", "Collaborated with cross-functional teams to align website updates with brand guidelines and business objectives.", "Managed content workflows, achieving consistent brand representation and user experience improvements."].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", fontSize: "0.95rem", color: "var(--txt-dim)", lineHeight: 1.7 }}>
                <span style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.2rem", fontSize: "0.6rem" }}>▶</span>{b}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {["Website Maintenance","Team Collaboration","Content Management","Brand Alignment"].map(t => <span key={t} className="chip-p">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="reveal reveal-d3" style={{
        marginTop: "1.5rem",
        background: "linear-gradient(135deg, rgba(25,10,40,0.9), rgba(10,30,40,0.9))",
        border: "1px solid rgba(221,183,255,0.2)",
        borderRadius: 12,
        padding: "2rem 2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem",
      }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--txt-dim)", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>CURRENTLY SEEKING</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>Summer Internship 2026</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: "var(--txt-dim)" }}>Backend · AI/ML · Full Stack</div>
        </div>
        <a href="mailto:armanphaugat20@gmail.com" className="btn-primary">Reach Out ↗</a>
      </div>
    </section>
  );
}

/* ─── PROJECT CARD ─── */
const PROJECTS = [
  { num:"01", name:"Real Time Stock Trading Backend", tag:"SYSTEM_ARCHITECTURE", category:"Backend", tagline:"High-concurrency order engine · live leaderboards · ACID-safe concurrency", highlights:["Redis Sorted Sets → <50ms leaderboard queries","BullMQ price engine with 30-min scheduled jobs","JWT auth + Token Bucket rate limiter","MySQL row-level locking for concurrent trades"], tech:["Node.js","Express","MySQL","Redis","BullMQ","Docker","Argon2"], youtube:"https://www.youtube.com/watch?v=IcetVmIat-w" },
  { num:"02", name:"RAG Discord Bot", tag:"ARTIFICIAL_INTELLIGENCE", category:"AI/ML", tagline:"FastAPI + LangChain · per-guild FAISS · Groq Llama 3.3", highlights:["Per-guild persistent FAISS vector stores with isolation","LCEL chain → Groq Llama 3.3 inference with rate limiting","PDF parsing + web scraping indexing pipeline","Multi-server permission gating + async handlers"], tech:["Python","FastAPI","LangChain","FAISS","Discord.py","Groq","HuggingFace"], discord:"https://discord.com/oauth2/authorize?client_id=1463510548808208415" },
  { num:"03", name:"Video Streaming & User Management", tag:"MEDIA_PIPELINES", category:"Backend", tagline:"YouTube-like backend · HLS adaptive streaming · JWT lifecycle", highlights:["HLS transcoding via ffmpeg (360p/720p adaptive bitrate)","JWT access + refresh token dual lifecycle","MongoDB aggregation pipelines for watch history","Cloudinary asset optimization"], tech:["Node.js","MongoDB","Express","Cloudinary","JWT","ffmpeg","Bcrypt"], youtube:"https://youtu.be/w6980_4fVSQ" },
  { num:"04", name:"Cricket Score Predictor", tag:"DATA_SCIENCE", category:"AI/ML", tagline:"Live IPL · T20 · ODI score prediction via XGBoost", highlights:["3 XGBoost models: IPL, T20, ODI formats","CricAPI live integration for real-time inference","Format-specific feature engineering + EDA"], tech:["Python","XGBoost","Scikit-learn","Streamlit","Pandas","CricAPI"] },
  { num:"05", name:"IPL Win Predictor", tag:"DATA_SCIENCE", category:"AI/ML", tagline:"Real-time IPL win probability via ML ensemble", highlights:["Logistic Regression + Random Forest ensemble","Dynamic win % via CRR/RRR/wickets features","Feature engineering on 4500+ rows of match data"], tech:["Python","Scikit-learn","Streamlit","Pandas","NumPy","Matplotlib"] },
  { num:"06", name:"Book Recommender System", tag:"ARTIFICIAL_INTELLIGENCE", category:"AI/ML", tagline:"Dual-mode: popularity filter + collaborative filtering", highlights:["Popularity: top 50 filtered by 250+ user ratings","Cosine similarity on pivot matrix for CF","Streamlit UI with covers + ratings display"], tech:["Python","Scikit-learn","Streamlit","Pandas","NumPy","Cosine Similarity"] },
  { num:"07", name:"WhatsApp Chat Analyser", tag:"DATA_SCIENCE", category:"AI/ML", tagline:"Upload export · visualize conversation trends & patterns", highlights:["Timeline analysis · daily/weekly/monthly breakdowns","Top emoji breakdown + WordCloud generation","Most active user leaderboard + heatmap"], tech:["Python","Streamlit","Pandas","Matplotlib","WordCloud","Regex"] },
  { num:"08", name:"Gamezo Discord Bot", tag:"BACKEND_BOT", category:"Backend", tagline:"Heavy backend bot · multi-game economy · live stock market", highlights:["SQLite3 persistence with async scheduling","Games: coin flip, airplane crash, rollover bets","Live stock market via REST API + hourly rewards system"], tech:["Python","Discord.py","SQLite3","asyncio","REST API"] },
  { num:"09", name:"Cuntrex — 2D Shooter Game", tag:"GAME_DEV", category:"Game", tagline:"Two-player 2D shooter built with Pygame from scratch", highlights:["Full game loop · sprite collision detection","Health bar real-time rendering + game states","Background music + SFX via Pygame mixer"], tech:["Python","Pygame","OOP","Game Loop","Sprite Animation"] },
  { num:"10", name:"RAG Bot Website", tag:"FRONTEND", category:"Frontend", tagline:"React showcase for the Discord RAG bot", highlights:["Scroll-triggered IntersectionObserver animations","Interactive feature tabs + zero CSS framework"], tech:["React","Vite","JavaScript","CSS","Lucide"], webapp:"https://gamezobot.netlify.app/", website:"https://armanphaugat.github.io/ragwebsite/" },
  { num:"11", name:"Todo App", tag:"ANDROID", category:"Android", tagline:"Android task manager · SQLite persistence · RecyclerView", highlights:["SQLite CRUD via custom DatabaseHelper","RecyclerView with live check/delete updates","View Binding · minSdk 21 · targetSdk 36"], tech:["Kotlin","Android","SQLite","RecyclerView","Gradle"] },
  { num:"12", name:"SalesForce UI Clone", tag:"FRONTEND", category:"Frontend", tagline:"Pixel-accurate Salesforce homepage clone · pure HTML/CSS", highlights:["Full layout: nav, hero, content strips","CSS-only responsive grid · brand-faithful typography"], tech:["HTML","CSS","Flexbox","Responsive Design"] },
];

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  const cat = Array.isArray(p.categories) ? p.categories[0] : p.category;
  const isAI = cat === "AI/ML";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`glass ${isAI ? "glow-s" : "glow-p"}`}
      style={{
        borderRadius: 12, padding: "1.8rem",
        display: "flex", flexDirection: "column",
        transition: "all 0.25s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
        background: hov ? (isAI ? "rgba(76,215,246,0.04)" : "rgba(221,183,255,0.04)") : "rgba(17,17,17,0.85)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span className={isAI ? "chip-s" : "chip-p"} style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}>{p.tag}</span>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>#{p.num}</span>
          {(p.youtube || p.webapp || p.website || p.discord) && (
            <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", color: isAI ? "var(--secondary)" : "var(--primary)", opacity: hov ? 1 : 0.4, transition: "opacity 0.2s" }}>↗</div>
          )}
        </div>
      </div>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.01em", marginBottom: "0.5rem", lineHeight: 1.35 }}>{p.name}</h3>
      <p style={{ fontSize: "0.85rem", color: "var(--txt-dim)", marginBottom: "1rem", lineHeight: 1.7 }}>{p.tagline}</p>
      <div style={{ flex: 1, marginBottom: "1rem" }}>
        {p.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.82rem", color: hov ? "rgba(229,226,225,0.75)" : "var(--txt-dim)", marginBottom: "0.3rem", lineHeight: 1.65 }}>
            <span style={{ color: isAI ? "var(--secondary)" : "var(--primary)", flexShrink: 0, fontSize: "0.5rem", marginTop: "0.4rem" }}>▶</span>{h}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1rem" }}>
        {p.tech.map(t => <span key={t} className={isAI ? "chip-s" : "chip-p"} style={{ fontSize: "0.68rem", color: hov ? (isAI ? "var(--secondary)" : "var(--primary)") : "var(--txt-dim)", borderColor: hov ? (isAI ? "rgba(76,215,246,0.35)" : "rgba(221,183,255,0.35)") : "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>{t}</span>)}
      </div>
      {(p.youtube || p.webapp || p.website || p.discord) && (
        <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.8rem", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {p.youtube && <a href={p.youtube} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.72rem", borderRadius: 6, background: "#cc0000", flex: 1, textAlign: "center", justifyContent: "center" }}>Demo ▶</a>}
          {p.webapp && <a href={p.webapp} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.72rem", borderRadius: 6, flex: 1, textAlign: "center", justifyContent: "center" }}>Live</a>}
          {p.website && <a href={p.website} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.72rem", borderRadius: 6, flex: 1, textAlign: "center", justifyContent: "center", background: "var(--primary-d)" }}>Site</a>}
          {p.discord && <a href={p.discord} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.72rem", borderRadius: 6, flex: 1, textAlign: "center", justifyContent: "center", background: "#5865f2" }}>Add Bot</a>}
        </div>
      )}
    </div>
  );
}

/* ─── PROJECTS ─── */
function Projects() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Backend", "AI/ML", "Frontend", "Game", "Android"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => {
    const c = Array.isArray(p.categories) ? p.categories : [p.category];
    return c.includes(filter);
  });

  return (
    <section id="projects" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 8rem" }}>
      <div className="reveal section-label" style={{ marginBottom: "1rem" }}>03 // SELECTED_PROJECTS</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <h2 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          System Builds &amp; <span style={{ color: "var(--primary)" }}>AI Implementations</span>
        </h2>
        <span className="reveal reveal-d1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--txt-dim)" }}>COUNT: {PROJECTS.length}_MODULES</span>
      </div>

      <div className="reveal reveal-d2" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        {cats.map(cat => {
          const isAI = cat === "AI/ML";
          const active = filter === cat;
          return (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: "0.4rem 1rem", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase",
              background: active ? (isAI ? "rgba(76,215,246,0.15)" : "rgba(221,183,255,0.15)") : "transparent",
              color: active ? (isAI ? "var(--secondary)" : "var(--primary)") : "var(--txt-dim)",
              border: active ? `1px solid ${isAI ? "var(--secondary)" : "var(--primary)"}` : "1px solid var(--border)",
              borderRadius: 6,
              transition: "all 0.15s",
            }}>{cat} ({cat === "All" ? PROJECTS.length : PROJECTS.filter(p => { const c = Array.isArray(p.categories) ? p.categories : [p.category]; return c.includes(cat); }).length})</button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.2rem" }}>
        {filtered.map(p => <ProjectCard key={p.num} p={p} />)}
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
const SKILL_BARS = [
  { name: "DSA / Competitive Programming", pct: 92, type: "p" },
  { name: "Node.js / Express", pct: 90, type: "p" },
  { name: "Python / FastAPI", pct: 88, type: "s" },
  { name: "MySQL / ACID Design", pct: 85, type: "p" },
  { name: "Redis / BullMQ", pct: 82, type: "p" },
  { name: "MongoDB", pct: 82, type: "s" },
  { name: "LangChain / RAG", pct: 80, type: "s" },
  { name: "Scikit-learn / XGBoost", pct: 78, type: "s" },
  { name: "Docker", pct: 75, type: "p" },
  { name: "React / Frontend", pct: 72, type: "p" },
];

const SKILL_GROUPS = [
  { label: "Languages", items: ["Python","JavaScript","C","C++","Java","HTML","CSS"], type: "p" },
  { label: "Backend", items: ["Node.js","Express.js","FastAPI","REST","JWT","Argon2"], type: "p" },
  { label: "Databases", items: ["MySQL","MongoDB","Redis","FAISS","SQLite3"], type: "s" },
  { label: "AI / ML", items: ["LangChain","HuggingFace","RAG","XGBoost","Scikit-learn","Groq"], type: "s" },
  { label: "DevOps", items: ["Docker","Git","GitHub","Postman","BullMQ"], type: "p" },
  { label: "Concepts", items: ["System Design","DSA","ACID","Caching","Rate Limiting","OOP"], type: "s" },
];

function SkillBar({ name, pct, type, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--txt)" }}>{name}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: type === "s" ? "var(--secondary)" : "var(--primary)" }}>{pct}%</span>
      </div>
      <div className="skill-bar">
        <div className={type === "s" ? "skill-bar-fill-s" : "skill-bar-fill-p"} style={{ width: vis ? `${pct}%` : "0%", transitionDelay: `${delay}s` }} />
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("bars");

  return (
    <section id="skills" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 8rem" }}>
      <div className="reveal section-label" style={{ marginBottom: "1rem" }}>04 // TECHNICAL_TOOLKIT</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
        My <span style={{ color: "var(--primary)" }}>Toolkit</span>
      </h2>

      {/* Only 2 tabs now — "Currently Exploring" removed */}
      <div className="reveal reveal-d2" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        {[["bars","Skill Bars"],["tags","Tech Tags"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: "0.4rem 1rem", cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em",
            background: tab === k ? "rgba(221,183,255,0.12)" : "transparent",
            color: tab === k ? "var(--primary)" : "var(--txt-dim)",
            border: tab === k ? "1px solid var(--primary)" : "1px solid var(--border)",
            borderRadius: 6, transition: "all 0.15s",
          }}>{l}</button>
        ))}
      </div>

      {tab === "bars" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 4rem" }} className="col-mob-1">
          {SKILL_BARS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 0.05} />)}
        </div>
      )}

      {tab === "tags" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className={`glass ${g.type === "s" ? "glow-s" : "glow-p"}`} style={{ borderRadius: 10, padding: "1.4rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: g.type === "s" ? "var(--secondary)" : "var(--primary)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.9rem" }}>{">"} {g.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {g.items.map(t => <span key={t} className={g.type === "s" ? "chip-s" : "chip-p"}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── TIMELINE ─── */
const TIMELINE = [
  { year:"Aug 2023", title:"Started B.Tech CSE", sub:"Manipal University Jaipur", desc:"Began CS degree. Immediately dove into DSA and competitive programming.", active: false },
  { year:"Dec 2023", title:"TLE Eliminators CP Level 1", sub:"Competitive Programming", desc:"Foundation in C++ and algorithmic thinking. Level 1 completed.", active: false },
  { year:"Mar 2024", title:"Dean's Excellence Award — Sem 1", sub:"9.05 CGPA", desc:"Awarded Dean's Excellence for outstanding academic performance across the semester.", active: false },
  { year:"Jun 2024", title:"Oracle DB + GFG OOP Certs", sub:"Certifications", desc:"Completed Oracle Database Design & OOP with Java from GeeksforGeeks.", active: false },
  { year:"Aug 2024", title:"500+ DSA Problems", sub:"LeetCode + Codeforces", desc:"Hit 500 milestone. Consistently solving medium-hard difficulty problems.", active: false },
  { year:"Nov 2024", title:"TLE Eliminators Level 2 & 3", sub:"Advanced Algorithms", desc:"Advanced graph theory, segment trees, DP optimizations completed.", active: false },
  { year:"Jan 2025", title:"Red Hat Sysadmin + NPTEL DAA", sub:"Dual Certifications", desc:"Red Hat Sysadmin I & II + NPTEL Design & Analysis of Algorithms.", active: false },
  { year:"Feb 2025", title:"MUJHackX Round 2", sub:"1300+ participants", desc:"Top performers among 1300+ participants at MUJHackX hackathon.", active: false },
  { year:"Mar 2025", title:"LeetCode Top 0.3%", sub:"Beats 99.7% globally", desc:"900+ problems solved. Ranked top 0.3% of all LeetCode users worldwide.", active: true },
  { year:"Jun 2025", title:"Web Dev Intern — Indavis", sub:"Haridwar · On-site", desc:"First professional internship. Real business constraints, production deployments.", active: false },
];

function Timeline() {
  return (
    <section id="timeline" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 8rem" }}>
      <div className="reveal section-label" style={{ marginBottom: "1rem" }}>05 // JOURNEY_LOG</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
        My <span style={{ color: "var(--primary)" }}>Timeline</span>
      </h2>

      <div style={{ position: "relative", maxWidth: 800, paddingLeft: "2rem" }}>
        <div style={{ position: "absolute", left: 0, top: 8, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(221,183,255,0.25) 5%, rgba(221,183,255,0.15) 95%, transparent)" }} />
        {TIMELINE.map((ev, i) => (
          <div key={i} className="reveal" style={{ position: "relative", marginBottom: "2.5rem" }}>
            {ev.active ? <div className="timeline-dot-active" /> : <div className="timeline-dot" />}
            <div style={{ paddingLeft: "1.2rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: ev.active ? "var(--primary)" : "var(--txt-dim)", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{ev.year}</div>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.15rem" }}>{ev.title}</h4>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: ev.active ? "var(--secondary)" : "rgba(221,183,255,0.45)", marginBottom: "0.4rem" }}>{ev.sub}</div>
              <p style={{ fontSize: "0.88rem", color: "var(--txt-dim)", lineHeight: 1.7, maxWidth: 540 }}>{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── ACHIEVEMENTS ─── */
function Achievements() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 8rem" }}>
      <div className="reveal section-label" style={{ marginBottom: "1rem" }}>06 // RECOGNITION</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
        Milestones &amp; <span style={{ color: "var(--primary)" }}>Awards</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.2rem" }}>
        {[
          { icon: "🏆", title: "Dean's Excellence Award", desc: "Received across multiple semesters for maintaining 9.0+ CGPA at MUJ.", type: "p" },
          { icon: "⚡", title: "Top 0.3% LeetCode", desc: "Ranked globally in the top 0.3% of all LeetCode users. Beats 99.7%.", type: "s" },
          { icon: "🔥", title: "900+ DSA Problems", desc: "Consistent competitive programming on LeetCode, Codeforces, and GFG.", type: "p" },
          { icon: "🚀", title: "MUJHackX Round 2", desc: "Qualified for Round 2 among 1300+ participants at MUJHackX.", type: "s" },
        ].map((a) => (
          <div key={a.title} className={`reveal glass ${a.type === "s" ? "glow-s" : "glow-p"}`} style={{ borderRadius: 12, padding: "1.8rem", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.9rem" }}>{a.icon}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>{a.title}</div>
            <div style={{ fontSize: "0.88rem", color: "var(--txt-dim)", lineHeight: 1.7 }}>{a.desc}</div>
          </div>
        ))}
      </div>

      <div className="reveal" style={{ marginTop: "1.5rem", background: "linear-gradient(135deg, rgba(15,5,30,0.95), rgba(5,15,25,0.95))", border: "1px solid rgba(221,183,255,0.2)", borderRadius: 12, padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", boxShadow: "0 0 40px rgba(221,183,255,0.05)" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--txt-dim)", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>LEETCODE_STATS</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "3rem", color: "var(--primary)", letterSpacing: "-0.04em", lineHeight: 1 }}>TOP <span style={{ color: "rgba(221,183,255,0.5)" }}>0.3%</span></div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "var(--txt-dim)", marginTop: "0.4rem" }}>Global Rank · 900+ Problems · Beats 99.7%</div>
        </div>
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
          {[["900+","Problems"],["Top 0.3%","Global Rank"],["120+","Max Streak"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "rgba(221,183,255,0.7)", letterSpacing: "-0.02em" }}>{n}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--txt-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.2rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText("armanphaugat20@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <section id="contact" style={{ background: "linear-gradient(180deg, var(--bg) 0%, rgba(15,5,30,0.95) 50%, var(--bg) 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(221,183,255,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal section-label" style={{ marginBottom: "1rem" }}>07 // ESTABLISH_CONNECTION</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="col-mob-1">
          <div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1.2rem" }}>
              Interested in a<br /><span style={{ color: "var(--primary)" }}>Collaboration?</span>
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: "1rem", color: "var(--txt-dim)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 420 }}>
              Currently seeking Software Engineering Internships for 2026. Let's discuss how I can contribute to your engineering team — Backend, AI/ML, or Full Stack.
            </p>

            <div className="reveal reveal-d3" style={{ display: "flex", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap", alignItems: "center" }}>
              <div className="glass" style={{ padding: "0.8rem 1.2rem", borderRadius: 8, flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--txt-dim)", marginBottom: "0.2rem" }}>PRIMARY_EMAIL</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>armanphaugat20@gmail.com</div>
              </div>
              <button onClick={copy} className="btn-primary" style={{ padding: "0.8rem 1.2rem", borderRadius: 8, whiteSpace: "nowrap", background: copied ? "var(--secondary)" : "var(--primary)", color: "var(--on-pri)" }}>
                {copied ? "Copied ✓" : "Copy Email"}
              </button>
            </div>

            <div className="reveal reveal-d4" style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {[
                { icon: "✉️", label: "Email", value: "armanphaugat20@gmail.com", href: "mailto:armanphaugat20@gmail.com", type: "p" },
                { icon: "📱", label: "Phone", value: "+91-9306115772", href: "tel:+919306115772", type: "p" },
                { icon: "🐙", label: "GitHub", value: "github.com/armanphaugat", href: "https://github.com/armanphaugat", type: "p" },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/armanphaugat05", href: "https://www.linkedin.com/in/armanphaugat05/", type: "s" },
                { icon: "🧩", label: "LeetCode", value: "Top 0.3% · armanphaugat20", href: "https://leetcode.com/u/armanphaugat20", type: "s" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`glass ${l.type === "s" ? "glow-s" : "glow-p"}`}
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1.2rem", borderRadius: 8, textDecoration: "none", color: "var(--txt)", transition: "all 0.2s" }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{l.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "var(--txt-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l.label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", marginTop: "0.1rem" }}>{l.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal reveal-d2">
            <div className="glass glow-p" style={{ borderRadius: 12, padding: "2rem", marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                <div style={{ position: "relative", width: 10, height: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--secondary)", boxShadow: "0 0 10px var(--secondary)" }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--secondary)", animation: "ripple 2s ease-out infinite" }} />
                </div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "var(--secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>OPEN TO OPPORTUNITIES</span>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Summer 2026 Internship</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: "var(--txt-dim)", marginBottom: "1.5rem" }}>Backend Engineering · AI/ML · Full Stack</div>
              {[["Availability","Full-time from May 2026"],["Format","Remote / Hybrid / On-site"],["Location","Jaipur, IN (Reloc. flexible)"],["Response","Usually within 24 hours"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--txt-dim)" }}>{k}:</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--txt)" }}>{v}</span>
                </div>
              ))}
              <a href="mailto:armanphaugat20@gmail.com?subject=Internship Opportunity 2026" className="btn-primary" style={{ width: "100%", marginTop: "1.5rem", justifyContent: "center", borderRadius: 8 }}>
                SEND_MESSAGE.EXE ↗
              </a>
            </div>

            <div className="glass" style={{ borderRadius: 12, padding: "1.5rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", lineHeight: 2, background: "rgba(5,5,10,0.9)" }}>
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.8rem" }}>
                {["#cc4444","#e8a44a","#2a7a5e"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>TERMINAL</span>
              </div>
              <div style={{ color: "var(--secondary)" }}>$ whoami</div>
              <div style={{ color: "var(--txt-dim)", paddingLeft: "1rem" }}>arman_phaugat · backend_engineer · ai_builder</div>
              <div style={{ color: "var(--secondary)" }}>$ skills --top</div>
              <div style={{ color: "var(--txt-dim)", paddingLeft: "1rem" }}>["Node.js", "Python", "Redis", "LangChain"]</div>
              <div style={{ color: "var(--secondary)" }}>$ leetcode --rank</div>
              <div style={{ color: "var(--primary)", paddingLeft: "1rem" }}>TOP 0.3% GLOBALLY · 900+ SOLVED</div>
              <div style={{ color: "var(--secondary)" }}>$ hire me <span className="terminal-cursor" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", background: "rgba(5,5,5,0.8)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--txt-dim)", textTransform: "uppercase" }}>
          © 2025 ARMAN_PHAUGAT · SYSTEM_VERSION: 2.0.25
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[["GitHub","https://github.com/armanphaugat"],["LinkedIn","https://www.linkedin.com/in/armanphaugat05/"],["LeetCode","https://leetcode.com/u/armanphaugat20"]].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--txt-dim)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--txt-dim)"}
            >{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "var(--txt-dim)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "var(--secondary)", fontSize: "0.7rem" }}>⬡</span> OPTIMIZED_FOR_PERFORMANCE
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  useReveal();
  return (
    <>
      <style>{G}</style>
      <div className="noise" />
      <ScrollBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
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