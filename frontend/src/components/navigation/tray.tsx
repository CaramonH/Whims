import React from "react";
import Card from "../card/card";
import "./navigation.css";
import { CardData } from "../types/cardData";
import { GroupData } from "../types/groupData";

interface GroupedWhims {
  [groupId: string]: CardData[];
}

interface TrayProps {
  groupedWhims: GroupedWhims;
  onDeleteCard: (cardData: CardData) => void;
  isHomeView: boolean;
  userGroups: GroupData[];
  sortFunction?: (a: CardData, b: CardData) => number;
}

const Tray: React.FC<TrayProps> = ({
  groupedWhims,
  onDeleteCard,
  isHomeView,
  userGroups,
  sortFunction,
}) => {
  const getGroupName = (groupId: string): string => {
    const group = userGroups.find((group) => group.id === groupId);
    return group ? group.groupName : groupId;
  };

  return (
    <div className={`tray-container ${isHomeView ? "home-view" : ""}`}>
      {Object.entries(groupedWhims).map(([groupId, whims]) => (
        <div key={groupId} className="group-section">
          <h2>Group: {getGroupName(groupId)}</h2>
          <div className="whims-container">
            {(sortFunction ? whims.sort(sortFunction) : whims).map((whim) => (
              <Card
                key={whim.id}
                {...whim}
                onDeleteCard={onDeleteCard}
                userGroups={userGroups}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tray;
