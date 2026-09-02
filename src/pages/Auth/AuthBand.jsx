import React from "react";
import logo from "../../assets/logo-transparent.png";

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
      <div className="auth-brand" style={{ justifyContent: "flex-start" }}>
        <img src={logo} alt="PMRG Solution" style={{ height: 40, width: "auto" }} />
      </div>
      <h2 className="auth-headline">{headline}</h2>
      {sub && <p className="auth-sub">{sub}</p>}
    </div>
  </div>
);

export default AuthBand;