import React, { useRef, useEffect, useState } from "react";
import Button from "../general/button";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CreateGroup from "./createGroup";
import JoinGroup from "./joinGroup";

interface GroupOptionsButtonProps {
  isExpanded: boolean;
  onCreateGroup: (groupCode: string) => void;
  onJoinGroup: (groupCode: string) => void;
  onClose: () => void;
}

const CreateGroupOptions: React.FC<GroupOptionsButtonProps> = ({
  isExpanded,
  onCreateGroup,
  onJoinGroup,
  onClose,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const [showOptions, setShowOptions] = useState(false);

  const handleClose = () => {
    setShowOptions(false);
  };

  return (
    <div className="create-group-options">
      <Button
        icon={faPlusCircle}
        onClick={() => setShowOptions(true)}
        className="nav-item create-group-button"
        label="Create / Join"
        isExpanded={isExpanded}
      />
      {showOptions && isExpanded && (
        <div className="pop-window-overlay">
          <div className="pop-window" ref={windowRef}>
            <Button
              icon={faTimes}
              onClick={handleClose}
              className="close-button"
              label=""
            />
            <div className="group-options">
              <CreateGroup onCreateGroup={onCreateGroup} />
              <JoinGroup onJoinGroup={onJoinGroup} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroupOptions;
