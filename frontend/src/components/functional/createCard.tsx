import React, { useState } from "react";
import Button from "../general/button";
import InputForm from "../userInput/inputForm";
import Card from "../card/card";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./functional.css";

interface CardData {
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
}

const CreateCard: React.FC = () => {
  const [showInputForm, setShowInputForm] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);

  const handleCreateClick = () => {
    setShowInputForm(true);
  };

  const handleCloseForm = () => {
    setShowInputForm(false);
  };

  const handleSubmit = (cardData: CardData) => {
    setCards((prevCards) => [...prevCards, cardData]);
    setShowInputForm(false);
  };

  return (
    <div className="create-card-container">
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
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            eventName={card.eventName}
            eventType={card.eventType}
            location={card.location}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateCard;
