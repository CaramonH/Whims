import React from "react";
import Card from "../card/card";
import "./navigation.css";

interface WhimData {
  id: string;
  groupId: string;
  createdBy: string;
  eventName: string;
  eventType: string;
  date?: string;
  location?: string;
  color: string;
}

interface GroupData {
  id: string;
  createdAt: string;
  createdBy: string;
  groupName: string;
  groupCode: string;
}

interface GroupedWhims {
  [groupId: string]: WhimData[];
}

interface TrayProps {
  groupedWhims: GroupedWhims;
  onDeleteCard: (cardData: WhimData) => void;
  isHomeView: boolean;
  userGroups: GroupData[];
}

const Tray: React.FC<TrayProps> = ({
  groupedWhims,
  onDeleteCard,
  isHomeView,
  userGroups,
}) => {
  const getGroupName = (groupId: string): string => {
    const group = userGroups.find(group => group.id === groupId);
    return group ? group.groupName : groupId; // Fallback to groupId if groupName is not found
  };

  return (
    <div className={`tray-container ${isHomeView ? "home-view" : ""}`}>
      {Object.entries(groupedWhims).map(([groupId, whims]) => (
        <div key={groupId} className="group-section">
          <h2>Group: {getGroupName(groupId)}</h2>
          <div className="whims-container">
            {whims.map((whim) => (
              <Card key={whim.id} {...whim} onDeleteCard={onDeleteCard} userGroups={userGroups} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tray;