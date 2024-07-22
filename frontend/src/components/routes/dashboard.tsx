import React, { useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import { CreateCard } from "../functional/createCard";
import Card from "../card/card";
import "./dashboard.css";

interface CardData {
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  function handleCreateCard(cardData: CardData) {
    console.log("Creating card:", cardData); // Debug log
    setCards((prevCards) => [...prevCards, cardData]);
  }

  console.log("Current cards:", cards); // Debug log

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="main-content">
          <CreateCard onCreateCard={handleCreateCard} />
          <div className="cards-container">
            {cards.map((card, index) => (
              <Card
                key={index}
                eventName={card.eventName}
                eventType={card.eventType}
                location={card.location}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
