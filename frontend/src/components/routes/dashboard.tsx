import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";
import Tray from "../navigation/tray";
import { getWhims } from "../../firebaseService";
import "./dashboard.css";
import { getAuth } from "firebase/auth";

interface WhimData {
  id: string;
  eventName: string;
  eventType: string;
  date?: string;
  location: string;
  color: string;
  groupId: string; // Add groupId
}

interface GroupedWhims {
  [groupId: string]: WhimData[];
}

const Dashboard: React.FC = () => {
  const [allWhims, setAllWhims] = useState<WhimData[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const auth = getAuth();

  const fetchWhims = async () => {
    if (auth.currentUser) {
      const whimsData = await getWhims();
      if (whimsData) {
        setAllWhims(whimsData);
      }
    }
  };

  useEffect(() => {
    fetchWhims();
  }, []);

  const handleCreateCard = async (cardData: WhimData) => {
    console.log("Creating card:", cardData);
    await fetchWhims();
  };

  const handleDeleteCard = async (cardData: WhimData) => {
    console.log("Deleting card:", cardData);
    await fetchWhims();
  };

  const handleSelectGroup = (groupId: string | null) => {
    setSelectedGroupId(groupId);
  };

  const filteredWhims = selectedGroupId
    ? allWhims.filter((whim) => whim.groupId === selectedGroupId)
    : allWhims;

  const groupedWhims: GroupedWhims = filteredWhims.reduce((acc, whim) => {
    if (!acc[whim.groupId]) {
      acc[whim.groupId] = [];
    }
    acc[whim.groupId].push(whim);
    return acc;
  }, {} as GroupedWhims);

  const isHomeView = selectedGroupId === null;

  return (
    <div className="dashboard">
      <Sidebar onSelectGroup={handleSelectGroup} />
      <div className="dashboard-content">
        <Header
          onCreateCard={handleCreateCard}
          currentGroupId={selectedGroupId}
        />
        <main className="main-content">
          <Tray
            groupedWhims={groupedWhims}
            onDeleteCard={handleDeleteCard}
            isHomeView={isHomeView}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
