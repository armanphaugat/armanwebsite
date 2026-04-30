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
  v:      "#1B3A8A",
  vLight: "#2E5FC9",
  vPale:  "var(--vPale)",
  vDeep:  "#0A0F2E",
  accent: "#2E5FC9",
  accent2:"#E8A44A",
  accent3:"#D94F3D",
  accent4:"#2A7A5E",
  muted:  "var(--muted)",
  gold:   "#E8A44A",
};

/* ─────────────── GLOBAL STYLES ─────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Press+Start+2P&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg:       #F7F5F0;
    --bg2:      #EEEBE3;
    --paper:    #FFFFFF;
    --ink:      #0A0F2E;
    --inkMid:   #1B3A8A;
    --vPale:    #EFF4FD;
    --muted:    #4A5568;
    --glow-v:   rgba(27,58,138,0.14);
    --glow-c:   rgba(46,95,201,0.12);
  }

  /* ── DARK MODE: Black + Red ── */
  [data-theme="dark"] {
    --bg:     #0F1117;
    --bg2:    #161B27;
  --paper:  #1C2333;
  --ink:    #E8EAF0;
  --inkMid: #6B7FD4;
  --vPale:  #1E2A4A;
  --muted:  #8892B0;
    --glow-v:   rgba(107,127,212,0.2);
    --glow-c:   rgba(124,158,255,0.15);
  }

  [data-theme="dark"] body { background: #0F1117; color: #7C9EFF; }

  :root {
    --card-hover: #0E1A40;
    --filter-active-bg: #1B3A8A;
    --filter-active-color: #ffffff;
    --section-divider: rgba(27,58,138,0.15);
    --pixel-border: 3px solid;
  }
  [data-theme="dark"] {
    --card-hover: #1C2333;
    --filter-active-bg: #6B7FD4;
    --filter-active-color: #ffffff;
    --section-divider: rgba(107,127,212,0.2);
  }

  @keyframes darkToggle    { from{transform:rotate(-30deg) scale(0.7);opacity:0} to{transform:rotate(0deg) scale(1);opacity:1} }
  @keyframes particleDrift { 0%{opacity:0.7} 100%{transform:translate(var(--px),var(--py));opacity:0} }
  @keyframes pulse2        { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.25);opacity:0.7} }
  @keyframes backTopIn     { from{opacity:0;transform:translateY(12px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes learnPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(27,58,138,0.3)} 50%{box-shadow:0 0 0 6px rgba(27,58,138,0)} }
  @keyframes confettiFall  { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
  @keyframes toastIn       { from{opacity:0;transform:translateX(120%)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastOut      { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(120%)} }
  @keyframes floatCTA      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes sparkle       { 0%{transform:scale(0) rotate(0deg);opacity:1} 100%{transform:scale(1.5) rotate(180deg);opacity:0} }
  @keyframes statusPing    { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2.2);opacity:0} }
  @keyframes kbdIn         { from{opacity:0;transform:translateY(8px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes factSlide     { 0%{opacity:0;transform:translateY(10px)} 15%,85%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }
  @keyframes loaderFadeOut { 0%{opacity:1} 100%{opacity:0} }
  @keyframes loaderScan    { 0%{top:-100%} 100%{top:200%} }
  @keyframes loaderDotPulse{ 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes terminalSlideIn { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes terminalSlideOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(32px) scale(0.96)} }
  @keyframes termCursor    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes termLineIn    { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
  @keyframes pixelBlink    { 0%,49%{opacity:1} 50%,100%{opacity:0} }
  @keyframes marquee       { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes tagIn         { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes floatUp       { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes resumePulse   { 0%,100%{box-shadow:4px 4px 0 #0A0F2E} 50%{box-shadow:6px 6px 0 #0A0F2E} }
  @keyframes menuSlide     { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes iconDrift     { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(8px,-16px) rotate(6deg)} }
  @keyframes iconDriftB    { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,-22px)} }
  @keyframes iconDriftC    { 0%,100%{transform:translate(0,0)} 40%{transform:translate(12px,10px) rotate(12deg)} }
  @keyframes iconDriftD    { 0%,100%{transform:translate(0,0)} 60%{transform:translate(-8px,-18px)} }
  @keyframes blink         { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes neonFlicker   { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.6} 94%{opacity:1} }
  @keyframes pixelPop      { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
  @keyframes shimmer      { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes cardRise     { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes glowPulse    { 0%,100%{box-shadow:0 0 8px rgba(27,58,138,0.3),4px 4px 0 #1B3A8A} 50%{box-shadow:0 0 20px rgba(27,58,138,0.5),4px 4px 0 #1B3A8A} }
  @keyframes heroGlow     { 0%,100%{text-shadow:5px 5px 0 rgba(27,58,138,0.12),0 0 40px rgba(27,58,138,0.08)} 50%{text-shadow:5px 5px 0 rgba(27,58,138,0.18),0 0 60px rgba(27,58,138,0.14)} }
  @keyframes heroGlowRed  { 0%,100%{text-shadow:5px 5px 0 rgba(255,51,51,0.18),0 0 40px rgba(255,51,51,0.12)} 50%{text-shadow:5px 5px 0 rgba(255,51,51,0.28),0 0 60px rgba(107,127,212,0.2)} }
  @keyframes dotMatrix    { 0%{opacity:0.3} 50%{opacity:1} 100%{opacity:0.3} }
  @keyframes avatarFloat  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes pixelRain    { 0%{transform:translateY(-20px);opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{transform:translateY(100vh);opacity:0} }
  @keyframes orbDrift1    { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(0.97)} }
  @keyframes orbDrift2    { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-25px,20px) scale(1.08)} 70%{transform:translate(18px,-10px) scale(0.95)} }
  @keyframes orbDrift3    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,25px) scale(1.03)} }

  .sec-transition { opacity:0; transform:translateY(28px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .sec-transition.visible { opacity:1; transform:translateY(0); }

  .progress-dot { width:12px; height:12px; background:rgba(27,58,138,0.15); border:2px solid rgba(27,58,138,0.35); transition:all 0.2s; cursor:pointer; }
  .progress-dot.active { background:#1B3A8A; border-color:#2E5FC9; transform:scale(1.4); box-shadow:3px 3px 0 #0A0F2E, 0 0 8px rgba(27,58,138,0.5); }
  .progress-dot:hover:not(.active) { background:rgba(27,58,138,0.35); }

  .btt-btn { position:fixed; bottom:2rem; right:2rem; width:46px; height:46px; background:linear-gradient(135deg,#1B3A8A,#0A0F2E); border:3px solid #0A0F2E; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:800; box-shadow:4px 4px 0 #0A0F2E, 0 0 12px rgba(27,58,138,0.3); transition:transform 0.1s, box-shadow 0.1s; }
  .btt-btn:hover { transform:translate(-3px,-3px); box-shadow:7px 7px 0 #0A0F2E, 0 0 20px rgba(27,58,138,0.5); }
  .btt-btn:active { transform:translate(2px,2px); box-shadow:2px 2px 0 #0A0F2E; }

  .scroll-bar { position:fixed; top:0; left:0; height:5px; background:repeating-linear-gradient(90deg,#1B3A8A 0px,#1B3A8A 8px,#2E5FC9 8px,#2E5FC9 16px,#E8A44A 16px,#E8A44A 24px,#D94F3D 24px,#D94F3D 32px); z-index:9999; transition:width 0.05s linear; box-shadow:0 1px 8px rgba(27,58,138,0.4); }

  .toast-wrap { position:fixed; bottom:5.5rem; right:1.5rem; z-index:9000; display:flex; flex-direction:column; gap:0.5rem; pointer-events:none; }
  .toast { background:var(--paper); border:2px solid #1B3A8A; padding:0.75rem 1.1rem; font-size:0.9rem; font-family:'JetBrains Mono', monospace; color:var(--ink); box-shadow:4px 4px 0 #1B3A8A; display:flex; align-items:center; gap:0.6rem; pointer-events:all; animation:toastIn 0.35s ease both; }

  .float-cta { position:fixed; bottom:6rem; left:2rem; z-index:799; animation:floatCTA 0.5s ease both; }

  .kbd-hint { position:fixed; bottom:2rem; left:50%; transform:translateX(-50%); z-index:799; background:var(--paper); border:2px solid #1B3A8A; padding:0.45rem 1.2rem; font-size:0.82rem; font-family:'JetBrains Mono', monospace; color:var(--muted); box-shadow:3px 3px 0 #1B3A8A; display:flex; align-items:center; gap:0.6rem; animation:kbdIn 0.3s ease both; pointer-events:none; }
  .kbd-key { background:var(--vPale); color:#1B3A8A; border:2px solid #1B3A8A; padding:0.1rem 0.45rem; font-size:0.8rem; font-weight:600; box-shadow:2px 2px 0 #1B3A8A; }

  .status-available { display:inline-flex; align-items:center; gap:0.5rem; padding:0.35rem 1rem; background:rgba(42,122,94,0.1); border:2px solid #2A7A5E; box-shadow:2px 2px 0 #2A7A5E, 0 0 12px rgba(42,122,94,0.12); }
  .status-ping { width:9px; height:9px; background:#2A7A5E; position:relative; box-shadow:0 0 6px rgba(42,122,94,0.6); }
  .status-ping::before { content:''; position:absolute; inset:0; background:#2A7A5E; animation:statusPing 1.5s ease infinite; }

  .chip {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.83rem;
    font-weight: 500;
    padding: 0.28rem 0.85rem;
    background: var(--vPale); color: #1B3A8A; border: 1.5px solid #1B3A8A;
    box-shadow: 2px 2px 0 #1B3A8A;
    transition: all 0.12s;
    letter-spacing: 0.01em;
    cursor: default;
  }
  .chip:hover {
    background: #1B3A8A; color: #fff;
    transform: translate(-2px,-2px);
    box-shadow: 4px 4px 0 #0A0F2E, 0 0 10px rgba(27,58,138,0.25);
  }

  .nav-link { position: relative; text-decoration: none; }
  .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg,#1B3A8A,#2E5FC9); transition: width 0.25s ease; }
  .nav-link:hover::after { width: 100%; }

  .mob-menu {
    display: none;
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: var(--bg);
    z-index: 590;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    animation: menuSlide 0.3s ease both;
  }
  .mob-menu.open { display: flex; }
  .mob-menu a {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.4rem;
    color: var(--ink);
    text-decoration: none;
    transition: color 0.1s;
  }
  .mob-menu a:hover { color: #1B3A8A; }

  .hide-mob { display: flex; }
  .show-mob { display: none; }

  .noise-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9996;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
  }
  [data-theme="dark"] .noise-overlay { opacity: 0.05; }

  .orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
  }

  @media(max-width: 768px) {
    body { cursor: auto; }
    .hide-mob { display: none !important; }
    .show-mob { display: flex !important; }
    .sec-pad { padding: 4rem 1.4rem !important; }
    .grid2   { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .grid3   { grid-template-columns: 1fr !important; }
    .grid-auto { grid-template-columns: 1fr !important; }
    .hero-sec { padding: 7rem 1.4rem 3rem !important; }
    .hero-stats { gap: 1.2rem !important; flex-wrap: wrap !important; }
    .hero-ctarow { flex-direction: column !important; }
    .hero-ctarow a, .hero-ctarow button { width: 100% !important; justify-content: center !important; }
    .progress-sidebar { display: none !important; }
    .btt-btn { bottom:1.2rem; right:1.2rem; width:38px; height:38px; }
    .float-cta { display: none !important; }
    .kbd-hint { display: none !important; }
    .footer-grid { grid-template-columns:1fr !important; gap:2rem !important; }
    .float-bg { display: none !important; }
    .skill-bar-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
    .otw-banner { flex-direction: column !important; align-items: flex-start !important; }
    .contact-email-row { flex-direction: column !important; }
    .contact-email-row > div, .contact-email-row > a, .contact-email-row > button { width: 100% !important; }
    .footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 0.5rem !important; }
  }

  @media(max-width: 480px) {
    .hero-sec { padding: 6rem 1rem 2.5rem !important; }
    .sec-pad  { padding: 3.5rem 1rem !important; }
    .chip { font-size: 0.76rem !important; padding: 0.2rem 0.5rem !important; }
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  p, li, span, div { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body {
    background: var(--bg);
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 16px;
    color: var(--ink);
    overflow-x: hidden;
    cursor: none;
  }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: repeating-linear-gradient(180deg,#1B3A8A 0,#1B3A8A 6px,#2E5FC9 6px,#2E5FC9 12px); border-left: 2px solid var(--bg); }

  /* Dark mode scrollbar — red */
  [data-theme="dark"] ::-webkit-scrollbar-thumb { background: repeating-linear-gradient(180deg,#6B7FD4 0,#6B7FD4 6px,#7C9EFF 6px,#7C9EFF 12px); }

  .display { font-family: 'Playfair Display', Georgia, serif; }
  .pixel   { font-family: 'Press Start 2P', monospace; }
  .vt      { font-family: 'JetBrains Mono', monospace; }
  .mono    { font-family: 'JetBrains Mono', monospace; }

  .rv { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .rv.on { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.08s; } .d2 { transition-delay: 0.16s; }
  .d3 { transition-delay: 0.24s; } .d4 { transition-delay: 0.32s; }
  .d5 { transition-delay: 0.40s; }

  .grad { background: linear-gradient(135deg, #1B3A8A 0%, #2E5FC9 40%, #5B8FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  /* Dark mode gradient — red */
  [data-theme="dark"] .grad { background: linear-gradient(135deg,#A78BFA 0%,#7C9EFF 40%,#6B7FD4 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .px-card {
    border: 2px solid #1B3A8A;
    box-shadow: 5px 5px 0 #1B3A8A;
    transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
    position: relative;
  }
  .px-card:hover {
    transform: translate(-4px,-4px);
    box-shadow: 9px 9px 0 #1B3A8A, 0 0 24px rgba(27,58,138,0.14);
    border-color: #2E5FC9;
  }

  .px-btn {
    border-radius: 0 !important;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.25);
    transition: transform 0.1s, box-shadow 0.12s, filter 0.1s;
    letter-spacing: 0.03em;
  }
  .px-btn:hover {
    transform: translate(-3px,-3px);
    box-shadow: 7px 7px 0 rgba(0,0,0,0.35);
    filter: brightness(1.08);
  }
  .px-btn:active {
    transform: translate(2px,2px);
    box-shadow: 1px 1px 0 rgba(0,0,0,0.25);
    filter: brightness(0.92);
  }

  .px-divider {
    height: 5px;
    background: repeating-linear-gradient(90deg,
      #1B3A8A 0,#1B3A8A 10px,
      #2E5FC9 10px,#2E5FC9 16px,
      #5B8FE8 16px,#5B8FE8 26px,
      #E8A44A 26px,#E8A44A 36px,
      #D94F3D 36px,#D94F3D 46px,
      #2A7A5E 46px,#2A7A5E 56px,
      transparent 56px,transparent 66px);
    width: 100%;
    box-shadow: 0 2px 8px rgba(27,58,138,0.18);
  }

  /* Dark mode px-divider — red shades */
  [data-theme="dark"] .px-divider {
    background: repeating-linear-gradient(90deg,
      #6B7FD4 0,#6B7FD4 10px,
      #7C9EFF 10px,#7C9EFF 16px,
      #A78BFA 16px,#A78BFA 26px,
      #1E2A4A 26px,#1E2A4A 36px,
      #7C9EFF 36px,#7C9EFF 46px,
      #6B7FD4 46px,#6B7FD4 56px,
      transparent 56px,transparent 66px);
    box-shadow: 0 2px 8px rgba(255,51,51,0.25);
  }

  /* ── DARK MODE OVERRIDES ── */
  [data-theme="dark"] .px-card { box-shadow: 5px 5px 0 #6B7FD4, 0 0 14px rgba(255,51,51,0.12); border-color: #6B7FD4; }
  [data-theme="dark"] .px-card:hover { box-shadow: 9px 9px 0 #7C9EFF, 0 0 28px rgba(255,51,51,0.22); border-color: #A78BFA; }
  [data-theme="dark"] .chip { border-color: #6B7FD4; box-shadow: 2px 2px 0 #6B7FD4; color: #A78BFA; background: #1C2333; }
  [data-theme="dark"] .chip:hover { background: #6B7FD4; color: #fff; }
  [data-theme="dark"] .btt-btn { background: linear-gradient(135deg,#6B7FD4,#1E2A4A); border-color: #6B7FD4; box-shadow: 4px 4px 0 #1E2A4A; }
  [data-theme="dark"] .toast { border-color: #6B7FD4; box-shadow: 4px 4px 0 #6B7FD4; background: #111111; color: #7C9EFF; }
  [data-theme="dark"] .kbd-hint { border-color: #6B7FD4; box-shadow: 3px 3px 0 #6B7FD4; color: #8892B0; background: #111111; }
  [data-theme="dark"] .kbd-key { border-color: #6B7FD4; box-shadow: 2px 2px 0 #6B7FD4; color: #A78BFA; background: #1C2333; }
  [data-theme="dark"] .status-available { border-color: #6B7FD4; box-shadow: 2px 2px 0 #6B7FD4; background: rgba(107,127,212,0.1); }
  [data-theme="dark"] .status-ping { background: #7C9EFF; box-shadow: 0 0 6px rgba(124,158,255,0.7)); }
  [data-theme="dark"] .status-ping::before { background: #7C9EFF; }
  [data-theme="dark"] .scroll-bar { background: repeating-linear-gradient(90deg,#6B7FD4 0,#6B7FD4 8px,#7C9EFF 8px,#7C9EFF 16px,#A78BFA 16px,#A78BFA 24px,#1E2A4A 24px,#1E2A4A 32px); box-shadow: 0 1px 8px rgba(107,127,212,0.5); }
  [data-theme="dark"] nav { background: rgba(15,17,23,0.95) !important; backdrop-filter:blur(12px) saturate(1.5); -webkit-backdrop-filter:blur(12px) saturate(1.5); border-bottom-color: #6B7FD4 !important; box-shadow: 0 2px 0 #6B7FD4 !important; }
  [data-theme="dark"] select, [data-theme="dark"] input, [data-theme="dark"] textarea { background: #1C2333; color: #7C9EFF; border-color: rgba(107,127,212,0.5); }
  [data-theme="dark"] .mob-menu { background: #0F1117; }
  [data-theme="dark"] .mob-menu a { color: #7C9EFF; }
  [data-theme="dark"] .mob-menu a:hover { color: #A78BFA; }
  [data-theme="dark"] .nav-link::after { background: linear-gradient(90deg,#6B7FD4,#A78BFA); }
  [data-theme="dark"] .progress-dot { background: rgba(107,127,212,0.15); border-color: rgba(107,127,212,0.35); }
  [data-theme="dark"] .progress-dot.active { background: #6B7FD4; border-color: #7C9EFF; box-shadow: 3px 3px 0 #1E2A4A, 0 0 8px rgba(107,127,212,0.5); }
  [data-theme="dark"] .progress-dot:hover:not(.active) { background: rgba(107,127,212,0.35); }

  .shimmer-hover {
    position: relative; overflow: hidden;
  }
  .shimmer-hover::before {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    transition: left 0.4s ease;
    pointer-events: none;
    z-index: 1;
  }
  .shimmer-hover:hover::before { left: 150%; }
`;

/* ─────────────── FLOATING ORBS BACKGROUND ─────────────── */
function FloatingOrbs({ dark = false }) {
  const orbs = [
    { w: 600, h: 600, top: "-10%", left: "30%", col: dark ? "rgba(107,127,212,0.07)" : "rgba(27,58,138,0.07)", anim: "orbDrift1 14s ease-in-out infinite", delay: "0s" },
    { w: 420, h: 420, top: "40%",  left: "-8%", col: dark ? "rgba(204,0,0,0.05)" : "rgba(46,95,201,0.05)", anim: "orbDrift2 18s ease-in-out infinite", delay: "2s" },
    { w: 340, h: 340, top: "60%",  left: "75%", col: dark ? "rgba(255,102,102,0.05)" : "rgba(232,164,74,0.04)", anim: "orbDrift3 12s ease-in-out infinite", delay: "4s" },
    { w: 260, h: 260, top: "5%",   left: "78%", col: dark ? "rgba(153,0,0,0.06)" : "rgba(42,122,94,0.04)", anim: "orbDrift1 16s ease-in-out infinite", delay: "6s" },
    { w: 200, h: 200, top: "80%",  left: "50%", col: dark ? "rgba(255,51,51,0.04)" : "rgba(27,58,138,0.04)", anim: "orbDrift2 20s ease-in-out infinite", delay: "1s" },
  ];
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {orbs.map((o, i) => (
        <div key={i} className="orb" style={{
          width: o.w, height: o.h,
          top: o.top, left: o.left,
          background: `radial-gradient(circle, ${o.col} 0%, transparent 70%)`,
          animation: o.anim,
          animationDelay: o.delay,
        }}/>
      ))}
    </div>
  );
}

/* ─────────────── PAGE LOADER ─────────────── */
function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines]       = useState([]);
  const [exit, setExit]         = useState(false);

  const BOOT_LINES = [
    { text: "> BOOT SEQUENCE INITIATED...",   delay: 0   },
    { text: "> LOADING PIXEL ENGINE... OK",   delay: 280 },
    { text: "> MOUNTING REACT CORE... OK",    delay: 520 },
    { text: "> INJECTING PERSONALITY... OK",  delay: 760 },
    { text: "> 900+ DSA PROBLEMS LOADED",     delay: 980 },
    { text: "> CONNECTING TO BRAIN.EXE... OK",delay: 1200},
    { text: "> SYSTEM READY. PRESS START",    delay: 1420},
  ];

  useEffect(() => {
    BOOT_LINES.forEach(({ text, delay }) => {
      setTimeout(() => setLines(p => [...p, text]), delay + 200);
    });
    const start = performance.now();
    const duration = 2400;
    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else {
        setTimeout(() => { setExit(true); setTimeout(onDone, 400); }, 350);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#07091A",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      animation: exit ? "loaderFadeOut 0.4s ease both" : "none",
      fontFamily: "'Press Start 2P', monospace",
    }}>
      <div style={{ position:"relative", zIndex:1, width:"min(480px,90vw)" }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ display:"inline-block", padding:"1rem 2rem", border:"3px solid #1B3A8A", boxShadow:"5px 5px 0 #1B3A8A", marginBottom:"1rem", background:"#0E1A40" }}>
            <span style={{ fontSize:"1.5rem", color:"#A8C0F0", letterSpacing:"4px" }}>AP.EXE</span>
          </div>
          <div style={{ fontSize:"0.72rem", color:"#1B3A8A", letterSpacing:"3px" }}>PORTFOLIO.SYSTEM v2.0.25</div>
        </div>
        <div style={{ background:"linear-gradient(135deg,#07091A 0%,#0C0F28 100%)", border:"2px solid #1B3A8A", boxShadow:"7px 7px 0 #1B3A8A, 0 0 20px rgba(27,58,138,0.12)", padding:"1.2rem", marginBottom:"1.5rem", minHeight:160 }}>
          <div style={{ display:"flex", gap:"0.4rem", marginBottom:"0.8rem" }}>
            {["#D94F3D","#E8A44A","#2A7A5E"].map(c => <div key={c} style={{ width:10, height:10, background:c }}/>)}
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{ fontSize:"0.82rem", color: i === lines.length-1 ? "#2A7A5E" : "rgba(240,237,230,0.55)", marginBottom:"0.3rem", animation:"termLineIn 0.2s ease both", fontFamily:"'JetBrains Mono', monospace" }}>{line}</div>
          ))}
          {lines.length < BOOT_LINES.length && (
            <span style={{ display:"inline-block", width:8, height:13, background:"#1B3A8A", animation:"termCursor 0.8s step-end infinite" }}/>
          )}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
          <span style={{ fontSize:"0.72rem", color:"rgba(240,237,230,0.35)", letterSpacing:"2px" }}>LOADING</span>
          <span style={{ fontSize:"0.72rem", color:"#A8C0F0", fontWeight:600, fontFamily:"'JetBrains Mono', monospace" }}>{progress}%</span>
        </div>
        <div style={{ height:10, background:"rgba(255,255,255,0.04)", border:"2px solid #1B3A8A", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"repeating-linear-gradient(90deg,#1B3A8A 0,#1B3A8A 8px,#2E5FC9 8px,#2E5FC9 12px)", transition:"width 0.08s linear" }}/>
        </div>
        <div style={{ display:"flex", gap:"0.4rem", marginTop:"1rem", justifyContent:"center" }}>
          {[0,1,2,3].map(i => <div key={i} style={{ width:8, height:8, background:"#1B3A8A", animation:`loaderDotPulse 1.2s ease ${i*0.2}s infinite` }}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── TERMINAL EASTER EGG ─────────────── */
const TERM_COMMANDS = {
  help: { output: [
    { text:"AVAILABLE COMMANDS:", col:"#A8C0F0" },
    { text:"  whoami   — who is this guy?",       col:"rgba(240,237,230,0.7)" },
    { text:"  skills   — tech stack",             col:"rgba(240,237,230,0.7)" },
    { text:"  projects — list projects",          col:"rgba(240,237,230,0.7)" },
    { text:"  contact  — get in touch",           col:"rgba(240,237,230,0.7)" },
    { text:"  leetcode — CP stats",               col:"rgba(240,237,230,0.7)" },
    { text:"  hire     — why hire me",            col:"rgba(240,237,230,0.7)" },
    { text:"  socials  — all links",              col:"rgba(240,237,230,0.7)" },
    { text:"  clear    — clear screen",           col:"rgba(240,237,230,0.7)" },
    { text:"  exit     — close terminal",         col:"rgba(240,237,230,0.7)" },
  ]},
  whoami: { output: [
    { text:"ARMAN PHAUGAT", col:"#5B8FE8", bold:true },
    { text:"3rd Year B.Tech CSE @ MUJ", col:"rgba(240,237,230,0.7)" },
    { text:"CGPA: 9.05 | DEAN'S EXCELLENCE AWARD", col:"#2A7A5E" },
    { text:"Backend | AI/ML | Competitive Programmer", col:"rgba(240,237,230,0.7)" },
    { text:"Jaipur, Rajasthan, India", col:"rgba(240,237,230,0.4)" },
  ]},
  skills: { output: [
    { text:"=== CORE STACK ===", col:"#1B3A8A" },
    { text:"  Languages : Python | JS | C | C++ | Java", col:"rgba(240,237,230,0.7)" },
    { text:"  Backend   : Node.js | Express | FastAPI",  col:"rgba(240,237,230,0.7)" },
    { text:"  Databases : MySQL | MongoDB | Redis | FAISS", col:"rgba(240,237,230,0.7)" },
    { text:"  AI / ML   : LangChain | HuggingFace | RAG", col:"rgba(240,237,230,0.7)" },
    { text:"  DevOps    : Docker | Git | BullMQ",        col:"rgba(240,237,230,0.7)" },
  ]},
  projects: { output: [
    { text:"=== 10 PROJECTS ===", col:"#1B3A8A" },
    { text:"  01  Real Time Stock Trading Backend [Backend]", col:"rgba(240,237,230,0.7)" },
    { text:"  02  Video Streaming & User Mgmt     [Backend]", col:"rgba(240,237,230,0.7)" },
    { text:"  03  RAG Discord Bot                 [Backend+AI]",  col:"rgba(240,237,230,0.7)" },
    { text:"  04  RAG Bot Website                 [Frontend]",col:"rgba(240,237,230,0.7)" },
    { text:"  05  Cricket Score Predictor         [AI/ML]",  col:"rgba(240,237,230,0.7)" },
    { text:"  06  IPL Win Predictor               [AI/ML]",  col:"rgba(240,237,230,0.7)" },
    { text:"  07  Book Recommender System         [AI/ML]",  col:"rgba(240,237,230,0.7)" },
    { text:"  08  WhatsApp Chat Analyser          [AI/ML]",  col:"rgba(240,237,230,0.7)" },
    { text:"  09  Cuntrex 2D Shooter Game         [Game]",   col:"rgba(240,237,230,0.7)" },
    { text:"  10  SalesForce UI Clone             [Frontend]",col:"rgba(240,237,230,0.7)"},
    { text:"-> scroll to #projects", col:"#2A7A5E" },
  ]},
  contact: { output: [
    { text:"=== CONTACT ===", col:"#1B3A8A" },
    { text:"  Email    : armanphaugat20@gmail.com", col:"rgba(240,237,230,0.7)" },
    { text:"  Phone    : +91-9306115772",           col:"rgba(240,237,230,0.7)" },
    { text:"  LinkedIn : linkedin.com/in/armanphaugat05", col:"#5B8FE8" },
    { text:"  GitHub   : github.com/armanphaugat",  col:"#5B8FE8" },
    { text:"  LeetCode : leetcode.com/u/armanphaugat20", col:"#E8A44A" },
  ]},
  leetcode: { output: [
    { text:"=== LEETCODE STATS ===", col:"#E8A44A" },
    { text:"  Handle   : armanphaugat20",    col:"rgba(240,237,230,0.7)" },
    { text:"  Problems : 900+",              col:"rgba(240,237,230,0.7)" },
    { text:"  Rank     : TOP 0.3% GLOBALLY", col:"#2A7A5E", bold:true },
    { text:"  Streak   : 120+ days max",     col:"rgba(240,237,230,0.7)" },
    { text:"  BEATS 99.7% OF ALL USERS !!!", col:"#E8A44A", bold:true },
  ]},
  hire: { output: [
    { text:"=== WHY HIRE ARMAN? ===", col:"#2A7A5E" },
    { text:"  [X] Top 0.3% LeetCode — algorithmic thinker", col:"rgba(240,237,230,0.7)" },
    { text:"  [X] Ships real systems (Redis, BullMQ, Docker)", col:"rgba(240,237,230,0.7)" },
    { text:"  [X] Builds AI apps from scratch with LangChain", col:"rgba(240,237,230,0.7)" },
    { text:"  [X] 9.05 CGPA — academically rigorous",         col:"rgba(240,237,230,0.7)" },
    { text:"  [X] Internship @ Indavis Lifesciences",          col:"rgba(240,237,230,0.7)" },
    { text:"  [X] Learning Go + K8s right now",                col:"rgba(240,237,230,0.7)" },
    { text:"  -> armanphaugat20@gmail.com", col:"#5B8FE8", bold:true },
  ]},
  socials: { output: [
    { text:"=== SOCIALS ===", col:"#1B3A8A" },
    { text:"  [G] github.com/armanphaugat",            col:"rgba(240,237,230,0.7)" },
    { text:"  [L] linkedin.com/in/armanphaugat05",     col:"rgba(240,237,230,0.7)" },
    { text:"  [LC] leetcode.com/u/armanphaugat20",     col:"#E8A44A" },
    { text:"  [M] armanphaugat20@gmail.com",           col:"rgba(240,237,230,0.7)" },
  ]},
};

function TerminalEasterEgg({ onClose }) {
  const [history, setHistory]   = useState([{ type:"system", lines:[
    { text:"ARMAN'S PORTFOLIO TERMINAL v1.0.0", col:"#5B8FE8", bold:true },
    { text:"Type 'help' to see commands.", col:"rgba(240,237,230,0.4)" },
  ]}]);
  const [input, setInput]       = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [visible, setVisible]   = useState(true);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [history]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setCmdHistory(p => [cmd, ...p]);
    setHistIdx(-1);
    if (cmd === "clear") { setHistory([]); return; }
    if (cmd === "exit") { setVisible(false); setTimeout(onClose, 380); return; }
    if (cmd === "sudo rm -rf /") {
      setHistory(p => [...p, { type:"cmd", text:raw }, { type:"output", lines:[{ text:"PERMISSION DENIED. NICE TRY. :)", col:"#D94F3D" }] }]);
      return;
    }
    const result = TERM_COMMANDS[cmd];
    if (result) {
      setHistory(p => [...p, { type:"cmd", text:raw }, { type:"output", lines:result.output }]);
    } else {
      setHistory(p => [...p, { type:"cmd", text:raw }, { type:"output", lines:[
        { text:`COMMAND NOT FOUND: ${cmd}`, col:"#D94F3D" },
        { text:"type 'help' for commands.", col:"rgba(240,237,230,0.4)" },
      ]}]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const next = Math.min(histIdx+1, cmdHistory.length-1); setHistIdx(next); setInput(cmdHistory[next]||""); }
    else if (e.key === "ArrowDown") { e.preventDefault(); const next = Math.max(histIdx-1, -1); setHistIdx(next); setInput(next===-1?"":cmdHistory[next]); }
    else if (e.key === "Escape") { setVisible(false); setTimeout(onClose, 380); }
  };

  return (
    <div onClick={e=>{ if(e.target===e.currentTarget){setVisible(false);setTimeout(onClose,380);}}} style={{ position:"fixed", inset:0, zIndex:9990, background:"rgba(7,9,26,0.88)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div style={{ width:"min(700px,96vw)", maxHeight:"80vh", background:"#07091A", border:"3px solid #1B3A8A", boxShadow:"7px 7px 0 #1B3A8A", overflow:"hidden", display:"flex", flexDirection:"column", animation: visible?"terminalSlideIn 0.35s ease both":"terminalSlideOut 0.32s ease both", fontFamily:"'JetBrains Mono', monospace" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.7rem 1rem", background:"linear-gradient(135deg,#1B3A8A,#0A0F2E)", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
            {["#D94F3D","#E8A44A","#2A7A5E"].map(c => <div key={c} style={{ width:12,height:12,background:c,border:"2px solid rgba(0,0,0,0.3)" }}/>)}
            <span style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.9)", marginLeft:"0.5rem", fontFamily:"'Press Start 2P', monospace" }}>TERMINAL.EXE</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.6)", fontFamily:"'JetBrains Mono', monospace" }}>ESC to close</span>
            <button onClick={()=>{setVisible(false);setTimeout(onClose,380);}} style={{ background:"none", border:"2px solid rgba(255,255,255,0.3)", cursor:"pointer", color:"#fff", fontSize:"0.8rem", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
        </div>
        <div onClick={()=>inputRef.current?.focus()} style={{ flex:1, overflowY:"auto", padding:"1rem 1.2rem", fontSize:"0.9rem", lineHeight:1.75, cursor:"text" }}>
          {history.map((entry, ei) => (
            <div key={ei} style={{ marginBottom:"0.5rem", animation:"termLineIn 0.2s ease both" }}>
              {entry.type==="cmd" && (
                <div style={{ display:"flex", gap:"0.5rem", color:"rgba(240,237,230,0.95)" }}>
                  <span style={{ color:"#2E5FC9", userSelect:"none" }}>ARMAN@PORTFOLIO</span>
                  <span style={{ color:"rgba(240,237,230,0.3)", userSelect:"none" }}>:~$</span>
                  <span>{entry.text}</span>
                </div>
              )}
              {(entry.type==="output"||entry.type==="system") && (
                <div style={{ paddingLeft:entry.type==="output"?"1rem":0 }}>
                  {entry.lines.map((l,li) => <div key={li} style={{ color:l.col||"rgba(240,237,230,0.82)", fontWeight:l.bold?600:400, whiteSpace:"pre" }}>{l.text}</div>)}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.2rem", borderTop:"2px solid #1B3A8A", background:"rgba(27,58,138,0.06)", flexShrink:0 }}>
          <span style={{ color:"#2E5FC9", fontSize:"0.82rem", userSelect:"none" }}>ARMAN@PORTFOLIO</span>
          <span style={{ color:"rgba(240,237,230,0.3)", fontSize:"0.82rem", userSelect:"none" }}>:~$</span>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} autoComplete="off" spellCheck={false} placeholder="type command..." style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:"0.9rem", color:"rgba(240,237,230,0.88)", caretColor:"#2E5FC9", fontFamily:"'JetBrains Mono', monospace" }}/>
          <div style={{ width:8, height:14, background:"#1B3A8A", animation:"termCursor 0.9s step-end infinite", flexShrink:0 }}/>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── TOAST SYSTEM ─────────────── */
const toastListeners = [];
function showToast(msg, icon="✓") { toastListeners.forEach(fn => fn({ msg, icon, id:Date.now() })); }
function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const fn = (t) => { setToasts(p=>[...p,t]); setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==t.id)), 3000); };
    toastListeners.push(fn);
    return () => { const i=toastListeners.indexOf(fn); if(i>-1)toastListeners.splice(i,1); };
  }, []);
  return (
    <div className="toast-wrap">
      {toasts.map(t => <div key={t.id} className="toast"><span style={{fontSize:"0.9rem"}}>{t.icon}</span><span>{t.msg}</span></div>)}
    </div>
  );
}

/* ─────────────── SCROLL PROGRESS BAR ─────────────── */
function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const el=document.documentElement; setPct((el.scrollTop/(el.scrollHeight-el.clientHeight))*100); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-bar" style={{ width:`${pct}%` }} />;
}

/* ─────────────── MOUSE TRAIL ─────────────── */
function MouseTrail() {
  useEffect(() => {
    const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";
    const COLORS_LIGHT = ["#1B3A8A","#2E5FC9","#E8A44A","#D94F3D","#2A7A5E"];
    const COLORS_DARK  = ["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA"];
    let count = 0;
    const fn = (e) => {
      if (count++ % 3 !== 0) return;
      const el = document.createElement("div");
      const size = 5;
      const COLORS = isDark() ? COLORS_DARK : COLORS_LIGHT;
      el.style.cssText = `position:fixed;pointer-events:none;z-index:9997;width:${size}px;height:${size}px;background:${COLORS[Math.floor(Math.random()*COLORS.length)]};left:${e.clientX-size/2}px;top:${e.clientY-size/2}px;animation:sparkle 0.5s ease both;`;
      document.body.appendChild(el);
      setTimeout(()=>el.remove(), 600);
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
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const COLORS = isDark
          ? ["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA","#7C9EFF"]
          : ["#1B3A8A","#2E5FC9","#E8A44A","#D94F3D","#2A7A5E","#5B8FE8"];
        for (let i=0; i<80; i++) {
          const el = document.createElement("div");
          const size = Math.random()*10+5;
          el.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:${size}px;height:${size}px;background:${COLORS[Math.floor(Math.random()*COLORS.length)]};left:${Math.random()*100}vw;top:-20px;animation:confettiFall ${1.5+Math.random()*2}s ease ${Math.random()*0.8}s both;`;
          document.body.appendChild(el);
          setTimeout(()=>el.remove(), 4000);
        }
        showToast("KONAMI CODE UNLOCKED! NICE!", "🎮");
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
      if (e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA") return;
      const map = {
        g: { url:"https://github.com/armanphaugat", label:"Opening GitHub...", icon:"G" },
        l: { url:"https://leetcode.com/u/armanphaugat20", label:"Opening LeetCode...", icon:"LC" },
        k: { url:"https://www.linkedin.com/in/armanphaugat05/", label:"Opening LinkedIn...", icon:"LI" },
        r: { url:"/ARMANRESUME.pdf", label:"Downloading resume...", icon:"PDF" },
      };
      const scroll = { "1":"hero","2":"about","3":"projects","4":"skills","5":"contact" };
      if (map[e.key]) { const {url,label,icon}=map[e.key]; showToast(label,icon); setHint(null); setTimeout(()=>window.open(url,"_blank"),400); }
      if (scroll[e.key]) { document.getElementById(scroll[e.key])?.scrollIntoView({behavior:"smooth"}); showToast(`Jumped to section ${e.key}`,"→"); }
      if (e.key==="?") { setHint(p=>p?null:true); clearTimeout(timer); if(!hint)timer=setTimeout(()=>setHint(null),5000); }
    };
    window.addEventListener("keydown", fn);
    return () => { window.removeEventListener("keydown", fn); clearTimeout(timer); };
  }, [hint]);

  if (!hint) return <div className="kbd-hint" style={{opacity:0.5}}>Press <span className="kbd-key">?</span> for shortcuts · <span className="kbd-key">`</span> for terminal</div>;
  return (
    <div className="kbd-hint" style={{gap:"1.2rem",opacity:1,padding:"0.8rem 1.5rem"}}>
      {[["G","GitHub"],["L","LeetCode"],["K","LinkedIn"],["R","Resume"],["1-5","Sections"],["`","Terminal"]].map(([k,v]) => (
        <span key={k} style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
          <span className="kbd-key">{k}</span>
          <span style={{fontSize:"0.82rem"}}>{v}</span>
        </span>
      ))}
    </div>
  );
}

/* ─────────────── FLOATING CTA ─────────────── */
function FloatingConnectCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => { const t=setTimeout(()=>{ if(!dismissed)setShow(true); },12000); return ()=>clearTimeout(t); }, [dismissed]);
  if (!show||dismissed) return null;
  return (
    <div className="float-cta">
      <div style={{ background:"var(--paper)", border:"2px solid #1B3A8A", boxShadow:"5px 5px 0 #1B3A8A", padding:"1rem 1.2rem", maxWidth:220, position:"relative" }}>
        <button onClick={()=>setDismissed(true)} style={{ position:"absolute", top:"0.3rem", right:"0.4rem", background:"none", border:"2px solid #1B3A8A", cursor:"pointer", fontSize:"0.82rem", color:"var(--muted)", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        <div className="status-available" style={{marginBottom:"0.6rem"}}>
          <div className="status-ping"/>
          <span style={{fontSize:"0.88rem",color:"#2A7A5E",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Available</span>
        </div>
        <div style={{fontSize:"0.75rem",fontWeight:600,color:"var(--ink)",marginBottom:"0.3rem",fontFamily:"'Press Start 2P', monospace",lineHeight:1.6}}>OPEN TO WORK</div>
        <div style={{fontSize:"0.88rem",color:"var(--muted)",marginBottom:"0.8rem",lineHeight:1.5,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Backend · AI/ML · Full Stack</div>
        <a href="mailto:armanphaugat20@gmail.com" style={{ display:"block", textAlign:"center", padding:"0.5rem", background:"#1B3A8A", color:"#fff", border:"none", fontSize:"0.85rem", fontWeight:600, textDecoration:"none", fontFamily:"'DM Sans', system-ui, sans-serif", boxShadow:"3px 3px 0 #0A0F2E" }} onClick={()=>setDismissed(true)}>Let's talk →</a>
      </div>
    </div>
  );
}

/* ─────────────── THEME ACCENT PICKER ─────────────── */
function ThemeAccentPicker() {
  const [open, setOpen] = useState(false);
  const ACCENTS = [
    { key:"navy",   col:"#1B3A8A" },
    { key:"cobalt", col:"#2E5FC9" },
    { key:"forest", col:"#2A7A5E" },
    { key:"amber",  col:"#E8A44A" },
  ];
  const pick = (key, col) => {
    document.documentElement.style.setProperty("--v-acc", col);
    showToast(`Theme: ${key}`, "🎨");
    setOpen(false);
  };
  return (
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(o=>!o)} title="Change accent" style={{ width:34, height:34, background:"var(--vPale)", border:"2px solid #1B3A8A", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"2px 2px 0 #1B3A8A" }}>
        <div style={{width:14,height:14,background:"linear-gradient(135deg,#1B3A8A,#2E5FC9)"}}/>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 0.4rem)", right:0, background:"var(--paper)", border:"2px solid #1B3A8A", padding:"0.5rem", boxShadow:"4px 4px 0 #1B3A8A", display:"flex", gap:"0.3rem", zIndex:900 }}>
          {ACCENTS.map(a => (
            <button key={a.key} onClick={()=>pick(a.key,a.col)} style={{ width:24, height:24, background:a.col, border:"2px solid rgba(0,0,0,0.15)", cursor:"pointer" }}/>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────── GITHUB/LEETCODE STATS ─────────────── */
function GitHubStatsCard() {
  const stats = [
    { label:"MAX STREAK", value:"120+", icon:"🔥", col:"#D94F3D" },
    { label:"LANGUAGES",  value:"3",    icon:"💻", col:"#1B3A8A" },
    { label:"QUESTIONS",  value:"700+", icon:"⚡", col:"#E8A44A" },
    { label:"BADGES",     value:"9+",   icon:"★",  col:"#2A7A5E" },
  ];
  return (
    <div style={{ background:"linear-gradient(135deg,#07091A 0%,#0C0F28 100%)", border:"2px solid #1B3A8A", boxShadow:"7px 7px 0 #1B3A8A, 0 0 20px rgba(27,58,138,0.12)", padding:"1.5rem", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.2rem"}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#E8A44A"/></svg>
        <div>
          <div style={{fontSize:"0.95rem",fontWeight:600,color:"#F0EDE6"}}>ARMANPHAUGAT</div>
          <div style={{fontSize:"0.82rem",color:"rgba(240,237,230,0.4)"}}>leetcode.com/armanphaugat20</div>
        </div>
        <a href="https://leetcode.com/armanphaugat20" target="_blank" rel="noreferrer" style={{ marginLeft:"auto", padding:"0.3rem 0.8rem", background:"rgba(255,255,255,0.06)", color:"#F0EDE6", border:"2px solid rgba(255,255,255,0.15)", fontSize:"0.82rem", textDecoration:"none" }}>+ Follow</a>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem",marginBottom:"1rem"}}>
        {stats.map(s => (
          <div key={s.label} style={{background:"rgba(255,255,255,0.03)",border:`2px solid ${s.col}`,padding:"0.75rem",boxShadow:`3px 3px 0 ${s.col}22`}}>
            <div style={{fontSize:"1rem",marginBottom:"0.2rem"}}>{s.icon}</div>
            <div style={{fontSize:"1.3rem",fontWeight:600,color:"#F0EDE6",fontFamily:"'JetBrains Mono', monospace",lineHeight:1.2}}>{s.value}</div>
            <div style={{fontSize:"0.8rem",color:"rgba(240,237,230,0.4)",textTransform:"uppercase",letterSpacing:"1px",marginTop:"0.2rem"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{fontSize:"0.85rem",color:"rgba(240,237,230,0.4)",marginBottom:"0.4rem",fontWeight:500}}>Activity</div>
        <div style={{display:"flex",gap:"2px",flexWrap:"wrap"}}>
          {Array.from({length:52*7}).map((_,i) => {
            const intensity = Math.random();
            const bg = intensity>0.85?"#E8A44A":intensity>0.6?"#B87A2A":intensity>0.35?"#6B4410":intensity>0.15?"#3A2508":"rgba(255,255,255,0.03)";
            return <div key={i} style={{width:9,height:9,background:bg,transition:"background 0.2s"}}/>;
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── FUN FACTS TICKER ─────────────── */
const FUN_FACTS = [
  "I debug with console.log. No shame. Ever.",
  "First language: C. Not Python. Chaos.",
  "I solve LeetCode while waiting for builds.",
  "I read system design blogs for fun...",
  "Dark mode since before it was a feature.",
  "I've rewritten projects from scratch 3x.",
  "ACID compliance = my love language.",
  "I named a var 'temp2' once. Regret daily.",
];
function FunFactsTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i=>(i+1)%FUN_FACTS.length); setVisible(true); }, 400);
    }, 4000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{overflow:"hidden",height:"1.4rem"}}>
      <div style={{ fontSize:"0.88rem", color:"rgba(240,237,230,0.35)", transition:"opacity 0.4s,transform 0.4s", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(8px)", whiteSpace:"nowrap", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
        › {FUN_FACTS[idx]}
      </div>
    </div>
  );
}

/* ─────────────── LIVE IST CLOCK ─────────────── */
function LiveISTClock() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset()*60000;
      const ist = new Date(utc + 5.5*3600000);
      const h = ist.getHours();
      const m = String(ist.getMinutes()).padStart(2,"0");
      const s = String(ist.getSeconds()).padStart(2,"0");
      const ampm = h>=12?"PM":"AM";
      const h12 = String(h%12||12).padStart(2,"0");
      const days=["SUN","MON","TUE","WED","THU","FRI","SAT"];
      setTime({ display:`${h12}:${m}:${s} ${ampm}`, day:days[ist.getDay()], isWorkHour:h>=9&&h<19 });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);
  if (!time) return null;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", padding:"0.7rem 1rem", background:"rgba(27,58,138,0.05)", border:"2px solid #1B3A8A", marginBottom:"1rem", boxShadow:"3px 3px 0 #1B3A8A" }}>
      <div style={{fontSize:"1.2rem"}}>🕐</div>
      <div>
        <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"1.1rem", fontWeight:500, color:"var(--ink)", letterSpacing:"1px", lineHeight:1.2 }}>{time.display}</div>
        <div style={{ fontSize:"0.85rem", color:"var(--muted)", fontFamily:"'DM Sans', system-ui, sans-serif", marginTop:"0.15rem" }}>{time.day} · IST (UTC+5:30) · Jaipur</div>
      </div>
      <div style={{marginLeft:"auto",textAlign:"right"}}>
        <div style={{ fontSize:"0.82rem", fontWeight:600, fontFamily:"'DM Sans', system-ui, sans-serif", color:time.isWorkHour?"#2A7A5E":"#B8832A", background:time.isWorkHour?"rgba(42,122,94,0.1)":"rgba(232,164,74,0.1)", border:`2px solid ${time.isWorkHour?"#2A7A5E":"#E8A44A"}`, padding:"0.2rem 0.6rem", boxShadow:`2px 2px 0 ${time.isWorkHour?"#2A7A5E":"#E8A44A"}` }}>
          {time.isWorkHour?"Awake":"Sleeping"}
        </div>
        <div style={{fontSize:"0.85rem",color:"var(--inkMid)",marginTop:"0.2rem",fontWeight:500}}>{time.isWorkHour?"likely at desk":"replies in AM"}</div>
      </div>
    </div>
  );
}

function AvailabilityWidget() {
  const days=["MON","TUE","WED","THU","FRI","SAT","SUN"];
  const slots={MON:["10:00","14:00","16:00"],TUE:["11:00","15:00"],WED:["10:00","13:00","17:00"],THU:["14:00","16:00"],FRI:["10:00","12:00"],SAT:[],SUN:[]};
  return (
    <div style={{background:"var(--paper)",border:"2px solid #1B3A8A",padding:"1.5rem",boxShadow:"5px 5px 0 #1B3A8A"}}>
      <LiveISTClock />
      <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"1rem"}}>
        <span style={{fontSize:"1rem"}}>📅</span>
        <div>
          <div style={{fontSize:"0.72rem",fontWeight:700,color:"var(--ink)",fontFamily:"'Press Start 2P', monospace"}}>AVAILABILITY</div>
          <div style={{fontSize:"0.85rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>IST (UTC+5:30)</div>
        </div>
        <div className="status-available" style={{marginLeft:"auto"}}>
          <div className="status-ping"/>
          <span style={{fontSize:"0.88rem",color:"#2A7A5E",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Open</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"0.3rem"}}>
        {days.map(d => (
          <div key={d} style={{textAlign:"center"}}>
            <div style={{fontSize:"0.7rem",color:"var(--muted)",fontFamily:"'JetBrains Mono', monospace",marginBottom:"0.3rem",fontWeight:500}}>{d}</div>
            {slots[d].length>0?slots[d].map(t=>(
              <div key={t} style={{fontSize:"0.78rem",padding:"0.2rem",marginBottom:"0.2rem",background:"rgba(27,58,138,0.08)",color:"#1B3A8A",fontFamily:"'JetBrains Mono', monospace",border:"1px solid #1B3A8A",fontWeight:500}}>{t}</div>
            )):(
              <div style={{fontSize:"0.8rem",color:"var(--muted)",opacity:0.4,fontFamily:"'JetBrains Mono', monospace"}}>--</div>
            )}
          </div>
        ))}
      </div>
      <a href="mailto:armanphaugat20@gmail.com?subject=Meeting Request" style={{ display:"block", textAlign:"center", marginTop:"1rem", padding:"0.55rem", background:"rgba(27,58,138,0.08)", border:"2px solid #1B3A8A", fontSize:"0.88rem", fontWeight:600, color:"#1B3A8A", textDecoration:"none", boxShadow:"3px 3px 0 #1B3A8A", fontFamily:"'DM Sans', system-ui, sans-serif", transition:"all 0.1s" }}
        onMouseEnter={e=>{e.currentTarget.style.background="#1B3A8A";e.currentTarget.style.color="#fff";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(27,58,138,0.08)";e.currentTarget.style.color="#1B3A8A";}}
      >Book a call →</a>
    </div>
  );
}

/* ─────────────── SKILL RADAR ─────────────── */
function SkillRadar() {
  const skills=[{label:"Backend",val:90},{label:"DSA/CP",val:92},{label:"AI/ML",val:80},{label:"Databases",val:85},{label:"DevOps",val:75},{label:"Frontend",val:72}];
  const N=skills.length;
  const cx=160,cy=160,R=120;
  const angleStep=(Math.PI*2)/N;
  const polarToXY=(i,r)=>({x:cx+r*Math.sin(i*angleStep),y:cy-r*Math.cos(i*angleStep)});
  const rings=[0.25,0.5,0.75,1.0];
  const dataPoints=skills.map((s,i)=>polarToXY(i,(s.val/100)*R));
  const poly=dataPoints.map(p=>`${p.x},${p.y}`).join(" ");
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <svg width="320" height="320" viewBox="0 0 320 320">
        {rings.map(r=>(
          <polygon key={r} points={skills.map((_,i)=>{const p=polarToXY(i,r*R);return `${p.x},${p.y}`;}).join(" ")} fill="none" stroke="rgba(27,58,138,0.18)" strokeWidth="1" strokeDasharray="4,4"/>
        ))}
        {skills.map((_,i)=>{const p=polarToXY(i,R);return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(27,58,138,0.12)" strokeWidth="1"/>;} )}
        <polygon points={poly} fill="rgba(27,58,138,0.12)" stroke="#1B3A8A" strokeWidth="2"/>
        {dataPoints.map((p,i)=><rect key={i} x={p.x-4} y={p.y-4} width={8} height={8} fill="#1B3A8A" stroke="#fff" strokeWidth="2"/>)}
        {skills.map((s,i)=>{const p=polarToXY(i,R+22);return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="var(--ink)" fontSize="10" fontFamily="'DM Sans', system-ui, sans-serif" fontWeight="500">{s.label}</text>;})}
        {skills.map((s,i)=>{const p=polarToXY(i,(s.val/100)*R-14);return <text key={`v${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="#1B3A8A" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="500">{s.val}%</text>;})}
      </svg>
    </div>
  );
}

/* ─────────────── PROJECT STATS BAR ─────────────── */
function ProjectStatsBar() {
  const catCounts = {};
  CATEGORIES.slice(1).forEach(cat => {
    catCounts[cat] = PROJECTS.filter(p=>{
      const cats = Array.isArray(p.categories) ? p.categories : [p.category];
      return cats.includes(cat);
    }).length;
  });
  const cats=[{label:"Backend",count:catCounts["Backend"],col:"#1B3A8A"},{label:"AI/ML",count:catCounts["AI/ML"],col:"#2E5FC9"},{label:"Frontend",count:catCounts["Frontend"],col:"#2A7A5E"},{label:"Game",count:catCounts["Game"],col:"#E8A44A"}];
  const total=cats.reduce((s,c)=>s+c.count,0);
  return (
    <div style={{marginBottom:"2rem"}} className="rv">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.6rem"}}>
        <span style={{fontSize:"0.82rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:500}}>Category breakdown</span>
        <span style={{fontSize:"0.82rem",color:"var(--muted)",fontFamily:"'JetBrains Mono', monospace"}}>{total} total</span>
      </div>
      <div style={{height:10,overflow:"hidden",display:"flex",gap:2,border:"2px solid #1B3A8A",boxShadow:"3px 3px 0 #1B3A8A"}}>
        {cats.map(c=><div key={c.label} style={{flex:c.count,background:c.col}} title={`${c.label}: ${c.count}`}/>)}
      </div>
      <div style={{display:"flex",gap:"1rem",marginTop:"0.5rem",flexWrap:"wrap"}}>
        {cats.map(c=>(
          <div key={c.label} style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
            <div style={{width:8,height:8,background:c.col,border:`1px solid ${c.col}`}}/>
            <span style={{fontSize:"0.85rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{c.label} ({c.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── CURSOR ─────────────── */
function Cursor({ dark }) {
  const dot=useRef(null); const trail=useRef(null);
  const cursorColor = dark ? "#7C9EFF" : "#1B3A8A";
  useEffect(()=>{
    let tx=0,ty=0;
    const onMove=(e)=>{
      const x=e.clientX,y=e.clientY;
      if(dot.current){dot.current.style.left=x+"px";dot.current.style.top=y+"px";}
      const step=()=>{ tx+=(x-tx)*0.12; ty+=(y-ty)*0.12; if(trail.current){trail.current.style.left=tx+"px";trail.current.style.top=ty+"px";} requestAnimationFrame(step); };
      step();
    };
    window.addEventListener("mousemove",onMove);
    return ()=>window.removeEventListener("mousemove",onMove);
  },[]);
  return (
    <>
      <div ref={dot} style={{position:"fixed",width:7,height:7,background:cursorColor,transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9999}}/>
      <div ref={trail} style={{position:"fixed",width:18,height:18,border:`2px solid ${cursorColor}`,transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9998,opacity:.45}}/>
    </>
  );
}

/* ─────────────── SCROLL REVEAL ─────────────── */
function useReveal() {
  useEffect(()=>{
    const els=document.querySelectorAll(".rv");
    const obs=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("on");obs.unobserve(e.target);} }); },{threshold:0.1});
    els.forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  });
}

function useSectionTransitions() {
  useEffect(()=>{
    const els=document.querySelectorAll(".sec-transition");
    const obs=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);} }); },{threshold:0.08});
    els.forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  });
}

function useTilt(ref) {
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const onMove=(e)=>{ const r=el.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-0.5; const y=(e.clientY-r.top)/r.height-0.5; el.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.02)`; };
    const onLeave=()=>{ el.style.transform=""; };
    el.addEventListener("mousemove",onMove);
    el.addEventListener("mouseleave",onLeave);
    return ()=>{ el.removeEventListener("mousemove",onMove); el.removeEventListener("mouseleave",onLeave); };
  },[]);
}

/* ─────────────── NAV ─────────────── */
function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>50); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); },[]);
  const links=["About","Experience","Resume","Projects","Skills","Timeline","Contact"];
  const closeMenu=()=>setMenuOpen(false);

  const navAccent = dark ? "#6B7FD4" : "#1B3A8A";
  const navAccentShadow = dark ? "#1E2A4A" : "#0A0F2E";

  const barStyle=(open,which)=>({
    display:"block",width:22,height:2,background:"var(--ink)",
    transformOrigin:"center",transition:"transform 0.3s, opacity 0.3s",
    transform:open?which==="top"?"translateY(8px) rotate(45deg)":which==="bot"?"translateY(-8px) rotate(-45deg)":"scaleX(0)":"none",
    opacity:open&&which==="mid"?0:1,
  });

  return (
    <>
      <div className={`mob-menu${menuOpen?" open":""}`}>
        {links.map(l=><a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu}>{l}</a>)}
        <button onClick={()=>setDark(d=>!d)} style={{ background:"none", border:`2px solid ${navAccent}`, padding:"0.6rem 1.4rem", cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", gap:"0.5rem", fontFamily:"'DM Sans', system-ui, sans-serif", fontWeight:600, color:"var(--ink)", boxShadow:`3px 3px 0 ${navAccent}` }}>
          <span key={dark?"m":"s"} style={{animation:"darkToggle 0.3s ease both"}}>{dark?"☀️":"🌙"}</span>
          {dark?"Light mode":"Dark mode"}
        </button>
      </div>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:600, display:"flex", alignItems:"center", justifyContent:"space-between", padding:scrolled||menuOpen?"0.8rem 2rem":"1.2rem 2rem", background:scrolled||menuOpen?"var(--bg)":"transparent", borderBottom:scrolled?`2px solid ${navAccent}`:"2px solid transparent", boxShadow:scrolled?`0 2px 0 ${navAccent}`:"none", transition:"all 0.25s ease", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
        <div style={{display:"flex",alignItems:"center",gap:"0.7rem"}}>
          <div style={{width:32,height:32,background:navAccent,border:`2px solid ${navAccentShadow}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`3px 3px 0 ${navAccentShadow}`}}>
            <span style={{color:"#fff",fontSize:"0.75rem",fontWeight:700,fontFamily:"'Press Start 2P', monospace"}}>AP</span>
          </div>
          <span style={{fontSize:"0.95rem",color:navAccent,fontWeight:600,fontFamily:"'Playfair Display', Georgia, serif",fontStyle:"italic"}}>arman<span style={{color:"var(--muted)",fontStyle:"normal"}}>.exe</span></span>
        </div>
        <div className="hide-mob" style={{display:"flex",gap:"1.8rem"}}>
          {links.map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{color:"var(--inkMid)",fontSize:"0.95rem",fontWeight:500,letterSpacing:"0.3px"}}
              onMouseEnter={e=>e.currentTarget.style.color=navAccent}
              onMouseLeave={e=>e.currentTarget.style.color="var(--inkMid)"}
            >{l}</a>
          ))}
        </div>
        <div className="hide-mob" style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
          <ThemeAccentPicker/>
          <button onClick={()=>setDark(d=>!d)} title="Toggle theme" style={{ width:34, height:34, background:"var(--vPale)", border:`2px solid ${navAccent}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`2px 2px 0 ${navAccent}`, transition:"all 0.1s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translate(-1px,-1px)"}
            onMouseLeave={e=>{e.currentTarget.style.transform="";}}
          >
            <span key={dark?"moon":"sun"} style={{fontSize:"0.9rem",animation:"darkToggle 0.3s ease both"}}>{dark?"☀️":"🌙"}</span>
          </button>
          <a href="https://www.linkedin.com/in/armanphaugat05/" target="_blank" rel="noreferrer" style={{ width:34,height:34,background:"#0A66C2",border:"2px solid #004182",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",boxShadow:"2px 2px 0 #004182",transition:"all 0.1s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translate(-1px,-1px)"}
            onMouseLeave={e=>{e.currentTarget.style.transform="";}}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" style={{ width:34,height:34,background:"#E8A44A",border:"2px solid #B87A2A",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",boxShadow:"2px 2px 0 #B87A2A",transition:"all 0.1s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translate(-1px,-1px)"}
            onMouseLeave={e=>{e.currentTarget.style.transform="";}}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
          </a>
          <a href="mailto:armanphaugat20@gmail.com" style={{ padding:"0.55rem 1.1rem", background:navAccent, color:"#fff", border:`2px solid ${navAccentShadow}`, fontSize:"0.92rem", fontWeight:600, textDecoration:"none", boxShadow:`3px 3px 0 ${navAccentShadow}`, transition:"all 0.1s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translate(-1px,-1px)";e.currentTarget.style.boxShadow=`4px 4px 0 ${navAccentShadow}`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`3px 3px 0 ${navAccentShadow}`;}}
          >Hire me ▶</a>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" style={{ padding:"0.55rem 1.1rem", background:"transparent", color:navAccent, border:`2px solid ${navAccent}`, fontSize:"0.92rem", fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:"0.4rem", animation:"resumePulse 2.5s ease-in-out infinite", boxShadow:`3px 3px 0 ${navAccent}`, whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.background=navAccent;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=navAccent;}}
          >
            <Download size={12} strokeWidth={2.5}/>CV
          </a>
        </div>
        <button className="show-mob" onClick={()=>setMenuOpen(o=>!o)} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", display:"flex", flexDirection:"column", gap:6, zIndex:700 }}>
          <span style={barStyle(menuOpen,"top")}/>
          <span style={barStyle(menuOpen,"mid")}/>
          <span style={barStyle(menuOpen,"bot")}/>
        </button>
      </nav>
    </>
  );
}

/* ─────────────── ANIMATED COUNTER ─────────────── */
function useCounter(target, duration=1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setStarted(true); },{threshold:0.5}); if(ref.current)obs.observe(ref.current); return ()=>obs.disconnect(); },[]);
  useEffect(()=>{
    if(!started) return;
    const isFloat=String(target).includes(".");
    const numTarget=parseFloat(target);
    const start=performance.now();
    const step=(now)=>{ const progress=Math.min((now-start)/duration,1); const ease=1-Math.pow(1-progress,3); const val=numTarget*ease; setCount(isFloat?val.toFixed(2):Math.floor(val)); if(progress<1)requestAnimationFrame(step); };
    requestAnimationFrame(step);
  },[started,target,duration]);
  return {ref,count};
}

function AnimatedStat({ value, label, suffix="" }) {
  const numeric=parseFloat(value.replace(/[^0-9.]/g,""));
  const prefix=value.match(/^[^0-9]*/)?.[0]||"";
  const sfx=value.match(/[^0-9.]+$/)?.[0]||suffix;
  const {ref,count}=useCounter(numeric);
  return (
    <div ref={ref} style={{ padding:"0 2rem 0 0", marginRight:"2rem", borderRight:"2px solid rgba(27,58,138,0.2)", marginBottom:"1rem" }}>
      <div style={{ fontSize:"2rem", fontWeight:500, color:"var(--ink)", letterSpacing:"-1px", fontFamily:"'JetBrains Mono', monospace", lineHeight:1 }}>{prefix}{count}{sfx}</div>
      <div style={{ fontSize:"0.82rem", color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1.5px", marginTop:"0.2rem", lineHeight:1.4, fontFamily:"'DM Sans', system-ui, sans-serif", fontWeight:500 }}>{label}</div>
    </div>
  );
}

/* ─────────────── SECTION PROGRESS SIDEBAR ─────────────── */
const SECTIONS=["hero","about","experience","resume","projects","skills","achievements","timeline","contact"];
const SECTION_LABELS=["Home","About","Exp","Resume","Projects","Skills","Awards","Timeline","Contact"];

function SectionProgress() {
  const [active, setActive] = useState(0);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){const idx=SECTIONS.indexOf(e.target.id); if(idx!==-1)setActive(idx);} }); },{threshold:0.35});
    SECTIONS.forEach(id=>{ const el=document.getElementById(id); if(el)obs.observe(el); });
    return ()=>obs.disconnect();
  },[]);
  return (
    <div className="progress-sidebar" style={{ position:"fixed", right:"1.2rem", top:"50%", transform:"translateY(-50%)", zIndex:700, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem" }}>
      {SECTIONS.map((id,i)=>(
        <div key={id} style={{position:"relative",display:"flex",alignItems:"center",gap:"0.4rem"}}>
          {active===i && (
            <div style={{ position:"absolute", right:"calc(100% + 0.5rem)", background:"var(--paper)", border:"2px solid var(--inkMid)", padding:"0.15rem 0.5rem", fontSize:"0.8rem", fontFamily:"'DM Sans', system-ui, sans-serif", color:"var(--inkMid)", whiteSpace:"nowrap", fontWeight:600, animation:"backTopIn 0.2s ease both", boxShadow:"2px 2px 0 var(--inkMid)" }}>{SECTION_LABELS[i]}</div>
          )}
          <div className={`progress-dot${active===i?" active":""}`} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})} title={SECTION_LABELS[i]}/>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── BACK TO TOP ─────────────── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(()=>{ const fn=()=>setShow(window.scrollY>500); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); },[]);
  if (!show) return null;
  return (
    <button className="btt-btn" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{animation:"backTopIn 0.3s ease both"}} title="Back to top">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="square"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
}

/* ─────────────── PARTICLE CANVAS ─────────────── */
function ParticleCanvas({ dark }) {
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    let animId;
    const resize=()=>{ canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    resize();
    window.addEventListener("resize",resize);
    const COLORS = dark
      ? ["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA","#7C9EFF"]
      : ["#1B3A8A","#2E5FC9","#5B8FE8","#E8A44A","#D94F3D","#2A7A5E"];
    const pts=Array.from({length:50},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*0.35,vy:(Math.random()-0.5)*0.35,r:Math.random()*2+1,col:COLORS[Math.floor(Math.random()*COLORS.length)]}));
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
        ctx.fillStyle=p.col+"77";
        ctx.fillRect(Math.round(p.x),Math.round(p.y),Math.round(p.r*2),Math.round(p.r*2));
      });
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<90){
            ctx.beginPath();
            ctx.moveTo(pts[i].x,pts[i].y);
            ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle= dark ? `rgba(255,51,51,${0.07*(1-dist/90)})` : `rgba(27,58,138,${0.07*(1-dist/90)})`;
            ctx.lineWidth=0.5;
            ctx.stroke();
          }
        }
      }
      animId=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  },[dark]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.45}}/>;
}

/* ─────────────── HERO ─────────────── */
function Hero({ dark }) {
  const [typed, setTyped] = useState("");
  const words=["Backend Engineer","System Designer","AI / ML Builder","Competitive Programmer","Full Stack Dev"];
  useEffect(()=>{
    let idx=0,dir=1,wi=0;
    const iv=setInterval(()=>{
      const w=words[wi%words.length];
      setTyped(dir===1?w.slice(0,idx+1):w.slice(0,idx));
      if(dir===1){idx++;if(idx===w.length)dir=-1;}else{idx--;if(idx<0){dir=1;idx=0;wi++;}}
    },80);
    return ()=>clearInterval(iv);
  },[]);

  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const accent2 = dark ? "#6B7FD4" : "#2E5FC9";
  const accentShadow = dark ? "#1E2A4A" : "#0A0F2E";

  return (
    <section id="hero" className="hero-sec" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"9rem 4rem 5rem", position:"relative", overflow:"hidden", background:"var(--bg)", backgroundImage: dark ? "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(107,127,212,0.07) 0%, transparent 70%)" : "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(27,58,138,0.08) 0%, transparent 70%)" }}>
      <FloatingOrbs dark={dark} />

      <div className="float-bg" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {[{Icon:Zap,top:"12%",left:"5%",sz:32,anim:"iconDrift 7s ease-in-out infinite",delay:"0s",col:accent},{Icon:Code2,top:"25%",left:"90%",sz:28,anim:"iconDriftB 9s ease-in-out infinite",delay:"1.2s",col:accent2},{Icon:Database,top:"55%",left:"88%",sz:26,anim:"iconDrift 11s ease-in-out infinite",delay:"2.1s",col:dark?"#A78BFA":"#E8A44A"},{Icon:Server,top:"70%",left:"6%",sz:30,anim:"iconDriftC 8s ease-in-out infinite",delay:"0.7s",col:dark?"#1E2A4A":"#D94F3D"},{Icon:BrainCircuit,top:"88%",left:"40%",sz:28,anim:"iconDrift 13s ease-in-out infinite",delay:"4.1s",col:dark?"#6B7FD4":"#2A7A5E"},{Icon:Terminal,top:"15%",left:"74%",sz:24,anim:"iconDriftC 10s ease-in-out infinite",delay:"2.8s",col:accent},{Icon:Bot,top:"5%",left:"48%",sz:28,anim:"iconDriftC 8s ease-in-out infinite",delay:"3.0s",col:accent2}].map(({Icon,top,left,sz,anim,delay,col},i)=>(
          <div key={i} style={{position:"absolute",top,left,opacity:0.12,animation:anim,animationDelay:delay,color:col}}><Icon size={sz} strokeWidth={1.5}/></div>
        ))}
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",width:"100%",position:"relative",zIndex:1}}>
        <div className="rv" style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.4rem",flexWrap:"wrap"}}>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",color:accent,letterSpacing:"1px",display:"flex",alignItems:"center",gap:"0.8rem",fontWeight:500}}>
            <span style={{display:"inline-block",width:28,height:3,background:`linear-gradient(90deg,${accent},${accent2})`}}/>
            3rd Year CSE · MUJ · 2023–2027
          </div>
          <div className="status-available">
            <div className="status-ping"/>
            <span style={{fontSize:"0.95rem",color:dark?"#7C9EFF":"#2A7A5E",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Open to work</span>
          </div>
        </div>

        <h1 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(2.8rem,6vw,5.5rem)",fontWeight:600,lineHeight:1.1,marginBottom:"0.9rem",letterSpacing:"-1px",color:"var(--ink)",animation: dark ? "heroGlowRed 4s ease-in-out infinite" : "heroGlow 4s ease-in-out infinite"}}>
          Arman<br/>
          <span className="grad" style={{display:"inline-block"}}>Phaugat</span>
        </h1>

        <div className="rv d2" style={{marginBottom:"1.5rem",height:"2.2rem",display:"flex",alignItems:"center"}}>
          <span style={{fontSize:"1.4rem",color:"var(--muted)",fontFamily:"'JetBrains Mono', monospace",letterSpacing:"0.3px",fontWeight:400}}>
            › {typed}<span style={{animation:"blink 1s infinite",display:"inline-block",color:accent}}>_</span>
          </span>
        </div>

        <p className="rv d3" style={{fontSize:"1.05rem",color:"var(--muted)",maxWidth:540,lineHeight:1.9,marginBottom:"2.5rem",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:400}}>
          Building fast backends, shipping ML models, crafting AI-powered apps.<br/>
          Top <strong style={{color:accent,fontWeight:600}}>0.3% LeetCode</strong> · <strong style={{color:accent2,fontWeight:600}}>9.05 CGPA</strong> · <strong style={{color:dark?"#A78BFA":"#E8A44A",fontWeight:600}}>900+ DSA</strong> solved.
        </p>

        <div className="rv d4 hero-ctarow" style={{display:"flex",gap:"0.8rem",flexWrap:"wrap",marginBottom:"3.5rem"}}>
          {[
            {href:"#projects",label:"View Projects →",bg:accent,color:"#fff",shadow:accentShadow},
            {href:"#contact",label:"Let's Talk",bg:"transparent",color:"var(--ink)",shadow:accent,bord:accent},
            {href:"https://github.com/armanphaugat",label:"GitHub",bg:"#1e293b",color:"#fff",shadow:"#0f172a"},
            {href:"https://www.linkedin.com/in/armanphaugat05/",label:"LinkedIn",bg:"#0A66C2",color:"#fff",shadow:"#004182"},
            {href:"https://leetcode.com/u/armanphaugat20",label:"LeetCode",bg:"#E8A44A",color:"#fff",shadow:"#B87A2A"},
          ].map(({href,label,bg,color,shadow,bord})=>(
            <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" className="px-btn" style={{
              padding:"0.75rem 1.4rem", background:bg, color, fontSize:"0.95rem", fontWeight:600, textDecoration:"none",
              fontFamily:"'DM Sans', system-ui, sans-serif", border:`2px solid ${bord||shadow}`,
              boxShadow:`4px 4px 0 ${shadow}`, display:"inline-flex", alignItems:"center", gap:"0.4rem",
            }}>{label}</a>
          ))}
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" className="px-btn" style={{ padding:"0.8rem 1.5rem", background:"transparent", color:accent, border:`2px solid ${accent}`, fontSize:"0.92rem", fontWeight:600, textDecoration:"none", fontFamily:"'DM Sans', system-ui, sans-serif", boxShadow:`4px 4px 0 ${accent}`, display:"inline-flex", alignItems:"center", gap:"0.4rem", animation:"resumePulse 2.5s ease-in-out infinite" }}>
            <Download size={12} strokeWidth={2.5}/>Resume
          </a>
        </div>

        <div className="rv" style={{display:"flex",gap:"0",borderTop:`1.5px solid ${dark?"rgba(107,127,212,0.2)":"rgba(27,58,138,0.18)"}`,paddingTop:"2rem",marginTop:"0.5rem",flexWrap:"wrap"}}>
          <AnimatedStat value="9.05" label="CGPA — Dean's Award"/>
          <AnimatedStat value="900+" label="DSA Problems"/>
          <AnimatedStat value="10+" label="Projects Built"/>
          <div style={{padding:"0 2rem 0 0",marginRight:"2rem",marginBottom:"1rem"}}>
            <div style={{fontSize:"2rem",fontWeight:500,color:"var(--ink)",fontFamily:"'JetBrains Mono', monospace",lineHeight:1}}>TOP 0.3%</div>
            <div style={{fontSize:"0.82rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1.5px",marginTop:"0.25rem",lineHeight:1.4,fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:500}}>LeetCode Global</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MARQUEE ─────────────── */
function Marquee({ dark }) {
  const items=["Node.js","Redis","MySQL","BullMQ","Python","FastAPI","LangChain","FAISS","MongoDB","Docker","XGBoost","Streamlit","Pygame","React","Scikit-learn","RAG","HuggingFace","JWT","Pandas","Groq","System Design","ACID"];
  const doubled=[...items,...items];
  const COLS = dark
    ? ["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA","#7C9EFF"]
    : ["#1B3A8A","#2E5FC9","#E8A44A","#D94F3D","#2A7A5E","#5B8FE8"];
  const borderCol = dark ? "#6B7FD4" : "#1B3A8A";
  return (
    <div style={{background: dark ? "linear-gradient(135deg,#0F1117 0%,#0a0000 50%,#0F1117 100%)" : "linear-gradient(135deg,#07091A 0%,#0C0F28 50%,#07091A 100%)",padding:"0.9rem 0",overflow:"hidden",borderTop:`2px solid ${borderCol}`,borderBottom:`2px solid ${borderCol}`,boxShadow: dark ? `0 4px 20px rgba(255,51,51,0.18),0 -4px 20px rgba(255,51,51,0.18)` : "0 4px 20px rgba(27,58,138,0.18),0 -4px 20px rgba(27,58,138,0.18)"}}>
      <div style={{display:"flex",animation:"marquee 28s linear infinite",width:"max-content"}}>
        {doubled.map((item,i)=>(
          <span key={i} style={{color:COLS[i%COLS.length],fontSize:"0.92rem",letterSpacing:"1px",padding:"0 1.8rem",display:"flex",alignItems:"center",gap:"1.5rem",fontFamily:"'JetBrains Mono', monospace",fontWeight:500}}>
            {item}<span style={{color: dark ? "rgba(107,127,212,0.5)" : "rgba(27,58,138,0.5)",fontSize:"0.7rem"}}>■</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── ABOUT ─────────────── */
function About({ dark }) {
  const cardRef = useRef(null);
  useTilt(cardRef);
  const COLORS_CYCLE = dark
    ? ["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA"]
    : ["#1B3A8A","#2E5FC9","#E8A44A","#D94F3D","#2A7A5E"];
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const accent2 = dark ? "#6B7FD4" : "#2E5FC9";
  return (
    <section id="about" style={{padding:"8rem 4rem",background:"var(--bg2)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div className="orb" style={{width:500,height:500,top:"-5%",right:"-5%",background: dark ? "radial-gradient(circle,rgba(255,51,51,0.05) 0%,transparent 70%)" : "radial-gradient(circle,rgba(46,95,201,0.06) 0%,transparent 70%)",animation:"orbDrift2 16s ease-in-out infinite"}}/>
        <div className="orb" style={{width:350,height:350,bottom:"10%",left:"5%",background: dark ? "radial-gradient(circle,rgba(204,0,0,0.04) 0%,transparent 70%)" : "radial-gradient(circle,rgba(42,122,94,0.05) 0%,transparent 70%)",animation:"orbDrift1 20s ease-in-out infinite 3s"}}/>
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start",position:"relative",zIndex:1}} className="grid2">
        <div>
          <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"3px",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.8rem",fontWeight:400}}>
            <span style={{width:20,height:3,background:accent,display:"inline-block",boxShadow:`2px 2px 0 ${dark?"#1E2A4A":"#0A0F2E"}`}}/>ABOUT ME
          </div>
          <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.6rem,3vw,2.6rem)",fontWeight:600,lineHeight:1.2,marginBottom:"1.5rem",color:"var(--ink)"}}>
            Passionate about<br/><span className="grad">Systems & Scale</span>
          </h2>
          <div className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",lineHeight:2,fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:400}}>
            <p style={{marginBottom:"1rem"}}>I'm a <strong style={{color:"var(--ink)",fontWeight:600}}>3rd-year CS student</strong> at Manipal University Jaipur who builds things that work fast, scale cleanly, and solve real problems.</p>
            <p style={{marginBottom:"1rem"}}>Core focus: backend engineering — <strong style={{color:accent,fontWeight:600}}>Node.js, Redis, BullMQ, MySQL</strong> — plus AI apps with <strong style={{color:accent2,fontWeight:600}}>LangChain, FAISS, and Groq</strong>. ML models with Scikit-learn and XGBoost.</p>
            <p>I solve 900+ DSA problems because I genuinely love finding elegant solutions to hard problems.</p>
          </div>
          <div className="rv d3" style={{display:"flex",gap:"0.5rem",marginTop:"1.5rem",flexWrap:"wrap"}}>
            {["Open to Internships","Available for Projects","LeetCode Top 0.3%"].map((t,i)=>(
              <span key={t} style={{padding:"0.35rem 0.9rem",border:`2px solid ${COLORS_CYCLE[i]}`,fontSize:"0.88rem",color:COLORS_CYCLE[i],fontWeight:600,background:`${COLORS_CYCLE[i]}10`,fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:`2px 2px 0 ${COLORS_CYCLE[i]}`}}>{t}</span>
            ))}
          </div>
        </div>

        <div ref={cardRef} className="rv d2 px-card" style={{background:"var(--paper)",padding:"2rem",willChange:"transform",transition:"transform 0.15s ease"}}>
          {[
            ["🎓","Education","B.Tech CSE · 3rd Year","MUJ · 2023–2027",COLORS_CYCLE[0]],
            ["📍","Location","Jaipur, Rajasthan","India",COLORS_CYCLE[1]],
            ["🏅","CGPA","9.05 / 10","Dean's Excellence Award",COLORS_CYCLE[2]],
            ["⚡","Focus","Backend · AI/ML","Node.js · Python · Sys Design",COLORS_CYCLE[3]],
            ["🧩","Competitive","LeetCode Top 0.3%","900+ problems solved",COLORS_CYCLE[4]],
            ["🚀","Hackathon","MUJHackX Round 2","1300+ participants",COLORS_CYCLE[0]],
          ].map(([ico,label,val,sub,col],i)=>(
            <div key={label} style={{display:"flex",gap:"0.9rem",alignItems:"flex-start",padding:"0.8rem 0",borderBottom:i<5?`1px solid ${dark?"rgba(107,127,212,0.08)":"rgba(27,58,138,0.07)"}`:"none"}}>
              <div style={{width:32,height:32,background:`${col}12`,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",flexShrink:0,boxShadow:`2px 2px 0 ${col}`}}>{ico}</div>
              <div>
                <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.8rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"0.15rem",fontWeight:500}}>{label}</div>
                <div style={{fontSize:"0.97rem",fontWeight:600,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{val}</div>
                <div style={{fontSize:"0.88rem",color:"var(--muted)",marginTop:"0.1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1060,margin:"2rem auto 0",position:"relative",zIndex:1}} className="rv d4">
        <GitHubStatsCard/>
      </div>
    </section>
  );
}

/* ─────────────── EXPERIENCE ─────────────── */
function Experience({ dark }) {
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const accentShadow = dark ? "#1E2A4A" : "#0A0F2E";
  return (
    <section id="experience" style={{padding:"8rem 4rem",background:"var(--bg)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:accent,display:"inline-block"}}/>EXPERIENCE
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.4rem,3vw,2.2rem)",fontWeight:600,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.3}}>
          Where I've <span className="grad">Worked</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"2.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Real-world experience shipping under professional deadlines.</p>

        <div className="rv d3 px-card" style={{background:"var(--paper)",padding:"2rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"1rem",marginBottom:"1.2rem"}}>
            <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
              <div style={{width:48,height:48,background:"var(--bg2)",border:`2px solid ${accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0,boxShadow:`3px 3px 0 ${accent}`}}>🏥</div>
              <div>
                <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1.05rem",fontWeight:600,color:"var(--ink)"}}>Web Dev Intern</div>
                <div style={{fontSize:"0.92rem",color:accent,fontWeight:500,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Indavis Lifesciences, Haridwar</div>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.88rem",color:accent,background:"var(--vPale)",padding:"0.3rem 0.8rem",display:"inline-block",border:`2px solid ${accent}`,boxShadow:`2px 2px 0 ${accent}`,fontWeight:500}}>Jun–Jul 2025</span>
              <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.85rem",color:"var(--inkMid)",marginTop:"0.3rem"}}>Full-time · On-site</div>
            </div>
          </div>
          {["Maintained and updated the company website ensuring smooth performance and content accuracy.","Collaborated with cross-functional teams to align website updates with brand guidelines and business objectives."].map((b,i)=>(
            <div key={i} style={{display:"flex",gap:"0.6rem",fontSize:"0.97rem",color:"var(--muted)",marginBottom:"0.55rem",lineHeight:1.75,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
              <span style={{color:accent,flexShrink:0}}>▸</span>{b}
            </div>
          ))}
          <div style={{marginTop:"1.2rem",display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
            {["Website Maintenance","Team Collaboration","Content Mgmt","Brand Alignment"].map(t=><span key={t} className="chip">{t}</span>)}
          </div>
        </div>

        <div className="rv d4 otw-banner" style={{marginTop:"1.5rem",background: dark ? "linear-gradient(135deg,#0F1117 0%,#0a0000 100%)" : "linear-gradient(135deg,#07091A 0%,#0C0F28 100%)",border:`2px solid ${accent}`,padding:"2rem",boxShadow:`7px 7px 0 ${accent}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem"}}>
          <div>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.9rem",color:"rgba(240,237,230,0.5)",letterSpacing:"1px",marginBottom:"0.5rem",fontWeight:500}}>Currently seeking</div>
            <div style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1.4rem",fontWeight:600,color:"#F0EDE6",marginBottom:"0.5rem",lineHeight:1.4}}>Summer Internship 2026</div>
            <div style={{fontSize:"1rem",color:"rgba(240,237,230,0.7)",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:400}}>Backend · AI/ML · Full Stack</div>
          </div>
          <a href="mailto:armanphaugat20@gmail.com" className="px-btn" style={{padding:"0.8rem 1.5rem",background:"rgba(255,255,255,0.08)",color:"#fff",border:"2px solid rgba(255,255,255,0.25)",textDecoration:"none",fontWeight:600,fontSize:"0.95rem",whiteSpace:"nowrap",fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:"3px 3px 0 rgba(255,255,255,0.15)"}}>Reach out →</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── RESUME ─────────────── */
function Resume({ dark }) {
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const accent2 = dark ? "#6B7FD4" : "#2E5FC9";
  const accentShadow = dark ? "#1E2A4A" : "#0A0F2E";
  const vPaleStyle = dark ? "rgba(107,127,212,0.1)" : "var(--vPale)";
  return (
    <section id="resume" style={{padding:"8rem 4rem",background:"var(--bg)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:accent,display:"inline-block"}}/>RESUME
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1.5rem",marginBottom:"3rem"}}>
          <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.4rem,2.5vw,2rem)",fontWeight:600,color:"var(--ink)",lineHeight:1.3}}>
            Curriculum <span className="grad">Vitae</span>
          </h2>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" className="rv d2 px-btn" style={{padding:"0.8rem 1.5rem",background:accent,color:"#fff",border:`2px solid ${accentShadow}`,textDecoration:"none",fontSize:"0.95rem",fontWeight:600,display:"flex",alignItems:"center",gap:"0.5rem",boxShadow:`4px 4px 0 ${accentShadow}`,animation:"resumePulse 2.5s ease-in-out infinite",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            <Download size={14} strokeWidth={2.5}/>Download PDF
          </a>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",alignItems:"start"}} className="grid2">
          <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
            <div className="rv px-card shimmer-hover" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1rem"}}>
                <div style={{width:28,height:28,background:vPaleStyle,border:`2px solid ${accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:`2px 2px 0 ${accent}`}}>👤</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.6rem",fontWeight:400,color:"var(--ink)"}}>SUMMARY</div>
              </div>
              <p style={{fontSize:"0.97rem",color:"var(--muted)",lineHeight:1.9,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
                Passionate <strong style={{color:"var(--ink)",fontWeight:600}}>Backend & AI/ML Engineer</strong> in my 3rd year of B.Tech CSE at MUJ, maintaining a <strong style={{color:accent,fontWeight:600}}>9.05 CGPA</strong> with the Dean's Excellence Award. Builds high-performance systems with <strong style={{color:accent,fontWeight:600}}>Node.js, Redis, and MySQL</strong>. Ranked in the <strong style={{color:accent2,fontWeight:600}}>top 0.3% globally on LeetCode</strong> with 900+ problems solved.
              </p>
              <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginTop:"1rem"}}>
                {["Backend","AI/ML","Open to Work"].map((t,i)=>(
                  <span key={t} style={{padding:"0.25rem 0.7rem",background:dark?`rgba(107,127,212,0.1)`:`${["#1B3A8A","#2E5FC9","#2A7A5E"][i]}10`,border:`2px solid ${dark?["#7C9EFF","#6B7FD4","#A78BFA"][i]:["#1B3A8A","#2E5FC9","#2A7A5E"][i]}`,fontSize:"0.88rem",color:dark?["#7C9EFF","#6B7FD4","#A78BFA"][i]:["#1B3A8A","#2E5FC9","#2A7A5E"][i],fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{t}</span>
                ))}
              </div>
            </div>

            <div className="rv px-card shimmer-hover" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.2rem"}}>
                <div style={{width:38,height:38,background:dark?"linear-gradient(135deg,#6B7FD4,#1E2A4A)":"linear-gradient(135deg,#1B3A8A,#2E5FC9)",border:`2px solid ${accentShadow}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`3px 3px 0 ${accentShadow}`}}>
                  <span style={{color:"#fff",fontSize:"0.6rem",fontWeight:700,fontFamily:"'Press Start 2P', monospace"}}>AP</span>
                </div>
                <div>
                  <div style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1.05rem",fontWeight:600,color:"var(--ink)"}}>Arman Phaugat</div>
                  <div style={{fontSize:"0.88rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>B.Tech CSE · MUJ · 2023–27</div>
                </div>
              </div>
              {[
                ["✉️","armanphaugat20@gmail.com","mailto:armanphaugat20@gmail.com"],
                ["📱","+91-9306115772","tel:+919306115772"],
                ["🐙","github.com/armanphaugat","https://github.com/armanphaugat"],
                ["💼","linkedin.com/in/armanphaugat05","https://www.linkedin.com/in/armanphaugat05/"],
                ["🧩","leetcode.com/u/armanphaugat20","https://leetcode.com/u/armanphaugat20"],
                ["📍","Jaipur, Rajasthan, India",null],
              ].map(([icon,label,href])=>(
                <div key={label} style={{display:"flex",gap:"0.7rem",alignItems:"center",padding:"0.45rem 0",borderBottom:`1px solid ${dark?"rgba(107,127,212,0.06)":"rgba(27,58,138,0.06)"}`}}>
                  <span style={{fontSize:"0.9rem",flexShrink:0}}>{icon}</span>
                  {href?<a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{fontSize:"0.92rem",color:accent,textDecoration:"none",fontFamily:"'DM Sans', system-ui, sans-serif",wordBreak:"break-all",fontWeight:500}}>{label}</a>:<span style={{fontSize:"0.92rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{label}</span>}
                </div>
              ))}
            </div>

            <div className="rv d1 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:dark?"rgba(255,51,51,0.12)":"rgba(232,164,74,0.12)",border:`2px solid ${dark?"#7C9EFF":"#E8A44A"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:`2px 2px 0 ${dark?"#7C9EFF":"#E8A44A"}`}}>🎓</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.58rem",fontWeight:400,color:"var(--ink)"}}>EDUCATION</div>
              </div>
              <div style={{borderLeft:`3px solid ${accent}`,paddingLeft:"1rem"}}>
                <div style={{fontSize:"1rem",fontWeight:600,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>B.Tech in Computer Science</div>
                <div style={{fontSize:"0.95rem",color:accent,fontWeight:500,marginTop:"0.2rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Manipal University Jaipur</div>
                <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.88rem",color:"var(--muted)",marginTop:"0.2rem"}}>2023–2027 · Jaipur</div>
                <div style={{marginTop:"0.6rem",display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
                  <span style={{padding:"0.3rem 0.75rem",background:vPaleStyle,color:accent,fontSize:"0.88rem",fontWeight:600,border:`2px solid ${accent}`,fontFamily:"'JetBrains Mono', monospace",boxShadow:`2px 2px 0 ${accent}`}}>9.05 CGPA</span>
                  <span style={{padding:"0.3rem 0.75rem",background:dark?"rgba(107,127,212,0.1)":"rgba(232,164,74,0.1)",color:dark?"#7C9EFF":"#8B5E1A",fontSize:"0.88rem",fontWeight:600,border:`2px solid ${dark?"#6B7FD4":"#E8A44A"}`,fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:`2px 2px 0 ${dark?"#6B7FD4":"#E8A44A"}`}}>Dean's Award</span>
                </div>
              </div>
            </div>

            <div className="rv d2 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:dark?"rgba(255,51,51,0.12)":"rgba(232,164,74,0.12)",border:`2px solid ${dark?"#7C9EFF":"#E8A44A"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:`2px 2px 0 ${dark?"#7C9EFF":"#E8A44A"}`}}>⭐</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.58rem",fontWeight:400,color:"var(--ink)"}}>ACHIEVEMENTS</div>
              </div>
              {[
                {icon:"🏅",text:"Dean's Excellence Award — 9.0+ CGPA multiple semesters",col:dark?"#7C9EFF":"#E8A44A"},
                {icon:"⚡",text:"LeetCode Top 0.3% — Global rank, beats 99.7%",col:accent},
                {icon:"🚀",text:"MUJHackX Round 2 — Top among 1300+ participants",col:dark?"#6B7FD4":"#2A7A5E"},
                {icon:"💡",text:"900+ DSA problems solved across platforms",col:accent2},
              ].map(({icon,text,col})=>(
                <div key={text} style={{display:"flex",gap:"0.7rem",alignItems:"flex-start",padding:"0.5rem 0",borderBottom:`1px solid ${dark?"rgba(107,127,212,0.06)":"rgba(27,58,138,0.06)"}`}}>
                  <span style={{fontSize:"0.9rem",flexShrink:0}}>{icon}</span>
                  <span style={{fontSize:"0.95rem",color:"var(--muted)",lineHeight:1.65,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{text}</span>
                </div>
              ))}
            </div>

            <div className="rv d3 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:dark?"rgba(255,51,51,0.12)":"rgba(46,95,201,0.12)",border:`2px solid ${accent2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:`2px 2px 0 ${accent2}`}}>📜</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.58rem",fontWeight:400,color:"var(--ink)"}}>CERTIFICATIONS</div>
              </div>
              {[
                {org:"TLE Eliminators",icon:"🥋",col:"#D94F3D",name:"CP Level 1, 2 & 3",issued:"Dec 2023",skills:["C++","DSA","Algorithms"],badge:"3 certs"},
                {org:"NPTEL",icon:"🎓",col:accent,name:"Design & Analysis of Algorithms",issued:"Jan 2025",skills:["C++","Algorithm Design"],badge:"Verified"},
                {org:"Red Hat",icon:"🎩",col:"#C53030",name:"Sysadmin I & II",issued:"Jan 2025",skills:["Linux","RHEL","Shell"],badge:"2 certs"},
                {org:"Coursera",icon:"📡",col:dark?"#7C9EFF":"#2D3748",name:"RAG Course",issued:"2024",skills:["LangChain","FAISS","RAG"],badge:"Verified"},
                {org:"GeeksforGeeks",icon:"💚",col:dark?"#6B7FD4":"#2A7A5E",name:"OOP with Java",issued:"Aug 2024",skills:["Java","OOP"],badge:"Verified"},
                {org:"Oracle",icon:"🔴",col:"#C05621",name:"Database Design",issued:"Aug 2024",skills:["SQL","DB Design"],badge:"2 certs"},
              ].map(({org,icon,col,name,issued,skills,badge},i)=>(
                <div key={name} style={{display:"flex",gap:"0.8rem",alignItems:"flex-start",padding:"0.8rem 0",borderBottom:i<5?`1px solid ${dark?"rgba(107,127,212,0.06)":"rgba(27,58,138,0.06)"}`:"none"}}>
                  <div style={{width:34,height:34,background:`${col}12`,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0,boxShadow:`2px 2px 0 ${col}`}}>{icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.4rem",flexWrap:"wrap"}}>
                      <div>
                        <div style={{fontSize:"0.95rem",fontWeight:600,color:"var(--ink)",lineHeight:1.3,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</div>
                        <div style={{fontSize:"0.88rem",color:col,fontWeight:500,marginTop:"0.1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{org}</div>
                      </div>
                      <span style={{fontSize:"0.8rem",padding:"0.15rem 0.4rem",background:`${col}12`,color:col,fontWeight:600,fontFamily:"'JetBrains Mono', monospace",flexShrink:0,whiteSpace:"nowrap",border:`1px solid ${col}`,boxShadow:`1px 1px 0 ${col}`}}>{badge}</span>
                    </div>
                    <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.82rem",color:"var(--inkMid)",marginTop:"0.2rem"}}>Issued {issued}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"0.25rem",marginTop:"0.4rem"}}>
                      {skills.map(s=><span key={s} style={{fontSize:"0.85rem",padding:"0.12rem 0.4rem",background:vPaleStyle,color:accent,border:`1px solid ${accent}`,fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:500}}>{s}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
            <div className="rv px-card shimmer-hover" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:dark?"rgba(255,51,51,0.12)":"rgba(27,58,138,0.12)",border:`2px solid ${accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:`2px 2px 0 ${accent}`}}>💼</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.58rem",fontWeight:400,color:"var(--ink)"}}>WORK EXPERIENCE</div>
              </div>
              <div style={{borderLeft:`3px solid ${accent}`,paddingLeft:"1rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"0.4rem"}}>
                  <div>
                    <div style={{fontSize:"1rem",fontWeight:600,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Web Dev Intern</div>
                    <div style={{fontSize:"0.92rem",color:accent,fontWeight:500,marginTop:"0.1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Indavis Lifesciences, Haridwar</div>
                  </div>
                  <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.82rem",color:accent,background:vPaleStyle,padding:"0.2rem 0.5rem",border:`1px solid ${accent}`,fontWeight:500}}>Jun–Jul 2025</span>
                </div>
                <ul style={{listStyle:"none",marginTop:"0.8rem",display:"flex",flexDirection:"column",gap:"0.4rem"}}>
                  {["Maintained and updated company website, smooth performance + content accuracy","Collaborated with cross-functional teams aligning updates with brand guidelines","Managed content workflows, consistent brand representation across web pages"].map((b,i)=>(
                    <li key={i} style={{display:"flex",gap:"0.4rem",fontSize:"0.95rem",color:"var(--muted)",lineHeight:1.65,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
                      <span style={{color:accent,flexShrink:0}}>▸</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rv d1 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:dark?"rgba(255,51,51,0.12)":"rgba(46,95,201,0.12)",border:`2px solid ${accent2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:`2px 2px 0 ${accent2}`}}>🛠️</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.58rem",fontWeight:400,color:"var(--ink)"}}>TECH SKILLS</div>
              </div>
              {[
                {label:"Languages",items:["Python","JavaScript","C","C++","Java","HTML","CSS"],col:accent},
                {label:"Backend",items:["Node.js","Express","FastAPI","REST","JWT","Argon2"],col:accent2},
                {label:"Databases",items:["MySQL","MongoDB","Redis","FAISS","SQLite3"],col:dark?"#A78BFA":"#2A7A5E"},
                {label:"AI/ML",items:["LangChain","HuggingFace","RAG","XGBoost","Scikit-learn"],col:dark?"#7C9EFF":"#E8A44A"},
                {label:"DevOps",items:["Docker","Git","GitHub","Postman","BullMQ"],col:dark?"#1E2A4A":"#D94F3D"},
                {label:"Concepts",items:["System Design","DSA","ACID","Caching","Rate Limiting"],col:accent},
              ].map(({label,items,col})=>(
                <div key={label} style={{marginBottom:"0.8rem"}}>
                  <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.82rem",color:col,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"0.4rem",fontWeight:500}}>› {label}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem"}}>
                    {items.map(t=><span key={t} className="chip" style={{fontSize:"0.82rem"}}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <div className="rv d2 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:dark?"rgba(255,51,51,0.12)":"rgba(232,164,74,0.12)",border:`2px solid ${dark?"#7C9EFF":"#E8A44A"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:`2px 2px 0 ${dark?"#7C9EFF":"#E8A44A"}`}}>🚀</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.58rem",fontWeight:400,color:"var(--ink)"}}>KEY PROJECTS</div>
              </div>
              {[
                {name:"Real Time Stock Trading Backend",tech:"Node.js · Redis · MySQL · BullMQ · Docker",points:["Redis Sorted Sets → <50ms leaderboard queries","JWT auth + Token Bucket rate limiter","MySQL row-level locking for concurrent trades"]},
                {name:"RAG Discord Bot",tech:"Python · FastAPI · LangChain · FAISS · Groq",points:["Per-guild persistent FAISS vector stores","LCEL chain with Groq Llama 3.3","Multi-server isolation + permission gating"]},
                {name:"Video Streaming & User Mgmt",tech:"Node.js · MongoDB · Cloudinary",points:["HLS transcoding via ffmpeg","JWT access/refresh token lifecycle","MongoDB aggregation pipelines"]},
                {name:"Cricket Score Predictor",tech:"Python · XGBoost · Streamlit",points:["3 XGBoost models: IPL, T20, ODI","Live CricAPI integration","Format-specific feature engineering"]},
              ].map(({name,tech,points},i)=>(
                <div key={name} style={{padding:"0.8rem 0",borderBottom:i<3?`1px solid ${dark?"rgba(107,127,212,0.06)":"rgba(27,58,138,0.06)"}`:"none"}}>
                  <div style={{fontSize:"0.97rem",fontWeight:600,color:"var(--ink)",marginBottom:"0.15rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</div>
                  <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.82rem",color:accent,marginBottom:"0.4rem",fontWeight:500}}>{tech}</div>
                  {points.map((p,j)=>(
                    <div key={j} style={{display:"flex",gap:"0.4rem",fontSize:"0.92rem",color:"var(--muted)",lineHeight:1.6,marginBottom:"0.15rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
                      <span style={{color:accent,flexShrink:0}}>›</span>{p}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rv d4" style={{marginTop:"2rem",background: dark ? "#0F1117" : "#07091A",border:`2px solid ${accent}`,padding:"1.8rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem",boxShadow:`6px 6px 0 ${accent}`}}>
          <div>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"rgba(240,237,230,0.4)",letterSpacing:"1px",marginBottom:"0.3rem",fontWeight:500}}>Ready to hire?</div>
            <div style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1.2rem",fontWeight:600,color:"#F0EDE6",lineHeight:1.4}}>Download Full PDF Resume</div>
            <div style={{fontSize:"0.88rem",color:"rgba(240,237,230,0.4)",marginTop:"0.2rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Updated 2025 · ARMANRESUME.pdf</div>
          </div>
          <div style={{display:"flex",gap:"0.8rem",flexWrap:"wrap"}}>
            <a href="/ARMANRESUME.pdf" download className="px-btn" style={{padding:"0.8rem 1.5rem",background:accent,color:"#fff",border:`2px solid ${dark?"#A78BFA":"#5B8FE8"}`,textDecoration:"none",fontWeight:600,fontSize:"0.95rem",display:"flex",alignItems:"center",gap:"0.5rem",fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:`3px 3px 0 ${dark?"#A78BFA":"#5B8FE8"}`}}>
              <Download size={13} strokeWidth={2.5}/>Download
            </a>
            <a href="mailto:armanphaugat20@gmail.com" className="px-btn" style={{padding:"0.8rem 1.5rem",background:"rgba(255,255,255,0.07)",color:"#fff",border:"2px solid rgba(255,255,255,0.18)",textDecoration:"none",fontWeight:600,fontSize:"0.95rem",fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:"3px 3px 0 rgba(255,255,255,0.12)"}}>Contact →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PROJECTS ─────────────── */
const PROJECTS=[
  {num:"01",name:"Real Time Stock Trading Backend",tagline:"High-perf system · live leaderboards · ACID-safe concurrency",category:"Backend",highlights:["Redis Sorted Sets → <50ms leaderboard queries","BullMQ price engine · 30-min jobs","JWT auth + Token Bucket rate limiter","MySQL row-level locking for trades"],tech:["Node.js","Express","MySQL","Redis","BullMQ","JWT","Docker","Argon2"],youtube:"https://www.youtube.com/watch?v=IcetVmIat-w"},
  {num:"02",name:"Video Streaming & User Management",tagline:"YouTube-like backend · HLS adaptive streaming",category:"Backend",highlights:["HLS transcoding via ffmpeg · 360p/720p","JWT access + refresh token flow","MongoDB query opt ~200ms → ~120ms","Aggregation pipelines for watch history"],tech:["Node.js","MongoDB","Express","Cloudinary","JWT","ffmpeg","Bcrypt"],youtube:"https://youtu.be/w6980_4fVSQ"},
  {num:"03",name:"RAG Discord Bot",tagline:"Full-stack: Backend with AI · FastAPI + LangChain · per-guild RAG",categories:["Backend","AI/ML"],highlights:["Backend: FastAPI server with multi-guild isolation & async handlers","LangChain: PDF parsing + web scraping + FAISS vector store","Per-guild persistent embeddings with HuggingFace models","LCEL chain → Groq Llama 3.3 inference with rate limiting"],tech:["Python","FastAPI","LangChain","FAISS","Discord.py","Groq","HuggingFace"],discord:"https://discord.com/oauth2/authorize?client_id=1463510548808208415&permissions=8&integration_type=0&scope=bot"},
  {num:"04",name:"RAG Bot Website",tagline:"React showcase for the Discord RAG bot",category:"Frontend",highlights:["Scroll-triggered IntersectionObserver anims","Interactive feature tabs","Zero CSS framework · pure React","Vite + modular component structure"],tech:["React","Vite","JavaScript","CSS","Lucide"],webapp:"https://gamezobot.netlify.app/",website:"https://armanphaugat.github.io/ragwebsite/"},
  {num:"05",name:"Cricket Score Predictor",tagline:"Live IPL · T20 · ODI score prediction via XGBoost",category:"AI/ML",highlights:["3 XGBoost models: IPL, T20, ODI","CricAPI live integration","Streamlit UI with instant predictions","Format-specific feature engineering"],tech:["Python","Streamlit","XGBoost","Scikit-learn","Pandas","CricAPI","Pickle"]},
  {num:"06",name:"IPL Win Predictor",tagline:"Real-time IPL win probability via ML",category:"AI/ML",highlights:["Logistic Regression + Random Forest","Dynamic win % via CRR/RRR/wickets","Feature engineering on 4500+ rows","Streamlit in-match probability viz"],tech:["Python","Streamlit","Scikit-learn","Pandas","NumPy","Matplotlib"]},
  {num:"07",name:"Book Recommender System",tagline:"Dual-mode: popularity + collaborative filtering",category:"AI/ML",highlights:["Popularity: top 50 filtered by 250+ ratings","Cosine similarity on pivot matrix","Filter: users with 200+ ratings","Streamlit UI with covers + ratings"],tech:["Python","Streamlit","Scikit-learn","Pandas","NumPy","Cosine Similarity"]},
  {num:"08",name:"WhatsApp Chat Analyser",tagline:"Upload export · visualize conversation trends",category:"AI/ML",highlights:["Timeline analysis · daily/weekly/monthly","Top emoji breakdown pie charts","Most active user leaderboard","WordCloud + Matplotlib charts"],tech:["Python","Streamlit","Pandas","Matplotlib","WordCloud","Regex","Emoji"]},
  {num:"09",name:"Gamezo Discord Bot",tagline:"Heavy backend bot · multi-game economy · live stock market",category:"Backend",highlights:["Backend: SQLite3 persistence, async scheduling, REST integrations","Games: Coin flip, rock-paper-scissors, airplane crash","Economy: stock market simulation, hourly rewards, portfolio system","Leaderboard, tip system, win/loss stats, rate limiting"],tech:["Python","Discord.py","SQLite3","asyncio","REST API","Stocks"]},
  {num:"10",name:"Cuntrex — 2D Shooter Game",tagline:"Two-player 2D shooter built with Pygame",category:"Game",highlights:["Full game loop · collision detection","Health bar real-time rendering","Menu / play / retry screens","Background music + SFX via Pygame mixer"],tech:["Python","Pygame","OOP","Game Loop","Sprite Animation"]},
  {num:"11",name:"SalesForce UI Clone",tagline:"Pixel-accurate Salesforce homepage clone",category:"Frontend",highlights:["Full layout: nav, hero, content strips","CSS-only responsive grid","Brand-faithful typography + spacing","Pure HTML/CSS — no frameworks"],tech:["HTML","CSS","Flexbox","Responsive Design"]},
];

const CAT_COLORS={Backend:"#1B3A8A","AI/ML":"#2E5FC9",Frontend:"#2A7A5E",Game:"#E8A44A"};
const CAT_COLORS_DARK={Backend:"#7C9EFF","AI/ML":"#6B7FD4",Frontend:"#A78BFA",Game:"#1E2A4A"};
const CATEGORIES=["All","Backend","AI/ML","Frontend","Game"];

function ProjectCard({ p, dark }) {
  const [hov, setHov] = useState(false);
  const displayCategory = Array.isArray(p.categories) ? p.categories[0] : p.category;
  const cc = dark ? (CAT_COLORS_DARK[displayCategory]||"#7C9EFF") : (CAT_COLORS[displayCategory]||"#1B3A8A");
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:hov?(dark?"#0a0000":"#0C0F28"):"var(--paper)", border:`2px solid ${cc}`, boxShadow:hov?`7px 7px 0 ${cc}`:`3px 3px 0 ${cc}`, padding:"1.6rem", transition:"all 0.1s", transform:hov?"translate(-4px,-4px)":"translate(0,0)", display:"flex", flexDirection:"column", cursor:"default" }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.8rem"}}>
        <div style={{display:"flex",gap:"0.4rem",alignItems:"center"}}>
          <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.85rem",color:hov?"rgba(240,237,230,0.55)":"var(--inkMid)",fontWeight:500}}>#{p.num}</span>
          <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.85rem",fontWeight:600,padding:"0.2rem 0.6rem",background:`${cc}12`,color:cc,border:`1px solid ${cc}`}}>{displayCategory}</span>
        </div>
        <div style={{width:24,height:24,background:hov?`${cc}22`:"var(--vPale)",border:`2px solid ${cc}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={cc} strokeWidth="3"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </div>
      </div>
      <h3 style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1.05rem",fontWeight:600,color:hov?"#F0EDE6":"var(--ink)",marginBottom:"0.4rem",lineHeight:1.5}}>{p.name}</h3>
      <p style={{fontSize:"0.92rem",color:hov?"rgba(240,237,230,0.6)":"var(--muted)",marginBottom:"0.9rem",lineHeight:1.7,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{p.tagline}</p>
      <div style={{flex:1,marginBottom:"1rem"}}>
        {p.highlights.map((h,i)=>(
          <div key={i} style={{display:"flex",gap:"0.4rem",fontSize:"0.92rem",color:hov?"rgba(240,237,230,0.68)":"var(--muted)",marginBottom:"0.35rem",lineHeight:1.6,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            <span style={{color:hov?"#A8C0F0":cc,flexShrink:0,lineHeight:"1.7"}}>▸</span>{h}
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem",marginBottom:"0.8rem"}}>
        {p.tech.map(t=>(
          <span key={t} style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.83rem",fontWeight:500,padding:"0.28rem 0.65rem",background:hov?"rgba(168,192,240,0.12)":"var(--vPale)",color:hov?"#A8C0F0":cc,border:`1px solid ${hov?"rgba(168,192,240,0.3)":cc}`}}>{t}</span>
        ))}
      </div>
      {(p.youtube||p.webapp||p.website||p.discord)&&(
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem",paddingTop:"0.8rem",borderTop:`2px solid ${hov?"rgba(255,255,255,0.07)":dark?"rgba(107,127,212,0.1)":"rgba(27,58,138,0.1)"}`}}>
          {p.youtube&&<a href={p.youtube} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:"#D94F3D",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:"2px solid #A83020",boxShadow:"2px 2px 0 #A83020"}}>Demo</a>}
          {p.webapp&&<a href={p.webapp} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:dark?"#6B7FD4":"#1B3A8A",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:`2px solid ${dark?"#1E2A4A":"#0A0F2E"}`,boxShadow:`2px 2px 0 ${dark?"#1E2A4A":"#0A0F2E"}`}}>Live</a>}
          {p.website&&<a href={p.website} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:dark?"#7C9EFF":"#2E5FC9",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:`2px solid ${dark?"#6B7FD4":"#1B3A8A"}`,boxShadow:`2px 2px 0 ${dark?"#6B7FD4":"#1B3A8A"}`}}>Site</a>}
          {p.discord&&<a href={p.discord} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:"#5865f2",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:"2px solid #4752c4",boxShadow:"2px 2px 0 #4752c4"}}>Add Bot</a>}
        </div>
      )}
    </div>
  );
}

function Projects({ dark }) {
  const [active, setActive] = useState("All");
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const filtered=active==="All"?PROJECTS:PROJECTS.filter(p=>{
    const cats = Array.isArray(p.categories) ? p.categories : [p.category];
    return cats.includes(active);
  });
  return (
    <section id="projects" style={{padding:"8rem 4rem",background:"var(--bg2)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:accent,display:"inline-block"}}/>PROJECTS
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.4rem,3vw,2.2rem)",fontWeight:600,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.3}}>
          Things I've <span className="grad">Built</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>10 projects: backends · ML models · AI bots · games · frontend clones</p>
        <ProjectStatsBar/>
        <div className="rv d3" style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          {CATEGORIES.map(cat=>{
            const col = dark ? (CAT_COLORS_DARK[cat]||"#7C9EFF") : (CAT_COLORS[cat]||"#1B3A8A");
            const isActive=active===cat;
            return (
              <button key={cat} onClick={()=>setActive(cat)} style={{ padding:"0.4rem 1rem", cursor:"pointer", border:`2px solid ${col}`, background:isActive?col:"transparent", color:isActive?"#fff":col, fontSize:"0.9rem", fontWeight:600, fontFamily:"'DM Sans', system-ui, sans-serif", boxShadow:isActive?`3px 3px 0 ${col}44`:`2px 2px 0 ${col}44`, transition:"all 0.1s" }}>
                {cat} ({cat==="All"?PROJECTS.length:PROJECTS.filter(p=>{
                  const cats = Array.isArray(p.categories) ? p.categories : [p.category];
                  return cats.includes(cat);
                }).length})
              </button>
            );
          })}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.2rem"}}>
          {filtered.map(p=><ProjectCard key={p.num} p={p} dark={dark}/>)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SKILLS ─────────────── */
const SKILL_LEVELS=[
  {name:"DSA / Competitive Programming",pct:92,cat:"CS Core"},
  {name:"Node.js / Express",pct:90,cat:"Backend"},
  {name:"Python / FastAPI",pct:88,cat:"Backend"},
  {name:"MySQL / ACID Design",pct:85,cat:"Backend"},
  {name:"Redis / BullMQ",pct:82,cat:"Backend"},
  {name:"MongoDB",pct:82,cat:"Database"},
  {name:"LangChain / RAG",pct:80,cat:"AI/ML"},
  {name:"Scikit-learn / XGBoost",pct:78,cat:"AI/ML"},
  {name:"Docker",pct:75,cat:"DevOps"},
  {name:"React / Frontend",pct:72,cat:"Frontend"},
];

const SKILL_GROUPS=[
  {icon:"💻",label:"Languages",items:["Python","JavaScript","C","C++","Java","HTML","CSS"]},
  {icon:"🌐",label:"Web Tech",items:["Node.js","Express.js","FastAPI","React","Tailwind","REST","Streamlit"]},
  {icon:"🗄️",label:"Databases",items:["MySQL","MongoDB","Redis","FAISS","SQLite3"]},
  {icon:"🤖",label:"AI / ML",items:["LangChain","HuggingFace","RAG","VectorDBs","Pandas","NumPy","XGBoost"]},
  {icon:"🔧",label:"Tools",items:["Docker","Git","GitHub","Postman","Cloudinary","Groq","Jupyter"]},
  {icon:"🧠",label:"Concepts",items:["System Design","DSA","ACID","Caching","Rate Limiting","OOP","Auth"]},
];

function SkillBar({ name, pct, cat, dark }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setVis(true); },{threshold:0.3}); if(ref.current)obs.observe(ref.current); return ()=>obs.disconnect(); },[]);
  const catCLight={Backend:"#1B3A8A","AI/ML":"#2E5FC9",Database:"#2A7A5E",DevOps:"#E8A44A",Frontend:"#D94F3D","CS Core":"#5B8FE8"};
  const catCDark={Backend:"#7C9EFF","AI/ML":"#6B7FD4",Database:"#A78BFA",DevOps:"#7C9EFF",Frontend:"#1E2A4A","CS Core":"#60A5FA"};
  const catC = dark ? catCDark : catCLight;
  const col=catC[cat]||"#1B3A8A";
  return (
    <div ref={ref} style={{marginBottom:"1.1rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.4rem"}}>
        <span style={{fontSize:"0.95rem",fontWeight:500,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</span>
        <div style={{display:"flex",alignItems:"center",gap:"0.4rem"}}>
          <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",color:col,fontWeight:600,background:`${col}10`,padding:"0.08rem 0.4rem",border:`1px solid ${col}`}}>{cat}</span>
          <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.85rem",color:"var(--muted)",fontWeight:500}}>{pct}%</span>
        </div>
      </div>
      <div style={{height:9,background:dark?"rgba(107,127,212,0.06)":"rgba(27,58,138,0.06)",border:`2px solid ${dark?"rgba(124,158,255,0.15)":"rgba(27,58,138,0.15)"}`}}>
        <div style={{height:"100%",background:`linear-gradient(90deg,${col},${col}cc)`,width:vis?`${pct}%`:"0%",transition:"width 1.3s cubic-bezier(0.25,1,0.5,1) 0.2s"}}/>
      </div>
    </div>
  );
}

function SkillRings({ dark }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setVis(true); },{threshold:0.2}); if(ref.current)obs.observe(ref.current); return ()=>obs.disconnect(); },[]);
  const rings = dark ? [
    {name:"DSA / CP",pct:92,col:"#7C9EFF",r:110},
    {name:"Node.js",pct:90,col:"#6B7FD4",r:92},
    {name:"Python",pct:88,col:"#A78BFA",r:74},
    {name:"MySQL/ACID",pct:85,col:"#1E2A4A",r:56},
    {name:"Redis",pct:82,col:"#60A5FA",r:38},
    {name:"LangChain",pct:80,col:"#7C9EFF",r:20},
  ] : [
    {name:"DSA / CP",pct:92,col:"#1B3A8A",r:110},
    {name:"Node.js",pct:90,col:"#2E5FC9",r:92},
    {name:"Python",pct:88,col:"#2A7A5E",r:74},
    {name:"MySQL/ACID",pct:85,col:"#E8A44A",r:56},
    {name:"Redis",pct:82,col:"#D94F3D",r:38},
    {name:"LangChain",pct:80,col:"#5B8FE8",r:20},
  ];
  const cx=130,cy=130;
  const circumference=(r)=>2*Math.PI*r;
  const dash=(pct,r)=>(pct/100)*circumference(r);
  return (
    <div ref={ref} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center"}} className="grid2">
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg width="260" height="260" viewBox="0 0 260 260" style={{overflow:"visible"}}>
          {rings.map(({r})=><circle key={`bg-${r}`} cx={cx} cy={cy} r={r} fill="none" stroke={dark?"rgba(107,127,212,0.08)":"rgba(27,58,138,0.08)"} strokeWidth="8" strokeDasharray="4,2"/>)}
          {rings.map(({pct,col,r,name})=>{
            const c=circumference(r); const d=dash(pct,r);
            return <circle key={name} cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth="8" strokeLinecap="square" strokeDasharray={`${vis?d:0} ${c}`} strokeDashoffset={c*0.25} style={{transition:vis?`stroke-dasharray 1.4s ease ${(rings.findIndex(x=>x.r===r))*0.1}s`:"none",transform:"rotate(-90deg)",transformOrigin:`${cx}px ${cy}px`}}/>;
          })}
          <text x={cx} y={cy-8} textAnchor="middle" fill="var(--ink)" fontSize="24" fontWeight="500" fontFamily="'JetBrains Mono', monospace">87%</text>
          <text x={cx} y={cy+12} textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="'DM Sans', system-ui, sans-serif">Avg skill</text>
        </svg>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"0.7rem"}}>
        {rings.map(({name,pct,col},i)=>(
          <div key={name} style={{display:"flex",alignItems:"center",gap:"0.8rem",padding:"0.6rem 0.8rem",background:"var(--paper)",border:`2px solid ${col}`,boxShadow:`3px 3px 0 ${col}`,animation:vis?`tagIn 0.5s ease ${i*0.08}s both`:"none",transition:"transform 0.1s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateX(4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";}}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" style={{flexShrink:0}}>
              <circle cx="15" cy="15" r="11" fill="none" stroke={dark?"rgba(107,127,212,0.1)":"rgba(27,58,138,0.1)"} strokeWidth="3"/>
              <circle cx="15" cy="15" r="11" fill="none" stroke={col} strokeWidth="3" strokeLinecap="square" strokeDasharray={`${vis?(pct/100)*69:0} 69`} style={{transition:vis?`stroke-dasharray 1.4s ease ${i*0.1}s`:"none",transform:"rotate(-90deg)",transformOrigin:"15px 15px"}}/>
            </svg>
            <div style={{flex:1}}>
              <div style={{fontSize:"0.95rem",fontWeight:500,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</div>
              <div style={{height:3,background:dark?"rgba(107,127,212,0.07)":"rgba(27,58,138,0.07)",marginTop:"0.3rem"}}>
                <div style={{height:"100%",width:vis?`${pct}%`:"0%",background:col,transition:vis?`width 1.4s ease ${i*0.08}s`:"none"}}/>
              </div>
            </div>
            <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.88rem",fontWeight:500,color:col,minWidth:"2.5rem",textAlign:"right"}}>{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skills({ dark }) {
  const [tab, setTab] = useState("bars");
  const TABS=[["bars","Skill Bars"],["tags","Tech Tags"],["radar","Radar"],["rings","Rings"]];
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const accentShadow = dark ? "#1E2A4A" : "#0A0F2E";
  const GCOLS = dark
    ? ["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA","#7C9EFF"]
    : ["#1B3A8A","#2E5FC9","#2A7A5E","#E8A44A","#D94F3D","#5B8FE8"];
  return (
    <section id="skills" style={{padding:"8rem 4rem",background:"var(--bg)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div className="orb" style={{width:450,height:450,top:"20%",right:"-8%",background: dark ? "radial-gradient(circle,rgba(255,51,51,0.04) 0%,transparent 70%)" : "radial-gradient(circle,rgba(232,164,74,0.05) 0%,transparent 70%)",animation:"orbDrift3 18s ease-in-out infinite"}}/>
        <div className="orb" style={{width:380,height:380,bottom:"5%",left:"-5%",background: dark ? "radial-gradient(circle,rgba(204,0,0,0.05) 0%,transparent 70%)" : "radial-gradient(circle,rgba(27,58,138,0.06) 0%,transparent 70%)",animation:"orbDrift1 22s ease-in-out infinite 5s"}}/>
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:accent,display:"inline-block"}}/>SKILLS
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.4rem,3vw,2.2rem)",fontWeight:600,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.3}}>
          My <span className="grad">Toolkit</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Technologies I reach for every day.</p>
        <div className="rv d3" style={{display:"flex",gap:"0.4rem",marginBottom:"2rem",flexWrap:"wrap"}}>
          {TABS.map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"0.4rem 1rem",cursor:"pointer",border:`2px solid ${accent}`,background:tab===k?accent:"transparent",color:tab===k?"#fff":accent,fontSize:"0.92rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:tab===k?`3px 3px 0 ${accentShadow}`:`2px 2px 0 ${accentShadow}`,transition:"all 0.1s"}}>{l}</button>
          ))}
        </div>
        {tab==="bars"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 4rem"}} className="grid2 skill-bar-grid">
            {SKILL_LEVELS.map(s=><SkillBar key={s.name} {...s} dark={dark}/>)}
          </div>
        )}
        {tab==="tags"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem"}}>
            {SKILL_GROUPS.map((s,i)=>{
              const gc=GCOLS[i%GCOLS.length];
              return (
                <div key={s.label} style={{background:"var(--paper)",border:`2px solid ${gc}`,padding:"1.2rem",boxShadow:`4px 4px 0 ${gc}`,animation:`tagIn 0.5s ease ${i*0.07}s both`}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.8rem"}}>
                    <div style={{width:32,height:32,background:`${gc}10`,border:`2px solid ${gc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",boxShadow:`2px 2px 0 ${gc}`}}>{s.icon}</div>
                    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)"}}>{s.label}</div>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem"}}>
                    {s.items.map(t=><span key={t} className="chip" style={{fontSize:"0.85rem",borderColor:gc,color:gc,boxShadow:`2px 2px 0 ${gc}`,background:`${gc}10`}}>{t}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab==="radar"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center"}} className="grid2">
            <SkillRadar/>
            <div>
              {(dark ? [
                {label:"Backend",val:90,col:"#7C9EFF"},{label:"DSA / CP",val:92,col:"#6B7FD4"},{label:"AI / ML",val:80,col:"#A78BFA"},{label:"Databases",val:85,col:"#1E2A4A"},{label:"DevOps",val:75,col:"#60A5FA"},{label:"Frontend",val:72,col:"#7C9EFF"}
              ] : [
                {label:"Backend",val:90,col:"#1B3A8A"},{label:"DSA / CP",val:92,col:"#2E5FC9"},{label:"AI / ML",val:80,col:"#2A7A5E"},{label:"Databases",val:85,col:"#E8A44A"},{label:"DevOps",val:75,col:"#D94F3D"},{label:"Frontend",val:72,col:"#5B8FE8"}
              ]).map(s=>(
                <div key={s.label} style={{marginBottom:"0.8rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.4rem"}}>
                    <span style={{fontSize:"1rem",fontWeight:500,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{s.label}</span>
                    <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.88rem",color:s.col,fontWeight:500}}>{s.val}%</span>
                  </div>
                  <div style={{height:6,background:dark?"rgba(107,127,212,0.07)":"rgba(27,58,138,0.07)",border:`1px solid ${s.col}33`}}>
                    <div style={{height:"100%",width:`${s.val}%`,background:s.col,transition:"width 1s ease"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="rings"&&<SkillRings dark={dark}/>}
      </div>
    </section>
  );
}

/* ─────────────── ACHIEVEMENTS ─────────────── */
const ACHIEVEMENTS_LIGHT=[
  {icon:"🏆",title:"Dean's Excellence Award",desc:"Received across multiple semesters for maintaining a 9.0+ CGPA at Manipal University Jaipur.",col:"#E8A44A"},
  {icon:"🔥",title:"900+ DSA Problems",desc:"Consistent problem solving on LeetCode, Codeforces, and other competitive platforms.",col:"#1B3A8A"},
  {icon:"⚡",title:"Top 0.3% LeetCode",desc:"Ranked globally in the top 0.3% of all LeetCode users worldwide. Beats 99.7%.",col:"#2E5FC9"},
  {icon:"🚀",title:"MUJHackX Round 2",desc:"Qualified for Round 2 among 1300+ participants at MUJHackX hackathon.",col:"#2A7A5E"},
];
const ACHIEVEMENTS_DARK=[
  {icon:"🏆",title:"Dean's Excellence Award",desc:"Received across multiple semesters for maintaining a 9.0+ CGPA at Manipal University Jaipur.",col:"#7C9EFF"},
  {icon:"🔥",title:"900+ DSA Problems",desc:"Consistent problem solving on LeetCode, Codeforces, and other competitive platforms.",col:"#6B7FD4"},
  {icon:"⚡",title:"Top 0.3% LeetCode",desc:"Ranked globally in the top 0.3% of all LeetCode users worldwide. Beats 99.7%.",col:"#A78BFA"},
  {icon:"🚀",title:"MUJHackX Round 2",desc:"Qualified for Round 2 among 1300+ participants at MUJHackX hackathon.",col:"#1E2A4A"},
];

function Achievements({ dark }) {
  const ACHIEVEMENTS = dark ? ACHIEVEMENTS_DARK : ACHIEVEMENTS_LIGHT;
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  return (
    <section id="achievements" style={{padding:"8rem 4rem",background:"var(--bg2)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:accent,display:"inline-block"}}/>ACHIEVEMENTS
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.4rem,3vw,2.2rem)",fontWeight:600,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.3}}>
          Milestones & <span className="grad">Recognition</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--inkMid)",marginBottom:"2.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Consistent performance across academics, CP, and hackathons.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.2rem"}}>
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={a.title} className={`rv d${i+1}`} style={{background:"var(--paper)",border:`2px solid ${a.col}`,padding:"1.8rem",boxShadow:`4px 4px 0 ${a.col}`,position:"relative",overflow:"hidden",transition:"transform 0.1s,box-shadow 0.1s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translate(-2px,-2px)";e.currentTarget.style.boxShadow=`6px 6px 0 ${a.col}`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`4px 4px 0 ${a.col}`;}}
            >
              <div style={{fontSize:"2rem",marginBottom:"0.8rem"}}>{a.icon}</div>
              <div style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1.05rem",fontWeight:600,color:"var(--ink)",marginBottom:"0.5rem",lineHeight:1.5}}>{a.title}</div>
              <div style={{fontSize:"0.95rem",color:"var(--muted)",lineHeight:1.75,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div className="rv d5" style={{marginTop:"1.5rem",background: dark ? "#0F1117" : "#07091A",border:`2px solid ${accent}`,padding:"2rem",display:"flex",alignItems:"center",gap:"3rem",flexWrap:"wrap",boxShadow:`6px 6px 0 ${accent}`}}>
          <div>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.9rem",color:"rgba(240,237,230,0.4)",letterSpacing:"1px",marginBottom:"0.5rem",fontWeight:500}}>LeetCode stats</div>
            <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"2.5rem",color:"#F0EDE6",letterSpacing:"-1px",lineHeight:1,fontWeight:500}}>TOP <span style={{color: dark ? "#A78BFA" : "#A8C0F0"}}>0.3%</span></div>
            <div style={{color:"rgba(240,237,230,0.45)",fontSize:"0.9rem",marginTop:"0.3rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Global Rank · 900+ Problems</div>
          </div>
          <div style={{display:"flex",gap:"2rem",flexWrap:"wrap"}}>
            {[["900+","Problems"],["Top 0.3%","Global Rank"],["All levels","Easy–Med–Hard"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"1.5rem",color: dark ? "#A78BFA" : "#A8C0F0",fontWeight:500}}>{n}</div>
                <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"rgba(240,237,230,0.4)",marginTop:"0.2rem"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TIMELINE ─────────────── */
const TIMELINE_EVENTS=[
  {year:"2023",month:"Aug",icon:"🎓",title:"Started B.Tech CSE",sub:"Manipal University Jaipur",desc:"Began CS degree. Immediately dove into DSA and competitive programming.",col:"#1B3A8A"},
  {year:"2023",month:"Dec",icon:"🏆",title:"TLE Eliminators CP Level 1",sub:"Competitive Programming",desc:"Foundation in C++ and algorithmic thinking. Level 1 completed.",col:"#2E5FC9"},
  {year:"2024",month:"Mar",icon:"⭐",title:"Dean's Excellence — Sem 1",sub:"9.05 CGPA",desc:"Awarded Dean's Excellence for outstanding academic performance.",col:"#E8A44A"},
  {year:"2024",month:"Jun",icon:"📜",title:"Oracle DB + GFG OOP Certs",sub:"Certifications",desc:"Completed Oracle Database Design & OOP in Java from GeeksforGeeks.",col:"#2A7A5E"},
  {year:"2024",month:"Aug",icon:"🔥",title:"500+ DSA Problems Solved",sub:"LeetCode + Codeforces",desc:"Hit 500 milestone. Moved to medium-hard consistently.",col:"#D94F3D"},
  {year:"2024",month:"Nov",icon:"🥋",title:"TLE Eliminators Level 2 & 3",sub:"Advanced Algorithms",desc:"Advanced graph theory, segment trees, DP optimizations.",col:"#1B3A8A"},
  {year:"2025",month:"Jan",icon:"🎩",title:"Red Hat Sysadmin + NPTEL DAA",sub:"Dual Certifications",desc:"Red Hat Sysadmin I & II + NPTEL Design & Analysis of Algorithms.",col:"#D94F3D"},
  {year:"2025",month:"Feb",icon:"🚀",title:"MUJHackX Round 2",sub:"1300+ participants",desc:"Top performers among 1300+ participants at MUJHackX.",col:"#2E5FC9"},
  {year:"2025",month:"Mar",icon:"⚡",title:"LeetCode Top 0.3%",sub:"Beats 99.7%",desc:"900+ problems. Ranked top 0.3% globally.",col:"#E8A44A"},
  {year:"2025",month:"Jun",icon:"💼",title:"Web Dev Intern — Indavis",sub:"Haridwar · On-site",desc:"First professional internship. Real business constraints.",col:"#2A7A5E"},
];

const TIMELINE_COLS_DARK=["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA","#7C9EFF","#1E2A4A","#6B7FD4","#A78BFA","#7C9EFF"];

function Timeline({ dark }) {
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  return (
    <section id="timeline" className="sec-pad sec-transition" style={{padding:"8rem 4rem",background:"var(--bg)"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:accent,display:"inline-block"}}/>JOURNEY
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.4rem,3vw,2.2rem)",fontWeight:600,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.3}}>
          My <span className="grad">Timeline</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"3rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>From day one at MUJ to where I am now.</p>

        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:2,background: dark ? `linear-gradient(to bottom,transparent,#6B7FD4 5%,#6B7FD4 95%,transparent)` : `linear-gradient(to bottom,transparent,#1B3A8A 5%,#1B3A8A 95%,transparent)`,transform:"translateX(-50%)"}} className="hide-mob"/>
          <div style={{position:"absolute",left:20,top:0,bottom:0,width:2,background: dark ? "#6B7FD433" : "#1B3A8A33"}} className="show-mob"/>

          {TIMELINE_EVENTS.map((ev,i)=>{
            const col = dark ? TIMELINE_COLS_DARK[i] : ev.col;
            const isLeft=i%2===0;
            return (
              <div key={i} className={`rv d${(i%5)+1}`} style={{display:"flex",justifyContent:isLeft?"flex-start":"flex-end",marginBottom:"1.5rem",position:"relative"}}>
                <div style={{position:"absolute",left:"calc(50% - 16px)",top:"1rem",width:32,height:32,background:col,border:"3px solid var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",zIndex:2,boxShadow:`3px 3px 0 ${col}55, 0 0 14px ${col}44`,outline:`3px solid ${col}`,outlineOffset:"2px"}} className="hide-mob">{ev.icon}</div>
                <div style={{position:"absolute",left:8,top:"1rem",width:24,height:24,background:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",zIndex:2}} className="show-mob">{ev.icon}</div>

                <div style={{width:"44%",background:"var(--paper)",border:`2px solid ${col}`,padding:"1.1rem 1.3rem",boxShadow:`4px 4px 0 ${col}`,marginLeft:isLeft?"0":"auto",transition:"transform 0.1s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";}}
                  className="hide-mob"
                >
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.3rem"}}>
                    <div style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)",lineHeight:1.4}}>{ev.title}</div>
                    <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.8rem",color:col,background:`${col}10`,padding:"0.15rem 0.4rem",fontWeight:500,whiteSpace:"nowrap",marginLeft:"0.4rem",flexShrink:0,border:`1px solid ${col}`,boxShadow:`1px 1px 0 ${col}`}}>{ev.month} {ev.year}</span>
                  </div>
                  <div style={{fontSize:"0.88rem",color:col,fontWeight:500,marginBottom:"0.4rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{ev.sub}</div>
                  <div style={{fontSize:"0.92rem",color:"var(--muted)",lineHeight:1.7,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{ev.desc}</div>
                </div>

                <div style={{marginLeft:"2.8rem",flex:1,background:"var(--paper)",border:`2px solid ${col}`,padding:"0.9rem 1rem",boxShadow:`3px 3px 0 ${col}`}} className="show-mob">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.2rem"}}>
                    <div style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"0.97rem",fontWeight:600,color:"var(--ink)",lineHeight:1.5}}>{ev.title}</div>
                    <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.78rem",color:col,padding:"0.1rem 0.35rem",border:`1px solid ${col}`,whiteSpace:"nowrap",marginLeft:"0.3rem",fontWeight:500}}>{ev.month} {ev.year.slice(2)}</span>
                  </div>
                  <div style={{fontSize:"0.85rem",color:col,fontWeight:500,marginBottom:"0.3rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{ev.sub}</div>
                  <div style={{fontSize:"0.88rem",color:"var(--muted)",lineHeight:1.65,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{ev.desc}</div>
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
const LEARNING=[
  {icon:"🐹",name:"Go (Golang)",desc:"High-concurrency backends. Goroutines, channels, REST APIs with Gin.",progress:40,col:"#00ACD7",colDark:"#7C9EFF",status:"Active"},
  {icon:"☸️",name:"Kubernetes",desc:"Container orchestration, deployments, services, scaling stateful apps.",progress:30,col:"#326CE5",colDark:"#6B7FD4",status:"Active"},
  {icon:"🦀",name:"Rust",desc:"Systems programming, memory safety, ownership model. Working through The Book.",progress:20,col:"#CE422B",colDark:"#A78BFA",status:"Started"},
  {icon:"📡",name:"gRPC & Protobuf",desc:"High-performance inter-service communication for microservices.",progress:45,col:"#1B3A8A",colDark:"#7C9EFF",status:"Active"},
  {icon:"🔭",name:"Apache Kafka",desc:"Event-driven architecture, distributed messaging, stream processing.",progress:25,col:"#2E5FC9",colDark:"#1E2A4A",status:"Started"},
  {icon:"🧠",name:"LLM Fine-tuning",desc:"SFT of open-source models (Mistral/Llama) for domain-specific RAG.",progress:35,col:"#2A7A5E",colDark:"#6B7FD4",status:"Active"},
];

function CurrentlyLearning({ dark }) {
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const accent2 = dark ? "#6B7FD4" : "#2E5FC9";
  return (
    <section id="learning" className="sec-pad sec-transition" style={{padding:"8rem 4rem",background:"var(--bg2)",position:"relative",overflow:"hidden"}}>
      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color:accent,letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:accent,display:"inline-block"}}/>LEARNING
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem",marginBottom:"0.6rem"}}>
          <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(1.4rem,2.5vw,2rem)",fontWeight:600,color:"var(--ink)",lineHeight:1.3}}>
            Currently <span className="grad">Exploring</span>
          </h2>
          <div className="rv d2" style={{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.35rem 0.8rem",background:"var(--vPale)",border:`2px solid ${accent}`,boxShadow:`2px 2px 0 ${accent}`,animation:"learnPulse 2.5s ease-in-out infinite"}}>
            <div style={{width:7,height:7,background:dark?"#7C9EFF":"#2A7A5E",animation:"pulse2 1.5s ease-in-out infinite"}}/>
            <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:accent,fontWeight:600}}>In progress</span>
          </div>
        </div>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--inkMid)",marginBottom:"2.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Going deeper into infra, systems programming, and advanced AI.</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1.1rem"}}>
          {LEARNING.map((item,i)=>{
            const col = dark ? item.colDark : item.col;
            return (
              <div key={item.name} className={`rv d${(i%4)+1}`} style={{background:"var(--paper)",border:`2px solid ${col}`,padding:"1.4rem",boxShadow:`4px 4px 0 ${col}`,transition:"all 0.1s",position:"relative"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translate(-2px,-2px)";e.currentTarget.style.boxShadow=`6px 6px 0 ${col}`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`4px 4px 0 ${col}`;}}
              >
                <div style={{position:"absolute",top:"0.8rem",right:"0.8rem",fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",fontWeight:600,padding:"0.15rem 0.5rem",background:item.status==="Active"?dark?"rgba(107,127,212,0.1)":"rgba(42,122,94,0.1)":"rgba(232,164,74,0.1)",color:item.status==="Active"?dark?"#7C9EFF":"#2A7A5E":"#B8832A",border:`1px solid ${item.status==="Active"?dark?"#6B7FD4":"#2A7A5E":"#E8A44A"}`}}>{item.status}</div>

                <div style={{display:"flex",gap:"0.8rem",alignItems:"flex-start",marginBottom:"0.8rem"}}>
                  <div style={{width:40,height:40,background:`${col}12`,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0,boxShadow:`2px 2px 0 ${col}`}}>{item.icon}</div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)",lineHeight:1.4}}>{item.name}</div>
                    <div style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.88rem",color:col,marginTop:"0.15rem",fontWeight:500}}>{item.progress}% through</div>
                  </div>
                </div>

                <p style={{fontSize:"0.92rem",color:"var(--muted)",lineHeight:1.7,marginBottom:"1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{item.desc}</p>

                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.4rem"}}>
                    <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"var(--inkMid)",fontWeight:500}}>Progress</span>
                    <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.85rem",color:col,fontWeight:500}}>{item.progress}%</span>
                  </div>
                  <div style={{height:8,background:dark?"rgba(107,127,212,0.06)":"rgba(27,58,138,0.06)",border:`2px solid ${col}`}}>
                    <div style={{height:"100%",background:`linear-gradient(90deg,${col},${col}bb)`,width:`${item.progress}%`,transition:"width 1.2s cubic-bezier(0.25,1,0.5,1)"}}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rv d5" style={{marginTop:"2rem",padding:"1rem 1.5rem",background:"var(--vPale)",border:`2px solid ${accent}`,boxShadow:`3px 3px 0 ${accent}`,display:"flex",alignItems:"center",gap:"0.8rem"}}>
          <span style={{fontSize:"1.2rem"}}>💡</span>
          <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",color:"var(--ink)",lineHeight:1.65}}>
            <strong style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",color:accent,fontWeight:600}}>Goal 2025–26:</strong> Ship prod-grade services in Go, get comfortable with K8s, contribute to open-source.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTACT ─────────────── */
function Contact({ dark }) {
  const [copied, setCopied] = useState(false);
  const copy=()=>{ navigator.clipboard.writeText("armanphaugat20@gmail.com"); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const accent2 = dark ? "#6B7FD4" : "#2E5FC9";
  const LINKS=[
    {icon:"✉️",label:"Email",value:"armanphaugat20@gmail.com",href:"mailto:armanphaugat20@gmail.com",col:accent},
    {icon:"📱",label:"Phone",value:"+91-9306115772",href:"tel:+919306115772",col:accent2},
    {icon:"🐙",label:"GitHub",value:"github.com/armanphaugat",href:"https://github.com/armanphaugat",col:dark?"#A78BFA":"#2A7A5E"},
    {icon:"💼",label:"LinkedIn",value:"linkedin.com/in/armanphaugat05",href:"https://www.linkedin.com/in/armanphaugat05/",col:"#0A66C2"},
    {icon:"🧩",label:"LeetCode",value:"Top 0.3% · armanphaugat20",href:"https://leetcode.com/u/armanphaugat20",col:dark?"#7C9EFF":"#E8A44A"},
  ];
  return (
    <section id="contact" style={{padding:"9rem 4rem",background: dark ? "#0F1117" : "#07091A",position:"relative",overflow:"hidden",backgroundImage: dark ? "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(107,127,212,0.1) 0%, transparent 60%)" : "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(27,58,138,0.14) 0%, transparent 60%)"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div className="orb" style={{width:550,height:550,top:"-15%",left:"20%",background: dark ? "radial-gradient(circle,rgba(107,127,212,0.08) 0%,transparent 70%)" : "radial-gradient(circle,rgba(46,95,201,0.1) 0%,transparent 70%)",animation:"orbDrift1 16s ease-in-out infinite"}}/>
        <div className="orb" style={{width:380,height:380,bottom:"5%",right:"5%",background: dark ? "radial-gradient(circle,rgba(204,0,0,0.06) 0%,transparent 70%)" : "radial-gradient(circle,rgba(232,164,74,0.07) 0%,transparent 70%)",animation:"orbDrift2 20s ease-in-out infinite 3s"}}/>
        <div className="orb" style={{width:280,height:280,top:"50%",left:"-5%",background: dark ? "radial-gradient(circle,rgba(107,127,212,0.06) 0%,transparent 70%)" : "radial-gradient(circle,rgba(42,122,94,0.08) 0%,transparent 70%)",animation:"orbDrift3 14s ease-in-out infinite 6s"}}/>
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",color: dark ? "#A78BFA" : "#5B8FE8",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background: dark ? "#A78BFA" : "#5B8FE8",display:"inline-block"}}/>CONTACT
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:600,color:"#F0EDE6",marginBottom:"0.8rem",lineHeight:1.2}}>
          Let's <span style={{color: dark ? "#A78BFA" : "#A8C0F0"}}>Connect</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"rgba(240,237,230,0.5)",maxWidth:480,marginBottom:"3rem",lineHeight:1.9,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
          Internship, project collab, or tech talk — reach out and I'll reply fast.
        </p>

        <div className="rv d3 contact-email-row" style={{display:"flex",gap:"0.8rem",alignItems:"center",marginBottom:"2.5rem",flexWrap:"wrap"}}>
          <div style={{background:"rgba(255,255,255,0.04)",border:`2px solid ${dark?"rgba(107,127,212,0.2)":"rgba(255,255,255,0.12)"}`,padding:"0.9rem 1.3rem",flex:1,minWidth:260}}>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.85rem",color:"rgba(240,237,230,0.45)",letterSpacing:"1px",marginBottom:"0.3rem",fontWeight:500}}>Primary email</div>
            <div style={{fontSize:"1rem",color:"#F0EDE6",fontWeight:500,fontFamily:"'JetBrains Mono', monospace"}}>armanphaugat20@gmail.com</div>
          </div>
          <button onClick={copy} className="px-btn" style={{padding:"0.9rem 1.5rem",background:copied?dark?"#1E2A4A":"#2A7A5E":accent,color:"#fff",border:"none",cursor:"pointer",fontSize:"0.95rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",transition:"background 0.2s",boxShadow:"3px 3px 0 #0A0F2E",whiteSpace:"nowrap"}}>{copied?"Copied! ✓":"Copy email"}</button>
          <a href="mailto:armanphaugat20@gmail.com" className="px-btn" style={{padding:"0.9rem 1.5rem",background:"rgba(255,255,255,0.06)",color:"#fff",border:"2px solid rgba(255,255,255,0.18)",textDecoration:"none",fontSize:"0.95rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",whiteSpace:"nowrap",boxShadow:"3px 3px 0 rgba(255,255,255,0.1)"}}>Open mail →</a>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.8rem"}}>
          {LINKS.map((l,i)=>(
            <a key={l.label} href={l.href} target={l.href.startsWith("http")?"_blank":undefined} rel="noreferrer" className={`rv d${i+1} shimmer-hover`}
              style={{display:"flex",alignItems:"center",gap:"0.8rem",padding:"1rem 1.2rem",background:"rgba(255,255,255,0.03)",border:`2px solid ${l.col}`,textDecoration:"none",color:"#F0EDE6",boxShadow:`3px 3px 0 ${l.col}33`,transition:"all 0.1s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=`${l.col}18`;e.currentTarget.style.transform="translate(-2px,-2px)";e.currentTarget.style.boxShadow=`5px 5px 0 ${l.col}55`;}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`3px 3px 0 ${l.col}33`;}}
            >
              <div style={{fontSize:"1.2rem",flexShrink:0}}>{l.icon}</div>
              <div>
                <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.8rem",color:"rgba(240,237,230,0.35)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"0.1rem",fontWeight:500}}>{l.label}</div>
                <div style={{fontSize:"0.92rem",fontWeight:500,wordBreak:"break-all",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{l.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="rv d5" style={{marginTop:"2.5rem"}}>
          <AvailabilityWidget/>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer({ dark }) {
  const accent = dark ? "#7C9EFF" : "#1B3A8A";
  const FCOLS = dark
    ? ["#7C9EFF","#6B7FD4","#A78BFA","#1E2A4A","#60A5FA","#7C9EFF"]
    : ["#1B3A8A","#2E5FC9","#2A7A5E","#E8A44A","#D94F3D","#5B8FE8"];
  return (
    <footer style={{background: dark ? "linear-gradient(180deg,#0F1117 0%,#0F1117 100%)" : "linear-gradient(180deg,#07091A 0%,#04060F 100%)",borderTop:`2px solid ${accent}`,boxShadow:`0 -4px 30px ${dark?"rgba(255,51,51,0.12)":"rgba(27,58,138,0.12)"}`}}>
      <div className="px-divider"/>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"2.5rem 2rem 2rem",display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"3rem"}} className="footer-grid">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"0.8rem"}}>
            <div style={{width:32,height:32,background:accent,border:`2px solid ${dark?"#A78BFA":"#5B8FE8"}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`3px 3px 0 ${dark?"#A78BFA":"#5B8FE8"}`}}>
              <span style={{fontFamily:"'Press Start 2P', monospace",color:"#fff",fontSize:"0.72rem",fontWeight:400}}>AP</span>
            </div>
            <span style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:"1.05rem",fontWeight:600,color:"#F0EDE6",fontStyle:"italic"}}>Arman Phaugat</span>
          </div>
          <p style={{fontSize:"0.92rem",color:"rgba(240,237,230,0.4)",lineHeight:1.85,maxWidth:280,marginBottom:"1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            Backend & AI/ML Engineer · 3rd Year CSE · MUJ · Building fast, scalable systems.
          </p>
          <div style={{display:"flex",gap:"0.5rem"}}>
            {[{href:"https://github.com/armanphaugat",label:"GH"},{href:"https://www.linkedin.com/in/armanphaugat05/",label:"LI"},{href:"https://leetcode.com/u/armanphaugat20",label:"LC"}].map((s,i)=>(
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{width:32,height:32,background:"rgba(255,255,255,0.04)",border:`2px solid ${FCOLS[i]}`,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",color:"#F0EDE6",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.82rem",fontWeight:500,boxShadow:`2px 2px 0 ${FCOLS[i]}`,transition:"all 0.1s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${FCOLS[i]}28`;e.currentTarget.style.transform="translate(-1px,-1px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="";}}
              >{s.label}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",fontWeight:600,color:"rgba(240,237,230,0.3)",letterSpacing:"2px",marginBottom:"0.8rem",textTransform:"uppercase"}}>Navigate</div>
          {["About","Experience","Projects","Skills","Timeline","Contact"].map((s,i)=>(
            <a key={s} href={`#${s.toLowerCase()}`} style={{display:"block",fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.95rem",color:"rgba(240,237,230,0.45)",textDecoration:"none",marginBottom:"0.45rem",transition:"color 0.1s",fontWeight:400}}
              onMouseEnter={e=>e.currentTarget.style.color=FCOLS[i%FCOLS.length]}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(240,237,230,0.4)"}
            >› {s}</a>
          ))}
        </div>

        <div>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",fontWeight:600,color:"rgba(240,237,230,0.3)",letterSpacing:"2px",marginBottom:"0.8rem",textTransform:"uppercase"}}>Status</div>
          <div className="status-available" style={{marginBottom:"0.8rem",width:"fit-content"}}>
            <div className="status-ping"/>
            <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:dark?"#7C9EFF":"#2A7A5E",fontWeight:600}}>Open to work</span>
          </div>
          <div style={{fontSize:"0.92rem",color:"rgba(240,237,230,0.5)",lineHeight:1.8,marginBottom:"1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            Available for internships & projects.<br/>Backend · AI/ML · Full Stack
          </div>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.8rem",fontWeight:600,color:"rgba(240,237,230,0.3)",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"1px"}}>Dev thought</div>
          <FunFactsTicker/>
        </div>
      </div>

      <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"1rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",maxWidth:1060,margin:"0 auto"}}>
        <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"rgba(240,237,230,0.22)"}}>© 2025 Arman Phaugat · All rights reserved</span>
        <span style={{fontFamily:"'JetBrains Mono', monospace",fontSize:"0.85rem",color:"rgba(240,237,230,0.22)"}}>Built with React · <span style={{color: dark ? "rgba(107,127,212,0.5)" : "rgba(27,58,138,0.6)"}}>?</span> = shortcuts · <span style={{color: dark ? "rgba(107,127,212,0.5)" : "rgba(27,58,138,0.6)"}}>`</span> = terminal</span>
      </div>
    </footer>
  );
}



/* ─────────────── APP ─────────────── */
export default function App() {
  const [dark, setDark]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useReveal();
  useSectionTransitions();

  useEffect(()=>{ document.documentElement.setAttribute("data-theme",dark?"dark":"light"); },[dark]);

  useEffect(()=>{
    const fn=(e)=>{ if(e.key==="`"&&!loading)setShowTerminal(p=>!p); };
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  },[loading]);

  return (
    <>
      <style>{G}</style>

      {/* Film grain noise overlay — replaces scanlines */}
      <div className="noise-overlay"/>

      {showTerminal&&<TerminalEasterEgg onClose={()=>setShowTerminal(false)}/>}

      <ScrollProgressBar/>
      <MouseTrail/>
      <KonamiConfetti/>
      <KeyboardShortcuts/>
      <ToastContainer/>
      <FloatingConnectCTA/>
      <Cursor/>
      <SectionProgress/>
      <BackToTop/>

      <button onClick={()=>setShowTerminal(p=>!p)} title="Open terminal (` key)" style={{
        position:"fixed", bottom:"2rem", left:"2rem",
        width:44, height:44, zIndex:800,
        background:showTerminal?"#1B3A8A":"var(--paper)",
        border:"2px solid #1B3A8A",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:showTerminal?"5px 5px 0 #0A0F2E":"3px 3px 0 #1B3A8A",
        transition:"all 0.1s",
      }}
        onMouseEnter={e=>{if(!showTerminal){e.currentTarget.style.background="#1B3A8A";e.currentTarget.style.transform="translate(-1px,-1px)";}}}
        onMouseLeave={e=>{if(!showTerminal){e.currentTarget.style.background="var(--paper)";e.currentTarget.style.transform="";}}}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={showTerminal?"#fff":"#1B3A8A"} strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
          <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
      </button>

      <Nav dark={dark} setDark={setDark}/>
      <main>
        <Hero/>
        <Marquee/>
        <About/>
        <Experience/>
        <Resume/>
        <Projects/>
        <Skills/>
        <Achievements/>
        <Timeline/>
        <CurrentlyLearning/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}