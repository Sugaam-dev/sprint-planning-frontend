import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

/**
 * MainLayout — shared shell for all authenticated admin pages.
 * Wraps every page with the collapsible Sidebar + top Navbar.
 * Usage: <MainLayout><YourPage /></MainLayout>
 */
const MainLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F4FB", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar open={sidebarOpen} onCollapse={() => setSidebarOpen(!sidebarOpen)} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", transition: "margin-left .25s ease" }}>
        <Navbar pageTitle={pageTitle} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;