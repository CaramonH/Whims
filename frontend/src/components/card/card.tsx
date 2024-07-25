// Card.tsx
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
} from "@fortawesome/free-solid-svg-icons";
import "./card.css";
// import { createWhim } from '../../firebaseService'; // Import the createWhim function

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

interface CardProps {
  eventName: string;
  eventType: string;
  location: string;
  groupId: string;  // Added groupId to identify the group where the whim will be created
}

const Card: React.FC<CardProps> = ({ eventName, eventType, location, groupId}) => {
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

  const truncatedEventName = eventName.length > 70 ? eventName.slice(0, 70) + "..." : eventName;

  // Function to handle adding the card to Firebase
  // const handleAddWhim = () => {
  //   const whimData = {
  //     eventName,
  //     eventType,
  //     location,
  //   };

  //   createWhim(whimData)
  //     .then(() => {
  //       console.log("Whim added successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error adding whim:", error);
  //     });
  // };

  return (
    <div className={`card ${randomColor}`}>
      <h1 className="card-title">{truncatedEventName}</h1>
      <div className="event-type-icon">
        <FontAwesomeIcon icon={getEventIcon(eventType)} />
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
