import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import CheckoutForm from './CheckoutForm';

export default function CartModal({ onClose }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleUpdateQty = async (cartId, currQty, delta) => {
    try {
      await updateQuantity(cartId, currQty + delta);
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await removeFromCart(cartId);
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      onClose();
      navigate('/auth');
      return;
    }
    setShowCheckout(true);
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Cart ({cart.length})</h2>
            <button onClick={onClose}>×</button>
          </div>
          <div className="cart-body">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <img
                      src={item.products?.image_url}
                      alt={item.products?.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ fontWeight: 'bold' }}>{item.products?.name}</span>
                      <span>${item.products?.price}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button onClick={() => handleUpdateQty(item.id, item.quantity, -1)} style={{ padding: '0 5px' }}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQty(item.id, item.quantity, 1)} style={{ padding: '0 5px' }}>+</button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                      title="Remove item"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#ff6b6b';
                        e.currentTarget.style.background = 'rgba(255,107,107,0.1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))
            )}
            <div className="cart-total" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
              Total: ${cartTotal}
            </div>
            {cart.length > 0 && (
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout — {cartTotal} EGP
              </button>
            )}
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutForm onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}