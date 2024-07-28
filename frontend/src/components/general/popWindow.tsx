import React, { useRef, useEffect } from "react";
import Button from "./button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../navigation/navigation.css";

interface PopWindowProps {
  onClose: () => void;
}

const PopWindow: React.FC<PopWindowProps> = ({ onClose }) => {
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
        <Button
          icon={faTimes}
          onClick={onClose}
          className="close-button"
          label=""
        />
        <div className="pop-window-content">
          <div className="pop-window-header">
            <h2>NAME OF SECTION</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopWindow;
