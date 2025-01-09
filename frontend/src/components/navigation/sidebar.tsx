// src/components/navigation/Sidebar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "../shared/Button";
import GroupManagement from "../functional/groupManagement";
import Group from "../functional/group";
import Settings from "./settings";
import Account from "./account";
import { useApp } from "../../context/AppContext";
import {
  faHome,
  faCog,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { GroupData } from "../../types/dataTypes";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const { userGroups, currentGroup, setCurrentGroup, updateGroups } = useApp();

  const handleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
    document.body.classList.toggle("sidebar-expanded", expanded);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const handleCreateGroup = async (groupData: GroupData) => {
    await updateGroups();
  };

  const handleJoinGroup = async (groupData: GroupData) => {
    await updateGroups();
  };

  const handleLeaveGroup = async (groupId: string) => {
    await updateGroups();
  };

  return (
    <>
      <div
        className={`w-64 h-screen bg-white shadow-lg transition-all duration-200 
                   ${isExpanded ? "translate-x-0" : "-translate-x-48"}`}
        onMouseEnter={() => handleExpand(true)}
        onMouseLeave={() => handleExpand(false)}
      >
        <h1 className="text-2xl font-bold p-4">{isExpanded ? "Whims" : "W"}</h1>

        <nav className="flex flex-col h-full">
          <div className="flex-1">
            <Button
              icon={faHome}
              onClick={() => setCurrentGroup(undefined)}
              className="w-full hover:bg-gray-100"
              label="Home"
              isExpanded={isExpanded}
            />

            {userGroups.map((group) => (
              <Group
                key={group.id}
                isExpanded={isExpanded}
                onClick={() => setCurrentGroup(group)}
                groupData={group}
              />
            ))}
          </div>

          <GroupManagement
            isExpanded={isExpanded}
            onCreateGroup={handleCreateGroup}
            onJoinGroup={handleJoinGroup}
          />

          <div className="border-t p-2">
            <Button
              icon={faCog}
              onClick={() => setShowSettings(true)}
              className="w-full hover:bg-gray-100 mb-2"
              label="Group Settings"
              isExpanded={isExpanded}
            />
            <Button
              icon={faUser}
              onClick={() => setShowAccount(true)}
              className="w-full hover:bg-gray-100 mb-2"
              label="Account"
              isExpanded={isExpanded}
            />
            <Button
              icon={faSignOutAlt}
              onClick={handleLogout}
              className="w-full hover:bg-gray-100"
              label="Logout"
              isExpanded={isExpanded}
            />
          </div>
        </nav>
      </div>

      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          onLeaveGroup={handleLeaveGroup}
        />
      )}
      {showAccount && <Account onClose={() => setShowAccount(false)} />}
    </>
  );
};

export default Sidebar;
