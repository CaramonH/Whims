import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "./Login.css";
import "../card/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LikeDislike from "../functional/likeDislike";
import {
  faUtensils,
  faMusic,
  faFilm,
  faGamepad,
  faPlaneDeparture,
  faPalette,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

// This is a fake data generator for the landing page cards
const colorVariables: string[] = [
  "--color-turq",
  "--color-mant",
  "--color-apg",
  "--color-yell",
  "--color-org",
  "--color-red",
  "--color-ind",
  "--color-purp",
];
// Font Awesome icons for the landing page cards
const faIcons: any[] = [
  faUtensils,
  faMusic,
  faFilm,
  faGamepad,
  faPlaneDeparture,
  faPalette,
  faQuestionCircle,
];
// Fake landing page card titles
const landingTitle: string[] = [
  "Who is Whims for? - Indecisive Friends!",
  "What is Whims for? - What games to play together!",
  "Why Whims? - Simple organization!",
  "Who is Whims for? - Coworkers!",
  "What is Whims for? - Deciding on lunch plans!",
  "Why Whims? - Ease of access!",
  "Who is Whims for? - Families!",
  "What is Whims for? - Deciding what to do on Holidays!",
  "Why Whims? - To build a community!",
  "Who is Whims for? - Partners and Relationships!",
  "What is Whims for? - What movies to watch!",
  "Why Whims? - Ease of communication!",
];
// Helper function to get a random color
const getRandomColor = (previousColor: string): string => {
  let randomColor: string = getRandomColorHelper();
  while (randomColor === previousColor) {
    randomColor = getRandomColorHelper();
  }
  console.log("return:", randomColor);
  return randomColor;
};
// Helper function to get a random Font Awesome icon
const getRandomFaIcon = (): any => {
  return faIcons[Math.floor(Math.random() * faIcons.length)];
};
// Helper function to get a random color
const getRandomColorHelper = (): string => {
  return colorVariables[Math.floor(Math.random() * colorVariables.length)];
};
// Helper function to get a random fake event name
const getRandomFakeEventName = (): string => {
  return landingTitle[Math.floor(Math.random() * landingTitle.length)];
};
// Helper function to generate random card data
const generateRandomCardData = () => ({
  color: getRandomColor(""),
  faIcon: getRandomFaIcon(),
  landingTitle: getRandomFakeEventName(),
});

//////////////////////////////////////////
///////Login component starts here////////
//////////////////////////////////////////
const Login: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [cardsData, setCardsData] = useState<any[]>([]);
  const navigate = useNavigate();

  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const initialCards = Array(3)
      .fill(null)
      .map(() => generateRandomCardData());
    setCardsData(initialCards);
    console.log("Initial cards set:", initialCards);
  }, []);

  const updateCardData = (index: number) => {
    setCardsData((prevData) => {
      const newData = [...prevData];
      newData[index] = generateRandomCardData();
      console.log(`Card ${index} updated:`, newData[index]);
      return newData;
    });
  };

  const handleAnimationEnd = (index: number) => {
    updateCardData(index);
    console.log(`Animation ended for card ${index}`);
  };

  ////////////////////////////////////////////////////////
  ///// login and registration functions start HERE //////
  ////////////////////////////////////////////////////////
  const handleLogin = async () => {
    setErrorMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in", error);
      setErrorMessage(
        "Failed to log in. Please check your email and password."
      );
    }
  };

  const handleRegister = async () => {
    setErrorMessage(null);
    setNameError(null);

    if (!name) {
      setNameError("Name is a required field");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        name: name,
        email: email,
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error registering", error);
      if (error.code === "auth/weak-password") {
        setErrorMessage("Password must be at least 6 characters long.");
      } else {
        setErrorMessage("Failed to register. Please try again.");
      }
    }
  };

  const toggleRegistering = () => {
    setErrorMessage(null);
    setNameError(null);
    setIsRegistering(!isRegistering);
  };

  // Google login function
  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const name = user.displayName || "";
      const email = user.email || "";

      await setDoc(
        doc(firestore, "users", user.uid),
        {
          name: name,
          email: email,
        },
        { merge: true }
      ); // Add merge: true here

      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in with Google", error);
      setErrorMessage("Failed to log in with Google.");
    }
  };

  // Return the JSX for the Login component
  return (
    <>
      <div className="landing-whims-div">
        <div className="fake-cards-div">
          {cardsData.map((card, index) => (
            <div
              className="fake-card"
              key={`card-container-${index}-${JSON.stringify(card)}`}
              onAnimationEnd={() => handleAnimationEnd(index)}
              onAnimationIteration={() =>
                console.log(`Animation iterated for card ${index}`)
              }
            >
              <div className={`card ${card.color}`}>
                <div className="card-title">
                  {card.landingTitle
                    .split("-")
                    .map((word: string, i: number) =>
                      i === 0 ? <h5 key={i}>{word} </h5> : <p key={i}>{word}</p>
                    )}
                </div>
                <div className="event-type-icon">
                  <FontAwesomeIcon icon={card.faIcon} />
                </div>
                <div className="like-dislike-container">
                  <LikeDislike groupId={""} whimId={""} userID={""} />
                </div>
                <div className="location-container"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="login-div">
        <h1>{isRegistering ? "Register" : "Login"}</h1>
        <div className="login-input-container">
          {isRegistering && (
            <div>
              <input
                className="login-input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="login-error">{nameError}</p>}
            </div>
          )}
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <div className="login-button-container">
          <button
            className="login-button"
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <button
            className="login-button google-login"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>
          <p className="blurb-p">
            {isRegistering
              ? "Don't have an account with us? Join here!"
              : "Have an account already? Sign in!"}
          </p>
          <button className="login-button" onClick={toggleRegistering}>
            {isRegistering ? "Login" : "Create an account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
