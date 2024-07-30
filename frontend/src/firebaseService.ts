// firebaseService.ts
import { firestore } from './firebaseConfig';
import {
  addDoc, getDoc, getDocs, setDoc, deleteDoc, updateDoc,
  doc, collection,
  query, where, arrayUnion, arrayRemove
} from 'firebase/firestore';


// Function to create a whim
export const createWhim = async (/*groupId: string, */whimData: any) => {
  try {
    const whimRef = await addDoc(collection(firestore, 'whims'), whimData);
    console.log(`Whim created successfully with ID: ${whimRef.id}`);
  } catch (error) {
    console.error("Error creating whim:", error);
  }
};


// Function to get whims of a user based on group (if selected)
// userId: string, groupData: any
export const getWhims = async () => {
  try {
    // if (groupData) {
    //   const whimsRef = collection(firestore, 'groups', groupData.id, 'whims');
    //   const whimsSnapshot = await getDocs(whimsRef);

    //   if (whimsSnapshot.empty) {
    //     console.log("No whims available.");
    //     return [];
    //   } else {
    //     const whims = whimsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     console.log(whims);
    //     return whims;
    //   }
    // } else {
    //   const allUserGroups = getUserGroups(userId);
    //   const groupsRef = collection(firestore, 'groups');
    //   const q = query(groupsRef, where('__name__', 'in', allUserGroups));
    //   const groupsSnapshot = await getDocs(q);

    //   const allWhims = groupsSnapshot.docs.map(doc => ([ ...doc.whims ]));
    //   // ^this code isn't quite right I dont, think. Specifically ^this part
    //   return allWhims;
    // }

    const whimsRef = collection(firestore, 'whims');
    const whimsSnapshot = await getDocs(whimsRef);

    if (whimsSnapshot.empty) {
      console.log("No whims available.");
      return [];
    } else {
      const whims = whimsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(whims);
      return whims;
    }
  } catch (error) {
    console.error("Error reading whims:", error);
    return [];
  }
};


// Function to delete a whim by its ID
export const deleteWhim = async (whimId: string) => {
  try {
    const whimRef = doc(firestore, 'whims', whimId);
    await deleteDoc(whimRef);
    console.log('Whim deleted with ID:', whimId);
  } catch (error) {
    console.error('Error deleting whim deleteWhim:', error);
  }
};


// Function to create a group
export const createGroup = async (userId: string, groupData: any) => {
  try {
    groupData.createdBy = userId;
    groupData.memberIds = [ userId ];

    // Create group
    const groupRef = await addDoc(collection(firestore, 'groups'), groupData);
    console.log(`Group created successfully with ID: ${groupRef.id}`);

    // Add group to user's groupIds
    const userRef = doc(firestore, 'users', userId);
    await setDoc(userRef, { groupIds: arrayUnion(groupRef.id) }, { merge: true });
    console.log('Group added to user with ID:', userId);

    // Returns created group
    return (groupRef);

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
      // after I create and implement the function to check code uniqueness,
      // this shouldn't be needed, but it might be good to keep it just in case
      console.log('Multiple groups found with the same group code.');
      return;
    }

    const groupDoc = groupSnapshot.docs[0];
    const groupId = groupDoc.id;
    const groupData = groupDoc.data();

    // const groupRef = doc(firestore, 'groups', groupId);
    // const userRef = doc(firestore, 'users', userId);


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
    return (groupData);

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
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    // remove user from groups members (or delete the group)
    if (!groupData) {
      console.log('groupData not found');
    } else if (groupData.createdBy === userId) {
      await deleteDoc(groupRef);
      console.log(`${userId} deleted ${groupId} when leaving`); // Debug log
    } else {
      await updateDoc(groupRef, {
        memberIds: arrayRemove(userId)
      });
      console.log(`${userId} was removed as a member from group ${groupId}`);
    }

    // remove group from users groups
    await updateDoc(userRef, {
      groupIds: arrayRemove(groupId)
    });

    console.log(`${userId} left group with ID: ${groupId}`);
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
