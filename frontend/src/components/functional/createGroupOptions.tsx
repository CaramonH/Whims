import React, { useState } from "react";
import Button from "../general/button";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CreateGroup from "./createGroup";
import JoinGroup from "./joinGroup";

interface GroupOptionsButtonProps {
  isExpanded: boolean;
  onCreateGroup: (groupCode: string) => void;
  onJoinGroup: (groupCode: string) => void;
}

const CreateGroupOptions: React.FC<GroupOptionsButtonProps> = ({
  isExpanded,
  onCreateGroup,
  onJoinGroup,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className="create-group-options"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <Button
        icon={faPlusCircle}
        onClick={() => {}}
        className="nav-item create-group-button"
        label="Create / Join"
        isExpanded={isExpanded}
      />
      {showOptions && isExpanded && (
        <div className="group-options">
          <CreateGroup onCreateGroup={onCreateGroup} />
          <JoinGroup onJoinGroup={onJoinGroup} />
        </div>
      )}
    </div>
  );
};

export default CreateGroupOptions;
