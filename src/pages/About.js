import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
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
            Our Heritage
          </h1>
          
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'var(--ivory)', lineHeight: 1.8 }}>
            REWEAR was born from a singular vision: to curate timeless, high-end menswear that transcends fleeting trends. 
            Rooted in tradition, we step back to appreciate the tailored silhouettes and resilient fabrics that defined classic elegance.
          </p>
          
          <div style={{ height: '2px', width: '50px', background: '#D4AF37', margin: '3rem auto' }} />

          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '2.8rem', marginBottom: '2rem' }}>
            Craftsmanship
          </h2>
          
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--ivory)', lineHeight: 1.8 }}>
            We believe in the power of quality and sustainable luxury. Our dedicated team sources distinctive vintage pieces globally, 
            meticulously reviving them for the modern gentleman. Every garment is inspected and refined, telling a story of 
            unbeatable aesthetic value and uncompromising construction.
          </p>
        </div>
      </div>
      
      <div className="core-values-section">
        <h2 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          Brand Philosophy
        </h2>
        
        <div className="core-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="value-card" style={{ border: '1px solid #D4AF37', padding: '3rem 2rem', textAlign: 'center', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem' }}>Impeccable Quality</h3>
            <p style={{ color: 'var(--ivory)', fontSize: '1rem', lineHeight: 1.6 }}>Ensuring only the finest fabrics and construction meet our rigorous standards before arriving in your wardrobe.</p>
          </div>
          
          <div className="value-card" style={{ border: '1px solid #D4AF37', padding: '3rem 2rem', textAlign: 'center', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem' }}>Ethical Luxury</h3>
            <p style={{ color: 'var(--ivory)', fontSize: '1rem', lineHeight: 1.6 }}>By curating and reviving vintage menswear, we participate in a circular economy that drastically reduces fashion's environmental impact.</p>
          </div>
          
          <div className="value-card" style={{ border: '1px solid #D4AF37', padding: '3rem 2rem', textAlign: 'center', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem' }}>Bespoke Experience</h3>
            <p style={{ color: 'var(--ivory)', fontSize: '1rem', lineHeight: 1.6 }}>From seamless browsing to our signature unboxing, your journey with us feels as premium as the garments themselves.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
