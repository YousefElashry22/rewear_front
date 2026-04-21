import React, { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function MagneticBtn({ onClick, children }) {
  const btnRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.22;
    const dy = (e.clientY - centerY) * 0.22;
    posRef.current = { x: dx, y: dy };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (btnRef.current) {
        btnRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (btnRef.current) {
      btnRef.current.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
      btnRef.current.style.transform = 'translate(0, 0)';
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transition = 'transform 0.1s linear';
  }, []);

  return (
    <button
      ref={btnRef}
      className="hero-btn"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <span>{children}</span>
    </button>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const bgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const scrolled = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="hero"
    >
      <div className="hero-bg-parallax" ref={bgRef} />

      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-eyebrow">Est. MMXXIV · Curated Menswear</span>

          <h1 className="hero-heading">
            CURATED<br />
            <em>GENTS'</em><br />
            VINTAGE
          </h1>

          <p className="hero-sub">
            Ethical luxury. Distinctive style.<br />
            Unbeatable value.
          </p>

          <MagneticBtn onClick={() => navigate('/shop')}>Shop Now</MagneticBtn>
        </div>

        <div className="hero-deco">
          <div className="hero-deco-line" />
          <span className="hero-deco-text">Premium Selection</span>
          <div className="hero-deco-line" />
        </div>
      </div>
    </motion.section>
  );
}
