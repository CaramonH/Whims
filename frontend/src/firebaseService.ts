import { doc, setDoc, collection, updateDoc, getDoc, getDocs, deleteDoc, query, where, arrayUnion, arrayRemove, addDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

export interface CardData {
  id: string;
  groupId: string;
  createdBy: string;
  eventName: string;
  eventType: string;
  date?: string;
  location?: string;
  color: string;
  likes: string[]; // Array of user IDs who liked
  dislikes: string[]; // Array of user IDs who disliked
}

export interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
  memberIds: string[]; // Assuming memberIds is an array of user IDs
}

// Create a whim
export const createWhim = async (whimData: Omit<CardData, 'likes' | 'dislikes'>): Promise<string> => {
  try {
    const whimRef = await addDoc(collection(firestore, 'groups', whimData.groupId, 'whims'), {
      ...whimData,
      likes: [],
      dislikes: [],
    });
    console.log(`Whim created successfully with ID: ${whimRef.id}`);
    return whimRef.id; // Return the created whim's ID
  } catch (error) {
    console.error("Error creating whim:", error);
    throw error; // Rethrow the error for proper handling
  }
};

// Toggle like or dislike
export const toggleLikeDislike = async (groupId: string, whimId: string, userId: string, isLike: boolean): Promise<void> => {
  try {
    const whimRef = doc(firestore, 'groups', groupId, 'whims', whimId);
    const whimDoc = await getDoc(whimRef);

    if (!whimDoc.exists()) {
      throw new Error("Whim document does not exist");
    }

    const whimData = whimDoc.data() as CardData;
    let likes = [...(whimData.likes || [])];
    let dislikes = [...(whimData.dislikes || [])];

    if (isLike) {
      if (likes.includes(userId)) {
        likes = likes.filter(id => id !== userId);
      } else {
        likes.push(userId);
        dislikes = dislikes.filter(id => id !== userId);
      }
    } else {
      if (dislikes.includes(userId)) {
        dislikes = dislikes.filter(id => id !== userId);
      } else {
        dislikes.push(userId);
        likes = likes.filter(id => id !== userId);
      }
    }

    await updateDoc(whimRef, { likes, dislikes });
    console.log(`${isLike ? 'Liked' : 'Disliked'} whim with ID: ${whimId}`);
  } catch (error) {
    console.error('Error updating likes/dislikes:', error);
    throw error;
  }
};

// Fetch like and dislike counts and user choice
export const getLikesDislikes = async (groupId: string, whimId: string): Promise<{
  likeCount: number;
  dislikeCount: number;
  likes: string[];
  dislikes: string[];
}> => {
  try {
    const whimDocRef = doc(firestore, 'groups', groupId, 'whims', whimId);
    const whimDoc = await getDoc(whimDocRef);

    if (whimDoc.exists()) {
      const whimData = whimDoc.data() as CardData;
      return {
        likeCount: whimData.likes.length || 0,
        dislikeCount: whimData.dislikes.length || 0,
        likes: whimData.likes,
        dislikes: whimData.dislikes
      };
    } else {
      throw new Error("Whim document does not exist");
    }
  } catch (error) {
    console.error("Error getting like/dislike data:", error);
    return { likeCount: 0, dislikeCount: 0, likes: [], dislikes: [] };
  }
};

// Function to get all whims of a user
export const getWhims = async (userId: string): Promise<CardData[]> => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    if (userData) {
      if (!userData.groupIds) {
        console.log("No whims available.");
        return [];
      }
      let allUserWhims: CardData[] = [];
      for (const groupId of userData.groupIds) {
        const whimsRef = collection(firestore, 'groups', groupId, 'whims');
        const whimsSnapshot = await getDocs(whimsRef);
        const groupWhims = whimsSnapshot.docs.map(whim => ({ id: whim.id, ...whim.data() } as CardData));
        allUserWhims.push(...groupWhims);
        console.log('groupWhims:', groupWhims); // Debug log
      }
      console.log("getWhims - all user whims:", allUserWhims); // Debug log
      return allUserWhims;
    } else {
      console.log("No such user!");
      return [];
    }
  } catch (error) {
    console.error("Error reading whims:", error);
    return [];
  }
};

// Function to delete a whim by its ID
export const deleteWhim = async (whimData: CardData): Promise<void> => {
  try {
    const whimRef = doc(firestore, 'groups', whimData.groupId, 'whims', whimData.id);
    await deleteDoc(whimRef);
    console.log('Whim deleted with ID:', whimData.id);
  } catch (error) {
    console.error('Error deleting whim deleteWhim:', error);
  }
};

// Function to create a group
export const createGroup = async (userId: string, groupData: Omit<GroupData, 'id' | 'createdAt'> & { createdBy?: string, memberIds?: string[] }): Promise<string | undefined> => {
    try {
      groupData.createdBy = userId;
      groupData.memberIds = [userId];

      // Create group
      const groupRef = await addDoc(collection(firestore, 'groups'), groupData);
      console.log(`Group created successfully with ID: ${groupRef.id}`);

      // Add group to user's groupIds
      const userRef = doc(firestore, 'users', userId);
      await setDoc(userRef, { groupIds: arrayUnion(groupRef.id) }, { merge: true });
      console.log('Group added to user with ID:', userId);

      // Returns created group
      return groupRef.id;

    } catch (error) {
      console.error('Error creating group:', error);
      return undefined;
    }
};

// Function to verify that the randomly generated groupCode is unique
export const checkGroupCodeUnique = async (groupCode: string): Promise<boolean> => {
  try {
    const groupsRef = collection(firestore, 'groups');
    const q = query(groupsRef, where('groupCode', '==', groupCode));
    const groupSnapshot = await getDocs(q);

    if (groupSnapshot.empty) {
      console.log('Group code is unique.');
      return true;
    } else {
      console.log('Group code is not unique.');
      return false;
    }

  } catch (error) {
    console.error('Error checking group code uniqueness:', error);
    return false;
  }
};

// Function to join a group
export const joinGroup = async (userId: string, groupCode: string): Promise<void> => {
  try {
    // Find group using groupCode
    const groupsRef = collection(firestore, 'groups');
    const q = query(groupsRef, where('groupCode', '==', groupCode));
    const groupSnapshot = await getDocs(q);

    if (groupSnapshot.empty) {
      console.log('No group found with the given group code.');
      return;
    }
    if (groupSnapshot.size > 1) {
      console.log('Multiple groups found with the same group code.');
      return;
    }

    const groupDoc = groupSnapshot.docs[0];
    const groupId = groupDoc.id;
    const groupData = groupDoc.data() as GroupData;

    // Update the group's memberIds unless already added
    if (groupData.memberIds && groupData.memberIds.includes(userId)) {
      console.log('Group already has this member.');
    } else {
      const groupRef = doc(firestore, 'groups', groupId);
      await setDoc(groupRef, {
        memberIds: arrayUnion(userId)
      }, { merge: true });
    }

    // Update the user's groupIds unless already added
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    if (userData && userData.groupIds && userData.groupIds.includes(groupId)) {
      console.log('User is already a member of this group.');
    } else {
      await setDoc(userRef, {
        groupIds: arrayUnion(groupId)
      }, { merge: true });
    }

    console.log(`User ${userId} successfully joined group ${groupId}`);
  } catch (error) {
    console.error('Error joining group:', error);
  }
};

// Function to leave a group
export const leaveGroup = async (userId: string, groupId: string): Promise<void> => {
  try {
    const groupRef = doc(firestore, 'groups', groupId);
    const userRef = doc(firestore, 'users', userId);

    // Update group's memberIds to remove userId
    await updateDoc(groupRef, {
      memberIds: arrayRemove(userId)
    });

    // Update user's groupIds to remove groupId
    await updateDoc(userRef, {
      groupIds: arrayRemove(groupId)
    });

    console.log(`User ${userId} successfully left group ${groupId}`);
  } catch (error) {
    console.error('Error leaving group:', error);
  }
};

// Function to get groups of a user
export const getUserGroups = async (userId: string) => {
  try {
    // Fetch the user document to get groupIds
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.log("No such user!");
      return [];
    }

    const userData = userDoc.data();
    const groupIds = userData.groupIds || [];

    if (groupIds.length === 0) {
      console.log('No groups found for this user.');
      return [];
    }

    // Fetch the group documents using groupIds
    const groupsRef = collection(firestore, 'groups');
    const q = query(groupsRef, where('__name__', 'in', groupIds));
    const groupsSnapshot = await getDocs(q);

    const groups = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return groups;

  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};