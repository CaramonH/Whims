import React, { useState } from "react";
import Input from "../general/input";
import Dropdown from "../general/dropdown";
import Button from "../general/button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface InputFormProps {
  onSubmit: (cardData: CardData) => void;
}

interface CardData {
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CardData>({
    eventName: "",
    eventType: "",
    cost: "",
    location: "",
  });

  const handleInputChange = (field: keyof CardData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>Event Details</h2>

      <Input
        placeholder="Event Name"
        onChange={handleInputChange("eventName")}
        className="event-name-input"
      />

      <Dropdown onChange={handleInputChange("eventType")} className="event" />

      <Dropdown onChange={handleInputChange("cost")} className="cost" />

      <Input
        placeholder="Location"
        onChange={handleInputChange("location")}
        className="location-input"
      />

      <Button
        icon={faCheck}
        onClick={handleSubmit}
        className="submit-button"
        label="Submit"
      />
    </div>
  );
};

export default InputForm;
