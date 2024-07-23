import React, { useState } from "react";
import Button from "../general/button";
import Dropdown from "../general/dropdown";
import { faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import "./functional.css";

const Sorting: React.FC = () => {
  const handleUnreadClick = () => {
    console.log("Unread clicked");
  };

  const handleNewestClick = () => {
    console.log("Newest clicked");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button
        icon={faEnvelope}
        onClick={handleUnreadClick}
        label=" Unread"
        isExpanded={true}
      />
      <Button
        icon={faClock}
        onClick={handleNewestClick}
        label=" Newest"
        isExpanded={true}
      />
      <Dropdown className="event" />
    </div>
  );
};

export default Sorting;
