import React from "react";
import AdminUsers from "./AdminUsers";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard" style={{ padding: "24px" }}>
      <h1>Admin Dashboard</h1>

      <section style={{ marginTop: "24px" }}>
        <h2>Users Management</h2>
        <AdminUsers />
      </section>
    </div>
  );
};

export default AdminDashboard;