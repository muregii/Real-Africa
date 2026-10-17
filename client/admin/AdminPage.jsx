import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
      </nav>
      <main style={{ flex: 1, padding: 20 }}><Outlet /> </main>
      
    </div>
  );
}