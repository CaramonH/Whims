import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface GroupButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const GroupButton: React.FC<GroupButtonProps> = ({ isExpanded, onClick }) => {
  return (
    <button onClick={onClick} className="nav-item group-button">
      <FontAwesomeIcon icon={faUser} />
      {isExpanded && <span className="label">Group</span>}
    </button>
  );
};

export default GroupButton;
