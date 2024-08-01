import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import Tray from "../navigation/tray";
import { getUserWhims, getGroupWhims } from "../../firebaseService";
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
  createdBy: string;
  groupName: string;
  groupCode: string;
}

interface GroupedWhims {
  [groupId: string]: CardData[];
}

const Dashboard: React.FC = () => {
  const [allUserCards, setAllUserCards] = useState<CardData[]>([]);
  const [userGroups, setUserGroups] = useState<GroupData[]>([]);
  const [currentGroup, setCurrentGroup] = useState<GroupData>();
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const auth = getAuth();

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

  const fetchWhims = async () => {
    if (auth.currentUser) {
      let allWhimsData;

      if (isInitialLoad === true) {
        const userId = auth.currentUser.uid;
        allWhimsData = await getUserWhims(userId);
        setIsInitialLoad(false);
      } else {
        allWhimsData = await getGroupWhims(userGroups);
      }

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

  const handleSelectGroup = (groupData?: GroupData) => {
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

  const handleGetGroupList = async (groupList: GroupData[]) => {
    console.log("Getting group list from sidebar:", groupList);
    setUserGroups(groupList);
    // await fetchWhims();
    // ^I think this caused some recursive stuff to happen so definitely don't do that
  };

  return (
    <div className="dashboard">
      <Sidebar
        onSelectGroup={handleSelectGroup}
        onGetGroupList={handleGetGroupList}
      />
      <div className="dashboard-content">
        <Header
          onCreateCard={handleCreateCard}
          groupData={currentGroup}
        />
        <main className="main-content">
          <Tray
            groupedWhims={groupedWhims}
            onDeleteCard={handleDeleteCard}
            isHomeView={isHomeView}
            userGroups={userGroups}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
