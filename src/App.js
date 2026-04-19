import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import './App.css';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import CartModal from './components/CartModal';

import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Orders from './pages/Orders';

function MainRouter() {
  const { } = useCart();
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const location = useLocation();

  return (
    <div className="app">
      <Header
        search={search}
        setSearch={setSearch}
        onCartOpen={() => setIsCartModalVisible(true)}
      />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop search={search} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>

      {isCartModalVisible && (
        <CartModal
          onClose={() => setIsCartModalVisible(false)}
        />
      )}

      <footer className="footer">
        <p>© 2026 ReWear — Curated Gents' Vintage</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <MainRouter />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
