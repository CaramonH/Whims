// import React from "react";
import Button from "../general/button";
import InputForm from "../userInput/inputForm";
import "./functional.css";
import { faCancel } from "@fortawesome/free-solid-svg-icons/faCancel";
import { createWhim } from '../../firebaseService'; // Import the createWhim function

const colorVariables: string[] = [
  "--color-turq",
  "--color-mant",
  "--color-apg",
  "--color-yell",
  "--color-org",
  "--color-red",
  "--color-ind",
  "--color-purp",
];

const getRandomColor = (): string => {
  const randomIndex: number = Math.floor(Math.random() * colorVariables.length);
  return colorVariables[randomIndex];
};

interface CardData {
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
  color: string;
}

interface CreateCardProps {
  onCreateCard: (cardData: CardData) => void;
  onCloseForm: () => void;
}

export function CreateCard({ onCreateCard, onCloseForm }: CreateCardProps) {
  const handleAddWhim = (whimData: CardData) => {
    if (!whimData.color) {
      whimData.color = getRandomColor();
    }
    createWhim(whimData)
      .then(() => {
        console.log("Whim added successfully!");
      })
      .catch((error) => {
        console.error("Error adding whim:", error);
      });
  };

  const handleSubmit = (cardData: CardData) => {
    if (onCreateCard) {
      onCreateCard(cardData);
      handleAddWhim(cardData);
    }
    console.log("Submitting card data:", cardData); // Debug
    onCloseForm();
  };

  return (
    <div className="input-form-overlay">
      <div className="input-form-wrapper">
        <InputForm onSubmit={handleSubmit} />
        <Button
          icon={faCancel}
          onClick={onCloseForm}
          className="close-button"
          label="Close"
        />
      </div>
    </div>
  );
}

export default CreateCard;
