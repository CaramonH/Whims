import React from "react";
import Button from "../general/button";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface CreateGroupButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const CreateGroup: React.FC<CreateGroupButtonProps> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <Button
      icon={faPlusCircle}
      onClick={onClick}
      className="nav-item create-group-button"
      label="Create Group"
      isExpanded={isExpanded}
    />
  );
};

export default CreateGroup;
