import React, { useState } from "react";
import { CreateCard } from "../functional/createCard";
import Button from "../general/button";
import Sorting from "../functional/sorting";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./navigation.css";
import { CardData } from "../types/cardData";

// This component is the header for the application
interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
}

interface HeaderProps {
  onCreateCard: (cardData: CardData) => void;
  groupData?: GroupData;
  isHomePage: boolean;
  onSortByUpcoming: () => void;
  onSelectEventType: (eventType: string) => void;
  onSelectLikeStatus: (status: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onCreateCard,
  groupData,
  isHomePage,
  onSortByUpcoming,
  onSelectEventType,
  onSelectLikeStatus,
}) => {
  const [showInputForm, setShowInputForm] = useState(false);

  // Function to handle the create button click
  const handleCreateClick = () => {
    setShowInputForm(true);
  };

  // Function to handle the close form button click
  const handleCloseForm = () => {
    setShowInputForm(false);
  };

  // Return the header component
  return (
    <header className="header">
      {!isHomePage && (
        <>
          <div className="header-sorting">
            <Sorting
              onSortByUpcoming={onSortByUpcoming}
              onSelectEventType={onSelectEventType}
              onSelectLikeStatus={onSelectLikeStatus}
            />
          </div>
          <div className="create-card-container">
            {!showInputForm ? (
              <Button
                icon={faPlus}
                onClick={handleCreateClick}
                className="create-button"
                label="Create New Event"
              />
            ) : (
              <CreateCard
                onCreateCard={onCreateCard}
                onCloseForm={handleCloseForm}
                groupData={groupData}
              />
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
