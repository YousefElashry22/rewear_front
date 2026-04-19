import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // We check for the user in localStorage when the app loads
  useEffect(() => {
    const initAuth = async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch (err) {
        // Not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
    
    // We listen for changes in localstorage in case they log out in another tab
    const handleStorageChange = (e) => {
      if (e.key === 'rewear_user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update user in context helper
  const updateUserState = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUserState }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
