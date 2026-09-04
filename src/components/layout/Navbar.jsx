import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Icons = {
  Menu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  Bell: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  ChevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>,
  User: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M2 12h2M20 12h2"/></svg>,
  LogOut: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

const Navbar = ({ pageTitle = "", onMenuClick }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);

  const iconBtnStyle = {
    background: "#F1F4FB", border: "1px solid #E3E7F5", borderRadius: 9,
    width: 36, height: 36, display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", color: "#686D80",
  };

  return (
    <header style={{
      height: 60, background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(10px)", borderBottom: "1px solid #E3E7F5",
      display: "flex", alignItems: "center", padding: "0 24px",
      gap: 16, position: "sticky", top: 0, zIndex: 30, flexShrink: 0,
    }}>
      <button onClick={onMenuClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#686D80", display: "flex", alignItems: "center" }}>
        <Icons.Menu />
      </button>

      <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: "#1A1A2E" }}>
        {pageTitle}
      </span>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <button style={iconBtnStyle}><Icons.Search /></button>

      {/* Bell */}
      <div style={{ position: "relative" }}>
        <button onClick={() => { setBellOpen(!bellOpen); setProfileOpen(false); }} style={{ ...iconBtnStyle, position: "relative" }}>
          <Icons.Bell />
          <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: "#DC2626", border: "2px solid #fff" }} />
        </button>
        {bellOpen && (
          <div style={{ position: "absolute", right: 0, top: 44, width: 300, background: "#fff", border: "1px solid #E3E7F5", borderRadius: 14, boxShadow: "0 16px 36px -10px rgba(124,58,237,0.2)", zIndex: 50, padding: "12px 0" }}>
            <div style={{ padding: "0 16px 10px", fontWeight: 700, fontSize: 13, color: "#1A1A2E", borderBottom: "1px solid #E3E7F5" }}>Notifications</div>
            {/* Notifications will come from backend */}
            <div style={{ padding: "16px", fontSize: 13, color: "#9599AC", textAlign: "center" }}>No new notifications</div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => { setProfileOpen(!profileOpen); setBellOpen(false); }}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "#F1F4FB", border: "1px solid #E3E7F5", borderRadius: 10, padding: "6px 12px 6px 8px", cursor: "pointer" }}
        >
          {/* Avatar initials — will come from backend user context */}
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#9333EA)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>
            PM
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1A1A2E", lineHeight: 1.2 }}>Admin</div>
            <div style={{ fontSize: 11, color: "#9599AC" }}>Project Manager</div>
          </div>
          <Icons.ChevronDown />
        </button>

        {profileOpen && (
          <div style={{ position: "absolute", right: 0, top: 50, width: 180, background: "#fff", border: "1px solid #E3E7F5", borderRadius: 12, boxShadow: "0 16px 36px -10px rgba(124,58,237,0.2)", zIndex: 50, padding: "6px" }}>
            {[
              { label: "My Profile", Icon: Icons.User,     action: () => {} },
              { label: "Settings",   Icon: Icons.Settings,  action: () => navigate("/settings") },
              { label: "Log out",    Icon: Icons.LogOut,    action: () => navigate("/login") },
            ].map(({ label, Icon, action }) => (
              <button
                key={label}
                onClick={action}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 8, border: "none", background: "none", cursor: "pointer", fontSize: 13.5, color: label === "Log out" ? "#DC2626" : "#1A1A2E", fontWeight: 500, textAlign: "left" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F1F4FB"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;