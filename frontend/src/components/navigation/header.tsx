import React, { useState } from "react";
import { CreateCard } from "../functional/createCard";
import Button from "../general/button";
import Sorting from "../functional/sorting";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./navigation.css";
import { CardData } from "../types/cardData";

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
}

interface HeaderProps {
  onCreateCard: (cardData: CardData) => void;
  groupData?: GroupData;
  isHomePage: boolean;
  onSortByNewest: () => void;
  onSelectEventType: (eventType: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onCreateCard,
  groupData,
  isHomePage,
  onSortByNewest,
  onSelectEventType,
}) => {
  const [showInputForm, setShowInputForm] = useState(false);

  const handleCreateClick = () => {
    setShowInputForm(true);
  };

  const handleCloseForm = () => {
    setShowInputForm(false);
  };

  return (
    <header className="header">
      {!isHomePage && (
        <>
          <div className="header-sorting">
            <Sorting
              onSortByNewest={onSortByNewest}
              onSelectEventType={onSelectEventType}
            />
          </div>
          <div className="create-card-container">
            {!showInputForm ? (
              <Button
                icon={faPlus}
                onClick={handleCreateClick}
                className="create-button"
                label="Create New Event"
              />
            ) : (
              <CreateCard
                onCreateCard={onCreateCard}
                onCloseForm={handleCloseForm}
                groupData={groupData}
              />
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
