import React, { useState } from "react";
import Button from "../general/button";
import { faPlus, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CreateGroupProps {
  onCreateGroup: (groupCode: string) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onCreateGroup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const generateGroupCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleCreateGroup = () => {
    const newGroupCode = generateGroupCode();
    setGroupCode(newGroupCode);
    setShowPopup(true);
    onCreateGroup(newGroupCode);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset copy success after 2 seconds
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <>
      <Button
        icon={faPlus}
        onClick={handleCreateGroup}
        className="nav-item create-group-button"
        label="Create Group"
        isExpanded={true}
      />
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Group Created!</h2>
            <p>Your group code is:</p>
            <div className="group-code-container" onClick={handleCopyCode}>
              <span className="group-code">{groupCode}</span>
              <FontAwesomeIcon icon={faCopy} className="copy-icon" />
            </div>
            {copySuccess && (
              <p className="copy-success">Copied to clipboard!</p>
            )}
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroup;
