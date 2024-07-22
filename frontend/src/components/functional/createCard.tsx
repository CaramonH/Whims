// CreateCard.tsx
import React, { useState } from "react";
import Button from "../general/button";
import InputForm from "../userInput/inputForm";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Header from "../navigation/header"; // Import Header
import "./functional.css";

interface CardData {
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
}

interface CreateCardProps {
  onCreateCard: (cardData: CardData) => void;
}

export function CreateCard(Props: CreateCardProps) {
  const [showInputForm, setShowInputForm] = useState(false);

  const handleCreateClick = () => {
    setShowInputForm(true);
  };

  const handleCloseForm = () => {
    setShowInputForm(false);
  };

  const handleSubmit = (cardData: CardData) => {
    if (Props.onCreateCard) {
      Props.onCreateCard(cardData);
    }
    setShowInputForm(false);
  };

  return (
    <div className="create-card-container">
      <Header onCreateClick={handleCreateClick} /> {/* Pass the function */}
      {!showInputForm ? (
        <Button
          icon={faPlus}
          onClick={handleCreateClick}
          className="create-button"
          label="Create New Event"
        />
      ) : (
        <div className="input-form-overlay">
          <div className="input-form-wrapper">
            <InputForm onSubmit={handleSubmit} />
            <Button
              icon={faMinus}
              onClick={handleCloseForm}
              className="close-button"
              label="Close"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCard;
