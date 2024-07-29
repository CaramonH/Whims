import React, { useRef, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Button from "../general/button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../navigation/navigation.css";

interface AccountProps {
  onClose: () => void;
}

const Account: React.FC<AccountProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string | null>(null);
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

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
          <div className="pop-window-header account-info">
            <h2>Account</h2>
            {email ? (
              <p>Email: {email}</p>
            ) : (
              <p>Loading...</p>
            )}
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
