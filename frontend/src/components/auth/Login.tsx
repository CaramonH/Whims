import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const auth = getAuth();

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
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
    setIsRegistering(!isRegistering);
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="login-button-container">
        <button className='login-button' onClick={isRegistering ? handleRegister : handleLogin}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button className='login-button google-login' onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <button className='login-button' onClick={toggleRegistering}>
          {isRegistering ? 'Already have an account? Login' : 'Create an account'}
        </button>
      </div>
    </div>
  );
};

export default Login;
