import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/routes/dashboard";
import Login from "./components/auth/Login";
import { AuthProvider, useAuth } from "./AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

