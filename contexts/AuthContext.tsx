"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("broadway_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("broadway_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("broadway_user");
    }
  }, [user]);

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(
        localStorage.getItem("broadway_users") || "[]"
      );
      const userExists = existingUsers.some(
        (u: { email: string }) => u.email === email
      );

      if (userExists) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: "",
        interests: [],
        platformGoals: [],
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      // Store password separately (in production, this would be hashed on backend)
      const userCredentials = {
        email,
        password, // In production, never store plain passwords!
      };

      existingUsers.push(userCredentials);
      localStorage.setItem("broadway_users", JSON.stringify(existingUsers));

      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(
        localStorage.getItem("broadway_users") || "[]"
      );
      const userCredentials = existingUsers.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      );

      if (!userCredentials) {
        return false;
      }

      // Get user data
      const storedUser = localStorage.getItem("broadway_user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.email === email) {
          setUser(userData);
          return true;
        }
      }

      // Create basic user object if not found
      const basicUser: User = {
        id: crypto.randomUUID(),
        email,
        name: "",
        interests: [],
        platformGoals: [],
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      setUser(basicUser);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
