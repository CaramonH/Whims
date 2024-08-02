import { useState } from "react";
import Button from "../general/button";
import InputForm from "../userInput/inputForm";
import "./functional.css";
import { CardData } from "../types/cardData"
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { createWhim } from "../../firebaseService"; // Import the createWhim function
import { getAuth } from "firebase/auth";

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

const getRandomColor = (previousColor: string): string => {
  let randomColor: string = getRandomColorHelper();

  // Ensure the random color is different from the previous color
  while (randomColor === previousColor) {
    randomColor = getRandomColorHelper();
  }

  return randomColor;
};

const getRandomColorHelper = (): string => {
  const randomIndex: number = Math.floor(Math.random() * colorVariables.length);
  return colorVariables[randomIndex];
};

interface CreateCardProps {
  onCreateCard: (cardData: CardData) => void;
}

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
}

interface CreateCardProps {
  onCreateCard: (cardData: CardData) => void;
  onCloseForm: () => void;
  groupData?: GroupData;
  className?: string; //added to fix an error in header
}

export function CreateCard({ onCreateCard, onCloseForm, groupData }: CreateCardProps) {
  const auth = getAuth();
  const [previousColor, setPreviousColor] = useState<string>("");

  const handleAddWhim = (whimData: CardData) => {
    if (!whimData.color) {
      const newColor: string = getRandomColor(previousColor);
      whimData.color = newColor;
      setPreviousColor(newColor);
    }

    if (groupData && groupData.id && auth.currentUser) {
      const userId = auth.currentUser.uid;
      whimData.createdBy = userId;
      whimData.groupId = groupData.id;
      createWhim(whimData)
        .then(() => {
          console.log("Whim added successfully!");
        })
        .catch((error) => {
          console.error("Error adding whim:", error);
        });
    } else {
      console.error("User not logged in or group is not provided");
    }
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
          icon={faTimes}
          onClick={onCloseForm}
          className="close-button close-create"
          label="Close"
        />
      </div>
    </div>
  );
}

export default CreateCard;
