import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { signOutUser } from '../services/api';

export default function Header({ search, setSearch, onCartOpen }) {
  const { user, profile, updateUserState } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOutUser();
      updateUserState(null);
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  // اقفل الـ dropdown لو ضغط برا
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentPath = location.pathname;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Account';

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

        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className="nav-links desktop-only">
          <Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link>
          <Link to="/shop" className={currentPath.startsWith('/shop') ? 'active' : ''}>Shop</Link>
          {user && <Link to="/orders" className={currentPath === '/orders' ? 'active' : ''}>Orders</Link>}
          <Link to="/about" className={currentPath === '/about' ? 'active' : ''}>About Us</Link>
          <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>Contact</Link>
        </div>

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
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                className="nav-btn auth-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {displayName} ▾
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      background: '#1a1a1a',
                      border: '1px solid var(--gold)',
                      borderRadius: '8px',
                      minWidth: '150px',
                      zIndex: 999,
                      overflow: 'hidden'
                    }}
                  >
                    <Link
                      to="/orders"
                      onClick={() => setIsDropdownOpen(false)}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        color: 'var(--gold)',
                        textDecoration: 'none',
                        borderBottom: '1px solid #333',
                        fontSize: '14px'
                      }}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px'
                      }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/auth" className="nav-btn auth-btn">Login</Link>
          )}

          <button className="nav-btn cart-btn" onClick={() => { onCartOpen(); closeMenu(); }}>
            Cart ({cartCount})
          </button>
        </div>
      </div>

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
                    <>
                      <div style={{ color: 'var(--gold)', padding: '8px 0', fontSize: '14px', textAlign: 'center' }}>
                        {displayName}
                      </div>
                      <Link to="/orders" className="nav-btn auth-btn full-width" onClick={closeMenu}>
                        My Orders
                      </Link>
                      <button className="nav-btn auth-btn full-width" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
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