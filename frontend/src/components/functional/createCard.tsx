import React, { useState } from "react";
import Button from "../general/button";
import InputForm from "../userInput/inputForm";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CreateCard: React.FC = () => {
  const [showInputForm, setShowInputForm] = useState(false);

  const handleCreateClick = () => {
    setShowInputForm(true);
  };

  const handleCloseForm = () => {
    setShowInputForm(false);
  };

  return (
    <div className="create-card-container">
      {!showInputForm ? (
        <Button
          icon={faPlus}
          onClick={handleCreateClick}
          className="create-button"
          label="Create New Event"
        />
      ) : (
        <div className="input-form-overlay">
          <div className="input-form-wrapper">
            <InputForm />
            <Button
              icon={faMinus}
              onClick={handleCloseForm}
              className="cancel-button"
              label="Cancel"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCard;
