import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import Card from "../card/card";
import { getWhims } from "../../firebaseService";
import "./dashboard.css";
import { getAuth } from "firebase/auth";

interface CardData {
  id: string;
  groupId: string;
  createdBy: string;
  eventName: string;
  eventType: string;
  date?: string;
  location?: string;
  color: string;
}

interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
};

const Dashboard: React.FC = () => {
  const [allUserCards, setAllUserCards] = useState<CardData[]>([]);
  // const [cards, setCards] = useState<CardData[]>([]);
  const [currentGroup, setCurrentGroup] = useState<GroupData>();
  const auth = getAuth();

  let cards;
  // const filterGroupWhims = () => {
  if (currentGroup) {
    console.log('currentGroup:', currentGroup);
    console.log('allUserCards:', allUserCards);
    const filteredWhimsByGroup = allUserCards.filter((card) => card.groupId == currentGroup.id);
    console.log('filteredWhimsByGroup: ', filteredWhimsByGroup);
    cards = filteredWhimsByGroup;
  } else {
    console.log('no currentGroup - allUserCards:', allUserCards);
    cards = allUserCards;
  }
  // };

  const fetchWhims = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const allWhimsData = await getWhims(userId);

      if (allWhimsData) {
        // it says the properties don't exist for whims, but it's wrong, it works
        const formattedWhims = allWhimsData.map((whim) => ({
          id: whim.id,
          groupId: whim.groupId,
          createdBy: whim.createdBy,
          eventName: whim.eventName || null,
          eventType: whim.eventType || null,
          date: whim.date || null,
          location: whim.location || null,
          color: whim.color || null,
        }));
        console.log(`formattedWhims:`, formattedWhims);
        setAllUserCards(formattedWhims);
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

  const handleSelectGroup = (groupData?: GroupData) => {
    // console.log(`Group ${groupData.groupCode} button clicked`);
    if (groupData == currentGroup) {
      console.log("Already on this group page"); // Debug log
      return;
    }
    if (groupData) {
      console.log("Pulling whims for group:", groupData.groupCode); // Debug log
      setCurrentGroup(groupData);
    } else {
      console.log("Pulling all whims for home page"); // Debug log
      setCurrentGroup(undefined);
    }
  };

  console.log("Current cards:", cards); // Debug log

  return (
    <div className="dashboard">
      <Sidebar onSelectGroup={handleSelectGroup} />
      <div className="dashboard-content">
        <Header
          onCreateCard={handleCreateCard}
          groupData={currentGroup}
        />
        <main className="main-content">
          <div className="cards-container">
            {cards.map((card, index) => (
              <Card
                key={index}
                groupId={card.groupId}
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
