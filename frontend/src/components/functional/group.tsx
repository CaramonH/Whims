import React from "react";

// This component is a group element in the navigation bar that represents a group
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
}

const Group: React.FC<GroupButtonProps> = ({
  isExpanded,
  onClick,
  groupData,
}) => {
  return (
    <div className="group-item">
      <button onClick={onClick} className="nav-item group-button">
        <div className="group-icon">
          {isExpanded ? groupData.groupName : groupData.groupName[0] || "G"}
        </div>
      </button>
    </div>
  );
};

export default Group;
