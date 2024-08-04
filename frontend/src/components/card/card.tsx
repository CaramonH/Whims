import React from "react";
import LikeDislike from "../functional/likeDislike";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faUtensils,
  faMusic,
  faFilm,
  faGamepad,
  faPlaneDeparture,
  faPalette,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./card.css";
import Button from "../general/button";
import { deleteWhim } from "../../firebaseService";
import { getAuth } from "firebase/auth";
import { CardData } from "../types/cardData";

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

interface GroupData {
  id: string;
  createdAt: string;
  createdBy: string;
  groupName: string;
  groupCode: string;
}

interface CardProps {
  id: string;
  groupId: string;
  createdBy: string;
  eventName: string;
  eventType: string;
  location?: string;
  date?: string;
  color: string;
  onDeleteCard: (cardData: CardData) => void;
  userGroups: GroupData[];
}

const Card: React.FC<CardProps> = ({
  id,
  groupId,
  createdBy,
  eventName,
  eventType,
  location,
  date,
  color,
  onDeleteCard,
  userGroups,
}) => {
  const auth = getAuth();
  const randomColor: string = getRandomColor(color);

  const getEventIcon = (type: string): IconProp => {
    switch (type) {
      case "food":
        return faUtensils;
      case "music":
        return faMusic;
      case "movie":
        return faFilm;
      case "games":
        return faGamepad;
      case "travel":
        return faPlaneDeparture;
      case "art":
        return faPalette;
      default:
        return faQuestionCircle;
    }
  };

  const handleDeleteWhim = () => {
    const cardData: CardData = {
      id, // Add id back to cardData
      groupId,
      createdBy,
      eventName,
      eventType,
      location,
      date,
      color,
    };

    deleteWhim(cardData)
      .then(() => {
        console.log("Whim deleted successfully!");
        onDeleteCard(cardData);
      })
      .catch((error) => {
        console.error("Error deleting whim handleDeleteWhim:", error);
      });
  };

  const canDelete = () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      // Allows user to delete their own whims
      if (userId === createdBy) {
        return true;
      }

      // Allows creator of group to delete any whim within the group
      const group = userGroups.find((group) => group.id === groupId);
      console.log(`group of whim that says "${eventName}":`, group);
      console.log(`creator of group that contains the previously mentioned whim:`, userId);
      if (group && userId === group.createdBy) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={`card ${color || randomColor}`}>
      {date && <div className="card-date">{date}</div>}
      <h1 className="card-title">{eventName}</h1>
      <div className="event-type-icon">
        <FontAwesomeIcon icon={getEventIcon(eventType)} />
      </div>
      <div>
        {canDelete() && (
          <Button
            icon={faTrash}
            onClick={handleDeleteWhim}
            className="delete-button"
            label="Delete"
          />
        )}
      </div>
      <div className="like-dislike-container">
        <LikeDislike />
      </div>
      <div className="card-text-container">
        {/* <CardText
          text={eventType.charAt(0).toUpperCase() + eventType.slice(1)}
        /> */}
      </div>
      <div className="location-container">{location}</div>
    </div>
  );
};

export default Card;
