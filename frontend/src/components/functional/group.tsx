import React from "react";

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
