import React, { useState, useEffect } from "react";
import Button from "../general/button";
import CreateGroupOptions from "../functional/createGroupOptions";
import GroupButton from "../functional/group";
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

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();

  const fetchGroups = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const groupsData = await getUserGroups(userId);
      if (groupsData) {
        const formattedGroupsData = groupsData.map((group) => ({
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
    fetchGroups(); // this alone does not overload the database with read requests
  }, [auth.currentUser]);

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
      console.error("Error logging out", error); // Debug log
    }
  };

  const handleCreateGroup = async (groupData: GroupData) => {
    console.log(`Group created with code: ${groupData.groupCode}`); // Debug log
    await fetchGroups();
    // setGroups((prevGroups) => [...prevGroups, groupData]);
    // ^hopefully better than running fetchGroups(), I'm hoping it'll lower the number of reads
  };

  const handleJoinGroup = async (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} joined`); // Debug log
    await fetchGroups();
    // setGroups((prevGroups) => [...prevGroups, groupData]);
    // ^hopefully better than running fetchGroups(), I'm hoping it'll lower the number of reads
  };

  const handleLeaveGroup = async (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} left`); // Debug log
    await fetchGroups();
  };

  const handleGroupClick = (groupCode: string) => {
    console.log(`Group ${groupCode} clicked`); // Debug log
    // this is where I'm gonna have to call the group whims
    // gonna have to send this groupId to dashboard where it gets the whims
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => handleExpand(true)}
      onMouseLeave={() => handleExpand(false)}
    >
      <h1 className="header-title">{isExpanded ? "Whims" : "W"}</h1>
      <nav className="sidebar-nav">
        <div>
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
        {groups.map((group, index) => (
          <GroupButton
            key={index}
            isExpanded={isExpanded}
            onClick={() => handleGroupClick(group.id)}
            groupData={group}
            onLeave={() => handleLeaveGroup(group)}
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