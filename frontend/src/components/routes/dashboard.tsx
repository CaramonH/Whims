import React from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="main-content">
          {/* Your main dashboard content goes here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
