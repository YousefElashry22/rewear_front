import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SkeletonCard from '../components/SkeletonCard';

const CATEGORIES = ['All', 'Streetwear', 'Formal', 'Accessories'];

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div className="img-container">
        <img src={product.image_url} alt={product.name} loading="lazy" />
      </div>
      <div className="card-info">
        <h3>{product.name}</h3>
        <span className="price">${product.price}</span>
        <button className="add-btn" onClick={() => onAdd(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Shop({ search }) {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart, openAddNotification } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await getProducts(activeCategory);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeCategory]);

  const handleAdd = async (product) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    try {
      await addToCart(product.id, 1);
      openAddNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to add to cart: ' + err.message);
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="shop"
    >
      <div className="category-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {loading ? (
          Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <ProductCard product={product} onAdd={handleAdd} />
            </motion.div>
          ))
        ) : (
          <p className="no-results">No items match your criteria.</p>
        )}
      </div>
    </motion.section>
  );
}
