// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getUserGroups } from "../firebaseService";
import { GroupData, CardData } from "../types/dataTypes";

interface AppContextType {
  userGroups: GroupData[];
  currentGroup?: GroupData;
  setCurrentGroup: (group?: GroupData) => void;
  updateGroups: () => Promise<void>;
  sortByUpcoming: boolean;
  setSortByUpcoming: (value: boolean) => void;
  selectedEventType: string;
  setSelectedEventType: (type: string) => void;
  likeStatus: "all" | "liked" | "disliked" | "neutral";
  setLikeStatus: (status: "all" | "liked" | "disliked" | "neutral") => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userGroups, setUserGroups] = useState<GroupData[]>([]);
  const [currentGroup, setCurrentGroup] = useState<GroupData>();
  const [sortByUpcoming, setSortByUpcoming] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [likeStatus, setLikeStatus] = useState<
    "all" | "liked" | "disliked" | "neutral"
  >("all");

  const updateGroups = async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      const groupsData = await getUserGroups(auth.currentUser.uid);
      setUserGroups(groupsData as GroupData[]);
    }
  };

  useEffect(() => {
    updateGroups();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userGroups,
        currentGroup,
        setCurrentGroup,
        updateGroups,
        sortByUpcoming,
        setSortByUpcoming,
        selectedEventType,
        setSelectedEventType,
        likeStatus,
        setLikeStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
