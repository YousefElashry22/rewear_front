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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      const token = localStorage.getItem('rewear_token');
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const backendUser = await getCurrentUser();
        setUser(backendUser);
        await fetchProfile(backendUser.id);
      } catch (err) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          localStorage.setItem('rewear_token', session.access_token);
          localStorage.setItem('rewear_user', JSON.stringify(session.user));
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    const handleStorageChange = (e) => {
      if (e.key === 'rewear_user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          localStorage.setItem('rewear_token', session.access_token);
          localStorage.setItem('rewear_user', JSON.stringify(session.user));
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          localStorage.removeItem('rewear_token');
          localStorage.removeItem('rewear_user');
          setUser(null);
          setProfile(null);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const updateUserState = (newUser) => {
    setUser(newUser);
    if (!newUser) setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, updateUserState }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);