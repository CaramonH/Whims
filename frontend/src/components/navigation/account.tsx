// src/components/account/Account.tsx
import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { Modal } from "../shared/Modal";
import { Button } from "../shared/Button";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

interface AccountProps {
  onClose: () => void;
}

const Account: React.FC<AccountProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setName(userDoc.data().name);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setEmail(null);
        setName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const password = prompt("Please enter your password to confirm:");

      if (password) {
        const credential = EmailAuthProvider.credential(
          user.email || "",
          password
        );

        try {
          await reauthenticateWithCredential(user, credential);
          const db = getFirestore();
          await deleteDoc(doc(db, "users", user.uid));
          await deleteUser(user);
          alert("Your account has been deleted.");
          onClose();
        } catch (error) {
          console.error("Error deleting account:", error);
          alert(
            "Failed to delete your account. Please check your password and try again."
          );
        }
      } else {
        alert("Password is required to delete the account.");
      }
    }
  };

  return (
    <Modal title="Account" onClose={onClose}>
      <div className="space-y-4">
        <div className="account-info">
          {email ? (
            <>
              <p className="text-gray-700">Name: {name || "Loading..."}</p>
              <p className="text-gray-700">Email: {email}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="border-t pt-4">
          <p className="text-red-600 font-medium mb-2">Delete Account?</p>
          <Button
            icon={faUserMinus}
            onClick={handleDeleteAccount}
            label="Delete Account"
            className="bg-red-500 text-white hover:bg-red-600"
          />
        </div>
      </div>
    </Modal>
  );
};

export default Account;
