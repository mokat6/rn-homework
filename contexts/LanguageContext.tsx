import React, {createContext, useState, useContext, ReactNode} from 'react';
import {i18nEn as en} from '@/constants/i18nEn';
import {i18nLt as lt} from '@/constants/i18nLt';
import {i18nPl as pl} from '@/constants/i18nPl';

const translations: Record<string, Record<string, string>> = {en, lt, pl};

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: translationKeys) => string;
};

type translationKeys = keyof typeof en;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({children}: {children: ReactNode}) => {
  const [language, setLanguage] = useState<string>('en'); // Default language

  const t = (key: translationKeys) => translations[language]?.[key] || key;

  return <LanguageContext.Provider value={{language, setLanguage, t}}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
