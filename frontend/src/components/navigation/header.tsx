import React, { useState } from "react";
import { CreateCard } from "../functional/createCard";
import Button from "../general/button";
import Sorting from "../functional/sorting";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./navigation.css";

interface CardData {
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
}

interface HeaderProps {
  onCreateCard: (cardData: CardData) => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateCard }) => {
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
          />
        ) : (
          <CreateCard
            onCreateCard={onCreateCard}
            onCloseForm={handleCloseForm}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
