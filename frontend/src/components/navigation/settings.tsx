import React, { useRef, useEffect } from "react";
import Dropdown from "../general/dropdown";
import Button from "../general/button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../navigation/navigation.css";

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="pop-window-overlay">
      <div className="pop-window" ref={windowRef}>
        <div className="settings-window-content">
        <Button
          icon={faTimes}
          onClick={onClose}
          className="close-button pop-up-close"
          label=""
        />
          <div className="pop-window-header">
            <h2>Settings</h2>
          </div>
          <div className="settings-dropdown">
            <Dropdown className="settings-dropdown1"/>
            <Dropdown className="settings-dropdown1"/>
            <Dropdown className="settings-dropdown1"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
