import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoTransparent from "../../assets/logo-transparent.png";

const Icons = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  Projects: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  Features: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  UserStories: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  Acceptance: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  Validation: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h10m0-11v11m0 0a2 2 0 01-2 2H7a2 2 0 01-2-2"/></svg>,
  Output: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M2 12h2M20 12h2"/></svg>,
  Collapse: (props) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: props.open ? "rotate(0deg)" : "rotate(180deg)", transition: "transform .25s ease" }}><path d="M15 18l-6-6 6-6"/></svg>,
};

const NAV_ITEMS = [
  { label: "Dashboard",           Icon: Icons.Dashboard,   path: "/dashboard" },
  { label: "Projects",            Icon: Icons.Projects,    path: "/projects" },
  { label: "Feature Extraction",  Icon: Icons.Features,    path: "/workflow/features" },
  { label: "User Stories",        Icon: Icons.UserStories, path: "/workflow/user-stories" },
  { label: "Acceptance Criteria", Icon: Icons.Acceptance,  path: "/workflow/acceptance-criteria" },
  { label: "Validation",          Icon: Icons.Validation,  path: "/workflow/validation" },
  { label: "Output",              Icon: Icons.Output,      path: "/workflow/output" },
  { label: "Users",               Icon: Icons.Users,       path: "/users" },
  { label: "Settings",            Icon: Icons.Settings,    path: "/settings" },
];

const Sidebar = ({ open, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside style={{
      width: open ? 240 : 68,
      minHeight: "100vh",
      background: "#fff",
      borderRight: "1px solid #E3E7F5",
      display: "flex",
      flexDirection: "column",
      transition: "width .25s ease",
      overflow: "hidden",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      alignSelf: "flex-start",
      height: "100vh",
    }}>
      {/* Logo */}
      <div style={{ padding: open ? "20px 20px 16px" : "20px 14px 16px", display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
        <img src={logoTransparent} alt="PMRG" style={{ height: 32, width: "auto", flexShrink: 0 }} />
        {open && (
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", background: "linear-gradient(135deg,#2563EB,#9333EA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            PMRG Solution
          </span>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ label, Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              title={!open ? label : ""}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: open ? "10px 12px" : "10px",
                borderRadius: 10, border: "none", cursor: "pointer",
                background: active ? "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(147,51,234,0.08))" : "transparent",
                color: active ? "#2563EB" : "#686D80",
                fontWeight: active ? 600 : 500,
                fontSize: 13.5,
                textAlign: "left",
                width: "100%",
                transition: "all .18s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                justifyContent: open ? "flex-start" : "center",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#F1F4FB"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ flexShrink: 0, color: active ? "#2563EB" : "#9599AC" }}>
                <Icon />
              </span>
              {open && label}
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={onCollapse}
        style={{
          margin: "12px 10px", padding: "10px 12px",
          borderRadius: 10, border: "1px solid #E3E7F5",
          background: "#F8F9FE", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 13, color: "#686D80", fontWeight: 500,
          justifyContent: open ? "flex-start" : "center",
        }}
      >
        <Icons.Collapse open={open} />
        {open && "Collapse"}
      </button>
    </aside>
  );
};

export default Sidebar;