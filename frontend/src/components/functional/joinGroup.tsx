import React, { useState } from "react";
import { getAuth } from "firebase/auth";
// import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import Button from "../general/button";
import Input from "../general/input";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { joinGroup } from "../../firebaseService";

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
};

interface JoinGroupProps {
  onJoinGroup: (groupData: GroupData) => void;
}

const JoinGroup: React.FC<JoinGroupProps> = ({ onJoinGroup }) => {
  const [showInput, setShowInput] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const auth = getAuth();

  // const firestore = getFirestore();

  const handleJoinGroup = async () => {
    if (groupCode.length === 7) {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        try {
          const joinedGroup = await joinGroup(userId, groupCode);
          if (joinedGroup) {
            onJoinGroup(joinedGroup);
          }
          // if (!querySnapshot.empty) {
          //   onJoinGroup(groupCode);
          //   setGroupCode("");
          //   setShowInput(false);
          // } else {
          //   alert("Group not found.");
          // }
        } catch (e) {
          console.error("Error joining group: ", e);
        }
      }
    } else {
      alert("Please enter a 7-digit code.");
    }
  };

  return (
    <div className="join-group">
      {!showInput ? (
        <Button
          icon={faSignInAlt}
          onClick={() => setShowInput(true)}
          className="nav-item join-group-button"
          label="Join Group"
          isExpanded={true}
        />
      ) : (
        <>
          <Input
            placeholder="Enter 7-digit code"
            onChange={(value) => setGroupCode(value.toUpperCase())}
            className="join-group-input"
          />
          <Button
            icon={faSignInAlt}
            onClick={handleJoinGroup}
            className="nav-item join-group-button"
            label="Join"
            isExpanded={true}
            disabled={groupCode.length !== 7}
          />
        </>
      )}
    </div>
  );
};

export default JoinGroup;
