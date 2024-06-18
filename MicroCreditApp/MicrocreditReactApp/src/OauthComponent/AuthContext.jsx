import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    setTimeout(logout, 3600000); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    // Set logout at midnight
    const resetAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // Next day
        0,
        0,
        0 // Midnight
      );
      const timeUntilMidnight = midnight - now;
      setTimeout(() => {
        logout();
        // Repeat this process every day
        setInterval(logout, 24 * 60 * 60 * 1000); // 24 hours
      }, timeUntilMidnight);
    };

    resetAtMidnight();

    return () => clearInterval(); // Clean up interval when component unmounts
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
