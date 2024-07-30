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
  id: string;
  eventName: string;
  eventType: string;
  location: string;
  date: string;
  color: string;
}

interface CardProps {
  id: string;
  eventName: string;
  eventType: string;
  location: string;
  date: string;
  color: string;
  onDeleteCard: (cardData: CardData) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  eventName,
  eventType,
  location,
  date,
  color,
  onDeleteCard,
}) => {
  const randomColor: string = getRandomColor();

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

  // const truncatedEventName = eventName.length > 70 ? eventName.slice(0, 70) + "..." : eventName;

  const handleDeleteWhim = () => {
    const cardData: CardData = {
      id,
      eventName,
      eventType,
      location,
      date,
      color,
    };

    deleteWhim(id)
      .then(() => {
        console.log("Whim deleted successfully!");
        onDeleteCard(cardData);
      })
      .catch((error) => {
        console.error("Error deleting whim handleDeleteWhim:", error);
      });
  };

  return (
    <div className={`card ${color || randomColor}`}>
      {date && <div className="card-date">{date}</div>}
      <h1 className="card-title">{eventName}</h1>
      <div className="event-type-icon">
        <FontAwesomeIcon icon={getEventIcon(eventType)} />
      </div>
      <div>
        <Button
          icon={faTrash}
          onClick={handleDeleteWhim}
          className="delete-button"
          label="Delete"
        />
      </div>
      <div className="like-dislike-container">
        <LikeDislike />
      </div>
      <div className="card-text-container">
        {/* <CardText
          text={eventType.charAt(0).toUpperCase() + eventType.slice(1)}
        />  */}
      </div>
      <div className="location-container">{location}</div>
      {/* Button to add the card as a whim
      <button onClick={handleAddWhim} className="add-whim-button">
        Add to Whims
      </button>
      */}
    </div>
  );
};

export default Card;
