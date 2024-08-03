import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { leaveGroup } from "../../firebaseService";
import { getAuth } from "firebase/auth";

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
}

interface GroupButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  groupData: GroupData;
  onLeave: () => void;
}

const Group: React.FC<GroupButtonProps> = ({
  isExpanded,
  onClick,
  groupData,
  onLeave,
}) => {
  const auth = getAuth();

  const handleOnLeave = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        // Remove user from group in the database
        await leaveGroup(userId, groupData.id);
        onLeave(); // Notify parent component
      } catch (e) {
        console.error("Error leaving group (group.tsx): ", e);
      }
    }
  };

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} className="group-item">
      <button onClick={onClick} className="nav-item group-button">
        <div className="group-icon">
          {isExpanded ? groupData.groupName : groupData.groupName[0] || "G"}{" "}
          {/* Display full name if expanded, otherwise first letter */}
        </div>
      </button>
      {isExpanded && (
        <button onClick={handleOnLeave} className="leave-button">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      )}
    </div>
  );
};

export default Group;
