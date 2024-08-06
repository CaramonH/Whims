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
  const [sortByNewest, setSortByNewest] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>("");
  const auth = getAuth();

  const filteredWhims = allUserCards
    .filter((whim) => (currentGroup ? whim.groupId === currentGroup.id : true))
    .filter((whim) =>
      selectedEventType ? whim.eventType === selectedEventType : true
    );

  const groupedWhims: GroupedWhims = filteredWhims.reduce((acc, whim) => {
    if (!acc[whim.groupId]) {
      acc[whim.groupId] = [];
    }
    acc[whim.groupId].push(whim);
    return acc;
  }, {} as GroupedWhims);

  const isHomeView = currentGroup === undefined;

  const fetchWhims = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const allWhimsData = await getWhims(userId);

      if (allWhimsData) {
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
    if (groupData === currentGroup) {
      console.log("Already on this group page");
      return;
    }
    if (groupData) {
      console.log("Setting selected group to", groupData.groupCode);
      setCurrentGroup(groupData);
    } else {
      console.log("Setting selected group to home");
      setCurrentGroup(undefined);
    }
  };

  const handleGetGroupList = (groupList: GroupData[]) => {
    console.log("Getting group list from sidebar:", groupList);
    setUserGroups(groupList);
  };

  const handleSortByNewest = () => {
    setSortByNewest(true);
  };

  const handleSelectEventType = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  const sortFunction = sortByNewest
    ? (a: CardData, b: CardData) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    : undefined;

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
          isHomePage={currentGroup === undefined}
          onSortByNewest={handleSortByNewest}
          onSelectEventType={handleSelectEventType}
        />
        <main className="main-content">
          <Tray
            groupedWhims={groupedWhims}
            onDeleteCard={handleDeleteCard}
            isHomeView={isHomeView}
            userGroups={userGroups}
            sortFunction={sortFunction}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
