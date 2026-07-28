import React, { createContext, useContext, useEffect, useState } from "react";
import { getMeApi, loginApi, logoutApi, signupApi } from "../api/resources";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking session on load

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await getMeApi();
        setUser(data.user);
      } catch {
        setUser(null); // no valid session, that's fine
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    const { data } = await loginApi({ email, password });
    setUser(data.user);
    return data.user;
  };

  const signup = async (name, email, password) => {
    const { data } = await signupApi({ name, email, password });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
