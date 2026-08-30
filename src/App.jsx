import { useState, useEffect, useRef } from "react";
import {
  Building2, RefreshCw, Brain, UploadCloud, Globe, Monitor,
  ShieldCheck, Cloud, Terminal, Github, ArrowRight, ArrowUpRight,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════
   DESIGN SYSTEM — "HYPNO" EDITORIAL / MONOCHROME STUDIO THEME
   Warm paper white · near-black ink · hairline rules · no color
   noise · Jost display + Inter body · circular ring stats as the
   signature motif · thin dark strips separating light sections
   ════════════════════════════════════════════════════════════ */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  :root{
    --bg:       #fbfaf8;
    --bg-alt:   #f2f0eb;
    --paper:    #ffffff;
    --ink:      #161513;
    --ink-80:   rgba(22,21,19,0.8);
    --ink-55:   rgba(22,21,19,0.55);
    --ink-35:   rgba(22,21,19,0.35);
    --line:     rgba(22,21,19,0.13);
    --line-lite:rgba(22,21,19,0.07);
    --dark:     #171613;
    --dark-2:   #201f1b;
    --ring-trk: rgba(22,21,19,0.09);
    --stone:    #8b8474;
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
  ::selection{ background:var(--ink); color:var(--bg); }
  ::-webkit-scrollbar{ width:10px; }
  ::-webkit-scrollbar-track{ background:var(--bg); }
  ::-webkit-scrollbar-thumb{ background:var(--ink-35); }

  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
  @keyframes menu-drop { from{opacity:0; transform:translateY(-10px)} to{opacity:1; transform:translateY(0)} }
  @keyframes dash { from{ stroke-dashoffset: var(--circ); } to{ stroke-dashoffset: var(--offset); } }

  .reveal{ opacity:0; transform:translateY(22px); transition:opacity .6s ease, transform .6s cubic-bezier(.2,.8,.2,1); }
  .reveal.visible{ opacity:1; transform:translateY(0); }
  .reveal-d1{ transition-delay:.06s; } .reveal-d2{ transition-delay:.13s; }
  .reveal-d3{ transition-delay:.20s; } .reveal-d4{ transition-delay:.27s; }

  h1,h2,h3,h4{ font-family:'Jost',sans-serif; letter-spacing:-0.01em; }

  .eyebrow{
    display:inline-flex; align-items:center; gap:.6rem;
    font-family:'JetBrains Mono',monospace; font-weight:500; font-size:.72rem;
    letter-spacing:.18em; text-transform:uppercase; color:var(--ink-55);
  }
  .eyebrow::before{ content:''; width:26px; height:1px; background:var(--ink-55); display:inline-block; }

  .card{
    background:var(--paper); border:1px solid var(--line);
    transition:border-color .2s ease, box-shadow .2s ease, transform .2s ease;
  }
  .card-hover:hover{ border-color:var(--ink-35); box-shadow:0 14px 28px rgba(22,21,19,0.08); transform:translateY(-3px); }

  .btn{
    display:inline-flex; align-items:center; gap:.6rem;
    font-family:'Inter',sans-serif; font-weight:600;
    font-size:.82rem; letter-spacing:.02em;
    padding:.9rem 1.7rem; border-radius:999px;
    border:1.5px solid var(--ink);
    cursor:pointer; text-decoration:none; color:var(--ink);
    background:transparent;
    transition:background .2s ease, color .2s ease, transform .15s ease;
  }
  .btn:hover{ transform:translateY(-2px); }
  .btn-solid{ background:var(--ink); color:var(--bg); }
  .btn-solid:hover{ background:var(--dark-2); }
  .btn-ghost{ border-color:var(--line); }
  .btn-ghost:hover{ border-color:var(--ink); }
  .btn-light{ border-color:rgba(255,255,255,0.3); color:#fff; }
  .btn-light:hover{ border-color:#fff; }
  .btn-light-solid{ background:#fff; color:var(--ink); border-color:#fff; }

  .pill{
    display:inline-flex; align-items:center; gap:.4rem;
    font-family:'Inter',sans-serif; font-weight:600; font-size:.74rem;
    padding:.42rem 1rem; border-radius:999px; border:1px solid var(--line);
    color:var(--ink-80); background:var(--paper); white-space:nowrap;
  }
  .pill-dark{ background:var(--ink); color:var(--bg); border-color:var(--ink); }

  .chip{
    font-family:'JetBrains Mono',monospace; font-size:.68rem; font-weight:500;
    padding:.3rem .65rem; border:1px solid var(--line); color:var(--ink-80);
    border-radius:5px;
  }

  .nav-link{
    font-family:'Inter',sans-serif; font-weight:600;
    font-size:.85rem; color:var(--ink-80); text-decoration:none; position:relative; padding:.3rem 0;
  }
  .nav-link::after{
    content:''; position:absolute; left:0; bottom:-2px; height:1.5px; width:0;
    background:var(--ink); transition:width .2s ease;
  }
  .nav-link:hover{ color:var(--ink); }
  .nav-link:hover::after{ width:100%; }

  .mob-nav-link{
    font-family:'Jost',sans-serif; font-weight:500; font-size:1.3rem;
    color:var(--ink); text-decoration:none; display:block; padding:1rem 1.4rem;
    border-bottom:1px solid var(--line);
  }

  .mobile-menu{
    display:none; position:absolute; top:100%; left:0; right:0;
    background:var(--bg); border-bottom:1px solid var(--line);
    animation:menu-drop .2s ease; z-index:490;
  }
  .mobile-menu.open{ display:block; }

  .hamburger{
    display:none; flex-direction:column; justify-content:center; align-items:center;
    gap:5px; width:40px; height:40px; background:transparent;
    border:1.5px solid var(--ink); cursor:pointer; padding:0; border-radius:999px;
  }
  .hamburger span{ display:block; width:16px; height:1.5px; background:var(--ink); transition:all .2s ease; }
  .hamburger.open span:nth-child(1){ transform:translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2){ opacity:0; }
  .hamburger.open span:nth-child(3){ transform:translateY(-6.5px) rotate(-45deg); }

  .marquee-strip{ background:var(--dark); overflow:hidden; padding:.85rem 0; }
  .marquee-track{ display:inline-flex; white-space:nowrap; animation:marquee 34s linear infinite; }

  .dashed{ border-bottom:1px dashed var(--line); }

  @media (max-width:768px){
    .hide-mob{ display:none !important; }
    .col-mob-1{ grid-template-columns:1fr !important; }
    .hamburger{ display:flex; }
    .hero-word{ font-size:15vw !important; }
  }
`;

/* ─────────────── RING (signature stat element) ─────────────── */
function Ring({ pct, label, sub, size = 132, stroke = 4, dark = false }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".9rem" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? "rgba(255,255,255,0.15)" : "var(--ring-trk)"} strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={dark ? "#fff" : "var(--ink)"} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={vis ? offset : circ}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: size > 110 ? "1.6rem" : "1.15rem", color: dark ? "#fff" : "var(--ink)" }}>{pct}%</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: ".85rem", color: dark ? "#fff" : "var(--ink)" }}>{label}</div>
        {sub && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", color: dark ? "rgba(255,255,255,0.55)" : "var(--ink-55)", marginTop: ".2rem" }}>{sub}</div>}
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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "transparent", zIndex: 10001 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--ink)", transition: "width .05s linear" }} />
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
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, background: scrolled ? "var(--bg)" : "transparent", borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent", transition: "all .25s ease" }}>
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "1.35rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <a href="#hero" style={{ display: "flex", alignItems: "baseline", gap: ".15rem", textDecoration: "none", color: "var(--ink)" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em" }}>ARMAN</span>
          <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: "1.3rem" }}>.dev</span>
        </a>

        <div className="hide-mob" style={{ display: "flex", gap: "2.4rem", alignItems: "center" }}>
          {links.map(([href, label]) => <a key={href} href={href} className="nav-link">{label}</a>)}
        </div>

        <div className="hide-mob" style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: ".62rem 1.1rem", fontSize: ".76rem" }}>LinkedIn</a>
          <a href="/ARMANRESUME.pdf" download className="btn btn-ghost" style={{ padding: ".62rem 1.1rem", fontSize: ".76rem" }}>↓ Resume</a>
          <a href="mailto:armanphaugat20@gmail.com" className="btn btn-solid" style={{ padding: ".62rem 1.4rem", fontSize: ".76rem" }}>Let's Talk</a>
        </div>

        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>

        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {links.map(([href, label]) => <a key={href} href={href} className="mob-nav-link" onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} style={{ display: "block", textAlign: "center", margin: "1.2rem 1.2rem 0", padding: "1rem", border: "1.5px solid var(--ink)", borderRadius: "999px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: ".85rem", textDecoration: "none", color: "var(--ink)" }}>LinkedIn</a>
          <a href="/ARMANRESUME.pdf" download onClick={() => setMenuOpen(false)} style={{ display: "block", textAlign: "center", margin: "1.2rem", padding: "1rem", border: "1.5px solid var(--ink)", borderRadius: "999px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: ".85rem", textDecoration: "none", color: "var(--ink)" }}>↓ Download Resume</a>
          <a href="mailto:armanphaugat20@gmail.com" onClick={() => setMenuOpen(false)} style={{ display: "block", textAlign: "center", margin: "0 1.2rem 1.2rem", padding: "1rem", background: "var(--ink)", color: "var(--bg)", borderRadius: "999px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: ".85rem", textDecoration: "none" }}>Let's Talk</a>
        </div>
      </nav>
    </header>
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
    <section id="hero" style={{ paddingTop: "8.5rem", position: "relative", background: "var(--bg-alt)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.5rem 4.5rem", position: "relative" }}>

        <div className="reveal eyebrow" style={{ marginBottom: "1.6rem" }}>Available for Internships · 2026</div>

        <h1 className="reveal reveal-d1 hero-word" style={{ fontWeight: 300, fontSize: "clamp(2.8rem,8.5vw,6.4rem)", lineHeight: 1.02, textTransform: "none", marginBottom: "1.8rem", maxWidth: 980 }}>
          Are you ready<br />
          to meet <span style={{ fontWeight: 700 }}>Arman Phaugat?</span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem", alignItems: "end" }} className="col-mob-1">
          <div>
            <div className="reveal reveal-d2" style={{ marginBottom: "1.6rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: "1rem", color: "var(--ink-80)" }}>
                {typed}<span style={{ display: "inline-block", width: 8, height: "1.1em", background: "var(--ink)", marginLeft: 3, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
              </span>
            </div>

            <p className="reveal reveal-d2" style={{ fontSize: "1.1rem", fontWeight: 400, lineHeight: 1.75, maxWidth: 540, marginBottom: "2.1rem", color: "var(--ink-80)" }}>
              Backend Engineer, AI Researcher and Founder of <strong style={{ color: "var(--ink)" }}>Nori</strong> at MUJ. I build high-concurrency systems, retrieval-augmented generation pipelines, and production-grade AI platforms.
            </p>

            <div className="reveal reveal-d3" style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
              <a href="#vaultbot" className="btn btn-solid">Meet Nori <ArrowRight size={15} /></a>
              <a href="#projects" className="btn btn-ghost">Explore Work</a>
              <a href="https://github.com/armanphaugat" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
              <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
              <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" className="btn btn-ghost">LeetCode</a>
              <a href="/ARMANRESUME.pdf" download className="btn btn-ghost">↓ Resume</a>
            </div>
          </div>

          <div className="reveal reveal-d3" style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <div style={{ border: "1px solid var(--line)", background: "var(--paper)", padding: "1rem 1.3rem", borderRadius: "14px", minWidth: 190 }}>
              <div className="eyebrow" style={{ marginBottom: ".6rem" }}>Founder</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: ".2rem" }}>Nori</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", color: "var(--ink-55)" }}>RAG AI Platform · 13,300+ LOC</div>
            </div>
          </div>
        </div>

        <div className="reveal reveal-d4" style={{ marginTop: "4rem", display: "flex", gap: "clamp(1.5rem,4vw,3.5rem)", flexWrap: "wrap", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "2.8rem" }}>
          <Ring pct={91} label="9.05 CGPA" sub="Dean's Award" size={118} />
          <Ring pct={100} label="900+ Problems" sub="DSA Solved" size={118} />
          <Ring pct={99} label="Top 0.3%" sub="LeetCode Global" size={118} />
          <Ring pct={80} label="12+ Projects" sub="Shipped" size={118} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MARQUEE / DARK STRIP ─────────────── */
function Marquee() {
  const items = ["Node.js", "Redis", "MySQL", "BullMQ", "Python", "FastAPI", "LangChain", "FAISS", "MongoDB", "Docker", "XGBoost", "Scikit-learn", "Groq", "RAG", "HuggingFace", "JWT", "Pandas", "Streamlit", "Pygame", "System Design", "ACID", "DSA"];
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...items, ...items].map((item, i) => (
            <span key={i} style={{ padding: "0 1.8rem", display: "inline-flex", alignItems: "center", gap: "1.8rem", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: ".92rem", color: "rgba(255,255,255,0.8)" }}>
              {item} <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── ABOUT ─────────────── */
function About() {
  return (
    <section id="about" style={{ maxWidth: 1280, margin: "0 auto", padding: "6.5rem 1.5rem" }}>
      <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>About</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }} className="col-mob-1">
        <div>
          <h2 className="reveal reveal-d1" style={{ fontWeight: 300, fontSize: "clamp(2rem,4.2vw,3.1rem)", lineHeight: 1.1, marginBottom: "1.8rem" }}>
            Passionate about <span style={{ fontWeight: 700 }}>systems</span> &amp; <span style={{ fontWeight: 700 }}>scale</span>
          </h2>
          <div className="reveal reveal-d2" style={{ fontSize: "1.02rem", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: "1.2rem", color: "var(--ink-80)" }}>
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
          <div className="card" style={{ borderRadius: "18px", padding: "1.8rem", marginBottom: "1.4rem" }}>
            <div className="eyebrow" style={{ marginBottom: "1.3rem" }}>System Specs</div>
            {[["Education", "B.Tech CSE · MUJ · 2023–2027"], ["Location", "Jaipur, Rajasthan, India"], ["CGPA", "9.05 / 10 · Dean's Excellence Award"], ["Focus", "Backend · AI/ML · Sys Design"], ["LeetCode", "Top 0.3% · 900+ Problems"], ["Hackathon", "MUJHackX Round 2 · 1300+ participants"], ["Internship", "Indavis Lifesciences · Jun–Jul 2025"], ["Founder", "Nori · RAG AI Platform · 13,300 LOC"]].map(([k, v], i, arr) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".75rem 0", borderBottom: i < arr.length - 1 ? "1px solid var(--line-lite)" : "none", gap: "1rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", fontWeight: 600, color: "var(--ink-55)", flexShrink: 0 }}>{k}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".84rem", fontWeight: 600, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ borderRadius: "18px", padding: "1.6rem", background: "var(--dark)", border: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".9rem", marginBottom: "1.4rem" }}>
              <div style={{ width: 38, height: 38, background: "#fff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: ".92rem", color: "#fff" }}>armanphaugat20</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", color: "rgba(255,255,255,0.55)" }}>leetcode.com</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Ring pct={99} label="Top 0.3%" sub="Global Rank" size={100} dark />
              <Ring pct={72} label="120+" sub="Max Streak" size={100} dark />
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
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6.5rem" }}>
      <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>Professional History</div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 300, fontSize: "clamp(1.9rem,3.4vw,2.6rem)", marginBottom: "2.2rem" }}>
        Where I've <span style={{ fontWeight: 700 }}>shipped</span>
      </h2>

      <div className="reveal reveal-d2 card" style={{ borderRadius: "18px", padding: "2.2rem", display: "grid", gridTemplateColumns: "auto 1fr", gap: "2.2rem" }} className="col-mob-1">
        <div style={{ minWidth: 180 }}>
          <span className="pill pill-dark" style={{ marginBottom: ".6rem" }}>Jun – Jul 2025</span>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", fontWeight: 500, color: "var(--ink-55)", marginTop: ".7rem" }}>Full-Time · On-site</div>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: "1.35rem", marginBottom: ".3rem" }}>Web Dev Intern</h3>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".85rem", color: "var(--ink-55)", marginBottom: "1.3rem" }}>Indavis Lifesciences · Haridwar, India</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".65rem", marginBottom: "1.3rem" }}>
            {["Maintained and updated the company website ensuring smooth performance and content accuracy across all pages.", "Collaborated with cross-functional teams to align website updates with brand guidelines and business objectives.", "Managed content workflows, achieving consistent brand representation and user experience improvements."].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: ".8rem", fontSize: ".95rem", fontWeight: 400, lineHeight: 1.75, color: "var(--ink-80)" }}>
                <ArrowRight size={16} style={{ flexShrink: 0, marginTop: ".2rem", color: "var(--ink-35)" }} />{b}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            {["Website Maintenance", "Team Collaboration", "Content Management", "Brand Alignment"].map(t => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="reveal reveal-d3 card" style={{ marginTop: "1.4rem", borderRadius: "18px", background: "var(--dark)", border: "none", padding: "2rem 2.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)", marginBottom: ".7rem" }}>Currently Seeking</div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#fff", marginBottom: ".3rem" }}>Summer Internship 2026</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: ".85rem", color: "rgba(255,255,255,0.6)" }}>Backend · AI/ML · Full Stack</div>
        </div>
        <a href="mailto:armanphaugat20@gmail.com" className="btn btn-light-solid">Reach Out <ArrowUpRight size={15} /></a>
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
    <section id="vaultbot" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6.5rem" }}>
      <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>Flagship Project</div>
      <div className="reveal reveal-d1" style={{ marginBottom: "2.2rem" }}>
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.9rem,3.4vw,2.6rem)", marginBottom: ".5rem" }}>
          The project I <span style={{ fontWeight: 700 }}>founded</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: ".92rem", color: "var(--ink-55)" }}>Not just built — designed, architected, and shipped from zero.</p>
      </div>

      <div className="reveal reveal-d2 card" style={{ borderRadius: "24px", background: "var(--dark)", color: "#fff", border: "none", overflow: "hidden" }}>
        <div style={{ padding: "2.4rem 2.4rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1.4rem", marginBottom: "1.8rem" }}>
            <div>
              <div style={{ display: "flex", gap: ".6rem", marginBottom: "1.1rem", flexWrap: "wrap" }}>
                <span className="pill" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>Founder &amp; Sole Architect</span>
                <span className="pill" style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)" }}>Backend Engineer</span>
              </div>
              <h3 style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem,5.5vw,3.8rem)", lineHeight: 0.95, marginBottom: ".6rem" }}>Nori</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".9rem", color: "rgba(255,255,255,0.8)", marginBottom: ".7rem" }}>Production-Grade Multi-Tenant RAG Support Bot</p>
              <p style={{ fontSize: "1rem", opacity: .65, lineHeight: 1.8, maxWidth: 600, fontWeight: 400 }}>A full-stack, multi-service RAG platform that brings server-specific, context-aware support to Discord communities. Every architectural decision was designed and built solo.</p>
            </div>
            <div style={{ display: "flex", gap: "1.4rem" }}>
              <Ring pct={100} label="13,300+" sub="Lines of Code" size={104} dark />
              <Ring pct={70} label="4" sub="Services" size={104} dark />
            </div>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {[["FastAPI Backend", Terminal], ["Discord Bot", Terminal], ["React Dashboard", Monitor], ["BullMQ Worker", RefreshCw], ["Redis Cache", RefreshCw], ["Supabase Postgres", Building2], ["Docker Compose", Cloud], ["Oracle Cloud", Cloud]].map(([label, Icon]) => (
              <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "999px", padding: ".35rem .8rem", fontFamily: "'Inter',sans-serif", fontSize: ".72rem", fontWeight: 500, opacity: .85 }}>
                <Icon size={13} strokeWidth={2} /> {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "2.4rem" }}>
          <div style={{ marginBottom: "2.4rem" }}>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "1.4rem" }}>Engineering Highlights</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1rem" }}>
              {VAULT_HIGHLIGHTS.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1.3rem", transition: "border-color .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                    <div style={{ marginBottom: ".7rem", opacity: .8 }}><Icon size={19} strokeWidth={1.6} /></div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: ".87rem", marginBottom: ".45rem" }}>{h.title}</div>
                    <div style={{ fontSize: ".8rem", opacity: .6, lineHeight: 1.7, fontWeight: 400 }}>{h.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: "2.2rem" }}>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "1.1rem" }}>Full Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
              {VAULT_TECH.map((t) => {
                const Icon = t.icon;
                return <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "999px", padding: ".4rem .85rem", fontFamily: "'Inter',sans-serif", fontSize: ".72rem", opacity: .8 }}><Icon size={13} strokeWidth={2} />{t.label}</span>;
              })}
            </div>
          </div>

          <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1.5rem", marginBottom: "1.9rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", lineHeight: 2 }}>
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
  { num: "02", name: "RAG Discord Bot (Original)", tag: "Artificial Intelligence", category: "AI/ML", tagline: "FastAPI + LangChain · per-guild FAISS · Groq Llama 3.3", highlights: ["Per-guild persistent FAISS vector stores with isolation", "LCEL chain → Groq Llama 3.3 inference with rate limiting", "PDF parsing + web scraping indexing pipeline", "Multi-server permission gating + async handlers"], tech: ["Python", "FastAPI", "LangChain", "FAISS", "Discord.py", "Groq", "HuggingFace"], discord: "https://noribot.dev/?page=landing" },
  { num: "03", name: "Video Streaming & User Management", tag: "Media Pipelines", category: "Backend", tagline: "YouTube-like backend · HLS adaptive streaming · JWT lifecycle", highlights: ["HLS transcoding via ffmpeg (360p/720p adaptive bitrate)", "JWT access + refresh token dual lifecycle", "MongoDB aggregation pipelines for watch history", "Cloudinary asset optimization"], tech: ["Node.js", "MongoDB", "Express", "Cloudinary", "JWT", "ffmpeg", "Bcrypt"], youtube: "https://youtu.be/w6980_4fVSQ" },
  { num: "04", name: "Cricket Score Predictor", tag: "Data Science", category: "AI/ML", tagline: "Live IPL · T20 · ODI score prediction via XGBoost", highlights: ["3 XGBoost models: IPL, T20, ODI formats", "CricAPI live integration for real-time inference", "Format-specific feature engineering + EDA"], tech: ["Python", "XGBoost", "Scikit-learn", "Streamlit", "Pandas", "CricAPI"] },
  { num: "05", name: "IPL Win Predictor", tag: "Data Science", category: "AI/ML", tagline: "Real-time IPL win probability via ML ensemble", highlights: ["Logistic Regression + Random Forest ensemble", "Dynamic win % via CRR/RRR/wickets features", "Feature engineering on 4500+ rows of match data"], tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Matplotlib"] },
  { num: "06", name: "Book Recommender System", tag: "Artificial Intelligence", category: "AI/ML", tagline: "Dual-mode: popularity filter + collaborative filtering", highlights: ["Popularity: top 50 filtered by 250+ user ratings", "Cosine similarity on pivot matrix for CF", "Streamlit UI with covers + ratings display"], tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Cosine Similarity"] },
  { num: "07", name: "WhatsApp Chat Analyser", tag: "Data Science", category: "AI/ML", tagline: "Upload export · visualize conversation trends & patterns", highlights: ["Timeline analysis · daily/weekly/monthly breakdowns", "Top emoji breakdown + WordCloud generation", "Most active user leaderboard + heatmap"], tech: ["Python", "Streamlit", "Pandas", "Matplotlib", "WordCloud", "Regex"] },
  { num: "08", name: "Gamezo Discord Bot", tag: "Backend Bot", category: "Backend", tagline: "Heavy backend bot · multi-game economy · live stock market", highlights: ["SQLite3 persistence with async scheduling", "Games: coin flip, airplane crash, rollover bets", "Live stock market via REST API + hourly rewards system"], tech: ["Python", "Discord.py", "SQLite3", "asyncio", "REST API"] },
  { num: "09", name: "Cuntrex — 2D Shooter Game", tag: "Game Dev", category: "Game", tagline: "Two-player 2D shooter built with Pygame from scratch", highlights: ["Full game loop · sprite collision detection", "Health bar real-time rendering + game states", "Background music + SFX via Pygame mixer"], tech: ["Python", "Pygame", "OOP", "Game Loop", "Sprite Animation"] },
  { num: "10", name: "RAG Bot Website", tag: "Frontend", category: "Frontend", tagline: "React showcase for the Discord RAG bot", highlights: ["Scroll-triggered IntersectionObserver animations", "Interactive feature tabs + zero CSS framework"], tech: ["React", "Vite", "JavaScript", "CSS", "Lucide"], webapp: "https://gamezobot.netlify.app/", website: "https://armanphaugat.github.io/ragwebsite/" },
  { num: "11", name: "Todo App", tag: "Android", category: "Android", tagline: "Android task manager · SQLite persistence · RecyclerView", highlights: ["SQLite CRUD via custom DatabaseHelper", "RecyclerView with live check/delete updates", "View Binding · minSdk 21 · targetSdk 36"], tech: ["Kotlin", "Android", "SQLite", "RecyclerView", "Gradle"] },
  { num: "12", name: "SalesForce UI Clone", tag: "Frontend", category: "Frontend", tagline: "Pixel-accurate Salesforce homepage clone · pure HTML/CSS", highlights: ["Full layout: nav, hero, content strips", "CSS-only responsive grid · brand-faithful typography"], tech: ["HTML", "CSS", "Flexbox", "Responsive Design"] },
];

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  const cat = Array.isArray(p.categories) ? p.categories[0] : p.category;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="card card-hover"
      style={{ borderRadius: "18px", padding: "1.7rem", display: "flex", flexDirection: "column" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span className="chip">{p.tag}</span>
        <div style={{ display: "flex", gap: ".7rem", alignItems: "center" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "var(--ink-35)" }}>{p.num}</span>
          {(p.youtube || p.webapp || p.website || p.discord) && <ArrowUpRight size={16} style={{ opacity: hov ? 1 : .3, transition: "opacity .2s" }} />}
        </div>
      </div>
      <h3 style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: "1.1rem", marginBottom: ".5rem", lineHeight: 1.3 }}>{p.name}</h3>
      <p style={{ fontSize: ".85rem", fontWeight: 400, marginBottom: "1.1rem", lineHeight: 1.65, color: "var(--ink-55)" }}>{p.tagline}</p>
      <div style={{ flex: 1, marginBottom: "1.1rem" }}>
        {p.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", gap: ".55rem", fontSize: ".8rem", fontWeight: 400, marginBottom: ".4rem", lineHeight: 1.6, color: "var(--ink-80)" }}>
            <span style={{ color: "var(--ink-35)" }}>—</span>{h}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: "1.1rem" }}>
        {p.tech.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".64rem", fontWeight: 500, border: "1px solid var(--line)", borderRadius: "5px", padding: ".22rem .5rem", color: "var(--ink-55)" }}>{t}</span>)}
      </div>
      {(p.youtube || p.webapp || p.website || p.discord) && (
        <div style={{ display: "flex", gap: ".5rem", paddingTop: "1rem", borderTop: "1px solid var(--line-lite)" }}>
          {p.youtube && <a href={p.youtube} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn btn-ghost" style={{ padding: ".45rem .9rem", fontSize: ".68rem", flex: 1, justifyContent: "center" }}>Demo</a>}
          {p.webapp && <a href={p.webapp} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn btn-solid" style={{ padding: ".45rem .9rem", fontSize: ".68rem", flex: 1, justifyContent: "center" }}>Live</a>}
          {p.website && <a href={p.website} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn btn-ghost" style={{ padding: ".45rem .9rem", fontSize: ".68rem", flex: 1, justifyContent: "center" }}>Site</a>}
          {p.discord && <a href={p.discord} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn btn-solid" style={{ padding: ".45rem .9rem", fontSize: ".68rem", flex: 1, justifyContent: "center" }}>Add Bot</a>}
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
    <section id="projects" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6.5rem" }}>
      <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>Recent Work</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "1.8rem" }}>
        <h2 className="reveal reveal-d1" style={{ fontWeight: 300, fontSize: "clamp(1.9rem,3.4vw,2.6rem)" }}>
          More system builds &amp; <span style={{ fontWeight: 700 }}>AI implementations</span>
        </h2>
        <span className="reveal reveal-d1 pill">{PROJECTS.length} Modules</span>
      </div>

      <div className="reveal reveal-d2" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.2rem" }}>
        {cats.map(cat => {
          const active = filter === cat;
          return (
            <button key={cat} onClick={() => setFilter(cat)} className={active ? "pill pill-dark" : "pill"} style={{
              cursor: "pointer", border: active ? "1px solid var(--ink)" : "1px solid var(--line)",
            }}>{cat} ({cat === "All" ? PROJECTS.length : PROJECTS.filter(p => { const c = Array.isArray(p.categories) ? p.categories : [p.category]; return c.includes(cat); }).length})</button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.3rem" }}>
        {filtered.map(p => <ProjectCard key={p.num} p={p} />)}
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
    <section id="skills" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6.5rem" }}>
      <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>Technical Toolkit</div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 300, fontSize: "clamp(1.9rem,3.4vw,2.6rem)", marginBottom: "1.8rem" }}>
        My <span style={{ fontWeight: 700 }}>toolkit</span>
      </h2>

      <div className="reveal reveal-d2" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.6rem" }}>
        {[["rings", "Proficiency"], ["tags", "Tech Tags"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={tab === k ? "pill pill-dark" : "pill"} style={{ cursor: "pointer" }}>{l}</button>
        ))}
      </div>

      {tab === "rings" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2.2rem 1rem" }}>
          {SKILL_RINGS.map((s) => <Ring key={s.name} pct={s.pct} label={s.name} size={112} />)}
        </div>
      )}

      {tab === "tags" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "1rem" }}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className="card" style={{ borderRadius: "14px", padding: "1.4rem" }}>
              <div className="eyebrow" style={{ marginBottom: ".9rem" }}>{g.label}</div>
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
    <section id="timeline" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6.5rem" }}>
      <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>Journey Log</div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 300, fontSize: "clamp(1.9rem,3.4vw,2.6rem)", marginBottom: "2.8rem" }}>
        My <span style={{ fontWeight: 700 }}>timeline</span>
      </h2>

      <div style={{ position: "relative", maxWidth: 820, paddingLeft: "2rem", borderLeft: "1px solid var(--line)" }}>
        {TIMELINE.map((ev, i) => (
          <div key={i} className="reveal" style={{ position: "relative", marginBottom: "2.4rem", marginLeft: "1.4rem" }}>
            <div style={{
              position: "absolute", left: "-2.62rem", top: 3, width: 12, height: 12, borderRadius: "50%",
              background: ev.hot ? "var(--ink)" : "var(--bg)", border: "1.5px solid var(--ink)",
              boxShadow: ev.hot ? "0 0 0 4px rgba(22,21,19,0.1)" : "none",
            }} />
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: ".74rem", letterSpacing: ".06em", marginBottom: ".35rem", color: "var(--ink-55)" }}>{ev.year}</div>
            <h4 style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: "1.08rem", marginBottom: ".2rem" }}>{ev.title}</h4>
            <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".78rem", marginBottom: ".45rem", color: "var(--ink-35)" }}>{ev.sub}</div>
            <p style={{ fontSize: ".89rem", lineHeight: 1.7, maxWidth: 540, color: "var(--ink-80)", fontWeight: 400 }}>{ev.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── ACHIEVEMENTS ─────────────── */
function Achievements() {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6.5rem" }}>
      <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>Recognition</div>
      <h2 className="reveal reveal-d1" style={{ fontWeight: 300, fontSize: "clamp(1.9rem,3.4vw,2.6rem)", marginBottom: "2rem" }}>
        Milestones &amp; <span style={{ fontWeight: 700 }}>awards</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "1rem" }}>
        {[
          { icon: "⚡", title: "Founder · Nori", desc: "Sole architect of a 13,300-line production RAG AI platform — designed, built, and deployed end-to-end." },
          { icon: "🏆", title: "Dean's Excellence Award", desc: "Received across multiple semesters for maintaining 9.0+ CGPA at MUJ." },
          { icon: "🔥", title: "Top 0.3% LeetCode", desc: "Ranked globally in the top 0.3% of all LeetCode users. Beats 99.7%." },
          { icon: "🚀", title: "MUJHackX Round 2", desc: "Qualified for Round 2 among 1300+ participants at MUJHackX." },
        ].map((a) => (
          <div key={a.title} className="reveal card card-hover" style={{ borderRadius: "16px", padding: "1.7rem" }}>
            <div style={{ fontSize: "1.6rem", marginBottom: ".9rem" }}>{a.icon}</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: ".5rem" }}>{a.title}</div>
            <div style={{ fontSize: ".85rem", lineHeight: 1.7, color: "var(--ink-55)" }}>{a.desc}</div>
          </div>
        ))}
      </div>

      <div className="reveal card" style={{ marginTop: "1.3rem", borderRadius: "20px", background: "var(--dark)", border: "none", color: "#fff", padding: "2.2rem 2.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
        <div>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.45)", marginBottom: ".7rem" }}>LeetCode Stats</div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: "clamp(2rem,4.5vw,3.2rem)", lineHeight: 1 }}>Top <span style={{ fontWeight: 700 }}>0.3%</span></div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: ".82rem", marginTop: ".6rem", opacity: .55 }}>Global Rank · 900+ Problems · Beats 99.7%</div>
        </div>
        <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
          <Ring pct={99} label="Top 0.3%" sub="Global Rank" size={96} dark />
          <Ring pct={72} label="120+" sub="Max Streak" size={96} dark />
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
    <section id="contact" style={{ padding: "6.5rem 0", background: "var(--bg-alt)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="reveal eyebrow" style={{ marginBottom: "1.4rem" }}>Establish Connection</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }} className="col-mob-1">
          <div>
            <h2 className="reveal reveal-d1" style={{ fontWeight: 300, fontSize: "clamp(2.2rem,5.2vw,3.6rem)", lineHeight: 1.08, marginBottom: "1.4rem" }}>
              Interested in a<br /><span style={{ fontWeight: 700 }}>collaboration?</span>
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: "1.02rem", fontWeight: 400, lineHeight: 1.8, marginBottom: "2.2rem", maxWidth: 420, color: "var(--ink-80)" }}>
              Currently seeking Software Engineering Internships for 2026. Let's discuss how I can contribute to your engineering team — Backend, AI/ML, or Full Stack.
            </p>

            <div className="reveal reveal-d3" style={{ display: "flex", gap: ".7rem", marginBottom: "1.8rem", flexWrap: "wrap", alignItems: "stretch" }}>
              <div className="card" style={{ borderRadius: "14px", padding: "1rem 1.3rem", flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: ".65rem", color: "var(--ink-55)", marginBottom: ".25rem" }}>Primary Email</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".88rem" }}>armanphaugat20@gmail.com</div>
              </div>
              <button onClick={copy} className="btn btn-solid" style={{ whiteSpace: "nowrap" }}>{copied ? "Copied ✓" : "Copy Email"}</button>
            </div>

            <div className="reveal reveal-d4" style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {[
                { icon: "✉️", label: "Email", value: "armanphaugat20@gmail.com", href: "mailto:armanphaugat20@gmail.com" },
                { icon: "📱", label: "Phone", value: "+91-9306115772", href: "tel:+919306115772" },
                { icon: "🐙", label: "GitHub", value: "github.com/armanphaugat", href: "https://github.com/armanphaugat" },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/armanphaugat05", href: "https://www.linkedin.com/in/armanphaugat05/" },
                { icon: "🧩", label: "LeetCode", value: "Top 0.3% · armanphaugat20", href: "https://leetcode.com/u/armanphaugat20" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="card card-hover"
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".9rem 1.2rem", borderRadius: "14px", textDecoration: "none", color: "var(--ink)" }}>
                  <span style={{ fontSize: "1.1rem" }}>{l.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".64rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-55)" }}>{l.label}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".85rem", marginTop: ".1rem" }}>{l.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal reveal-d2">
            <div className="card" style={{ borderRadius: "22px", padding: "2.1rem", marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.4rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink)", display: "inline-block", animation: "blink 1.6s infinite" }} />
                <span className="eyebrow" style={{ marginBottom: 0 }}>Open to Opportunities</span>
              </div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: "1.5rem", marginBottom: ".5rem" }}>Summer 2026 Internship</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: ".85rem", color: "var(--ink-55)", marginBottom: "1.5rem" }}>Backend Engineering · AI/ML · Full Stack</div>
              {[["Availability", "Full-time from May 2026"], ["Format", "Remote / Hybrid / On-site"], ["Location", "Jaipur, IN (Reloc. flexible)"], ["Response", "Usually within 24 hours"]].map(([k, v], i, arr) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".6rem 0", borderBottom: i < arr.length - 1 ? "1px solid var(--line-lite)" : "none" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".75rem", color: "var(--ink-55)" }}>{k}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".8rem" }}>{v}</span>
                </div>
              ))}
              <a href="mailto:armanphaugat20@gmail.com?subject=Internship Opportunity 2026" className="btn btn-solid" style={{ width: "100%", justifyContent: "center", marginTop: "1.5rem" }}>Send Message <ArrowUpRight size={15} /></a>
            </div>

            <div className="card" style={{ borderRadius: "18px", padding: "1.5rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", lineHeight: 2, background: "var(--dark)", border: "none", color: "rgba(255,255,255,0.85)" }}>
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
    <footer style={{ padding: "3.5rem 1.5rem 2rem", background: "var(--dark)", color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: "clamp(2rem,6vw,3.4rem)", marginBottom: "1.8rem" }}>
          ARMAN<span style={{ fontWeight: 700 }}>.dev</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2.2rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
          {[["GitHub", "https://github.com/armanphaugat"], ["LinkedIn", "https://www.linkedin.com/in/armanphaugat05/"], ["LeetCode", "https://leetcode.com/u/armanphaugat20"], ["Nori", "#vaultbot"]].map(([l, h]) => (
            <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: ".85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.6rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
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