import React from "react";
import Input from "../general/input";
import Dropdown from "../general/dropdown";

const InputForm = () => {
  const handleInputChange = (value: string) => {
    console.log("Input value changed:", value);
  };

  const handleDropdownChange = (value: string) => {
    console.log("Dropdown value changed:", value);
  };

  return (
    <div className="screen-sized-card">
      <div className="form-container">
        <h2>Event Details</h2>

        <Input
          placeholder="Event Name"
          onChange={handleInputChange}
          className="event-name-input"
        />

        <Dropdown onChange={handleDropdownChange} className="event" />

        <Dropdown onChange={handleDropdownChange} className="cost" />

        <Input
          placeholder="Location"
          onChange={handleInputChange}
          className="location-input"
        />
      </div>
    </div>
  );
};

export default InputForm;
