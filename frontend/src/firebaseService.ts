import { database } from './firebaseConfig';
import { ref, set, get } from "firebase/database";

// Function to create a whim
export const createWhim = (groupId: string, whimId: string, whimData: any) => {
  return set(ref(database, `groups/${groupId}/whims/${whimId}`), whimData)
    .then(() => {
      console.log("Whim created successfully.");
    })
    .catch((error) => {
      console.error("Error creating whim:", error);
    });
};

// Function to get whims for a group
export const getWhims = async (groupId: string) => {
  const whimsRef = ref(database, `groups/${groupId}/whims`);
  try {
    const snapshot = await get(whimsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No whims available.");
      return null;
    }
  } catch (error) {
    console.error("Error reading whims:", error);
    return null;
  }
};