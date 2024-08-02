import React, { useState, useRef, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Button from "../general/button";
import Input from "../general/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCopy,
  faTimes,
  faPlusCircle,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { createGroup, joinGroup } from "../../firebaseService";
import "./functional.css";

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
}

interface GroupManagementProps {
  isExpanded: boolean;
  onCreateGroup: (groupData: GroupData) => void;
  onJoinGroup: (groupData: GroupData) => void;
}

const GroupManagement: React.FC<GroupManagementProps> = ({
  isExpanded,
  onCreateGroup,
  onJoinGroup,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [groupCreated, setGroupCreated] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const auth = getAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const generateGroupCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleCreateGroup = async () => {
    const newGroupCode = generateGroupCode();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        const newGroup = await createGroup(userId, {
          groupCode: newGroupCode,
          createdAt: new Date(),
        });

        setGroupCode(newGroupCode);
        setGroupCreated(true);

        if (newGroup) {
          onCreateGroup(newGroup);
        }
      } catch (e) {
        console.error("Error creating group: ", e);
      }
    }
  };

  const handleJoinGroup = async () => {
    if (groupCode.length === 7) {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        try {
          const joinedGroup = await joinGroup(userId, groupCode);
          if (joinedGroup) {
            onJoinGroup(joinedGroup);
            setGroupCode("");
            setShowJoinInput(false);
          }
        } catch (e) {
          console.error("Error joining group: ", e);
        }
      }
    } else {
      alert("Please enter a 7-digit code.");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div className="group-management">
      <Button
        icon={faPlusCircle}
        onClick={() => setShowOptions(true)}
        className="nav-item create-group-button"
        label="Create / Join"
        isExpanded={isExpanded}
      />
      {showOptions && isExpanded && (
        <div className="pop-window-overlay">
          <div className="pop-window" ref={windowRef}>
            <div className="pop-window-content">
              <Button
                icon={faTimes}
                onClick={() => setShowOptions(false)}
                className="close-button"
                label=""
              />
              <div className="group-options">
                <Button
                  icon={faPlus}
                  onClick={handleCreateGroup}
                  className="nav-item create-group-button"
                  label="Create Group"
                  isExpanded={true}
                />
                {groupCreated && (
                  <div className="group-created">
                    <h3>Group Created!</h3>
                    <p className="your-code">Your group code is:</p>
                    <div
                      className="group-code-container"
                      onClick={handleCopyCode}
                    >
                      <span className="group-code">{groupCode}</span>
                      <FontAwesomeIcon icon={faCopy} className="copy-icon" />
                    </div>
                    {copySuccess && (
                      <p className="copy-success">Copied to clipboard!</p>
                    )}
                    <Button
                      icon={faTimes}
                      label=""
                      onClick={() => setGroupCreated(false)}
                    />
                  </div>
                )}
                {!showJoinInput ? (
                  <Button
                    icon={faSignInAlt}
                    onClick={() => setShowJoinInput(true)}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagement;
