import { doc, setDoc, collection, updateDoc, increment, getDoc, getDocs, deleteDoc, query, where, arrayUnion, arrayRemove, addDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig'; // Assuming you have a Firebase instance

export interface CardData {
  id: string;
  groupId: string;
  createdBy: string;
  eventName: string;
  eventType: string;
  date?: string;
  location?: string;
  color: string;
  likes: number;
  dislikes: number;
  userChoices?: { [userId: string]: 'like' | 'dislike' | null }; // Track user choices
}

export interface GroupData {
  id: string;
  createdAt: string;
  groupName: string;
  groupCode: string;
  memberIds: string[]; // Assuming memberIds is an array of user IDs
}

// Create a whim
export const createWhim = async (whimData: CardData) => {
  try {
    const whimRef = await addDoc(collection(firestore, 'groups', whimData.groupId, 'whims'), {
      ...whimData,
      likes: 0,
      dislikes: 0,
    });
    console.log(`Whim created successfully with ID: ${whimRef.id}`);
    return whimRef.id; // Return the created whim's ID
  } catch (error) {
    console.error("Error creating whim:", error);
    throw error; // Rethrow the error for proper handling
  }
};

// Handle like or dislike
export const handleLikeDislike = async (groupId: string, whimId: string, isLike: boolean, isRemove: boolean) => {
  try {
    const whimRef = doc(firestore, 'groups', groupId, 'whims', whimId);
    await updateDoc(whimRef, {
      [isLike ? 'likes' : 'dislikes']: increment(isRemove ? -1 : 1),
    });
    console.log(`${isLike ? 'Liked' : 'Disliked'} whim with ID: ${whimId}`);
  } catch (error) {
    console.error('Error updating likes/dislikes:', error);
  }
};

// Fetch like and dislike counts and user choice
export const getLikesDislikes = async (groupId: string, whimId: string) => {
  try {
    const whimDocRef = doc(firestore, 'groups', groupId, 'whims', whimId);
    const whimDoc = await getDoc(whimDocRef);

    if (whimDoc.exists()) {
      const whimData = whimDoc.data();
      return {
        likeCount: whimData.likes || 0,
        dislikeCount: whimData.dislikes || 0,
        userChoice: whimData.userChoices || {},
      };
    } else {
      throw new Error("Whim document does not exist");
    }
  } catch (error) {
    console.error("Error getting like/dislike data:", error);
    return { likeCount: 0, dislikeCount: 0, userChoice: {} };
  }
};

// Update like or dislike
export const updateLikeDislike = async (groupId: string, whimId: string, type: "like" | "dislike") => {
  try {
    const whimDocRef = doc(firestore, 'groups', groupId, 'whims', whimId);
    // Get current like and dislike counts
    const whimDoc = await getDoc(whimDocRef);
    if (!whimDoc.exists()) {
      throw new Error("Whim document does not exist");
    }

    const whimData = whimDoc.data();
    let likeCount = whimData.likes || 0;
    let dislikeCount = whimData.dislikes || 0;

    // Update like/dislike count based on type
    if (type === "like") {
      likeCount += 1;
    } else if (type === "dislike") {
      dislikeCount += 1;
    }

    // Set the new counts in Firestore
    await updateDoc(whimDocRef, {
      likes: likeCount,
      dislikes: dislikeCount,
    });

  } catch (error) {
    console.error("Error updating like/dislike:", error);
    throw error;
  }
};

// Create or update user choice
export const setUserChoice = async (groupId: string, whimId: string, userId: string, choice: "like" | "dislike" | null) => {
  try {
    const whimDocRef = doc(firestore, 'groups', groupId, 'whims', whimId);
    await updateDoc(whimDocRef, {
      [`userChoices.${userId}`]: choice
    });
  } catch (error) {
    console.error("Error setting user choice:", error);
    throw error;
  }
};

// Fetch user choice
export const getUserChoice = async (groupId: string, whimId: string, userId: string) => {
  try {
    const whimDocRef = doc(firestore, 'groups', groupId, 'whims', whimId);
    const whimDoc = await getDoc(whimDocRef);

    if (whimDoc.exists()) {
      const whimData = whimDoc.data();
      return whimData.userChoices?.[userId] || null;
    } else {
      throw new Error("Whim document does not exist");
    }
  } catch (error) {
    console.error("Error getting user choice:", error);
    throw error;
  }
};

// Function to get all whims of a user
export const getWhims = async (userId: string) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    if (userData) {
      if (!userData.groupIds) {
        console.log("No whims available.");
        return [];
      }
      let allUserWhims = [];
      for (const groupId of userData.groupIds) {
        const whimsRef = collection(firestore, 'groups', groupId, 'whims');
        const whimsSnapshot = await getDocs(whimsRef);
        const groupWhims = whimsSnapshot.docs.map(whim => ({ id: whim.id, ...whim.data() }));
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
export const deleteWhim = async (whimData: any) => {
  try {
    const whimRef = doc(firestore, 'groups', whimData.groupId, 'whims', whimData.id);
    await deleteDoc(whimRef);
    console.log('Whim deleted with ID:', whimData.id);
  } catch (error) {
    console.error('Error deleting whim deleteWhim:', error);
  }
};

// Function to create a group
export const createGroup = async (userId: string, groupData: any) => {
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
    return groupRef;

  } catch (error) {
    console.error('Error creating group:', error);
  }
};

// Function to verify that the randomly generated groupCode is unique
export const checkGroupCodeUnique = async (groupCode: string) => {
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
  }
};

// Function to join a group
export const joinGroup = async (userId: string, groupCode: string) => {
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
    const groupData = groupDoc.data();

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

    // Returns joined group
    console.log(`User ${userId} successfully joined group ${groupId}`);
    return groupData;

  } catch (error) {
    console.error('Error joining group:', error);
  }
};

// Function to leave a group, based on its id
export const leaveGroup = async (userId: string, groupId: string) => {
  try {
    const groupRef = doc(firestore, 'groups', groupId);
    const groupDoc = await getDoc(groupRef);
    const groupData = groupDoc.data();

    if (!groupData) {
      console.log('groupData not found');
      return;
    }

    if (groupData.createdBy === userId) {
      // Remove the groupId from each user's groupIds
      for (const memberId of groupData.memberIds) {
        const memberRef = doc(firestore, 'users', memberId);
        await updateDoc(memberRef, {
          groupIds: arrayRemove(groupId)
        });
        console.log(`Removed group ${groupId} from user ${memberId}'s groupIds`); // Debug log
      }

      // Delete the group
      await deleteDoc(groupRef);
      console.log(`${userId} deleted ${groupId} when leaving`);
    } else {
      // Remove the user from the group's memberIds
      await updateDoc(groupRef, {
        memberIds: arrayRemove(userId)
      });
      console.log(`${userId} was removed as a member from group ${groupId}`); // Debug log

      // Remove group from the user's groupIds
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        groupIds: arrayRemove(groupId)
      });
    }
    console.log(`${userId} left group with ID: ${groupId}`); // Debug log
  } catch (error) {
    console.error('Error leaving group:', error); // Debug log
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
