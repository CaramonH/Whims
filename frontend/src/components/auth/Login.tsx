import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore
import './Login.css';
import '../card/card'
//imports for the landingpage randomization
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LikeDislike from "../functional/likeDislike";
import { faUtensils, faMusic, faFilm, faGamepad, faPlaneDeparture, faPalette, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

//random colors for the landing page
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

//random icons for the landing page
const faIcons: any[] = [
  faUtensils,
  faMusic,
  faFilm,
  faGamepad,
  faPlaneDeparture,
  faPalette,
  faQuestionCircle,
  // Add more font awesome icons here
];

//random text for the landing page
const landingTitle: string[] = [
  "Who is Whims for? - Event 1",
  "What is Whims for? - Event 2",
  "Why Whims? - Event 3",
  "Who is Whims for? - Event 4",
  "What is Whims for? - Event 5",
  "Why Whims? - Event 6",
  // Add more fake event names here
];

//random number generators for the landing page
const getRandomColor = (previousColor: string): string => {
  let randomColor: string = getRandomColorHelper();

  // Ensure the random color is different from the previous color
  while (randomColor === previousColor) {
    randomColor = getRandomColorHelper();
  }

  return randomColor;
};

const getRandomFaIcon = (): any => {
  const randomIndex: number = Math.floor(Math.random() * faIcons.length);
  return faIcons[randomIndex];
};

const getRandomColorHelper = (): string => {
  const randomIndex: number = Math.floor(Math.random() * colorVariables.length);
  return colorVariables[randomIndex];
};

const getRandomFakeEventName = (): string => {
  const randomIndex: number = Math.floor(Math.random() * landingTitle.length);
  return landingTitle[randomIndex];
};

const createFakeCard = (): HTMLElement => {
  const card = document.createElement('div');
  card.className = 'fake-card';
  card.style.left = `${Math.floor(Math.random() * 50) - 50}vw`;
  card.style.backgroundColor = `var(${getRandomColor('')})`; // Pass an empty string to avoid repetitive color
  card.innerText = landingTitle[Math.floor(Math.random() * landingTitle.length)];
  const icon = document.createElement('div');
  const randomFaIcon = getRandomFaIcon();
  icon.className = 'fa-icon';
  icon.appendChild(randomFaIcon);
  card.appendChild(icon);
  return card;
};

const Login: React.FC = () => {
  const [name, setName] = useState<string>(''); // State for storing the name
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null); // State for name error
  const navigate = useNavigate();
  //var calls for the random stuff on landing page
  const [cardsData, setCardsData] = useState<any[]>([]);

  // Randomize landing page content on page load
  useEffect(() => {
    const cards: any[] = [];
    for (let i = 0; i < 3; i++) {
      cards.push({
        color: getRandomColor(""),
        faIcon: getRandomFaIcon(),
        landingTitle: getRandomFakeEventName(),
      });
    }
    setCardsData(cards);
  }, []);

  const auth = getAuth();
  const firestore = getFirestore(); // Initialize Firestore

  const handleLogin = async () => {
    setErrorMessage(null); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      console.error("Error logging in", error);
      setErrorMessage("Failed to log in. Please check your email and password.");
    }
  };

  const handleRegister = async () => {
    setErrorMessage(null); // Clear previous errors
    setNameError(null); // Clear name error

    if (!name) {
      setNameError("Name is a required field");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the user's name in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        name: name,
        email: email
      });

      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error: any) {
      console.error("Error registering", error);
      if (error.code === 'auth/weak-password') {
        setErrorMessage("Password must be at least 6 characters long.");
      } else {
        setErrorMessage("Failed to register. Please try again.");
      }
    }
  };

  const toggleRegistering = () => {
    setErrorMessage(null); // Clear error messages when toggling
    setNameError(null); // Clear name error when toggling
    setIsRegistering(!isRegistering);
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract the user's display name and email
      const name = user.displayName || '';
      const email = user.email || '';

      // Store the user's name and email in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        name: name,
        email: email
      });

      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      console.error("Error logging in with Google", error);
      setErrorMessage("Failed to log in with Google.");
    }
  };

    useEffect(() => {
    const parentElement = document.querySelector('.fake-card-container');
    
    if (parentElement) {
      const addCard = () => {
        const card = createFakeCard();
        parentElement.appendChild(card);
        
        (card as HTMLElement).addEventListener('animationend', () => {
          parentElement.removeChild(card);
          addCard();
        });
      };

      addCard();
    }
  }, []);
  
  return (
    <>
      <div className="landing-whims-div">
        <div className="fake-cards-div">
          {cardsData.map((card, index) => (
            <div className="fake-card">
              <div key={index} className={`card ${card.color || getRandomColor}`}>
                <div className="card-title">
                  {card.landingTitle.split('-').map((word: string, i: number) => (
                    i === 0 ? <h5 key={i}>{word} </h5> : <p key={i}>{word}</p>
                  ))} 
                </div>              
                <div className="event-type-icon">
                  <FontAwesomeIcon icon={card.faIcon} />
                </div>
                <div className="like-dislike-container">
                  <LikeDislike />
                </div>
                <div className="location-container"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='login-div'>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
        <div className="login-input-container">
          {isRegistering && (
            <div>
              <input
                className='login-input'
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="login-error">{nameError}</p>}
            </div>
          )}
          <input
            className='login-input'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='login-input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <div className="login-button-container">
          <button className='login-button' onClick={isRegistering ? handleRegister : handleLogin}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button className='login-button google-login' onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
          <p className="blurb-p">{isRegistering ? 'Don\'t have an account with us? Join here!' : 'Have an account already? Sign in!'}</p>
          <button className='login-button' onClick={toggleRegistering}>
            {isRegistering ? 'Login' : 'Create an account'}
          </button>
        </div>
      </div>
    </>
  );
};


export default Login;

