import React from "react";

/**
 * The gradient header band shared by every auth page (Login, SignUp,
 * ForgotPassword, ResetPassword). Only the headline/sub text differs
 * per page — everything else (logo, brand name, decorative glow/grid)
 * was previously copy-pasted into all four files.
 */
const AuthBand = ({ headline, sub }) => (
  <div className="auth-band">
    <div className="band-glow-auth" />
    <div className="band-grid-auth" />
    <div style={{ position: "relative", zIndex: 3, maxWidth: 1120, margin: "0 auto" }}>
      <div className="auth-brand">
        {/* Logo placeholder — replace with <img src="/logo.png" .../> when sir sends it */}
        <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="auth-brand-name">PMRG Solution</span>
      </div>
      <h2 className="auth-headline">{headline}</h2>
      {sub && <p className="auth-sub">{sub}</p>}
    </div>
  </div>
);

export default AuthBand;