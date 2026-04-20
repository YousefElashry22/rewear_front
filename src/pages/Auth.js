import React, { useState } from 'react';
import { signInUser, signUpUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function Auth() {
  const { updateUserState } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://courageous-pudding-3d68b2.netlify.app/shop'
      }
    });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const data = await signInUser(email, password);
        updateUserState(data.user);
        navigate('/');
      } else {
        await signUpUser(email, password, fullName, phone, address, dob);
        alert('Signup successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="sell-section"
      style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {isLogin ? 'Welcome Back' : 'Create an Account'}
      </h1>

      <form className="sell-form" onSubmit={handleAuth} style={{ margin: '0 auto' }}>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          <span>{loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}</span>
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={handleGoogleLogin}
          style={{
            background: 'linear-gradient(45deg, var(--gold), #d4a017)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '300px'
          }}
          disabled={loading}
        >
          Sign in with Google
        </button>
      </div>
    </motion.section>
  );
}