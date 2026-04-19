import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { signOutUser } from '../services/api';

export default function Header({ search, setSearch, onCartOpen }) {
  const { user, updateUserState } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOutUser();
      updateUserState(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <motion.div
        className="logo"
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{ scale: 1.05 }}
      >
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', fontFamily: 'var(--font-serif)', letterSpacing: '0.18em' }}>REWEAR</Link>
      </motion.div>

      <div className="nav-links">
        <Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link>
        <Link to="/shop" className={currentPath.startsWith('/shop') ? 'active' : ''}>Shop</Link>
        {user && <Link to="/orders" className={currentPath === '/orders' ? 'active' : ''}>Orders</Link>}
        <Link to="/about" className={currentPath === '/about' ? 'active' : ''}>About Us</Link>
        <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>Contact</Link>
      </div>

      <div className="nav-actions">
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
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/auth" className="nav-btn">
            Login
          </Link>
        )}
        
        <button className="nav-btn cart-btn" onClick={onCartOpen}>
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}
