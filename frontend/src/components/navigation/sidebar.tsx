import React, { useState } from "react";
import Button from "../general/button";
import {
  faHome,
  faCog,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./navigation.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHome = () => console.log("Home clicked");
  const handleSettings = () => console.log("Settings clicked");
  const handleAccount = () => console.log("Account clicked");
  const handleLogout = () => console.log("Logout clicked");

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="sidebar-nav">
        <div>
          <Button
            icon={faHome}
            onClick={handleHome}
            className="nav-item home-button"
            label="Home"
          />
        </div>
        <div className="bottom-buttons">
          <Button
            icon={faCog}
            onClick={handleSettings}
            className="nav-item"
            label="Settings"
          />
          <Button
            icon={faUser}
            onClick={handleAccount}
            className="nav-item"
            label="Account"
          />
          <Button
            icon={faSignOutAlt}
            onClick={handleLogout}
            className="nav-item"
            label="Logout"
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
