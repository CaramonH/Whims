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
    <div className="filter-div">
      <Button
        icon={faEnvelope}
        onClick={handleUnreadClick}
        label="  Unread"
        className="unread-btn"
        isExpanded={true}
      />
      <Button
        icon={faClock}
        onClick={handleNewestClick}
        label="  Newest"
        className="newest-btn"
        isExpanded={true}
      />
      <Dropdown title="" className="event-sorting" />
    </div>
  );
};

export default Sorting;
