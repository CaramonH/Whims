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
  likes?: string[];
  dislikes?: string[];
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
  const [sortByUpcoming, setSortByUpcoming] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>("");
  const [likeStatus, setLikeStatus] = useState<string>("all");
  const auth = getAuth();

  const filteredWhims = allUserCards
    .filter((whim) => (currentGroup ? whim.groupId === currentGroup.id : true))
    .filter((whim) =>
      selectedEventType ? whim.eventType === selectedEventType : true
    )
    .filter((whim) => {
      if (likeStatus === "all") return true;
      if (likeStatus === "liked") {
        return whim.likes && whim.likes.includes(auth.currentUser?.uid || "");
      }
      if (likeStatus === "disliked") {
        return (
          whim.dislikes && whim.dislikes.includes(auth.currentUser?.uid || "")
        );
      }
      if (likeStatus === "neutral") {
        return (
          (!whim.likes || !whim.likes.includes(auth.currentUser?.uid || "")) &&
          (!whim.dislikes ||
            !whim.dislikes.includes(auth.currentUser?.uid || ""))
        );
      }
      return true;
    });

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
          likes: whim.likes || [],
          dislikes: whim.dislikes || [],
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

  const handleSortByUpcoming = () => {
    setSortByUpcoming((prev) => !prev);
  };

  const sortFunction = sortByUpcoming
    ? (a: CardData, b: CardData) => {
        if (!a.date || !b.date) return 0;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    : undefined;

  const handleSelectEventType = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  const handleSelectLikeStatus = (status: string) => {
    console.log("Selected like status:", status);
    setLikeStatus(status);
  };

  console.log("Filtered Whims:", filteredWhims);

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
          onSortByUpcoming={handleSortByUpcoming}
          onSelectEventType={handleSelectEventType}
          onSelectLikeStatus={handleSelectLikeStatus}
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
