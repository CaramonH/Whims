// In sorting.tsx
import React from "react";
import Button from "../general/button";
import Dropdown from "../general/dropdown";
import { faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import "./functional.css";

interface SortingProps {
  onSortByNewest: () => void;
  onSelectEventType: (eventType: string) => void;
}

const Sorting: React.FC<SortingProps> = ({
  onSortByNewest,
  onSelectEventType,
}) => {
  const handleUnreadClick = () => {
    console.log("Unread clicked");
  };

  return (
    <div className="filter-div">
      <div className="sorting-button-div">
        <Button
          icon={faEnvelope}
          onClick={handleUnreadClick}
          label="  Unread"
          className="unread-btn"
          isExpanded={true}
        />
        <Button
          icon={faClock}
          onClick={onSortByNewest}
          label="  Newest"
          className="newest-btn"
          isExpanded={true}
        />
      </div>
      <Dropdown
        onChange={onSelectEventType}
        className="event-sorting"
        title="Select event type"
      />
    </div>
  );
};

export default Sorting;
