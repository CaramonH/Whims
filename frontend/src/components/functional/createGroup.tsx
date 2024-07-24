import React, { useState } from "react";
import Button from "../general/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface CreateGroupProps {
  onCreateGroup: (groupCode: string) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onCreateGroup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupCode, setGroupCode] = useState("");

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
            <p>Your group code is: {groupCode}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroup;
