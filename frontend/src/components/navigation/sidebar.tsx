import React, { useState } from "react";
import Button from "../general/button";
import CreateGroupOptions from "../functional/createGroupOptions";
import GroupButton from "../functional/group";
import {
  faHome,
  faCog,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./navigation.css";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
    document.body.classList.toggle("sidebar-expanded", expanded);
  };

  const handleHome = () => console.log("Home clicked");
  const handleSettings = () => console.log("Settings clicked");
  const handleAccount = () => console.log("Account clicked");
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  // managing groups //
  const handleCreateGroup = (groupCode: string) => {
    // send it to a server here
    console.log(`Group created with code: ${groupCode}`);
  };
  const handleJoinGroup = (groupCode: string) => {
    setGroups((prevGroups) => [...prevGroups, groupCode]);
  };
  const handleGroupClick = (groupCode: string) => {
    console.log(`Group ${groupCode} clicked`);
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => handleExpand(true)}
      onMouseLeave={() => handleExpand(false)}
    >
      <h1 className="header-title">{isExpanded ? "Whims" : "W"}</h1>
      <nav className="sidebar-nav">
        <div id='groups'>
          <Button
            icon={faHome}
            onClick={handleHome}
            className="nav-item home-button"
            label="Home"
            isExpanded={isExpanded}
          />
        </div>
        <CreateGroupOptions
          isExpanded={isExpanded}
          onCreateGroup={handleCreateGroup}
          onJoinGroup={handleJoinGroup}
        />
        {groups.map((groupCode) => (
          <GroupButton
            key={groupCode}
            isExpanded={isExpanded}
            onClick={() => handleGroupClick(groupCode)}
            groupCode={groupCode}
          />
        ))}
        <div className="bottom-buttons">
          <Button
            icon={faCog}
            onClick={handleSettings}
            className="nav-item"
            label="Settings"
            isExpanded={isExpanded}
          />
          <Button
            icon={faUser}
            onClick={handleAccount}
            className="nav-item"
            label="Account"
            isExpanded={isExpanded}
          />
          <Button
            icon={faSignOutAlt}
            onClick={handleLogout}
            className="nav-item"
            label="Logout"
            isExpanded={isExpanded}
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
