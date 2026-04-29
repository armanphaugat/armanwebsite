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
  v:      "#1D4ED8",
  vLight: "#3B82F6",
  vPale:  "var(--vPale)",
  vDeep:  "#1E3A8A",
  accent: "#0EA5E9",
  accent2:"#F59E0B",
  accent3:"#EF4444",
  accent4:"#10B981",
  muted:  "var(--muted)",
  gold:   "#F59E0B",
};

/* ─────────────── GLOBAL STYLES ─────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  :root {
    --bg:       #F8FAFC;
    --bg2:      #F1F5F9;
    --paper:    #FFFFFF;
    --ink:      #0F172A;
    --inkMid:   #1E40AF;
    --vPale:    #DBEAFE;
    --muted:    #475569;
    --glow-v:   rgba(29,78,216,0.18);
    --glow-c:   rgba(14,165,233,0.15);
    --grid-col: rgba(29,78,216,0.05);
  }
  [data-theme="dark"] {
    --bg:       #020B18;
    --bg2:      #051225;
    --paper:    #071A30;
    --ink:      #F0F9FF;
    --inkMid:   #BAE6FD;
    --vPale:    #0C2A50;
    --muted:    #7DD3FC;
    --glow-v:   rgba(59,130,246,0.2);
    --glow-c:   rgba(14,165,233,0.15);
    --grid-col: rgba(59,130,246,0.07);
  }

  [data-theme="dark"] body { background: #020B18; color: #F0F9FF; }

  :root {
    --card-hover: #0C2A50;
    --filter-active-bg: #1D4ED8;
    --filter-active-color: #ffffff;
    --section-divider: rgba(29,78,216,0.15);
    --pixel-border: 3px solid;
  }
  [data-theme="dark"] {
    --card-hover: #0F3460;
    --filter-active-bg: #1D4ED8;
    --filter-active-color: #ffffff;
    --section-divider: rgba(59,130,246,0.2);
  }

  @keyframes darkToggle    { from{transform:rotate(-30deg) scale(0.7);opacity:0} to{transform:rotate(0deg) scale(1);opacity:1} }
  @keyframes particleDrift { 0%{opacity:0.7} 100%{transform:translate(var(--px),var(--py));opacity:0} }
  @keyframes pulse2        { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.25);opacity:0.7} }
  @keyframes backTopIn     { from{opacity:0;transform:translateY(12px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes learnPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(29,78,216,0.3)} 50%{box-shadow:0 0 0 6px rgba(29,78,216,0)} }
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
  @keyframes scanline      { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  @keyframes marquee       { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes tagIn         { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes floatUp       { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes resumePulse   { 0%,100%{box-shadow:4px 4px 0 #1E3A8A} 50%{box-shadow:6px 6px 0 #1E3A8A} }
  @keyframes menuSlide     { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes iconDrift     { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(8px,-16px) rotate(6deg)} }
  @keyframes iconDriftB    { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,-22px)} }
  @keyframes iconDriftC    { 0%,100%{transform:translate(0,0)} 40%{transform:translate(12px,10px) rotate(12deg)} }
  @keyframes iconDriftD    { 0%,100%{transform:translate(0,0)} 60%{transform:translate(-8px,-18px)} }
  @keyframes blink         { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes neonFlicker   { 0%,100%{opacity:1;text-shadow:0 0 8px rgba(29,78,216,0.8)} 92%{opacity:1} 93%{opacity:0.6} 94%{opacity:1} }
  @keyframes pixelPop      { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
  @keyframes gridPulse    { 0%,100%{opacity:0.6} 50%{opacity:1} }
  @keyframes borderMarch  { 0%{background-position:0 0,100% 0,100% 100%,0 100%} 100%{background-position:300px 0,100% 300px,calc(100% - 300px) 100%,0 calc(100% - 300px)} }
  @keyframes shimmer      { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes cardRise     { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes glowPulse    { 0%,100%{box-shadow:0 0 8px rgba(29,78,216,0.3),4px 4px 0 #1D4ED8} 50%{box-shadow:0 0 20px rgba(29,78,216,0.5),4px 4px 0 #1D4ED8} }
  @keyframes rgbShift     { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
  @keyframes scanlineMove { 0%{transform:translateY(-100vh)} 100%{transform:translateY(100vh)} }
  @keyframes heroGlow     { 0%,100%{text-shadow:5px 5px 0 rgba(29,78,216,0.18),0 0 40px rgba(29,78,216,0.1)} 50%{text-shadow:5px 5px 0 rgba(29,78,216,0.25),0 0 60px rgba(29,78,216,0.2)} }
  @keyframes dotMatrix    { 0%{opacity:0.3} 50%{opacity:1} 100%{opacity:0.3} }
  @keyframes avatarFloat  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes avatarBlink  { 0%,89%,91%,100%{transform:scaleY(1)} 90%{transform:scaleY(0.08)} }
  @keyframes avatarGlow   { 0%,100%{filter:drop-shadow(0 0 8px rgba(29,78,216,0.5))} 50%{filter:drop-shadow(0 0 18px rgba(29,78,216,0.9)) drop-shadow(0 0 30px rgba(14,165,233,0.4))} }
  @keyframes pixelRain    { 0%{transform:translateY(-20px);opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{transform:translateY(100vh);opacity:0} }
  @keyframes chipTunePop  { 0%{transform:scale(1)} 50%{transform:scale(1.04)} 100%{transform:scale(1)} }

  .sec-transition { opacity:0; transform:translateY(28px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .sec-transition.visible { opacity:1; transform:translateY(0); }

  .progress-dot { width:12px; height:12px; background:rgba(29,78,216,0.2); border:2px solid rgba(29,78,216,0.4); image-rendering:pixelated; transition:all 0.2s; cursor:pointer; }
  .progress-dot.active { background:#1D4ED8; border-color:#3B82F6; transform:scale(1.4); box-shadow:3px 3px 0 #1E3A8A, 0 0 8px rgba(29,78,216,0.6); }
  .progress-dot:hover:not(.active) { background:rgba(29,78,216,0.4); }

  .btt-btn { position:fixed; bottom:2rem; right:2rem; width:46px; height:46px; background:linear-gradient(135deg,#1D4ED8,#1E40AF); border:3px solid #1E3A8A; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:800; box-shadow:4px 4px 0 #1E3A8A, 0 0 12px rgba(29,78,216,0.4); transition:transform 0.1s, box-shadow 0.1s; image-rendering:pixelated; }
  .btt-btn:hover { transform:translate(-3px,-3px); box-shadow:7px 7px 0 #1E3A8A, 0 0 20px rgba(29,78,216,0.6); }
  .btt-btn:active { transform:translate(2px,2px); box-shadow:2px 2px 0 #1E3A8A; }

  .scroll-bar { position:fixed; top:0; left:0; height:5px; background:repeating-linear-gradient(90deg,#1D4ED8 0px,#1D4ED8 8px,#0EA5E9 8px,#0EA5E9 16px,#F59E0B 16px,#F59E0B 24px,#EF4444 24px,#EF4444 32px); z-index:9999; transition:width 0.05s linear; image-rendering:pixelated; box-shadow:0 1px 8px rgba(29,78,216,0.5); }

  .spotlight { display:none; }

  .toast-wrap { position:fixed; bottom:5.5rem; right:1.5rem; z-index:9000; display:flex; flex-direction:column; gap:0.5rem; pointer-events:none; }
  .toast { background:var(--paper); border:3px solid #1D4ED8; border-radius:0; padding:0.75rem 1.1rem; font-size:0.9rem; font-family:'DM Mono', monospace; color:var(--ink); box-shadow:4px 4px 0 #1D4ED8; display:flex; align-items:center; gap:0.6rem; pointer-events:all; animation:toastIn 0.35s ease both; }

  .float-cta { position:fixed; bottom:6rem; left:2rem; z-index:799; animation:floatCTA 0.5s ease both; }

  .kbd-hint { position:fixed; bottom:2rem; left:50%; transform:translateX(-50%); z-index:799; background:var(--paper); border:3px solid #1D4ED8; border-radius:0; padding:0.45rem 1.2rem; font-size:0.82rem; font-family:'DM Mono', monospace; color:var(--muted); box-shadow:3px 3px 0 #1D4ED8; display:flex; align-items:center; gap:0.6rem; animation:kbdIn 0.3s ease both; pointer-events:none; }
  .kbd-key { background:var(--vPale); color:#1D4ED8; border:2px solid #1D4ED8; border-radius:0; padding:0.1rem 0.45rem; font-size:0.8rem; font-weight:600; box-shadow:2px 2px 0 #1D4ED8; }

  .status-available { display:inline-flex; align-items:center; gap:0.5rem; padding:0.35rem 1rem; background:rgba(16,185,129,0.12); border:2px solid #10B981; border-radius:0; box-shadow:2px 2px 0 #10B981, 0 0 12px rgba(16,185,129,0.15); }
  .status-ping { width:9px; height:9px; background:#10B981; position:relative; box-shadow:0 0 6px rgba(16,185,129,0.6); }
  .status-ping::before { content:''; position:absolute; inset:0; background:#10B981; animation:statusPing 1.5s ease infinite; }

  .chip {
    display: inline-block;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.28rem 0.85rem;
    border-radius: 0;
    background: var(--vPale); color: #1D4ED8; border: 2px solid #1D4ED8;
    box-shadow: 3px 3px 0 #1D4ED8;
    transition: all 0.12s;
    letter-spacing: 0.01em;
    cursor: default;
  }
  .chip:hover {
    background: #1D4ED8; color: #fff;
    transform: translate(-2px,-2px);
    box-shadow: 4px 4px 0 #1E3A8A, 0 0 10px rgba(29,78,216,0.3);
  }

  .nav-link { position: relative; text-decoration: none; }
  .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 3px; background: linear-gradient(90deg,#1D4ED8,#0EA5E9); transition: width 0.25s steps(8); box-shadow: 0 0 6px rgba(29,78,216,0.5); }
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
    font-family: 'Press Start 2P', monospace;
    font-size: 1rem;
    color: var(--ink);
    text-decoration: none;
    transition: color 0.1s;
  }
  .mob-menu a:hover { color: #1D4ED8; }

  .hide-mob { display: flex; }
  .show-mob { display: none; }

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
    .chip { font-size: 0.78rem !important; padding: 0.2rem 0.5rem !important; }
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
  ::-webkit-scrollbar-thumb { background: repeating-linear-gradient(180deg,#1D4ED8 0,#1D4ED8 6px,#0EA5E9 6px,#0EA5E9 12px); border-left: 2px solid var(--bg); }

  .pixel { font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; letter-spacing: 0px; }
  .vt    { font-family: 'DM Mono', monospace; }
  .mono  { font-family: 'DM Mono', monospace; }

  .rv { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .rv.on { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.08s; } .d2 { transition-delay: 0.16s; }
  .d3 { transition-delay: 0.24s; } .d4 { transition-delay: 0.32s; }
  .d5 { transition-delay: 0.40s; }

  .grad { background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 40%, #0EA5E9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .px-card {
    border: 3px solid #1D4ED8;
    box-shadow: 6px 6px 0 #1D4ED8;
    border-radius: 0;
    transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
    position: relative;
  }
  .px-card:hover {
    transform: translate(-4px,-4px);
    box-shadow: 10px 10px 0 #1D4ED8, 0 0 30px rgba(29,78,216,0.18), inset 0 0 0 1px rgba(29,78,216,0.08);
    border-color: #2563EB;
  }

  .px-btn {
    border-radius: 0 !important;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
    transition: transform 0.1s, box-shadow 0.12s, filter 0.1s;
    letter-spacing: 0.03em;
  }
  .px-btn:hover {
    transform: translate(-3px,-3px);
    box-shadow: 7px 7px 0 rgba(0,0,0,0.4);
    filter: brightness(1.1);
  }
  .px-btn:active {
    transform: translate(2px,2px);
    box-shadow: 1px 1px 0 rgba(0,0,0,0.3);
    filter: brightness(0.9);
  }

  .scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9996;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px);
  }
  .scanlines::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 60px;
    background: linear-gradient(to bottom, transparent, rgba(29,78,216,0.04), transparent);
    animation: scanlineMove 6s linear infinite;
    pointer-events: none;
  }

  .px-divider {
    height: 6px;
    background: repeating-linear-gradient(90deg,
      #1D4ED8 0,#1D4ED8 10px,
      #2563EB 10px,#2563EB 16px,
      #0EA5E9 16px,#0EA5E9 26px,
      #38BDF8 26px,#38BDF8 32px,
      #F59E0B 32px,#F59E0B 42px,
      #EF4444 42px,#EF4444 52px,
      #10B981 52px,#10B981 62px,
      transparent 62px,transparent 72px);
    width: 100%;
    box-shadow: 0 2px 8px rgba(29,78,216,0.2);
  }

  [data-theme="dark"] .px-card { box-shadow: 6px 6px 0 #3B82F6, 0 0 16px rgba(59,130,246,0.12); border-color: #3B82F6; }
  [data-theme="dark"] .px-card:hover { box-shadow: 10px 10px 0 #3B82F6, 0 0 30px rgba(59,130,246,0.25); border-color: #60A5FA; }
  [data-theme="dark"] .chip { border-color: #3B82F6; box-shadow: 2px 2px 0 #3B82F6; }
  [data-theme="dark"] .chip:hover { background: #3B82F6; }
  [data-theme="dark"] .btt-btn { border-color: #3B82F6; box-shadow: 4px 4px 0 #3B82F6; }
  [data-theme="dark"] .toast { border-color: #3B82F6; box-shadow: 4px 4px 0 #3B82F6; }
  [data-theme="dark"] .kbd-hint { border-color: #3B82F6; box-shadow: 3px 3px 0 #3B82F6; }
  [data-theme="dark"] .kbd-key { border-color: #3B82F6; box-shadow: 2px 2px 0 #3B82F6; }
  [data-theme="dark"] .status-available { border-color: #10B981; box-shadow: 2px 2px 0 #10B981; }
  [data-theme="dark"] .scroll-bar { background: repeating-linear-gradient(90deg,#3B82F6 0,#3B82F6 8px,#38BDF8 8px,#38BDF8 16px,#FCD34D 16px,#FCD34D 24px,#FCA5A5 24px,#FCA5A5 32px); }
  [data-theme="dark"] nav { background: rgba(2,11,24,0.88) !important; backdrop-filter:blur(12px) saturate(1.5); -webkit-backdrop-filter:blur(12px) saturate(1.5); }
  [data-theme="dark"] select, [data-theme="dark"] input, [data-theme="dark"] textarea { background: #0C2A50; color: #F0F9FF; border-color: rgba(59,130,246,0.5); }
  [data-theme="dark"] .mob-menu { background: #020B18; }
  [data-theme="dark"] .mob-menu a { color: #E0F2FE; }
  [data-theme="dark"] .mob-menu a:hover { color: #3B82F6; }
  [data-theme="dark"] .grad { background: linear-gradient(135deg,#60A5FA 0%,#93C5FD 40%,#38BDF8 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  [data-theme="dark"] .nav-link::after { background: linear-gradient(90deg,#3B82F6,#38BDF8); }

  .shimmer-hover {
    position: relative; overflow: hidden;
  }
  .shimmer-hover::before {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    transition: left 0.4s ease;
    pointer-events: none;
    z-index: 1;
  }
  .shimmer-hover:hover::before { left: 150%; }

  .px-corner::before, .px-corner::after {
    content: ''; position: absolute;
    width: 8px; height: 8px;
    background: #1D4ED8;
  }
  .px-corner::before { top: -3px; left: -3px; }
  .px-corner::after  { bottom: -3px; right: -3px; }
`;

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
      background: "#020B18",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      animation: exit ? "loaderFadeOut 0.4s ease both" : "none",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(29,78,216,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(29,78,216,0.05) 1px,transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }}/>
      
      <div style={{ position:"relative", zIndex:1, width:"min(480px,90vw)" }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ display:"inline-block", padding:"1rem 2rem", border:"4px solid #1D4ED8", boxShadow:"6px 6px 0 #1D4ED8", marginBottom:"1rem", background:"#0C2A50" }}>
            <span style={{ fontSize:"1.5rem", color:"#60A5FA", letterSpacing:"4px" }}>AP.EXE</span>
          </div>
          <div style={{ fontSize:"0.75rem", color:"#1D4ED8", letterSpacing:"3px" }}>PORTFOLIO.SYSTEM v2.0.25</div>
        </div>

        <div style={{ background:"linear-gradient(135deg,#020B18 0%,#051225 100%)", border:"3px solid #1D4ED8", boxShadow:"8px 8px 0 #1D4ED8, 0 0 20px rgba(29,78,216,0.15)", padding:"1.2rem", marginBottom:"1.5rem", minHeight:160 }}>
          <div style={{ display:"flex", gap:"0.4rem", marginBottom:"0.8rem" }}>
            {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} style={{ width:10, height:10, background:c }}/>)}
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{ fontSize:"0.82rem", color: i === lines.length-1 ? "#10B981" : "rgba(255,255,255,0.6)", marginBottom:"0.3rem", animation:"termLineIn 0.2s ease both", fontFamily:"'DM Mono', monospace" }}>{line}</div>
          ))}
          {lines.length < BOOT_LINES.length && (
            <span style={{ display:"inline-block", width:8, height:13, background:"#1D4ED8", animation:"termCursor 0.8s step-end infinite" }}/>
          )}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
          <span style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", letterSpacing:"2px" }}>LOADING</span>
          <span style={{ fontSize:"0.75rem", color:"#1D4ED8", fontWeight:600, fontFamily:"'DM Mono', monospace" }}>{progress}%</span>
        </div>
        <div style={{ height:12, background:"rgba(255,255,255,0.05)", border:"2px solid #1D4ED8", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"repeating-linear-gradient(90deg,#1D4ED8 0,#1D4ED8 8px,#3B82F6 8px,#3B82F6 12px)", transition:"width 0.08s linear" }}/>
        </div>
        <div style={{ display:"flex", gap:"0.4rem", marginTop:"1rem", justifyContent:"center" }}>
          {[0,1,2,3].map(i => <div key={i} style={{ width:8, height:8, background:"#1D4ED8", animation:`loaderDotPulse 1.2s ease ${i*0.2}s infinite` }}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── TERMINAL EASTER EGG ─────────────── */
const TERM_COMMANDS = {
  help: { output: [
    { text:"AVAILABLE COMMANDS:", col:"#60A5FA" },
    { text:"  whoami   — who is this guy?",       col:"rgba(255,255,255,0.7)" },
    { text:"  skills   — tech stack",             col:"rgba(255,255,255,0.7)" },
    { text:"  projects — list projects",          col:"rgba(255,255,255,0.7)" },
    { text:"  contact  — get in touch",           col:"rgba(255,255,255,0.7)" },
    { text:"  leetcode — CP stats",               col:"rgba(255,255,255,0.7)" },
    { text:"  hire     — why hire me",            col:"rgba(255,255,255,0.7)" },
    { text:"  socials  — all links",              col:"rgba(255,255,255,0.7)" },
    { text:"  clear    — clear screen",           col:"rgba(255,255,255,0.7)" },
    { text:"  exit     — close terminal",         col:"rgba(255,255,255,0.7)" },
  ]},
  whoami: { output: [
    { text:"ARMAN PHAUGAT", col:"#38BDF8", bold:true },
    { text:"3rd Year B.Tech CSE @ MUJ", col:"rgba(255,255,255,0.7)" },
    { text:"CGPA: 9.05 | DEAN'S EXCELLENCE AWARD", col:"#10B981" },
    { text:"Backend | AI/ML | Competitive Programmer", col:"rgba(255,255,255,0.7)" },
    { text:"Jaipur, Rajasthan, India", col:"rgba(255,255,255,0.4)" },
  ]},
  skills: { output: [
    { text:"=== CORE STACK ===", col:"#1D4ED8" },
    { text:"  Languages : Python | JS | C | C++ | Java", col:"rgba(255,255,255,0.7)" },
    { text:"  Backend   : Node.js | Express | FastAPI",  col:"rgba(255,255,255,0.7)" },
    { text:"  Databases : MySQL | MongoDB | Redis | FAISS", col:"rgba(255,255,255,0.7)" },
    { text:"  AI / ML   : LangChain | HuggingFace | RAG", col:"rgba(255,255,255,0.7)" },
    { text:"  DevOps    : Docker | Git | BullMQ",        col:"rgba(255,255,255,0.7)" },
  ]},
  projects: { output: [
    { text:"=== 10 PROJECTS ===", col:"#1D4ED8" },
    { text:"  01  Real Time Stock Trading Backend [Backend]", col:"rgba(255,255,255,0.7)" },
    { text:"  02  Video Streaming & User Mgmt     [Backend]", col:"rgba(255,255,255,0.7)" },
    { text:"  03  RAG Discord Bot                 [Backend+AI]",  col:"rgba(255,255,255,0.7)" },
    { text:"  04  RAG Bot Website                 [Frontend]",col:"rgba(255,255,255,0.7)" },
    { text:"  05  Cricket Score Predictor         [AI/ML]",  col:"rgba(255,255,255,0.7)" },
    { text:"  06  IPL Win Predictor               [AI/ML]",  col:"rgba(255,255,255,0.7)" },
    { text:"  07  Book Recommender System         [AI/ML]",  col:"rgba(255,255,255,0.7)" },
    { text:"  08  WhatsApp Chat Analyser          [AI/ML]",  col:"rgba(255,255,255,0.7)" },
    { text:"  09  Cuntrex 2D Shooter Game         [Game]",   col:"rgba(255,255,255,0.7)" },
    { text:"  10  SalesForce UI Clone             [Frontend]",col:"rgba(255,255,255,0.7)"},
    { text:"-> scroll to #projects", col:"#10B981" },
  ]},
  contact: { output: [
    { text:"=== CONTACT ===", col:"#1D4ED8" },
    { text:"  Email    : armanphaugat20@gmail.com", col:"rgba(255,255,255,0.7)" },
    { text:"  Phone    : +91-9306115772",           col:"rgba(255,255,255,0.7)" },
    { text:"  LinkedIn : linkedin.com/in/armanphaugat05", col:"#38BDF8" },
    { text:"  GitHub   : github.com/armanphaugat",  col:"#38BDF8" },
    { text:"  LeetCode : leetcode.com/u/armanphaugat20", col:"#FCD34D" },
  ]},
  leetcode: { output: [
    { text:"=== LEETCODE STATS ===", col:"#F59E0B" },
    { text:"  Handle   : armanphaugat20",    col:"rgba(255,255,255,0.7)" },
    { text:"  Problems : 900+",              col:"rgba(255,255,255,0.7)" },
    { text:"  Rank     : TOP 0.3% GLOBALLY", col:"#10B981", bold:true },
    { text:"  Streak   : 120+ days max",     col:"rgba(255,255,255,0.7)" },
    { text:"  BEATS 99.7% OF ALL USERS !!!", col:"#F59E0B", bold:true },
  ]},
  hire: { output: [
    { text:"=== WHY HIRE ARMAN? ===", col:"#10B981" },
    { text:"  [X] Top 0.3% LeetCode — algorithmic thinker", col:"rgba(255,255,255,0.7)" },
    { text:"  [X] Ships real systems (Redis, BullMQ, Docker)", col:"rgba(255,255,255,0.7)" },
    { text:"  [X] Builds AI apps from scratch with LangChain", col:"rgba(255,255,255,0.7)" },
    { text:"  [X] 9.05 CGPA — academically rigorous",         col:"rgba(255,255,255,0.7)" },
    { text:"  [X] Internship @ Indavis Lifesciences",          col:"rgba(255,255,255,0.7)" },
    { text:"  [X] Learning Go + K8s right now",                col:"rgba(255,255,255,0.7)" },
    { text:"  -> armanphaugat20@gmail.com", col:"#38BDF8", bold:true },
  ]},
  socials: { output: [
    { text:"=== SOCIALS ===", col:"#1D4ED8" },
    { text:"  [G] github.com/armanphaugat",            col:"rgba(255,255,255,0.7)" },
    { text:"  [L] linkedin.com/in/armanphaugat05",     col:"rgba(255,255,255,0.7)" },
    { text:"  [LC] leetcode.com/u/armanphaugat20",     col:"#F59E0B" },
    { text:"  [M] armanphaugat20@gmail.com",           col:"rgba(255,255,255,0.7)" },
  ]},
};

function TerminalEasterEgg({ onClose }) {
  const [history, setHistory]   = useState([{ type:"system", lines:[
    { text:"ARMAN'S PORTFOLIO TERMINAL v1.0.0", col:"#38BDF8", bold:true },
    { text:"Type 'help' to see commands.", col:"rgba(255,255,255,0.4)" },
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
      setHistory(p => [...p, { type:"cmd", text:raw }, { type:"output", lines:[{ text:"PERMISSION DENIED. NICE TRY. :)", col:"#EF4444" }] }]);
      return;
    }
    const result = TERM_COMMANDS[cmd];
    if (result) {
      setHistory(p => [...p, { type:"cmd", text:raw }, { type:"output", lines:result.output }]);
    } else {
      setHistory(p => [...p, { type:"cmd", text:raw }, { type:"output", lines:[
        { text:`COMMAND NOT FOUND: ${cmd}`, col:"#EF4444" },
        { text:"type 'help' for commands.", col:"rgba(255,255,255,0.4)" },
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
    <div onClick={e=>{ if(e.target===e.currentTarget){setVisible(false);setTimeout(onClose,380);}}} style={{ position:"fixed", inset:0, zIndex:9990, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div style={{ width:"min(700px,96vw)", maxHeight:"80vh", background:"#000", border:"4px solid #1D4ED8", boxShadow:"8px 8px 0 #1D4ED8", overflow:"hidden", display:"flex", flexDirection:"column", animation: visible?"terminalSlideIn 0.35s ease both":"terminalSlideOut 0.32s ease both", fontFamily:"'DM Mono', monospace" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.7rem 1rem", background:"linear-gradient(135deg,#1D4ED8,#1E40AF)", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
            {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} style={{ width:12,height:12,background:c,border:"2px solid rgba(0,0,0,0.3)" }}/>)}
            <span style={{ fontSize:"0.88rem", color:"rgba(255,255,255,0.9)", marginLeft:"0.5rem", fontFamily:"'Inter', system-ui, sans-serif", fontWeight:600 }}>Terminal</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.7)", fontFamily:"'DM Mono', monospace" }}>ESC to close</span>
            <button onClick={()=>{setVisible(false);setTimeout(onClose,380);}} style={{ background:"none", border:"2px solid rgba(255,255,255,0.4)", cursor:"pointer", color:"#fff", fontSize:"0.8rem", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
        </div>
        <div onClick={()=>inputRef.current?.focus()} style={{ flex:1, overflowY:"auto", padding:"1rem 1.2rem", fontSize:"0.9rem", lineHeight:1.75, cursor:"text" }}>
          {history.map((entry, ei) => (
            <div key={ei} style={{ marginBottom:"0.5rem", animation:"termLineIn 0.2s ease both" }}>
              {entry.type==="cmd" && (
                <div style={{ display:"flex", gap:"0.5rem", color:"rgba(255,255,255,0.95)" }}>
                  <span style={{ color:"#1D4ED8", userSelect:"none" }}>ARMAN@PORTFOLIO</span>
                  <span style={{ color:"rgba(255,255,255,0.3)", userSelect:"none" }}>:~$</span>
                  <span>{entry.text}</span>
                </div>
              )}
              {(entry.type==="output"||entry.type==="system") && (
                <div style={{ paddingLeft:entry.type==="output"?"1rem":0 }}>
                  {entry.lines.map((l,li) => <div key={li} style={{ color:l.col||"rgba(255,255,255,0.82)", fontWeight:l.bold?600:400, whiteSpace:"pre" }}>{l.text}</div>)}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.2rem", borderTop:"2px solid #1D4ED8", background:"rgba(29,78,216,0.05)", flexShrink:0 }}>
          <span style={{ color:"#1D4ED8", fontSize:"0.82rem", userSelect:"none" }}>ARMAN@PORTFOLIO</span>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.82rem", userSelect:"none" }}>:~$</span>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} autoComplete="off" spellCheck={false} placeholder="type command..." style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:"0.9rem", color:"rgba(255,255,255,0.88)", caretColor:"#1D4ED8", fontFamily:"'DM Mono', monospace" }}/>
          <div style={{ width:8, height:14, background:"#1D4ED8", animation:"termCursor 0.9s step-end infinite", flexShrink:0 }}/>
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
    const COLORS = ["#1D4ED8","#0EA5E9","#F59E0B","#EF4444","#10B981"];
    let count = 0;
    const fn = (e) => {
      if (count++ % 3 !== 0) return;
      const el = document.createElement("div");
      const size = 6;
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
        const COLORS = ["#1D4ED8","#0EA5E9","#F59E0B","#EF4444","#10B981","#60A5FA"];
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

  if (!hint) return <div className="kbd-hint" style={{opacity:0.6}}>Press <span className="kbd-key">?</span> for shortcuts · <span className="kbd-key">`</span> for terminal</div>;
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
      <div style={{ background:"var(--paper)", border:"3px solid #1D4ED8", boxShadow:"5px 5px 0 #1D4ED8", padding:"1rem 1.2rem", maxWidth:220, position:"relative" }}>
        <button onClick={()=>setDismissed(true)} style={{ position:"absolute", top:"0.3rem", right:"0.4rem", background:"none", border:"2px solid #1D4ED8", cursor:"pointer", fontSize:"0.82rem", color:"var(--muted)", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        <div className="status-available" style={{marginBottom:"0.6rem"}}>
          <div className="status-ping"/>
          <span style={{fontSize:"0.88rem",color:"#059669",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Available</span>
        </div>
        <div style={{fontSize:"0.85rem",fontWeight:600,color:"var(--ink)",marginBottom:"0.3rem",fontFamily:"'Inter', system-ui, sans-serif",lineHeight:1.6}}>Open to Work</div>
        <div style={{fontSize:"0.88rem",color:"var(--muted)",marginBottom:"0.8rem",lineHeight:1.5}}>Backend · AI/ML · Full Stack</div>
        <a href="mailto:armanphaugat20@gmail.com" style={{ display:"block", textAlign:"center", padding:"0.5rem", background:"#1D4ED8", color:"#fff", border:"none", fontSize:"0.85rem", fontWeight:600, textDecoration:"none", fontFamily:"'DM Sans', system-ui, sans-serif", boxShadow:"3px 3px 0 #1E3A8A" }} onClick={()=>setDismissed(true)}>Let's talk →</a>
      </div>
    </div>
  );
}

/* ─────────────── THEME ACCENT PICKER ─────────────── */
function ThemeAccentPicker() {
  const [open, setOpen] = useState(false);
  const ACCENTS = [
    { key:"blue",   col:"#1D4ED8" },
    { key:"cyan",   col:"#0EA5E9" },
    { key:"green",  col:"#10B981" },
    { key:"rose",   col:"#EF4444" },
  ];
  const pick = (key, col) => {
    document.documentElement.style.setProperty("--v-acc", col);
    showToast(`Theme: ${key}`, "🎨");
    setOpen(false);
  };
  return (
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(o=>!o)} title="Change accent" style={{ width:34, height:34, background:"var(--vPale)", border:"2px solid #1D4ED8", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"2px 2px 0 #1D4ED8" }}>
        <div style={{width:14,height:14,background:"linear-gradient(135deg,#1D4ED8,#0EA5E9)"}}/>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 0.4rem)", right:0, background:"var(--paper)", border:"3px solid #1D4ED8", padding:"0.5rem", boxShadow:"4px 4px 0 #1D4ED8", display:"flex", gap:"0.3rem", zIndex:900 }}>
          {ACCENTS.map(a => (
            <button key={a.key} onClick={()=>pick(a.key,a.col)} style={{ width:24, height:24, background:a.col, border:"2px solid rgba(0,0,0,0.2)", cursor:"pointer" }}/>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────── GITHUB/LEETCODE STATS ─────────────── */
function GitHubStatsCard() {
  const stats = [
    { label:"MAX STREAK", value:"120+", icon:"🔥", col:"#EF4444" },
    { label:"LANGUAGES",  value:"3",    icon:"💻", col:"#1D4ED8" },
    { label:"QUESTIONS",  value:"700+", icon:"⚡", col:"#F59E0B" },
    { label:"BADGES",     value:"9+",   icon:"★",  col:"#10B981" },
  ];
  return (
    <div style={{ background:"linear-gradient(135deg,#020B18 0%,#051225 100%)", border:"3px solid #1D4ED8", boxShadow:"8px 8px 0 #1D4ED8, 0 0 20px rgba(29,78,216,0.15)", padding:"1.5rem", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.2rem"}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116"/></svg>
        <div>
          <div style={{fontSize:"0.95rem",fontWeight:600,color:"#fff"}}>ARMANPHAUGAT</div>
          <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)"}}>leetcode.com/armanphaugat20</div>
        </div>
        <a href="https://leetcode.com/armanphaugat20" target="_blank" rel="noreferrer" style={{ marginLeft:"auto", padding:"0.3rem 0.8rem", background:"rgba(255,255,255,0.08)", color:"#fff", border:"2px solid rgba(255,255,255,0.2)", fontSize:"0.82rem", textDecoration:"none" }}>+ Follow</a>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem",marginBottom:"1rem"}}>
        {stats.map(s => (
          <div key={s.label} style={{background:"rgba(255,255,255,0.04)",border:`2px solid ${s.col}`,padding:"0.75rem",boxShadow:`3px 3px 0 ${s.col}, 0 0 12px ${s.col}22`}}>
            <div style={{fontSize:"1rem",marginBottom:"0.2rem"}}>{s.icon}</div>
            <div style={{fontSize:"1.3rem",fontWeight:600,color:"#fff",fontFamily:"'DM Mono', monospace",lineHeight:1.2}}>{s.value}</div>
            <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1px",marginTop:"0.2rem"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.5)",marginBottom:"0.4rem",fontWeight:500}}>Activity</div>
        <div style={{display:"flex",gap:"2px",flexWrap:"wrap"}}>
          {Array.from({length:52*7}).map((_,i) => {
            const intensity = Math.random();
            const bg = intensity>0.85?"#FFA116":intensity>0.6?"#CC8000":intensity>0.35?"#7A4D00":intensity>0.15?"#3D2600":"rgba(255,255,255,0.03)";
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
      <div style={{ fontSize:"0.88rem", color:"rgba(255,255,255,0.35)", transition:"opacity 0.4s,transform 0.4s", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(8px)", whiteSpace:"nowrap", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
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
    <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", padding:"0.7rem 1rem", background:"rgba(29,78,216,0.06)", border:"2px solid #1D4ED8", marginBottom:"1rem", boxShadow:"3px 3px 0 #1D4ED8" }}>
      <div style={{fontSize:"1.2rem"}}>🕐</div>
      <div>
        <div style={{ fontFamily:"'DM Mono', monospace", fontSize:"1.1rem", fontWeight:500, color:"var(--ink)", letterSpacing:"1px", lineHeight:1.2 }}>{time.display}</div>
        <div style={{ fontSize:"0.85rem", color:"var(--muted)", fontFamily:"'DM Sans', system-ui, sans-serif", marginTop:"0.15rem" }}>{time.day} · IST (UTC+5:30) · Jaipur</div>
      </div>
      <div style={{marginLeft:"auto",textAlign:"right"}}>
        <div style={{ fontSize:"0.82rem", fontWeight:600, fontFamily:"'DM Sans', system-ui, sans-serif", color:time.isWorkHour?"#059669":"#B45309", background:time.isWorkHour?"rgba(16,185,129,0.1)":"rgba(245,158,11,0.1)", border:`2px solid ${time.isWorkHour?"#10B981":"#F59E0B"}`, padding:"0.2rem 0.6rem", boxShadow:`2px 2px 0 ${time.isWorkHour?"#10B981":"#F59E0B"}` }}>
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
    <div style={{background:"var(--paper)",border:"3px solid #1D4ED8",padding:"1.5rem",boxShadow:"5px 5px 0 #1D4ED8"}}>
      <LiveISTClock />
      <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"1rem"}}>
        <span style={{fontSize:"1rem"}}>📅</span>
        <div>
          <div style={{fontSize:"0.75rem",fontWeight:600,color:"#64748B",fontFamily:"'Inter', system-ui, sans-serif",textTransform:"uppercase",letterSpacing:"0.5px"}}>Availability</div>
          <div style={{fontSize:"0.85rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>IST (UTC+5:30)</div>
        </div>
        <div className="status-available" style={{marginLeft:"auto"}}>
          <div className="status-ping"/>
          <span style={{fontSize:"0.88rem",color:"#059669",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Open</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"0.3rem"}}>
        {days.map(d => (
          <div key={d} style={{textAlign:"center"}}>
            <div style={{fontSize:"0.7rem",color:"var(--muted)",fontFamily:"'DM Mono', monospace",marginBottom:"0.3rem",fontWeight:500}}>{d}</div>
            {slots[d].length>0?slots[d].map(t=>(
              <div key={t} style={{fontSize:"0.78rem",padding:"0.2rem",marginBottom:"0.2rem",background:"rgba(29,78,216,0.1)",color:"#1D4ED8",fontFamily:"'DM Mono', monospace",border:"1px solid #1D4ED8",fontWeight:500}}>{t}</div>
            )):(
              <div style={{fontSize:"0.8rem",color:"var(--muted)",opacity:0.4,fontFamily:"'DM Mono', monospace"}}>--</div>
            )}
          </div>
        ))}
      </div>
      <a href="mailto:armanphaugat20@gmail.com?subject=Meeting Request" style={{ display:"block", textAlign:"center", marginTop:"1rem", padding:"0.55rem", background:"rgba(29,78,216,0.1)", border:"2px solid #1D4ED8", fontSize:"0.88rem", fontWeight:600, color:"#1D4ED8", textDecoration:"none", boxShadow:"3px 3px 0 #1D4ED8", fontFamily:"'DM Sans', system-ui, sans-serif", transition:"all 0.1s" }}
        onMouseEnter={e=>{e.currentTarget.style.background="#1D4ED8";e.currentTarget.style.color="#fff";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(29,78,216,0.1)";e.currentTarget.style.color="#1D4ED8";}}
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
          <polygon key={r} points={skills.map((_,i)=>{const p=polarToXY(i,r*R);return `${p.x},${p.y}`;}).join(" ")} fill="none" stroke="rgba(29,78,216,0.2)" strokeWidth="1" strokeDasharray="4,4"/>
        ))}
        {skills.map((_,i)=>{const p=polarToXY(i,R);return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(29,78,216,0.15)" strokeWidth="1"/>;} )}
        <polygon points={poly} fill="rgba(29,78,216,0.15)" stroke="#1D4ED8" strokeWidth="2"/>
        {dataPoints.map((p,i)=><rect key={i} x={p.x-4} y={p.y-4} width={8} height={8} fill="#1D4ED8" stroke="#fff" strokeWidth="2"/>)}
        {skills.map((s,i)=>{const p=polarToXY(i,R+22);return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="var(--ink)" fontSize="10" fontFamily="'DM Sans', system-ui, sans-serif" fontWeight="500">{s.label}</text>;})}
        {skills.map((s,i)=>{const p=polarToXY(i,(s.val/100)*R-14);return <text key={`v${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="#1D4ED8" fontSize="9" fontFamily="'DM Mono', monospace" fontWeight="500">{s.val}%</text>;})}
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
  const cats=[{label:"Backend",count:catCounts["Backend"],col:"#1D4ED8"},{label:"AI/ML",count:catCounts["AI/ML"],col:"#0EA5E9"},{label:"Frontend",count:catCounts["Frontend"],col:"#10B981"},{label:"Game",count:catCounts["Game"],col:"#F59E0B"}];
  const total=cats.reduce((s,c)=>s+c.count,0);
  return (
    <div style={{marginBottom:"2rem"}} className="rv">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.6rem"}}>
        <span style={{fontSize:"0.82rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:500}}>Category breakdown</span>
        <span style={{fontSize:"0.82rem",color:"var(--muted)",fontFamily:"'DM Mono', monospace"}}>{total} total</span>
      </div>
      <div style={{height:10,overflow:"hidden",display:"flex",gap:2,border:"2px solid #1D4ED8",boxShadow:"3px 3px 0 #1D4ED8"}}>
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
function Cursor() {
  const dot=useRef(null); const trail=useRef(null);
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
      <div ref={dot} style={{position:"fixed",width:8,height:8,background:"#1D4ED8",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9999}}/>
      <div ref={trail} style={{position:"fixed",width:20,height:20,border:"2px solid #1D4ED8",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9998,opacity:.5}}/>
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
        <button onClick={()=>setDark(d=>!d)} style={{ background:"none", border:"3px solid #1D4ED8", padding:"0.6rem 1.4rem", cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", gap:"0.5rem", fontFamily:"'DM Sans', system-ui, sans-serif", fontWeight:600, color:"var(--ink)", boxShadow:"3px 3px 0 #1D4ED8" }}>
          <span key={dark?"m":"s"} style={{animation:"darkToggle 0.3s ease both"}}>{dark?"☀️":"🌙"}</span>
          {dark?"Light mode":"Dark mode"}
        </button>
      </div>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:600, display:"flex", alignItems:"center", justifyContent:"space-between", padding:scrolled||menuOpen?"0.8rem 2rem":"1.2rem 2rem", background:scrolled||menuOpen?"var(--bg)":"transparent", borderBottom:scrolled?"3px solid #1D4ED8":"3px solid transparent", boxShadow:scrolled?"0 3px 0 #1D4ED8":"none", transition:"all 0.25s ease", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
        <div style={{display:"flex",alignItems:"center",gap:"0.7rem"}}>
          <div style={{width:32,height:32,background:"#1D4ED8",border:"2px solid #1E3A8A",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"3px 3px 0 #1E3A8A"}}>
            <span style={{color:"#fff",fontSize:"0.85rem",fontWeight:700,fontFamily:"'Inter', system-ui, sans-serif"}}>AP</span>
          </div>
          <span style={{fontSize:"0.95rem",color:"#1D4ED8",fontWeight:600}}>arman<span style={{color:C.muted}}>.exe</span></span>
        </div>
        <div className="hide-mob" style={{display:"flex",gap:"1.8rem"}}>
          {links.map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{color:C.inkMid,fontSize:"0.95rem",fontWeight:500,letterSpacing:"0.3px"}}
              onMouseEnter={e=>e.currentTarget.style.color="#1D4ED8"}
              onMouseLeave={e=>e.currentTarget.style.color=C.inkMid}
            >{l}</a>
          ))}
        </div>
        <div className="hide-mob" style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
          <ThemeAccentPicker/>
          <button onClick={()=>setDark(d=>!d)} title="Toggle theme" style={{ width:34, height:34, background:"var(--vPale)", border:"2px solid #1D4ED8", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"2px 2px 0 #1D4ED8", transition:"all 0.1s" }}
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
          <a href="https://leetcode.com/u/armanphaugat20" target="_blank" rel="noreferrer" style={{ width:34,height:34,background:"#FFA116",border:"2px solid #cc8100",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",boxShadow:"2px 2px 0 #cc8100",transition:"all 0.1s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translate(-1px,-1px)"}
            onMouseLeave={e=>{e.currentTarget.style.transform="";}}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
          </a>
          <a href="mailto:armanphaugat20@gmail.com" style={{ padding:"0.55rem 1.1rem", background:"#1D4ED8", color:"#fff", border:"2px solid #1E3A8A", fontSize:"0.92rem", fontWeight:600, textDecoration:"none", boxShadow:"3px 3px 0 #1E3A8A", transition:"all 0.1s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translate(-1px,-1px)";e.currentTarget.style.boxShadow="4px 4px 0 #1E3A8A";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="3px 3px 0 #1E3A8A";}}
          >Hire me ▶</a>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" style={{ padding:"0.55rem 1.1rem", background:"transparent", color:"#1D4ED8", border:"2px solid #1D4ED8", fontSize:"0.92rem", fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:"0.4rem", animation:"resumePulse 2.5s ease-in-out infinite", boxShadow:"3px 3px 0 #1D4ED8", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.background="#1D4ED8";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#1D4ED8";}}
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
    <div ref={ref} style={{ padding:"0 2rem 0 0", marginRight:"2rem", borderRight:"3px solid rgba(29,78,216,0.25)", marginBottom:"1rem" }}>
      <div style={{ fontSize:"2rem", fontWeight:500, color:"var(--ink)", letterSpacing:"-1px", fontFamily:"'DM Mono', monospace", lineHeight:1 }}>{prefix}{count}{sfx}</div>
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
            <div style={{ position:"absolute", right:"calc(100% + 0.5rem)", background:"var(--paper)", border:"2px solid #1D4ED8", borderRadius:0, padding:"0.15rem 0.5rem", fontSize:"0.8rem", fontFamily:"'DM Sans', system-ui, sans-serif", color:"#1D4ED8", whiteSpace:"nowrap", fontWeight:600, animation:"backTopIn 0.2s ease both", boxShadow:"2px 2px 0 #1D4ED8" }}>{SECTION_LABELS[i]}</div>
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
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    let animId;
    const resize=()=>{ canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    resize();
    window.addEventListener("resize",resize);
    const COLORS=["#1D4ED8","#60A5FA","#0EA5E9","#F59E0B","#EF4444","#10B981"];
    const pts=Array.from({length:60},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:Math.random()*2+1,col:COLORS[Math.floor(Math.random()*COLORS.length)]}));
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
        ctx.fillStyle=p.col+"88";
        ctx.fillRect(Math.round(p.x),Math.round(p.y),Math.round(p.r*2),Math.round(p.r*2));
      });
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<100){
            ctx.beginPath();
            ctx.moveTo(pts[i].x,pts[i].y);
            ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=`rgba(29,78,216,${0.08*(1-dist/100)})`;
            ctx.lineWidth=0.5;
            ctx.stroke();
          }
        }
      }
      animId=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.5}}/>;
}

function PixelAvatar() { return null; }

/* ─────────────── PIXEL RAIN ─────────────── */
function PixelRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const COLS_COLORS = ["#1D4ED8","#3B82F6","#0EA5E9","#38BDF8","#10B981","#F59E0B"];
    const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ".split("");
    const CELL  = 16;
    const cols  = Math.floor(1920 / CELL);
    const drops = Array.from({ length: cols }, () => ({
      y: -Math.random() * 60, speed: 0.18 + Math.random() * 0.28,
      col: COLS_COLORS[Math.floor(Math.random() * COLS_COLORS.length)],
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      len: 8 + Math.floor(Math.random() * 16), bright: Math.random() > 0.92,
    }));
    let frame = 0;
    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(2, 11, 24, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((d, i) => {
        const x = i * CELL;
        if (x > canvas.width) return;
        for (let t = 0; t < d.len; t++) {
          const ty = (d.y - t) * CELL;
          if (ty < 0 || ty > canvas.height) continue;
          const alpha = (1 - t / d.len) * (t === 0 ? 1 : 0.6 - t * 0.04);
          const col = t === 0 ? (d.bright ? "#ffffff" : d.col + "ff") : d.col + Math.floor(alpha * 180).toString(16).padStart(2,"0");
          ctx.fillStyle = col;
          ctx.font = `bold ${CELL - 2}px 'DM Mono', monospace`;
          ctx.fillText(d.char, x + 2, ty);
        }
        d.y += d.speed;
        if (frame % 8 === 0) d.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        if (d.y * CELL > canvas.height + d.len * CELL) {
          d.y=-d.len-Math.random()*30; d.speed=0.18+Math.random()*0.28;
          d.col=COLS_COLORS[Math.floor(Math.random()*COLS_COLORS.length)];
          d.len=8+Math.floor(Math.random()*16); d.bright=Math.random()>0.92;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.45, pointerEvents:"none", zIndex:0 }}/>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
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

  return (
    <section id="hero" className="hero-sec" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"9rem 4rem 5rem", position:"relative", overflow:"hidden", background:"var(--bg)", backgroundImage:"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(29,78,216,0.1) 0%, transparent 70%)" }}>
      <div className="float-bg" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(29,78,216,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(29,78,216,0.05) 1px,transparent 1px)",backgroundSize:"48px 48px",zIndex:0}}/>
        {[{Icon:Zap,top:"12%",left:"5%",sz:32,anim:"iconDrift 7s ease-in-out infinite",delay:"0s",col:"#1D4ED8"},{Icon:Code2,top:"25%",left:"90%",sz:28,anim:"iconDriftB 9s ease-in-out infinite",delay:"1.2s",col:"#0EA5E9"},{Icon:Database,top:"55%",left:"88%",sz:26,anim:"iconDrift 11s ease-in-out infinite",delay:"2.1s",col:"#F59E0B"},{Icon:Server,top:"70%",left:"6%",sz:30,anim:"iconDriftC 8s ease-in-out infinite",delay:"0.7s",col:"#EF4444"},{Icon:BrainCircuit,top:"88%",left:"40%",sz:28,anim:"iconDrift 13s ease-in-out infinite",delay:"4.1s",col:"#10B981"},{Icon:Terminal,top:"15%",left:"74%",sz:24,anim:"iconDriftC 10s ease-in-out infinite",delay:"2.8s",col:"#1D4ED8"},{Icon:Bot,top:"5%",left:"48%",sz:28,anim:"iconDriftC 8s ease-in-out infinite",delay:"3.0s",col:"#0EA5E9"}].map(({Icon,top,left,sz,anim,delay,col},i)=>(
          <div key={i} style={{position:"absolute",top,left,opacity:0.12,animation:anim,animationDelay:delay,color:col}}><Icon size={sz} strokeWidth={1.5}/></div>
        ))}
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",width:"100%",position:"relative",zIndex:1}}>
        <div className="rv" style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.4rem",flexWrap:"wrap"}}>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",color:"#1D4ED8",letterSpacing:"1px",display:"flex",alignItems:"center",gap:"0.8rem",fontWeight:500}}>
            <span style={{display:"inline-block",width:28,height:4,background:"linear-gradient(90deg,#1D4ED8,#0EA5E9)"}}/>
            3rd Year CSE · MUJ · 2023–2027
          </div>
          <div className="status-available">
            <div className="status-ping"/>
            <span style={{fontSize:"0.95rem",color:"#059669",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Open to work</span>
          </div>
        </div>

        <h1 className="rv d1" style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"clamp(2.2rem,5.5vw,5rem)",fontWeight:700,lineHeight:1.15,marginBottom:"0.9rem",letterSpacing:"0px",color:"var(--ink)"}}>
          ARMAN<br/>
          <span className="grad" style={{display:"inline-block"}}>PHAUGAT</span>
        </h1>

        <div className="rv d2" style={{marginBottom:"1.5rem",height:"2.2rem",display:"flex",alignItems:"center"}}>
          <span style={{fontSize:"1.5rem",color:"var(--muted)",fontFamily:"'DM Mono', monospace",letterSpacing:"0.5px",fontWeight:400}}>
            › {typed}<span style={{animation:"blink 1s infinite",display:"inline-block",color:"#1D4ED8"}}>_</span>
          </span>
        </div>

        <p className="rv d3" style={{fontSize:"1.05rem",color:"var(--muted)",maxWidth:540,lineHeight:1.85,marginBottom:"2.5rem",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:400}}>
          Building fast backends, shipping ML models, crafting AI-powered apps.<br/>
          Top <strong style={{color:"#1D4ED8",fontWeight:600}}>0.3% LeetCode</strong> · <strong style={{color:"#0EA5E9",fontWeight:600}}>9.05 CGPA</strong> · <strong style={{color:"#F59E0B",fontWeight:600}}>900+ DSA</strong> solved.
        </p>

        <div className="rv d4 hero-ctarow" style={{display:"flex",gap:"0.8rem",flexWrap:"wrap",marginBottom:"3.5rem"}}>
          {[
            {href:"#projects",label:"View Projects →",bg:"#1D4ED8",color:"#fff",shadow:"#1E3A8A"},
            {href:"#contact",label:"Let's Talk",bg:"transparent",color:"var(--ink)",shadow:"#1D4ED8",bord:"#1D4ED8"},
            {href:"https://github.com/armanphaugat",label:"GitHub",bg:"#1e293b",color:"#fff",shadow:"#0f172a"},
            {href:"https://www.linkedin.com/in/armanphaugat05/",label:"LinkedIn",bg:"#0A66C2",color:"#fff",shadow:"#004182"},
            {href:"https://leetcode.com/u/armanphaugat20",label:"LeetCode",bg:"#FFA116",color:"#fff",shadow:"#cc8100"},
          ].map(({href,label,bg,color,shadow,bord})=>(
            <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" className="px-btn" style={{
              padding:"0.75rem 1.4rem", background:bg, color, fontSize:"0.95rem", fontWeight:600, textDecoration:"none",
              fontFamily:"'DM Sans', system-ui, sans-serif", border:`2px solid ${bord||shadow}`,
              boxShadow:`4px 4px 0 ${shadow}`, display:"inline-flex", alignItems:"center", gap:"0.4rem",
            }}>{label}</a>
          ))}
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" className="px-btn" style={{ padding:"0.8rem 1.5rem", background:"transparent", color:"#1D4ED8", border:"2px solid #1D4ED8", fontSize:"0.92rem", fontWeight:600, textDecoration:"none", fontFamily:"'DM Sans', system-ui, sans-serif", boxShadow:"4px 4px 0 #1D4ED8", display:"inline-flex", alignItems:"center", gap:"0.4rem", animation:"resumePulse 2.5s ease-in-out infinite" }}>
            <Download size={12} strokeWidth={2.5}/>Resume
          </a>
        </div>

        <div className="rv" style={{display:"flex",gap:"0",borderTop:"2px solid rgba(29,78,216,0.2)",paddingTop:"2rem",marginTop:"0.5rem",flexWrap:"wrap"}}>
          <AnimatedStat value="9.05" label="CGPA — Dean's Award"/>
          <AnimatedStat value="900+" label="DSA Problems"/>
          <AnimatedStat value="10+" label="Projects Built"/>
          <div style={{padding:"0 2rem 0 0",marginRight:"2rem",marginBottom:"1rem"}}>
            <div style={{fontSize:"2rem",fontWeight:500,color:"var(--ink)",fontFamily:"'DM Mono', monospace",lineHeight:1}}>TOP 0.3%</div>
            <div style={{fontSize:"0.82rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1.5px",marginTop:"0.25rem",lineHeight:1.4,fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:500}}>LeetCode Global</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MARQUEE ─────────────── */
function Marquee() {
  const items=["Node.js","Redis","MySQL","BullMQ","Python","FastAPI","LangChain","FAISS","MongoDB","Docker","XGBoost","Streamlit","Pygame","React","Scikit-learn","RAG","HuggingFace","JWT","Pandas","Groq","System Design","ACID"];
  const doubled=[...items,...items];
  const COLS=["#1D4ED8","#0EA5E9","#F59E0B","#EF4444","#10B981","#3B82F6"];
  return (
    <div style={{background:"linear-gradient(135deg,#020B18 0%,#051225 50%,#020B18 100%)",padding:"0.9rem 0",overflow:"hidden",borderTop:"3px solid #1D4ED8",borderBottom:"3px solid #1D4ED8",boxShadow:"0 4px 20px rgba(29,78,216,0.2),0 -4px 20px rgba(29,78,216,0.2)"}}>
      <div style={{display:"flex",animation:"marquee 25s linear infinite",width:"max-content"}}>
        {doubled.map((item,i)=>(
          <span key={i} style={{color:COLS[i%COLS.length],fontSize:"0.95rem",letterSpacing:"1px",padding:"0 1.8rem",display:"flex",alignItems:"center",gap:"1.5rem",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:500}}>
            {item}<span style={{color:"rgba(29,78,216,0.6)",fontSize:"0.7rem"}}>■</span>
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
  const COLORS_CYCLE=["#1D4ED8","#0EA5E9","#F59E0B","#EF4444","#10B981"];
  return (
    <section id="about" style={{padding:"8rem 4rem",background:"var(--bg2)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(29,78,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(29,78,216,0.04) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}}/>
      <div style={{maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start",position:"relative",zIndex:1}} className="grid2">
        <div>
          <div className="rv" style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.8rem",fontWeight:600}}>
            <span style={{width:20,height:4,background:"#1D4ED8",display:"inline-block",boxShadow:"2px 2px 0 #1E3A8A"}}/>ABOUT ME
          </div>
          <h2 className="rv d1" style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"clamp(1.2rem,2.5vw,2rem)",fontWeight:700,lineHeight:1.4,marginBottom:"1.5rem",color:"var(--ink)"}}>
            PASSIONATE ABOUT<br/><span className="grad">SYSTEMS & SCALE</span>
          </h2>
          <div className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",lineHeight:2,fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:400}}>
            <p style={{marginBottom:"1rem"}}>I'm a <strong style={{color:"var(--ink)",fontWeight:600}}>3rd-year CS student</strong> at Manipal University Jaipur who builds things that work fast, scale cleanly, and solve real problems.</p>
            <p style={{marginBottom:"1rem"}}>Core focus: backend engineering — <strong style={{color:"#1D4ED8",fontWeight:600}}>Node.js, Redis, BullMQ, MySQL</strong> — plus AI apps with <strong style={{color:"#0EA5E9",fontWeight:600}}>LangChain, FAISS, and Groq</strong>. ML models with Scikit-learn and XGBoost.</p>
            <p>I solve 900+ DSA problems because I genuinely love finding elegant solutions to hard problems.</p>
          </div>
          <div className="rv d3" style={{display:"flex",gap:"0.5rem",marginTop:"1.5rem",flexWrap:"wrap"}}>
            {["Open to Internships","Available for Projects","LeetCode Top 0.3%"].map((t,i)=>(
              <span key={t} style={{padding:"0.35rem 0.9rem",border:`2px solid ${COLORS_CYCLE[i]}`,fontSize:"0.88rem",color:COLORS_CYCLE[i],fontWeight:600,background:`${COLORS_CYCLE[i]}12`,fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:`2px 2px 0 ${COLORS_CYCLE[i]}`}}>{t}</span>
            ))}
          </div>
        </div>

        <div ref={cardRef} className="rv d2 px-card" style={{background:"var(--paper)",padding:"2rem",willChange:"transform",transition:"transform 0.15s ease"}}>
          {[
            ["🎓","Education","B.Tech CSE · 3rd Year","MUJ · 2023–2027","#1D4ED8"],
            ["📍","Location","Jaipur, Rajasthan","India","#0EA5E9"],
            ["🏅","CGPA","9.05 / 10","Dean's Excellence Award","#F59E0B"],
            ["⚡","Focus","Backend · AI/ML","Node.js · Python · Sys Design","#EF4444"],
            ["🧩","Competitive","LeetCode Top 0.3%","900+ problems solved","#10B981"],
            ["🚀","Hackathon","MUJHackX Round 2","1300+ participants","#1D4ED8"],
          ].map(([ico,label,val,sub,col],i)=>(
            <div key={label} style={{display:"flex",gap:"0.9rem",alignItems:"flex-start",padding:"0.8rem 0",borderBottom:i<5?`1px solid rgba(29,78,216,0.08)`:"none"}}>
              <div style={{width:32,height:32,background:`${col}18`,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",flexShrink:0,boxShadow:`2px 2px 0 ${col}`}}>{ico}</div>
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
function Experience() {
  return (
    <section id="experience" style={{padding:"8rem 4rem",background:"var(--bg)"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:"#1D4ED8",display:"inline-block"}}/>EXPERIENCE
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"clamp(1.1rem,2.5vw,1.8rem)",fontWeight:400,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.4,letterSpacing:"1px"}}>
          WHERE I'VE <span className="grad">WORKED</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"2.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Real-world experience shipping under professional deadlines.</p>

        <div className="rv d3 px-card" style={{background:"var(--paper)",padding:"2rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"1rem",marginBottom:"1.2rem"}}>
            <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
              <div style={{width:48,height:48,background:"#1e293b",border:"2px solid #1D4ED8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0,boxShadow:"3px 3px 0 #1D4ED8"}}>🏥</div>
              <div>
                <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1.05rem",fontWeight:600,color:"var(--ink)"}}>Web Dev Intern</div>
                <div style={{fontSize:"0.92rem",color:"#1D4ED8",fontWeight:500,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Indavis Lifesciences, Haridwar</div>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.88rem",color:"#1D4ED8",background:"var(--vPale)",padding:"0.3rem 0.8rem",display:"inline-block",border:"2px solid #1D4ED8",boxShadow:"2px 2px 0 #1D4ED8",fontWeight:500}}>Jun–Jul 2025</span>
              <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.85rem",color:"var(--inkMid)",marginTop:"0.3rem"}}>Full-time · On-site</div>
            </div>
          </div>
          {["Maintained and updated the company website ensuring smooth performance and content accuracy.","Collaborated with cross-functional teams to align website updates with brand guidelines and business objectives."].map((b,i)=>(
            <div key={i} style={{display:"flex",gap:"0.6rem",fontSize:"0.97rem",color:"var(--muted)",marginBottom:"0.55rem",lineHeight:1.75,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
              <span style={{color:"#1D4ED8",flexShrink:0}}>▸</span>{b}
            </div>
          ))}
          <div style={{marginTop:"1.2rem",display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
            {["Website Maintenance","Team Collaboration","Content Mgmt","Brand Alignment"].map(t=><span key={t} className="chip">{t}</span>)}
          </div>
        </div>

        <div className="rv d4 otw-banner" style={{marginTop:"1.5rem",background:"linear-gradient(135deg,#020B18 0%,#051225 100%)",border:"3px solid #1D4ED8",padding:"2rem",boxShadow:"8px 8px 0 #1D4ED8",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem"}}>
          <div>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.6)",letterSpacing:"1px",marginBottom:"0.5rem",fontWeight:500}}>Currently seeking</div>
            <div style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",fontWeight:600,color:"#fff",marginBottom:"0.5rem",lineHeight:1.6,letterSpacing:"0.5px",textTransform:"uppercase"}}>Summer Internship 2026</div>
            <div style={{fontSize:"1rem",color:"rgba(255,255,255,0.8)",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:400}}>Backend · AI/ML · Full Stack</div>
          </div>
          <a href="mailto:armanphaugat20@gmail.com" className="px-btn" style={{padding:"0.8rem 1.5rem",background:"rgba(255,255,255,0.1)",color:"#fff",border:"2px solid rgba(255,255,255,0.3)",textDecoration:"none",fontWeight:600,fontSize:"0.95rem",whiteSpace:"nowrap",fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:"3px 3px 0 rgba(255,255,255,0.2)"}}>Reach out →</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── RESUME ─────────────── */
function Resume() {
  return (
    <section id="resume" style={{padding:"8rem 4rem",background:"var(--bg)"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:"#1D4ED8",display:"inline-block"}}/>RESUME
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1.5rem",marginBottom:"3rem"}}>
          <h2 className="rv d1" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"clamp(1rem,2vw,1.5rem)",fontWeight:400,color:"var(--ink)",lineHeight:1.5}}>
            CURRICULUM <span className="grad">VITAE</span>
          </h2>
          <a href="/ARMANRESUME.pdf" download="ARMANRESUME.pdf" className="rv d2 px-btn" style={{padding:"0.8rem 1.5rem",background:"#1D4ED8",color:"#fff",border:"2px solid #1E3A8A",textDecoration:"none",fontSize:"0.95rem",fontWeight:600,display:"flex",alignItems:"center",gap:"0.5rem",boxShadow:"4px 4px 0 #1E3A8A",animation:"resumePulse 2.5s ease-in-out infinite",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            <Download size={14} strokeWidth={2.5}/>Download PDF
          </a>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",alignItems:"start"}} className="grid2">
          <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
            <div className="rv px-card shimmer-hover" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1rem"}}>
                <div style={{width:28,height:28,background:"var(--vPale)",border:"2px solid #1D4ED8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:"2px 2px 0 #1D4ED8"}}>👤</div>
                <div style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",fontWeight:600,color:"var(--ink)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Summary</div>
              </div>
              <p style={{fontSize:"0.97rem",color:"var(--muted)",lineHeight:1.9,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
                Passionate <strong style={{color:"var(--ink)",fontWeight:600}}>Backend & AI/ML Engineer</strong> in my 3rd year of B.Tech CSE at MUJ, maintaining a <strong style={{color:"#1D4ED8",fontWeight:600}}>9.05 CGPA</strong> with the Dean's Excellence Award. Builds high-performance systems with <strong style={{color:"#1D4ED8",fontWeight:600}}>Node.js, Redis, and MySQL</strong>. Ranked in the <strong style={{color:"#0EA5E9",fontWeight:600}}>top 0.3% globally on LeetCode</strong> with 900+ problems solved.
              </p>
              <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginTop:"1rem"}}>
                {["Backend","AI/ML","Open to Work"].map((t,i)=>(
                  <span key={t} style={{padding:"0.25rem 0.7rem",background:`${["#1D4ED8","#0EA5E9","#10B981"][i]}18`,border:`2px solid ${["#1D4ED8","#0EA5E9","#10B981"][i]}`,fontSize:"0.88rem",color:["#1D4ED8","#0EA5E9","#10B981"][i],fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{t}</span>
                ))}
              </div>
            </div>

            <div className="rv px-card shimmer-hover" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.2rem"}}>
                <div style={{width:38,height:38,background:"linear-gradient(135deg,#1D4ED8,#0EA5E9)",border:"2px solid #1E3A8A",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"3px 3px 0 #1E3A8A"}}>
                  <span style={{color:"#fff",fontSize:"0.85rem",fontWeight:700,fontFamily:"'Inter', system-ui, sans-serif"}}>AP</span>
                </div>
                <div>
                  <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)"}}>Arman Phaugat</div>
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
                <div key={label} style={{display:"flex",gap:"0.7rem",alignItems:"center",padding:"0.45rem 0",borderBottom:"1px solid rgba(29,78,216,0.06)"}}>
                  <span style={{fontSize:"0.9rem",flexShrink:0}}>{icon}</span>
                  {href?<a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{fontSize:"0.92rem",color:"#1D4ED8",textDecoration:"none",fontFamily:"'DM Sans', system-ui, sans-serif",wordBreak:"break-all",fontWeight:500}}>{label}</a>:<span style={{fontSize:"0.92rem",color:"var(--muted)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{label}</span>}
                </div>
              ))}
            </div>

            <div className="rv d1 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:"rgba(245,158,11,0.15)",border:"2px solid #F59E0B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:"2px 2px 0 #F59E0B"}}>🎓</div>
                <div style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",fontWeight:600,color:"var(--ink)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Education</div>
              </div>
              <div style={{borderLeft:"3px solid #1D4ED8",paddingLeft:"1rem"}}>
                <div style={{fontSize:"1rem",fontWeight:600,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>B.Tech in Computer Science</div>
                <div style={{fontSize:"0.95rem",color:"#1D4ED8",fontWeight:500,marginTop:"0.2rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Manipal University Jaipur</div>
                <div style={{fontFamily:"'DM Mono', monospace",fontSize:"0.88rem",color:"var(--muted)",marginTop:"0.2rem"}}>2023–2027 · Jaipur</div>
                <div style={{marginTop:"0.6rem",display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
                  <span style={{padding:"0.3rem 0.75rem",background:"var(--vPale)",color:"#1D4ED8",fontSize:"0.88rem",fontWeight:600,border:"2px solid #1D4ED8",fontFamily:"'DM Mono', monospace",boxShadow:"2px 2px 0 #1D4ED8"}}>9.05 CGPA</span>
                  <span style={{padding:"0.3rem 0.75rem",background:"rgba(245,158,11,0.1)",color:"#92400E",fontSize:"0.88rem",fontWeight:600,border:"2px solid #F59E0B",fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:"2px 2px 0 #F59E0B"}}>Dean's Award</span>
                </div>
              </div>
            </div>

            <div className="rv d2 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:"rgba(245,158,11,0.15)",border:"2px solid #F59E0B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:"2px 2px 0 #F59E0B"}}>⭐</div>
                <div style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",fontWeight:600,color:"var(--ink)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Achievements</div>
              </div>
              {[
                {icon:"🏅",text:"Dean's Excellence Award — 9.0+ CGPA multiple semesters",col:"#F59E0B"},
                {icon:"⚡",text:"LeetCode Top 0.3% — Global rank, beats 99.7%",col:"#1D4ED8"},
                {icon:"🚀",text:"MUJHackX Round 2 — Top among 1300+ participants",col:"#10B981"},
                {icon:"💡",text:"900+ DSA problems solved across platforms",col:"#0EA5E9"},
              ].map(({icon,text,col})=>(
                <div key={text} style={{display:"flex",gap:"0.7rem",alignItems:"flex-start",padding:"0.5rem 0",borderBottom:"1px solid rgba(29,78,216,0.06)"}}>
                  <span style={{fontSize:"0.9rem",flexShrink:0}}>{icon}</span>
                  <span style={{fontSize:"0.95rem",color:"var(--muted)",lineHeight:1.65,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{text}</span>
                </div>
              ))}
            </div>

            <div className="rv d3 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:"rgba(14,165,233,0.15)",border:"2px solid #0EA5E9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:"2px 2px 0 #0EA5E9"}}>📜</div>
                <div style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",fontWeight:600,color:"var(--ink)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Certifications</div>
              </div>
              {[
                {org:"TLE Eliminators",icon:"🥋",col:"#EF4444",name:"CP Level 1, 2 & 3",issued:"Dec 2023",skills:["C++","DSA","Algorithms"],badge:"3 certs"},
                {org:"NPTEL",icon:"🎓",col:"#2B6CB0",name:"Design & Analysis of Algorithms",issued:"Jan 2025",skills:["C++","Algorithm Design"],badge:"Verified"},
                {org:"Red Hat",icon:"🎩",col:"#C53030",name:"Sysadmin I & II",issued:"Jan 2025",skills:["Linux","RHEL","Shell"],badge:"2 certs"},
                {org:"Coursera",icon:"📡",col:"#2D3748",name:"RAG Course",issued:"2024",skills:["LangChain","FAISS","RAG"],badge:"Verified"},
                {org:"GeeksforGeeks",icon:"💚",col:"#276749",name:"OOP with Java",issued:"Aug 2024",skills:["Java","OOP"],badge:"Verified"},
                {org:"Oracle",icon:"🔴",col:"#C05621",name:"Database Design",issued:"Aug 2024",skills:["SQL","DB Design"],badge:"2 certs"},
              ].map(({org,icon,col,name,issued,skills,badge},i)=>(
                <div key={name} style={{display:"flex",gap:"0.8rem",alignItems:"flex-start",padding:"0.8rem 0",borderBottom:i<5?"1px solid rgba(29,78,216,0.06)":"none"}}>
                  <div style={{width:34,height:34,background:`${col}15`,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0,boxShadow:`2px 2px 0 ${col}`}}>{icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.4rem",flexWrap:"wrap"}}>
                      <div>
                        <div style={{fontSize:"0.95rem",fontWeight:600,color:"var(--ink)",lineHeight:1.3,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</div>
                        <div style={{fontSize:"0.88rem",color:col,fontWeight:500,marginTop:"0.1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{org}</div>
                      </div>
                      <span style={{fontSize:"0.8rem",padding:"0.15rem 0.4rem",background:`${col}15`,color:col,fontWeight:600,fontFamily:"'DM Mono', monospace",flexShrink:0,whiteSpace:"nowrap",border:`1px solid ${col}`,boxShadow:`1px 1px 0 ${col}`}}>{badge}</span>
                    </div>
                    <div style={{fontFamily:"'DM Mono', monospace",fontSize:"0.82rem",color:"var(--inkMid)",marginTop:"0.2rem"}}>Issued {issued}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"0.25rem",marginTop:"0.4rem"}}>
                      {skills.map(s=><span key={s} style={{fontSize:"0.85rem",padding:"0.12rem 0.4rem",background:"var(--vPale)",color:"#1D4ED8",border:"1px solid #1D4ED8",fontFamily:"'DM Sans', system-ui, sans-serif",fontWeight:500}}>{s}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
            <div className="rv px-card shimmer-hover" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:"rgba(29,78,216,0.15)",border:"2px solid #1D4ED8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:"2px 2px 0 #1D4ED8"}}>💼</div>
                <div style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",fontWeight:600,color:"var(--ink)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Work Experience</div>
              </div>
              <div style={{borderLeft:"3px solid #1D4ED8",paddingLeft:"1rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"0.4rem"}}>
                  <div>
                    <div style={{fontSize:"1rem",fontWeight:600,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Web Dev Intern</div>
                    <div style={{fontSize:"0.92rem",color:"#1D4ED8",fontWeight:500,marginTop:"0.1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Indavis Lifesciences, Haridwar</div>
                  </div>
                  <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.82rem",color:"#1D4ED8",background:"var(--vPale)",padding:"0.2rem 0.5rem",border:"1px solid #1D4ED8",fontWeight:500}}>Jun–Jul 2025</span>
                </div>
                <ul style={{listStyle:"none",marginTop:"0.8rem",display:"flex",flexDirection:"column",gap:"0.4rem"}}>
                  {["Maintained and updated company website, smooth performance + content accuracy","Collaborated with cross-functional teams aligning updates with brand guidelines","Managed content workflows, consistent brand representation across web pages"].map((b,i)=>(
                    <li key={i} style={{display:"flex",gap:"0.4rem",fontSize:"0.95rem",color:"var(--muted)",lineHeight:1.65,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
                      <span style={{color:"#1D4ED8",flexShrink:0}}>▸</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rv d1 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:"rgba(14,165,233,0.15)",border:"2px solid #0EA5E9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:"2px 2px 0 #0EA5E9"}}>🛠️</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.62rem",fontWeight:400,color:"var(--ink)"}}>TECH SKILLS</div>
              </div>
              {[
                {label:"Languages",items:["Python","JavaScript","C","C++","Java","HTML","CSS"],col:"#1D4ED8"},
                {label:"Backend",items:["Node.js","Express","FastAPI","REST","JWT","Argon2"],col:"#0EA5E9"},
                {label:"Databases",items:["MySQL","MongoDB","Redis","FAISS","SQLite3"],col:"#10B981"},
                {label:"AI/ML",items:["LangChain","HuggingFace","RAG","XGBoost","Scikit-learn"],col:"#F59E0B"},
                {label:"DevOps",items:["Docker","Git","GitHub","Postman","BullMQ"],col:"#EF4444"},
                {label:"Concepts",items:["System Design","DSA","ACID","Caching","Rate Limiting"],col:"#1D4ED8"},
              ].map(({label,items,col})=>(
                <div key={label} style={{marginBottom:"0.8rem"}}>
                  <div style={{fontFamily:"'DM Mono', monospace",fontSize:"0.82rem",color:col,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"0.4rem",fontWeight:500}}>› {label}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem"}}>
                    {items.map(t=><span key={t} className="chip" style={{fontSize:"0.82rem"}}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <div className="rv d2 px-card" style={{background:"var(--paper)",padding:"1.5rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1.2rem"}}>
                <div style={{width:28,height:28,background:"rgba(245,158,11,0.15)",border:"2px solid #F59E0B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",boxShadow:"2px 2px 0 #F59E0B"}}>🚀</div>
                <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.62rem",fontWeight:400,color:"var(--ink)"}}>KEY PROJECTS</div>
              </div>
              {[
                {name:"Real Time Stock Trading Backend",tech:"Node.js · Redis · MySQL · BullMQ · Docker",points:["Redis Sorted Sets → <50ms leaderboard queries","JWT auth + Token Bucket rate limiter","MySQL row-level locking for concurrent trades"]},
                {name:"RAG Discord Bot",tech:"Python · FastAPI · LangChain · FAISS · Groq",points:["Per-guild persistent FAISS vector stores","LCEL chain with Groq Llama 3.3","Multi-server isolation + permission gating"]},
                {name:"Video Streaming & User Mgmt",tech:"Node.js · MongoDB · Cloudinary",points:["HLS transcoding via ffmpeg","JWT access/refresh token lifecycle","MongoDB aggregation pipelines"]},
                {name:"Cricket Score Predictor",tech:"Python · XGBoost · Streamlit",points:["3 XGBoost models: IPL, T20, ODI","Live CricAPI integration","Format-specific feature engineering"]},
              ].map(({name,tech,points},i)=>(
                <div key={name} style={{padding:"0.8rem 0",borderBottom:i<3?"1px solid rgba(29,78,216,0.06)":"none"}}>
                  <div style={{fontSize:"0.97rem",fontWeight:600,color:"var(--ink)",marginBottom:"0.15rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</div>
                  <div style={{fontFamily:"'DM Mono', monospace",fontSize:"0.82rem",color:"#1D4ED8",marginBottom:"0.4rem",fontWeight:500}}>{tech}</div>
                  {points.map((p,j)=>(
                    <div key={j} style={{display:"flex",gap:"0.4rem",fontSize:"0.92rem",color:"var(--muted)",lineHeight:1.6,marginBottom:"0.15rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
                      <span style={{color:"#1D4ED8",flexShrink:0}}>›</span>{p}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rv d4" style={{marginTop:"2rem",background:"#020B18",border:"3px solid #1D4ED8",padding:"1.8rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem",boxShadow:"6px 6px 0 #1D4ED8"}}>
          <div>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",letterSpacing:"1px",marginBottom:"0.3rem",fontWeight:500}}>Ready to hire?</div>
            <div style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.7rem",fontWeight:400,color:"#fff",lineHeight:1.7}}>DOWNLOAD FULL PDF RESUME</div>
            <div style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginTop:"0.2rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Updated 2025 · ARMANRESUME.pdf</div>
          </div>
          <div style={{display:"flex",gap:"0.8rem",flexWrap:"wrap"}}>
            <a href="/ARMANRESUME.pdf" download className="px-btn" style={{padding:"0.8rem 1.5rem",background:"#1D4ED8",color:"#fff",border:"2px solid #60A5FA",textDecoration:"none",fontWeight:600,fontSize:"0.95rem",display:"flex",alignItems:"center",gap:"0.5rem",fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:"3px 3px 0 #60A5FA"}}>
              <Download size={13} strokeWidth={2.5}/>Download
            </a>
            <a href="mailto:armanphaugat20@gmail.com" className="px-btn" style={{padding:"0.8rem 1.5rem",background:"rgba(255,255,255,0.08)",color:"#fff",border:"2px solid rgba(255,255,255,0.2)",textDecoration:"none",fontWeight:600,fontSize:"0.95rem",fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:"3px 3px 0 rgba(255,255,255,0.15)"}}>Contact →</a>
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

const CAT_COLORS={Backend:"#1D4ED8","AI/ML":"#0EA5E9",Frontend:"#10B981",Game:"#F59E0B"};
const CATEGORIES=["All","Backend","AI/ML","Frontend","Game"];

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  const displayCategory = Array.isArray(p.categories) ? p.categories[0] : p.category;
  const cc=CAT_COLORS[displayCategory]||"#1D4ED8";
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:hov?"#0C2A50":"var(--paper)", border:`3px solid ${cc}`, boxShadow:hov?`8px 8px 0 ${cc}`:`4px 4px 0 ${cc}`, padding:"1.6rem", transition:"all 0.1s", transform:hov?"translate(-4px,-4px)":"translate(0,0)", display:"flex", flexDirection:"column", cursor:"default" }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.8rem"}}>
        <div style={{display:"flex",gap:"0.4rem",alignItems:"center"}}>
          <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.85rem",color:hov?"rgba(255,255,255,0.6)":"var(--inkMid)",fontWeight:500}}>#{p.num}</span>
          <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.85rem",fontWeight:600,padding:"0.2rem 0.6rem",background:`${cc}18`,color:cc,border:`1px solid ${cc}`}}>{displayCategory}</span>
        </div>
        <div style={{width:24,height:24,background:hov?`${cc}33`:"var(--vPale)",border:`2px solid ${cc}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={cc} strokeWidth="3"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </div>
      </div>
      <h3 style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:hov?"#fff":"var(--ink)",marginBottom:"0.4rem",lineHeight:1.5}}>{p.name}</h3>
      <p style={{fontSize:"0.92rem",color:hov?"rgba(255,255,255,0.65)":"var(--muted)",marginBottom:"0.9rem",lineHeight:1.7,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{p.tagline}</p>
      <div style={{flex:1,marginBottom:"1rem"}}>
        {p.highlights.map((h,i)=>(
          <div key={i} style={{display:"flex",gap:"0.4rem",fontSize:"0.92rem",color:hov?"rgba(255,255,255,0.7)":"var(--muted)",marginBottom:"0.35rem",lineHeight:1.6,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            <span style={{color:hov?"#60A5FA":cc,flexShrink:0,lineHeight:"1.7"}}>▸</span>{h}
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem",marginBottom:"0.8rem"}}>
        {p.tech.map(t=>(
          <span key={t} style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.85rem",fontWeight:500,padding:"0.28rem 0.65rem",background:hov?"rgba(96,165,250,0.15)":"var(--vPale)",color:hov?"#60A5FA":cc,border:`1px solid ${hov?"rgba(96,165,250,0.3)":cc}`}}>{t}</span>
        ))}
      </div>
      {(p.youtube||p.webapp||p.website||p.discord)&&(
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem",paddingTop:"0.8rem",borderTop:`2px solid ${hov?"rgba(255,255,255,0.08)":"rgba(29,78,216,0.1)"}`}}>
          {p.youtube&&<a href={p.youtube} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:"#dc2626",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:"2px solid #991b1b",boxShadow:"2px 2px 0 #991b1b"}}>Demo</a>}
          {p.webapp&&<a href={p.webapp} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:"#1D4ED8",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:"2px solid #1E3A8A",boxShadow:"2px 2px 0 #1E3A8A"}}>Live</a>}
          {p.website&&<a href={p.website} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:"#0ea5e9",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:"2px solid #0284c7",boxShadow:"2px 2px 0 #0284c7"}}>Site</a>}
          {p.discord&&<a href={p.discord} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="px-btn" style={{flex:1,minWidth:"80px",textAlign:"center",padding:"0.4rem 0.6rem",background:"#5865f2",color:"#fff",textDecoration:"none",fontSize:"0.88rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",border:"2px solid #4752c4",boxShadow:"2px 2px 0 #4752c4"}}>Add Bot</a>}
        </div>
      )}
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState("All");
  const filtered=active==="All"?PROJECTS:PROJECTS.filter(p=>{
    const cats = Array.isArray(p.categories) ? p.categories : [p.category];
    return cats.includes(active);
  });
  const CAT_COLORS_BTN={Backend:"#1D4ED8","AI/ML":"#0EA5E9",Frontend:"#10B981",Game:"#F59E0B",All:"#0F172A"};
  return (
    <section id="projects" style={{padding:"8rem 4rem",background:"var(--bg2)"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <div className="rv" style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"0.5px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem",fontWeight:600,textTransform:"uppercase"}}>
          <span style={{width:16,height:3,background:"#1D4ED8",display:"inline-block"}}/>PROJECTS
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Inter', system-ui, sans-serif",fontSize:"clamp(1.1rem,2.5vw,1.8rem)",fontWeight:700,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.4,letterSpacing:"0px"}}>
          THINGS I'VE <span className="grad">BUILT</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>10 projects: backends · ML models · AI bots · games · frontend clones</p>
        <ProjectStatsBar/>
        <div className="rv d3" style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          {CATEGORIES.map(cat=>{
            const col=CAT_COLORS_BTN[cat]||"#1D4ED8";
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
          {filtered.map(p=><ProjectCard key={p.num} p={p}/>)}
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

function SkillBar({ name, pct, cat }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setVis(true); },{threshold:0.3}); if(ref.current)obs.observe(ref.current); return ()=>obs.disconnect(); },[]);
  const catC={Backend:"#1D4ED8","AI/ML":"#0EA5E9",Database:"#10B981",DevOps:"#F59E0B",Frontend:"#EF4444","CS Core":"#3B82F6"};
  const col=catC[cat]||"#1D4ED8";
  return (
    <div ref={ref} style={{marginBottom:"1.1rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.4rem"}}>
        <span style={{fontSize:"0.95rem",fontWeight:500,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</span>
        <div style={{display:"flex",alignItems:"center",gap:"0.4rem"}}>
          <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",color:col,fontWeight:600,background:`${col}18`,padding:"0.08rem 0.4rem",border:`1px solid ${col}`}}>{cat}</span>
          <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.85rem",color:"var(--muted)",fontWeight:500}}>{pct}%</span>
        </div>
      </div>
      <div style={{height:10,background:"rgba(29,78,216,0.07)",border:"2px solid rgba(29,78,216,0.18)"}}>
        <div style={{height:"100%",background:`linear-gradient(90deg,${col},${col}cc)`,boxShadow:`0 0 6px ${col}66`,width:vis?`${pct}%`:"0%",transition:"width 1.3s cubic-bezier(0.25,1,0.5,1) 0.2s"}}/>
      </div>
    </div>
  );
}

function SkillRings() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setVis(true); },{threshold:0.2}); if(ref.current)obs.observe(ref.current); return ()=>obs.disconnect(); },[]);
  const rings=[
    {name:"DSA / CP",pct:92,col:"#1D4ED8",r:110},
    {name:"Node.js",pct:90,col:"#0EA5E9",r:92},
    {name:"Python",pct:88,col:"#10B981",r:74},
    {name:"MySQL/ACID",pct:85,col:"#F59E0B",r:56},
    {name:"Redis",pct:82,col:"#EF4444",r:38},
    {name:"LangChain",pct:80,col:"#3B82F6",r:20},
  ];
  const cx=130,cy=130;
  const circumference=(r)=>2*Math.PI*r;
  const dash=(pct,r)=>(pct/100)*circumference(r);
  return (
    <div ref={ref} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center"}} className="grid2">
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg width="260" height="260" viewBox="0 0 260 260" style={{overflow:"visible"}}>
          {rings.map(({r})=><circle key={`bg-${r}`} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(29,78,216,0.1)" strokeWidth="8" strokeDasharray="4,2"/>)}
          {rings.map(({pct,col,r,name})=>{
            const c=circumference(r); const d=dash(pct,r);
            return <circle key={name} cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth="8" strokeLinecap="square" strokeDasharray={`${vis?d:0} ${c}`} strokeDashoffset={c*0.25} style={{transition:vis?`stroke-dasharray 1.4s ease ${(rings.findIndex(x=>x.r===r))*0.1}s`:"none",transform:"rotate(-90deg)",transformOrigin:`${cx}px ${cy}px`}}/>;
          })}
          <text x={cx} y={cy-8} textAnchor="middle" fill="var(--ink)" fontSize="24" fontWeight="500" fontFamily="'DM Mono', monospace">87%</text>
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
              <circle cx="15" cy="15" r="11" fill="none" stroke="rgba(29,78,216,0.1)" strokeWidth="3"/>
              <circle cx="15" cy="15" r="11" fill="none" stroke={col} strokeWidth="3" strokeLinecap="square" strokeDasharray={`${vis?(pct/100)*69:0} 69`} style={{transition:vis?`stroke-dasharray 1.4s ease ${i*0.1}s`:"none",transform:"rotate(-90deg)",transformOrigin:"15px 15px"}}/>
            </svg>
            <div style={{flex:1}}>
              <div style={{fontSize:"0.95rem",fontWeight:500,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{name}</div>
              <div style={{height:3,background:"rgba(29,78,216,0.08)",marginTop:"0.3rem"}}>
                <div style={{height:"100%",width:vis?`${pct}%`:"0%",background:col,transition:vis?`width 1.4s ease ${i*0.08}s`:"none"}}/>
              </div>
            </div>
            <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.88rem",fontWeight:500,color:col,minWidth:"2.5rem",textAlign:"right"}}>{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("bars");
  const TABS=[["bars","Skill Bars"],["tags","Tech Tags"],["radar","Radar"],["rings","Rings"]];
  return (
    <section id="skills" style={{padding:"8rem 4rem",background:"var(--bg)",position:"relative",overflow:"hidden"}} className="sec-pad">
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(29,78,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(29,78,216,0.04) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}}/>
      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:"#1D4ED8",display:"inline-block"}}/>SKILLS
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"clamp(1.1rem,2.5vw,1.8rem)",fontWeight:400,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.4,letterSpacing:"1px"}}>
          MY <span className="grad">TOOLKIT</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Technologies I reach for every day.</p>
        <div className="rv d3" style={{display:"flex",gap:"0.4rem",marginBottom:"2rem",flexWrap:"wrap"}}>
          {TABS.map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"0.4rem 1rem",cursor:"pointer",border:"2px solid #1D4ED8",background:tab===k?"#1D4ED8":"transparent",color:tab===k?"#fff":"#1D4ED8",fontSize:"0.92rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",boxShadow:tab===k?"3px 3px 0 #1E3A8A":"2px 2px 0 #1E3A8A",transition:"all 0.1s"}}>{l}</button>
          ))}
        </div>
        {tab==="bars"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 4rem"}} className="grid2 skill-bar-grid">
            {SKILL_LEVELS.map(s=><SkillBar key={s.name} {...s}/>)}
          </div>
        )}
        {tab==="tags"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem"}}>
            {SKILL_GROUPS.map((s,i)=>{
              const GCOLS=["#1D4ED8","#0EA5E9","#10B981","#F59E0B","#EF4444","#3B82F6"];
              const gc=GCOLS[i%GCOLS.length];
              return (
                <div key={s.label} style={{background:"var(--paper)",border:`2px solid ${gc}`,padding:"1.2rem",boxShadow:`4px 4px 0 ${gc}`,animation:`tagIn 0.5s ease ${i*0.07}s both`}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.8rem"}}>
                    <div style={{width:32,height:32,background:`${gc}18`,border:`2px solid ${gc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",boxShadow:`2px 2px 0 ${gc}`}}>{s.icon}</div>
                    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)"}}>{s.label}</div>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem"}}>
                    {s.items.map(t=><span key={t} className="chip" style={{fontSize:"0.85rem",borderColor:gc,color:gc,boxShadow:`2px 2px 0 ${gc}`}}>{t}</span>)}
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
              {[{label:"Backend",val:90,col:"#1D4ED8"},{label:"DSA / CP",val:92,col:"#0EA5E9"},{label:"AI / ML",val:80,col:"#10B981"},{label:"Databases",val:85,col:"#F59E0B"},{label:"DevOps",val:75,col:"#EF4444"},{label:"Frontend",val:72,col:"#3B82F6"}].map(s=>(
                <div key={s.label} style={{marginBottom:"0.8rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.4rem"}}>
                    <span style={{fontSize:"1rem",fontWeight:500,color:"var(--ink)",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{s.label}</span>
                    <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.88rem",color:s.col,fontWeight:500}}>{s.val}%</span>
                  </div>
                  <div style={{height:6,background:"rgba(29,78,216,0.08)",border:`1px solid ${s.col}44`}}>
                    <div style={{height:"100%",width:`${s.val}%`,background:s.col,transition:"width 1s ease"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="rings"&&<SkillRings/>}
      </div>
    </section>
  );
}

/* ─────────────── ACHIEVEMENTS ─────────────── */
const ACHIEVEMENTS=[
  {icon:"🏆",title:"Dean's Excellence Award",desc:"Received across multiple semesters for maintaining a 9.0+ CGPA at Manipal University Jaipur.",col:"#F59E0B"},
  {icon:"🔥",title:"900+ DSA Problems",desc:"Consistent problem solving on LeetCode, Codeforces, and other competitive platforms.",col:"#1D4ED8"},
  {icon:"⚡",title:"Top 0.3% LeetCode",desc:"Ranked globally in the top 0.3% of all LeetCode users worldwide. Beats 99.7%.",col:"#0EA5E9"},
  {icon:"🚀",title:"MUJHackX Round 2",desc:"Qualified for Round 2 among 1300+ participants at MUJHackX hackathon.",col:"#10B981"},
];

function Achievements() {
  return (
    <section id="achievements" style={{padding:"8rem 4rem",background:"var(--bg2)"}} className="sec-pad">
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:"#1D4ED8",display:"inline-block"}}/>ACHIEVEMENTS
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"clamp(1.1rem,2.5vw,1.8rem)",fontWeight:400,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.4,letterSpacing:"1px"}}>
          MILESTONES & <span className="grad">RECOGNITION</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--inkMid)",marginBottom:"2.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Consistent performance across academics, CP, and hackathons.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.2rem"}}>
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={a.title} className={`rv d${i+1}`} style={{background:"var(--paper)",border:`3px solid ${a.col}`,padding:"1.8rem",boxShadow:`5px 5px 0 ${a.col}`,position:"relative",overflow:"hidden",transition:"transform 0.1s,box-shadow 0.1s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translate(-2px,-2px)";e.currentTarget.style.boxShadow=`7px 7px 0 ${a.col}`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`5px 5px 0 ${a.col}`;}}
            >
              <div style={{fontSize:"2rem",marginBottom:"0.8rem"}}>{a.icon}</div>
              <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)",marginBottom:"0.5rem",lineHeight:1.5}}>{a.title}</div>
              <div style={{fontSize:"0.95rem",color:"var(--muted)",lineHeight:1.75,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div className="rv d5" style={{marginTop:"1.5rem",background:"#020B18",border:"3px solid #1D4ED8",padding:"2rem",display:"flex",alignItems:"center",gap:"3rem",flexWrap:"wrap",boxShadow:"6px 6px 0 #1D4ED8"}}>
          <div>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.4)",letterSpacing:"1px",marginBottom:"0.5rem",fontWeight:500}}>LeetCode stats</div>
            <div style={{fontFamily:"'DM Mono', monospace",fontSize:"2.5rem",color:"#fff",letterSpacing:"-1px",lineHeight:1,fontWeight:500}}>TOP <span style={{color:"#60A5FA"}}>0.3%</span></div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:"0.9rem",marginTop:"0.3rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>Global Rank · 900+ Problems</div>
          </div>
          <div style={{display:"flex",gap:"2rem",flexWrap:"wrap"}}>
            {[["900+","Problems"],["Top 0.3%","Global Rank"],["All levels","Easy–Med–Hard"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'DM Mono', monospace",fontSize:"1.5rem",color:"#60A5FA",fontWeight:500}}>{n}</div>
                <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginTop:"0.2rem"}}>{l}</div>
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
  {year:"2023",month:"Aug",icon:"🎓",title:"Started B.Tech CSE",sub:"Manipal University Jaipur",desc:"Began CS degree. Immediately dove into DSA and competitive programming.",col:"#1D4ED8"},
  {year:"2023",month:"Dec",icon:"🏆",title:"TLE Eliminators CP Level 1",sub:"Competitive Programming",desc:"Foundation in C++ and algorithmic thinking. Level 1 completed.",col:"#0EA5E9"},
  {year:"2024",month:"Mar",icon:"⭐",title:"Dean's Excellence — Sem 1",sub:"9.05 CGPA",desc:"Awarded Dean's Excellence for outstanding academic performance.",col:"#F59E0B"},
  {year:"2024",month:"Jun",icon:"📜",title:"Oracle DB + GFG OOP Certs",sub:"Certifications",desc:"Completed Oracle Database Design & OOP in Java from GeeksforGeeks.",col:"#10B981"},
  {year:"2024",month:"Aug",icon:"🔥",title:"500+ DSA Problems Solved",sub:"LeetCode + Codeforces",desc:"Hit 500 milestone. Moved to medium-hard consistently.",col:"#EF4444"},
  {year:"2024",month:"Nov",icon:"🥋",title:"TLE Eliminators Level 2 & 3",sub:"Advanced Algorithms",desc:"Advanced graph theory, segment trees, DP optimizations.",col:"#1D4ED8"},
  {year:"2025",month:"Jan",icon:"🎩",title:"Red Hat Sysadmin + NPTEL DAA",sub:"Dual Certifications",desc:"Red Hat Sysadmin I & II + NPTEL Design & Analysis of Algorithms.",col:"#EF4444"},
  {year:"2025",month:"Feb",icon:"🚀",title:"MUJHackX Round 2",sub:"1300+ participants",desc:"Top performers among 1300+ participants at MUJHackX.",col:"#0EA5E9"},
  {year:"2025",month:"Mar",icon:"⚡",title:"LeetCode Top 0.3%",sub:"Beats 99.7%",desc:"900+ problems. Ranked top 0.3% globally.",col:"#F59E0B"},
  {year:"2025",month:"Jun",icon:"💼",title:"Web Dev Intern — Indavis",sub:"Haridwar · On-site",desc:"First professional internship. Real business constraints.",col:"#10B981"},
];

function Timeline() {
  return (
    <section id="timeline" className="sec-pad sec-transition" style={{padding:"8rem 4rem",background:"var(--bg)"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:"#1D4ED8",display:"inline-block"}}/>JOURNEY
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"clamp(1.1rem,2.5vw,1.8rem)",fontWeight:400,color:"var(--ink)",marginBottom:"0.9rem",lineHeight:1.4,letterSpacing:"1px"}}>
          MY <span className="grad">TIMELINE</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--muted)",marginBottom:"3rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>From day one at MUJ to where I am now.</p>

        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:3,background:"linear-gradient(to bottom,transparent,#1D4ED8 5%,#1D4ED8 95%,transparent)",transform:"translateX(-50%)"}} className="hide-mob"/>
          <div style={{position:"absolute",left:20,top:0,bottom:0,width:3,background:"#1D4ED844"}} className="show-mob"/>

          {TIMELINE_EVENTS.map((ev,i)=>{
            const isLeft=i%2===0;
            return (
              <div key={i} className={`rv d${(i%5)+1}`} style={{display:"flex",justifyContent:isLeft?"flex-start":"flex-end",marginBottom:"1.5rem",position:"relative"}}>
                <div style={{position:"absolute",left:"calc(50% - 16px)",top:"1rem",width:32,height:32,background:ev.col,border:"3px solid var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",zIndex:2,boxShadow:`3px 3px 0 ${ev.col}66, 0 0 15px ${ev.col}55`,outline:`3px solid ${ev.col}`,outlineOffset:"2px"}} className="hide-mob">{ev.icon}</div>
                <div style={{position:"absolute",left:8,top:"1rem",width:24,height:24,background:ev.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",zIndex:2}} className="show-mob">{ev.icon}</div>

                <div style={{width:"44%",background:"var(--paper)",border:`2px solid ${ev.col}`,padding:"1.1rem 1.3rem",boxShadow:`4px 4px 0 ${ev.col}`,marginLeft:isLeft?"0":"auto",transition:"transform 0.1s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";}}
                  className="hide-mob"
                >
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.3rem"}}>
                    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)",lineHeight:1.4}}>{ev.title}</div>
                    <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.8rem",color:ev.col,background:`${ev.col}15`,padding:"0.15rem 0.4rem",fontWeight:500,whiteSpace:"nowrap",marginLeft:"0.4rem",flexShrink:0,border:`1px solid ${ev.col}`,boxShadow:`1px 1px 0 ${ev.col}`}}>{ev.month} {ev.year}</span>
                  </div>
                  <div style={{fontSize:"0.88rem",color:ev.col,fontWeight:500,marginBottom:"0.4rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{ev.sub}</div>
                  <div style={{fontSize:"0.92rem",color:"var(--muted)",lineHeight:1.7,fontFamily:"'DM Sans', system-ui, sans-serif"}}>{ev.desc}</div>
                </div>

                <div style={{marginLeft:"2.8rem",flex:1,background:"var(--paper)",border:`2px solid ${ev.col}`,padding:"0.9rem 1rem",boxShadow:`3px 3px 0 ${ev.col}`}} className="show-mob">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.2rem"}}>
                    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.97rem",fontWeight:600,color:"var(--ink)",lineHeight:1.5}}>{ev.title}</div>
                    <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.78rem",color:ev.col,padding:"0.1rem 0.35rem",border:`1px solid ${ev.col}`,whiteSpace:"nowrap",marginLeft:"0.3rem",fontWeight:500}}>{ev.month} {ev.year.slice(2)}</span>
                  </div>
                  <div style={{fontSize:"0.85rem",color:ev.col,fontWeight:500,marginBottom:"0.3rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{ev.sub}</div>
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
  {icon:"🐹",name:"Go (Golang)",desc:"High-concurrency backends. Goroutines, channels, REST APIs with Gin.",progress:40,col:"#00ACD7",status:"Active"},
  {icon:"☸️",name:"Kubernetes",desc:"Container orchestration, deployments, services, scaling stateful apps.",progress:30,col:"#326CE5",status:"Active"},
  {icon:"🦀",name:"Rust",desc:"Systems programming, memory safety, ownership model. Working through The Book.",progress:20,col:"#CE422B",status:"Started"},
  {icon:"📡",name:"gRPC & Protobuf",desc:"High-performance inter-service communication for microservices.",progress:45,col:"#4285F4",status:"Active"},
  {icon:"🔭",name:"Apache Kafka",desc:"Event-driven architecture, distributed messaging, stream processing.",progress:25,col:"#1D4ED8",status:"Started"},
  {icon:"🧠",name:"LLM Fine-tuning",desc:"SFT of open-source models (Mistral/Llama) for domain-specific RAG.",progress:35,col:"#10B981",status:"Active"},
];

function CurrentlyLearning() {
  return (
    <section id="learning" className="sec-pad sec-transition" style={{padding:"8rem 4rem",background:"var(--bg2)"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.75rem",color:"#1D4ED8",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:"#1D4ED8",display:"inline-block"}}/>LEARNING
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem",marginBottom:"0.6rem"}}>
          <h2 className="rv d1" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"clamp(1rem,2vw,1.5rem)",fontWeight:400,color:"var(--ink)",lineHeight:1.5}}>
            CURRENTLY <span className="grad">EXPLORING</span>
          </h2>
          <div className="rv d2" style={{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.35rem 0.8rem",background:"var(--vPale)",border:"2px solid #1D4ED8",boxShadow:"2px 2px 0 #1D4ED8",animation:"learnPulse 2.5s ease-in-out infinite"}}>
            <div style={{width:7,height:7,background:"#10B981",animation:"pulse2 1.5s ease-in-out infinite"}}/>
            <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"#1D4ED8",fontWeight:600}}>In progress</span>
          </div>
        </div>
        <p className="rv d2" style={{fontSize:"1rem",color:"var(--inkMid)",marginBottom:"2.5rem",lineHeight:1.8,fontFamily:"'DM Sans', system-ui, sans-serif"}}>Going deeper into infra, systems programming, and advanced AI.</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1.1rem"}}>
          {LEARNING.map((item,i)=>(
            <div key={item.name} className={`rv d${(i%4)+1}`} style={{background:"var(--paper)",border:`2px solid ${item.col}`,padding:"1.4rem",boxShadow:`4px 4px 0 ${item.col}`,transition:"all 0.1s",position:"relative"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translate(-2px,-2px)";e.currentTarget.style.boxShadow=`6px 6px 0 ${item.col}`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`4px 4px 0 ${item.col}`;}}
            >
              <div style={{position:"absolute",top:"0.8rem",right:"0.8rem",fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",fontWeight:600,padding:"0.15rem 0.5rem",background:item.status==="Active"?"rgba(16,185,129,0.12)":"rgba(245,158,11,0.12)",color:item.status==="Active"?"#059669":"#B45309",border:`1px solid ${item.status==="Active"?"#10B981":"#F59E0B"}`}}>{item.status}</div>

              <div style={{display:"flex",gap:"0.8rem",alignItems:"flex-start",marginBottom:"0.8rem"}}>
                <div style={{width:40,height:40,background:`${item.col}15`,border:`2px solid ${item.col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0,boxShadow:`2px 2px 0 ${item.col}`}}>{item.icon}</div>
                <div>
                  <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)",lineHeight:1.4}}>{item.name}</div>
                  <div style={{fontFamily:"'DM Mono', monospace",fontSize:"0.88rem",color:item.col,marginTop:"0.15rem",fontWeight:500}}>{item.progress}% through</div>
                </div>
              </div>

              <p style={{fontSize:"0.92rem",color:"var(--muted)",lineHeight:1.7,marginBottom:"1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>{item.desc}</p>

              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.4rem"}}>
                  <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"var(--inkMid)",fontWeight:500}}>Progress</span>
                  <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.85rem",color:item.col,fontWeight:500}}>{item.progress}%</span>
                </div>
                <div style={{height:8,background:"rgba(29,78,216,0.08)",border:`2px solid ${item.col}`}}>
                  <div style={{height:"100%",background:`linear-gradient(90deg,${item.col},${item.col}bb)`,boxShadow:`0 0 8px ${item.col}55`,width:`${item.progress}%`,transition:"width 1.2s cubic-bezier(0.25,1,0.5,1)"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rv d5" style={{marginTop:"2rem",padding:"1rem 1.5rem",background:"var(--vPale)",border:"2px solid #1D4ED8",boxShadow:"3px 3px 0 #1D4ED8",display:"flex",alignItems:"center",gap:"0.8rem"}}>
          <span style={{fontSize:"1.2rem"}}>💡</span>
          <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",color:"var(--ink)",lineHeight:1.65}}>
            <strong style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",color:"#1D4ED8",fontWeight:600}}>Goal 2025–26:</strong> Ship prod-grade services in Go, get comfortable with K8s, contribute to open-source.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTACT ─────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy=()=>{ navigator.clipboard.writeText("armanphaugat20@gmail.com"); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const LINKS=[
    {icon:"✉️",label:"Email",value:"armanphaugat20@gmail.com",href:"mailto:armanphaugat20@gmail.com",col:"#1D4ED8"},
    {icon:"📱",label:"Phone",value:"+91-9306115772",href:"tel:+919306115772",col:"#0EA5E9"},
    {icon:"🐙",label:"GitHub",value:"github.com/armanphaugat",href:"https://github.com/armanphaugat",col:"#10B981"},
    {icon:"💼",label:"LinkedIn",value:"linkedin.com/in/armanphaugat05",href:"https://www.linkedin.com/in/armanphaugat05/",col:"#0A66C2"},
    {icon:"🧩",label:"LeetCode",value:"Top 0.3% · armanphaugat20",href:"https://leetcode.com/u/armanphaugat20",col:"#FFA116"},
  ];
  return (
    <section id="contact" style={{padding:"9rem 4rem",background:"#020B18",position:"relative",overflow:"hidden",backgroundImage:"radial-gradient(ellipse 70% 60% at 50% 0%, rgba(29,78,216,0.15) 0%, transparent 60%)"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(29,78,216,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(29,78,216,0.06) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}}/>
      <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="rv" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"0.75rem",color:"#60A5FA",letterSpacing:"2px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <span style={{width:16,height:3,background:"#60A5FA",display:"inline-block"}}/>CONTACT
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Press Start 2P', monospace",fontSize:"clamp(1.5rem,4vw,3rem)",fontWeight:400,color:"#fff",marginBottom:"0.8rem",lineHeight:1.3}}>
          LET'S <span style={{color:"#60A5FA"}}>CONNECT</span>
        </h2>
        <p className="rv d2" style={{fontSize:"1rem",color:"rgba(255,255,255,0.5)",maxWidth:480,marginBottom:"3rem",lineHeight:1.85,fontFamily:"'DM Sans', system-ui, sans-serif"}}>
          Internship, project collab, or tech talk — reach out and I'll reply fast.
        </p>

        <div className="rv d3 contact-email-row" style={{display:"flex",gap:"0.8rem",alignItems:"center",marginBottom:"2.5rem",flexWrap:"wrap"}}>
          <div style={{background:"rgba(255,255,255,0.05)",border:"2px solid rgba(255,255,255,0.15)",padding:"0.9rem 1.3rem",flex:1,minWidth:260}}>
            <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.85rem",color:"rgba(255,255,255,0.5)",letterSpacing:"1px",marginBottom:"0.3rem",fontWeight:500}}>Primary email</div>
            <div style={{fontSize:"1rem",color:"#fff",fontWeight:500,fontFamily:"'DM Mono', monospace"}}>armanphaugat20@gmail.com</div>
          </div>
          <button onClick={copy} className="px-btn" style={{padding:"0.9rem 1.5rem",background:copied?"#10B981":"#1D4ED8",color:"#fff",border:"none",cursor:"pointer",fontSize:"0.95rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",transition:"background 0.2s",boxShadow:"3px 3px 0 #1E3A8A",whiteSpace:"nowrap"}}>{copied?"Copied! ✓":"Copy email"}</button>
          <a href="mailto:armanphaugat20@gmail.com" className="px-btn" style={{padding:"0.9rem 1.5rem",background:"rgba(255,255,255,0.08)",color:"#fff",border:"2px solid rgba(255,255,255,0.2)",textDecoration:"none",fontSize:"0.95rem",fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",whiteSpace:"nowrap",boxShadow:"3px 3px 0 rgba(255,255,255,0.1)"}}>Open mail →</a>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.8rem"}}>
          {LINKS.map((l,i)=>(
            <a key={l.label} href={l.href} target={l.href.startsWith("http")?"_blank":undefined} rel="noreferrer" className={`rv d${i+1} shimmer-hover`}
              style={{display:"flex",alignItems:"center",gap:"0.8rem",padding:"1rem 1.2rem",background:"rgba(255,255,255,0.03)",border:`2px solid ${l.col}`,textDecoration:"none",color:"#fff",boxShadow:`3px 3px 0 ${l.col}44`,transition:"all 0.1s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=`${l.col}20`;e.currentTarget.style.transform="translate(-2px,-2px)";e.currentTarget.style.boxShadow=`5px 5px 0 ${l.col}66`;}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`3px 3px 0 ${l.col}44`;}}
            >
              <div style={{fontSize:"1.2rem",flexShrink:0}}>{l.icon}</div>
              <div>
                <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.8rem",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"0.1rem",fontWeight:500}}>{l.label}</div>
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
function Footer() {
  const FCOLS=["#1D4ED8","#0EA5E9","#10B981","#F59E0B","#EF4444","#3B82F6"];
  return (
    <footer style={{background:"linear-gradient(180deg,#020B18 0%,#010510 100%)",borderTop:"3px solid #1D4ED8",boxShadow:"0 -4px 30px rgba(29,78,216,0.15)"}}>
      <div className="px-divider"/>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"2.5rem 2rem 2rem",display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"3rem"}} className="footer-grid">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"0.8rem"}}>
            <div style={{width:32,height:32,background:"#1D4ED8",border:"2px solid #60A5FA",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"3px 3px 0 #60A5FA"}}>
              <span style={{fontFamily:"'Press Start 2P', monospace",color:"#fff",fontSize:"0.75rem",fontWeight:400}}>AP</span>
            </div>
            <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"1rem",fontWeight:600,color:"#fff"}}>Arman Phaugat</span>
          </div>
          <p style={{fontSize:"0.92rem",color:"rgba(255,255,255,0.45)",lineHeight:1.85,maxWidth:280,marginBottom:"1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            Backend & AI/ML Engineer · 3rd Year CSE · MUJ · Building fast, scalable systems.
          </p>
          <div style={{display:"flex",gap:"0.5rem"}}>
            {[{href:"https://github.com/armanphaugat",label:"GH"},{href:"https://www.linkedin.com/in/armanphaugat05/",label:"LI"},{href:"https://leetcode.com/u/armanphaugat20",label:"LC"}].map((s,i)=>(
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{width:32,height:32,background:"rgba(255,255,255,0.04)",border:`2px solid ${FCOLS[i]}`,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",color:"#fff",fontFamily:"'DM Mono', monospace",fontSize:"0.82rem",fontWeight:500,boxShadow:`2px 2px 0 ${FCOLS[i]}`,transition:"all 0.1s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${FCOLS[i]}30`;e.currentTarget.style.transform="translate(-1px,-1px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="";}}
              >{s.label}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",fontWeight:600,color:"rgba(255,255,255,0.35)",letterSpacing:"2px",marginBottom:"0.8rem",textTransform:"uppercase"}}>Navigate</div>
          {["About","Experience","Projects","Skills","Timeline","Contact"].map((s,i)=>(
            <a key={s} href={`#${s.toLowerCase()}`} style={{display:"block",fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.5)",textDecoration:"none",marginBottom:"0.45rem",transition:"color 0.1s",fontWeight:400}}
              onMouseEnter={e=>e.currentTarget.style.color=FCOLS[i%FCOLS.length]}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}
            >› {s}</a>
          ))}
        </div>

        <div>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.82rem",fontWeight:600,color:"rgba(255,255,255,0.35)",letterSpacing:"2px",marginBottom:"0.8rem",textTransform:"uppercase"}}>Status</div>
          <div className="status-available" style={{marginBottom:"0.8rem",width:"fit-content"}}>
            <div className="status-ping"/>
            <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"#10B981",fontWeight:600}}>Open to work</span>
          </div>
          <div style={{fontSize:"0.92rem",color:"rgba(255,255,255,0.55)",lineHeight:1.8,marginBottom:"1rem",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
            Available for internships & projects.<br/>Backend · AI/ML · Full Stack
          </div>
          <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.8rem",fontWeight:600,color:"rgba(255,255,255,0.3)",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"1px"}}>Dev thought</div>
          <FunFactsTicker/>
        </div>
      </div>

      <div style={{borderTop:"2px solid rgba(255,255,255,0.05)",padding:"1rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",maxWidth:1060,margin:"0 auto"}}>
        <span style={{fontFamily:"'DM Sans', system-ui, sans-serif",fontSize:"0.88rem",color:"rgba(255,255,255,0.25)"}}>© 2025 Arman Phaugat · All rights reserved</span>
        <span style={{fontFamily:"'DM Mono', monospace",fontSize:"0.85rem",color:"rgba(255,255,255,0.25)"}}>Built with React · <span style={{color:"rgba(29,78,216,0.6)"}}>?</span> = shortcuts · <span style={{color:"rgba(29,78,216,0.6)"}}>`</span> = terminal</span>
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
  // ChipTune sounds removed

  useEffect(()=>{ document.documentElement.setAttribute("data-theme",dark?"dark":"light"); },[dark]);

  useEffect(()=>{
    const fn=(e)=>{ if(e.key==="`"&&!loading)setShowTerminal(p=>!p); };
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  },[loading]);

  return (
    <>
      <style>{G}</style>
      <div className="scanlines"/>

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
        background:showTerminal?"#1D4ED8":"var(--paper)",
        border:"3px solid #1D4ED8",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:showTerminal?"5px 5px 0 #1E3A8A":"3px 3px 0 #1D4ED8",
        transition:"all 0.1s",
      }}
        onMouseEnter={e=>{if(!showTerminal){e.currentTarget.style.background="#1D4ED8";e.currentTarget.style.transform="translate(-1px,-1px)";}}}
        onMouseLeave={e=>{if(!showTerminal){e.currentTarget.style.background="var(--paper)";e.currentTarget.style.transform="";}}}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={showTerminal?"#fff":"#1D4ED8"} strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
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