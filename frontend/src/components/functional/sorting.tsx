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

// This component is the sorting component for the header
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
    // { value: "upcoming", icon: faCalendar },
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
      <div className="sorting-dropdown-div">
        <Dropdown
          onChange={onSelectEventType}
          className="event-sorting"
          title="Select Event Type"
        />
        <Dropdown
          onChange={onSelectLikeStatus}
          className="like-status-sorting"
          title="Select Like Status"
          customOptions={likeStatusOptions}
        />
      </div>
    </div>
  );
};

export default Sorting;
