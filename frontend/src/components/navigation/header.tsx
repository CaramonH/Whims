// src/components/navigation/Header.tsx
import React, { useState } from "react";
import { CreateCard } from "../functional/createCard";
import { Button } from "../shared/Button";
import Sorting from "../functional/sorting";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../../context/context";
import { CardData } from "../../types/dataTypes";

interface HeaderProps {
  onCreateCard: (cardData: CardData) => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateCard }) => {
  const [showInputForm, setShowInputForm] = useState(false);
  const {
    currentGroup,
    setSortByUpcoming,
    setSelectedEventType,
    setLikeStatus,
  } = useApp();

  const isHomePage = !currentGroup;

  return (
    <header className="bg-white shadow-sm">
      {!isHomePage && (
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Sorting
                onSortByUpcoming={setSortByUpcoming}
                onSelectEventType={setSelectedEventType}
                onSelectLikeStatus={setLikeStatus}
              />
            </div>

            <div className="flex-shrink-0">
              {!showInputForm ? (
                <Button
                  icon={faPlus}
                  onClick={() => setShowInputForm(true)}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  label="Create New Event"
                />
              ) : (
                <CreateCard
                  onCreateCard={onCreateCard}
                  onCloseForm={() => setShowInputForm(false)}
                  groupData={currentGroup}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
