import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

/* ══ SVG Icons ══ */
const I = {
  Menu:     ()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Search:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  Plus:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  List:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Kanban:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="11" rx="1"/><rect x="17" y="3" width="5" height="15" rx="1"/></svg>,
  Back:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  ChevRight:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>,
  Comment:  ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  User:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevD:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>,
  X:        ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Warning:  ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Check:    ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  Bolt:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Dots:     ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
  Book:     ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  Chart:    ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Star:     ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Target:   ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Bell:     ()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  LogOut:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Gear:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M2 12h2M20 12h2"/></svg>,
  Download: ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>,
  Upload:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21V9m0 0l-4 4m4-4l4 4M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2"/></svg>,
  Edit:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  Eye:      ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Copy:     ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  Trash:    ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/></svg>,
  ArrowR:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
};

/* ══ Config ══ */
const STATUS = {
  todo:     { label:"To Do",       color:"#94A3B8", bg:"#EEF1F5", dark:"#64748B" },
  progress: { label:"In Progress", color:"#F5A524", bg:"#FFF3DC", dark:"#B45309" },
  review:   { label:"In Review",   color:"#8B5CF6", bg:"#F1EBFE", dark:"#6D28D9" },
  done:     { label:"Done",        color:"#10B981", bg:"#DEF7EC", dark:"#0F7A54" },
  backlog:  { label:"Backlog",     color:"#FF5A36", bg:"#FFE7DE", dark:"#C2410C" },
};
const PRIORITIES = ["Critical","High","Medium","Low"];
const COLS = ["todo","progress","review","done"];
const POINTS = [1,2,3,5,8,13];
const PAGE_SIZE = 12;
const COLUMN_PAGE_SIZE = 6;

/* Sample notifications for the bell dropdown (hardcoded per current requirements) */
const NOTIFICATIONS = [
  { id:1, color:"#3B82F6", bg:"#E3ECFE", Icon:I.Comment, text:"Sanjay Sir commented on STORY-201", time:"12 minutes ago" },
  { id:2, color:"#10B981", bg:"#DEF7EC", Icon:I.Check,   text:"STORY-402 moved to Done",            time:"1 hour ago" },
  { id:3, color:"#F59E0B", bg:"#FFF3DC", Icon:I.Warning, text:"STORY-305 needs your review",        time:"Yesterday" },
];

/* Responsive rules — real @media queries, which inline style={{}} can't do. */
const responsiveStyles = `
  @media (max-width: 900px) {
    .usr-detail-grid { grid-template-columns: 1fr !important; }
    .usr-list-header, .usr-list-row { grid-template-columns: 90px 1fr 90px 120px !important; }
    .usr-list-col-assignee, .usr-list-col-comments { display: none !important; }
  }
  @media (max-width: 880px) {
    .usr-sidebar { width: 72px !important; padding: 22px 10px !important; }
    .usr-sidebar-label { display: none !important; }
    .usr-navbar-name { display: none !important; }
  }
  @media (max-width: 760px) {
    .usr-toolbar-row { flex-direction: column !important; align-items: stretch !important; }
    .usr-toolbar-row > * { width: 100% !important; }
    .usr-toolbar-actions { flex-direction: row !important; justify-content: flex-end !important; }
    .usr-pipeline-head { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; }
    .usr-pipeline-head > div:last-child { text-align: left !important; }
  }
  @media (max-width: 700px) {
    .usr-backlog-stats { grid-template-columns: repeat(2, 1fr) !important; }
    .usr-footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 560px) {
    .usr-list-header, .usr-list-row { grid-template-columns: 70px 1fr 90px !important; }
    .usr-list-col-epic { display: none !important; }
  }
  @media (max-width: 480px) {
    .usr-backlog-stats { grid-template-columns: 1fr !important; }
    .usr-footer-grid { grid-template-columns: 1fr !important; }
    .usr-detail-header { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
  }
`;

/* ══ Sidebar ══ */
const NAV = [
  { label:"Dashboard",           path:"/dashboard",                    d:"M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3z" },
  { label:"Projects",            path:"/projects",                     d:"M3 3h18v18H3zM3 9h18M9 21V9" },
  { label:"Feature Extraction",  path:"/workflow/features",            d:"M12 2L2 7l10 5 10-5-10-5M2 17l10 5 10-5M2 12l10 5 10-5" },
  { label:"User Stories",        path:"/workflow/user-stories",        d:"M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" },
  { label:"Acceptance Criteria", path:"/workflow/acceptance-criteria", d:"M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" },
  { label:"Validation",          path:"/workflow/validation",          d:"M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" },
  { label:"Output",              path:"/workflow/output",              d:"M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" },
  { label:"Users",               path:"/users",                       d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z" },
  { label:"Settings",            path:"/settings",                    d:"M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v2M12 20v2M4.22 4.22l1.42 1.42" },
];

const Sidebar = ({ open, onCollapse }) => {
  const navigate = useNavigate();
  const loc = window.location.pathname;
  return (
    <aside className="usr-sidebar" style={{ width:open?236:72, minHeight:"100vh", background:"#14171F", display:"flex", flexDirection:"column", padding:open?"22px 14px":"22px 10px", transition:"width .25s ease", overflow:"hidden", flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 8px 24px", overflow:"hidden" }}>
        <div style={{ width:32, height:32, borderRadius:8, background:"#FF5A36", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, fontWeight:700 }}>P</div>
        {open && <span className="usr-sidebar-label" style={{ fontWeight:700, fontSize:17, color:"#fff", whiteSpace:"nowrap" }}>PMRG</span>}
      </div>
      <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
        {NAV.map(({ label, path, d }) => {
          const active = loc === path;
          return (
            <button key={path} onClick={() => navigate(path)} title={!open ? label : ""}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:9, border:"none", background:active?"rgba(255,90,54,0.15)":"transparent", color:active?"#FF5A36":"#9CA0B8", fontWeight:active?600:500, fontSize:13.5, cursor:"pointer", textAlign:"left", width:"100%", whiteSpace:"nowrap", overflow:"hidden", justifyContent:open?"flex-start":"center", transition:"all .15s ease" }}
              onMouseEnter={e => { if(!active){e.currentTarget.style.background="#1E2230"; e.currentTarget.style.color="#fff";}}}
              onMouseLeave={e => { if(!active){e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#9CA0B8";}}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d={d}/></svg>
              {open && <span className="usr-sidebar-label">{label}</span>}
            </button>
          );
        })}
      </nav>
      <button onClick={onCollapse} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:9, border:"1px solid rgba(255,255,255,0.08)", background:"transparent", color:"#9CA0B8", fontSize:13, cursor:"pointer", justifyContent:open?"flex-start":"center" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform:open?"rotate(0deg)":"rotate(180deg)", transition:"transform .25s ease" }}><path d="M15 18l-6-6 6-6"/></svg>
        {open && <span className="usr-sidebar-label">Collapse</span>}
      </button>
    </aside>
  );
};

/* ══ Status dot/icon — used on kanban cards + list rows ══ */
const StatusIcon = ({ status, size=14 }) => {
  const s = STATUS[status] || STATUS.todo;
  if (status === "done") {
    return (
      <span style={{ width:size, height:size, borderRadius:"50%", background:s.color, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <svg width={size*0.6} height={size*0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </span>
    );
  }
  if (status === "progress") {
    return <span style={{ width:size, height:size, borderRadius:"50%", background:`conic-gradient(${s.color} 0deg 180deg, transparent 180deg 360deg)`, border:`1.5px solid ${s.color}`, boxSizing:"border-box", flexShrink:0, display:"inline-block" }} />;
  }
  if (status === "review") {
    return (
      <span style={{ width:size, height:size, borderRadius:"50%", border:`1.5px solid ${s.color}`, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span style={{ width:size*0.42, height:size*0.42, borderRadius:"50%", background:s.color }} />
      </span>
    );
  }
  return <span style={{ width:size, height:size, borderRadius:"50%", border:`1.5px solid ${s.color}`, display:"inline-block", flexShrink:0 }} />;
};

/* ══ Badge / Avatar ══ */
const Badge = ({ status }) => {
  const s = STATUS[status] || STATUS.todo;
  return <span style={{ fontSize:11.5, fontWeight:600, color:s.color, background:s.bg, borderRadius:20, padding:"3px 9px", whiteSpace:"nowrap" }}>{s.label}</span>;
};
const PriorityPill = ({ priority }) => {
  if (!priority) return null;
  const color = priority==="Critical"?"#BE123C": priority==="High"?"#D97706": priority==="Medium"?"#1D4ED8":"#64748B";
  const bg    = priority==="Critical"?"#FEE5EA": priority==="High"?"#FFF3DC": priority==="Medium"?"#E3ECFE":"#EEF1F5";
  return <span style={{ fontSize:11, fontWeight:700, color, background:bg, borderRadius:20, padding:"2px 8px", textTransform:"uppercase", letterSpacing:".02em" }}>{priority}</span>;
};
const Avatar = ({ name, size=22 }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background:"linear-gradient(135deg,#FF5A36,#FF8C69)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.38, fontWeight:700, color:"#fff", flexShrink:0 }}>
    {name ? name.slice(0,2).toUpperCase() : "—"}
  </div>
);

/* ══ Top bar — search / notifications / profile (shared across board, list & backlog pages) ══ */
const TopBar = ({ title, onMenuClick, rightExtra }) => {
  const navigate = useNavigate();
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const iconBtn = { background:"#fff", border:"1px solid #E4E2D9", borderRadius:9, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#4A4E60", flexShrink:0 };

  return (
    <header style={{ height:56, background:"rgba(244,243,238,0.9)", backdropFilter:"blur(8px)", borderBottom:"1px solid #E4E2D9", display:"flex", alignItems:"center", padding:"0 22px", gap:14, position:"sticky", top:0, zIndex:30, flexShrink:0 }}>
      <button onClick={onMenuClick} style={{ background:"none", border:"none", cursor:"pointer", color:"#4A4E60" }}><I.Menu /></button>
      <span style={{ fontWeight:700, fontSize:15, color:"#12141C" }}>{title}</span>
      <div style={{ flex:1 }} />
      {rightExtra}

      <button style={iconBtn}><I.Search /></button>

      <div style={{ position:"relative" }}>
        <button onClick={()=>{ setBellOpen(v=>!v); setProfileOpen(false); }} style={{ ...iconBtn, position:"relative" }}>
          <I.Bell />
          {NOTIFICATIONS.length>0 && <span style={{ position:"absolute", top:5, right:5, width:8, height:8, borderRadius:"50%", background:"#DC2626", border:"2px solid #F4F3EE" }} />}
        </button>
        {(bellOpen || profileOpen) && <div onClick={()=>{ setBellOpen(false); setProfileOpen(false); }} style={{ position:"fixed", inset:0, zIndex:39 }} />}
        {bellOpen && (
          <div style={{ position:"absolute", right:0, top:42, width:300, background:"#fff", border:"1px solid #E4E2D9", borderRadius:14, boxShadow:"0 16px 36px -10px rgba(18,20,28,0.25)", zIndex:40, padding:"10px 0" }}>
            <div style={{ padding:"0 16px 10px", fontWeight:700, fontSize:13, color:"#12141C", borderBottom:"1px solid #F0EFE9" }}>Notifications</div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} style={{ display:"flex", gap:10, padding:"10px 16px", cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.background="#F8F7F3"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <span style={{ width:26, height:26, borderRadius:8, background:n.bg, color:n.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><n.Icon /></span>
                <div>
                  <div style={{ fontSize:13, color:"#12141C", lineHeight:1.4 }}>{n.text}</div>
                  <div style={{ fontSize:11, color:"#9CA0B8", marginTop:2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ position:"relative" }}>
        <button onClick={()=>{ setProfileOpen(v=>!v); setBellOpen(false); }} style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #E4E2D9", borderRadius:10, padding:"5px 10px 5px 6px", cursor:"pointer" }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#FF5A36,#FF8C69)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:700 }}>DG</div>
          <div className="usr-navbar-name" style={{ textAlign:"left" }}>
            <div style={{ fontSize:12.5, fontWeight:600, color:"#1A1A2E", lineHeight:1.2 }}>Dhurjoti G</div>
            <div style={{ fontSize:11, color:"#9CA0B8" }}>Project Manager</div>
          </div>
          <I.ChevD />
        </button>
        {profileOpen && (
          <div style={{ position:"absolute", right:0, top:46, width:180, background:"#fff", border:"1px solid #E4E2D9", borderRadius:12, boxShadow:"0 16px 36px -10px rgba(18,20,28,0.25)", zIndex:40, padding:6 }}>
            {[
              { label:"My Profile", Icon:I.User,   action:()=>{} },
              { label:"Settings",   Icon:I.Gear,   action:()=>navigate("/settings") },
              { label:"Log out",    Icon:I.LogOut, action:()=>navigate("/login") },
            ].map(({label,Icon,action}) => (
              <button key={label} onClick={action} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 12px", borderRadius:8, border:"none", background:"none", cursor:"pointer", fontSize:13.5, color:label==="Log out"?"#DC2626":"#1A1A2E", fontWeight:500, textAlign:"left" }}
                onMouseEnter={e=>e.currentTarget.style.background="#F8F7F3"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <Icon /> {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

/* ══ Pipeline summary bar — "N stories in the pipeline" ══ */
const PipelineBar = ({ stories }) => {
  const [hoverSeg, setHoverSeg] = useState(null);
  const workflowStories = stories.filter(s => s.status !== "backlog");
  const total = workflowStories.length;
  const segments = COLS.map(col => ({ key:col, count: workflowStories.filter(s=>s.status===col).length }));
  const done = segments.find(s=>s.key==="done")?.count || 0;
  const shippedPct = total ? Math.round((done/total)*100) : 0;

  const positionedSegments = segments.reduce((acc, seg) => {
    const pct = total ? (seg.count / total) * 100 : 0;
    const left = acc.length ? acc[acc.length - 1].left + acc[acc.length - 1].pct : 0;
    return [...acc, { ...seg, pct, left }];
  }, []);
  const hovered = positionedSegments.find(s => s.key === hoverSeg);

  return (
    <div style={{ background:"linear-gradient(135deg,#181A24,#0D0F16)", borderRadius:16, padding:"18px 24px", marginBottom:16 }}>
      <div className="usr-pipeline-head" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <div style={{ fontSize:30, fontWeight:800, color:"#fff", lineHeight:1 }}>{total}</div>
          <div style={{ fontSize:12.5, color:"#9CA0B8", marginTop:4 }}>stories in the pipeline</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:20, fontWeight:800, color:"#4ADE80" }}>{shippedPct}%</div>
          <div style={{ fontSize:11.5, color:"#9CA0B8" }}>shipped to Done</div>
        </div>
      </div>
      <div style={{ position:"relative" }}>
        <div style={{ display:"flex", height:8, borderRadius:8, overflow:"hidden", background:"#262A38" }}>
          {positionedSegments.map(seg => {
            if (!seg.pct) return null;
            return (
              <div key={seg.key}
                onMouseEnter={()=>setHoverSeg(seg.key)}
                onMouseLeave={()=>setHoverSeg(null)}
                style={{ width:`${seg.pct}%`, background:STATUS[seg.key].color, cursor:"pointer" }}
              />
            );
          })}
        </div>
        {/* Rendered as a sibling of the overflow:hidden bar above (not a child of a
            segment div) so the tooltip isn't clipped by that bar's rounded corners. */}
        {hovered && (
          <div style={{ position:"absolute", bottom:"calc(100% + 8px)", left:`${hovered.left + hovered.pct / 2}%`, transform:"translateX(-50%)", background:"#0D0F16", border:"1px solid #2E3242", borderRadius:9, padding:"7px 12px", whiteSpace:"nowrap", fontSize:12, fontWeight:600, color:"#fff", display:"flex", alignItems:"center", gap:6, zIndex:20, boxShadow:"0 10px 24px -8px rgba(0,0,0,0.5)" }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:STATUS[hovered.key].color }} />
            {hovered.count} {STATUS[hovered.key].label} <span style={{ color:"#9CA0B8", fontWeight:500 }}>{Math.round(hovered.pct)}%</span>
          </div>
        )}
        <div style={{ position:"absolute", left:-2, top:"50%", transform:"translateY(-50%)", width:14, height:14, borderRadius:"50%", background:"#fff", border:"3px solid #14171F" }} />
      </div>
    </div>
  );
};

/* ══ Story Card (Kanban) ══ */
const StoryCard = ({ story, onDragStart, onDragEnd, onClick, menuOpenId, setMenuOpenId, onMenuAction }) => {
  const menuOpen = menuOpenId === story.id;
  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, story.id)}
      onDragEnd={onDragEnd}
      onClick={() => onClick(story.id)}
      style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:12, padding:"14px 16px", cursor:"grab", transition:"box-shadow .18s ease, transform .18s ease", userSelect:"none", position:"relative" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 20px -8px rgba(18,20,28,0.2)"; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform=""; }}
    >
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <StatusIcon status={story.status} size={14} />
          <span style={{ fontFamily:"monospace", fontSize:11, color:"#9CA0B8", fontWeight:600 }}>{story.id||"STORY-—"}</span>
        </div>
        <div style={{ position:"relative" }}>
          <button onClick={e=>{ e.stopPropagation(); setMenuOpenId(menuOpen?null:story.id); }} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA0B8", padding:2, display:"flex" }}>
            <I.Dots />
          </button>
          {menuOpen && <div onClick={e=>{ e.stopPropagation(); setMenuOpenId(null); }} style={{ position:"fixed", inset:0, zIndex:39 }} />}
          {menuOpen && (
            <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", right:0, top:22, width:172, background:"#fff", border:"1px solid #E4E2D9", borderRadius:12, boxShadow:"0 16px 36px -10px rgba(18,20,28,0.25)", zIndex:40, padding:6 }}>
              {[
                { label:"Move to Backlog", action:"backlog" },
                { label:"Archive Story",   action:"archive" },
                { label:"Clone Story",     action:"clone" },
              ].map(opt => (
                <button key={opt.action} onClick={()=>{ onMenuAction(story.id, opt.action); setMenuOpenId(null); }}
                  style={{ display:"block", width:"100%", textAlign:"left", padding:"8px 10px", borderRadius:8, border:"none", background:"none", cursor:"pointer", fontSize:13, color:"#12141C", fontWeight:500 }}
                  onMouseEnter={e=>e.currentTarget.style.background="#F8F7F3"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p style={{ margin:"0 0 10px", fontSize:13.5, fontWeight:600, color:"#12141C", lineHeight:1.45 }}>{story.title||"Untitled"}</p>

      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:10 }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#0F7A54", background:"#DEF7EC", borderRadius:20, padding:"2px 8px" }}>{story.storyPoints||1} SP</span>
        <PriorityPill priority={story.priority} />
      </div>
      {story.epic && <span style={{ display:"inline-block", fontSize:11, fontWeight:600, color:"#1D4ED8", background:"#E3ECFE", borderRadius:20, padding:"2px 8px", marginBottom:10 }}>{story.epic}</span>}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, minWidth:0 }}>
          <Avatar name={story.assignee} size={20} />
          <span style={{ fontSize:12, color:"#4A4E60", fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{story.assignee||"Unassigned"}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4, color:"#9CA0B8", fontSize:12, flexShrink:0 }}>
          <I.Comment /> {story.comments?.length||0}
        </div>
      </div>
    </div>
  );
};

/* ══ Kanban Column ══ */
const KanbanCol = ({ status, stories, totalCount, onDragOver, onDrop, onDragStart, onDragEnd, onCardClick, isDragOver, menuOpenId, setMenuOpenId, onMenuAction, onAddStory }) => {
  const s = STATUS[status];
  return (
    <div style={{ minWidth:260, flex:1, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <div style={{ width:10, height:10, borderRadius:"50%", background:s.color }} />
        <span style={{ fontWeight:700, fontSize:13, color:"#12141C" }}>{s.label}</span>
        <span style={{ marginLeft:"auto", fontSize:11.5, fontWeight:600, color:s.color, background:s.bg, borderRadius:20, padding:"2px 8px" }}>{totalCount ?? stories.length}</span>
      </div>
      <div
        onDragOver={e => { e.preventDefault(); onDragOver(status); }}
        onDrop={e => onDrop(e, status)}
        style={{ background:isDragOver?"#F0F4FF":"#F8F7F3", border:isDragOver?"2px dashed #3B82F6":"1px solid #E4E2D9", borderRadius:12, padding:"12px 10px", minHeight:160, display:"flex", flexDirection:"column", gap:10, flex:1, transition:"all .15s ease" }}
      >
        {stories.length===0
          ? <div style={{ textAlign:"center", padding:"24px 0", color:"#9CA0B8", fontSize:13 }}>No stories</div>
          : stories.map(s => (
            <StoryCard key={s.id} story={s} onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={onCardClick}
              menuOpenId={menuOpenId} setMenuOpenId={setMenuOpenId} onMenuAction={onMenuAction} />
          ))
        }
        <button
          onClick={() => onAddStory(status)}
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"10px 0", borderRadius:10, border:"1.5px dashed #D8D5C9", background:"transparent", color:"#6C7086", fontSize:12.5, fontWeight:600, cursor:"pointer", marginTop:2, transition:"all .15s ease" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="#FF5A36"; e.currentTarget.style.color="#FF5A36"; e.currentTarget.style.background="#FFF5F2"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="#D8D5C9"; e.currentTarget.style.color="#6C7086"; e.currentTarget.style.background="transparent"; }}
        >
          <I.Plus /> Add Story
        </button>
      </div>
    </div>
  );
};

/* ══ List Row ══ */
const ListRow = ({ story, index, onClick }) => {
  const s = STATUS[story.status] || STATUS.todo;
  return (
    <div className="usr-list-row" onClick={() => onClick(story.id)} style={{ display:"grid", gridTemplateColumns:"100px 1fr 120px 130px 150px 100px", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:"1px solid #E4E2D9", background:"#fff", cursor:"pointer", transition:"background .15s" }}
      onMouseEnter={e => e.currentTarget.style.background="#F8F7F3"}
      onMouseLeave={e => e.currentTarget.style.background="#fff"}
    >
      <span style={{ fontFamily:"monospace", fontSize:12, color:"#9CA0B8", fontWeight:600 }}>{story.id||`STORY-${String(index).padStart(3,"0")}`}</span>
      <span style={{ fontSize:13.5, fontWeight:600, color:"#12141C" }}>{story.title||"Untitled"}</span>
      <span className="usr-list-col-epic" style={{ fontSize:12, color:"#1D4ED8", fontWeight:600 }}>{story.epic||"—"}</span>
      <span className="usr-list-col-status" style={{ display:"flex", alignItems:"center", gap:7, fontSize:12.5, fontWeight:600, color:s.color }}>
        <StatusIcon status={story.status} size={13} />{s.label}
      </span>
      <div className="usr-list-col-assignee" style={{ display:"flex", alignItems:"center", gap:6 }}>
        <Avatar name={story.assignee} size={20} /><span style={{ fontSize:12.5, color:"#4A4E60" }}>{story.assignee||"Unassigned"}</span>
      </div>
      <div className="usr-list-col-comments" style={{ display:"flex", alignItems:"center", gap:4, color:"#9CA0B8", fontSize:12 }}><I.Comment />{story.comments?.length||0}</div>
    </div>
  );
};

/* ══ Pagination ══ */
const Pagination = ({ page, totalPages, onChange, showingFrom, showingTo, total, label }) => {
  if (totalPages <= 1) return null;
  const nums = Array.from({ length: totalPages }, (_, i) => i+1).slice(0, 6);
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, padding:"14px 4px" }}>
      <span style={{ fontSize:12.5, color:"#6C7086" }}>{label || <>Showing <b>{showingFrom}</b> to <b>{showingTo}</b> of <b>{total}</b> stories</>}</span>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <button onClick={()=>onChange(Math.max(1,page-1))} disabled={page===1} style={{ width:30, height:30, borderRadius:8, border:"1px solid #E4E2D9", background:"#fff", color:"#4A4E60", cursor:page===1?"default":"pointer", opacity:page===1?0.4:1, display:"flex", alignItems:"center", justifyContent:"center" }}><I.Back /></button>
        {nums.map(n => (
          <button key={n} onClick={()=>onChange(n)} style={{ width:30, height:30, borderRadius:8, border:"1px solid", borderColor:page===n?"#FF5A36":"#E4E2D9", background:page===n?"#FF5A36":"#fff", color:page===n?"#fff":"#4A4E60", fontWeight:700, fontSize:12.5, cursor:"pointer" }}>{n}</button>
        ))}
        <button onClick={()=>onChange(Math.min(totalPages,page+1))} disabled={page===totalPages} style={{ width:30, height:30, borderRadius:8, border:"1px solid #E4E2D9", background:"#fff", color:"#4A4E60", cursor:page===totalPages?"default":"pointer", opacity:page===totalPages?0.4:1, display:"flex", alignItems:"center", justifyContent:"center" }}><I.ChevRight /></button>
      </div>
    </div>
  );
};

/* ══ Story Detail Page ══ */
const StoryDetail = ({ story, onBack, onUpdate }) => {
  const [form, setForm] = useState({ ...story });
  const [comment, setComment] = useState("");
  const set = (k,v) => { const u={...form,[k]:v}; setForm(u); onUpdate(u); };
  const addComment = () => {
    if(!comment.trim()) return;
    const c = { author:"Admin", time:"Just now", text:comment.trim() };
    set("comments", [...(form.comments||[]), c]);
    setComment("");
  };

  const inputStyle = { width:"100%", padding:"9px 12px", borderRadius:9, border:"1.5px solid #E4E2D9", fontSize:13.5, outline:"none", fontFamily:"inherit", color:"#12141C", background:"#F8F7F3", boxSizing:"border-box" };
  const labelStyle = { display:"block", fontSize:11, fontWeight:700, color:"#6C7086", marginBottom:5, textTransform:"uppercase", letterSpacing:".06em" };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"22px 24px" }}>
      <div className="usr-detail-header" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <button onClick={onBack} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:"#6C7086", background:"none", border:"none", cursor:"pointer", fontWeight:500, marginBottom:8, padding:0 }}><I.Back /> Back to Board</button>
          <div style={{ fontSize:12, color:"#1D4ED8", fontWeight:600, marginBottom:4 }}>{form.epic||"—"}</div>
          <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:"#12141C", lineHeight:1.3 }}>
            <span style={{ fontFamily:"monospace", color:"#9CA0B8", marginRight:8 }}>#{form.id}</span>
            {form.title}
          </h1>
        </div>
      </div>

      <div className="usr-detail-grid" style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20, alignItems:"start" }}>
        <div style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:16, padding:"22px 24px" }}>
          <div style={{ fontWeight:700, fontSize:14, marginBottom:18, color:"#12141C" }}>Story Details</div>

          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>Story Name</label>
            <input value={form.title||""} onChange={e=>set("title",e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description||""} onChange={e=>set("description",e.target.value)} rows={3} style={{ ...inputStyle, resize:"vertical" }} />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>Acceptance Criteria <span style={{ fontWeight:400, color:"#9CA0B8" }}>(one per line)</span></label>
            <textarea value={(form.acceptanceCriteria||[]).join("\n")} onChange={e=>set("acceptanceCriteria",e.target.value.split("\n").filter(Boolean))} rows={4} style={{ ...inputStyle, resize:"vertical" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
            <div>
              <label style={labelStyle}>Story Points</label>
              <select value={form.storyPoints||1} onChange={e=>set("storyPoints",+e.target.value)} style={inputStyle}>
                {POINTS.map(p=><option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Priority</label>
              <select value={form.priority||"Medium"} onChange={e=>set("priority",e.target.value)} style={inputStyle}>
                {PRIORITIES.map(p=><option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Epic</label>
              <input value={form.epic||""} onChange={e=>set("epic",e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Assignee</label>
              <input value={form.assignee||""} onChange={e=>set("assignee",e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Effort (Hours)</label>
              <input value={form.effort||""} onChange={e=>set("effort",e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Tags / Labels</label>
              <input value={form.tags||""} onChange={e=>set("tags",e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Dependencies</label>
            <input value={form.dependencies||""} onChange={e=>set("dependencies",e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:16, padding:"20px" }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:14, color:"#12141C" }}>Status & Actions</div>
            <label style={labelStyle}>Current Status</label>
            <div style={{ background:STATUS[form.status]?.color||"#94A3B8", color:"#fff", borderRadius:20, padding:"8px 16px", fontWeight:700, fontSize:13, textAlign:"center", marginBottom:14 }}>
              {STATUS[form.status]?.label||"—"}
            </div>
            <label style={labelStyle}>Move to Column</label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:14 }}>
              {COLS.map(col => (
                <button key={col} onClick={()=>set("status",col)}
                  style={{ padding:"8px", borderRadius:9, border:"1.5px solid", borderColor:form.status===col?STATUS[col].color:"#E4E2D9", background:form.status===col?STATUS[col].bg:"#F8F7F3", color:form.status===col?STATUS[col].dark:"#4A4E60", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                  {STATUS[col].label}
                </button>
              ))}
            </div>
            <div style={{ background:"#F8F7F3", borderRadius:10, padding:"12px 14px", fontSize:12.5, lineHeight:1.8 }}>
              <div>Story ID: <b>{form.id}</b></div>
              <div>Story Points: <b>{form.storyPoints||"—"}</b></div>
              <div>Priority: <b>{form.priority||"—"}</b></div>
            </div>
          </div>

          <button onClick={()=>set("riskFlag",!form.riskFlag)} style={{ padding:"12px 16px", borderRadius:12, border:`1.5px solid ${form.riskFlag?"#FCA5A5":"#BBF7D0"}`, background:form.riskFlag?"#FEF2F2":"#F0FDF4", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, fontWeight:700, fontSize:13.5, color:form.riskFlag?"#DC2626":"#16A34A" }}>
              {form.riskFlag ? <I.Warning /> : <I.Check />}
              {form.riskFlag ? "At Risk" : "No Risk"}
            </div>
            <span style={{ fontSize:11, color:"#9CA0B8" }}>Click to toggle</span>
          </button>

          <div style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:16, padding:"20px" }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:14, color:"#12141C" }}>Comments ({form.comments?.length||0})</div>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={2} placeholder="Add a comment…" style={{ width:"100%", padding:"9px 12px", borderRadius:9, border:"1.5px solid #E4E2D9", fontSize:13.5, outline:"none", fontFamily:"inherit", resize:"none", marginBottom:8, boxSizing:"border-box" }} />
            <button onClick={addComment} style={{ padding:"7px 16px", borderRadius:9, border:"none", background:"#FF5A36", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>Comment</button>
            {(form.comments||[]).length > 0 && (
              <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:12 }}>
                {(form.comments||[]).map((c,i) => (
                  <div key={i} style={{ borderTop:"1px solid #F4F3EE", paddingTop:12 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <Avatar name={c.author} size={20} />
                      <span style={{ fontSize:13, fontWeight:600 }}>{c.author}</span>
                      <span style={{ fontSize:11, color:"#9CA0B8" }}>{c.time}</span>
                    </div>
                    <p style={{ margin:0, fontSize:13.5, color:"#4A4E60", lineHeight:1.5 }}>{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══ Backlog Item Card ══ */
const BacklogItemCard = ({ story, index, checked, onToggleCheck, onMenuAction, menuOpenId, setMenuOpenId }) => {
  const [expanded, setExpanded] = useState(true);
  const menuOpen = menuOpenId === story.id;
  const tags = [story.tags, story.epic, story.priority].filter(Boolean);
  const businessValue = story.priority==="Critical" ? "High" : (story.priority||"Medium");
  const riskLevel = story.riskFlag ? "High" : "Low";
  const readyLabel = story.riskFlag ? "AT RISK" : "READY";
  const readyColor = story.riskFlag ? "#BE123C" : "#0F7A54";
  const readyBg = story.riskFlag ? "#FEE5EA" : "#DEF7EC";

  return (
    <div style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:14, marginBottom:12, overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"16px 18px 8px" }}>
        <input type="checkbox" checked={checked} onChange={()=>onToggleCheck(story.id)} style={{ marginTop:4, width:16, height:16, cursor:"pointer", flexShrink:0 }} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:8 }}>
            <span style={{ fontFamily:"monospace", fontSize:12, color:"#9CA0B8", fontWeight:700 }}>{story.id||`STORY-${String(index).padStart(3,"0")}`}</span>
            <PriorityPill priority={story.priority} />
            <span style={{ fontSize:11, fontWeight:700, color:readyColor, background:readyBg, borderRadius:20, padding:"2px 9px" }}>{readyLabel}</span>
          </div>
          <h3 style={{ margin:"0 0 4px", fontSize:15.5, fontWeight:700, color:"#12141C", lineHeight:1.4 }}>{story.title}</h3>
          <p style={{ margin:"0 0 12px", fontSize:13, color:"#6C7086" }}>{story.description ? `Implement: ${story.description}` : `Implement: ${story.title}`}</p>
          <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", fontSize:12.5, color:"#6C7086" }}>
            <span><b style={{ color:"#12141C" }}>{story.storyPoints||1}</b> SP</span>
            <span>{story.effort||"—"}</span>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><I.Book />{story.epic||"—"}</span>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><Avatar name={story.assignee} size={17} />{story.assignee||"Unassigned"}</span>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><I.Comment />{story.comments?.length||0}</span>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
          <button onClick={()=>setExpanded(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA0B8", padding:4, transform:expanded?"rotate(180deg)":"none", transition:"transform .15s" }}><I.ChevD /></button>
          <div style={{ position:"relative" }}>
            <button onClick={()=>setMenuOpenId(menuOpen?null:story.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA0B8", padding:4, display:"flex" }}><I.Dots /></button>
            {menuOpen && <div onClick={()=>setMenuOpenId(null)} style={{ position:"fixed", inset:0, zIndex:39 }} />}
            {menuOpen && (
              <div style={{ position:"absolute", right:0, top:26, width:180, background:"#fff", border:"1px solid #E4E2D9", borderRadius:12, boxShadow:"0 16px 36px -10px rgba(18,20,28,0.25)", zIndex:40, padding:6 }}>
                {[
                  { label:"Edit Story",     action:"edit",   Icon:I.Edit },
                  { label:"View Details",   action:"view",   Icon:I.Eye },
                  { label:"Move to Sprint", action:"sprint", Icon:I.ArrowR },
                  { label:"Clone Story",    action:"clone",  Icon:I.Copy },
                  { label:"Delete Story",   action:"delete", Icon:I.Trash, danger:true },
                ].map(opt => (
                  <button key={opt.action} onClick={()=>{ onMenuAction(story.id, opt.action); setMenuOpenId(null); }}
                    style={{ display:"flex", alignItems:"center", gap:9, width:"100%", textAlign:"left", padding:"8px 10px", borderRadius:8, border:"none", background:"none", cursor:"pointer", fontSize:13, color:opt.danger?"#DC2626":"#12141C", fontWeight:500 }}
                    onMouseEnter={e=>e.currentTarget.style.background="#F8F7F3"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                    <opt.Icon /> {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ padding:"4px 18px 18px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:14 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, color:"#6C7086", textTransform:"uppercase", letterSpacing:".05em", marginBottom:8 }}>Tags</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {tags.map((t,i) => <span key={i} style={{ fontSize:11.5, fontWeight:600, color:"#1D4ED8", background:"#E3ECFE", borderRadius:8, padding:"3px 9px" }}>{t}</span>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:"#6C7086", textTransform:"uppercase", letterSpacing:".05em", marginBottom:8 }}>Dependencies</div>
              <span style={{ fontSize:11.5, fontWeight:600, color:"#B45309", background:"#FFF3DC", borderRadius:8, padding:"3px 9px" }}>{story.dependencies || "None"}</span>
            </div>
          </div>

          {(story.acceptanceCriteria||[]).length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, color:"#6C7086", textTransform:"uppercase", letterSpacing:".05em", marginBottom:8 }}>
                <span style={{ color:"#10B981" }}><I.Check /></span> Acceptance Criteria
              </div>
              {story.acceptanceCriteria.map((c,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:13, color:"#4A4E60", marginBottom:5 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", marginTop:7, flexShrink:0 }} />
                  {c}
                </div>
              ))}
            </div>
          )}

          <div className="usr-footer-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, paddingTop:14, borderTop:"1px solid #F0EFE9" }}>
            <div><div style={{ fontSize:11, color:"#9CA0B8", marginBottom:4 }}>Assignee</div><div style={{ fontSize:13, fontWeight:600, color:"#12141C" }}>{story.assignee||"Unassigned"}</div></div>
            <div><div style={{ fontSize:11, color:"#9CA0B8", marginBottom:4 }}>Epic</div><div style={{ fontSize:13, fontWeight:600, color:"#12141C" }}>{story.epic||"—"}</div></div>
            <div><div style={{ fontSize:11, color:"#9CA0B8", marginBottom:4 }}>Business Value</div><div style={{ fontSize:13, fontWeight:600, color:"#12141C" }}>{businessValue}</div></div>
            <div><div style={{ fontSize:11, color:"#9CA0B8", marginBottom:4 }}>Risk Level</div><div style={{ fontSize:13, fontWeight:600, color:story.riskFlag?"#DC2626":"#12141C" }}>{riskLevel}</div></div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══ Product Backlog Page ══ */
const BacklogPage = ({ stories, onBack, onMenuAction }) => {
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterEpic, setFilterEpic] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [checkedIds, setCheckedIds] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const backlogStories = stories.filter(s => s.status === "backlog");
  const epics = [...new Set(stories.map(s=>s.epic).filter(Boolean))];
  const priorityRank = { Critical:0, High:1, Medium:2, Low:3 };

  let filtered = backlogStories.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.title?.toLowerCase().includes(q) || s.id?.toLowerCase().includes(q);
    const matchPriority = filterPriority === "all" || s.priority === filterPriority;
    const matchEpic = filterEpic === "all" || s.epic === filterEpic;
    const matchStatus = filterStatus === "all" || (filterStatus === "atrisk" ? s.riskFlag : !s.riskFlag);
    return matchSearch && matchPriority && matchEpic && matchStatus;
  });
  filtered = [...filtered].sort((a,b) => (priorityRank[a.priority]??9) - (priorityRank[b.priority]??9));

  const totalPoints = backlogStories.reduce((sum,s)=>(sum+(+s.storyPoints||0)),0);
  const highPriority = backlogStories.filter(s=>s.priority==="High"||s.priority==="Critical").length;
  const ready = backlogStories.filter(s=>!s.riskFlag).length;

  const statCards = [
    { label:"Total Stories",  value:backlogStories.length, Icon:I.Book,   iconBg:"#F1EBFE", iconColor:"#6D28D9" },
    { label:"Story Points",   value:totalPoints,           Icon:I.Chart,  iconBg:"#E3ECFE", iconColor:"#1D4ED8" },
    { label:"High Priority",  value:highPriority,          Icon:I.Star,   iconBg:"#FEE5EA", iconColor:"#BE123C" },
    { label:"Ready Stories",  value:ready,                 Icon:I.Target, iconBg:"#DEF7EC", iconColor:"#0F7A54" },
  ];

  const selectStyle = { padding:"8px 12px", borderRadius:9, border:"1px solid #E4E2D9", background:"#fff", fontSize:13.5, color:"#12141C", cursor:"pointer", outline:"none" };
  const iconBtn = { width:34, height:34, borderRadius:9, border:"1px solid #E4E2D9", background:"#fff", color:"#4A4E60", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 };
  const allChecked = filtered.length>0 && filtered.every(s=>checkedIds.includes(s.id));
  const toggleAll = () => setCheckedIds(allChecked ? [] : filtered.map(s=>s.id));
  const toggleOne = (id) => setCheckedIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"22px 24px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <button onClick={onBack} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:"#6C7086", background:"none", border:"none", cursor:"pointer", fontWeight:500, marginBottom:8, padding:0 }}><I.Back />Back to Board</button>
          <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:"#12141C" }}>Product Backlog</h1>
          <p style={{ margin:"4px 0 0", fontSize:13.5, color:"#6C7086" }}>Manage and prioritize your product requirements</p>
        </div>
        <button style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:10, border:"none", background:"#FF5A36", color:"#fff", fontWeight:700, fontSize:13.5, cursor:"pointer" }}>
          <I.Bolt /> Sprint Planning
        </button>
      </div>

      <div className="usr-backlog-stats" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        {statCards.map(({ label, value, Icon, iconBg, iconColor }) => (
          <div key={label} style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 6px -2px rgba(18,20,28,0.08)" }}>
            <div>
              <div style={{ fontSize:11.5, color:"#6C7086", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:26, fontWeight:800, color:"#12141C" }}>{value}</div>
            </div>
            <div style={{ width:42, height:42, borderRadius:12, background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", color:iconColor }}>
              <Icon />
            </div>
          </div>
        ))}
      </div>

      <div className="usr-toolbar-row" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #E4E2D9", borderRadius:9, padding:"8px 12px", flex:1, minWidth:180 }}>
          <I.Search />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search stories…" style={{ border:"none", outline:"none", fontSize:13.5, width:"100%", background:"transparent", fontFamily:"inherit" }} />
        </div>
        <select value={filterPriority} onChange={e=>setFilterPriority(e.target.value)} style={selectStyle}>
          <option value="all">All Priorities</option>
          {PRIORITIES.map(p=><option key={p} value={p}>{p}</option>)}
        </select>
        <select value={filterEpic} onChange={e=>setFilterEpic(e.target.value)} style={selectStyle}>
          <option value="all">All Epics</option>
          {epics.map(ep=><option key={ep} value={ep}>{ep}</option>)}
        </select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={selectStyle}>
          <option value="all">All Statuses</option>
          <option value="ready">Ready</option>
          <option value="atrisk">At Risk</option>
        </select>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={selectStyle}>
          <option value="priority">Sort by Priority</option>
        </select>
        <div className="usr-toolbar-actions" style={{ display:"flex", gap:8 }}>
          <Button variant="gradient" size="sm" gradientFrom="#FF5A36" gradientTo="#FF8C69" shape="soft"><I.Plus /> Add Story</Button>
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12, flexWrap:"wrap" }}>
        <span style={{ fontWeight:700, fontSize:14, color:"#12141C" }}>Backlog Items ({filtered.length})</span>
        <button onClick={toggleAll} style={{ background:"none", border:"none", cursor:"pointer", color:"#FF5A36", fontWeight:600, fontSize:13 }}>{allChecked ? "Deselect All" : "Select All"}</button>
        {checkedIds.length>0 && <span style={{ fontSize:13, color:"#FF5A36", fontWeight:600 }}>{checkedIds.length} selected</span>}
        <div style={{ flex:1 }} />
        <button style={iconBtn} title="Export"><I.Download /></button>
        <button style={iconBtn} title="Import"><I.Upload /></button>
        <button style={iconBtn} title="Settings"><I.Gear /></button>
      </div>

      {filtered.length === 0
        ? <div style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:14, padding:"40px 24px", textAlign:"center", color:"#9CA0B8", fontSize:14 }}>No backlog items match your filters.</div>
        : filtered.map((s,i) => (
          <BacklogItemCard key={s.id} story={s} index={i+1} checked={checkedIds.includes(s.id)} onToggleCheck={toggleOne}
            onMenuAction={onMenuAction} menuOpenId={menuOpenId} setMenuOpenId={setMenuOpenId} />
        ))
      }
    </div>
  );
};

/* ══ Create Story Modal ══ */
const CreateModal = ({ onClose, onCreate, initialStatus }) => {
  const [form, setForm] = useState({ title:"", epic:"", status:initialStatus||"todo", assignee:"", priority:"Medium" });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const fieldStyle = { width:"100%", padding:"10px 13px", borderRadius:10, border:"1.5px solid #E4E2D9", fontSize:14, outline:"none", fontFamily:"inherit", color:"#12141C", background:"#F8F7F3", boxSizing:"border-box" };
  const labelStyle = { display:"block", fontSize:12, fontWeight:700, color:"#6C7086", marginBottom:6, textTransform:"uppercase", letterSpacing:".06em" };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(18,20,28,0.5)", backdropFilter:"blur(4px)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"28px 32px", width:"min(500px,92vw)", boxShadow:"0 20px 60px -16px rgba(18,20,28,0.4)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
          <h2 style={{ margin:0, fontSize:18, fontWeight:800 }}>Create Story</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA0B8" }}><I.X /></button>
        </div>
        <label style={labelStyle}>Title</label>
        <input value={form.title} onChange={e=>set("title",e.target.value)} placeholder="As a user, I want to…" style={{ ...fieldStyle, marginBottom:16 }} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
          <div><label style={labelStyle}>Epic</label><input value={form.epic} onChange={e=>set("epic",e.target.value)} placeholder="e.g. EPIC-01" style={fieldStyle}/></div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e=>set("status",e.target.value)} style={fieldStyle}>
              {Object.entries(STATUS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Assignee</label><input value={form.assignee} onChange={e=>set("assignee",e.target.value)} placeholder="Name" style={fieldStyle}/></div>
          <div>
            <label style={labelStyle}>Priority</label>
            <select value={form.priority} onChange={e=>set("priority",e.target.value)} style={fieldStyle}>
              {PRIORITIES.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="gradient" size="sm" gradientFrom="#FF5A36" gradientTo="#FF8C69" shape="soft"
            onClick={()=>{ if(form.title){ onCreate({...form, id:`STORY-${Date.now()}`, comments:[], riskFlag:false, storyPoints:1, acceptanceCriteria:[]}); onClose(); }}}>
            <I.Plus /> Create Story
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
const UserStoryReview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [view, setView] = useState("kanban");       // kanban | list
  const [page, setPage] = useState("board");         // board | detail | backlog
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [createStatus, setCreateStatus] = useState("todo");
  const [search, setSearch] = useState("");
  const [filterEpic, setFilterEpic] = useState("all");
  const [filterSprint, setFilterSprint] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("all");
  const [dragOverCol, setDragOverCol] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [listPage, setListPage] = useState(1);
  const [kanbanPage, setKanbanPage] = useState(1);
  const dragId = useRef(null);

  /*
   * stories — sample data for now; will be replaced by backend API data
   * Shape: [{ id, title, epic, status, assignee, priority, storyPoints,
   *           description, acceptanceCriteria, effort, tags, dependencies,
   *           riskFlag, comments:[{author,time,text}] }]
   */
  const [stories, setStories] = useState([
    { id:"STORY-101", title:"As a user, I want to login so that I can access my account", epic:"EPIC-01", status:"backlog", assignee:"Rocky", priority:"Low", storyPoints:2, effort:"16h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"As a user, I want to login so that I can access my account", acceptanceCriteria:["Implement: As a user, I want to login so that I can access my account"], comments:[{author:"Sanjay Sir",time:"2h ago",text:"Looks good, ready for sprint."},{author:"Rocky",time:"1h ago",text:"Updated the acceptance criteria."}] },
    { id:"STORY-102", title:"As a user, I want to reset my password so that I can recover my account", epic:"EPIC-01", status:"todo", assignee:"Vishal", priority:"Medium", storyPoints:3, effort:"20h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"Password reset flow via email link.", acceptanceCriteria:["User receives a reset link by email","Link expires after 30 minutes"], comments:[{author:"Vishal",time:"3h ago",text:"Starting on this today."}] },
    { id:"STORY-103", title:"As a user, I want to view my dashboard after login", epic:"EPIC-02", status:"todo", assignee:"Pamir", priority:"High", storyPoints:5, effort:"32h", tags:"Dashboard", dependencies:"STORY-102", riskFlag:false, description:"Landing dashboard with project summary widgets.", acceptanceCriteria:["Dashboard loads within 2s","Shows project summary cards"], comments:[] },
    { id:"STORY-104", title:"As a user, I want to update my profile picture", epic:"EPIC-02", status:"todo", assignee:"Neha Iyer", priority:"Critical", storyPoints:8, effort:"12h", tags:"Profile", dependencies:"None", riskFlag:true, description:"Allow profile photo upload and crop.", acceptanceCriteria:["User can upload a JPG/PNG","Image is cropped to a square"], comments:[] },
    { id:"STORY-105", title:"As a user, I want to enable two-factor authentication", epic:"EPIC-01", status:"todo", assignee:"Rocky", priority:"Medium", storyPoints:5, effort:"24h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"Optional 2FA using an authenticator app.", acceptanceCriteria:["User can enable/disable 2FA in settings"], comments:[{author:"Rocky",time:"1d ago",text:"Needs a design review."}] },
    { id:"STORY-106", title:"As a PM, I want to invite team members to a project", epic:"EPIC-03", status:"todo", assignee:"Sanjay Sir", priority:"Medium", storyPoints:3, effort:"18h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Invite teammates by email to a project.", acceptanceCriteria:["Invite email is sent","Invited user appears as pending"], comments:[] },
    { id:"STORY-107", title:"As a user, I want to switch between light and dark mode", epic:"EPIC-02", status:"todo", assignee:"Karan Mehta", priority:"Low", storyPoints:2, effort:"10h", tags:"UI", dependencies:"None", riskFlag:false, description:"Theme toggle stored per user.", acceptanceCriteria:["Theme choice persists across sessions"], comments:[] },
    { id:"STORY-108", title:"As a PM, I want to archive a completed project", epic:"EPIC-03", status:"todo", assignee:"Amrit Bose", priority:"Medium", storyPoints:2, effort:"8h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Archived projects are hidden from the active list.", acceptanceCriteria:["Archived projects move to an Archive tab"], comments:[{author:"Amrit Bose",time:"4h ago",text:"Should archived projects be restorable?"}] },
    { id:"STORY-109", title:"As a user, I want to receive email notifications for mentions", epic:"EPIC-02", status:"todo", assignee:"Vishal", priority:"Low", storyPoints:3, effort:"14h", tags:"Notifications", dependencies:"None", riskFlag:false, description:"Email is sent whenever a user is @mentioned.", acceptanceCriteria:["Email sent within 1 minute of mention"], comments:[] },
    { id:"STORY-110", title:"As a system, I want to log failed login attempts", epic:"EPIC-01", status:"todo", assignee:"Rocky", priority:"Medium", storyPoints:2, effort:"12h", tags:"Security", dependencies:"None", riskFlag:false, description:"Failed logins are logged with IP and timestamp.", acceptanceCriteria:["Failed attempts are stored for 90 days"], comments:[] },
    { id:"STORY-111", title:"As a PM, I want to duplicate a project template", epic:"EPIC-03", status:"todo", assignee:"Pamir", priority:"Low", storyPoints:3, effort:"16h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Clone an existing project as a starting template.", acceptanceCriteria:["Duplicated project keeps structure, not data"], comments:[{author:"Pamir",time:"5h ago",text:"Nice to have before next sprint."},{author:"Sanjay Sir",time:"3h ago",text:"Agreed, low priority."}] },
    { id:"STORY-112", title:"As a user, I want to export my activity history as CSV", epic:"EPIC-02", status:"todo", assignee:"Neha Iyer", priority:"Medium", storyPoints:3, effort:"14h", tags:"Export", dependencies:"None", riskFlag:false, description:"Downloadable CSV of the user's activity log.", acceptanceCriteria:["CSV includes date, action, and target"], comments:[] },
    { id:"STORY-113", title:"As a user, I want to view my billing history", epic:"EPIC-02", status:"todo", assignee:"Pamir", priority:"Low", storyPoints:2, effort:"10h", tags:"Billing", dependencies:"None", riskFlag:false, description:"List of past invoices with download links.", acceptanceCriteria:["Invoices are sorted newest first"], comments:[] },
    { id:"STORY-114", title:"As a PM, I want to set a project budget", epic:"EPIC-03", status:"todo", assignee:"Sanjay Sir", priority:"Medium", storyPoints:3, effort:"16h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"PM sets and tracks a spending cap per project.", acceptanceCriteria:["Warning shown when 90% of budget is used"], comments:[] },
    { id:"STORY-115", title:"As a system, I want to auto-tag features by keyword", epic:"EPIC-04", status:"todo", assignee:"Rocky", priority:"Low", storyPoints:2, effort:"12h", tags:"AI Feature Generation", dependencies:"None", riskFlag:false, description:"Features are tagged automatically based on their title and description.", acceptanceCriteria:["Tags can be edited manually after generation"], comments:[] },
    { id:"STORY-116", title:"As a user, I want to change my email address", epic:"EPIC-01", status:"todo", assignee:"Vishal", priority:"Medium", storyPoints:2, effort:"10h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"Email change requires re-verification.", acceptanceCriteria:["Confirmation link is sent to the new address"], comments:[] },
    { id:"STORY-117", title:"As a PM, I want to view a Gantt chart of the project timeline", epic:"EPIC-03", status:"todo", assignee:"Amrit Bose", priority:"High", storyPoints:8, effort:"34h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Visual timeline of milestones and dependencies.", acceptanceCriteria:["Chart supports zooming by week/month"], comments:[] },
    { id:"STORY-118", title:"As a system, I want to detect missing dependencies in a story", epic:"EPIC-05", status:"todo", assignee:"Karan Mehta", priority:"Medium", storyPoints:3, effort:"14h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Flags stories that reference a dependency that doesn't exist.", acceptanceCriteria:["Missing dependencies are highlighted in red"], comments:[] },
    { id:"STORY-119", title:"As a user, I want to mute notifications for a specific project", epic:"EPIC-02", status:"todo", assignee:"Neha Iyer", priority:"Low", storyPoints:1, effort:"6h", tags:"Notifications", dependencies:"None", riskFlag:false, description:"Per-project mute toggle in notification settings.", acceptanceCriteria:["Muted projects show a bell-off icon"], comments:[] },
    { id:"STORY-201", title:"As a PM, I want to create a new project", epic:"EPIC-03", status:"progress", assignee:"Sanjay Sir", priority:"Low", storyPoints:2, effort:"16h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Project creation form with name, description and dates.", acceptanceCriteria:["Required fields are validated"], comments:[{author:"Sanjay Sir",time:"2h ago",text:"In progress, almost done."},{author:"Rocky",time:"1h ago",text:"Let me know when ready to test."},{author:"Amrit Bose",time:"30m ago",text:"Looks good so far."}] },
    { id:"STORY-202", title:"As a PM, I want to configure human resources", epic:"EPIC-03", status:"progress", assignee:"Amrit Bose", priority:"Medium", storyPoints:3, effort:"20h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Assign roles and capacity to team members.", acceptanceCriteria:["PM can assign a role per member"], comments:[{author:"Amrit Bose",time:"6h ago",text:"Need clarity on role permissions."}] },
    { id:"STORY-203", title:"As a system, I want to generate features from documents", epic:"EPIC-04", status:"progress", assignee:"Rocky", priority:"High", storyPoints:5, effort:"40h", tags:"AI Feature Generation", dependencies:"None", riskFlag:false, description:"Extract candidate features from uploaded project docs.", acceptanceCriteria:["Uploaded doc produces a feature list draft"], comments:[] },
    { id:"STORY-204", title:"As a PM, I want to set project deadlines", epic:"EPIC-03", status:"progress", assignee:"Sanjay Sir", priority:"Medium", storyPoints:2, effort:"10h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"PM sets a target completion date per project.", acceptanceCriteria:["Deadline shows on the project dashboard"], comments:[] },
    { id:"STORY-205", title:"As a system, I want to notify the PM when a feature fails validation", epic:"EPIC-04", status:"progress", assignee:"Vishal", priority:"High", storyPoints:3, effort:"14h", tags:"AI Feature Generation", dependencies:"None", riskFlag:false, description:"Send an in-app alert when a generated feature fails schema checks.", acceptanceCriteria:["PM sees a notification within 1 minute of failure"], comments:[{author:"Vishal",time:"2h ago",text:"Wiring up the notification service now."}] },
    { id:"STORY-206", title:"As a user, I want to filter my tasks by status", epic:"EPIC-02", status:"progress", assignee:"Neha Iyer", priority:"Low", storyPoints:2, effort:"8h", tags:"Dashboard", dependencies:"None", riskFlag:false, description:"Task list supports a status filter dropdown.", acceptanceCriteria:["Filter updates the list without a page reload"], comments:[] },
    { id:"STORY-207", title:"As a PM, I want to assign story points to features", epic:"EPIC-04", status:"progress", assignee:"Pamir", priority:"Medium", storyPoints:3, effort:"12h", tags:"AI Feature Generation", dependencies:"None", riskFlag:false, description:"Editable story-point field on each feature card.", acceptanceCriteria:["Points are saved on blur"], comments:[] },
    { id:"STORY-208", title:"As a system, I want to auto-save draft user stories", epic:"EPIC-05", status:"progress", assignee:"Karan Mehta", priority:"Low", storyPoints:2, effort:"10h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Draft stories persist every few seconds while editing.", acceptanceCriteria:["Draft is restored after an accidental refresh"], comments:[] },
    { id:"STORY-209", title:"As a PM, I want to configure sprint velocity", epic:"EPIC-03", status:"progress", assignee:"Amrit Bose", priority:"Medium", storyPoints:3, effort:"16h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Set an expected story-point velocity per sprint.", acceptanceCriteria:["Velocity is used in capacity warnings"], comments:[{author:"Amrit Bose",time:"1d ago",text:"Should this be per-team or per-sprint?"}] },
    { id:"STORY-210", title:"As a user, I want to receive push notifications for status changes", epic:"EPIC-02", status:"progress", assignee:"Rocky", priority:"Low", storyPoints:2, effort:"12h", tags:"Notifications", dependencies:"None", riskFlag:false, description:"Browser push notification when a story's status changes.", acceptanceCriteria:["User can opt out in settings"], comments:[] },
    { id:"STORY-211", title:"As a system, I want to detect duplicate user stories", epic:"EPIC-05", status:"progress", assignee:"Sanjay Sir", priority:"High", storyPoints:5, effort:"22h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:true, description:"Flag near-duplicate stories using title similarity.", acceptanceCriteria:["Duplicates over 85% similarity are flagged"], comments:[] },
    { id:"STORY-212", title:"As a PM, I want to link related epics together", epic:"EPIC-03", status:"progress", assignee:"Vishal", priority:"Low", storyPoints:2, effort:"9h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Epics can reference other related epics.", acceptanceCriteria:["Linked epics appear in a related section"], comments:[] },
    { id:"STORY-213", title:"As a user, I want to view my activity timeline", epic:"EPIC-02", status:"progress", assignee:"Neha Iyer", priority:"Medium", storyPoints:3, effort:"14h", tags:"Dashboard", dependencies:"None", riskFlag:false, description:"Chronological feed of the user's recent actions.", acceptanceCriteria:["Timeline paginates in groups of 20"], comments:[] },
    { id:"STORY-214", title:"As a system, I want to validate acceptance criteria completeness", epic:"EPIC-05", status:"progress", assignee:"Pamir", priority:"Medium", storyPoints:3, effort:"15h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Warn when a generated story has fewer than 2 acceptance criteria.", acceptanceCriteria:["Warning icon shows on incomplete stories"], comments:[] },
    { id:"STORY-215", title:"As a PM, I want to bulk edit story priorities", epic:"EPIC-03", status:"progress", assignee:"Karan Mehta", priority:"Low", storyPoints:2, effort:"11h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Select multiple stories and change priority in one action.", acceptanceCriteria:["Bulk update applies to all selected stories"], comments:[] },
    { id:"STORY-216", title:"As a system, I want to summarize sprint progress via AI", epic:"EPIC-04", status:"progress", assignee:"Amrit Bose", priority:"High", storyPoints:5, effort:"26h", tags:"AI Feature Generation", dependencies:"None", riskFlag:false, description:"Generate a short natural-language sprint status summary.", acceptanceCriteria:["Summary regenerates on demand"], comments:[{author:"Amrit Bose",time:"4h ago",text:"First draft summaries look promising."}] },
    { id:"STORY-217", title:"As a user, I want to comment on user stories", epic:"EPIC-05", status:"progress", assignee:"Rocky", priority:"Medium", storyPoints:2, effort:"10h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Threaded comments on any user story.", acceptanceCriteria:["Comments show author and timestamp"], comments:[] },
    { id:"STORY-218", title:"As a PM, I want to export the sprint report as PDF", epic:"EPIC-03", status:"progress", assignee:"Sanjay Sir", priority:"Low", storyPoints:2, effort:"13h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Downloadable PDF summary of a completed sprint.", acceptanceCriteria:["PDF includes burndown chart and story list"], comments:[] },
    { id:"STORY-219", title:"As a PM, I want to reorder backlog items via drag and drop", epic:"EPIC-03", status:"review", assignee:"Pamir", priority:"Low", storyPoints:2, effort:"11h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Manual drag-to-reorder within the backlog list.", acceptanceCriteria:["Order persists after a page refresh"], comments:[] },
    { id:"STORY-220", title:"As a system, I want to suggest an epic for a new feature", epic:"EPIC-04", status:"review", assignee:"Rocky", priority:"Medium", storyPoints:3, effort:"15h", tags:"AI Feature Generation", dependencies:"None", riskFlag:false, description:"AI suggests the closest matching epic when a feature is created.", acceptanceCriteria:["Suggestion can be overridden by the PM"], comments:[] },
    { id:"STORY-221", title:"As a user, I want to see who is currently viewing a story", epic:"EPIC-05", status:"review", assignee:"Karan Mehta", priority:"Low", storyPoints:2, effort:"9h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Presence indicators show teammates viewing the same story.", acceptanceCriteria:["Avatars update within 5 seconds"], comments:[] },
    { id:"STORY-222", title:"As a PM, I want to set a definition of done per epic", epic:"EPIC-03", status:"review", assignee:"Amrit Bose", priority:"Medium", storyPoints:3, effort:"14h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Custom checklist required before an epic's stories can close.", acceptanceCriteria:["Checklist items must be checked before marking Done"], comments:[{author:"Amrit Bose",time:"5h ago",text:"Drafted the first checklist template."}] },
    { id:"STORY-223", title:"As a system, I want to warn on overlapping sprint dates", epic:"EPIC-03", status:"review", assignee:"Sanjay Sir", priority:"High", storyPoints:3, effort:"16h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Prevents two active sprints from sharing date ranges.", acceptanceCriteria:["Warning appears before saving conflicting dates"], comments:[] },
    { id:"STORY-224", title:"As a user, I want to star my favorite stories", epic:"EPIC-02", status:"done", assignee:"Vishal", priority:"Low", storyPoints:1, effort:"6h", tags:"Dashboard", dependencies:"None", riskFlag:false, description:"Quick star/favorite toggle on any story card.", acceptanceCriteria:["Starred stories appear in a filter"], comments:[] },
    { id:"STORY-225", title:"As a PM, I want to view a burndown chart per sprint", epic:"EPIC-03", status:"done", assignee:"Neha Iyer", priority:"Medium", storyPoints:3, effort:"18h", tags:"Project Management", dependencies:"STORY-209", riskFlag:false, description:"Live burndown chart tracking remaining points over the sprint.", acceptanceCriteria:["Chart updates as stories move to Done"], comments:[] },
    { id:"STORY-226", title:"As a system, I want to auto-assign a reviewer to new features", epic:"EPIC-04", status:"done", assignee:"Pamir", priority:"Low", storyPoints:2, effort:"10h", tags:"AI Feature Generation", dependencies:"None", riskFlag:false, description:"Round-robin reviewer assignment for newly generated features.", acceptanceCriteria:["Assignment can be reassigned manually"], comments:[] },
    { id:"STORY-227", title:"As a user, I want to search stories by tag", epic:"EPIC-02", status:"done", assignee:"Rocky", priority:"Low", storyPoints:2, effort:"8h", tags:"Dashboard", dependencies:"None", riskFlag:false, description:"Tag-based search alongside the existing title search.", acceptanceCriteria:["Multiple tags can be combined with AND logic"], comments:[] },
    { id:"STORY-228", title:"As a PM, I want to set story point estimation guidelines", epic:"EPIC-03", status:"done", assignee:"Karan Mehta", priority:"Low", storyPoints:2, effort:"9h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Reference guide shown next to the story point selector.", acceptanceCriteria:["Guidelines are editable by admins"], comments:[] },
    { id:"STORY-229", title:"As a system, I want to archive completed sprints automatically", epic:"EPIC-05", status:"done", assignee:"Amrit Bose", priority:"Medium", storyPoints:3, effort:"13h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Sprints move to an archive view 7 days after closing.", acceptanceCriteria:["Archived sprints remain viewable read-only"], comments:[] },
    { id:"STORY-230", title:"As a user, I want to see a changelog of story edits", epic:"EPIC-05", status:"done", assignee:"Sanjay Sir", priority:"Medium", storyPoints:2, effort:"11h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Field-level edit history on each story's detail page.", acceptanceCriteria:["Each change shows old value, new value, and editor"], comments:[] },
    { id:"STORY-301", title:"As a PM, I want to review and edit generated features", epic:"EPIC-04", status:"review", assignee:"Vishal", priority:"High", storyPoints:5, effort:"28h", tags:"AI Feature Generation", dependencies:"STORY-203", riskFlag:false, description:"Review screen for AI-generated features before approval.", acceptanceCriteria:["PM can edit a feature inline","PM can reject a feature"], comments:[{author:"Vishal",time:"1h ago",text:"Ready for review."},{author:"Sanjay Sir",time:"20m ago",text:"Reviewing now."}] },
    { id:"STORY-302", title:"As a PM, I want to approve features", epic:"EPIC-04", status:"review", assignee:"Pamir", priority:"Critical", storyPoints:8, effort:"36h", tags:"AI Feature Generation", dependencies:"STORY-301", riskFlag:true, description:"Bulk approve/reject reviewed features.", acceptanceCriteria:["Approved features move to User Story generation"], comments:[{author:"Pamir",time:"3h ago",text:"Flagging as critical for this sprint."}] },
    { id:"STORY-303", title:"As a system, I want to create user stories from approved features", epic:"EPIC-05", status:"review", assignee:"Sanjay Sir", priority:"Low", storyPoints:2, effort:"18h", tags:"Story & Sprint Workflow", dependencies:"STORY-302", riskFlag:false, description:"Auto-generate user stories once a feature is approved.", acceptanceCriteria:["Each approved feature produces at least one story"], comments:[{author:"Sanjay Sir",time:"5h ago",text:"Working as expected in staging."},{author:"Rocky",time:"2h ago",text:"Confirmed."}] },
    { id:"STORY-304", title:"As a PM, I want to review sprint velocity reports", epic:"EPIC-03", status:"review", assignee:"Pamir", priority:"Medium", storyPoints:3, effort:"14h", tags:"Project Management", dependencies:"STORY-209", riskFlag:false, description:"Read-only velocity chart across the last 5 sprints.", acceptanceCriteria:["Chart updates when a sprint closes"], comments:[] },
    { id:"STORY-305", title:"As a system, I want to flag stories missing acceptance criteria", epic:"EPIC-05", status:"review", assignee:"Karan Mehta", priority:"High", storyPoints:3, effort:"16h", tags:"Story & Sprint Workflow", dependencies:"STORY-214", riskFlag:true, description:"Surfaces incomplete stories before sprint planning.", acceptanceCriteria:["Flagged stories cannot be added to a sprint"], comments:[{author:"Karan Mehta",time:"1h ago",text:"Needs your review before merge."}] },
    { id:"STORY-306", title:"As a PM, I want to review AI-suggested story point estimates", epic:"EPIC-04", status:"review", assignee:"Amrit Bose", priority:"Critical", storyPoints:5, effort:"20h", tags:"AI Feature Generation", dependencies:"STORY-207", riskFlag:true, description:"PM can accept or override AI point suggestions per story.", acceptanceCriteria:["Overrides are logged with a reason"], comments:[] },
    { id:"STORY-307", title:"As a user, I want to review my notification preferences", epic:"EPIC-02", status:"review", assignee:"Neha Iyer", priority:"Low", storyPoints:2, effort:"9h", tags:"Notifications", dependencies:"STORY-210", riskFlag:false, description:"Settings page to toggle each notification type.", acceptanceCriteria:["Preferences persist across devices"], comments:[] },
    { id:"STORY-308", title:"As a PM, I want to review team workload distribution", epic:"EPIC-03", status:"review", assignee:"Vishal", priority:"Medium", storyPoints:3, effort:"15h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Chart showing story points assigned per team member.", acceptanceCriteria:["Overloaded members are highlighted"], comments:[{author:"Vishal",time:"3h ago",text:"Looks good, minor tweak on the legend."}] },
    { id:"STORY-309", title:"As a PM, I want to review flagged at-risk stories", epic:"EPIC-03", status:"review", assignee:"Rocky", priority:"High", storyPoints:3, effort:"14h", tags:"Project Management", dependencies:"None", riskFlag:true, description:"Consolidated view of every story currently flagged at risk.", acceptanceCriteria:["List can be filtered by epic and assignee"], comments:[] },
    { id:"STORY-310", title:"As a system, I want to review AI-tagged epics for accuracy", epic:"EPIC-04", status:"review", assignee:"Neha Iyer", priority:"Medium", storyPoints:2, effort:"10h", tags:"AI Feature Generation", dependencies:"STORY-220", riskFlag:false, description:"Spot-check dashboard for auto-suggested epic tags.", acceptanceCriteria:["Accuracy rate is displayed as a percentage"], comments:[] },
    { id:"STORY-311", title:"As a user, I want to review my pending mentions", epic:"EPIC-02", status:"review", assignee:"Pamir", priority:"Low", storyPoints:1, effort:"6h", tags:"Notifications", dependencies:"None", riskFlag:false, description:"Inbox-style list of unread @mentions across stories.", acceptanceCriteria:["Mentions can be marked as read individually"], comments:[] },
    { id:"STORY-312", title:"As a PM, I want to review the sprint capacity plan", epic:"EPIC-03", status:"review", assignee:"Karan Mehta", priority:"Medium", storyPoints:3, effort:"16h", tags:"Project Management", dependencies:"STORY-209", riskFlag:false, description:"Compares planned points against team capacity before sprint start.", acceptanceCriteria:["Over-capacity sprints are flagged before commit"], comments:[{author:"Karan Mehta",time:"2h ago",text:"One concern about part-time members' capacity."}] },
    { id:"STORY-313", title:"As a system, I want to review stale stories with no activity", epic:"EPIC-05", status:"review", assignee:"Amrit Bose", priority:"Low", storyPoints:2, effort:"9h", tags:"Story & Sprint Workflow", dependencies:"None", riskFlag:false, description:"Surfaces stories with no updates in the last 14 days.", acceptanceCriteria:["Stale stories can be bulk-reassigned"], comments:[] },
    { id:"STORY-401", title:"As a user, I want to logout so that my session ends securely", epic:"EPIC-01", status:"done", assignee:"Rocky", priority:"High", storyPoints:5, effort:"12h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"Logout clears session token and redirects to login.", acceptanceCriteria:["Session token is invalidated on logout"], comments:[] },
    { id:"STORY-402", title:"As a system, I want to validate user credentials", epic:"EPIC-01", status:"done", assignee:"Vishal", priority:"Critical", storyPoints:8, effort:"30h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"Server-side credential validation with rate limiting.", acceptanceCriteria:["Invalid credentials are rejected with a clear error","Repeated failures trigger a lockout"], comments:[] },
    { id:"STORY-403", title:"As a PM, I want to view project list", epic:"EPIC-02", status:"done", assignee:"Pamir", priority:"Low", storyPoints:2, effort:"10h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Paginated list of all projects the PM has access to.", acceptanceCriteria:["List supports pagination and search"], comments:[] },
    { id:"STORY-404", title:"As a system, I want to send a welcome email after signup", epic:"EPIC-01", status:"done", assignee:"Neha Iyer", priority:"Low", storyPoints:1, effort:"6h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"Transactional welcome email sent right after account creation.", acceptanceCriteria:["Email is sent within 30 seconds of signup"], comments:[] },
    { id:"STORY-405", title:"As a PM, I want to create a new epic", epic:"EPIC-03", status:"done", assignee:"Sanjay Sir", priority:"Medium", storyPoints:2, effort:"10h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Epic creation form with name, description and owner.", acceptanceCriteria:["New epic appears in the epics dropdown immediately"], comments:[] },
    { id:"STORY-406", title:"As a user, I want to view my notification history", epic:"EPIC-02", status:"done", assignee:"Karan Mehta", priority:"Low", storyPoints:2, effort:"8h", tags:"Notifications", dependencies:"STORY-210", riskFlag:false, description:"List of all past notifications with read/unread state.", acceptanceCriteria:["History keeps the last 90 days"], comments:[] },
    { id:"STORY-407", title:"As a system, I want to encrypt user passwords at rest", epic:"EPIC-01", status:"done", assignee:"Amrit Bose", priority:"Critical", storyPoints:5, effort:"18h", tags:"Security", dependencies:"None", riskFlag:false, description:"Passwords are hashed with a salted, adaptive algorithm.", acceptanceCriteria:["Plaintext passwords are never stored or logged"], comments:[{author:"Amrit Bose",time:"2d ago",text:"Verified with the security audit checklist."}] },
    { id:"STORY-408", title:"As a user, I want to verify my email address", epic:"EPIC-01", status:"done", assignee:"Vishal", priority:"Medium", storyPoints:2, effort:"9h", tags:"Authentication", dependencies:"None", riskFlag:false, description:"Verification link sent on signup, required before first login.", acceptanceCriteria:["Unverified accounts are prompted to resend the link"], comments:[] },
    { id:"STORY-409", title:"As a PM, I want to close a completed sprint", epic:"EPIC-03", status:"done", assignee:"Rocky", priority:"Medium", storyPoints:2, effort:"10h", tags:"Project Management", dependencies:"None", riskFlag:false, description:"Closing a sprint moves incomplete stories back to the backlog.", acceptanceCriteria:["Sprint summary is generated on close"], comments:[] },
    { id:"STORY-410", title:"As a user, I want to download my data export", epic:"EPIC-02", status:"done", assignee:"Pamir", priority:"Low", storyPoints:2, effort:"11h", tags:"Export", dependencies:"None", riskFlag:false, description:"Full account data export as a downloadable ZIP.", acceptanceCriteria:["Export link expires after 24 hours"], comments:[] },
    { id:"STORY-411", title:"As a system, I want to rate-limit login attempts", epic:"EPIC-01", status:"done", assignee:"Neha Iyer", priority:"High", storyPoints:3, effort:"12h", tags:"Security", dependencies:"None", riskFlag:false, description:"Throttles repeated login attempts from the same IP.", acceptanceCriteria:["6th failed attempt within 10 minutes triggers a lockout"], comments:[] },
  ]);

  /* ── Handlers ── */
  const handleCreate = (s) => setStories(prev=>[...prev,s]);
  const handleUpdate = (updated) => setStories(prev=>prev.map(s=>s.id===updated.id?updated:s));

  const handleCardMenuAction = (id, action) => {
    if (action === "backlog") setStories(prev => prev.map(s => s.id===id ? {...s, status:"backlog"} : s));
    if (action === "archive") setStories(prev => prev.filter(s => s.id !== id));
    if (action === "clone") setStories(prev => {
      const orig = prev.find(s=>s.id===id);
      if(!orig) return prev;
      const clone = { ...orig, id:`${orig.id}-COPY`, comments:[] };
      return [...prev, clone];
    });
    if (action === "delete") setStories(prev => prev.filter(s => s.id !== id));
    if (action === "sprint") setStories(prev => prev.map(s => s.id===id ? {...s, status:"todo"} : s));
    // "edit" / "view" would normally open the detail page or an edit modal — hooked up below.
    if (action === "edit" || action === "view") { setSelectedId(id); setPage("detail"); }
  };

  /* Drag & Drop */
  const handleDragStart = (e, id) => { dragId.current=id; e.dataTransfer.effectAllowed="move"; };
  const handleDragEnd = () => { dragId.current=null; setDragOverCol(null); };
  const handleDrop = (e, status) => {
    e.preventDefault();
    if(!dragId.current) return;
    setStories(prev=>prev.map(s=>s.id===dragId.current?{...s,status}:s));
    setDragOverCol(null);
  };

  /* Filter */
  const filtered = stories.filter(s => {
    const q = search.toLowerCase();
    return (!q || s.title?.toLowerCase().includes(q)) &&
           (filterEpic==="all" || s.epic===filterEpic) &&
           (filterSprint==="all" || s.sprint===filterSprint) &&
           (filterAssignee==="all" || s.assignee===filterAssignee);
  });
  const boardStories = filtered.filter(s => s.status !== "backlog");

  const epics = [...new Set(stories.map(s=>s.epic).filter(Boolean))];
  const assignees = [...new Set(stories.map(s=>s.assignee).filter(Boolean))];
  const selected = stories.find(s=>s.id===selectedId);

  const selectStyle = { padding:"7px 12px", borderRadius:9, border:"1px solid #E4E2D9", background:"#fff", fontSize:13.5, color:"#12141C", cursor:"pointer", outline:"none" };

  const totalListPages = Math.ceil(boardStories.length / PAGE_SIZE) || 1;
  const clampedListPage = Math.min(listPage, totalListPages);
  const pagedList = boardStories.slice((clampedListPage-1)*PAGE_SIZE, clampedListPage*PAGE_SIZE);

  // Kanban pagination is per-column (not a single flat slice), so every
  // column shows cards together on the same page instead of the page
  // being dominated by whichever status happens to sit first in the array.
  const colCounts = Object.fromEntries(COLS.map(col => [col, boardStories.filter(s=>s.status===col).length]));
  const totalKanbanPages = Math.max(1, ...COLS.map(col => Math.ceil(colCounts[col] / COLUMN_PAGE_SIZE) || 1));
  const clampedKanbanPage = Math.min(kanbanPage, totalKanbanPages);
  const pagedByCol = Object.fromEntries(COLS.map(col => {
    const colStories = boardStories.filter(s=>s.status===col);
    return [col, colStories.slice((clampedKanbanPage-1)*COLUMN_PAGE_SIZE, clampedKanbanPage*COLUMN_PAGE_SIZE)];
  }));

  const viewToggle = page==="board" ? (
    <div style={{ display:"none" }} />
  ) : null;

  return (
    <div className="usr-app" style={{ display:"flex", height:"100vh", fontFamily:"'Inter',sans-serif", color:"#12141C", background:"#F4F3EE", overflow:"hidden" }}>
      <style>{responsiveStyles}</style>
      <Sidebar open={sidebarOpen} onCollapse={()=>setSidebarOpen(!sidebarOpen)} />

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <TopBar
          title={page==="detail" ? "Story Details" : page==="backlog" ? "Product Backlog" : "User Stories"}
          onMenuClick={()=>setSidebarOpen(!sidebarOpen)}
        />

        {/* Pipeline stats — above the toolbar, like the reference design */}
        {page==="board" && (
          <div style={{ padding:"22px 22px 0" }}>
            <PipelineBar stories={stories} />
          </div>
        )}

        {/* Toolbar — only on board page */}
        {page==="board" && (
          <div className="usr-toolbar-row" style={{ padding:"0 22px 16px", background:"#F4F3EE", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #E4E2D9", borderRadius:9, padding:"7px 12px", minWidth:180, flex:1 }}>
              <I.Search />
              <input value={search} onChange={e=>{ setSearch(e.target.value); setListPage(1); setKanbanPage(1); }} placeholder="Search stories…" style={{ border:"none", outline:"none", fontSize:13.5, width:"100%", background:"transparent", fontFamily:"inherit" }} />
            </div>
            <select value={filterEpic} onChange={e=>{ setFilterEpic(e.target.value); setListPage(1); setKanbanPage(1); }} style={selectStyle}>
              <option value="all">All Epics</option>
              {epics.map(ep=><option key={ep} value={ep}>{ep}</option>)}
            </select>
            <select value={filterSprint} onChange={e=>setFilterSprint(e.target.value)} style={selectStyle}>
              <option value="all">All Sprints</option>
              <option value="sprint-1">Sprint 1</option>
              <option value="sprint-2">Sprint 2</option>
            </select>
            <select value={filterAssignee} onChange={e=>{ setFilterAssignee(e.target.value); setListPage(1); setKanbanPage(1); }} style={selectStyle}>
              <option value="all">All Assignees</option>
              {assignees.map(a=><option key={a} value={a}>{a}</option>)}
            </select>
            <div className="usr-toolbar-actions" style={{ display:"flex", gap:8, marginLeft:"auto" }}>
              <button onClick={()=>setPage("backlog")} style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 14px", borderRadius:9, border:"1px solid #E4E2D9", background:"#fff", color:"#4A4E60", fontSize:13.5, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
                <I.Book /> Backlog
              </button>
              <button onClick={()=>setView(view==="kanban"?"list":"kanban")} style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 14px", borderRadius:9, border:"1px solid #FFD4C4", background:"#FFEDE7", color:"#FF5A36", fontSize:13.5, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                {view==="kanban" ? <><I.List /> List View</> : <><I.Kanban /> Board View</>}
              </button>
              <Button variant="gradient" size="sm" gradientFrom="#FF5A36" gradientTo="#FF8C69" shape="soft" onClick={()=>{ setCreateStatus("todo"); setShowModal(true); }}>
                <I.Plus /> Create Story
              </Button>
            </div>
          </div>
        )}

        {/* Page Content */}
        {page==="detail" && selected ? (
          <StoryDetail story={selected} onBack={()=>setPage("board")} onUpdate={handleUpdate} />
        ) : page==="backlog" ? (
          <BacklogPage stories={stories} onBack={()=>setPage("board")} onMenuAction={handleCardMenuAction} />
        ) : (
          <div style={{ flex:1, overflowY:"auto", padding:"22px" }}>
            {view==="kanban" ? (
              <>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start", overflowX:"auto", paddingBottom:8 }}>
                  {COLS.map(col=>(
                    <KanbanCol
                      key={col}
                      status={col}
                      stories={pagedByCol[col]}
                      totalCount={colCounts[col]}
                      isDragOver={dragOverCol===col}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragOver={col=>setDragOverCol(col)}
                      onDrop={handleDrop}
                      onCardClick={id=>{ setSelectedId(id); setPage("detail"); }}
                      menuOpenId={menuOpenId}
                      setMenuOpenId={setMenuOpenId}
                      onMenuAction={handleCardMenuAction}
                      onAddStory={status=>{ setCreateStatus(status); setShowModal(true); }}
                    />
                  ))}
                </div>
                <Pagination
                  page={clampedKanbanPage}
                  totalPages={totalKanbanPages}
                  onChange={setKanbanPage}
                  label={<>Page <b>{clampedKanbanPage}</b> of <b>{totalKanbanPages}</b> · <b>{boardStories.length}</b> stories total</>}
                />
              </>
            ) : (
              <>
                <div style={{ background:"#fff", border:"1px solid #E4E2D9", borderRadius:14, overflow:"hidden" }}>
                  <div className="usr-list-header" style={{ display:"grid", gridTemplateColumns:"100px 1fr 120px 130px 150px 100px", gap:12, padding:"11px 16px", background:"#F8F7F3", borderBottom:"1px solid #E4E2D9", fontSize:11.5, fontWeight:700, color:"#9CA0B8", textTransform:"uppercase", letterSpacing:".06em" }}>
                    <div>ID</div><div>Title</div><div className="usr-list-col-epic">Epic</div><div className="usr-list-col-status">Status</div><div className="usr-list-col-assignee">Assignee</div><div className="usr-list-col-comments">Comments</div>
                  </div>
                  {pagedList.length===0
                    ? <div style={{ padding:"40px 24px", textAlign:"center", color:"#9CA0B8", fontSize:14 }}>No stories match your filters.</div>
                    : pagedList.map((s,i)=><ListRow key={s.id} story={s} index={(clampedListPage-1)*PAGE_SIZE+i+1} onClick={id=>{setSelectedId(id);setPage("detail");}} />)
                  }
                </div>
                <Pagination
                  page={clampedListPage}
                  totalPages={totalListPages}
                  onChange={setListPage}
                  showingFrom={boardStories.length===0 ? 0 : (clampedListPage-1)*PAGE_SIZE+1}
                  showingTo={Math.min(clampedListPage*PAGE_SIZE, boardStories.length)}
                  total={boardStories.length}
                />
              </>
            )}
          </div>
        )}
      </div>

      {showModal && <CreateModal onClose={()=>setShowModal(false)} onCreate={handleCreate} initialStatus={createStatus} />}
    </div>
  );
};

export default UserStoryReview;