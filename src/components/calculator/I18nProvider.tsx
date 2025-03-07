import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
  lang?: string;
}

export default function I18nProvider({ children, lang = 'hr' }: I18nProviderProps) {
  // Set language immediately if it's different than current
  if (lang && i18next.language !== lang) {
    i18next.changeLanguage(lang);
  }
  
  // Also handle language changes in an effect
  React.useEffect(() => {
    if (lang && i18next.language !== lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
} 