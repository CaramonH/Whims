import React from "react";
import Button from "./button";
import Dropdown from "./dropdown";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface PopWindowProps {
  onClose: () => void;
}

const PopWindow: React.FC<PopWindowProps> = ({ onClose }) => {
  return (
    <div className="pop-window">
      <div className="pop-window-content">
        <Button
          icon={faTimes}
          onClick={onClose}
          className="close-button"
          label="Close"
        />
        <h2>Settings</h2>
        <Dropdown />
        <Dropdown />
        <Dropdown />
        {/* put more settings options HERE */}
      </div>
    </div>
  );
};

export default PopWindow;
