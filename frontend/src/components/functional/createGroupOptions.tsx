import React from "react";
import Button from "../general/button";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface GroupOptionsButton {
  isExpanded: boolean;
  onClick: () => void;
}

const CreateGroupOptions: React.FC<GroupOptionsButton> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <Button
      icon={faPlusCircle}
      onClick={onClick}
      className="nav-item create-group-button"
      label="Create / Join"
      isExpanded={isExpanded}
    />
  );
};

export default CreateGroupOptions;
