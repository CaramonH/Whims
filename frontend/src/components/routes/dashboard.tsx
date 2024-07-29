import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import Card from "../card/card";
import { getWhims } from "../../firebaseService";
import "./dashboard.css";

interface CardData {
  id: string;
  eventName: string;
  eventType: string;
  cost: string;
  location: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  const fetchWhims = async () => {
    const whimsData = await getWhims();
    if (whimsData) {
      // it says the properties don't exist for whims, but it's wrong, it works
      const formattedWhims = whimsData.map((whim) => ({
        id: whim.id,
        eventName: whim.eventName || null,
        eventType: whim.eventType || null,
        cost: whim.cost || null,
        location: whim.location || null,
        color: whim.color || null,
      }));
      setCards(formattedWhims);
    }
  };

  useEffect(() => {
    fetchWhims();
  }, []);

  const handleCreateCard = async (cardData: CardData) => {
    console.log("Creating card:", cardData); // Debug log
    await fetchWhims();
    // setCards((prevCards) => [...prevCards, cardData]);
    // ^might be better than running fetchWhims(), to lower the number of reads
  };

  const handleDeleteCard = async (cardData: CardData) => {
    console.log("Deleting card:", cardData); // Debug log
    await fetchWhims();
    // setCards((prevCards) => prevCards.filter(card => card.id !== cardData.id));
    // ^might be better than running fetchWhims(), to lower the number of reads
  };

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
                id={card.id}  // Added whimId to identify the specific whim
                eventName={card.eventName}
                eventType={card.eventType}
                location={card.location}
                color={card.color}
                onDeleteCard={handleDeleteCard}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
