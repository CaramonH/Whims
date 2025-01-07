import React, { useState, useEffect } from "react";
import Button from "../general/button";
import GroupManagement from "../functional/groupManagement";
import Group from "../functional/group";
import Settings from "./settings";
import Account from "./account";
import {
  faHome,
  faCog,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import { getUserGroups } from "../../firebaseService";
import { GroupData } from "../types/groupData";

// This component is the sidebar navigation for the application
interface SidebarProps {
  onSelectGroup: (groupData?: GroupData) => void;
  onGetGroupList: (groupList: GroupData[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectGroup, onGetGroupList }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // Pass the group list to the parent component
  onGetGroupList(groups);

  // Fetch the user's groups from Firestore
  const fetchGroups = async (): Promise<void> => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const groupsData = await getUserGroups(userId);
      // Type assertion to ensure that groupsData is an array of GroupData
      const formattedGroupsData: GroupData[] = (groupsData as GroupData[]).map(
        (group) => ({
          id: group.id,
          createdAt: group.createdAt,
          createdBy: group.createdBy,
          groupName: group.groupName || "Unnamed Group", // Provide a default value if null or undefined
          groupCode: group.groupCode,
        })
      );
      setGroups(formattedGroupsData);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [auth.currentUser]);

  // Expand or collapse the sidebar
  const handleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
    document.body.classList.toggle("sidebar-expanded", expanded);
  };

  // Event handlers for the sidebar buttons
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

  ////////////////////
  ///// HANDLERS /////
  ////////////////////
  const handleCreateGroup = async (groupData: GroupData) => {
    console.log(`Group created with code: ${groupData.groupCode}`); // Debug log
    await fetchGroups();
  };

  const handleJoinGroup = async (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} joined`); // Debug log
    await fetchGroups();
  };

  const handleLeaveGroup = async (groupId: string) => {
    await fetchGroups();
  };

  const handleGroupClick = (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} button clicked`);
    onSelectGroup(groupData);
  };

  const handleHomeClick = () => {
    console.log("Home clicked");
    onSelectGroup(undefined); // Passing undefined to show all groups
  };

  // Render the sidebar
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
              onClick={() => handleHomeClick()}
              className="nav-item home-button"
              label="Home"
              isExpanded={isExpanded}
            />
            {groups.map((group, index) => (
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
      {showSettings && (
        <Settings
          onClose={handleCloseSettings}
          groups={groups}
          onLeaveGroup={handleLeaveGroup}
        />
      )}
      {showAccount && <Account onClose={handleCloseAccount} />}
    </>
  );
};

export default Sidebar;
