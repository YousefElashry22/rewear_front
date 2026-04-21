import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="about-section"
      style={{ background: '#0a0a0a', color: 'var(--ivory)', padding: '5rem 6%', minHeight: '100vh' }}
    >
      <div className="brand-story" style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <div className="story-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '3.5rem', marginBottom: '2.5rem' }}>
            {t('ourHeritage')}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'var(--ivory)', lineHeight: 1.8 }}>
            {t('heritageText')}
          </p>
          <div style={{ height: '2px', width: '50px', background: '#D4AF37', margin: '3rem auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '2.8rem', marginBottom: '2rem' }}>
            {t('craftsmanship')}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--ivory)', lineHeight: 1.8 }}>
            {t('craftsmanshipText')}
          </p>
        </div>
      </div>

      <div className="core-values-section">
        <h2 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          {t('brandPhilosophy')}
        </h2>
        <div className="core-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="value-card" style={{ border: '1px solid #D4AF37', padding: '3rem 2rem', textAlign: 'center', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem' }}>{t('qualityTitle')}</h3>
            <p style={{ color: 'var(--ivory)', fontSize: '1rem', lineHeight: 1.6 }}>{t('qualityText')}</p>
          </div>
          <div className="value-card" style={{ border: '1px solid #D4AF37', padding: '3rem 2rem', textAlign: 'center', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem' }}>{t('ethicalTitle')}</h3>
            <p style={{ color: 'var(--ivory)', fontSize: '1rem', lineHeight: 1.6 }}>{t('ethicalText')}</p>
          </div>
          <div className="value-card" style={{ border: '1px solid #D4AF37', padding: '3rem 2rem', textAlign: 'center', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem' }}>{t('bespokeTitle')}</h3>
            <p style={{ color: 'var(--ivory)', fontSize: '1rem', lineHeight: 1.6 }}>{t('bespokeText')}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}