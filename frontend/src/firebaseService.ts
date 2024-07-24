// firebaseService.ts
import { firestore } from './firebaseConfig';
import { addDoc, getDocs, collection } from 'firebase/firestore';

// Function to create a whim
export const createWhim = async (whimData: any) => {
  try {
    const whimRef = await addDoc(collection(firestore, 'whims'), whimData);
    console.log(`Whim created successfully with ID: ${whimRef.id}`);
  } catch (error) {
    console.error("Error creating whim:", error);
  }
};
// I've messed with this^ one, but not getWhims yet
// it doesn't work though
// I wonder how addDoc works, how does it know what database to push to?
// ^a question I'm only writing down to use as a starting point for
//  when I get back to this later

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
