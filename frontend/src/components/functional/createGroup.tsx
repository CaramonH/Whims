import React, { useState } from "react";
// import { getFirestore, doc, collection, addDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Button from "../general/button";
import { faPlus, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./functional.css";
import { createGroup, checkGroupCodeUnique } from "../../firebaseService";

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
};

interface CreateGroupProps {
  onCreateGroup: (groupData: GroupData) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onCreateGroup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  // const firestore = getFirestore();
  const auth = getAuth();

  const generateGroupCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // if (!checkGroupCodeUnique(result)) {
    //   console.log("Group code already being used");
    //   return `Group code ${result} is already being used. Which should be extremely unlikely so congrats I guess. I hope you enjoy your unjoinable group as a reward.`;
    //   // return generateGroupCode(); // this is a potentially dangerous line of code...
    // }
    return result;
  };

  const handleCreateGroup = async () => {
    const newGroupCode = generateGroupCode();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        // Add to global groups collection
        const newGroup = await createGroup(userId, {
          groupCode: newGroupCode,
          createdAt: new Date(),
          // Other group details
        });

        setGroupCode(newGroupCode);
        setShowPopup(true);

        if (newGroup) {
          onCreateGroup(newGroup); // I really hope this works...
        }
      } catch (e) {
        console.error("Error creating group: ", e);
      }
    }
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
            <h3>Group Created!</h3>
            <p className="yourCode">Your group code is:</p>
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
