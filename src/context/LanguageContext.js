import React, { createContext, useContext, useState } from 'react';
import translations from '../translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const t = (key) => translations[lang][key] || key;

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
