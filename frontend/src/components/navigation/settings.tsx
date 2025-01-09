// src/components/settings/Settings.tsx
import React from "react";
import { getAuth } from "firebase/auth";
import { Modal } from "../shared/Modal";
import { Button } from "../shared/Button";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { leaveGroup } from "../../firebaseService";
import { useApp } from "../../context/AppContext";
import { GroupData } from "../../types/dataTypes";

interface SettingsProps {
  onClose: () => void;
  onLeaveGroup: (groupId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose, onLeaveGroup }) => {
  const { userGroups } = useApp();
  const auth = getAuth();

  const handleLeaveGroup = async (groupId: string) => {
    if (auth.currentUser) {
      try {
        await leaveGroup(auth.currentUser.uid, groupId);
        onLeaveGroup(groupId);
      } catch (e) {
        console.error("Error leaving group:", e);
      }
    }
  };

  return (
    <Modal title="Group Settings" onClose={onClose}>
      <div className="space-y-6">
        <div className="group-info">
          <h3 className="text-lg font-medium mb-4">Your Groups:</h3>
          <div className="space-y-4">
            {userGroups.map((group: GroupData) => (
              <div
                key={group.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{group.groupName}</p>
                  <p className="text-sm text-gray-600">
                    Code: {group.groupCode}
                  </p>
                </div>
                <Button
                  icon={faSignOutAlt}
                  onClick={() => handleLeaveGroup(group.id)}
                  className="text-red-500 hover:text-red-600"
                  label="Leave"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
