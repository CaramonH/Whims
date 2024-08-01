import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import Tray from "../navigation/tray";
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
}

interface GroupedWhims {
  [groupId: string]: CardData[];
}

const Dashboard: React.FC = () => {
// evanBranch
//  const [allWhims, setAllWhims] = useState<CardData[]>([]);
//  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [allUserCards, setAllUserCards] = useState<CardData[]>([]);
  // const [cards, setCards] = useState<CardData[]>([]);
  const [currentGroup, setCurrentGroup] = useState<GroupData>();
  const auth = getAuth();

  let cards;
  // const filterGroupWhims = () => {
  if (currentGroup) {
    // console.log('currentGroup:', currentGroup);
    // console.log('allUserCards:', allUserCards);
    const filteredWhimsByGroup = allUserCards.filter((card) => card.groupId === currentGroup.id);
    // console.log('filteredWhimsByGroup: ', filteredWhimsByGroup);
    cards = filteredWhimsByGroup;
  } else {
    // console.log('no currentGroup - allUserCards:', allUserCards);
    cards = allUserCards;
  }
  // };

  const fetchWhims = async () => {
    if (auth.currentUser) {
// evanBranch
//       const whimsData = await getWhims();
//       if (whimsData) {
//         setAllWhims(whimsData);
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
    console.log("Creating card:", cardData);
    await fetchWhims();
  };

  const handleDeleteCard = async (cardData: CardData) => {
    console.log("Deleting card:", cardData);
    await fetchWhims();
  };

// evanBranch
//   const handleSelectGroup = (groupId: string | null) => {
//    setSelectedGroupId(groupId);
//   };

  const handleSelectGroup = (groupData?: GroupData) => {
    // console.log(`Group ${groupData.groupCode} button clicked`);
    if (groupData == currentGroup) {
      console.log("Already on this group page"); // Debug log
      return;
    }
    if (groupData) {
      console.log('Setting selected group to', groupData.groupCode); // Debug log
      setCurrentGroup(groupData);
    } else {
      console.log('Setting selected group to home'); // Debug log
      setCurrentGroup(undefined);
    }
  };

  // Evan's code is basically the same as mine
  const filteredWhims = currentGroup
    ? allUserCards.filter((whim) => whim.groupId === currentGroup.id)
    : allUserCards;

  const groupedWhims: GroupedWhims = filteredWhims.reduce((acc, whim) => {
    if (!acc[whim.groupId]) {
      acc[whim.groupId] = [];
    }
    acc[whim.groupId].push(whim);
    return acc;
  }, {} as GroupedWhims);

  const isHomeView = currentGroup === null;

  return (
    <div className="dashboard">
      <Sidebar onSelectGroup={handleSelectGroup} />
      <div className="dashboard-content">
        <Header
          onCreateCard={handleCreateCard}
          groupData={currentGroup}
        />
        <main className="main-content">
{/* evanBranch */}
          <Tray
            groupedWhims={groupedWhims}
            onDeleteCard={handleDeleteCard}
            isHomeView={isHomeView}
          />
{/* karisBranch
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
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
