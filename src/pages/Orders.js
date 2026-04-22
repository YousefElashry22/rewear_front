import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/api';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Orders() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading orders...</div>;
  if (error) return <div style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>Error: {error}</div>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="sell-section"
      style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}
    >
<h1 style={{ marginBottom: '2rem' }}>{t('myOrdersTitle')}</h1>
      {orders.length === 0 ? (
<p>{t('noOrdersYet')}</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #333', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <span><strong>{t('orderId')}:</strong> {order.id.split('-')[0]}</span>
              <span><strong>{t('orderDate')}:</strong> {new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            
            {order.order_items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={item.products.image_url} alt={item.products.name} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                  {item.products.name} (x{item.quantity})
                </span>
                <span>${item.price}</span>
              </div>
            ))}
            
            <div style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--gold)' }}>
              Total: ${order.total_price}
            </div>
          </div>
        ))
      )}
    </motion.section>
  );
}
