"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";
import { isAuthenticated, logout } from "@/lib/auth";

const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  loading: true,
  refetch: () => {},
  logout: () => {},
});
export function AuthProvider({ children }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAuth = async () => {
    setLoading(true);
    const auth = await isAuthenticated();
    setIsLoggedIn(auth);

    if (auth) {
      const data = await getCurrentUser();
      setUser(data?.user);
      setIsAdmin(data?.user?.role === "admin");
    } else {
      setUser(null);
      setIsAdmin(false);
    }

    setLoading(false);
  };
  const handleLogout = async () => {
    // ✅ Reset semua state
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);

    await new Promise((resolve) => setTimeout(resolve, 100));

    logout();
  };
  useEffect(() => {
    fetchAuth();
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, loading, refetch: fetchAuth, logout: handleLogout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
