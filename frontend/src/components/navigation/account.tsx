import React, { useRef, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import Button from "../general/button";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons"; // Importing a dummy icon
import "../navigation/navigation.css";

interface AccountProps {
  onClose: () => void;
}

const Account: React.FC<AccountProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        try {
          const userDocRef = doc(db, "users", user.uid); // Adjust the collection path as needed
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setName(userDoc.data().name); // Adjust the field name as per your Firestore schema
          } else {
            console.log("No such document!");
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
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();

      if (user) {
        try {
          await deleteDoc(doc(db, "users", user.uid)); // Adjust the collection path as needed
          await deleteUser(user);

          alert("Your account has been deleted.");
          onClose();
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("Failed to delete your account. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="pop-window-overlay">
      <div className="pop-window" ref={windowRef}>
        <div className="pop-window-content">
          <Button
            icon={faTimes}
            onClick={onClose}
            className="close-button pop-up-close"
            label=""
          />
          <div className="pop-window-header account-info">
            <h2>Account</h2>
            {email ? (
              <>
                <p>Name: {name || "Loading..."}</p>
                <p>Email: {email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
            <Button
              icon={faCircle} // Providing a dummy icon to satisfy the type requirement
              onClick={handleDeleteAccount}
              label="Delete Account"
              className="delete-account-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
