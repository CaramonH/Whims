import React, { useRef, useEffect } from "react";
import Button from "../general/button";
import { faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../navigation/navigation.css";
import { leaveGroup } from "../../firebaseService";
import { getAuth } from "firebase/auth";
import { useApp } from "../../context/context";

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const auth = getAuth();
  const { userGroups, updateGroups } = useApp();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleLeaveGroup = async (groupId: string) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        await leaveGroup(userId, groupId);
        await updateGroups();
      } catch (e) {
        console.error("Error leaving group (settings.tsx): ", e);
      }
    }
  };

  return (
    <div className="pop-window-overlay">
      <div className="pop-window" ref={windowRef}>
        <div className="settings-window-content">
          <Button
            icon={faTimes}
            onClick={onClose}
            className="close-button pop-up-close"
            label=""
          />
          <div className="pop-window-header">
            <h2>Group Settings</h2>
          </div>
          <div className="group-info">
            <h3>Your Groups:</h3>
            {userGroups.map((group) => (
              <div key={group.id} className="group-item">
                <p className="group-name"> {group.groupName} </p>
                <p className="settings-group-code">
                  {" "}
                  - Code: {group.groupCode}{" "}
                </p>
                <Button
                  icon={faSignOutAlt}
                  onClick={() => handleLeaveGroup(group.id)}
                  className="leave-button"
                  label="Leave"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
