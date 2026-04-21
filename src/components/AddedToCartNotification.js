import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const AddedToCartNotification = ({ isOpen, onClose, onViewCart }) => {
  const { t } = useLanguage();
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="add-notification-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      >
        <motion.div
          className="add-notification-modal"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #C9A84C',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            fontFamily: 'var(--font-serif), serif',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
          >
            <h2 style={{
              color: '#C9A84C',
              margin: 0,
              marginBottom: '1rem',
              fontSize: '1.8rem',
              letterSpacing: '0.1em',
              fontWeight: 400,
            }}>
              Added to Cart! ✓
            </h2>
          </motion.div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <motion.button
              onClick={onViewCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: '#C9A84C',
                color: '#1a1a1a',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-serif), serif',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                minWidth: '120px',
              }}
            >
              View Cart
            </motion.button>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'transparent',
                color: '#C9A84C',
                border: '2px solid #C9A84C',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-serif), serif',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                minWidth: '120px',
              }}
            >
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddedToCartNotification;

