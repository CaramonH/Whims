import React from "react";
import LikeDislike from "../functional/likeDislike";
// import CardText from "./cardText";
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
} from "@fortawesome/free-solid-svg-icons";
import "./card.css";

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

// Define the function with a return type of string
const getRandomColor = (): string => {
  const randomIndex: number = Math.floor(Math.random() * colorVariables.length);
  return colorVariables[randomIndex];
};

interface CardProps {
  eventName: string;
  eventType: string;
  location: string;
}

const Card: React.FC<CardProps> = ({ eventName, eventType, location }) => {
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

  return (
    <div className={`card ${randomColor}`}>
      <h1 className="card-title">{eventName}</h1>
      <div className="event-type-icon">
        <FontAwesomeIcon icon={getEventIcon(eventType)} />
      </div>
      <div className="like-dislike-container">
        <LikeDislike />
      </div>
      <div className="card-text-container">
        {/* <CardText
          text={eventType.charAt(0).toUpperCase() + eventType.slice(1)}
        />  the Event Icons*/}
      </div>
      <div className="location-container">{location}</div>
    </div>
  );
};

export default Card;
