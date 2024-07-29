import React, { useState, ChangeEvent } from "react";

interface DropdownProps {
  onChange?: (selectedValue: string) => void;
  className?: string;
  customOptions?: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
  onChange,
  className = "",
  customOptions,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const eventOptions = [
    "food",
    "music",
    "movie",
    "games",
    "travel",
    "art",
    "misc",
  ];
  const costOptions = ["$", "$$", "$$$"];

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
    >
      <option value="">
        {className === "cost" ? "Select cost" : "Select event type"}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {className === "cost"
            ? option
            : option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
