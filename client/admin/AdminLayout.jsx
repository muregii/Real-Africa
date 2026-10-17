import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout" style={{ minHeight: "100vh", display: "flex" }}>
      <aside
        className="admin-sidebar"
        style={{
          width: 240,
          padding: 24,
          borderRight: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ fontWeight: 600, marginBottom: 24 }}>Admin</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
        </nav>
      </aside>

      <main
        className="admin-content"
        style={{ flex: 1, padding: 32 }}
      >
        <Outlet />
      </main>
    </div>
  );
}