import React, { useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import Button from "../general/button";
import Input from "../general/input";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

interface JoinGroupProps {
  onJoinGroup: (groupCode: string) => void;
}

const JoinGroup: React.FC<JoinGroupProps> = ({ onJoinGroup }) => {
  const [showInput, setShowInput] = useState(false);
  const [groupCode, setGroupCode] = useState("");

  const firestore = getFirestore();

  const handleJoinGroup = async () => {
    if (groupCode.length === 7) {
      const q = query(collection(firestore, "groups"), where("groupCode", "==", groupCode));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        onJoinGroup(groupCode);
        setGroupCode("");
        setShowInput(false);
      } else {
        alert("Group not found.");
      }
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

