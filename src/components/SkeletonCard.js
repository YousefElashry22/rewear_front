import { useLanguage } from '../context/LanguageContext';

export default function SkeletonCard() {
  const { t } = useLanguage();
  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '8px',
      overflow: 'hidden',
      animation: 'shimmer 1.5s infinite'
    }}>
      <div style={{ width: '100%', height: '250px', background: '#2a2a2a' }} />
      <div style={{ padding: '1rem' }}>
        <div style={{ height: '16px', background: '#2a2a2a', borderRadius: '4px', marginBottom: '8px' }} />
        <div style={{ height: '16px', background: '#2a2a2a', borderRadius: '4px', width: '60%' }} />
      </div>
      <style>{`
        @keyframes shimmer {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
