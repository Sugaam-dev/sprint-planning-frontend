import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import AuthBand from "./AuthBand";
import { scorePassword, PASSWORD_STRENGTH_COLORS, PASSWORD_STRENGTH_LABELS } from "../../utils/validation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const score = scorePassword(password);

  return (
    <div className="auth-body">
      <AuthBand headline={<>Set a new<br />password.</>} sub="Choose a strong password to secure your account." />

      <div className="auth-sheet-wrap">
        <div className="auth-sheet">
          <div className="auth-eyebrow">New password</div>
          <h1 className="auth-title">Reset your password</h1>
          <p className="auth-subtitle">Enter and confirm your new password below.</p>

          {/* New password */}
          <div className="auth-field">
            <div className="auth-input-wrap">
              <input type={showPass ? "text" : "password"} placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>New password</label>
              <button className="toggle-eye-btn" onClick={() => setShowPass(!showPass)}>{showPass ? "Hide" : "Show"}</button>
            </div>
            {/* Strength bars */}
            <div style={{ display: "flex", gap: 5, marginTop: 9 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: 4, flex: 1, borderRadius: 3, background: i < score ? PASSWORD_STRENGTH_COLORS[score - 1] : "rgba(37,99,235,0.16)", transition: "background .25s ease" }} />
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: "rgba(26,26,46,0.58)", marginTop: 6 }}>
              {password.length ? PASSWORD_STRENGTH_LABELS[score] : PASSWORD_STRENGTH_LABELS[0]}
            </div>
          </div>

          {/* Confirm password */}
          <div className="auth-field">
            <div className="auth-input-wrap">
              <input type={showConfirm ? "text" : "password"} placeholder=" " value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              <label>Confirm password</label>
              <button className="toggle-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? "Hide" : "Show"}</button>
            </div>
            {confirm && password !== confirm && (
              <div style={{ fontSize: 12, color: "#DC2626", marginTop: 6 }}>Passwords do not match</div>
            )}
          </div>

          <div style={{ marginTop: 8 }}>
            <button className="auth-btn-primary" onClick={() => { if (password === confirm && score >= 2) navigate("/login"); }}>
              Reset password →
            </button>
          </div>

          <div className="auth-switch-line">
            Remembered it? <span className="auth-link" onClick={() => navigate("/login")}>Sign in</span>
          </div>
        </div>
        <div className="auth-foot">© 2026 PMRG Solution</div>
      </div>
    </div>
  );
};

export default ResetPassword;