import { useState, useEffect, useRef } from "react";
import {
  Building2, RefreshCw, Brain, UploadCloud, Globe, Monitor,
  ShieldCheck, Cloud, Terminal, Github,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════
   DESIGN SYSTEM — MAXIMALIST / BRUTALIST POSTER
   Paper cream bg · pure ink black · acid lime + electric blue +
   hot pink accents · thick hard borders · offset drop shadows ·
   oversized chunky display type · rotated stickers · zig-zag rules
   ════════════════════════════════════════════════════════════ */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

  :root {
    --bg:      #f2eee2;
    --paper:   #ffffff;
    --ink:     #0a0a0a;
    --ink-70:  rgba(10,10,10,0.7);
    --ink-40:  rgba(10,10,10,0.4);
    --ink-12:  rgba(10,10,10,0.12);
    --lime:    #cdff4a;
    --lime-d:  #9fd612;
    --blue:    #2b3bff;
    --blue-l:  #d6dbff;
    --pink:    #ff3d7a;
    --pink-l:  #ffd9e5;
    --gold:    #ffb200;
  }

  *,*::before,*::after{ box-sizing:border-box; margin:0; padding:0; }
  html{ scroll-behavior:smooth; }
  body{
    background:var(--bg);
    color:var(--ink);
    font-family:'Inter',system-ui,sans-serif;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }
  ::selection{ background:var(--ink); color:var(--lime); }
  ::-webkit-scrollbar{ width:12px; }
  ::-webkit-scrollbar-track{ background:var(--bg); border-left:3px solid var(--ink); }
  ::-webkit-scrollbar-thumb{ background:var(--ink); border:3px solid var(--bg); }

  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes marquee-r { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes float { 0%,100%{transform:translateY(0) rotate(var(--r,0deg))} 50%{transform:translateY(-10px) rotate(var(--r,0deg))} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes bar-fill { from{width:0} }
  @keyframes pop-in { from{opacity:0; transform:scale(0.7) rotate(-8deg)} to{opacity:1; transform:scale(1) rotate(var(--r,0deg))} }
  @keyframes stripe-slide { 0%{background-position:0 0} 100%{background-position:80px 0} }
  @keyframes menu-drop { from{opacity:0; transform:translateY(-12px)} to{opacity:1; transform:translateY(0)} }

  .reveal{ opacity:0; transform:translateY(28px); transition:opacity .55s ease, transform .55s cubic-bezier(.2,.8,.2,1); }
  .reveal.visible{ opacity:1; transform:translateY(0); }
  .reveal-d1{ transition-delay:.06s; } .reveal-d2{ transition-delay:.14s; }
  .reveal-d3{ transition-delay:.22s; } .reveal-d4{ transition-delay:.30s; }

  /* ── hard-edge block system ── */
  .block{ border:3px solid var(--ink); background:var(--paper); }
  .hard{ box-shadow:7px 7px 0 var(--ink); }
  .hard-sm{ box-shadow:4px 4px 0 var(--ink); }
  .hard-lg{ box-shadow:12px 12px 0 var(--ink); }
  .hard-hover{ transition:transform .15s ease, box-shadow .15s ease; }
  .hard-hover:hover{ transform:translate(-4px,-4px); box-shadow:11px 11px 0 var(--ink); }

  .stripe-bg{
    background-image:repeating-linear-gradient(45deg, var(--lime) 0 26px, var(--bg) 26px 52px);
  }
  .stripe-bg-blue{
    background-image:repeating-linear-gradient(45deg, var(--blue-l) 0 26px, var(--paper) 26px 52px);
  }

  .tag{
    display:inline-flex; align-items:center; gap:.4rem;
    font-family:'JetBrains Mono',monospace; font-weight:700;
    font-size:.72rem; letter-spacing:.06em; text-transform:uppercase;
    padding:.32rem .8rem;
    border:2.5px solid var(--ink);
    background:var(--paper);
    white-space:nowrap;
  }
  .tag-lime{ background:var(--lime); }
  .tag-blue{ background:var(--blue); color:#fff; }
  .tag-pink{ background:var(--pink); color:#fff; }
  .tag-ink{ background:var(--ink); color:var(--lime); }

  .sticker{
    display:inline-flex; align-items:center; gap:.5rem;
    font-family:'Space Grotesk',sans-serif; font-weight:800;
    font-size:.85rem; letter-spacing:.03em; text-transform:uppercase;
    padding:.7rem 1.3rem;
    border:3px solid var(--ink);
    box-shadow:5px 5px 0 var(--ink);
  }

  .btn{
    display:inline-flex; align-items:center; gap:.55rem;
    font-family:'Space Grotesk',sans-serif; font-weight:800;
    font-size:.85rem; letter-spacing:.03em; text-transform:uppercase;
    padding:.9rem 1.6rem;
    border:3px solid var(--ink);
    cursor:pointer; text-decoration:none; color:var(--ink);
    background:var(--paper);
    box-shadow:6px 6px 0 var(--ink);
    transition:transform .12s ease, box-shadow .12s ease;
  }
  .btn:hover{ transform:translate(-3px,-3px); box-shadow:9px 9px 0 var(--ink); }
  .btn:active{ transform:translate(0,0); box-shadow:2px 2px 0 var(--ink); }
  .btn-lime{ background:var(--lime); }
  .btn-blue{ background:var(--blue); color:#fff; }
  .btn-pink{ background:var(--pink); color:#fff; }
  .btn-ink{ background:var(--ink); color:var(--lime); }

  .nav-link{
    font-family:'Space Grotesk',sans-serif; font-weight:700;
    font-size:.85rem; letter-spacing:.02em; text-transform:uppercase;
    color:#fff; text-decoration:none; position:relative; padding:.3rem 0;
  }
  .nav-link::after{
    content:''; position:absolute; left:0; bottom:-4px; height:3px; width:0;
    background:var(--lime); transition:width .2s ease;
  }
  .nav-link:hover{ color:var(--lime); }
  .nav-link:hover::after{ width:100%; }

  .mob-nav-link{
    font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:1.05rem;
    letter-spacing:.02em; text-transform:uppercase; color:var(--ink);
    text-decoration:none; display:block; padding:.9rem 1.1rem;
    border-bottom:2.5px solid var(--ink);
  }
  .mob-nav-link:hover{ background:var(--lime); }

  .section-label{
    display:inline-flex; align-items:center; gap:.6rem;
    font-family:'JetBrains Mono',monospace; font-weight:700; font-size:.78rem;
    letter-spacing:.14em; text-transform:uppercase;
    padding:.35rem .7rem; border:2.5px solid var(--ink); background:var(--paper);
  }

  .skill-bar-track{ height:16px; background:var(--paper); border:2.5px solid var(--ink); overflow:hidden; }
  .skill-bar-fill{ height:100%; width:0; transition:width 1.2s cubic-bezier(.2,.9,.2,1); border-right:2.5px solid var(--ink); }

  .mobile-menu{
    display:none; position:absolute; top:calc(100% + 0px); left:0; right:0;
    background:var(--bg); border-bottom:3px solid var(--ink);
    animation:menu-drop .2s ease; z-index:490;
  }
  .mobile-menu.open{ display:block; }

  .hamburger{
    display:none; flex-direction:column; justify-content:center; align-items:center;
    gap:5px; width:42px; height:42px; background:var(--lime);
    border:3px solid var(--ink); cursor:pointer; padding:0;
  }
  .hamburger span{ display:block; width:18px; height:2.5px; background:var(--ink); transition:all .2s ease; }
  .hamburger.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2){ opacity:0; }
  .hamburger.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }

  .marquee-strip{
    border-top:3px solid var(--ink); border-bottom:3px solid var(--ink);
    background:var(--ink); overflow:hidden; padding:.9rem 0;
  }
  .marquee-track{ display:inline-flex; white-space:nowrap; animation:marquee 32s linear infinite; }

  .torn-edge{
    position:relative;
  }
  .torn-edge::before{
    content:''; position:absolute; left:0; right:0; top:-12px; height:14px;
    background:
      linear-gradient(135deg, transparent 50%, var(--bg) 50%) 0 0/20px 20px,
      linear-gradient(-135deg, transparent 50%, var(--bg) 50%) 10px 0/20px 20px;
    background-repeat:repeat-x;
  }

  @media (max-width:768px){
    .hide-mob{ display:none !important; }
    .col-mob-1{ grid-template-columns:1fr !important; }
    .hamburger{ display:flex; }
    .hero-word{ font-size:16vw !important; }
  }
`;

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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 6, background: "var(--bg)", zIndex: 10001, borderBottom: "3px solid var(--ink)" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--lime)", transition: "width .05s linear" }} />
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
  useEffect(() => {
    const fn = () => { if (menuOpen) setMenuOpen(false); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [menuOpen]);

  const links = [["#about", "About"], ["#projects", "Projects"], ["#skills", "Toolkit"], ["#timeline", "Journey"], ["#contact", "Contact"]];

  return (
    <header style={{ position: "fixed", top: 6, left: 0, right: 0, zIndex: 500, background: "var(--ink)", borderBottom: "3px solid var(--ink)" }}>
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: ".6rem", textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, background: "var(--lime)", border: "3px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Archivo Black',sans-serif", fontSize: "1.1rem", color: "var(--ink)", transform: "rotate(-4deg)" }}>A</div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: ".95rem", letterSpacing: ".08em", color: "#fff", textTransform: "uppercase" }}>Arman.exe</span>
        </a>

        <div className="hide-mob" style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
          {links.map(([href, label]) => <a key={href} href={href} className="nav-link">{label}</a>)}
        </div>

        <a href="/ARMANRESUME.pdf" download className="hide-mob btn btn-lime" style={{ padding: ".55rem 1.1rem", fontSize: ".72rem" }}>↓ Resume</a>

        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>

        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {links.map(([href, label]) => <a key={href} href={href} className="mob-nav-link" onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href="/ARMANRESUME.pdf" download onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", margin: "1rem", padding: ".9rem", background: "var(--lime)", border: "3px solid var(--ink)", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: ".85rem", letterSpacing: ".05em", textTransform: "uppercase", textDecoration: "none", color: "var(--ink)" }}>↓ Download Resume</a>
        </div>
      </nav>
    </header>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["BACKEND ENGINEER", "AI / ML BUILDER", "SYSTEM ARCHITECT", "COMPETITIVE PROGRAMMER", "FOUNDER · NORI"];
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
    <section id="hero" className="stripe-bg" style={{ paddingTop: "7.5rem", position: "relative", overflow: "hidden", borderBottom: "3px solid var(--ink)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3.5rem 1.5rem 4rem", position: "relative" }}>

        <div className="reveal" style={{ display: "flex", gap: ".7rem", flexWrap: "wrap", marginBottom: "1.6rem" }}>
          <span className="tag tag-ink"><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)", animation: "blink 1.4s infinite" }} />STATUS: AVAILABLE_FOR_OPPORTUNITIES</span>
        </div>

        <h1 className="reveal reveal-d1 hero-word" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, fontSize: "clamp(3.2rem,11vw,9.5rem)", lineHeight: 0.85, letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "1.6rem" }}>
          <span style={{ WebkitTextStroke: "3px var(--ink)", color: "var(--bg)", display: "block" }}>ARMAN</span>
          <span style={{ display: "block", background: "var(--ink)", color: "var(--lime)", display: "inline-block", padding: "0 .15em", marginTop: ".05em" }}>PHAUGAT</span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem", alignItems: "start" }} className="col-mob-1">
          <div>
            <div className="reveal reveal-d2" style={{ marginBottom: "1.6rem", display: "flex", alignItems: "center", gap: ".6rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: "1.05rem", background: "var(--paper)", border: "2.5px solid var(--ink)", padding: ".5rem .9rem" }}>
                &gt; {typed}<span style={{ display: "inline-block", width: 9, height: "1em", background: "var(--ink)", marginLeft: 3, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
              </span>
            </div>

            <p className="reveal reveal-d2" style={{ fontSize: "1.15rem", fontWeight: 500, lineHeight: 1.6, maxWidth: 560, marginBottom: "2rem" }}>
              Backend Engineer, AI Researcher &amp; Founder of <strong style={{ background: "var(--pink)", color: "#fff", padding: "0 .3em" }}>Nori</strong> at MUJ. Building high-concurrency systems, Retrieval-Augmented Generation, and production-grade AI platforms.
            </p>

            <div className="reveal reveal-d3" style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
              <a href="#vaultbot" className="btn btn-pink">Nori ⚡</a>
              <a href="#projects" className="btn btn-blue">Explore Work ↗</a>
              <a href="#contact" className="btn">Get In Touch</a>
              <a href="https://github.com/armanphaugat" target="_blank" rel="noreferrer" className="btn">GitHub</a>
              <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" className="btn btn-lime">LeetCode</a>
            </div>
          </div>

          <a href="#vaultbot" className="reveal reveal-d3" style={{ textDecoration: "none", color: "var(--ink)", justifySelf: "end", transform: "rotate(3deg)" }}>
            <div className="sticker" style={{ background: "var(--gold)", flexDirection: "column", alignItems: "flex-start", gap: ".2rem", maxWidth: 230 }}>
              <span style={{ fontSize: "1.6rem" }}>⚡</span>
              <span>Founder &amp; Architect</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".68rem", textTransform: "none" }}>Nori · RAG AI Platform · 13,300+ LOC ↓</span>
            </div>
          </a>
        </div>

        <div className="reveal reveal-d4 block hard" style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "var(--ink)" }}>
          {[["9.05", "CGPA · DEAN'S AWARD", "var(--lime)"], ["900+", "DSA PROBLEMS SOLVED", "#fff"], ["TOP 0.3%", "LEETCODE GLOBAL", "var(--lime)"], ["12+", "PROJECTS BUILT", "#fff"]].map(([n, l, c], i) => (
            <div key={l} style={{ padding: "1.6rem 1rem", textAlign: "center", borderRight: i < 3 ? "3px solid var(--paper)" : "none" }}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: "1.7rem", color: c, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", color: "rgba(255,255,255,0.7)", marginTop: ".5rem", letterSpacing: ".06em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MARQUEE ─────────────── */
function Marquee() {
  const items = ["Node.js", "Redis", "MySQL", "BullMQ", "Python", "FastAPI", "LangChain", "FAISS", "MongoDB", "Docker", "XGBoost", "Scikit-learn", "Groq", "RAG", "HuggingFace", "JWT", "Pandas", "Streamlit", "Pygame", "System Design", "ACID", "DSA"];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ padding: "0 2rem", display: "inline-flex", alignItems: "center", gap: "2rem", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem", color: i % 3 === 0 ? "var(--lime)" : i % 3 === 1 ? "#fff" : "var(--pink)", letterSpacing: ".03em", textTransform: "uppercase" }}>
            {item} <span style={{ color: "var(--lime)" }}>✦</span>
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
      <div className="reveal section-label tag-lime" style={{ marginBottom: "1.4rem" }}>01 // ABOUT_ME</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }} className="col-mob-1">
        <div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", lineHeight: 0.95, marginBottom: "1.8rem" }}>
            Passionate about<br /><span style={{ background: "var(--blue)", color: "#fff", padding: "0 .2em" }}>Systems</span> &amp; <span style={{ background: "var(--pink)", color: "#fff", padding: "0 .2em" }}>Scale</span>
          </h2>
          <div className="reveal reveal-d2" style={{ fontSize: "1.02rem", lineHeight: 1.85, display: "flex", flexDirection: "column", gap: "1.1rem", fontWeight: 500 }}>
            <p>I'm a <strong>3rd-year CS student</strong> at Manipal University Jaipur (2023–2027) building the invisible engines that power modern applications. My focus is distributed systems, async processing, and bridging traditional backend architectures with LLMs.</p>
            <p>Core stack: <strong>Node.js, Redis, BullMQ, MySQL</strong> on the backend. AI apps with <strong>LangChain, FAISS, Groq</strong>. ML models with Scikit-learn and XGBoost.</p>
            <p>I also <strong style={{ background: "var(--gold)", padding: "0 .2em" }}>founded Nori</strong> — a production-grade multi-tenant RAG AI platform with 13,300+ lines of code, spanning a FastAPI backend, Discord bot, React dashboard, and BullMQ worker system.</p>
            <p>I solve 900+ DSA problems because I genuinely love finding elegant solutions to hard problems. Ranked in the <strong>top 0.3% globally on LeetCode</strong>.</p>
          </div>
          <div className="reveal reveal-d3" style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.8rem" }}>
            {[["Open to Internships 2026", "tag-lime"], ["Available for Projects", "tag-blue"], ["LeetCode Top 0.3%", ""], ["Founder · Nori", "tag-pink"]].map(([t, c]) => (
              <span key={t} className={`tag ${c}`}>{t}</span>
            ))}
          </div>
        </div>

        <div className="reveal reveal-d2">
          <div className="block hard" style={{ padding: "1.6rem", marginBottom: "1.4rem" }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: ".82rem", background: "var(--ink)", color: "var(--lime)", display: "inline-block", padding: ".3rem .7rem", marginBottom: "1.2rem", letterSpacing: ".06em", textTransform: "uppercase" }}>SYSTEM_SPECS.LOG</div>
            {[["Education", "B.Tech CSE · MUJ · 2023–2027"], ["Location", "Jaipur, Rajasthan, India"], ["CGPA", "9.05 / 10 · Dean's Excellence Award"], ["Focus", "Backend · AI/ML · Sys Design"], ["LeetCode", "Top 0.3% · 900+ Problems"], ["Hackathon", "MUJHackX Round 2 · 1300+ participants"], ["Internship", "Indavis Lifesciences · Jun–Jul 2025"], ["Founder", "Nori · RAG AI Platform · 13,300 LOC"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".6rem 0", borderBottom: "2px dashed var(--ink-12)", gap: "1rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", fontWeight: 700, color: k === "Founder" ? "var(--pink)" : "var(--ink-70)", flexShrink: 0 }}>{k}:</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", fontWeight: 600, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="block hard" style={{ padding: "1.4rem", background: "var(--blue)", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1rem" }}>
              <div style={{ width: 36, height: 36, background: "#fff", border: "2.5px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: ".92rem" }}>armanphaugat20</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", opacity: .8 }}>leetcode.com</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: "1.15rem", color: "var(--lime)" }}>TOP 0.3%</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", opacity: .8 }}>GLOBAL RANK</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }}>
              {[["900+", "Problems"], ["120+", "Max Streak"], ["9+", "Badges"], ["All", "Difficulties"]].map(([n, l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.4)", padding: ".7rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: "1.1rem" }}>{n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", opacity: .85, textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
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
      <div className="reveal section-label tag-blue" style={{ marginBottom: "1.4rem" }}>02 // PROFESSIONAL_HISTORY</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", marginBottom: "2rem" }}>
        Where I've <span style={{ background: "var(--lime)", padding: "0 .2em" }}>Shipped</span>
      </h2>

      <div className="reveal reveal-d2 block hard" style={{ padding: "2.2rem", display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem" }}>
        <div style={{ minWidth: 170 }}>
          <div className="tag tag-ink" style={{ marginBottom: ".5rem" }}>JUN – JUL 2025</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", fontWeight: 700, color: "var(--ink-70)", textTransform: "uppercase" }}>Full-Time · On-site</div>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.35rem", marginBottom: ".3rem" }}>Web Dev Intern</h3>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: ".82rem", color: "var(--blue)", marginBottom: "1.2rem" }}>Indavis Lifesciences · Haridwar, India</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", marginBottom: "1.2rem" }}>
            {["Maintained and updated the company website ensuring smooth performance and content accuracy across all pages.", "Collaborated with cross-functional teams to align website updates with brand guidelines and business objectives.", "Managed content workflows, achieving consistent brand representation and user experience improvements."].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: ".7rem", fontSize: ".95rem", fontWeight: 500, lineHeight: 1.7 }}>
                <span style={{ fontWeight: 900, color: "var(--pink)" }}>▶</span>{b}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            {["Website Maintenance", "Team Collaboration", "Content Management", "Brand Alignment"].map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="reveal reveal-d3 block hard" style={{ marginTop: "1.4rem", background: "var(--pink)", color: "#fff", padding: "1.8rem 2.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", letterSpacing: ".1em", marginBottom: ".5rem", opacity: .85 }}>CURRENTLY SEEKING</div>
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: "1.5rem", marginBottom: ".3rem" }}>Summer Internship 2026</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".82rem", opacity: .9 }}>Backend · AI/ML · Full Stack</div>
        </div>
        <a href="mailto:armanphaugat20@gmail.com" className="btn btn-lime" style={{ color: "var(--ink)" }}>Reach Out ↗</a>
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
    <section id="vaultbot" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 5rem" }}>
      <div className="reveal section-label tag-pink" style={{ marginBottom: "1.4rem" }}>03 // FLAGSHIP_PROJECT</div>
      <div className="reveal reveal-d1" style={{ marginBottom: "2.2rem" }}>
        <h2 style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", marginBottom: ".5rem" }}>
          The Project I <span style={{ background: "var(--gold)", padding: "0 .2em" }}>Founded</span>
        </h2>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".85rem" }}>Not just built — designed, architected, and shipped from zero.</p>
      </div>

      <div className="reveal reveal-d2 block hard-lg" style={{ background: "var(--ink)", color: "#fff", overflow: "hidden" }}>
        <div style={{ padding: "2.2rem 2.2rem 1.8rem", borderBottom: "3px solid var(--lime)", background: "linear-gradient(135deg, rgba(205,255,74,0.06), rgba(255,61,122,0.06))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1.4rem", marginBottom: "1.6rem" }}>
            <div>
              <div style={{ display: "flex", gap: ".6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span className="tag tag-lime" style={{ color: "var(--ink)" }}>Founder &amp; Sole Architect</span>
                <span className="tag" style={{ background: "transparent", color: "#fff", borderColor: "#fff" }}>Backend Engineer</span>
                <span className="tag" style={{ background: "transparent", color: "#fff", borderColor: "#fff" }}>AI Backend Engineer</span>
              </div>
              <h3 style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(2.4rem,6vw,4.2rem)", lineHeight: 0.9, color: "var(--lime)", marginBottom: ".6rem" }}>Nori</h3>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: ".88rem", color: "var(--pink)", marginBottom: ".6rem" }}>Production-Grade Multi-Tenant RAG Support Bot</p>
              <p style={{ fontSize: "1rem", opacity: .85, lineHeight: 1.75, maxWidth: 600 }}>A full-stack, multi-service RAG platform that brings server-specific, context-aware support to Discord communities. Every architectural decision was designed and built solo.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", minWidth: 160 }}>
              {[["13,300+", "Lines of Code"], ["4", "Services"], ["20+", "Tech Stack"]].map(([n, l]) => (
                <div key={l} className="block" style={{ background: "rgba(255,255,255,0.06)", border: "2.5px solid var(--lime)", padding: ".9rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: n.length > 3 ? "1.7rem" : "1.4rem", color: "var(--lime)" }}>{n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", opacity: .8, textTransform: "uppercase", letterSpacing: ".08em", marginTop: ".2rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {[["FastAPI Backend", Terminal], ["Discord Bot", Terminal], ["React Dashboard", Monitor], ["BullMQ Worker", RefreshCw], ["Redis Cache", RefreshCw], ["Supabase Postgres", Building2], ["Docker Compose", Cloud], ["Oracle Cloud", Cloud]].map(([label, Icon]) => (
              <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", border: "2px solid rgba(255,255,255,0.3)", padding: ".3rem .7rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", fontWeight: 600 }}>
                <Icon size={13} strokeWidth={2} /> {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "2.2rem" }}>
          <div style={{ marginBottom: "2.2rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", color: "var(--lime)", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "1.3rem" }}>// ENGINEERING_HIGHLIGHTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: ".9rem" }}>
              {VAULT_HIGHLIGHTS.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} style={{ background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.15)", padding: "1.2rem", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--pink)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
                    <div style={{ marginBottom: ".6rem", color: "var(--pink)" }}><Icon size={20} strokeWidth={1.75} /></div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: ".86rem", marginBottom: ".4rem" }}>{h.title}</div>
                    <div style={{ fontSize: ".8rem", opacity: .75, lineHeight: 1.65 }}>{h.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: "2.2rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", color: "var(--lime)", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "1.1rem" }}>// FULL_TECH_STACK</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}>
              {VAULT_TECH.map((t) => {
                const Icon = t.icon;
                return <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", border: "2px solid rgba(205,255,74,0.35)", padding: ".4rem .75rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", color: "var(--lime)" }}><Icon size={13} strokeWidth={2} />{t.label}</span>;
              })}
            </div>
          </div>

          <div style={{ background: "rgba(0,0,0,0.5)", border: "2px solid rgba(255,255,255,0.15)", padding: "1.4rem", marginBottom: "1.8rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", lineHeight: 2 }}>
            <div style={{ display: "flex", gap: ".4rem", marginBottom: ".8rem" }}>
              {["#ff3d7a", "#ffb200", "#cdff4a"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              <span style={{ marginLeft: ".5rem", fontSize: ".7rem", opacity: .4, letterSpacing: ".1em" }}>ARCHITECTURE.OVERVIEW</span>
            </div>
            <div style={{ color: "var(--lime)" }}>$ docker compose ps</div>
            <div style={{ opacity: .75, paddingLeft: "1rem" }}>
              <div><span style={{ color: "var(--pink)" }}>backend</span>&nbsp;&nbsp;&nbsp;→ FastAPI + Discord bot · port 8000</div>
              <div><span style={{ color: "var(--pink)" }}>frontend</span>&nbsp;&nbsp;→ React dashboard (nginx) · port 3000</div>
              <div><span style={{ color: "var(--pink)" }}>redis</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Key rotation cache · port 6379</div>
              <div><span style={{ color: "var(--pink)" }}>bullmq</span>&nbsp;&nbsp;&nbsp;→ API key worker (5 min cycle)</div>
            </div>
            <div style={{ color: "var(--lime)", marginTop: ".3rem" }}>$ wc -l **/*.py **/*.jsx **/*.js</div>
            <div style={{ opacity: .75, paddingLeft: "1rem" }}>
              <div>Arman Phaugat&nbsp;&nbsp;&nbsp;→ Founder &amp; Lead Architect</div>
              <div>Aayushi Chhabra → Co-Founder &amp; Core Contributor (Frontend · Backend · AI)</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap" }}>
            <a href="https://noribot.dev/?page=landing" target="_blank" rel="noreferrer" className="btn btn-pink">Add Nori to Discord</a>
            <a href="https://github.com/armanphaugat" target="_blank" rel="noreferrer" className="btn" style={{ background: "transparent", color: "#fff", borderColor: "#fff", boxShadow: "6px 6px 0 rgba(255,255,255,0.3)" }}><Github size={14} /> View Source</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PROJECTS DATA ─────────────── */
const PROJECTS = [
  { num: "01", name: "Real Time Stock Trading Backend", tag: "SYSTEM_ARCHITECTURE", category: "Backend", tagline: "High-concurrency order engine · live leaderboards · ACID-safe concurrency", highlights: ["Redis Sorted Sets → <50ms leaderboard queries", "BullMQ price engine with 30-min scheduled jobs", "JWT auth + Token Bucket rate limiter", "MySQL row-level locking for concurrent trades"], tech: ["Node.js", "Express", "MySQL", "Redis", "BullMQ", "Docker", "Argon2"], youtube: "https://www.youtube.com/watch?v=IcetVmIat-w" },
  { num: "02", name: "RAG Discord Bot (Original)", tag: "ARTIFICIAL_INTELLIGENCE", category: "AI/ML", tagline: "FastAPI + LangChain · per-guild FAISS · Groq Llama 3.3", highlights: ["Per-guild persistent FAISS vector stores with isolation", "LCEL chain → Groq Llama 3.3 inference with rate limiting", "PDF parsing + web scraping indexing pipeline", "Multi-server permission gating + async handlers"], tech: ["Python", "FastAPI", "LangChain", "FAISS", "Discord.py", "Groq", "HuggingFace"], discord: "https://noribot.dev/?page=landing" },
  { num: "03", name: "Video Streaming & User Management", tag: "MEDIA_PIPELINES", category: "Backend", tagline: "YouTube-like backend · HLS adaptive streaming · JWT lifecycle", highlights: ["HLS transcoding via ffmpeg (360p/720p adaptive bitrate)", "JWT access + refresh token dual lifecycle", "MongoDB aggregation pipelines for watch history", "Cloudinary asset optimization"], tech: ["Node.js", "MongoDB", "Express", "Cloudinary", "JWT", "ffmpeg", "Bcrypt"], youtube: "https://youtu.be/w6980_4fVSQ" },
  { num: "04", name: "Cricket Score Predictor", tag: "DATA_SCIENCE", category: "AI/ML", tagline: "Live IPL · T20 · ODI score prediction via XGBoost", highlights: ["3 XGBoost models: IPL, T20, ODI formats", "CricAPI live integration for real-time inference", "Format-specific feature engineering + EDA"], tech: ["Python", "XGBoost", "Scikit-learn", "Streamlit", "Pandas", "CricAPI"] },
  { num: "05", name: "IPL Win Predictor", tag: "DATA_SCIENCE", category: "AI/ML", tagline: "Real-time IPL win probability via ML ensemble", highlights: ["Logistic Regression + Random Forest ensemble", "Dynamic win % via CRR/RRR/wickets features", "Feature engineering on 4500+ rows of match data"], tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Matplotlib"] },
  { num: "06", name: "Book Recommender System", tag: "ARTIFICIAL_INTELLIGENCE", category: "AI/ML", tagline: "Dual-mode: popularity filter + collaborative filtering", highlights: ["Popularity: top 50 filtered by 250+ user ratings", "Cosine similarity on pivot matrix for CF", "Streamlit UI with covers + ratings display"], tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Cosine Similarity"] },
  { num: "07", name: "WhatsApp Chat Analyser", tag: "DATA_SCIENCE", category: "AI/ML", tagline: "Upload export · visualize conversation trends & patterns", highlights: ["Timeline analysis · daily/weekly/monthly breakdowns", "Top emoji breakdown + WordCloud generation", "Most active user leaderboard + heatmap"], tech: ["Python", "Streamlit", "Pandas", "Matplotlib", "WordCloud", "Regex"] },
  { num: "08", name: "Gamezo Discord Bot", tag: "BACKEND_BOT", category: "Backend", tagline: "Heavy backend bot · multi-game economy · live stock market", highlights: ["SQLite3 persistence with async scheduling", "Games: coin flip, airplane crash, rollover bets", "Live stock market via REST API + hourly rewards system"], tech: ["Python", "Discord.py", "SQLite3", "asyncio", "REST API"] },
  { num: "09", name: "Cuntrex — 2D Shooter Game", tag: "GAME_DEV", category: "Game", tagline: "Two-player 2D shooter built with Pygame from scratch", highlights: ["Full game loop · sprite collision detection", "Health bar real-time rendering + game states", "Background music + SFX via Pygame mixer"], tech: ["Python", "Pygame", "OOP", "Game Loop", "Sprite Animation"] },
  { num: "10", name: "RAG Bot Website", tag: "FRONTEND", category: "Frontend", tagline: "React showcase for the Discord RAG bot", highlights: ["Scroll-triggered IntersectionObserver animations", "Interactive feature tabs + zero CSS framework"], tech: ["React", "Vite", "JavaScript", "CSS", "Lucide"], webapp: "https://gamezobot.netlify.app/", website: "https://armanphaugat.github.io/ragwebsite/" },
  { num: "11", name: "Todo App", tag: "ANDROID", category: "Android", tagline: "Android task manager · SQLite persistence · RecyclerView", highlights: ["SQLite CRUD via custom DatabaseHelper", "RecyclerView with live check/delete updates", "View Binding · minSdk 21 · targetSdk 36"], tech: ["Kotlin", "Android", "SQLite", "RecyclerView", "Gradle"] },
  { num: "12", name: "SalesForce UI Clone", tag: "FRONTEND", category: "Frontend", tagline: "Pixel-accurate Salesforce homepage clone · pure HTML/CSS", highlights: ["Full layout: nav, hero, content strips", "CSS-only responsive grid · brand-faithful typography"], tech: ["HTML", "CSS", "Flexbox", "Responsive Design"] },
];

const CAT_COLOR = { Backend: "var(--blue)", "AI/ML": "var(--pink)", Frontend: "var(--gold)", Game: "var(--lime-d)", Android: "var(--lime-d)" };

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  const cat = Array.isArray(p.categories) ? p.categories[0] : p.category;
  const accent = CAT_COLOR[cat] || "var(--ink)";
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="block hard-hover"
      style={{ padding: "1.6rem", display: "flex", flexDirection: "column", boxShadow: hov ? "9px 9px 0 var(--ink)" : "5px 5px 0 var(--ink)", transform: hov ? "translate(-3px,-3px)" : "none", background: hov ? "var(--paper)" : "var(--paper)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".9rem" }}>
        <span className="tag" style={{ background: accent, color: cat === "Frontend" || cat === "Game" || cat === "Android" ? "var(--ink)" : "#fff", borderColor: "var(--ink)", fontSize: ".6rem" }}>{p.tag}</span>
        <div style={{ display: "flex", gap: ".7rem", alignItems: "center" }}>
          <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: "1.1rem", color: "var(--ink-12)" }}>{p.num}</span>
          {(p.youtube || p.webapp || p.website || p.discord) && <span style={{ fontSize: "1rem", opacity: hov ? 1 : .3 }}>↗</span>}
        </div>
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.05rem", marginBottom: ".5rem", lineHeight: 1.3 }}>{p.name}</h3>
      <p style={{ fontSize: ".85rem", fontWeight: 500, marginBottom: "1rem", lineHeight: 1.6, opacity: .8 }}>{p.tagline}</p>
      <div style={{ flex: 1, marginBottom: "1rem" }}>
        {p.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", gap: ".5rem", fontSize: ".8rem", fontWeight: 500, marginBottom: ".3rem", lineHeight: 1.6 }}>
            <span style={{ color: accent, fontWeight: 900 }}>▶</span>{h}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginBottom: "1rem" }}>
        {p.tech.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", fontWeight: 600, border: "1.5px solid var(--ink-40)", padding: ".2rem .5rem" }}>{t}</span>)}
      </div>
      {(p.youtube || p.webapp || p.website || p.discord) && (
        <div style={{ display: "flex", gap: ".5rem", paddingTop: ".9rem", borderTop: "2px dashed var(--ink-12)" }}>
          {p.youtube && <a href={p.youtube} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn" style={{ padding: ".4rem .8rem", fontSize: ".68rem", flex: 1, justifyContent: "center", background: "#ff0000", color: "#fff", boxShadow: "3px 3px 0 var(--ink)" }}>Demo ▶</a>}
          {p.webapp && <a href={p.webapp} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn btn-lime" style={{ padding: ".4rem .8rem", fontSize: ".68rem", flex: 1, justifyContent: "center", boxShadow: "3px 3px 0 var(--ink)" }}>Live</a>}
          {p.website && <a href={p.website} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn btn-blue" style={{ padding: ".4rem .8rem", fontSize: ".68rem", flex: 1, justifyContent: "center", boxShadow: "3px 3px 0 var(--ink)" }}>Site</a>}
          {p.discord && <a href={p.discord} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn" style={{ padding: ".4rem .8rem", fontSize: ".68rem", flex: 1, justifyContent: "center", background: "#5865f2", color: "#fff", boxShadow: "3px 3px 0 var(--ink)" }}>Add Bot</a>}
        </div>
      )}
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Backend", "AI/ML", "Frontend", "Game", "Android"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => {
    const c = Array.isArray(p.categories) ? p.categories : [p.category];
    return c.includes(filter);
  });

  return (
    <section id="projects" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal section-label" style={{ marginBottom: "1.4rem" }}>04 // OTHER_PROJECTS</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "1.8rem" }}>
        <h2 className="reveal reveal-d1" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(1.8rem,3.2vw,2.6rem)" }}>
          More System Builds &amp; <span style={{ background: "var(--blue)", color: "#fff", padding: "0 .2em" }}>AI Implementations</span>
        </h2>
        <span className="reveal reveal-d1 tag">COUNT: {PROJECTS.length}_MODULES</span>
      </div>

      <div className="reveal reveal-d2" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.2rem" }}>
        {cats.map(cat => {
          const active = filter === cat;
          const accent = CAT_COLOR[cat] || "var(--ink)";
          return (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: ".5rem 1.1rem", cursor: "pointer",
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".03em", textTransform: "uppercase",
              background: active ? accent : "var(--paper)",
              color: active ? (cat === "Frontend" || cat === "Game" || cat === "Android" ? "var(--ink)" : "#fff") : "var(--ink)",
              border: "2.5px solid var(--ink)",
              boxShadow: active ? "4px 4px 0 var(--ink)" : "none",
              transform: active ? "translate(-2px,-2px)" : "none",
              transition: "all .12s",
            }}>{cat} ({cat === "All" ? PROJECTS.length : PROJECTS.filter(p => { const c = Array.isArray(p.categories) ? p.categories : [p.category]; return c.includes(cat); }).length})</button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.4rem 1.2rem" }}>
        {filtered.map(p => <ProjectCard key={p.num} p={p} />)}
      </div>
    </section>
  );
}

/* ─────────────── SKILLS ─────────────── */
const SKILL_BARS = [
  { name: "DSA / Competitive Programming", pct: 92, c: "var(--pink)" },
  { name: "Node.js / Express", pct: 90, c: "var(--blue)" },
  { name: "Python / FastAPI", pct: 88, c: "var(--lime-d)" },
  { name: "MySQL / ACID Design", pct: 85, c: "var(--blue)" },
  { name: "Redis / BullMQ", pct: 82, c: "var(--pink)" },
  { name: "MongoDB", pct: 82, c: "var(--lime-d)" },
  { name: "LangChain / RAG", pct: 80, c: "var(--blue)" },
  { name: "Scikit-learn / XGBoost", pct: 78, c: "var(--pink)" },
  { name: "Docker", pct: 75, c: "var(--lime-d)" },
  { name: "React / Frontend", pct: 72, c: "var(--blue)" },
];

const SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "JavaScript", "C", "C++", "Java", "HTML", "CSS"], c: "var(--blue)" },
  { label: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST", "JWT", "Argon2"], c: "var(--pink)" },
  { label: "Databases", items: ["MySQL", "MongoDB", "Redis", "FAISS", "SQLite3", "Supabase"], c: "var(--gold)" },
  { label: "AI / ML", items: ["LangChain", "HuggingFace", "RAG", "XGBoost", "Scikit-learn", "Groq", "Graphlit", "Tavily", "Exa AI"], c: "var(--blue)" },
  { label: "DevOps", items: ["Docker", "Git", "GitHub", "Postman", "BullMQ", "nginx", "Oracle Cloud"], c: "var(--pink)" },
  { label: "Concepts", items: ["System Design", "DSA", "ACID", "Caching", "Rate Limiting", "OOP", "Multi-Tenancy"], c: "var(--gold)" },
];

function SkillBar({ name, pct, c, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: ".85rem" }}>{name}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: ".82rem" }}>{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: vis ? `${pct}%` : "0%", background: c, transitionDelay: `${delay}s` }} />
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("bars");
  return (
    <section id="skills" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal section-label tag-lime" style={{ marginBottom: "1.4rem" }}>05 // TECHNICAL_TOOLKIT</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", marginBottom: "1.8rem" }}>
        My <span style={{ background: "var(--pink)", color: "#fff", padding: "0 .2em" }}>Toolkit</span>
      </h2>

      <div className="reveal reveal-d2" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.2rem" }}>
        {[["bars", "Skill Bars"], ["tags", "Tech Tags"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: ".5rem 1.1rem", cursor: "pointer",
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".03em", textTransform: "uppercase",
            background: tab === k ? "var(--lime)" : "var(--paper)", border: "2.5px solid var(--ink)",
            boxShadow: tab === k ? "4px 4px 0 var(--ink)" : "none", transform: tab === k ? "translate(-2px,-2px)" : "none", transition: "all .12s",
          }}>{l}</button>
        ))}
      </div>

      {tab === "bars" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 3.5rem" }} className="col-mob-1">
          {SKILL_BARS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 0.05} />)}
        </div>
      )}

      {tab === "tags" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: ".9rem" }}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className="block hard-sm" style={{ padding: "1.3rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".8rem", color: g.c }}>&gt; {g.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem" }}>
                {g.items.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", fontWeight: 600, border: "1.5px solid var(--ink)", padding: ".22rem .55rem" }}>{t}</span>)}
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
      <div className="reveal section-label tag-blue" style={{ marginBottom: "1.4rem" }}>06 // JOURNEY_LOG</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", marginBottom: "2.6rem" }}>
        My <span style={{ background: "var(--lime)", padding: "0 .2em" }}>Timeline</span>
      </h2>

      <div style={{ position: "relative", maxWidth: 820, paddingLeft: "2.2rem", borderLeft: "3px solid var(--ink)" }}>
        {TIMELINE.map((ev, i) => (
          <div key={i} className="reveal" style={{ position: "relative", marginBottom: "2.2rem", marginLeft: "1.4rem" }}>
            <div style={{
              position: "absolute", left: "-2.85rem", top: 2, width: 16, height: 16,
              background: ev.hot ? "var(--pink)" : "var(--paper)", border: "3px solid var(--ink)",
              boxShadow: ev.hot ? "0 0 0 4px rgba(255,61,122,0.2)" : "none",
            }} />
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: ".74rem", letterSpacing: ".08em", marginBottom: ".3rem", color: ev.hot ? "var(--pink)" : "var(--ink-70)" }}>{ev.year}</div>
            <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.05rem", marginBottom: ".15rem" }}>{ev.title}</h4>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".76rem", marginBottom: ".4rem", color: "var(--blue)" }}>{ev.sub}</div>
            <p style={{ fontSize: ".88rem", lineHeight: 1.65, maxWidth: 540, opacity: .8 }}>{ev.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── ACHIEVEMENTS ─────────────── */
function Achievements() {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <div className="reveal section-label tag-pink" style={{ marginBottom: "1.4rem" }}>07 // RECOGNITION</div>
      <h2 className="reveal reveal-d1" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", marginBottom: "2rem" }}>
        Milestones &amp; <span style={{ background: "var(--blue)", color: "#fff", padding: "0 .2em" }}>Awards</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "1rem" }}>
        {[
          { icon: "⚡", title: "Founder · Nori", desc: "Sole architect of a 13,300-line production RAG AI platform — designed, built, and deployed end-to-end.", bg: "var(--gold)" },
          { icon: "🏆", title: "Dean's Excellence Award", desc: "Received across multiple semesters for maintaining 9.0+ CGPA at MUJ.", bg: "var(--lime)" },
          { icon: "🔥", title: "Top 0.3% LeetCode", desc: "Ranked globally in the top 0.3% of all LeetCode users. Beats 99.7%.", bg: "var(--pink)", light: true },
          { icon: "🚀", title: "MUJHackX Round 2", desc: "Qualified for Round 2 among 1300+ participants at MUJHackX.", bg: "var(--blue)", light: true },
        ].map((a) => (
          <div key={a.title} className="reveal block hard-hover" style={{ padding: "1.6rem", background: a.bg, color: a.light ? "#fff" : "var(--ink)" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: ".8rem" }}>{a.icon}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1rem", marginBottom: ".4rem" }}>{a.title}</div>
            <div style={{ fontSize: ".85rem", lineHeight: 1.65, opacity: a.light ? .9 : .78 }}>{a.desc}</div>
          </div>
        ))}
      </div>

      <div className="reveal block hard-lg" style={{ marginTop: "1.4rem", background: "var(--ink)", color: "#fff", padding: "2rem 2.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", letterSpacing: ".12em", marginBottom: ".5rem", opacity: .7 }}>LEETCODE_STATS</div>
          <div style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(2rem,4.5vw,3.4rem)", lineHeight: 1, color: "var(--lime)" }}>TOP <span style={{ color: "#fff" }}>0.3%</span></div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".8rem", marginTop: ".5rem", opacity: .75 }}>Global Rank · 900+ Problems · Beats 99.7%</div>
        </div>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[["900+", "Problems"], ["Top 0.3%", "Global Rank"], ["120+", "Max Streak"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center", border: "2.5px solid var(--lime)", padding: ".8rem 1rem" }}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: "1.5rem", color: "var(--lime)" }}>{n}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", textTransform: "uppercase", letterSpacing: ".08em", marginTop: ".25rem", opacity: .75 }}>{l}</div>
            </div>
          ))}
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
    <section id="contact" className="stripe-bg-blue" style={{ padding: "5.5rem 0", borderTop: "3px solid var(--ink)", borderBottom: "3px solid var(--ink)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="reveal section-label tag-lime" style={{ marginBottom: "1.4rem" }}>08 // ESTABLISH_CONNECTION</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }} className="col-mob-1">
          <div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Anton',sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(2.4rem,6vw,4rem)", lineHeight: 0.92, marginBottom: "1.3rem" }}>
              Interested in a<br /><span style={{ background: "var(--ink)", color: "var(--lime)", padding: "0 .2em" }}>Collaboration?</span>
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: "1.02rem", fontWeight: 500, lineHeight: 1.75, marginBottom: "2.2rem", maxWidth: 420 }}>
              Currently seeking Software Engineering Internships for 2026. Let's discuss how I can contribute to your engineering team — Backend, AI/ML, or Full Stack.
            </p>

            <div className="reveal reveal-d3" style={{ display: "flex", gap: ".7rem", marginBottom: "1.8rem", flexWrap: "wrap", alignItems: "stretch" }}>
              <div className="block hard-sm" style={{ padding: ".9rem 1.2rem", flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: ".65rem", opacity: .6, marginBottom: ".2rem" }}>PRIMARY_EMAIL</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".85rem" }}>armanphaugat20@gmail.com</div>
              </div>
              <button onClick={copy} className="btn btn-lime" style={{ whiteSpace: "nowrap" }}>{copied ? "Copied ✓" : "Copy Email"}</button>
            </div>

            <div className="reveal reveal-d4" style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {[
                { icon: "✉️", label: "Email", value: "armanphaugat20@gmail.com", href: "mailto:armanphaugat20@gmail.com" },
                { icon: "📱", label: "Phone", value: "+91-9306115772", href: "tel:+919306115772" },
                { icon: "🐙", label: "GitHub", value: "github.com/armanphaugat", href: "https://github.com/armanphaugat" },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/armanphaugat05", href: "https://www.linkedin.com/in/armanphaugat05/" },
                { icon: "🧩", label: "LeetCode", value: "Top 0.3% · armanphaugat20", href: "https://leetcode.com/u/armanphaugat20" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block hard-hover"
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".8rem 1.1rem", textDecoration: "none", color: "var(--ink)", boxShadow: "4px 4px 0 var(--ink)" }}>
                  <span style={{ fontSize: "1.15rem" }}>{l.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", opacity: .6 }}>{l.label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".84rem", marginTop: ".1rem" }}>{l.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal reveal-d2">
            <div className="block hard-lg" style={{ padding: "2rem", marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.4rem" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--pink)", display: "inline-block", animation: "blink 1.4s infinite" }} />
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: ".8rem", letterSpacing: ".08em", textTransform: "uppercase" }}>Open to Opportunities</span>
              </div>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: "1.5rem", marginBottom: ".5rem" }}>Summer 2026 Internship</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".82rem", opacity: .7, marginBottom: "1.4rem" }}>Backend Engineering · AI/ML · Full Stack</div>
              {[["Availability", "Full-time from May 2026"], ["Format", "Remote / Hybrid / On-site"], ["Location", "Jaipur, IN (Reloc. flexible)"], ["Response", "Usually within 24 hours"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".55rem 0", borderBottom: "2px dashed var(--ink-12)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".75rem", opacity: .6 }}>{k}:</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".75rem" }}>{v}</span>
                </div>
              ))}
              <a href="mailto:armanphaugat20@gmail.com?subject=Internship Opportunity 2026" className="btn btn-pink" style={{ width: "100%", justifyContent: "center", marginTop: "1.4rem" }}>SEND_MESSAGE.EXE ↗</a>
            </div>

            <div className="block hard" style={{ padding: "1.4rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", lineHeight: 2, background: "var(--ink)", color: "var(--lime)" }}>
              <div style={{ display: "flex", gap: ".4rem", marginBottom: ".7rem" }}>
                {["#ff3d7a", "#ffb200", "#cdff4a"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                <span style={{ marginLeft: ".5rem", fontSize: ".7rem", opacity: .4, letterSpacing: ".1em" }}>TERMINAL</span>
              </div>
              <div style={{ color: "#fff" }}>$ whoami</div>
              <div style={{ opacity: .75, paddingLeft: "1rem" }}>arman_phaugat · backend_engineer · founder</div>
              <div style={{ color: "#fff" }}>$ skills --top</div>
              <div style={{ opacity: .75, paddingLeft: "1rem" }}>["Node.js", "Python", "Redis", "LangChain"]</div>
              <div style={{ color: "#fff" }}>$ cat nori.stats</div>
              <div style={{ color: "var(--pink)", paddingLeft: "1rem" }}>13,300 LOC · 4 SERVICES · 23+ TECH</div>
              <div style={{ color: "#fff" }}>$ hire me <span style={{ display: "inline-block", width: 8, height: "1em", background: "var(--lime)", marginLeft: 2, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} /></div>
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
    <footer style={{ padding: "1.8rem 1.5rem", background: "var(--ink)", color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: ".75rem", letterSpacing: ".12em", opacity: .7, textTransform: "uppercase" }}>
          © 2025 ARMAN_PHAUGAT · SYSTEM_VERSION: 3.0.MAX
        </div>
        <div style={{ display: "flex", gap: "1.8rem" }}>
          {[["GitHub", "https://github.com/armanphaugat"], ["LinkedIn", "https://www.linkedin.com/in/armanphaugat05/"], ["LeetCode", "https://leetcode.com/u/armanphaugat20"], ["Nori", "#vaultbot"]].map(([l, h]) => (
            <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".75rem", color: l === "Nori" ? "var(--pink)" : "#fff", textDecoration: "none", opacity: .85 }}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", opacity: .6, display: "flex", alignItems: "center", gap: ".5rem" }}>
          <span style={{ color: "var(--lime)" }}>✦</span> OPTIMIZED_FOR_PERFORMANCE
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