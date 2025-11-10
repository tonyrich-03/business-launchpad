// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthResponse } from '../utils/auth'; // Type-only imports
import { authUtils } from '../utils/auth'; // Regular import

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Create and export the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const currentUser = authUtils.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const result: AuthResponse = await authUtils.authenticate(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        authUtils.setCurrentUser(result.user);
      }
      
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const result: AuthResponse = await authUtils.register(name, email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        authUtils.setCurrentUser(result.user);
      }
      
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    authUtils.logout();
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }

    const result: AuthResponse = await authUtils.updateProfile(user.id, updates);
    
    if (result.success && result.user) {
      setUser(result.user);
    }

    return result;
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};