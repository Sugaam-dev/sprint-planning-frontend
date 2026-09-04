import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import AuthBand from "./AuthBand";

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-body">
      {/* Band */}
      <AuthBand headline={<>Welcome back.<br />Let's get you in.</>} />

      {/* Sheet */}
      <div className="auth-sheet-wrap">
        <div className="auth-sheet">
          <div className="auth-eyebrow">Account</div>
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-subtitle">Enter your details to access your workspace.</p>

          {/* Email */}
          <div className="auth-field">
            <div className="auth-input-wrap">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email address</label>
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <div className="auth-input-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <button className="toggle-eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div className="auth-row-between">
            <label className="auth-checkbox-line">
              <input type="checkbox" /> Remember me
            </label>
            <span className="auth-link" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </span>
          </div>

          {/* Sign in button */}
          <button className="auth-btn-primary" onClick={() => navigate("/dashboard")}>
            Sign in <span>→</span>
          </button>

          <div className="auth-divider">or continue with</div>

          <div className="auth-socials">
            <button className="auth-btn-social">Google</button>
            <button className="auth-btn-social">GitHub</button>
          </div>
        </div>

        <div className="auth-foot">© 2026 PMRG Solution</div>
      </div>
    </div>
  );
};

export default Login;