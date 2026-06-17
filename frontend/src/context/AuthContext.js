"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser") ||
    sessionStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData, KeepSignedIn) => {
    if (KeepSignedIn) {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("currentUser", JSON.stringify(userData));
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);