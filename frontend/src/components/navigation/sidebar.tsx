import React, { useState } from "react";
import Button from "../general/button";
import GroupManagement from "../functional/groupManagement";
import Group from "../functional/group";
import Settings from "./settings";
import Account from "./account";
import { GroupData } from "../../types/dataTypes";
  faHome,
  faCog,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import { useApp } from "../../context/context";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const { userGroups, setCurrentGroup, updateGroups } = useApp();

  const handleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
    document.body.classList.toggle("sidebar-expanded", expanded);
  };

  const handleSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleAccount = () => setShowAccount(true);
  const handleCloseAccount = () => setShowAccount(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const handleCreateGroup = async () => {
    await updateGroups();
  };

  const handleJoinGroup = async () => {
    await updateGroups();
  };

  const handleGroupClick = (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} button clicked`);
    setCurrentGroup(groupData);
  };

  const handleHomeClick = () => {
    console.log("Home clicked");
    setCurrentGroup(undefined);
  };

  return (
    <>
      <div
        className={`sidebar ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={() => handleExpand(true)}
        onMouseLeave={() => handleExpand(false)}
      >
        <h1 className="header-title">{isExpanded ? "Whims" : "W"}</h1>
        <nav className="sidebar-nav">
          <div id="groups">
            <Button
              icon={faHome}
              onClick={handleHomeClick}
              className="nav-item home-button"
              label="Home"
              isExpanded={isExpanded}
            />
            {userGroups.map((group, index) => (
              <Group
                key={index}
                isExpanded={isExpanded}
                onClick={() => handleGroupClick(group)}
                groupData={group}
              />
            ))}
          </div>
          <GroupManagement
            isExpanded={isExpanded}
            onCreateGroup={handleCreateGroup}
            onJoinGroup={handleJoinGroup}
          />
          <div className="bottom-buttons">
            <Button
              icon={faCog}
              onClick={handleSettings}
              className="nav-item bottom-button"
              label="Group Settings"
              isExpanded={isExpanded}
            />
            <Button
              icon={faUser}
              onClick={handleAccount}
              className="nav-item bottom-button"
              label="Account"
              isExpanded={isExpanded}
            />
            <Button
              icon={faSignOutAlt}
              onClick={handleLogout}
              className="nav-item bottom-button"
              label="Logout"
              isExpanded={isExpanded}
            />
          </div>
        </nav>
      </div>
      {showSettings && <Settings onClose={handleCloseSettings} />}
      {showAccount && <Account onClose={handleCloseAccount} />}
    </>
  );
};

export default Sidebar;
