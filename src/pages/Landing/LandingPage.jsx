import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import logo from "../../assets/logo-light.png";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F6F7FC;
    --ink: #171A34;
    --ink-soft: #4B4F76;
    --ink-mute: #8A8FB2;
    --indigo: #4F46E5;
    --cyan: #06B6D4;
    --coral: #FF6B6B;
    --amber: #FFB020;
    --green: #10B981;
    --violet-dark: #1E1B4B;
    --line: rgba(23,26,52,.08);
    --grad-1: linear-gradient(120deg,#4F46E5 0%,#06B6D4 100%);
    --grad-2: linear-gradient(120deg,#FF6B6B 0%,#FFB020 100%);
    --grad-3: linear-gradient(135deg,#7C74F5 0%,#4F46E5 55%,#06B6D4 100%);
    --font-body: 'Plus Jakarta Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --shadow-card: 0 2px 8px rgba(23,26,52,.04), 0 20px 44px -22px rgba(23,26,52,.16);
    --shadow-card-hover: 0 4px 14px rgba(23,26,52,.06), 0 30px 60px -20px rgba(79,70,229,.28);
  }

  body { font-family: var(--font-body); background: var(--bg); color: var(--ink); }

  .grad-text {
    background-image: var(--grad-3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.3,1); }
  .reveal.in { opacity: 1; transform: translateY(0); }

  @keyframes drift {
    from { transform: translate(0,0) scale(1); }
    to { transform: translate(30px,-24px) scale(1.08); }
  }
  @keyframes bob {
    0%,100% { transform: translateY(0) rotate(var(--rot,0deg)); }
    50% { transform: translateY(-12px) rotate(var(--rot,0deg)); }
  }

  .blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .55; pointer-events: none; animation: drift 20s ease-in-out infinite alternate; }
  .blob-1 { width:420px; height:420px; background:radial-gradient(circle,#8B7CFA,transparent 70%); top:-160px; left:-120px; animation-duration:22s; }
  .blob-2 { width:380px; height:380px; background:radial-gradient(circle,#5FE0EE,transparent 70%); top:60px; right:-140px; animation-duration:26s; animation-delay:-6s; }
  .blob-3 { width:300px; height:300px; background:radial-gradient(circle,#FFB6A8,transparent 70%); bottom:-140px; left:30%; animation-duration:24s; animation-delay:-3s; opacity:.4; }

  .float-card { position:absolute; width:270px; border-radius:22px; background:rgba(255,255,255,.82); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.6); box-shadow:0 20px 50px -20px rgba(30,27,75,.35), 0 2px 6px rgba(30,27,75,.06); padding:20px; }
  .float-card.c1 { top:6px; left:60px; z-index:3; animation:bob 6s ease-in-out infinite; --rot:-6deg; }
  .float-card.c2 { top:150px; left:0; z-index:2; animation:bob 7s ease-in-out infinite; animation-delay:-2s; --rot:4deg; }
  .float-card.c3 { top:250px; left:140px; z-index:1; animation:bob 6.5s ease-in-out infinite; animation-delay:-4s; --rot:-3deg; }

  .perf-fill { height:100%; border-radius:999px; background:var(--grad-1); width:0%; transition:width 1.2s cubic-bezier(.3,.8,.3,1); }
  .ring-fill { fill:none; stroke:url(#ringGrad); stroke-width:12; stroke-linecap:round; stroke-dasharray:377; stroke-dashoffset:377; transition:stroke-dashoffset 1.4s cubic-bezier(.3,.8,.3,1); }

  .feat-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-card-hover); }
  .feat-card:hover .feat-icon { transform:rotate(-6deg) scale(1.06); }
  .why-card:hover { transform:translateY(-4px); background:rgba(255,255,255,.1); }
  .navpill { background:rgba(255,255,255,.75); backdrop-filter:blur(16px) saturate(160%); border:1px solid rgba(23,26,52,.06); box-shadow:0 1px 2px rgba(23,26,52,.03), 0 16px 40px -20px rgba(23,26,52,.18); }

  /* Shared content container — grows with the viewport instead of
     staying a fixed 1180px on every screen (which is what made the
     page look boxed-in on wide/4K monitors). Safely bounded to 94% of
     viewport width on small screens via the outer min(). */
  .page-container { max-width: min(94vw, clamp(1180px, 82vw, 1900px)); margin: 0 auto; }

  ::-webkit-scrollbar { width:8px; background:transparent; }
  ::-webkit-scrollbar-thumb { background:#d7d9ec; border-radius:8px; }

  /* ============ Responsive breakpoints ============
     Base grid layouts above target laptop/desktop (1025–1440px).
     Content width itself is handled by .page-container above, which
     grows fluidly up to 1900px on large/4K screens — no fixed cap
     here. The blocks below only adjust grid columns and floating
     cards for smaller screens; font sizes elsewhere already use
     clamp() so they scale automatically. */

  /* Large / 4K displays — no extra rules needed here; .page-container
     and clamp()-based font sizes already scale up on their own. */

  /* Tablet (1024px and down) */
  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .row-2, .about-grid { grid-template-columns: 1fr !important; }
    .why-grid { grid-template-columns: 1fr !important; }
    .float-card { width: 230px; }
    .float-card.c1 { left: 20px; }
    .float-card.c3 { left: 90px; }
  }

  /* Tablet / mobile landscape (768px and down) */
  @media (max-width: 768px) {
    .feat-grid { grid-template-columns: 1fr !important; }
  }

  /* Large mobile (425px and down) */
  @media (max-width: 425px) {
    .float-card-stack { height: auto !important; }
    .float-card { position: static !important; width: 100% !important; margin-bottom: 14px; }
  }

  /* Mobile (375px and down) */
  @media (max-width: 375px) {
    .navpill { padding: 8px 8px 8px 14px !important; }
  }

  /* Small mobile (320px and down) */
  @media (max-width: 320px) {
    .float-card { padding: 14px; }
  }
`;

const LandingPage = () => {
  const stackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = globalStyles;
    document.head.appendChild(styleEl);

    const revealEls = document.querySelectorAll(".reveal");
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => rio.observe(el));

    const fills = document.querySelectorAll(".perf-fill");
    const fio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.style.width = e.target.dataset.fill + "%";
        fio.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    fills.forEach((el) => fio.observe(el));

    const ring = document.querySelector(".ring-fill");
    if (ring) {
      const gio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          ring.style.strokeDashoffset = ring.dataset.offset;
          gio.unobserve(e.target);
        });
      }, { threshold: 0.5 });
      gio.observe(ring);
    }

    document.querySelectorAll(".count-up").forEach((el) => {
      const nio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const target = parseFloat(el.dataset.target);
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const start = performance.now();
          const dur = 1300;
          const step = (now) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          nio.unobserve(el);
        });
      }, { threshold: 0.5 });
      nio.observe(el);
    });

    const stack = stackRef.current;
    if (stack) {
      const cards = stack.querySelectorAll(".float-card");
      const onMove = (e) => {
        const r = stack.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cards.forEach((card, i) => {
          const depth = (i + 1) * 6;
          card.style.transform = `translate(${x * depth}px,${y * depth}px)`;
        });
      };
      const onLeave = () => cards.forEach((c) => (c.style.transform = ""));
      stack.addEventListener("mousemove", onMove);
      stack.addEventListener("mouseleave", onLeave);
      return () => {
        stack.removeEventListener("mousemove", onMove);
        stack.removeEventListener("mouseleave", onLeave);
        document.head.removeChild(styleEl);
      };
    }

    return () => { document.head.removeChild(styleEl); };
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── Header ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 60, padding: "18px 24px 0" }}>
        <div className="navpill page-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 999, padding: "16px 16px 16px 28px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logo} alt="PMRG Solution" style={{ height: 44, width: "auto" }} />
          </div>

          {/* Get Started — uses Button component */}
          <Button
            shape="pill"
            size="md"
            variant="gradient"
            gradientFrom="#4F46E5"
            gradientTo="#06B6D4"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: "relative", padding: "76px 0 40px", overflow: "hidden" }}>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="hero-grid page-container" style={{ position: "relative", zIndex: 2, padding: "0 40px", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 36, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, letterSpacing: ".02em", background: "#fff", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 16px 8px 10px", marginBottom: 22, boxShadow: "var(--shadow-card)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(120deg,#FF6B6B 0%,#FFB020 100%)", flexShrink: 0 }} />
              Proof of Concept Platform
            </div>

            <h1 style={{ fontWeight: 700, letterSpacing: "-.02em", fontSize: "clamp(38px,5vw,60px)", lineHeight: 1.05, marginBottom: 20, maxWidth: 600 }}>
              Welcome to the <span className="grad-text">Innovation Hub</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: 460, marginBottom: 36 }}>
              We turn bold ideas into working software — fast to try, simple to use, and solid enough to build on.
            </p>

            {/* CTA Buttons — using Button component */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
              <Button
                shape="pill"
                size="lg"
                variant="gradient"
                gradientFrom="#4F46E5"
                gradientTo="#06B6D4"
                onClick={() => navigate("/projects")}
              >
                Release planning →
              </Button>
              <Button variant="outline" shape="pill" size="lg" onClick={() => navigate("/projects")}>
                My Projects
              </Button>
            </div>

            {/* Stat chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { label: "99.9% uptime", bg: "var(--grad-1)" },
                { label: "98% response score", bg: "var(--grad-2)" },
                { label: "Enterprise-grade security", bg: "var(--green)" },
              ].map(({ label, bg }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 14px 8px 8px", fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)", boxShadow: "var(--shadow-card)" }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <div ref={stackRef} className="float-card-stack" style={{ position: "relative", height: 420 }}>
            <div className="float-card c1">
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                {["#FF6B6B", "#FFB020", "#10B981"].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-mute)", marginLeft: 4, letterSpacing: ".04em" }}>Live Performance</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 52 }}>
                {[55, 80, 40, 92, 65, 75].map((h, i) => (
                  <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "5px 5px 0 0", background: "linear-gradient(120deg,#4F46E5 0%,#06B6D4 100%)" }} />
                ))}
              </div>
            </div>

            <div className="float-card c2">
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-mute)", letterSpacing: ".04em" }}>System Status</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Authentication", "Real-time data", "Cloud infra"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)" }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="float-card c3">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="23" fill="none" stroke="#eef0fa" strokeWidth="6" />
                  <circle cx="28" cy="28" r="23" fill="none" stroke="var(--green)" strokeWidth="6" strokeLinecap="round" strokeDasharray="144.5" strokeDashoffset="1" transform="rotate(-90 28 28)" />
                </svg>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 22 }}>99.9%</div>
                  <div style={{ fontSize: 11, color: "var(--ink-mute)", fontWeight: 600 }}>Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="page-container" style={{ padding: "0 40px" }}>

        {/* ── Features ── */}
        <section id="features" style={{ padding: "88px 0" }}>
          <div className="reveal" style={{ maxWidth: 640, marginBottom: 44 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--indigo)", marginBottom: 12 }}>
              <span style={{ width: 16, height: 2, background: "var(--grad-1)", borderRadius: 2 }} />
              What we're building
            </div>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(26px,3.2vw,38px)", letterSpacing: "-.015em", lineHeight: 1.1 }}>A proof of concept, built to prove itself</h2>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.7 }}>This project demonstrates the core screens, data flow, and architecture behind PMRG's platform.</p>
          </div>

          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[
              { title: "Authentication", desc: "Secure sign-in and role-based access, ready out of the box.", bg: "var(--grad-1)" },
              { title: "Real-Time Data", desc: "Changes sync instantly across every connected screen.", bg: "var(--grad-2)" },
              { title: "Responsive Design", desc: "Every layout adapts cleanly from desktop down to mobile.", bg: "linear-gradient(120deg,#7C74F5,#4F46E5)" },
              { title: "Cloud-Native", desc: "Built on infrastructure that scales up the moment you need it.", bg: "linear-gradient(120deg,#06B6D4,#10B981)" },
            ].map(({ title, desc, bg }) => (
              <div key={title} className="feat-card reveal" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 20, padding: "26px 22px", boxShadow: "var(--shadow-card)", transition: "transform .25s ease, box-shadow .25s ease" }}>
                <div className="feat-icon" style={{ width: 46, height: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: bg, marginBottom: 16, transition: "transform .3s ease" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="10" rx="2" stroke="#fff" strokeWidth="1.8" /><path d="M8 10V7a4 4 0 018 0v3" stroke="#fff" strokeWidth="1.8" /></svg>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16.5, marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="row-2" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 22, marginTop: 22 }}>
            <div className="reveal" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 28, padding: 32, boxShadow: "var(--shadow-card)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-mute)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6 }}>Live readout</div>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 20 }}>Performance you can feel</div>
              {[{ label: "Load time", n: "92%", fill: 92 }, { label: "Response", n: "98%", fill: 98 }, { label: "Render", n: "87%", fill: 87 }].map(({ label, n, fill }) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: "var(--ink-soft)", marginBottom: 8 }}>
                    <span>{label}</span><span style={{ color: "var(--indigo)" }}>{n}</span>
                  </div>
                  <div style={{ height: 9, borderRadius: 999, background: "#eef0fa", overflow: "hidden" }}>
                    <div className="perf-fill" data-fill={fill} />
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ background: "var(--grad-3)", color: "#fff", borderRadius: 28, padding: 32, boxShadow: "var(--shadow-card)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 10%, rgba(255,255,255,.22), transparent 55%)" }} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,.7)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6, position: "relative" }}>Note</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 20, position: "relative" }}>Made for people, not just specs</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(255,255,255,.85)", marginBottom: 20, position: "relative" }}>Every screen is designed to be simple to use — clear, responsive, and accessible by default.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto", position: "relative" }}>
                {["Accessible", "Responsive", "Intuitive"].map(tag => (
                  <span key={tag} style={{ fontSize: 12, fontWeight: 600, padding: "7px 13px", borderRadius: 999, background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.28)" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" style={{ padding: "88px 0" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "start" }}>
            <div className="reveal">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--indigo)", marginBottom: 12 }}>
                <span style={{ width: 16, height: 2, background: "var(--grad-1)", borderRadius: 2 }} />
                About us
              </div>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(24px,3vw,32px)", marginBottom: 18, letterSpacing: "-.01em" }}>A team that ships, not just designs</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: 16, maxWidth: 480 }}>We build software that solves real problems — pairing <strong style={{ color: "var(--ink)", fontWeight: 700 }}>solid engineering</strong> with interfaces people actually enjoy using.</p>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: 26, maxWidth: 480 }}>We work across the stack: full development, cloud infrastructure, and the broader work of moving a business onto better systems.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ borderRadius: 20, padding: 22, background: "linear-gradient(160deg,#F1EEFF,#F8F6FF)", border: "1px solid #E3DEFF" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 13.5, color: "var(--indigo)", marginBottom: 8 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 9, background: "var(--grad-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" stroke="#fff" strokeWidth="1.8" /><circle cx="12" cy="12" r="2.6" fill="#fff" /></svg>
                    </span>
                    Our Vision
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>Software good enough that businesses reach for us first when they need to build something that matters.</p>
                </div>
                <div style={{ borderRadius: 20, padding: 22, background: "linear-gradient(160deg,#E8FBFC,#F5FEFF)", border: "1px solid #D3F3F5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 13.5, color: "#0891A8", marginBottom: 8 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 9, background: "var(--grad-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#fff" /></svg>
                    </span>
                    Our Mission
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>Ship applications that are reliable, easy to use, and worth what they cost.</p>
                </div>
              </div>
            </div>

            <div className="reveal" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 28, padding: "34px 26px", boxShadow: "var(--shadow-card)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-mute)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6 }}>Measured continuously</div>
              <div style={{ fontWeight: 700, fontSize: 20 }}>Secure &amp; Reliable</div>
              <div style={{ position: "relative", width: 150, height: 150, margin: "16px auto 18px" }}>
                <svg viewBox="0 0 140 140" width="150" height="150">
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                  <circle cx="70" cy="70" r="60" fill="none" stroke="#eef0fa" strokeWidth="12" />
                  <circle className="ring-fill" cx="70" cy="70" r="60" data-offset="0.4" style={{ transform: "rotate(-90deg)", transformOrigin: "70px 70px" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div className="count-up" data-target="99.9" data-decimals="1" style={{ fontWeight: 700, fontSize: 26, color: "var(--ink)" }}>0.0</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: ".06em", textTransform: "uppercase", marginTop: 2 }}>% Uptime</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-mute)" }}>Enterprise-grade security, always on.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Why Choose Us ── */}
      <section id="why-us" style={{ padding: "88px 0" }}>
        <div className="page-container" style={{ background: "var(--violet-dark)", position: "relative", overflow: "hidden", borderRadius: 40, padding: "64px 48px" }}>
          <div style={{ position: "absolute", width: 340, height: 340, background: "radial-gradient(circle,#7C74F5,transparent 70%)", top: -100, right: -60, borderRadius: "50%", filter: "blur(70px)", opacity: .35, pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 280, height: 280, background: "radial-gradient(circle,#06B6D4,transparent 70%)", bottom: -100, left: -40, borderRadius: "50%", filter: "blur(70px)", opacity: .35, pointerEvents: "none" }} />
          <div className="reveal" style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: "#B9B2F0", marginBottom: 12 }}>
                <span style={{ width: 16, height: 2, background: "var(--grad-2)", borderRadius: 2 }} />
                Why choose us
              </div>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(24px,3vw,34px)", color: "#fff", letterSpacing: "-.01em" }}>Built for the modern enterprise</h2>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#B9B2F0", border: "1px solid rgba(185,178,240,.3)", borderRadius: 999, padding: "7px 14px" }}>3 reasons, 1 platform</span>
          </div>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, position: "relative" }}>
            {[
              { title: "Fast Performance", desc: "Lightning-fast load times and responsive interactions, measured on every build.", bg: "var(--grad-2)" },
              { title: "Secure & Reliable", desc: "Enterprise-grade security with a 99.9% uptime guarantee behind it.", bg: "var(--grad-1)" },
              { title: "User-Friendly", desc: "An interface designed around how people actually work, not around the system.", bg: "linear-gradient(120deg,#06B6D4,#10B981)" },
            ].map(({ title, desc, bg }) => (
              <div key={title} className="why-card reveal" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: 26, transition: "transform .25s ease, background .25s ease" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#fff" /></svg>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: "#fff", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#BEB9E8" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <div className="page-container" style={{ padding: "0 40px 88px" }}>
        <div id="cta" className="reveal" style={{ background: "var(--grad-3)", borderRadius: 28, padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.25), transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,255,255,.18), transparent 45%)" }} />
          <h2 style={{ position: "relative", fontWeight: 700, fontSize: "clamp(24px,3.4vw,36px)", color: "#fff", marginBottom: 14, letterSpacing: "-.01em" }}>Ready to bring your idea to life?</h2>
          <p style={{ position: "relative", color: "rgba(255,255,255,.88)", fontSize: 15.5, marginBottom: 28 }}>See the Innovation Hub in action — no lengthy setup, just a working prototype.</p>
          {/* CTA Get started button — uses Button's built-in "light" variant */}
          <div style={{ position: "relative" }}>
            <Button variant="light" shape="pill" size="lg" onClick={() => navigate("/login")}>
              Get started →
            </Button>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ padding: "56px 0 40px" }}>
        <div className="page-container" style={{ padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={logo} alt="PMRG Solution" style={{ height: 28, width: "auto" }} />
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>© 2026 PMRG Solution. All rights reserved.</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;