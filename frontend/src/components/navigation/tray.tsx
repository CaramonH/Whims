import React from "react";
import Card from "../card/card";

interface WhimData {
  id: string;
  eventName: string;
  eventType: string;
  location: string;
  date?: string;
  color: string;
  groupId: string;
}

interface GroupedWhims {
  [groupId: string]: WhimData[];
}

interface TrayProps {
  groupedWhims: GroupedWhims;
  onDeleteCard: (cardData: WhimData) => void;
}

const Tray: React.FC<TrayProps> = ({ groupedWhims, onDeleteCard }) => {
  return (
    <div className="tray">
      {Object.entries(groupedWhims).map(([groupId, whims]) => (
        <div key={groupId} className="group-section">
          <h2>Group: {groupId}</h2>
          <div className="whims-container">
            {whims.map((whim) => (
              <Card key={whim.id} {...whim} onDeleteCard={onDeleteCard} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tray;
