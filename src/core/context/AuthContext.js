"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const storedPhone = localStorage.getItem("phoneNumber");
    if (storedPhone) {
      setPhoneNumber(storedPhone);
    }
  }, []);

  const login = (phone) => {
    setPhoneNumber(phone);
    localStorage.setItem("phoneNumber", phone);
  };

  const logout = () => {
    setPhoneNumber("");
    localStorage.removeItem("phoneNumber");
  };

  return (
    <AuthContext.Provider value={{ phoneNumber, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
