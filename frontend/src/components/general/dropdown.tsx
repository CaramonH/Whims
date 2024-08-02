import React, { useState, ChangeEvent } from "react";
import "./generalStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faMusic,
  faFilm,
  faGamepad,
  faPlane,
  faPaintBrush,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  onChange?: (selectedValue: string) => void;
  className?: string;
  customOptions?: { value: string; icon: any }[];
}

const Dropdown: React.FC<DropdownProps> = ({
  onChange,
  className = "",
  customOptions,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const eventIcons = {
    food: faUtensils,
    music: faMusic,
    movie: faFilm,
    games: faGamepad,
    travel: faPlane,
    art: faPaintBrush,
    misc: faQuestion,
  };

  const eventOptions = [
    { value: "food", icon: eventIcons.food },
    { value: "music", icon: eventIcons.music },
    { value: "movie", icon: eventIcons.movie },
    { value: "games", icon: eventIcons.games },
    { value: "travel", icon: eventIcons.travel },
    { value: "art", icon: eventIcons.art },
    { value: "misc", icon: eventIcons.misc },
  ];

  const costOptions = ["$", "$$", "$$$"].map((value) => ({ value, icon: null }));

  const options =
    customOptions || (className === "cost" ? costOptions : eventOptions);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className={`dropdown ${className}`}
      title={className === "cost" ? "Select cost" : "Select event type"}
    >
      <option value="">
        {className === "cost" ? "Select cost" : "Select event type"}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="option-icon">
          {option.icon && <FontAwesomeIcon icon={option.icon} />} {option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
