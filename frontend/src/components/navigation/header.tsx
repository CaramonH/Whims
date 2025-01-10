import React, { useState } from "react";
import { CreateCard } from "../functional/createCard";
import Button from "../general/button";
import Sorting from "../functional/sorting";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./navigation.css";
import { CardData } from "../../types/dataTypes";
import { useApp } from "../../context/context";

interface HeaderProps {
  onCreateCard: (cardData: CardData) => void;
  isHomePage: boolean;
}

const Header: React.FC<HeaderProps> = ({ onCreateCard, isHomePage }) => {
  const [showInputForm, setShowInputForm] = useState(false);
  const {
    currentGroup,
    setSortByUpcoming,
    setSelectedEventType,
    setLikeStatus,
  } = useApp();

  const handleCreateClick = () => {
    setShowInputForm(true);
  };

  const handleCloseForm = () => {
    setShowInputForm(false);
  };

  return (
    <header className="header">
      {!isHomePage && (
        <>
          <div className="header-sorting">
            <Sorting
              onSortByUpcoming={() => setSortByUpcoming(true)}
              onSelectEventType={setSelectedEventType}
              onSelectLikeStatus={setLikeStatus} // type error, look into it
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
                groupData={currentGroup}
              />
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
