// firebaseService.ts
import { firestore } from './firebaseConfig';
import { doc, addDoc, getDocs, deleteDoc, collection } from 'firebase/firestore';

// Function to create a whim
export const createWhim = async (whimData: any) => {
  try {
    const whimRef = await addDoc(collection(firestore, 'whims'), whimData);
    console.log(`Whim created successfully with ID: ${whimRef.id}`);
  } catch (error) {
    console.error("Error creating whim:", error);
  }
};

// Function to get all whims (would need to be based on user)
export const getWhims = async () => {
  try {
    const whimsRef = collection(firestore, 'whims');
    const whimsSnapshot = await getDocs(whimsRef);
    
    if (whimsSnapshot.empty) {
      console.log("No whims available.");
      return null;
    } else {
      const whims = whimsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(whims);
      return whims;
    }
  } catch (error) {
    console.error("Error reading whims:", error);
    return null;
  }
};

// Function to delete a whim by its ID
export const deleteWhim = async (whimId: string) => {
  try {
    const whimRef = doc(firestore, 'whims', whimId);
    await deleteDoc(whimRef);
    console.log('Whim deleted with ID:', whimId);
  } catch (error) {
    console.error('Error deleting whim:', error);
  }
};

// Function to get group whims
