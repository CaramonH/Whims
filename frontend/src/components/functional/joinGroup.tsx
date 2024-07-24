import React, { useState } from "react";
import Button from "../general/button";
import Input from "../general/input";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

interface JoinGroupProps {
  onJoinGroup: (groupCode: string) => void;
}

const JoinGroup: React.FC<JoinGroupProps> = ({ onJoinGroup }) => {
  const [showInput, setShowInput] = useState(false);
  const [groupCode, setGroupCode] = useState("");

  const handleJoinGroup = () => {
    if (groupCode.length === 7) {
      onJoinGroup(groupCode);
      setGroupCode("");
      setShowInput(false);
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
