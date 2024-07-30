import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import Card from "../card/card";
import { getWhims } from "../../firebaseService";
import "./dashboard.css";
import { getAuth } from "firebase/auth";

interface CardData {
  id: string;
  eventName: string;
  eventType: string;
  date: string;
  location: string;
  color: string;
}

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
};

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  // const [currentGroup, setCurrentGroup] = useState<GroupData>();
  const auth = getAuth();

  const fetchWhims = async () => {
    if (auth.currentUser) {
      // const userId = auth.currentUser.uid;
      // const whimsData = await getWhims(userId, currentGroup);
      const whimsData = await getWhims();

      if (whimsData) {
        // it says the properties don't exist for whims, but it's wrong, it works
        const formattedWhims = whimsData.map((whim) => ({
          id: whim.id,
          eventName: whim.eventName || null,
          eventType: whim.eventType || null,
          date: whim.date || null,
          location: whim.location || null,
          color: whim.color || null,
        }));
        setCards(formattedWhims);
      }
    }
  };

  useEffect(() => {
    fetchWhims();
  }, []);

  const handleCreateCard = async (cardData: CardData) => {
    console.log("Creating card:", cardData); // Debug log
    await fetchWhims();
  };

  const handleDeleteCard = async (cardData: CardData) => {
    console.log("Deleting card:", cardData); // Debug log
    await fetchWhims();
  };

  const handleSelectGroup = async (groupData: GroupData) => {
    console.log(`Group ${groupData.groupCode} button clicked`);
    // console.log("Pulling whims for group:", groupData.groupCode); // Debug log
    // setCurrentGroup(groupData);
    // await fetchWhims();
  };

  console.log("Current cards:", cards); // Debug log

  return (
    <div className="dashboard">
      <Sidebar onSelectGroup={handleSelectGroup} />
      <div className="dashboard-content">
        <Header onCreateCard={handleCreateCard} />
        <main className="main-content">
          <div className="cards-container">
            {cards.map((card, index) => (
              <Card
                key={index}
                id={card.id}
                eventName={card.eventName}
                eventType={card.eventType}
                location={card.location}
                date={card.date}
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
