import React, { useRef, useEffect } from "react";
import Button from "../general/button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../navigation/navigation.css";

interface AccountProps {
  onClose: () => void;
}

const Account: React.FC<AccountProps> = ({ onClose }) => {
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
        <div className="pop-window-content">
        <Button
          icon={faTimes}
          onClick={onClose}
          className="close-button pop-up-close"
          label=""
        />
          <div className="pop-window-header">
            <h2>Account</h2>
            <p>Account Data 1</p>
            <p>Account Data 2</p>
            <p>Account Data 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
