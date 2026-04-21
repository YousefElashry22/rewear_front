import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import CartModal from './components/CartModal';
import AddedToCartNotification from './components/AddedToCartNotification';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Auth = lazy(() => import('./pages/Auth'));
const Orders = lazy(() => import('./pages/Orders'));

function MainRouter() {
const { isAddNotificationOpen, closeAddNotification } = useCart();
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
          <Suspense fallback={<div style={{color:'var(--gold)',textAlign:'center',padding:'4rem'}}>Loading...</div>}>
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
          </Suspense>
        </AnimatePresence>
      </main>

      {isCartModalVisible && (
        <CartModal
          onClose={() => setIsCartModalVisible(false)}
        />
      )}

      {isAddNotificationOpen && (
        <AddedToCartNotification 
          isOpen={isAddNotificationOpen}
          onClose={closeAddNotification}
          onViewCart={() => {
            setIsCartModalVisible(true);
            closeAddNotification();
          }} 
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
          <LanguageProvider>
            <MainRouter />
          </LanguageProvider>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
