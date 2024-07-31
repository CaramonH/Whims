import React, { useRef, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import Button from "../general/button";
import { faTimes, faUserMinus } from "@fortawesome/free-solid-svg-icons"; // Importing icons
import "../navigation/navigation.css";

interface AccountProps {
  onClose: () => void;
}

const Account: React.FC<AccountProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null); // State for password prompt
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
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Prompt user to confirm password
      const password = prompt("Please enter your password to confirm:");

      if (password) {
        const credential = EmailAuthProvider.credential(user.email || "", password);

        try {
          // Reauthenticate user
          await reauthenticateWithCredential(user, credential);
          
          // Proceed with account deletion
          const db = getFirestore();
          await deleteDoc(doc(db, "users", user.uid)); // Adjust the collection path as needed
          await deleteUser(user);

          alert("Your account has been deleted.");
          onClose();
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("Failed to delete your account. Please check your password and try again.");
        }
      } else {
        alert("Password is required to delete the account.");
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
            <h2 className="account-title">Account</h2>
            {email ? (
              <>
                <p>Name: {name || "Loading..."}</p>
                <p>Email: {email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="delete-account">
            <p className="delete-text">Delete Account?</p>
            <Button
                icon={faUserMinus}
                onClick={handleDeleteAccount}
                label="Delete Account"
                className="delete-account-button "
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
