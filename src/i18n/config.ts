import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hr from './locales/hr.json';
import sl from './locales/sl.json';
import de from './locales/de.json';
import it from './locales/it.json';
import hu from './locales/hu.json';

export const defaultLang = 'hr';
export const languages = ['hr', 'en', 'sl', 'de', 'it', 'hu'];

await i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hr: { translation: hr },
      sl: { translation: sl },
      de: { translation: de },
      it: { translation: it },
      hu: { translation: hu }
    },
    lng: defaultLang,
    fallbackLng: defaultLang,
    interpolation: {
      escapeValue: false
    },
    load: 'languageOnly',
    supportedLngs: languages,
    detection: {
      order: ['path', 'navigator']
    }
  });

export default i18next;