import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { signOutUser } from '../services/api';

export default function Header({ search, setSearch, onCartOpen }) {
  const { user, updateUserState } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      updateUserState(null);
      setIsMenuOpen(false);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const currentPath = location.pathname;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/" onClick={closeMenu} style={{ color: 'inherit', textDecoration: 'none', fontFamily: 'var(--font-serif)', letterSpacing: '0.18em' }}>REWEAR</Link>
        </motion.div>

        {/* Hamburger Menu Icon */}
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Desktop Nav Links */}
        <div className="nav-links desktop-only">
          <Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link>
          <Link to="/shop" className={currentPath.startsWith('/shop') ? 'active' : ''}>Shop</Link>
          {user && <Link to="/orders" className={currentPath === '/orders' ? 'active' : ''}>Orders</Link>}
          <Link to="/about" className={currentPath === '/about' ? 'active' : ''}>About Us</Link>
          <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>Contact</Link>
        </div>

        {/* Nav Actions (Desktop) */}
        <div className="nav-actions desktop-only">
          {currentPath.startsWith('/shop') && (
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          
          {user ? (
            <button className="nav-btn auth-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/auth" className="nav-btn auth-btn">
              Login
            </Link>
          )}
          
          <button className="nav-btn cart-btn" onClick={() => { onCartOpen(); closeMenu(); }}>
            Cart ({cartCount})
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mobile-nav-links">
              <Link to="/" className={currentPath === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
              <Link to="/shop" className={currentPath.startsWith('/shop') ? 'active' : ''} onClick={closeMenu}>Shop</Link>
              {user && <Link to="/orders" className={currentPath === '/orders' ? 'active' : ''} onClick={closeMenu}>Orders</Link>}
              <Link to="/about" className={currentPath === '/about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
              <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
              
              <div className="mobile-actions">
                {currentPath.startsWith('/shop') && (
                  <div className="search-box mobile-search">
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="mobile-buttons">
                  {user ? (
                    <button className="nav-btn auth-btn full-width" onClick={handleLogout}>
                      Logout
                    </button>
                  ) : (
                    <Link to="/auth" className="nav-btn auth-btn full-width" onClick={closeMenu}>
                      Login
                    </Link>
                  )}
                  
                  <button className="nav-btn cart-btn full-width" onClick={() => { onCartOpen(); closeMenu(); }}>
                    Cart ({cartCount})
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
