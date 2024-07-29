import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { leaveGroup } from '../../firebaseService';
import { getAuth } from "firebase/auth";

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
};

interface GroupButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  groupData: GroupData;
  onLeave: () => void;
}

const GroupButton: React.FC<GroupButtonProps> = ({
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
        // Add to global groups collection
        await leaveGroup(userId, groupData.id);

        onLeave(); // I really hope this works...
      } catch (e) {
        console.error("Error leaving group (group.tsx): ", e);
      }
    }
  };

  return (
    <>
      <button onClick={onClick} className="nav-item group-button">
        <FontAwesomeIcon icon={faUser} />
        {isExpanded && <span className="label">{groupData.groupCode}</span>}
      </button>
      <button onClick={handleOnLeave}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
    </>
  );
};

export default GroupButton;
