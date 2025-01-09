import React, { useState } from "react";
import Input from "../general/input";
import Dropdown from "../general/dropdown";
import Button from "../general/button";
import DateInput from "../functional/dateInput";
import "./inputForm.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { CardData } from "../../types/dataTypes";

interface InputFormProps {
  onSubmit: (cardData: CardData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CardData>({
    // id: "", uneeded for prop because of restructuring
    groupId: "",
    createdBy: "",
    eventName: "",
    eventType: "",
    color: "",
    date: "", // Optional field, but needs an initial value
    location: "", // Optional field, but needs an initial value
  });

  const handleInputChange = (field: keyof CardData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.eventName || !formData.eventType) {
      alert("Event Name and Event Type are required fields.");
      return;
    }

    console.log("Form submitted with data:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <h2 className="create-title">Create a Whim</h2>
      <div className="input-form-div">
        <div className="row">
          <p className="enter-tag">ENTER EVENT NAME:</p>
        </div>
        <Input
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleInputChange("eventName")}
          className="event-name-input"
        />

        <div className="row">
          <p className="enter-tag">ENTER EVENT TYPE:</p>
        </div>
        <Dropdown
          onChange={handleInputChange("eventType")}
          className="event-dropdown"
        />

        <div className="row">
          <p className="enter-tag">ENTER THE DATE OF EVENT: </p>
          <p className="optional-p"> *Optional Field</p>
        </div>
        <DateInput onChange={handleInputChange("date")} />

        <div className="row">
          <p className="enter-tag">ENTER LOCATION OF EVENT: </p>
          <p className="optional-p"> *Optional Field</p>
        </div>
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
