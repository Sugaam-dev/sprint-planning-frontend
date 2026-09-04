import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const Icons = {
  ArrowLeft: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>,
  Refresh: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15"/></svg>,
  ChevronRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>,
  Search: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  Pencil: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  X: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

const categories = {
  Policy: { color: "#4338CA", soft: "#EEEDFC" },
  Claims: { color: "#BE185D", soft: "#FCE9F1" },
  Customer: { color: "#0E7490", soft: "#E5F5F8" },
  Underwriting: { color: "#7E22CE", soft: "#F4EBFC" },
  Payments: { color: "#15803D", soft: "#E7F6EC" },
  Compliance: { color: "#B91C1C", soft: "#FCEBEA" },
  Analytics: { color: "#C2410C", soft: "#FDEEE5" },
  Communication: { color: "#1D4ED8", soft: "#E9EFFD" },
};

const initialFeatures = [
  { id: 1, name: "Policy Management", category: "Policy", description: "Manage insurance policy creation, updates, and renewal from a single workspace.", alt: "Handle end-to-end policy lifecycle, from issuance through renewal and cancellation.", passed: false },
  { id: 2, name: "Claim Management", category: "Claims", description: "Manage claim submission, review, and settlement through a guided workflow.", alt: "Track every claim from first notice of loss through payout and closure.", passed: false },
  { id: 3, name: "Customer Management", category: "Customer", description: "Manage customer profiles, contact details, and linked policies in one record.", alt: "Keep a unified customer profile with contact history and active coverage.", passed: false },
  { id: 4, name: "Underwriting Engine", category: "Underwriting", description: "Assess applicant risk and generate coverage decisions using configurable rule sets.", alt: "Automate risk scoring and route edge cases to a human underwriter.", passed: false },
  { id: 5, name: "Premium Calculation", category: "Underwriting", description: "Calculate premiums from risk factors, coverage limits, and regional pricing tables.", alt: "Price policies dynamically based on applicant risk and market rate tables.", passed: false },
  { id: 6, name: "Agent & Broker Portal", category: "Communication", description: "Give agents and brokers a dashboard to manage client policies and commissions.", alt: "Let partners quote, bind, and track commissions without contacting support.", passed: false },
  { id: 7, name: "Document Management", category: "Policy", description: "Store, version, and retrieve policy documents, ID proofs, and signed forms.", alt: "Centralize policy paperwork with version history and e-signature support.", passed: false },
  { id: 8, name: "Payment Processing", category: "Payments", description: "Process premium payments, refunds, and installment schedules securely.", alt: "Accept recurring premiums and one-off payments with automatic retries.", passed: false },
  { id: 9, name: "Renewal Management", category: "Policy", description: "Automate renewal reminders, re-pricing, and lapse prevention workflows.", alt: "Trigger renewal offers ahead of expiry and flag policies at risk of lapsing.", passed: false },
  { id: 10, name: "Fraud Detection", category: "Compliance", description: "Flag suspicious claims using pattern analysis and anomaly scoring.", alt: "Surface high-risk claims for investigation using historical fraud signals.", passed: false },
  { id: 11, name: "Reporting & Analytics", category: "Analytics", description: "Generate dashboards on policy performance, claims ratio, and retention.", alt: "Give leadership real-time visibility into loss ratios and growth trends.", passed: false },
  { id: 12, name: "Notification System", category: "Communication", description: "Send policy, claim, and payment alerts via email, SMS, and push.", alt: "Keep customers informed with timely, channel-aware status updates.", passed: false },
  { id: 13, name: "Quote Generation", category: "Underwriting", description: "Produce instant, itemized quotes based on applicant inputs and coverage options.", alt: "Return a bindable quote in seconds from a short applicant questionnaire.", passed: false },
  { id: 14, name: "Policy Comparison", category: "Customer", description: "Let customers compare coverage plans side-by-side before purchase.", alt: "Show plan differences clearly so customers can choose coverage with confidence.", passed: false },
  { id: 15, name: "Claims Adjuster Assignment", category: "Claims", description: "Automatically route incoming claims to available adjusters by workload and specialty.", alt: "Balance adjuster caseloads while matching claims to the right expertise.", passed: false },
  { id: 16, name: "Risk Assessment", category: "Underwriting", description: "Score applicant risk using historical claims data and external risk indices.", alt: "Combine internal history and third-party data into a single risk score.", passed: false },
  { id: 17, name: "Regulatory Compliance", category: "Compliance", description: "Track policy compliance against regional insurance regulations and audit trails.", alt: "Maintain an audit-ready record of compliance checks across regions.", passed: false },
  { id: 18, name: "Customer Support Chat", category: "Communication", description: "Provide in-app live chat and ticketing for customer policy questions.", alt: "Resolve policy and claim questions in-app without a phone transfer.", passed: false }
];

const PipelineStep = ({ number, label, status }) => {
  const isActive = status === "active";
  const isDone = status === "done";
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px 6px 8px",borderRadius:20,background:isActive?"#EDF1FE":"transparent",border:isActive?"1px solid #D7E0FB":"1px solid transparent"}}>
      <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,fontFamily:"'IBM Plex Mono',monospace",background:isDone?"#16A34A":isActive?"#2563EB":"#fff",border:isDone||isActive?"none":"1.5px solid #E3E7F5",color:isDone||isActive?"#fff":"#9599AC"}}>
        {isDone ? <Icons.Check /> : number}
      </div>
      <span style={{fontSize:12.5,fontWeight:isActive?600:500,color:isActive?"#1D4ED8":"#9599AC"}}>{label}</span>
    </div>
  );
};

const StatCard = ({ value, label, color, showBar, barValue }) => (
  <div style={{background:"#fff",border:"1px solid #E3E7F5",borderRadius:14,padding:"18px 22px",flex:1,minWidth:140,boxShadow:"0 1px 2px rgba(37,99,235,.05),0 10px 28px -14px rgba(124,58,237,.12)"}}>
    <div style={{fontSize:28,fontWeight:800,fontFamily:"'Poppins',sans-serif",color:color||"#1A1A2E",marginBottom:4}}>{value}</div>
    <div style={{fontSize:13,color:"#686D80"}}>{label}</div>
    {showBar && <div style={{marginTop:10,height:5,borderRadius:999,background:"#E3E7F5",overflow:"hidden"}}><div style={{height:"100%",width:`${barValue||0}%`,background:"linear-gradient(135deg,#2563EB,#9333EA)",borderRadius:999,transition:"width .4s ease"}} /></div>}
  </div>
);

const FeatureRow = ({ index, feature, onEdit, onDelete, onPass, onRegenerate }) => {
  const cat = categories[feature.category] || {color:"#686D80",soft:"#F3F4F6"};
  return (
    <div style={{display:"grid",gridTemplateColumns:"48px 1fr 1.55fr 175px",alignItems:"center",gap:16,padding:"14px 20px",borderBottom:"1px solid #ECEFFA",background:feature.passed?"#F0FDF4":"#fff",transition:"background .2s ease"}}>
      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:"#9599AC",fontWeight:500}}>{String(index).padStart(2,"0")}</div>
      <div>
        <div style={{fontWeight:600,fontSize:14,color:"#1A1A2E",marginBottom:7}}>{feature.name || <span style={{color:"#9599AC",fontStyle:"italic"}}>Untitled</span>}</div>
        <span style={{fontSize:11.5,fontWeight:600,color:cat.color,background:cat.soft,border:`1px solid ${cat.color}22`,borderRadius:20,padding:"3px 8px"}}>{feature.category}</span>
      </div>
      <div style={{fontSize:13.5,color:"#686D80",lineHeight:1.5}}>{feature.description || <span style={{color:"#C4C7D4",fontStyle:"italic"}}>No description</span>}</div>
      <div style={{display:"flex",gap:6,justifyContent:"flex-end",alignItems:"center"}}>
        {feature.passed ? (
          <span style={{fontSize:12,fontWeight:600,color:"#16A34A",background:"#E9F9EF",border:"1px solid #BCEBCB",borderRadius:20,padding:"4px 10px",display:"inline-flex",alignItems:"center",gap:4}}><Icons.Check /> Passed</span>
        ) : (
          <>
            <button onClick={() => onEdit(feature)} title="Edit" style={{width:32,height:32,borderRadius:8,border:"1px solid #E3E7F5",background:"#F8F9FE",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#686D80"}}><Icons.Pencil /></button>
            <button onClick={() => onRegenerate(feature.id)} title="Regenerate description" style={{width:32,height:32,borderRadius:8,border:"1px solid #E3E7F5",background:"#F8F9FE",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#686D80"}}><Icons.Refresh /></button>
            <button onClick={() => onDelete(feature.id)} title="Delete" style={{width:32,height:32,borderRadius:8,border:"1px solid #FCE8E8",background:"#FFF5F5",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#DC2626"}}><Icons.Trash /></button>
            <button onClick={() => onPass(feature.id)} title="Pass to Agent 2" style={{height:32,borderRadius:8,border:"1px solid #D7E0FB",background:"#EDF1FE",cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#2563EB",padding:"0 10px",fontSize:12,fontWeight:600,gap:4}}><Icons.ChevronRight /> Pass</button>
          </>
        )}
      </div>
    </div>
  );
};

const EditModal = ({ feature, onSave, onClose }) => {
  const [name,setName] = useState(feature?.name || "");
  const [desc,setDesc] = useState(feature?.description || "");
  const inputStyle = {width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid #E3E7F5",fontSize:14,outline:"none",fontFamily:"inherit",color:"#1A1A2E",background:"#F8F9FE",boxSizing:"border-box"};
  const labelStyle = {display:"block",fontSize:12.5,fontWeight:600,color:"#686D80",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"};
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,26,46,.45)",backdropFilter:"blur(4px)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:20,padding:"28px 32px",width:"min(520px,90vw)",boxShadow:"0 24px 60px -16px rgba(124,58,237,.35)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:800,fontFamily:"'Poppins',sans-serif"}}>Edit Feature</h2>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#9599AC"}}><Icons.X /></button>
        </div>
        <label style={labelStyle}>Feature Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} style={{...inputStyle,marginBottom:16}} />
        <label style={labelStyle}>Description</label>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} style={{...inputStyle,resize:"vertical"}} />
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="gradient" size="sm" gradientFrom="#2563EB" gradientTo="#9333EA" shape="soft" onClick={() => onSave({...feature,name,description:desc})}>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

const FeatureReview = () => {
  const navigate = useNavigate();
  const [features,setFeatures] = useState(initialFeatures);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [editTarget,setEditTarget] = useState(null);

  const total = features.length;
  const passed = features.filter(f=>f.passed).length;
  const pending = total-passed;
  const pct = total ? Math.round((passed/total)*100) : 0;

  const filtered = useMemo(() => features.filter(f => {
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
    const matchesCategory = category === "All" || f.category === category;
    return matchesSearch && matchesCategory;
  }), [features,search,category]);

  const handlePass = id => setFeatures(prev=>prev.map(f=>f.id===id?{...f,passed:true}:f));
  const handleDelete = id => setFeatures(prev=>prev.filter(f=>f.id!==id));
  const handleEdit = feature => setEditTarget(feature);
  const handleSave = updated => {setFeatures(prev=>prev.map(f=>f.id===updated.id?updated:f));setEditTarget(null);};
  const handlePassAll = () => setFeatures(prev=>prev.map(f=>({...f,passed:true})));
  const handleRegenerate = id => setFeatures(prev=>prev.map(f=>f.id===id?{...f,description:f.alt,alt:f.description}:f));
  const handleRegenerateAll = () => setFeatures(prev=>prev.map(f=>({...f,description:f.alt,alt:f.description})));
  const handleAdd = () => {
    const n={id:Date.now(),name:"",category:"Policy",description:"",alt:"",passed:false};
    setFeatures(prev=>[...prev,n]); setEditTarget(n);
  };

  const exportFeatures = () => {
    const blob = new Blob([JSON.stringify(features,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download="extracted-features.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:"#1A1A2E",background:"radial-gradient(900px 420px at 8% -8%,rgba(37,99,235,.07),transparent 60%),radial-gradient(800px 400px at 96% 10%,rgba(147,51,234,.06),transparent 60%),#F1F4FB"}}>
      <header style={{position:"sticky",top:0,zIndex:30,background:"rgba(255,255,255,.82)",backdropFilter:"blur(10px)",borderBottom:"1px solid #E3E7F5",padding:"0 32px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#2563EB,#9333EA)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:11,fontWeight:700,fontFamily:"'Poppins',sans-serif"}}>P</span></div>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,background:"linear-gradient(135deg,#2563EB,#9333EA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>PMRG Solution</span>
          <div style={{width:1,height:20,background:"#E3E7F5",margin:"0 6px"}} />
          <span style={{fontSize:13,color:"#686D80"}}>Project: <b style={{color:"#1A1A2E"}}>Insurance App</b></span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <PipelineStep number={1} label="Extract Features" status="active" />
          <div style={{width:22,height:1,background:"#E3E7F5"}} />
          <PipelineStep number={2} label="Generate User Stories" status="pending" />
          <div style={{width:22,height:1,background:"#E3E7F5"}} />
          <PipelineStep number={3} label="Review & Refine" status="pending" />
        </div>
      </header>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 32px 120px"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,marginBottom:20}}>
          <div>
            <button onClick={()=>navigate(-1)} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:"#686D80",background:"none",border:"none",cursor:"pointer",fontWeight:500,marginBottom:10,padding:0}}><Icons.ArrowLeft /> Back to project</button>
            <h1 style={{margin:"0 0 4px",fontSize:27,fontWeight:800,fontFamily:"'Poppins',sans-serif",background:"linear-gradient(135deg,#2563EB,#9333EA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-flex",alignItems:"center",gap:10}}>
              Extracted Features
              <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,fontWeight:600,color:"#1D4ED8",background:"#EDF1FE",border:"1px solid #D7E0FB",padding:"3px 9px",borderRadius:20,WebkitTextFillColor:"#1D4ED8"}}>AGENT 1</span>
            </h1>
            <p style={{margin:0,fontSize:14,color:"#686D80"}}>Review each feature below, then pass it forward to generate user stories.</p>
          </div>
          <button title="Export" onClick={exportFeatures} style={{width:36,height:36,borderRadius:9,border:"1px solid #E3E7F5",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#686D80"}}><Icons.Download /></button>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:14,background:"#E9F9EF",border:"1px solid #BCEBCB",borderRadius:12,padding:"13px 18px",marginBottom:24}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"#16A34A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icons.Check /></div>
          <p style={{margin:0,fontSize:14,color:"#166534"}}><strong>Features extracted successfully.</strong> Review, edit, or regenerate each entry, then pass it to the next agent.</p>
        </div>

        <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:24}}>
          <StatCard value={total} label="Total features found" />
          <StatCard value={passed} label="Passed to Agent 2" color="#16A34A" />
          <StatCard value={pending} label="Awaiting review" color={pending>0?"#D97706":"#1A1A2E"} />
          <StatCard value={`${pct}%`} label="Review complete" color="#2563EB" showBar barValue={pct} />
        </div>

        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",border:"1px solid #E3E7F5",borderRadius:10,padding:"8px 14px",flex:1,minWidth:220}}>
            <Icons.Search />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search features…" style={{border:"none",outline:"none",fontSize:14,color:"#1A1A2E",width:"100%",background:"transparent",fontFamily:"inherit"}} />
          </div>
          <Button variant="secondary" size="sm" onClick={handleAdd}><Icons.Plus /> Add feature</Button>
        </div>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          {["All",...Object.keys(categories)].map(c => (
            <button key={c} onClick={()=>setCategory(c)} style={{border:"1px solid "+(category===c?"#D7E0FB":"#E3E7F5"),background:category===c?"#EDF1FE":"#fff",color:category===c?"#1D4ED8":"#686D80",borderRadius:20,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{c}</button>
          ))}
        </div>

        <div style={{background:"#fff",border:"1px solid #E3E7F5",borderRadius:16,overflow:"hidden",boxShadow:"0 1px 2px rgba(37,99,235,.05),0 10px 28px -14px rgba(124,58,237,.12)"}}>
          <div style={{display:"grid",gridTemplateColumns:"48px 1fr 1.55fr 175px",gap:16,padding:"12px 20px",background:"#F8F9FE",borderBottom:"1px solid #E3E7F5",fontSize:12,fontWeight:700,color:"#9599AC",textTransform:"uppercase",letterSpacing:".06em"}}>
            <div>#</div><div>Feature</div><div>Description</div><div style={{textAlign:"right"}}>Actions</div>
          </div>
          {filtered.length===0 ? (
            <div style={{padding:"48px 24px",textAlign:"center",color:"#9599AC"}}>
              <div style={{marginBottom:12,opacity:.5}}><Icons.Search /></div>
              <p style={{margin:0,fontSize:14}}>{search ? "No features match your search." : "No features yet — they will appear here once the AI agent extracts them."}</p>
            </div>
          ) : filtered.map((f,i)=><FeatureRow key={f.id} index={i+1} feature={f} passed={f.passed} onEdit={handleEdit} onDelete={handleDelete} onPass={handlePass} onRegenerate={handleRegenerate} />)}
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(255,255,255,.92)",backdropFilter:"blur(10px)",borderTop:"1px solid #E3E7F5",zIndex:20}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:13.5,fontWeight:600,color:"#686D80"}}>{passed} of {total} passed</span>
            <div style={{width:180,height:6,borderRadius:999,background:"#E3E7F5",overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(135deg,#2563EB,#9333EA)",borderRadius:999,transition:"width .4s ease"}} /></div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Button variant="secondary" size="sm" onClick={handleRegenerateAll}><Icons.Refresh /> Regenerate all</Button>
            <Button variant="gradient" size="sm" gradientFrom="#2563EB" gradientTo="#9333EA" shape="soft" onClick={handlePassAll} disabled={total===0}><Icons.Check /> Pass all to Agent 2</Button>
          </div>
        </div>
      </div>

      {editTarget && <EditModal feature={editTarget} onSave={handleSave} onClose={()=>setEditTarget(null)} />}
    </div>
  );
};

export default FeatureReview;
