// firebaseService.ts
import { firestore } from './firebaseConfig';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

// Function to create a whim
export const createWhim = async (groupId: string, whimId: string, whimData: any) => {
  try {
    const whimRef = doc(firestore, `groups/${groupId}/whims/${whimId}`);
    await setDoc(whimRef, whimData);
    console.log("Whim created successfully.");
  } catch (error) {
    console.error("Error creating whim:", error);
  }
};

// Function to get whims for a group
export const getWhims = async (groupId: string) => {
  try {
    const whimsRef = collection(firestore, `groups/${groupId}/whims`);
    const querySnapshot = await getDocs(whimsRef);
    
    if (querySnapshot.empty) {
      console.log("No whims available.");
      return null;
    } else {
      const whims = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return whims;
    }
  } catch (error) {
    console.error("Error reading whims:", error);
    return null;
  }
};
