// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  return (
    <div>
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Create an account'}
      </button>
    </div>
  );
};

export default Login;
