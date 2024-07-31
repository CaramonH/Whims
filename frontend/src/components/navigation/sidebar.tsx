import React, { useState, useEffect } from "react";
import Button from "../general/button";
import CreateGroupOptions from "../functional/createGroupOptions";
import GroupButton from "../functional/group";
import Settings from "./settings";
import Account from "./account";
import { faHome, faCog, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import { getUserGroups } from "../../firebaseService";

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
};

interface SidebarProps {
  onSelectGroup: (groupData: GroupData) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onSelectGroup }) => {
// const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const fetchGroups = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const groupsData = await getUserGroups(userId);
      if (groupsData) {
        const formattedGroupsData: GroupData[] = groupsData.map((group) => ({
          id: group.id,
          createdAt: group.createdAt,
          groupName: group.groupName || null,
          groupCode: group.groupCode,
        }));
        setGroups(formattedGroupsData);
      }
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [auth.currentUser]);

  const handleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
    document.body.classList.toggle("sidebar-expanded", expanded);
  };

  const handleHome = () => console.log("Home clicked");
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

  const handleCreateGroup = async (groupData: GroupData) => {
    console.log(`Group created with code: ${groupData.groupCode}`); // Debug log
    await fetchGroups();
  };

  const handleJoinGroup = async (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} joined`); // Debug log
    await fetchGroups();
  };

  const handleLeaveGroup = async (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} left`); // Debug log
    await fetchGroups();
  };

  const handleGroupClick = (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} selected`); // Debug log
    onSelectGroup(groupData);
    // this is where I tell dashboard to get whims by group
    // this should actually be a filter, not an API thing
    // but maybe I should make it so that if a group is selected,
    // it only refreshes the cards of the group rather than all user whims
    // when whims are created/deleted/etc
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
          <div id='groups'>
            <Button
              icon={faHome}
              onClick={handleHome}
              className="nav-item home-button"
              label="Home"
              isExpanded={isExpanded}
            />
            {groups.map((group, index) => (
              <GroupButton
                key={index}
                isExpanded={isExpanded}
                onClick={() => handleGroupClick(group)}
                groupData={group}
                onLeave={() => handleLeaveGroup(group)}
              />
            ))}
          </div>
          <CreateGroupOptions
            isExpanded={isExpanded}
            onCreateGroup={handleCreateGroup}
            onJoinGroup={handleJoinGroup}
          />
          <div className="bottom-buttons">
            <Button
              icon={faCog}
              onClick={handleSettings}
              className="nav-item bottom-button"
              label="Settings"
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
