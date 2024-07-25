import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import Card from "../card/card";
import { getWhims } from "../../firebaseService";
import "./dashboard.css";

interface CardData {
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchWhims = async () => {
      const whimsData = await getWhims();
      if (whimsData) {
        // Convert whims data to match CardData structure if needed
        const formattedWhims = whimsData.map((whim) => ({
          eventName: whim.eventName,
          eventType: whim.eventType,
          cost: whim.cost || "N/A", // Assuming whims have a cost field
          location: whim.location,
        }));
        setCards(formattedWhims);
      }
    };

    fetchWhims();
  }, []);

  function handleCreateCard(cardData: CardData) {
    console.log("Creating card:", cardData); // Debug log
    setCards((prevCards) => [...prevCards, cardData]);
  }

  console.log("Current cards:", cards); // Debug log

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header onCreateCard={handleCreateCard} />
        <main className="main-content">
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
