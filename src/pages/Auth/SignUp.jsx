import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import AuthBand from "./AuthBand";
import { scorePassword, PASSWORD_STRENGTH_COLORS, PASSWORD_STRENGTH_LABELS } from "../../utils/validation";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

const SignUp = () => {
  const navigate = useNavigate();

  // step: "form" (create account) -> "otp" (verify email), both on this one page
  const [step, setStep] = useState("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const otpRefs = useRef([]);

  const score = scorePassword(password);

  useEffect(() => {
    if (step !== "otp" || seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [step, seconds]);

  const handleCreateAccount = () => {
    if (!name || !email || !password || !agree) return;
    setStep("otp");
    setSeconds(RESEND_SECONDS);
  };

  const handleOtpChange = (index) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index) => (e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (digits.every((d) => d !== "")) navigate("/login");
  };

  return (
    <div className="auth-body">
      <AuthBand
        headline={
          step === "form" ? <>Let's build<br />your workspace.</> : <>Almost there —<br />one code left.</>
        }
        sub={
          step === "form"
            ? "A few details and you're in. It only takes a minute."
            : "Confirm it's really you and we'll finish setting things up."
        }
      />

      <div className="auth-sheet-wrap">
        <div className="auth-sheet">
          {step === "form" ? (
            <>
              <div className="auth-eyebrow">Account</div>
              <h1 className="auth-title">Create your account</h1>
              <p className="auth-subtitle">Start your workspace in under a minute.</p>

              <div className="auth-field">
                <div className="auth-input-wrap">
                  <input type="text" placeholder=" " value={name} onChange={(e) => setName(e.target.value)} />
                  <label>Full name</label>
                </div>
              </div>

              <div className="auth-field">
                <div className="auth-input-wrap">
                  <input type="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label>Email address</label>
                </div>
              </div>

              <div className="auth-field">
                <div className="auth-input-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                  <button type="button" className="toggle-eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 9 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        height: 4,
                        flex: 1,
                        borderRadius: 3,
                        background: password.length && i < score ? PASSWORD_STRENGTH_COLORS[score - 1] : "rgba(37,99,235,0.16)",
                        transition: "background .25s ease",
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: "rgba(26,26,46,0.58)", marginTop: 6 }}>
                  {password.length ? PASSWORD_STRENGTH_LABELS[score] : PASSWORD_STRENGTH_LABELS[0]}
                </div>
              </div>

              <label className="auth-checkbox-line" style={{ alignItems: "flex-start", margin: "4px 0 20px" }}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 2 }} />
                <span>
                  I agree to the <span className="auth-link">Terms</span> &amp; <span className="auth-link">Privacy Policy</span>
                </span>
              </label>

              <button className="auth-btn-primary" onClick={handleCreateAccount}>
                Create account <span>→</span>
              </button>

              <div className="auth-divider">or continue with</div>

              <div className="auth-socials">
                <button className="auth-btn-social">Google</button>
                <button className="auth-btn-social">GitHub</button>
              </div>

              <div className="auth-switch-line">
                Already have an account?{" "}
                <span className="auth-link" onClick={() => navigate("/login")}>Sign in</span>
              </div>
            </>
          ) : (
            <>
              <span
                className="auth-link"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgba(26,26,46,0.58)", marginBottom: 16, cursor: "pointer" }}
                onClick={() => setStep("form")}
              >
                ← Back
              </span>

              <div className="auth-eyebrow">Verification</div>
              <h1 className="auth-title">Verify your email</h1>
              <p className="auth-subtitle">
                We sent a 6-digit code to <strong style={{ color: "#1A1A2E" }}>{email || "your email"}</strong>. Enter it below.
              </p>

              <div style={{ display: "flex", gap: 10 }}>
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={handleOtpChange(i)}
                    onKeyDown={handleOtpKeyDown(i)}
                    className="otp-box"
                  />
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "rgba(26,26,46,0.58)", margin: "18px 0 20px" }}>
                {seconds > 0 ? <span>Code expires in 0:{String(seconds).padStart(2, "0")}</span> : <span />}
                <span
                  className="auth-link"
                  style={seconds > 0 ? { color: "rgba(26,26,46,0.35)", cursor: "default", textDecoration: "none" } : undefined}
                  onClick={() => {
                    if (seconds <= 0) setSeconds(RESEND_SECONDS);
                  }}
                >
                  Resend code
                </span>
              </div>

              <button className="auth-btn-primary" onClick={handleVerify}>
                Verify &amp; continue <span>→</span>
              </button>
            </>
          )}
        </div>
        <div className="auth-foot">© 2026 PMRG Solution</div>
      </div>
    </div>
  );
};

export default SignUp;