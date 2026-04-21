import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProtectedRoute({ children }) {
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading authentication...</div>;

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
}
