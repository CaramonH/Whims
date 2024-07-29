import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface GroupButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  groupCode: string;
}

const GroupButton: React.FC<GroupButtonProps> = ({
  isExpanded,
  onClick,
  groupCode,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
      <button onClick={onClick} className="nav-item group-button">
        <FontAwesomeIcon icon={faUser} />
        {isExpanded && <span className="label">{groupCode}</span>}
      </button>
    </div>
  );
};

export default GroupButton;
