import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function CheckoutForm({ onClose }) {
  const { user, profile } = useAuth();
  const { cart, cartTotal } = useCart();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('rewear_token');

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/payment/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            amount: cartTotal,
            customer_email: user.email,
            full_name: fullName,
            phone,
            address,
            city,
            notes,
            items: cart.map(item => ({
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.products.price
            }))
          })
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      window.location.href = data.iframeUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '1px solid var(--gold)',
        borderRadius: '12px',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'var(--gold)', margin: 0 }}>Shipping Details</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        {/* Order Summary */}
        <div style={{ background: '#111', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--gold)', margin: '0 0 0.5rem', fontSize: '14px' }}>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#ccc', marginBottom: '4px' }}>
              <span>{item.products?.name} × {item.quantity}</span>
              <span>${item.products?.price * item.quantity}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #333', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', color: 'var(--gold)', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>${cartTotal} EGP</span>
          </div>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '13px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name *"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Address *"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="City *"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
            style={inputStyle}
          />
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--gold)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Processing...' : `Place Order & Pay — ${cartTotal} EGP`}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '0.75rem',
  background: '#111',
  border: '1px solid #444',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '14px',
  boxSizing: 'border-box'
};
