// src/components/navigation/Tray.tsx
import React from "react";
import Card from "../card/card";
import { useApp } from "../../context/context";
import { CardData } from "../../types/dataTypes";

interface GroupedWhims {
  [groupId: string]: CardData[];
}

interface TrayProps {
  groupedWhims: GroupedWhims;
  onDeleteCard: (cardData: CardData) => void;
  sortFunction?: (a: CardData, b: CardData) => number;
}

const Tray: React.FC<TrayProps> = ({
  groupedWhims,
  onDeleteCard,
  sortFunction,
}) => {
  const { userGroups, currentGroup } = useApp();
  const isHomeView = !currentGroup;

  const getGroupName = (groupId: string): string => {
    const group = userGroups.find((group) => group.id === groupId);
    return group ? group.groupName : "Unknown Group";
  };

  return (
    <div className={`p-6 ${isHomeView ? "max-w-7xl mx-auto" : ""}`}>
      {Object.entries(groupedWhims).map(([groupId, whims]) => (
        <div key={groupId} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {getGroupName(groupId)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
