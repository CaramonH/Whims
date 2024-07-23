import React, { useState } from "react";
import Input from "../general/input";
import Dropdown from "../general/dropdown";
import Button from "../general/button";
import "./inputForm.css"
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
    console.log("Form submitted with data:", formData); // Debug log
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <h2>Create a Whim</h2>
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
    </>
  );
};

export default InputForm;
