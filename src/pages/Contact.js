import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('messageSent'));
    setFormData({ name: '', email: '', message: '' });
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.6)';
    e.target.style.borderColor = '#D4AF37';
  };

  const handleBlur = (e) => { e.target.style.boxShadow = 'none'; };

  const inputStyle = { width: '100%', background: '#0a0a0a', border: '1px solid #D4AF37', color: 'var(--ivory)', padding: '0.9rem', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '1rem', transition: 'all 0.3s' };
  const labelStyle = { color: '#D4AF37', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.05em', marginBottom: '0.8rem', display: 'block' };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="contact-layout"
      style={{ background: '#0a0a0a', padding: '6rem 6%', color: 'var(--ivory)', minHeight: '100vh' }}
    >
      <div className="contact-info" style={{ paddingRight: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '3.5rem', marginBottom: '1.5rem' }}>
          {t('contactUs')}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--ivory)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3.5rem' }}>
          {t('contactSubtitle')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '2.2rem', marginBottom: '1rem' }}>
              {t('visitAtelier')}
            </h2>
            <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              7th Avenue, Fashion District<br />New York, NY 10001
            </p>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
              {t('emailLabel')}
            </h3>
            <p style={{ color: 'var(--ivory)', fontSize: '1.1rem' }}>concierge@rewear.com</p>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
              {t('social')}
            </h3>
            <p style={{ fontSize: '1.1rem' }}>
              <a href="#ig" style={{ color: '#D4AF37', textDecoration: 'none', marginRight: '1.5rem' }}
                onMouseOver={e => e.target.style.textShadow = '0 0 8px rgba(212,175,55,0.6)'}
                onMouseOut={e => e.target.style.textShadow = 'none'}>Instagram</a>
              <a href="#tw" style={{ color: '#D4AF37', textDecoration: 'none' }}
                onMouseOver={e => e.target.style.textShadow = '0 0 8px rgba(212,175,55,0.6)'}
                onMouseOut={e => e.target.style.textShadow = 'none'}>Twitter</a>
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          style={{ width: '100%', background: '#0a0a0a', padding: '3rem', border: '1px solid #D4AF37' }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>{t('yourName')}</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              onFocus={handleFocus} onBlur={handleBlur} required style={inputStyle} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>{t('yourEmail')}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              onFocus={handleFocus} onBlur={handleBlur} required style={inputStyle} />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <label style={labelStyle}>{t('yourMessage')}</label>
            <textarea name="message" value={formData.message} onChange={handleChange}
              onFocus={handleFocus} onBlur={handleBlur} required
              style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} />
          </div>

          <button
            type="submit"
            style={{ width: '100%', background: '#0a0a0a', color: '#D4AF37', border: '2px solid #D4AF37', padding: '1.2rem', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2