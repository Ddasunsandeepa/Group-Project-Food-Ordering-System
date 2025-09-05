import { User, UserContextType } from "../types";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isLoggedIn = !!user;

  // Load from localStorage on mount
  useEffect(() => {
    setLoading(true)
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      } finally {
         setLoading(false);
      }
    }
    setLoading(false);
  }, []);

  // Save user + isVeg to localStorage when updated
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("recentSearches");
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to access context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
