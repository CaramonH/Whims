import React, { useState } from "react";
// import { getFirestore, doc, collection, addDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Button from "../general/button";
import { faPlus, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createGroup, checkInviteCodeUnique } from "../../firebaseService";

interface CreateGroupProps {
  onCreateGroup: (groupCode: string) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onCreateGroup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  // const firestore = getFirestore();
  const auth = getAuth();

  const generateInviteCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // if (!checkInviteCodeUnique(result)) {
    //   console.log("Invite code already being used");
    //   return `Invite code ${result} is already being used. Which should be extremely unlikely so congrats I guess. I hope you enjoy your unjoinable group as a reward.`;
    //   // return generateInviteCode(); // this is a potentially dangerous line of code...
    // }
    return result;
  };

  const handleCreateGroup = async () => {
    const newInviteCode = generateInviteCode();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        // Add to global groups collection
        createGroup(userId, {
          inviteCode: newInviteCode,
          createdAt: new Date(),
          // Other group details
        });

        setInviteCode(newInviteCode);
        setShowPopup(true);
      } catch (e) {
        console.error("Error creating group: ", e);
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode).then(
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
              <span className="group-code">{inviteCode}</span>
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
