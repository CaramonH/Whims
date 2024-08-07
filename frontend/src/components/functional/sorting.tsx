import React from "react";
import Button from "../general/button";
import Dropdown from "../general/dropdown";
import {
  faEnvelope,
  faClock,
  faThumbsUp,
  faThumbsDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./functional.css";

interface SortingProps {
  onSortByUpcoming: () => void;
  onSelectEventType: (eventType: string) => void;
  onSelectLikeStatus: (status: string) => void;
}

const Sorting: React.FC<SortingProps> = ({
  onSortByUpcoming,
  onSelectEventType,
  onSelectLikeStatus,
}) => {
  const likeStatusOptions = [
    { value: "all", icon: null },
    { value: "liked", icon: faThumbsUp },
    { value: "disliked", icon: faThumbsDown },
    { value: "neutral", icon: faMinus },
  ];

  return (
    <div className="filter-div">
      <div className="sorting-button-div">
        <Button
          icon={faClock}
          onClick={onSortByUpcoming}
          label="  Upcoming"
          className="upcoming-btn"
          isExpanded={true}
        />
      </div>
      <Dropdown
        onChange={onSelectEventType}
        className="event-sorting"
        title="Select event type"
      />
      <Dropdown
        onChange={onSelectLikeStatus}
        className="like-status-sorting"
        title="Select like status"
        customOptions={likeStatusOptions}
      />
    </div>
  );
};

export default Sorting;
