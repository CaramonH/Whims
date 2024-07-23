import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB3OD4bO-FUkt-DvQEn6YUfP4djwBQoDHs",
  authDomain: "whims-c4e95.firebaseapp.com",
  databaseURL: "https://whims-c4e95-default-rtdb.firebaseio.com",
  projectId: "whims-c4e95",
  storageBucket: "whims-c4e95.appspot.com",
  messagingSenderId: "617486222074",
  appId: "1:617486222074:web:69aebfd11d18e5d9b0bf43",
  measurementId: "G-DWR80BQXVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);