import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore
import './Login.css';

const Login: React.FC = () => {
  const [name, setName] = useState<string>(''); // State for storing the name
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null); // State for name error
  const navigate = useNavigate();

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

  return (
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
  );
};

export default Login;

