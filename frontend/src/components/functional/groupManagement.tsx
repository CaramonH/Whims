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
  faUserGroup,
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
  const [customGroupName, setCustomGroupName] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [groupCreated, setGroupCreated] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
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
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      if (customGroupName.length > 0 && customGroupName.length <= 14) {
        const newGroupCode = generateGroupCode();
        try {
          const newGroup = await createGroup(userId, {
            groupCode: newGroupCode,
            groupName: customGroupName,
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
      } else {
        alert("Group name must be between 1 and 14 characters.");
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
        <>
         <div className="pop-window-overlay">
          <div className="pop-window" ref={windowRef}>
            <div className="create-join-container">
              <div className="pop-window-content">
                <div className="create-group-div">
                    <Button
                      icon={faTimes}
                      onClick={() => setShowOptions(false)}
                      className="close-button"
                      label=""
                    />
                      <h3 className="create-header">Create a Group!</h3>
                      <>
                        <Input
                          placeholder="Enter group name (1-14 characters)"
                          onChange={(value) => setCustomGroupName(value)}
                          className="group-name-input"
                        />
                        <Button
                          icon={faPlus}
                          onClick={handleCreateGroup}
                          className="nav-item create-group-button"
                          label="Create"
                          isExpanded={true}
                          disabled={
                            customGroupName.length === 0 ||
                            customGroupName.length > 14
                          }
                        />
                      </>
                        {groupCreated && (
                          <div className="group-created">
                            <Button
                              icon={faTimes}
                              label=""
                              onClick={() => setGroupCreated(false)}
                            />
                            <p className="your-code">Your Invitation code is:</p>
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
                          </div>
                        )}
                    </div>
                  </div>
                <div className="pop-window-content">
                  <div className="join-group-div">
                      {/* <Button
                        icon={faSignInAlt}
                        onClick={() => setShowJoinInput(true)}
                        className="nav-item join-group-button"
                        label="Join Group"
                        isExpanded={true}
                      /> */}
                      <>
                        <Button
                          icon={faTimes}
                          onClick={() => setShowOptions(false)}
                          className="close-button"
                          label=""
                        />
                        <h3 className="join-header">Join a Group!</h3>
                        <Input
                          placeholder="Enter 7-digit code"
                          onChange={(value) => setGroupCode(value.toUpperCase())}
                          className="join-group-input"
                        />
                        <Button
                          icon={faUserGroup}
                          onClick={handleJoinGroup}
                          className="nav-item join-group-button"
                          label="Join"
                          isExpanded={true}
                          disabled={groupCode.length !== 7}
                        />
                      </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default GroupManagement;
