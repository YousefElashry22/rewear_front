import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/api';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for user in localStorage and Supabase session
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try backend user first
        const backendUser = await getCurrentUser();
        setUser(backendUser);
      } catch (err) {
        // Check Supabase session as fallback
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          localStorage.setItem('rewear_token', session.access_token);
          localStorage.setItem('rewear_user', JSON.stringify(session.user));
          setUser(session.user);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'rewear_user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Supabase auth state listener
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem('rewear_token', session.access_token);
        localStorage.setItem('rewear_user', JSON.stringify(session.user));
        setUser(session.user);
      } else {
        localStorage.removeItem('rewear_token');
        localStorage.removeItem('rewear_user');
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
