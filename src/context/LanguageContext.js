import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  // ← ده المهم: يضبط الـ dir و font من أول تحميل
  useEffect(() => {
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.style.fontFamily = lang === 'ar' ? "'Cairo', sans-serif" : '';
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

const switchLang = (newLang) => {
  setLang(newLang);
  localStorage.setItem('lang', newLang);
  document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = newLang;
  document.body.style.fontFamily = newLang === 'ar'
    ? "'Cairo', sans-serif"
    : "'inherit'";
};

  return (
    <LanguageContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);