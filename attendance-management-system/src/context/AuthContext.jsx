import { useState } from "react";
import AuthContext from "./contextValue";

const AUTH_STORAGE_KEY = "user";

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);
    if (!parsedUser || typeof parsedUser !== "object" || !parsedUser.role) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return parsedUser;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [loading] = useState(false);
  const isAuthenticated = Boolean(user);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    const currentUser = user;
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return currentUser;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
