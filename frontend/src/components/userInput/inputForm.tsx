import React, { useState } from "react";
import Input from "../general/input";
import Dropdown from "../general/dropdown";
import Button from "../general/button";
import DateInput from "../functional/dateInput";
import "./inputForm.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface InputFormProps {
  onSubmit: (cardData: CardData) => void;
}

interface CardData {
  eventName: string;
  eventType: string;
  location: string;
  date: string;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CardData>({
    eventName: "",
    eventType: "",
    location: "",
    date: "",
  });

  const handleInputChange = (field: keyof CardData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <h2>Create a Whim</h2>
      <div className="input-form-div">
        <Input
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleInputChange("eventName")}
          className="event-name-input"
        />

        <Dropdown onChange={handleInputChange("eventType")} className="event" />

        <DateInput onChange={handleInputChange("date")} />

        <Input
          placeholder="Location"
          value={formData.location}
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
    </>
  );
};

export default InputForm;
