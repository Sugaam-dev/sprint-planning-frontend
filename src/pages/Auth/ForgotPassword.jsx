import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import AuthBand from "./AuthBand";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (email) setSent(true);
  };

  return (
    <div className="auth-body">
      <AuthBand headline={<>Locked out?<br />We'll fix that.</>} sub="We'll email you a secure link to choose a new password." />

      <div className="auth-sheet-wrap">
        <div className="auth-sheet">
          <span className="auth-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgba(26,26,46,0.58)", marginBottom: 16, cursor: "pointer" }} onClick={() => navigate("/login")}>
            ← Back to sign in
          </span>

          <div className="auth-eyebrow">Reset access</div>
          <h1 className="auth-title">Forgot your password?</h1>
          <p className="auth-subtitle">Enter the email linked to your account — we'll send a link to reset it.</p>

          {sent ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#9333EA)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Reset link sent!</div>
              <p style={{ fontSize: 14, color: "rgba(26,26,46,0.58)", marginBottom: 24 }}>Check your email at <strong style={{ color: "#1A1A2E" }}>{email}</strong></p>
              <button className="auth-btn-primary" onClick={() => navigate("/login")}>Back to sign in →</button>
            </div>
          ) : (
            <>
              <div className="auth-field">
                <div className="auth-input-wrap">
                  <input type="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label>Email address</label>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <button className="auth-btn-primary" onClick={handleSubmit}>Send reset link →</button>
              </div>
              <div className="auth-switch-line">
                Remembered it? <span className="auth-link" onClick={() => navigate("/login")}>Sign in</span>
              </div>
            </>
          )}
        </div>
        <div className="auth-foot">© 2026 PMRG Solution</div>
      </div>
    </div>
  );
};

export default ForgotPassword;