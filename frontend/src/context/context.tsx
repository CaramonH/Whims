import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getUserGroups,
  getWhims,
  createWhim,
  deleteWhim,
  toggleLikeDislike,
  CardData,
  GroupData,
} from "../firebaseService";

interface AppContextType {
  userGroups: GroupData[];
  currentGroup?: GroupData;
  whims: CardData[];
  setCurrentGroup: (group?: GroupData) => void;
  updateGroups: () => Promise<void>;
  updateWhims: () => Promise<void>;
  createNewWhim: (
    whimData: Omit<CardData, "likes" | "dislikes">
  ) => Promise<string>;
  deleteExistingWhim: (whimData: CardData) => Promise<void>;
  toggleWhimReaction: (
    whimId: string,
    groupId: string,
    userId: string,
    isLike: boolean
  ) => Promise<void>;
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
  const [whims, setWhims] = useState<CardData[]>([]);
  const [sortByUpcoming, setSortByUpcoming] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [likeStatus, setLikeStatus] = useState<
    "all" | "liked" | "disliked" | "neutral"
  >("all");

  const auth = getAuth();

  const updateGroups = async () => {
    if (auth.currentUser) {
      try {
        const groupsData = await getUserGroups(auth.currentUser.uid);
        setUserGroups(groupsData as GroupData[]);

        // If current group is set, update it with fresh data
        if (currentGroup) {
          const updatedGroup = groupsData.find((g) => g.id === currentGroup.id);
          if (updatedGroup) {
            setCurrentGroup(updatedGroup);
          }
        }
      } catch (error) {
        console.error("Error updating groups:", error);
      }
    }
  };

  const updateWhims = async () => {
    if (auth.currentUser) {
      try {
        const whimsData = await getWhims(auth.currentUser.uid);
        setWhims(whimsData);
      } catch (error) {
        console.error("Error updating whims:", error);
      }
    }
  };

  const createNewWhim = async (
    whimData: Omit<CardData, "likes" | "dislikes">
  ) => {
    const whimId = await createWhim(whimData);
    await updateWhims();
    return whimId;
  };

  const deleteExistingWhim = async (whimData: CardData) => {
    await deleteWhim(whimData);
    await updateWhims();
  };

  const toggleWhimReaction = async (
    whimId: string,
    groupId: string,
    userId: string,
    isLike: boolean
  ) => {
    await toggleLikeDislike(groupId, whimId, userId, isLike);
    await updateWhims();
  };

  // Initial data fetch when auth state changes
  useEffect(() => {
    if (auth.currentUser) {
      updateGroups();
      updateWhims();
    } else {
      setUserGroups([]);
      setWhims([]);
      setCurrentGroup(undefined);
    }
  }, [auth.currentUser]);

  return (
    <AppContext.Provider
      value={{
        userGroups,
        currentGroup,
        whims,
        setCurrentGroup,
        updateGroups,
        updateWhims,
        createNewWhim,
        deleteExistingWhim,
        toggleWhimReaction,
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
