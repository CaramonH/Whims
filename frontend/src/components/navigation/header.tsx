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
}

const Header: React.FC<HeaderProps> = ({ onCreateCard, groupData }) => {
  const [showInputForm, setShowInputForm] = useState(false);

  const handleCreateClick = () => {
    setShowInputForm(true);
  };

  const handleCloseForm = () => {
    setShowInputForm(false);
  };

  return (
    <header className="header">
      <div className="header-sorting">
        <Sorting />
      </div>
      <div className="create-card-container">
        {!showInputForm ? (
          <Button
            icon={faPlus}
            onClick={handleCreateClick}
            className="create-button"
            label="Create New Event"
            disabled={!groupData}
          />
        ) : (
          <CreateCard
            className="create-card"
            onCreateCard={onCreateCard}
            onCloseForm={handleCloseForm}
            groupData={groupData}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
