"use client";
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPath";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Create the context
export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!accessToken) {
      setLoading(false);
      return;
    }

    // Keep cookie synchronized for middleware
    if (!document.cookie.includes("token=")) {
      document.cookie = `token=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData: any) => {
    setUser(userData);
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
      document.cookie = `token=${userData.token}; path=/; max-age=604800; SameSite=Lax`;
    }
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  };

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
        {children}
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default UserProvider;